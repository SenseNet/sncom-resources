---

title: "Permission editor on the admin ui"
author: [pusztaienike]
image: "../img/posts/permission_editor.jpg"
tags: [sensenet, permission]
redirect_to: https://www.sensenet.com/blog/2020-09-21-permission-editor

---

"Nobody can hurt me without my permission. /Mahatma Gandhi/"

---

In the IT world you often handle sensitive data, which you don't want to share with the whole universe. But how you can hide those contents from outsiders? What if you would like to share those things only with a specific group of users? Or other data with another group? 

Of course there is a common solution for that: permission system. Almost every software has permissions which handle what users can see or do.

I think most of us use some kind of social media. Think about searching for someone and that by default you cannot see her/his photos, but after you apply a friend request everything changes.
And what about your company data? Unless you are the boss, I am sure that your company has data for which you do not have sufficient permissions.

Permissions are everywhere. And of course sensenet has its own permission system as well. On the new admin surface 
handling permissions was only possible with coding and running commands. Till now. 🕛 In the last couple of weeks we were about to design and implement the simplest, easiest to use **permission editor**.

## Customize it as you want 🔧🔨

sensenet has a lot of built-in permissions but there are some reserved ones that you are free to use in case you have special needs ([custom permissions](https://docs.sensenet.com/concepts/user-and-permission-management/04-custom-roles-and-permissions#permissions)). You can also group these permissions for the permission editor. The related settings file is available under Setup menu / Permission.settings.

The default settings are the following:

```{
   "groups":[
      {
         "Read":["See", "Preview", "PreviewWithoutWatermark", "PreviewWithoutRedaction", "Open"]
      },
      {
         "Write":[ "Save", "AddNew", "Delete"]
      },
      {
         "Versioning":["OpenMinor", "Publish", "ForceCheckin", "Approve", "RecallOldVersion"]
      },
      {
         "Advanced":["SeePermissions", "SetPermissions", "RunApplication"]
      }
   ]
}
```

On the permission editor dialog you can see the groups and permissions based on these settings. 

<p align="center">
<img src="/img/posts/permission_groups.png" alt="permission groups">
</p>

## How to use it? 🎮

Select a content from your repository, right-click on it and select 'Set permissions' from the dropdown. On the permission view you can check the permission entries (users or groups) which are inherited or set directly on the current content. Selecting an entry opens the permission editor dialog.

On the dialog use the switches to enable/disable a permission. There are also group level switches, so you can easily enable/disable all the permissions in the selected group...and there is the king of kings: Full access 👑 with which you can turn all permissions on/off.

When you open the dialog some permissions are disabled because they are inherited from a parent and you cannot override them. 
Changes only apply on clicking Submit button so for your comfort there is also a reset button to restore the unsaved changes.

<p align="center">
<img src="/img/posts/permission_how_to_use.gif" alt="how to use permissions">
</p>

## Additional features 💄👓👜

**Make content public/private**

If you would like to share your content (content can be almost anything, cause in sensenet everything is a content) with visitors who are not users in your repository you can do it easily by clicking on "Make content public" button. If you change your mind reverting this is easy as it was to set. This thing come in handy when you build a public website and most of your repository data is shared with all the visitors.

<p align="center">
<img src="/img/posts/permission_make_public.gif" alt="make a content public">
</p>

**Assign new permission**

If you would like to grant permission for someone on a content who has no permission setting at all, you can do it using the _Assign new permission_ button. Search for and select the user or group to whom you want to set permissions and turn on/off the switches. 😉

<p align="center">
<img src="/img/posts/permission_assign_new.gif" alt="assign new permission">
</p>

**Local only**

One of the big advantages of sensenet content repository tree is inheritance which is applied on permissions as well. However, there are cases when you do not want child contents to inherit permissions. For example you want to allow certain users to see a content (e.g. a Content List) but you do not want them to be able to see contents that are inside this container. To avoid permission inheritance, mark permission entries as 'local-only'.
On the permission view these local-only entries are marked with an icon.

<p align="center">
<img src="/img/posts/permission_local_only.gif" alt="local only permissions">
</p>


**Force relations**

Some of the built-in permissions requires to allow other permission(s). E.g: If you would like to set Preview permission to an entry it requires to have See permission as well. You don't need to handle these relations cause it is automatic in the background. Setting the Preview permission will set See permission as well.

<p align="center">
<img src="/img/posts/permission_force_relations.gif" alt="force relations">
</p>


## Must read 📚🔖

More details about sensenet permission system:

[Document level Permissions](https://docs.sensenet.com/concepts/user-and-permission-management/02-document-level-permissions)

[Role based Permissions](https://docs.sensenet.com/concepts/user-and-permission-management/03-role-based-permissions)

[Custom Roles and Permissions](https://docs.sensenet.com/concepts/user-and-permission-management/04-custom-roles-and-permissions)
