# How to set permissions on a content

## Overview
**Sense/Net** Content Repository is built around content. Managing the accessibility of content is an essential part of working with the portal. Administrators (and all users that have the permission to see and edit security settings) are allowed to change permission settings on content and influence which users can see or edit a content, or perform a particular operation on it.

## Steps
In this section I will show you how to review the current permission settings on a content and change them step-by-step. 

### 1. Displaying the Permissions page
To display the current permission settings for a content go to the permissions page by selecting the **Set permissions** menu item in the list actions menu or one of the list item drop-down menus.

![Go to the Permissions page](images/Howto-set-permissions/select.png "Go to the Permissions page")

After clicking the Set permissions menu item you will see a page displaying all the permissions for the content. Identities (groups and individual users) are listed here. By opening an identity entry you can see all the permissions that are set for that identity. Some of them may be inherited (like the See and Open permission that are inherited from the *sites* content), others are explicitly set.

![Permissions page](images/Howto-set-permissions/opened.png "Permissions page")

### 2. Adding new permission entry
You can add new entries to the permission list of this content by clicking on the **Add new security entry** button on the top of the page. You can search for user or groups here. In the image below you can see that we found and selected the *Editors* group.

![Add new permission entry](images/Howto-set-permissions/search.png "Add new permission entry")

When you click on the **Add** button, a new security entry will be added to the top of the page. All permission entries will be undefined. You can allow or deny here the permissions you want by checking the appropriate checkboxes. In this case we gave **Allow** permission for the Editors group for the following permissions: *See, Open, Save, AddNew, Delete* and *RunApplication*. By using the *Toggle all* checkboxes above the allow and deny columns, you can change permission entries faster.

![Fill permission settings](images/Howto-set-permissions/fillnew.png "Fill permission settings")

Clicking on the **Save** button will finalize the settings and you will be redirected to the original page.

### 3. Breaking permission inheritance
If you want to change the permission settings for one or more identities (or remove it completely), you have to break the permission inheritance by clicking the **Break inheritance** button on the top of the page.
>Please note that if you click the **Break inheritance** button, the change will take effect immediately, without pressing the Save button. You can revert this operation by pressing the **Remove break inheritance** button.

After you broke the permission inheritance, you are able to edit the permission settings for the identities.

### 4. Removing a permission entry
If you want to completely remove an identity from the list you have to cleat all the allow and deny check boxes for that identity. You can do it quickly by using the *Toggle all* check boxes above the columns.

![Remove permission entry](images/Howto-set-permissions/remove.png "Remove permission entry")

When you press the **Save** button, the changes will take effect and you will be redirected to the original page.

## Related links
- [Permission System](__TODO__)
