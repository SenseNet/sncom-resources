---
title:  "Content templates"
tags: [content, content repository, content templates]
description: Content templates
permalink: /guide/content-repository/content-templates
index: 6
---

## Content templates

In sensenet everything is content. When you create a new article, workspace or just upload a document you are creating a content. But you do not always want to start from scratch. Sometimes you want to have pre-filled values in fields, predefined document templates (e.g. containing a company logo in the header) or a whole pre-built workspace containing lists and libraries for a special purpose. This is what content templates are for: they are predefined templates for creating new content.

A content template can be a single content - e.g. a Word document containing a company logo or menu items - or a whole content structure, for example a pre-built workspace. Content templates can reside in the following places:

- global templates: */Root/ContentTemplates*
- local templates: in *ContentTemplates* system folders on Site, Workspace or local content level (read more below in the Content Template#Content template hierarchy section)

Every content template resides in a folder **named by its Content Type**. In this folder there can be multiple content templates - like multiple document templates in the */Root/ContentTemplates/File* folder. Templates can have any name but it is advisable to give a name that reflects the type of the template.

### Creating a template

Content templates are content of the same type as they are defined for. E.g. document templates are Files; library or list templates are Document Libraries or Memo Lists. To create a content template you simply need to create a new content under the appropriate folder (named by the type). You can set any property of the content template or add child content (e.g. custom views for libraries), they will be part of the template.

### Modifying or deleting a template

You can modify or delete a content template at any time. They are not connected to the content created using them in any way.

``` diff 
Please be aware that modifying a template will not modify content previously created.
```

### Creating new content with a template

Content templates are recognized and cached by the system immediately. You can create new content using the templates in any folder where that particular type is allowed - for more information about allowed content types check this article.

When you open a New menu anywhere it will contain the following items for every allowed type:

- if the content type has no content template, the type name will be listed (e.g. New Memo)
- in case there are existing templates for that type all relevant templates will be listed (for example if the File content type is allowed in a document library, all the document templates will appear in the New menu with their name displayed)

After selecting a content template the user will be presented a Content View for that content type and will be able to see and change the predefined template fields (depending on the content view). When the user presses the Done editing button the whole template will be copied to the destination place. E.g. if the template is of the workspace type, all its lists and libraries will be present at the destination place.

>> Please note that if a template exists for a content type than it is not possible to create an empty content using the new menu because the menu will not contain the type, only the template. There is a possibility to work around this by presenting a single New action that refers to the content type instead of a template.

#### Permissions and security

Content templates can be controlled by permissions the same way as any other content. If the user has no permission for a particular template she will not be able to create content using that template.

After creating a content using a template the security settings that were set directly on the content template are also copied to the new content. All settings set on the destination parent will be inherited by the new content naturally.

### Content template hierarchy

Content templates can be defined on the following levels:

- global: global folder, see above
- site: ContentTemplates system folder under a site
- workspace: ContentTemplates system folder under a workspace
- local: ContentTemplates system folder under any content - e.g. document library

When the user opens a New menu the system looks for content templates defined for all content types that are allowed there. It starts under the current content (e.g. content list), than moves up to the workspace, site and finally the global level. Content templates can override each other by name. This means if you define a local content template with a name that exists above on the workspace, site or global level, it will override them.

This structure enables portal builders and editors to define a template hierarchy that can fulfill the needs of an enterprise by providing content templates for the correct scope. For example define special list templates only for the intranet site.