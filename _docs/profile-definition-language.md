---
title: "Benchmark Profile Definition Language"
source_url: 'https://github.com/SenseNet/sensenet/docs/sn-benchmark'
category: Benchmark
version: v7.0.0
tags: [benchmark, profile, language, sn7]
---
# Benchmark Profile Definition Language
<a name="BenchmarkProfileDefinitionLanguage"></a>
The Profile Definition is a text file that describes an action sequence. 
Possible actions: 
 - sending a web request, 
 - memorizing data from the response as a variable, 
 - waiting for a couple of seconds
 
At the beginnig of the line there is a *control character or word* that defines the purpose of that line. Empty lines and lines starting with an unrecognized control word will be skipped.

### Comment
If the line starts with a semicolon character (;) the line will be skipped.
```text
; PROFILE DESCRIPTION: Small content editor task
```
There is only line comment, it is not possible to write an inline comment.

### PATHSET

Path set is a technique that helps to use variable contents in the profiles. The set is defined by a ContentQuery and referenced in the webrequests indirectly. Every use case gets a path from the set. The actual path instance depends on the profileid and kind of reference (see below under the USAGE).

#### Declaration

The best place of the path set declarations is 
at the top of the profile file but this is not mandatory. The declaration has three parts:
1. **Keyword**: this is the '*PATHSET:*'.
2. **Name**: One word after the keyword separated by a space.
3. **Definition**: this is a valid content query (in CQL).

It is strongly recommended to use AND / OR logical operators in the content query instead of usual Lucene occurences (empty / + / -) because the definition query will be URL encoded and the '+' character means space (0x20) in the URL.

#### Usage

A PATHSET reference have more parts. See the syntax:
```text
##Name.Addressing[.Transformation]##
```

1. **Start**: Two hashmarks ('##').
2. **Name**: Reference name of the path set.
3. **Addressing**: Number or keyword that defines the profile's index and returns with the item that placed on the indexed position of the referenced set. The valid values:
    - **'First'**: Sets the profile's index to the original value.
    - **'Current'**: Stays on the current position.
    - **'Next'**: Increment the position 
    - **Direct index**: A non-negative integer number that ignores the profile's index.
4.  **Transformation**: Transforms the actual path of the path set
    - **Parent**: Leaves the last segment of the path. This transformation can be used in chain but should be used with caution because there is no any validation.
    - **ODataEntity**: Changes the last segment of the path to indexer. For example "/Root/Segment1/Segment2" will be transformed to "/Root/Segment1('Segment2')"
5. **Finish**:  Two hashmarks ('##').

***Note**: the profile's index cannot exceed the path set size because every index operation is followed by a normalization (index modulo path set count).*

The following example simulates the tipical usage:
```text
; Define 100 large file
PATHSET: BigFiles Size:>236000 AND TypeIs:File AND InTree:'/Root/Benchmark/Files' .TOP:100 .AUTOFILTERS:OFF

; Simulate browsing step #1: folder list
REQ: GET /odata.svc##BigFiles.current.parent.parent##?metadata=no&$select=Name,DisplayName
WAIT: 2000

; Simulate browsing step #2: file list
REQ: GET /odata.svc##BigFiles.current.parent##?metadata=no&$select=Name,DisplayName
WAIT: 2000

; Simulate browsing step #3: Select file and get relevant properties and metadata
REQ: GET /odata.svc##BigFiles.current.odataentity##?$select=Id,Path,Size,DisplayName
WAIT: 2000

; Download the file
REQ: GET ##BigFiles.current##
SPEED: Slow
WAIT: 2000
```

### WAIT
The profile execution will be suspended for a time. Parameter value is defined in milliseconds.
```text
WAIT: 2000
```
This causes a 2 seconds asynchron pause.

### REQ
Describes a web request. Two parameters are allowed: *http verb* and *url**
- HTTP verb: GET, POST, DELETE and so on. If the verb is missing, the *default is GET*.
- URL: absolute url without the protocol and domain. Must start with a slash (/).
```text
; Default main page GET request
REQ: /
; Subpage html request
REQ: GET /workspaces
; OData request
REQ: DELETE /odata.svc/content(1234)
```

There are a couple of extensions to the request line above. They can be written as separate lines after a request line. The following keywords can be used: *DATA, SPEED, VAR*

#### DATA
There are many OData requests that require some data in the request stream. This is how you define a post data.
```text
; Create a new memo
REQ: POST /OData.svc/workspaces/Project/madridprojectworkspace/Memos
DATA: models=[{"__ContentType":"Memo","Description":"asdf qwer"}]
```

#### SPEED
Defines the *speed category* of the current request. Optional, default is "NORMAL". Category name is case insensitive. Categories are defined when you execute the benchmark tool (see parameters above). Requests that are put into a certain category will be taken into account when we compare the average response times to category limits.
```text
SPEED: Slow
```

#### VAR
There is a simple way to memorize and reuse data from an OData response: you can define a variable that will hold a value extracted from the response object. This is useful when you are working with dynamic content items and values that you do not know at the time when you create the script.

Response object reference id *"@Response"*.

Variable names must start with the *'@'* character. Only a property path is allowed on the right side, expressions do not work.
```text
VAR: @Name = @Response.d.Name
```
### UPLOAD
Describes an operation that uploads a file from the disk to a given target repository folder. Syntax:
```text
UPLOAD: <sourcefile> <targetfolder>
[SPEED: <speedcategory>]
```
  - **sourcefile**: Source file is a filesystem path of an existing file relative to the running benchmark tool. 
  - **targetfolder**: Target folder is an existing repository folder that allows File content type.
  - **SPEED**: Speed parameter also allowed (see above under the REQ command). This operation's speed category depends on the file size but SLOW is usually a good choice.

In this version the uploaded file name equals to the source's name. Therefore it is strongly recommended in the benchmark scenario that the target folder will be created by the current profile and the new folder name be unique. Uniqueness can be achieved with a folder content type that enables the incremental naming rule (link: ... ... ... ... ... ... ... ... ... ... ...).

Example:
```text
; #1 Create working folder
REQ: POST /OData.svc/Root/Benchmark
DATA: models=[{"__ContentType":"SystemFolder"}]
VAR: @FolderName = @Response.d.Name

; #2
WAIT: 200

; #3 Upload a file
UPLOAD: files\Test5M.txt /Root/Benchmark/<<@FolderName>>
SPEED: SLOW
```

### Templating: using variables
In request urls or data it is possible to mark places for substitution with variables defined earlier.

Placeholder format: *<< variablename >>*.

```text
; Create a new memo and memorize its name (generated by the server)
REQ: POST /OData.svc/workspaces/Project/madridprojectworkspace/Memos
DATA: models=[{"__ContentType":"Memo","Description":"asdf qwer"}]
VAR: @Name = @Response.d.Name

; 5 seconds pause
WAIT: 5000

; Modify a field of the created content
REQ: PATCH /OData.svc/workspaces/Project/madridprojectworkspace/Memos('<<@Name>>')
DATA: models=[{"Description":"description of <<@Name>>"}]
```

