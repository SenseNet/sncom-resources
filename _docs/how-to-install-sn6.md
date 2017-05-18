---
title:  "Install sensenet 6.5"
source_url: 'https://github.com/SenseNet/sensenet/docs/how-to-install-sn6-from-source.md'
category: Guides
version: v6.0.0
tags: install troubleshooting requirements sn6
---

# How to install sensenet 6.5

**sensenet** can be easily installed on any Windows based system (check the requirements section).
You can install **sensenet** using various methods:
- install from package, using the `Web deployment tool`
- install from source package
In the bottom of this article, you can find step-by-step tutorials for each installation method.

## Supported platforms ##

**sensenet Enterprise Content Management System** runs on the most relevant Microsoft platforms. The following tables show the operating systems and web servers that sensenet supports.

| **Environment**                                                                            | **Runs** | **Installable with Web Platform Installer or Web Deployment Tool**  |
| ------------------------------------------------------------------------------------------ |:--------:| -----:|
| Microsoft Windows 10 with **IIS 10**                                                       | ✔        | ✔ |
| Microsoft Windows 8.1 with **IIS 8.5**                                                     | ✔        | ✔ |
| Microsoft Windows 8 with **IIS 8**                                                         | ✔        | ✔ |
| Microsoft Windows Server 2012 R2 with **IIS 8.5**                                              | ✔        | ✔ |
| Microsoft Windows Server 2012 with **IIS 8**                                                   | ✔        | ✔ |
| Microsoft Windows Server 2008 R2 (x86 and x64) with **IIS 7.5**                                | ✔        | ✔ |
| Microsoft Windows 7 (x86 and x64) with **IIS 7.5**                                             | ✔        | ✔ |
| Microsoft Windows Server 2008 (x86 and x64) with **IIS 7.0**                                   | ✔        | ✔ |
| Microsoft Windows Server 2008 (Itanium) with **IIS 7.0 **                                      | ✔        | ✔ |
| Microsoft Windows Vista (x86 and x64) with **IIS 7.0**                                         | ✔        | ✔ |
| **Public hosting environment**, in most cases Microsoft Windows Server 2008 (x64) with **IIS 7.0** | ✔        | ✔ |

## Requirements ##

* .NET Framework 4.5.1 and ASP.NET must be present.
* MVC 3.0 from version 6.0.3.1007 - to version 6.0.7 (MVC is included in 6.0.8)
* SQL Server (the following versions are supported):
  * MS SQL Server 2014
  * MS SQL Server 2014 Express
  * MS SQL Server 2012
  * MS SQL Server 2012 Express
  * MS SQL Server 2008 R2
  * MS SQL Server 2008 R2 Express
  * MS SQL Server 2008 (without FILESTREAM support)
  * MS SQL Server 2008 Express (without FILESTREAM support)
* IIS (the following versions are supported):
* IIS 10
* IIS 8.5
* IIS 8
* IIS 7.5
* IIS 7.0
* sensenet will require 100MB of free space. The database of a production environment will likely consume much more space, depending on its purpose and how it is used. Provide sufficient hard disk space for the database.

