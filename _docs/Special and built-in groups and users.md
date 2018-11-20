# Special and built-in groups and users

## Overview
**Sense/Net ECMS** has a flexible [Permission System](__TODO__) that allows you to control who can do what in your system. In this article you can learn about the special and built-in groups and users that Sense/Net ECMS offers by default.

In Sense/Net ECMS all users and almost all groups are stored in the */Root/IMS* folder (which stands for *Identity Management System*). In this article we list and describe all the built-in and special groups and users in the system.

>There is possible to create groups outside of the IMS folder. These are local groups created under workspaces - see [Workspace local groups|this article](__TODO__) for more details.

### Special users
Sense/Net ECMS provides a couple of special users by default. These users are used by the system, please do not remove them. However their permissions can be freely changed, or in case of the bult-in Admin user, you may even disable the user itself.

#### Admin
This user is the administrator in the system, but no permission are given to him directly, only through the *Administrators* group. You can log in as Admin the same way as with any other user. Please do not remove this user as it is used by the system - but you can freely disable it or remove its permissions if you want to use a different user for admin purposes.

#### Somebody
This is a low-level placeholder user for cases when we cannot find a creator/modifier user that previously existed or the currently logged in user does not have permissions to see the creator or modifier of a content. Please do not delete this user and do not try to use it as a regular user.

#### VirtualADUser
This is a built-in special user created to support on-the-fly authentication from Active Directory. It cannot be used as a regular user. Please visit the following article for more details:
- [Forms authentication from AD](__TODO__)

#### Visitor
Everybody is a visitor until logging in. Therefore you cannot log in as a Visitor user because it represents users who are not logged in. It has a couple of permission settings in the default structure for content that should be accessible for everybody (e.g. js or css files for the public website).

### Special groups
There are a couple of 'special groups' in Sense/Net ECMS that we handle differently than regular groups. It is not possible to edit the list of members of a special group: it is managed by the system. You can define permissions for them the same way as for regular groups, and during permission evaluation these groups are treated the same way also. The following list contains a list of special groups.

#### Everyone
This is the largest group in the system: every single user is considered as a member of the *Everyone* group, **except the Visitor user**. This behavior cannot be changed. Please set permissions for this group carefully, as every logged in user will have access to those content. Note that you *cannot set deny permissions* for the Everyone group, because it would make that content inaccessible for - well, for everyone, including you.

#### Creators
>>This group has been removed from **Sense/Net ECM**. From **version 6.5** please consider using the **Owners** group below that has a similar functionality.

#### Owners
This group is really a special group: when you set permissions for this group, it refers to the user who is the owner of a particular content. But the owner is different for every single content, and this is what this special group 'virtualizes'. The *Everyone* group above is easier to imagine, because it can be described as a group with many members. The *Owners* group on the other hand stands for the single user who is the owner of a content when evaluating permissions. This allows you to define and manage permissions in one place (on a container) that applies to a user that is different for every content inside that container.

A good example of this is the *Profiles* folder: it has permission settings for the *Owners* group, meaning every user will have permissions for *their own profile section* (because everybody is the owner of their own profile), but nobody has access to each others' profile. 

Or you may state that identified users can upload documents into a document library but only Owners can delete content. This means users can upload documents into the library and even see each others' documents, but everybody will be able to delete *only their own documents*.

### Built-in groups
Built-in groups in Sense/Net ECMS are regular groups, meaning their membership can be freely modified. They are used in the default [Content Repository](__TODO__) structure extensively, but no hard-coded logic is built on them (except for the *Administrators* group, please do not delete that one). This means you can freely change or replace these groups with your own custom groups in your permission settings. The best practice however is that you build on them, using the suggested purpose in the following sections.

#### Administrators
Administrators considered to be the most powerful users in the system. This may be true for some features but not necessarily for all content. In the default structure administrators have access to everything, but when you build your project and add your custom content, it is perfectly fine if you hide something from the Administrators group. For example you may remove their permissions from confidential documents completely.
By default only the *Admin* user is a member of this group, but you can add more members as you like. Please use this group for administrative permissions instead of single users.

#### Editors
We do not have any predefined permissions for this group by default, we consider them as a middle layer between administrators and regular users. For example you can define permissions for the global Editors group for skins and renderers or content types.

#### IdentifiedUsers
Identified users are what the name implies: users who we know. These can be intranet users synchronized from the [Active Directory Synchronization|Active Directory](__TODO__) or users created for your clients or partners. The membership of this group depends totally on you, the system does not add anybody to this group automatically.

#### Operators
*(from version 6.3.1)*

The *Operators* group is used by the system in cases where an administrative task needs to be completed. Currenty this is only one place: only the members of the Operators group can modify the **CreationDate** property of content (e.g. when importing). We created this group to be used as a *role* in the system and did not add any content permissions for them by default. The *Administrators* group is a member of this group, but this may be changed if you want to.
From **version 6.5.5.** the following changes are applied on this group: members will see the PRC on pages, they have access to the Content Explorer interface (since this group is the member of the *ContentExplorers* group), furthermore the are entiled to the monitor pages, like: [Task Managemment](__TODO__) and [Permission Overview](__TODO__)

>There are changes in the operation of this group, please find details in the description above.

#### RegisteredUsers
The *Registered users* group is a regular group, you may modify its members freely; the only speciality of it is that the [Registration workflow sample|public registration process](__TODO__) adds users to it. We consider them (in terms of permission level) a bit lower than identified users (see above) because the registration can be very open in a public portal. This is why there are not many permission settings for this group in the default structure.


>The following groups are available in the system out of the box. You do not have to use them but they help when assigning general, global permissions to users. They represent features in the system. They are not meant to work as standalone groups, but in conjunction with other content permissions. For example if you want somebody to access the [Content Explorer](__TODO__), you can put them into the *ContentExplorers* group, but that gives them access only to the user interface: they will need permissions on individual content to be able to work with them.

#### PRCViewers
*(from version 6.5.5)*

The members of the *PRCViewers* group can see the [Portal Remote Control](__TODO__) with the features they have access to.

#### ContentExplorers
*(from version 6.5.5)*

The group of *ContentExplorers* have permission to access [Content Explorer](__TODO__) and all content they are entitled to. To be able to execute this action they will see the PRC too (they are members of the *PRCViewers* group above).

#### PageEditors
*(from version 6.5.5)*

All members of *PageEditors* group will have access to the PRC and able to switch the page to *edit mode*. This group does not have access to [Content Explorer](__TODO__) by default. For details about editing a page and working with portlets, see the following article:
* [How to add a portlet to a page](__TODO__)

#### HR
*(from version 6.5.5)*

*HR* group was created to let you assign a fully featured HR management permission set to selected users. Members of this group will have access to the PRC, to the Content Explorer, and will have edit permission to the */Root/IMS* folder that contains users and groups of the system.

#### Developers
*(from version 6.5.5)*

We created this group to help developers work in the development phase of a new project. Group members will see the PRC on the pages, will have access to the Content Explorer. By the default installation the group is the member of the *Administrators* group.

>>Please remember to remove this group from the *Administrators* group when the site goes live.

## References
* [Permission System](__TODO__)
* [Workspace local groups](__TODO__)
* [Content Repository](__TODO__)
* [Active Directory Synchronization](__TODO__)
* [Forms authentication from AD](__TODO__)
