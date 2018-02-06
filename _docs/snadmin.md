---
title: "SnAdmin"
source_url: 'https://github.com/SenseNet/sn-admin/blob/master/docs/SnAdmin.md'
category: Development
version: v7.0
tags: [snadmin, upgrade, package, sn6, sn7]
description: sensenet ECM is a web application but it is a lot more complex than a simple web CMS. Patching, upgrading or executing batch operations on the core product (or a custom solution built on it) is one of the most important tasks of developers and operators. This article introduces SnAdmin that is the tool that operators will use for these tasks in sensenet ECM. You can use this tool to execute patches, perform upgrades or simply import a few content. It can be considered as a framework also that is extendible by third party developers to perform custom tasks.
---

# SnAdmin
**sensenet ECM** is a web application but it is a lot more complex than a simple web CMS. 
**Patching, upgrading or executing batch operations** on the core product (or a custom solution built on it) is one of the most important tasks of developers and operators. This article introduces **SnAdmin** that is the tool that operators will use for these tasks in sensenet ECM. You can use this tool to execute patches, perform upgrades or simply import a few content. It can be considered as a **framework** also that is extendible by third party developers to [perform custom tasks](https://github.com/SenseNet/sensenet/blob/master/docs/snadmin-create-custom-step.md).

> This article focuses on features that are available in SnAdmin **version 1.4+**, that is published alongside sensenet ECM 7.0+. To read about previous SnAdmin versions that work with sensenet ECM 6.5, please [follow this link](http://wiki.sensenet.com/SnAdmin).

SnAdmin also offers a growing number of [built-in tools](https://github.com/SenseNet/sensenet/blob/master/docs/snadmin-tools.md) that will let you perform common operations like importing content items. 

### What is a package?
The SnAdmin tool is a console application that executes a **package**. A package is a **zip file** that encapsulates *operations* and *data*. Portal builders and developers create these packages containing all the content and executables for a feature or a bugfix. A package should be executed on a dev machine or a test server first, minimizing the chance of installation errors in a production environment.

SnAdmin checks **prerequisites** and [component dependencies](https://github.com/SenseNet/sensenet/blob/master/docs/sensenet-components.md), executes all the **steps** (similar to workflow activities) defined in the package **manifest**, registers the package and handles component versions. There are a couple of built-in steps in the system, the workflow is highly customizable and developers can write custom install steps in a few minutes.

The following list contains what a package can do.
* manage content in the Content Repository (it has full access to the sensenet ECM .Net api)
* add or update libraries (e.g. in the web folder)
* manage (copy, delete or edit) files in the file system
* execute SQL scripts
* execute custom code to perform any filesystem or content repository operation

### Executing a package
In a nutshell, executing a package is simply invoking the SnAdmin command line tool with the package name.
```txt
SnAdmin.exe packagename [parameters]
```
To learn more about package execution, jump to the [package execution details](#PackageExecution) section below.

## SnAdmin and sensenet ECM instance
During package execution the **web application must be stopped** because SnAdmin may modify the file structure under the web folder, may change the assembly set or execute database scripts (with schema modification).

The package execution process can also use [Content Repository](http://wiki.sensenet.com/Content_Repository) services: SnAdmin can start and stop the Content Repository one or more times during the install process and the steps can manage content freely. In this case the SnAdmin tool is the host process.

There is no way to undo a faulty execution so creating a backup is a must. To prevent execution errors in production environment, testing the package on test servers is also recommended.

>**WARNING!** The sensenet ECM web application **must be stopped on every web server** in the NLBS. Creating a backup of the database, the web folder (including the Lucene index) is strongly recommended.***

As you can see below in the configuration section, when working in an NLBS environment, you will need to provide all the network paths to the SnAdmin tool. This is necessary to keep all web applications in sync: every operation defined in the package that **manages file system entries** (e.g. a copy or delete) **will be executed on all of the configured web servers automatically** (at least in case of the built-in steps).

#### Advanced: importing without stopping web applications
>There is one exception from the best practice stated above, when you may execute SnAdmin without stopping all the web applications in the NLBS. To work like that, your environment will need to fulfill all the following requirements:
>* the package can only contain **content to import**. No file system or SQL changes are allowed.
>* MSMQ is properly configured in the SnAdminRuntime configuration (the tool will act as a standalone web node).
>* the web application which is on the same machine as SnAdmin still must be stopped, *if they use the same Lucene index*.
>* you may leave all other web applications running.

## The package
In this section you can learn about the package itself and how to execute and construct one.

### One package - one component
A package is related to a single component - either a built-in one, or a 3rd party component. Every package contains a component id that appoints the component (for example *SenseNet.Services* or *SenseNet.WebPages*).

### Package type
A package can have one of the following types:
* **Install:** A component's first package must be an 'install' package. This is the package that injects a new component into the system. An install package must contain a new component identifier that is unknown to the system. Packages of this type can be executed multiple times by default - but only if the *multipleExecution* flag is switched on in the header (which is the default). In case package creators want to prevent multiple package execution, they have to include this flag in the header with a 'false' value.
* **Patch:** Contains small modifications (e.g. a couple of new content to import or a bugfix in a dll). Usually patches form a chain where every package assumes the existence of all the previous ones but it is not mandatory. It is possible to control this behavior, see version control below.
* **Tool:** Can contain small repeatable activities that do not perform significant changes but can be important because of business or technical reasons. A good example is performing an undo checkout on multiple content. Executing a package of this type does not change the component's version number but the execution is logged and registered in the db.

### Versioning
One of the most important features of this packaging infrastructure is version tracking. Packages will be the subject of a **prerequisite check**:

1. Version numbers in subsequent packages must be greater than in preceeding ones.
2. Every dependent component's version must be within the specified boundaries.

Choosing he right version number is the component developer's responsibility.
 It is strongly recommended to use a consistent versioning style. General guidelines:
* [Software versioning](https://en.wikipedia.org/wiki/Software_versioning)

You can check the current version information of installed components using the following OData function:
* [Get VersionInfo](http://wiki.sensenet.com/Built-in_OData_actions_and_functions#Get_VersionInfo_-_from_version_6.3.1)

### Package contents
A package is a zip file thats behavior and contents is described in a single **manifest file** in the package root. It is an XML file containing the metadata for executing the package, as described below. All other material in the package (e.g. dlls and content files) should be in subfolders.

### The manifest
This file is required in every package. It contains all metadata and description of the activities (steps). The manifest is an XML file. There is no restriction on the name of the manifest file, but we recommend a name that describes the purpose (e.g. 'manifest.xml'). There is no explicit schema definition for this file but SnAdmin performs many semantic checks before executing the steps. The manifest has two main sections under the document element (called *Package*):
* a metadata header: a number of XML nodes defining the package
* a list of steps to execute

An example manifest:

![Sample manifest](https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/img/snadmin/manifest.png "Sample manifest")

#### Metadata
In the metadata section there are required and optional, independent and interrelated parts. Let's look at the details.
* **Package:** root node with the following attributes
  * **type** attribute (line 2) (required): the value can be one of the following:
    * **Install:** checks whether the component exists and registers it. Only a *non-existent* component can be installed.
    * **Patch:** this package always increase an *existing* component's version.
    * **Tool:** does not raise the version so it can be executed more than once.
  * **multipleExecution** attribute (optional): if set to *false* in an Install package, the package cannot be executed multiple times. Default is *true*. 
* **Id** element (line 3) (required): the value of this identifier must be unique. It can be a fully qualified name or even a GUID. See a good namespace convention on MSDN:
   * &lt;Company>.(&lt;Product>|&lt;Technology>)[.&lt;Feature>][.&lt;Subnamespace>]).
   
   It is the package builder's responsibility to make sure of the uniqueness of the application identifier.
* **Description** element (line 4) (optional): additional information about the package. May contain publisher, vendor or developer information up to 1000 characters.
* **Version** element (line 5) (required): determines the version of the component. The version must be greater than the previously installed package if the package type is Patch. In case of a Tool package, there is no restriction on the version.
* **ReleaseDate** element (line 6) (required): must contain a well-formed date. ISO date format (e.g. '2014-04-16' or '2014-04-16 12:30:00') is recommended. This date and time must be smaller than the current date (*DateTime.UtcNow*).
* **Dependencies** element (line 7-10) (optional): contains Dependency elements.
  * **Dependency** element (line 8, 9): defines a component that need to be installed beforehand. The attributes:
    * **id** (required): unique identifier of the expected component.
    * **version** (optional): the expected component's exact version.
    * **minVersion** (optional): the component's version must be greater than or equal to this value.
    * **minVersionExclusive** (optional): the component's version must be greater than this value.
    * **maxVersion** (optional): the component's version must be less than or equal to this value.
    * **maxVersionExclusive** (optional): the component's version must be less than this value.

**Optional messages**

In some cases it may be necessary to inform the operator after the package execution about the result.
If the package execution is not repeatable (e.g. because it contains complicated steps that must not be executed more than once) it is strongly recommended to inform the operator in an error message that he needs to restore the database and the web folder before executing the package again. 

>**A smart package**: It is advisable that you design your package in a way that it can be executed more than once. E.g. use existence checks in SQL scripts and config file modifications.

There are three optional elements for this purpose in the head of the manifest:
* **SuccessMessage** element (optional): the element's inner text is displayed when the package execution was successfull.
* **WarningMessage** element (optional): the element's inner text is displayed when the package execution is terminated by a Terminate step and its Reason property is Warning.
* **ErrorMessage** element (optional): the element's inner text is displayed when the package execution is completed with an error.

For example:
```xml
<Package ...
  ...
  <SuccessMessage>The tool has been successfully executed.</SuccessMessage>
  <WarningMessage>The tool has been terminated by a Terminate step. See the warning message above.</WarningMessage>
  <ErrorMessage>Execution finished with a serious error. Please restore the database and the web folder.</ErrorMessage>
  <Steps>
  ...
```
Successful execution:

![Success message](https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/img/snadmin/600px-SnAdminSuccessMessage.png "Success message")

Warning message:

![Warning message](https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/img/snadmin/600px-SnAdminWarningMessage.png "Warning message")

Error message:

![Error message](https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/img/snadmin/600px-SnAdminErrorMessage.png "Error message")

### Example
The following sample manifest contains a couple of common steps:
* deploys some libraries
* starts the repository
* imports new content types and items
```xml
<Package type='Application' level='Patch'>
  <Id>MyComponent</Id>
  <Description>My feature</Description>
  <Version>3.2</Version>
  <ReleaseDate>2017-04-01</ReleaseDate>
  <Steps>
      <!--============================================================ Web binaries -->
      <Copy targetDirectory='bin' source='bin\MyCustomLibrary.dll' />
      <Copy targetDirectory='bin' source='bin\PluginLibrary.dll' /> 
      <!--============================================== Content Repository changes -->
      <StartRepository /> 
      <!--=================================================== Content modifications -->      
      <Import source='import' target='/Root' />
  </Steps>
</Package>
```

### Steps
The list of steps in the manifest describes what a package will actually do. You can see a list of the things a step can do above. After the package manager extracted the zip into the file system and checked prerequisites, the steps are executed one after another.

A step xml element in the manifest file appoints the code that will be executed and also defines the properties of a step codebehind class using xml attributes.

#### Step name
The name of a step element in the XML is the **step class name**. Developers may override the default name in source code. SnAdmin allows you to use the fully qualified name of the underlying step class. In case of name duplication, you can use the fully qualified name instead of the short name of the step. For example the following two steps are equivalent:
``` xml
<Delete>App_Data\readme.txt</Delete>
<SenseNet.Packaging.Steps.Delete>App_Data\readme.txt</SenseNet.Packaging.Steps.Delete>
```
The short and full names of the built-in steps can be found in the *Built-in steps* section below.

#### Step properties
The step XML element may have some properties. To increase readability of the manifest XML the properties can appear either as **XML attributes** or **sub-elements** of the step element. And if the developer defines a 'default property', then the value can appear as the **inner text** of the step element also. Attribute or element names and the mapped property names are equal. So there are three ways to define a step property. In the following example we define a custom step that's name is *Compare* and has two properties: *SourceFile* (default property) and *TargetFile*:

The **attribute** model:
``` XML
<Compare sourceFile="files\readme.txt" targetFile="bin\readme.txt" />
```
The **default-property** model (default property is explicitly defined by the developer):
``` XML
<Compare targetFile="bin\readme.txt">files\readme.txt</Compare>
```
The **element** model:
``` XML
<Compare>
    <SourceFile>files\readme.txt</SourceFile>
    <TargetFile>bin\readme.txt</TargetFile>
</Compare>
```
The step definitions above are equivalent. There are two prohibited mixed models:

Attribute and element **name collision** in the mixed model **causes an exception**:
``` XML
<Compare sourceFile="files\readme.txt">
    <SourceFile>files\readme.txt</SourceFile>
    <TargetFile>bin\readme.txt</TargetFile>
</Compare>
```
Using **sub-elements and default property** in one model **causes an exception**:
``` XML
<Compare>
    files\readme.txt
    <TargetFile>bin\readme.txt</TargetFile>
</Compare>
```
The attributes or sub-elements will be mapped to the strongly typed properties automatically. The type of a property must be *IConvertible*. The XML values will be converted through this interface from string to the target type. If the property is not convertible, an *InvalidPackageException* will be thrown.

#### File paths in steps
Steps often reference **files** or **folders** that can be sources or targets. They are usually file system paths, but in a few cases they can be Content Repository paths, depending on the capabilities of the step (e.g. *Delete*). It is the responsibility of the step developer that the step understands relative paths. If a path is relative, it may mean one of the following:
- relative to the current *package root*
- relative to the current *web directory*.

A step that understands any of the above usually exposes a property where you can set which behavior you want in that case.

>Please note that a package is portable only if it can handle **relative paths**. All built-in steps use relative paths. It is strongly recommended to use this approach in all custom steps too.

### Conditional steps
It is possible to execute steps based on a condition. This means a step (or a list of steps) is executed only if a given condition is fulfilled. For example a config file is modified only if the file actually exists. Or you can check if a certain content exists in the Content Repository.
``` xml
<IfFileExists Path="custom.config">
   <Then>
      <Step1 />
   </Then>
   <Else>
      <Step2 />
      <Step3 />
   </Else>
</IfFileExists>
```
Please look for the [built-in conditional steps](https://github.com/SenseNet/sensenet/blob/master/docs/snadmin-builtin-steps.md), or create your own custom conditional step by inheriting from the following base class:
-   *SenseNet.Packaging.Steps.ConditionalStep*

### Built-in steps
There are many built-in steps in the product that you can use to build your own packages. Please check the following article for the complete list:
- [Built-in steps](https://github.com/SenseNet/sensenet/blob/master/docs/snadmin-builtin-steps.md)

### Custom Steps
It is possible to create custom install steps for the packaging framework. That is the way to customize the install process for custom applications built on sensenet ECM, executing ad-hoc tools and hotfixes. Please visit the following article for details:
- [How to create a custom install step](https://github.com/SenseNet/sensenet/blob/master/docs/snadmin-create-custom-step.md)

### Phases
It is possible to define multiple lists of steps inside a package (in the manifest). These lists are called *Phases* and they serve only one purpose: you need to place steps that need a **different dll set** into separate phases. For example you need to perform a couple of tasks with the old dll set (e.g. export content using the old content handlers), then switch to the new dlls inside the package. In this case you put the first steps (including the copy step) into the first phase and put the rest to the next phase.

SnAdmin tool **will restart itself** between phases and will be executed with the new dll set. The execution will continue with the step where it left off.

Phase example
``` xml
<Steps>
    <Phase>
        <Export />
        <Copy />
    </Phase>
    <Phase>
        <Delete />
        <Import />
    </Phase>
</Steps>
```
Each phase is independent during the SnAdmin execution. It means every phase is parsed and executed independently. This way it is possible to install or upgrade a class library with new step types and use these in a following phase in the same package. This execution model has only one disadvantage: if the manifest xml contains invalid parts in a later phase, an exception will be thrown only in the incorrect phase after the successful execution of the previous phases. In this case the package may leave unwanted elements in the database or the file system. To minimize the chance of these cases you always need to test the package on a test server before executing it on a production server.

### Directory structure in the package
The package zip file should contain only one XML file in the root (the manifest), all additional content should be in subfolders. There is no naming convention for the subfolders - except [the one for developers](https://github.com/SenseNet/sensenet/blob/master/docs/snadmin-create-custom-step.md).

You can name your folders as you wish, but it is recommended to follow these rules:
- provide content files to import in a separate folder (e.g. called *import*)
- provide libraries in a separate folder (e.g. *bin* or *lib*)

You will have to reference these folders in your manifest file at the appropriate step.

<a name="PackageExecution"></a>
## Executing a package
In this section you will learn how to use the SnAdmin tool to execute a package, what is happening in the background and how to monitor and troubleshoot the process.

### SnAdmin directory structure
In this section we describe the recommended directory structure of the SnAdmin tool in the file system. For details about the full structure of the web folder, please visit the following article:
- [Web folder structure](http://wiki.sensenet.com/Web_folder_structure)

The SnAdmin feature resides *inside* the web folder in a subfolder called *Admin*.

We created the default Web folder structure to make automatic updates easier. It is advisable to keep the default structure intact to avoid manual updates later.
``` text
<Drive>:\
    ....
    <WebSite>
        bin
        App_Data
        ....
        Web.config
        Admin
            bin
                SnAdmin.exe
                ....
            run
                ....
            log
                Package1_20140429-034910.log
                ....
            Package1
                ....
                Manifest.xml
            Package1.zip
```

### SnAdmin subfolders

- **bin**: Place of the SnAdmin.exe and its referenced assemblies. SnAdmin **must be launched from here**.
- **run**: Automatically created directory for sandboxing the phases. Every phase starts with cleaning up this folder, copying the files from the *web\\bin* and the *web\\Tools* folders, then executes the *SnAdminRuntime* tool from here. This concept supports *web\\bin* manipulations without locking files.
- **log**: Automatically created directory for storing log files. Every SnAdmin execution creates a log file. The name is the package name suffixed with date and time (e.g. *Package1.zip\_20140429-034910.log*).

## Configuration
You can configure the behavior of package execution in the following config file:
- web\Tools\ **SnAdminRuntime.exe.config**

It is recommended to omit the optional values and let the tool fallback to the default values when it is possible.

- **NetworkTargets** (*optional*): web directory paths on *remote* web servers in case of NLBS environment. Comma or semicolon separated list of UNC paths. For example: *\\\\Server1\\SensenetWeb;\\\\Server2\\SensenetWeb*.
- **IndexDirectoryPath** (*optional*): Container directory of the Lucene index files. Can be absolute or relative to the TargetDirectory. *Default*: 'LuceneIndex' directory in the target web directory's App\_Data folder (which is the same that the web app uses).
- **EnableOuterSearchEngine**: switches on or off the instant indexing. Our recommendation: always “true” (switched on).

> Please make sure that you keep the SnAdminRuntime configuration **up-to-date with Web.config**! For example if you change the assembly bindings in the *runtime* section in Web.config, you'll have to make the same changes here.

### Config examples
Default structure and single server
``` xml
<!--<add key="NetworkTargets" value="\\Server1\SensenetWeb;\\Server2\SensenetWeb" />-->
<!--<add key="ClusterChannelProvider" value="SenseNet.Communication.Messaging.MsmqChannelProvider, SenseNet.Storage" />-->
<!--<add key="MsmqChannelQueueName" value=".\private$\server1;.\private$\server2" />-->
<!--<add key="IndexDirectoryPath" value="" />-->
<add key="EnableOuterSearchEngine" value="true" />
```
Default structure and NLBS
``` xml
<add key="NetworkTargets" value="\\Server1\SensenetWeb;\\Server2\SensenetWeb" />
<add key="ClusterChannelProvider" value="SenseNet.Communication.Messaging.MsmqChannelProvider, SenseNet.Storage" />
<add key="MsmqChannelQueueName" value=".\private$\server1;.\private$\server2" />
<!--<add key="IndexDirectoryPath" value="" />-->
<add key="EnableOuterSearchEngine" value="true" />
```

## Arguments
When you start the SnAdmin tool, there are a couple of arguments you can use to customize its behavior.
``` text
SnAdmin[.exe] <package> [<target>] [LOGLEVEL:<loglevel>] [-HELP|-?] [-SCHEMA] [FORCEDREINSTALL:true] [-WAIT]
```
- **&lt;package>**: Zip package file or directory. Can be a name, relative or absolute path of the package to execute.
- **&lt;target>**: Web directory of a **stopped** SenseNet instance. This argument overrides the configured or default value.
- **&lt;loglevel>**: use this to customize the logging level of the package execution. Available values:
    - **Default**: Package information will be written to the database, execution process will be written to a log file and to the console.
    - **File**: Package information will *not* be written to the database. The execution process will be written to a log file and to the console.
    - **Console**: Information will be written to the console only.
    - **Silent**: No feedback at all.
- **FORCEDREINSTALL:true**: in case you install the core layer ([sensenet ECM Services](https://github.com/SenseNet/sensenet)) and the db already exists, you can instruct SnAdmin to skip initial component check and proceed with the db creation (note that there is *no dash* in front of this parameter!).
- **-HELP** or **-?**: Prints out all loaded assemblies and available step types and their parameters.
- **-SCHEMA**: Generates the SenseNetPackage.xsd XML schema for the pakage and saves it to the &lt;WebSite>/Admin/bin directory. This schema can be used for code completion in the Visual Studio. The schema is instantly generated based on all available steps and their parameters and annotations.
- **-WAIT**: Starts the SnAdmin.exe and waits for user interaction. This parameter is used for debugging sessions. The developer can attach the SnAdmin or SnAdminRuntime process, presses the &lt;enter> and the process runs away.

### Execution examples
#### Example 1
``` text
Web\Admin\bin\SnAdmin package1
```
- If 'package1' directory exists, the **extraction is skipped**.
- If 'package1' directory does not exist, the zip file with the same name will be extracted under the newly created 'package1' directory.
- If 'package1.zip' does not exist, the tool will be terminated with a 'Given package file does not exist' error message.

#### Example 2
``` text
Web\Admin\bin\SnAdmin package1.zip
```
- If 'package1.zip' file does not exist, the tool will be terminated with a 'Given package file does not exist' message.
-   If 'package1' exists, it will be deleted and re-created (*this is a different behavior than in the previous example!*).
- The package will be extracted under the 'package1' directory.

## Logging
Log files are placed into the *log* folder of the package directory. File name contains the package name and execution date and time. A log file head contains the following data:
- SnAdmin version number
- Package execution date-time
- Package name
- Information about extracting the package (if it is a zip file)
- Manifest head information: Package name, type, component id, current version

After execution the log file will contain essential information about the executed steps, and all the log produced by those steps.

## Getting package information
After executing a package and starting the site you can check the packages with a [OData function] that exposes information about the installed components and libraries:
``` text
http://example.com/OData.svc('root')/GetVersionInfo
```
This function returns a JSON object that contains all packaging information: installed sensenet ECM version, installed components, loaded assemblies, and all executed packages.
>If you have the [WebPages](https://github.com/SenseNet/sn-webpages) component installed, you get a page that displays this information in a human readable format.

### Package execution result
In most cases packages are executed successfully, but sometimes the execution fails - maybe because there was a conflict in the Content Repository or an unexpected exception occured during execution. We register the result of every package execution to let administrators keep track of what happened. The possible outcomes are the following:

- *Successful*: the package executed correctly
- *Faulty*: there was an error during execution (see the *ExecutionError* property below for details)
- *Unfinished*: the package stopped and must be re-executed (e.g. because of a power outage)

If the execution was not successful, you must correct the possible errors and execute the package again, because the database may be in an unknown state. In case of complex packages the best solution is to restore the database and execute the corrected package on it.

## Package variables
In the manifest file there is a possibility to use variables to pass information between steps. **Variables are phase-level** entities, accessible across all steps in that phase. One step may fill a variable that is used by another step.

A variable is identified by its name, that always starts with an **@** sign. You can create a variable by simply assiging it a value, there is no 'declaration' needed.

An example for renaming a file based on a condition, using a variable:

```xml
<IfCondition Condition="@conditionValue">
   <Then>
      <Assign Name="@newName">FileName1</Assign>
   </Then>
   <Else>
      <Assign Name="@newName">DifferentName</Assign>
   </Else>
</IfCondition>
<Rename Source="@path" SourceIsRelativeTo="TargetDirectory">@newName</Rename>
```

## Package parameters
Some packages expose parameters that can be provided during execution. Parameters may have a default value that is overridden by the operator who executes the package and provided that parameter.

```xml
<Package type='Install'>
  <Id>SenseNet.Services</Id>
  ...
  <Version>7.0.0</Version>
  <Parameters>
    <Parameter name="@dataSource" description="Name of the database server (. or MACHINENAME\SQL2016). Default: .">.</Parameter>
    <Parameter name="@initialCatalog" description="Database name for the repository. Default: sensenet.">sensenet</Parameter>    
    <Parameter name="@recreateDbIfExists">false</Parameter>    
  </Parameters>
  ...
```

When you execture the package, you can provide a new value for a parameter as a command line argument:

```txt
SnAdmin package1 datasource:MYMACHINE\ServerName initialcatalog:sensenet7
```

>Note that parameter names are **case-insensitive**.

To see the available parameters of a package, just invoke the package with the -HELP argument and you will see the parameter list with descriptions.

```txt
SnAdmin packagename -help
```

## Updating Task executors
If you are using the [Task Management](https://github.com/SenseNet/sn-taskmanagement) component, you will have to update the task executors related to sensenet ECM (e.g. the *preview generator* or the *AD synchron* tools) **manually** after you executed a patch that contains a newer version of these executors. The reason behind this is that the Task Management component itself is a standalone application that is independent from sensenet ECM and the executors are deployed in a different environment (likely on a dedicated server) than the main sensenet ECM web application.

As the latest executor tools are deployed in the *web\\TaskManagement* folder of sensenet ECM in the same structure as task management expects it, you only have to copy the latest files to your task management environment (agent machines). The only thing you have to take care of is *merging configuration files manually*.