**Please read the following page when installing sensenet to live production environments:**
[Configuration for Production Environment](#)

## Hardware requirements ##

[Hardware Requirements for Production Environment](#)

## Software requirements ##

[Software Requirements for Production Environment](#)

## Download ##

You can download the latest version of SenseNet Community Edition from our [Codeplex page](http://sensenet.codeplex.com/).

## Howtos ##

[How to install sensenet 6.5 from web deployment package]()
[How to install sensenet 6.5 from source package]()

## Troubleshooting ##

In the following sections, we'll provide solutions for the most common errors you may encounter during the installation process. Don't let these intimidate you - all of these obstacles can be easily tackled!

### Cannot connect to SNCR ###

Check the `web.config` file: look for the SQL connection string and see what user name and password was added there during the install process (it should not be the `sa` user but a custom account like _sensenet6_). This user should have access to the database that is also added to the connection string. Here's a [forum topic](http://forum.sensenet.com/viewtopic.php?f=3&t=7279&p=10803&hilit=404&sid=c79596c733ccd9b721b9566ecbe71faf#p10803) that might be helpful.

### 'Deploy' menu item does not appear in IIS ###

First of all, please make sure that **Web Deploy 3.5 or later** is installed on your system. If so, try restarting the IIS console. If the above still don't resolve the issue, go to **Add/Remove programs** in Windows and remove **Web Deploy 3.5**. Once it's done, install **Web Deploy 3.5 Hosting for servers**.
Still having trouble? Try installing from this [link](https://www.microsoft.com/en-us/download/details.aspx?id=39277), by choosing `Typical`.

### 404 error after a successful installation ###

First of all, check the port number: it should be set to **80**.
It is? In this case, the most common cause is that there is something wrong with your .NET framework. Please try reinstalling it.
Still get the error? In some cases, it turns our that the order in which you install the .NET framework and IIS is relevant. You will probably need to register IIS. You can either do it with running the following command:
```
%windir%\Microsoft.NET\Framework64\v4.0.30319\aspnet_regiis.exe -i
```
If running a 32 bit system, it should look like the following:
```
%windir%\Microsoft.NET\Framework\v4.0.21006\aspnet_regiis.exe -i
```
or you can download an [exe from Microsoft](http://msdn.microsoft.com/en-us/library/vstudio/k6h9cz8h(v=vs.100).aspx) to do it for you.

### Blank page on Default.aspx after installation ###

Your application development features might not be turned on in Windows. To resolve:
1. Press Windows key 
2. Type _Turn windows features on or off_ 
3. In the features window, click _Internet Information Services_
4. Click: _World Wide Web Services_
5. Click: _Application Development Features_
6. Click to enable features (`ASP` and `CGI` are not needed for sensenet).

### Error 500 - Internal server error ###

Error 500 after a successful installation usually means a problem with aspnet+iis binding. The best way to figure it out is to show the error message itself, by editing the `web.config` and setting the following: - uncomment and set customErrors mode to off - comment out the full httpErrors section
This way you will receive a more detailed error message and will have a better understanding of what you are looking at.
A common error is that ASP.Net is not completely installed with IIS, even though you checked that box in the **Add Feature** dialog. To fix this, simply run the following command at the command prompt
```
%windir%\Microsoft.NET\Framework64\v4.0.30319\aspnet_regiis.exe -i
```
If running a 32 bit system, it should look like the following:
```
%windir%\Microsoft.NET\Framework\v4.0.21006\aspnet_regiis.exe
```

### Error: Unable to load one or more of the requested types. ###

_Error: Unable to load one or more of the requested types. Retrieve the LoaderExceptions property for more information_

#### Unblock libraries ####

If the installation or site start fails because of dll load errors than make sure that all dll files in the _Tools_, _bin_, and _References_ folders are _unblocked_. You can unblock files in a single folder using the _Unblock-File_ command in **Windows PowerShell**:

```
dir "C:\SenseNet\References" <nowiki>|</nowiki> Unblock-File
dir "C:\SenseNet\Source\SenseNet\Website\bin" <nowiki>|</nowiki> Unblock-File
dir "C:\SenseNet\Source\SenseNet\Website\Tools" <nowiki>|</nowiki> Unblock-File
```

#### Missing library ####

There is a chance that there is a missing library in the environment - maybe one of the external libraries or a 3rd party plugin. Do you get the above error message after a successful install? Please make sure if all dlls are present in the **web\bin** folder and (in case you get the error when executing a tool, like `IndexPopulator`) the **web\Tools** folder, especially these:

* Microsoft.AspNet.SignalR.Client.dll
* Microsoft.Owin.Security.dll
* Microsoft.Web.Infrastucture.dll
* System.Web.Mvc.dll
* System.Web.Razor.dll
* Systems.Web.WebPages.Deployment.dll
* Systems.Web.WebPages.dll
* Systems.Web.WebPages.Razor.dll

If you cannot find any one of these, download the source package and copy the dlls manually from the _References_ folder.
If the portal runs correctly and you get this error executing a tool in the **web\Tools** folder, you may try to copy the missing files from the **web\bin** folder to the **Tools** folder as a workaround.