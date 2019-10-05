---
title: Viewing Documents in the Browser
source_url: https://github.com/SenseNet/sensenet/blob/master/docs/viewing-documents-in-the-browser.md
category: Guide
version: v7.0.0
tags: [documents, docx, xls, word, excel, presentation, powerpoint]
---

# Viewing Documents in the Browser

## Overview

Managing Office documents is a popular feature in every ECM system. Sense/Net ECM also comes with built-in document management features like Office integration that enables the users to directly open Office documents from the repository and edit them using Microsoft Office. It is however in many cases desired to open documents from the web browser directly even if Microsoft Office (or another desktop office application) is not installed on the user's computer. The Enterprise Edition of Sense/Net comes with an integrated document preview generator that creates images of documents in the background that can be viewed in any browser.

## Details

When the user uploads or modifies a document Sense/Net generates preview images of the document and persists them into the Content Repository. These images then can be viewed by users in the browser and thus no desktop application is required to view contents of a document.

The preview generator implementation uses a provider approach, which means that you can easily use a different preview generation technology than the one that comes with Sense/Net. Also, this way the whole preview generation feature can be turned on and off just by a simple web.config setting. See the Configuration section for details.

## Supported Document Types

The supported document types depend on the preview generator implementation. The built-in generator supports the following types:

- **Microsoft Office Word documents (.doc, .docx)**
    - a single image is generated for every page of the document

- **Microsoft Office Excel workbooks (.xls, .xlsx, .xlsm, .xltm, .xltx)**
    - a single image is generated for every worksheet

- **Microsoft Office Powerpoint presentations (.ppt, .pptx, .pot, .potx, .ppsx, .pptx)**
    - a single image is generated for every worksheet

- **Microsoft Office Project files (.mpp)**
    - a single image is generated for every worksheet

- **Microsoft Visio files (.vsd, .vdx, .vss, .vst, .vsx, .vtx, .vdw)**
    - a single image is generated for every page

- **Open Document Format files (.ods, .odp, .odt)**
    - a single image is generated for every page

- **Adobe Portable Document Format (.pdf)**
    - a single image is generated for every page

- **Images (.gif, .jpg, .jpeg, .bmp, .png, .svg, .exif, .icon, .tiff, .tif)**
    - a single image is generated for every image

- **Email files (.msg)** (_from version 6.3.1 Patch 3_)
    - a single image is generated for every page of the document

- **Other file formats (.xml, .txt, .rtf, .csv)**
    - a single image is generated for every page
    
## Document Viewer

When you click on a document in a document library (or choose the Preview item from its menu) you'll see a preview of the document along with some metadata and a few editing features (depending on your permissions). About adding redactions and annotations see the restriction section later.


## Preview Image Generation

- Whenever a user modifies or uploads a document anywhere in the Content Repository, a new task will be registered (see the Task Management article for details) for generating images. Only a configured number of images will be generated in one round: one task is defined for only a small page interval (e.g. 1-10, 11-20, see the settings section below).
- Also if a user visits the preview page of a document and there are missing preview images (e.g. the user scrolls toward the end of the document), the system will generate new tasks for the missing intervals too. The advantage of this is that it is possible to have multiple tasks for the same document for different intervals, and have multiple preview generator agents in the background creating preview images for the same document at the same time.
- Preview images will be generated under the document in a system folder called Previews. The name of the images will be preview[i].png, where [i] is the index (page number) of the image. Small thumbnail images are also generated.

## Performance Considerations 

After uploading a document the built-in preview generator creates images for the first few pages of the document. If your users upload many documents at the same time this could result in slower preview image generation, depending on the number of available task agents that are generating images in the background. See the Task Management article for more details on tasks.

In case the user performs a checkout operation, the preview provider does not register a new task: it simply copies previously generated images. Also when a content version is removed (e.g. in case of an undo changes operation), preview images are removed from the system to free up disk space.


## Generator Configuration

The built-in preview generator tool (_AsposePreviewGenerator.exe_) has the following configuration options in its config file.

- **ChunkSize**: Size of chunks (in bytes) that will be uploaded to the portal during image generation. Default: _10485760_.
- **PreviewResolution**: Resolution of generated preview images. Default: _300_.


## Errors during image generation

The built-in preview generator tool (AsposePreviewGenerator.exe) logs all error messages through the agent (it does not have a log file or event log section itself). The agent than sends the log to Sense/Net ECM through the task management web app. This means that all error messages can be processed and handled by the developer on the portal's side. In case only a page fails (not the whole document), the generator tool substitutes that page with an empty image that can be customized by replacing the empty.png in the folder of the generator tool.


## Versioning and preview images

Preview images for different versions are stored in subfolders (e.g. _.../mydoc.docx/Previews/V2.3.A/preview1.png_), so when you visit the preview page for a particular version, you'll see the preview images for that version. This applies to users with permissions only for major versions: they will see previews for the latest major version, while administrators see the previews of the last draft.


## Restrictions and Annotations

