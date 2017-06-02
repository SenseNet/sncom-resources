---
title: "Permission Overview Tool: Making Sense of Your Permission Nightmare"
author: ildika
tags: Documentation, Enterpise Portal, Enterprise Content Management, Feature, GUI, security, Sense/Net Content Repository, 
---

Have you ever wanted to know the permissions of a certain user, not just for a single content but in the whole system? We had a permission setting page for a long time but that did not give administrators the full picture

---

Have you ever wanted to know the permissions of a certain user, not just for a single content but in the whole system? We had a permission setting page for a long time but that did not give administrators the full picture.

From now on you can make use of our brand-new permission visualization tool, which provides an overview on any user’s permission structure over all contents through the Content Repository. With the use of a tree view, the tool will display the permission structure of all built-in permission types in the whole repository or in a chosen subtree. Each permission type is represented by an icon as it follows:

![Permission types in the content repository](http://download.sensenet.com/BlogPostImages/PermissionOverview/permissiontypes.png)

## What is it for?

The Permission Overview is a useful tool when you have the task to figure out which parts of the system are accessible by a certain user and the structure of those permissions. It is also useful when you need to make adjustments on the permission structure and want to know what will happen if you change something.

![Permission overview tool to visualize the permission structureand inheritance](http://download.sensenet.com/BlogPostImages/PermissionOverview/overview.png)

## Usage

It is an easy-to-use tool where all data is nicely organized to aid the most common use cases.


-   At the top of the page choose the user, whose permission set should be displayed. By default the logged in user is selected.
-   Optionally select the root of the subtree that you want to see. By default the &bdquo;Root” folder is selected.
-   With the use of the switch at the top section you can set the view-mode of permissions. The switch does not hide or reveal anything new, it just makes the two different aspects of the permission structure more emphasized:

-   Inherited and current level permissions
-   Permissions in the subtree below the current level



## Inherited and current level permissions

In this mode you’ll see inherited and explicit permissions indicated by the permission type icons above.

![Current leve permission structure of a content](http://download.sensenet.com/BlogPostImages/PermissionOverview/PragueCurrentlevelPermissions.png)

## Permissions in subtree

The second one is a handy view to help find permission settings in the subtree and avoid unnecessary searching in subtree-branches that are not relevant to the selected user.

![Permission settings &quot;in subtree&quot; of a content](http://download.sensenet.com/BlogPostImages/PermissionOverview/PragueSubtreePermissions.png)

## Notations

The legend on the top right corner helps you understand the notations the tool uses:

-   Explicitly allowed: indicates permissions that are explicitly allowed on the content.
-   Implicitly allowed: indicates inherited permissions.
-   In subtree: all permission settings applied in the subtree of the content are merged into this single line.
-   Break: the icon is displayed at the end of the row when “Break inheritance” is set on the content.
-   Local only: the icon indicates if there is at least one permission on the content that is applied only locally and will not be inherited to the subtree.
-   Explicitly denied: indicates that the permission is explicitly denied on the content (deny is always stronger than the allow on the specific permission-type)
-   Implicitly denied: indicates inherited deny.

![Legend to the permission overview](http://download.sensenet.com/BlogPostImages/PermissionOverview/overviewWithLegend.png)

## Permission matrix

When a content in the tree is selected, the permission matrix of the selected content will be displayed under the tree on a separate panel. This table shows the permission inheritance from the parent chain and explicit permission settings on the selected content. It also displays the group inheritance of the permission set related to the selected user. This view is outstanding when the group inheritance of certain permissions needs to be investigated.

![The permission matrix of a selected content](http://download.sensenet.com/BlogPostImages/PermissionOverview/selectedPermissionMatrix.png)

## Where to find it

The tool is placed in the “System” folder, but it is also available from the Root Console:

![Find permission overview in the content explorer!](http://download.sensenet.com/BlogPostImages/PermissionOverview/contentExplorer.png)

We really hope, that you guys, will find it a pretty useful tool, and we'd love to know your opinion. Feel free to give us a feedback!

