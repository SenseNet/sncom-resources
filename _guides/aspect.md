---
title:  "Aspect"
tags: [aspect, field, content, content type]
description: Aspect
permalink: /guides/content-type-system/aspect
index: 6
---

## Aspect

When you build your sebsenet solution, you can define the structure of your content and its fields in the Content Type Definition. There are cases when it makes no sense to add the custom fields to the Content Type itself because you do not need those fields (e.g. document or workspace metadata) on every content of that type. In this case you can use an aspect to define the necessary fields for a feature (e.g. Rating) globally and attach it to any content that actually needs it. This way the set of fields related to a feature can be managed in one block, without adding unnecessary noise and irrelevant metadata to content that do not need it.

### The aspect

An aspect is a simple content itself that defines a set of fields for a feature. It has a field called AspectDefinition that stores all the defined fields (in XML format, but you will not need to edit this XML manually). These fields can be any kind of fields you are used to define in a CTD. Aspect content must have a globally unique name and are stored in the following repository folder:

- /Root/System/Schema/Aspects

There is no special API for creating aspect content (except for defining the fields as you can see below). The aspect content itself can be created the same way as any other content - e.g. from code or using the Sense/Net OData REST API.

### Content and fields

Any content may have a reference to one or more globally defined aspects. The content will get all the fields defined on the aspect. To avoid name collision, aspect fields appear with a prefix on the content. The prefix is the name of the aspect (that is globally unique). You can refer to the aspect fields in the following way:

- "[aspect name].[field name]"
- 
For example:

``` js
var value = myContent["Rating.RateValue"];
```

### Attach aspect to a content

Attaching an aspect to a content is only possible from source code or using an OData request - currently there is no user interface for it. You can use the following methods to add or remove aspects from a single content:

```csharp
var content = Content.Load(myContentPath);
 
//add aspects by path or name
content.AddAspects("/Root/System/Schema/Aspects/Aspect1", "Aspect2", "Aspect3");
 
//add aspects by id
content.AddAspects(123, 456, 789);
 
//add aspects by the full aspect content
content.AddAspects(aspect3);
 
//set field values (optional)
content["Aspect1.Field1"] = "aspect text";
content["aspect3.NumField"] = numberValue;
 
// save the content (you must do this manually)
content.Save();
```

### Manage aspect fields

As a developer you can modify the aspect by adding or removing fields. The following example demonstrates how can you create a field info object and add it to an aspect.

```csharp
var aspectContent = Content.CreateNew("Aspect", AspectsFolder, "MyAspect");
aspectContent.Save();
aspect = (Aspect)aspectContent.ContentHandler;
 
var fi1 = new FieldInfo { Name = "Field1", Type = "ShortText" };
var fi2 = new FieldInfo { Name = "Field2", Type = "Number" };
 
//if there are fields with the same name you 
//provide, a silent update will be performed
aspect.AddFields(fi1, fi2);
 
//you do not have to save the aspect here, it is automatically
//saved by the AddFields and RemoveFields methods
```

When you no longer need a field in an aspect, you may remove it in the following ways:

```csharp
//remove one or more fields
aspect.RemoveFields(fieldName1, fieldName2);
 
//remove all fields
aspect.RemoveAllfields();
```

```diff
Please note that modifying an aspect that is already connected to content does not modify the content itself. You need to save all content manually to apply the changes - e.g. when removing a field from an aspect.
```

#### Field info

The field info object mentioned above describes the properties of one field. It mirrors the XML fragment that you can see in a regular CTD. Using a field info you can inform the system about the type, visibility or indexing settings of the field. You may omit any unnecessary settings and provide only the information you have, the rest will be filled with default settings. Field info has the following properties that you can set:

- Name: Name of the Field
- Type: Short type name of the Field (e.g.: ShortText, Number, etc.)
- Handler: Fully qualified type name of the Field. If it is not null, the Type property is ignored.
- DisplayName: Human readable name of the Field.
- Description: Detailed information of the Field.
- Icon: Icon of the Field.
- Bind: Property name if the Field name is different from the underlying property name of the content handler class, or desired storing name.
- Indexing: Carries indexing information (type: IndexingInfo - see below)
- Configuration: Complex configuration of the Field (type: ConfigurationInfo - see below)
- AppInfo: Contains any unprocessed information.