From **version 6.3** Sense/Net ECM supports adding visual layers onto preview images. In this section you can learn about the types and possibilities.

- watermark
- redaction
- annotations
- highlights


## Watermark

It is possible to define a watermark text globally or in a local setting (see the [Settings](http://wiki.sensenet.com/Viewing_documents_in_the_browser#Settings) section for details). Additionally to this, every file has a text field called **Watermark**. If you fill this field with a text, it will override the setting and appear on the preview images of the document for users who do not have the _Preview without watermark_ permission.

**For developers**: the Watermak property of the File type is overridable, so it is possible to implement a logic for getting the watermark text from a custom location.

#### Watermark templates

When defining the watermark, you can provide templates that the system will fill with the actual values. You can provide the name of the template in the following format:

- _@@TemplateName.PropertyName@@_ - where the property name is optional.

The built-in templates are the following:

- **CurrentDate**: short date for the current day
- **CurrentTime**: full date containing the time
- **CurrentUser**: any property of the current user (e.g. @@CurrentUser.Name@@)
- **FullName**: full name of the current user
- **Email**: email address of the current user
- **IpAddress**: IP address of the client (it may be the same for users behind a firewall)

It is also possible to customize or extend the list of available templates. Developers can inherit from the class _SenseNet.ContentRepository.Preview.WatermarkTemplateReplacer_ and add new templates or override the built-in ones. For more information on how to use template replacers, please visit the [TemplateManager](http://wiki.sensenet.com/TemplateManager) article.

## Redaction

Editors can hide certain parts of a document so that users without open permission can see only the parts that they are allowed to. Redactions are basically rectangles that _will be drawn onto preview images on-the-fly_ when a user with less permissions loads those preview images. These rectangle coordinates are stored on the document as metadata. For users with less permissions _there is no way to see the image without the redaction_, as this is managed by the document preview provider.

The same redacted preview images will be used to generate a pdf document when a user with only preview permissions wants to download the document in a pdf format.


## Annotations and Highlights

Editors can place annotations (comments) onto preview images. These comments are visible for everyone with at least preview permissions, but can be switched OFF in the [Document Viewer](http://wiki.sensenet.com/Document_Viewer).

Editors can place highlights onto preview images. These highlights are visible for everyone with at least preview permissions, but can be switched OFF in the [Document Viewer](http://wiki.sensenet.com/Document_Viewer).


## Preview Permissions

There are three preview-related permissions in Sense/Net ECMS:

- **Restricted preview**: the user can see the preview image, but only with all the restrictions if there are any.
- **Preview without watermark**: the user can see the preview image without watermark. Please note that even if the user has this permission, it is possible to switch ON watermark in the [Document Viewer](http://wiki.sensenet.com/Document_Viewer) to check how it will look for users with less permissions.
- **Preview without redaction**: the user can see the preview image without redaction.

If the user has at least one of the permissions above, than she can see the preview images of the document. Also she will have access to all content metadata, but not to the binary fields. Only users with _Open_ permission are able to access the binaries.

## Configuration

To enable the built-in preview generation uncomment or add the following line in the _web.config_. To use a [custom preview generator](http://wiki.sensenet.com/How_to_integrate_a_custom_document_preview_generator) set this value to the full class name of the custom preview generator.

`<addkey="DocumentPreviewProvider"value="AsposePreviewProvider.AsposePreviewProvider"/>`


## Settings

The global preview settings can be found in the following settings content:

- _/Root/System/Settings/DocumentPreview.settings_

You can customize the following values here:

- **MaxPreviewCount**: the number of preview images to generate in one round. Default is _10_. The optimal value depends on how many preview generator agents you have and the number of average simultaneous document uploads.
- **WatermarkEnabled**: true or false (default is true). This is a master switch for the watermark feature. You can use this to hide all watermarks, even if the texts are set on the documents.
- **WatermarkText**: if you want to, you may provide a watermark text here instead of on individual documents. Watermark text set on documents will override this setting. You may use templates here as well, as you can see in the section above.
- **WatermarkFont**: watermark font name (e.g. "Microsoft Sans Serif")
- **WatermarkFontSize**: font size of the text
- **WatermarkBold**: _true_ or _false_
- **WatermarkItalic**: _true_ or _false_
- **WatermarkColor**: color of the text. Plain text (e.g. Blue) or color code (e.g. #123456).
- **WatermarkOpacity**: opacity of the text
- **WatermarkPosition**: text orientation. Possible values:
    - _BottomLeftToUpperRight_
    - _UpperLeftToBottomRight_
    - _Top_
    - _Bottom_
    - _Center_
    
    
  ## Integrating a custom preview generator
  
  To integrate a custom document preview generator you'll need to implement your preview provider that will define the supported types and the [custom task](http://wiki.sensenet.com/Task_Management) that will generate the images. To learn more on this topic read this article:

- [How to integrate a custom document preview generator](http://wiki.sensenet.com/How_to_integrate_a_custom_document_preview_generator)
