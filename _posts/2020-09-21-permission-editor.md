---

title: "Permission editor on the admin ui"
author: [pusztaienike]
image: "../img/posts/permission_editor.jpg"
tags: [sensenet, permission]

---

"Nobody can hurt me without my permission. /Mahatma Gandhi/"

---

In the IT world you often handle sensitive data, which you don't want to share with the whole universe. But how you can hide those contents from outsiders? What if you would like to share those things only with a specific group of users? Or other data with another group? 

Of course there is a common solution for that: permission system. Almost every software has permissions which handle what users can see or do.

I think most of u use some kind of social media. Think about searching for someone and that by default you cannot see her/his photos, but after you apply a friend request everything changes.
And what about your company data? Unless you are the boss, I am sure that your company has data for which you do not have sufficient permissions.

Permissions are everywhere. And of course sensenet has its own permission system as well. On the new admin surface 
handling permissions was only possible with coding and running commands. Till now. 🕛 In the last couple of weeks we were about to design and implement the simplest, easiest to use **permission editor**.

## Customize it as you want 🔧🔨

sensenet has a lot of built-in permissions but there are some reserved one that you are free to use in case of you have special needs ([custom permissions](https://docs.sensenet.com/concepts/user-and-permission-management/04-custom-roles-and-permissions#permissions)). You can also group these permissions for the permission editor dialog as you want. The related settings file is available under Setup menu / Permission.settings.

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
<img src="/img/posts/permission_groups.png">
</p>

## How to use it? 🎮

Select a content from your repository, right-click on it and select 'Set permissions' from the dropdown. On the permission view you can check the permission entries (users or groups) which are inherited or set directly on the current content. Selecting an entry makes the permission editor dialog open.

On the dialog use the switchers to enable/disable a permission. There are also group level switchers, so you can easily enable/disable all the permissions in the selected group...and there is the king of kings: Full access 👑 with which you can turn all permissions on/off.

Some permissions are disabled because they are inherited and you cannot override them. The changes only apply on clicking Submit button so for your comfort there is also a reset button to restore the unsaved changes.

<p align="center">
<img src="/img/posts/permission_how_to_use.gif">
</p>

## Additional features 💄👓👜

**Make content public/private**

If you would like to share your content (content can be almost anything, cause in sensenet everything is a content) with somebody e.g. from another company who has no authority to your repository you can do it easily by clicking on "Make content public" button. If you change your mind reverting this is easy as it was to set.

<p align="center">
<img src="/img/posts/permission_make_public.gif">
</p>

**Assign new permission**

If you would like to grant permission for someone on a content who has no permission setting at all, you can do it using the _Assign new permission_ button. Search for and select the user or group to whom you want to set permissions and turn on/off the switchers. 😉

<p align="center">
<img src="/img/posts/permission_assign_new.gif">
</p>

**Local only**

One of the big advantages of sensenet content repository tree is inheritance that is applied on permissions as well. However, there are cases when you do not want child contents to inherit permissions. For example you want to allow certain users to see a content (e.g. a Content List) but you do not want them to be able to see contents that are inside this container. To avoid permission inheritance, mark permission entries as 'local-only'.
On the permission view these local-only entries are marked with an icon.

<p align="center">
<img src="/img/posts/permission_local_only.gif">
</p>


**Force relations**

Some of the built-in permissions requires to allow other permission(s). E.g: If you would like to set Preview permission to an entry it requires to have See permission as well. You don't need to handle these relations cause it is automatic in the background. Setting the Preview permission will set See permission as well.

<p align="center">
<img src="/img/posts/permission_force_relations.gif">
</p>


## Must read 📚🔖

More details about sensenet's permission system:

[Document level Permissions](https://docs.sensenet.com/concepts/user-and-permission-management/02-document-level-permissions)

[Role based Permissions](https://docs.sensenet.com/concepts/user-and-permission-management/03-role-based-permissions)

[Custom Roles and Permissions](https://docs.sensenet.com/concepts/user-and-permission-management/04-custom-roles-and-permissions)