#### Indexing info

This type describes the way a field must be indexed using the Lucene indexing engine.

- Mode: IndexingMode (integer values for: Analyzed, AnalyzedNoNorms, No, NotAnalyzed, NotAnalyzedNoNorms - 0, 1, ... respectively)
- Store: IndexStoringMode (integer values for: No, Yes - 0, 1 respectively)
- TermVector: IndexTermVector (integer values for: No, WithOffsets, WithPositions, WithPositionsOffsets, Yes - 0, 1, ... respectively)
- Analyzer: Fully qualified type name of the associated Analyzer
- IndexHandler: Fully qualified type name of the associated FieldIndexHandler

#### Configuration info

To let specific field types have their own settings, the field info can be extended with a set of custom settings called the configuration info. It has a couple of properties for every field type and a dictionary for storing custom field configuration - e.g. the options for a Choice Field.

- Handler: Gets or sets the fully qualified type name of the FieldSetting descendant if it is different from the default of the corresponding Field's type.
- ReadOnly: Gets or sets the writeability of the Field. If the value is false, the Field will be read-only regardles of whether the underlying property is writeable or not. Null value means the Field is read/write except if the underlying property is read only. Default value: null.
- Compulsory: Gets or sets whether the Field is nullable or not. True if the value cannot be null. Default value: null.
- OutputMethod: Gets or sets the the handling method of the output in some web sceario: depending on the OutputMethod the field value will be escaped or sanitized. (integer values for: Default, Raw, Text, Html)
- DefaultValue: Gets or sets the default value of the Field.
- VisibleBrowse: Visibility setting in Browse mode (integer values for: Show, Hide, Advanced)
- VisibleEdit: Visibility setting in Edit mode
- VisibleNew: Visibility setting in New mode
- ControlHint: additional info for the field control (e.g: control name)
- FieldIndex: defines the ordering of fields in generic views
- FieldSpecific: Gets or sets other field specific information in a dictionary. The value must be JSON serializable.

### REST API

You can manage all aspects of the aspect feature through OData requests. Creating aspects can be achieved the usual way; managing aspects and fields is done with sensenet OData actions.

>> You can modify the accessibility of these actions by setting the permissions of the applications related to these actions in the repository. E.g. /Root/(apps)/GenericContent/AddAspects

These actions work for all kinds of content:

- AddAspects: attach apects to the content. Parameters: 'aspects' (string array for aspect paths or names).
- RemoveAspects: delete aspects from a content. Parameters: 'aspects' (string array for aspect paths or names).
- RemoveAllAspects: no parameters, removes all aspects.

These actions work for aspects:

- AddFields: FieldInfo array in JSON format. Parameter: 'fields'.
- RemoveFields: delete fields from an aspect. Parameters: 'fields' (string array for field names without prefix).
- RemoveAllFields: no parameters, removes all fields.
- RetrieveFields: Retrieves all fields that are currently on the Aspect. (No parameters.)

This is how a FieldInfo object looks like in JSON:

```json
[{
  "Name":"Field4",
  "Type":"ShortText",
  "Handler":"SenseNet.ContentRepository.Fields.ShortTextField",
  "DisplayName":"Field Four",
  "Description":"",
  "Icon":"",
  "Indexing": {
    "Mode":0,
    "Store":0,
    "TermVector":0,
    "Analyzer":"Lucene.Net.Analysis.KeywordAnalyzer",
    "IndexHandler":"SenseNet.Search.Indexing.LowerStringIndexHandler"
  },
  "Configuration": {
    "ReadOnly":false,
    "Compulsory":false,
    "OutputMethod":0,
    "VisibleBrowse":0,
    "VisibleEdit":0,
    "VisibleNew":0,
    "FieldIndex":12,
    "FieldSpecific": {
      "Regex":"[a-zA-Z0-9_]",
      "MinLength":42
    }
  }
}]
```