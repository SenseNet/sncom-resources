---
title: "Setup"
source_url: "https://github.com/SenseNet/sensenet.github.io/blob/master/docs/admin-ui/configs.md"
category: Admin UI
version: v7.0
tags: [admin ui, setup, config, settings, cache]
description: A quick overview about configuration files and managing them on the admin-ui.
---

# Setup

In general settings are created for administrators or editors to let them customize the behavior of a certain feature. Settings are stored as content in the Content Repository. The advantage of this is that changing a setting does not involve site restart and you can manage values in one central place instead of synchronizing them across web servers.

![Setup dashboard](/img/setup-dashboard.png "Setup dashboard on the admin surface")

As settings are simple text files, they can be edited in the admin surface's text editor. When you modify a settings file, the framework takes care of refreshing the values in the cache, so your features will automatically get the new values.

## Portal.settings {#portal-settings}

All settings related to the surface and behavior of the web application can be found here, from the cache header settings of different file types to the default content type of uploaded images and the allowed origin values.

### ClientCacheHeaders

The ClientCacheHeaders setting is a list of rules that define the MaxAge value for a set of content. Each rule must contain at least one of the following conditions:

- ```ContentType```: specific content type name
- ```Path```: path of a subtree
- ```Extension```: image or source file extension (e.g. jpg, css)

```json
"ClientCacheHeaders": [
    {
      "ContentType": "PreviewImage",
      "MaxAge": 1
    },
    {
      "Extension": "jpeg",
      "MaxAge": 604800
    },
    {
      "Path": "/Root/Content/demoavatars",
      "MaxAge": 600
    }
    ...
  ]
```

### BinaryHandlerClientCacheMaxAge

You can set the ```MaxAge``` value for all binaries requested through *binaryhandler.ashx*. The value must be provided in seconds.

### UploadFileExtensions

You cat set per extension what type of content should be created when a file is uploaded. It is also possible to set a default one with the ```DefaultContentType``` option.

```json
"UploadFileExtensions": {
    "jpg": "Image",
    "jpeg": "Image",
    "gif": "Image",
    "png": "Image",
    "bmp": "Image",
    "svg": "Image",
    "svgz": "Image",
    "tif": "Image",
    "tiff": "Image",
    "xaml": "WorkflowDefinition",
    "DefaultContentType": "File"
  }
```

### AllowedOriginDomains

It is a whitelist that contains the trusted 3rd party domains that may send CORS requests to the portal. If a CORS request arrives with an origin that is in this whitelist, the request will execute - otherwise the client will receive a Forbidden status code.

```json
"AllowedOriginDomains": [
    "localhost",
    "*.sensenet.com",
    "*.netlify.com",
    "sn-dms-demo-dev.netlify.com",
    "dms.demo.sensenet.com"
  ]
```

### AllowedMethods

If you need to, you may customize the list of allowed methods (http verbs) on your sensenet instance. If something is missing from the default list, or you want to restrict the allowed request methods for security reasons, you can do so by providing the following line in the setting.

```json
{
   "AllowedMethods": [ "GET", "POST", "PATCH", "DELETE", "MERGE", "PUT" ]
}
```

### AllowedHeaders

You can also customize the list of allowed http headers for CORS requests (for example add your custom headers).

```json
{
   "AllowedHeaders": [ "X-Authentication-Type",
            "X-Refresh-Data", "X-Access-Data",
            "X-Requested-With", "Authorization", "Content-Type" ]
}
```

## OAuth.settings {#oauth-settings}

When users register or login using one of the configured OAuth providers (like Google or Facebook), these settings control the type and place of the newly created users as content items in the repository.

| name | type | description |
| ---- | ---- | ----------- |
| UserType | string | Name of the ```ContentType``` with wich the user should be created. |
| Domain   | string | Name of the ```Domain``` where the user should be created. |

## DocumentPreview.settings {#documentpreview-settings}

In this section you can customize the behavior of the Document Preview feature – for example the font style of the watermark displayed on documents or the number of the initially generated preview images.

| name | type | description |
| ---- | ---- | ----------- |
| MaxPreviewCount | number | The number of preview images to generate in one round. |
| WatermarkEnabled | boolean | This is a master switch for the watermark feature. |
| WatermarkText | string | You may provide a watermark text here. |
| WatermarkFont | string | Name of the watermark font. |
| WatermarkFontSize | number | Font size of the text. |
| WatermarkBold | boolean | You can set the text to bold. |
| WatermarkBold | boolean | You can set the text to italic.  |
| WatermarkColor | string | Plain text (e.g. Blue) or color code (e.g. #123456). |
| WatermarkOpacity | number | Opacity of the text |
| WatermarkPosition | BottomLeftToUpperRight, UpperLeftToBottomRight, Top, Bottom, Center | Watermark text orientation. |

## OfficeOnline.settings {#officeonline-settings}

To open or edit Office documents in the browser, the system needs to know the address of the Office Online Server that provides the user interface for the feature. In this section you can configure that and other OOS-related settings.

| name | type| description |
| ---- | --- | ----------- |
| OfficeOnlineUrl | string | Url of the Office Online Server |

## Indexing.settings {#indexing-settings}

In this section you can customize the indexing behavior (for example the text extractor used in case of different file types) of the system.

### TextExtractors

To add a new text extractor or override an existing one you will need to configure the file type and the extractor class. 

```json
{
	"TextExtractors": {
		"pdf": "MyNamespace.PdfTextExtractor",
		"docx": "MyNamespace.DocxTextExtractor"
	}
}
```

## Sharing.settings {#sharing-settings}

You can switch ON or OFF notifications or customize the notification emails here.

| name | type | description |
| ---- | ---- | ----------- |
| NotificationEnabled | boolean | Switch notifications ON or OFF. |
| NotificationSender | string | Sender's email adress in notification emails. |
| NotificationMailSubjectKey | string | Subject of the notificaton emails. |
| NotificationMailBodyKey | string | Body of the notification email. |
