---
title:  "Trash"
tags: [content, content repository, trash, purge, delete]
description: Trash bin is a temporary storage for contents that have been deleted. It is a central place for deleted documents, where you can browse, restore or delete content permanently.
permalink: /guide/content-repository/trash
index: 7
---

## Trash

When you delete a document or a folder and the trash feature is enabled (in the default install, it is) that particular folder/document will not be deleted permanently. You can find it in the trash bin and you can restore it.

The trash bin is a central place for deleted documents where you can browse, restore or delete content permanently. It is possible to provide a local (workspace-level) trash for users too. See the portal builder article below for more information.

The size of the trash and the time frame while the contents can be recovered from the trash is set by the administrator. Trash feature can be switched on or off globally.

When you delete something into the trash then the content will be wrapped into a special container called the trash bag and will be moved to a central place called the trash bin. The path of the trash in the repository is */Root/Trash*.

### Delete operation capabilities

Delete operation allows users to transfer content (documents, folders or whole workspaces) into the Trash Bin - or delete them permanently.

- You can delete content that go to the trash.
- You can delete content permanently, without using trash.
- You can enable or disable trash locally or globally.
- You can enable or disable trash for a content type.

### Workspace trash

It is possible to provide a workspace-level trash for users. Deleted content in fact will still be moved to the global Trash (*/Root/Trash*) but users will be able to see content deleted from a particular workspace in a folder under that workspace. This functionality is practically a filter for the global Trash and can be accessed by creating a SmartFolder under the workspace. Place the SmartFolder anywhere under the workspace.

Properties of the SmartFolder:

- **Folder name**: anything - e.g. Workspace Trash
- **Autofilters**: disable
- **Query**: +InTree:'/Root/Trash' +TypeIs:TrashBag +WorkspaceId:@@CurrentWorkspace.Id@@
- 
All content deleted under the workspace will be visible here and can be restored or deleted permanently. The deleted content are still accessible and restorable from the global Trash and all size and date settings are still applied.

### Configuring Trash

#### Enable/disable the trash feature globally

If the trash is enabled in the system, deleted content can be moved to the Trash Bin. You can find them on the path */Root/Trash*.

If you disable the trash, previously deleted content won't disappear, you or the owner can restore them freely. Content deleted with disabled trash will be removed permanently from the database.

#### Enable/disable the trash feature on a container

You can enable or disable the trash feature on almost any container content. By default, the feature is enabled and deleted content go to the trash. You can change this editing any folder or list. This setting effects only the container (list, workspace) you edit, and not the child folders.

#### Set the retention time of deleted contents

The value set here is the days the content should stay in the trash before deleting it permanently. If the value is greater than 0, users (or any automatism) cannot remove the content from the trash before the expiration date. Changing this value does not effect previously deleted content.

#### Set the size of the Trash Bin

The size quota is the amount of content in megabytes that can be stored in the trash. This value is only a UI hint, it does not effect deleting content. If the size is exceeded the Trash Bin main page will display a message about how much space is used. The administrator should take care of purging content from the trash manually.

#### Set Trash Bag capacity

If you provide a number greater than 0 as the Trash Bag capacity, only containers having a smaller number of children can be moved to the trash at the same time. This setting effects only one delete operation. In case this setting prevents you to delete a big subtree you can still delete those content one-by-one.

#### Empty the trash

You can delete all the content stored in the trash permanently. On the Trash Bin main page you can see an Empty button in the header of the trashed items list. By pressing it, you get a dialogue page where you can dispose all the items.
