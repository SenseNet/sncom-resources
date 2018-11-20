# Permission Overview

## Overview
If you ever struggled to understand the permission structure related to a certain user, not just for a single content but in the whole system, you know how difficult it can be. We have had a permission setting page for each content for a long time and now we developed a tool that gives administrators the full picture.

From now on, users can make use of our brand-new permission visualization tool, which provides an overview on any user's permission settings over all contents throughout the Content Repository. With the use of a tree view, the tool will display the permission structure of all built-in permission types in the whole repository or in a chosen subtree. Each permission type is represented by an icon, as introduced in the following picture:

![Permission type icons and names](images/permission-overview/PermissionTypes.png "Permission type icons and names")

To learn more about the Sense/Net Permission system and its operation, please visit the following article:
- [Permission System](__TODO__)

The tool is available on the *PermissionOverview* page in the */Root/System* folder and it is also accessible from the Root Console:

![Where to find Permission overview](images/permission-overview/ContentExplorer.png "Where to find Permission overview")

## Details
Permission Overview is a useful tool to figure out which parts of the system are accessible by a certain user: Beyond that, the inheritance structure is also displayed in a transparent way as well. It also helps in adjusting permissions by the detailed overview provided on the whole permission structure, so it is easily predictable what will happen if you change any of the permissions.

![Overview layout](images/permission-overview/Overview.png "Overview layout")

## Main areas
The overview layout is devided to three main section, which are the followings:

### Topbar section
**User switch:** choose the user, whose permission set will be examined. By default the logged in user is selected.

**Root selector:** select the root of the tree that will be displayed in the overview tool. By default the "Root" folder is selected

**View switch:** 
* by default it shows the actual content's own permission-set, all inherited and explicitly set allow or deny permissions are presented in this view:![Current level permission view](images/permission-overview/PragueCurrentlevelPermissions.png "Current level permission view")

* The second mode is a handy view to help find permission entries in the subtree, and avoid unnecessary searching in subtree-branches that are irrelevant for the selected user.![Permission changes in the subtree](images/permission-overview/PragueSubtreePermissions.png "Permission changes in the subtree")

**Legend:** on the right of the topmost section there is a panel that helps you understand the applied notations on the overview tree.
1. *explicitly allow:* indicates allowed permissions set explicitly on the selected content
2. *implicitly allow:* indicates allowed permissions inherited from a parent node
3. *in subtree:* all permission settings are projected upward that are applied in the subtree of the selected node.
4. *break:* the icon is displayed when "Break inheritance" is set on the content
5. *local only:* indicates if there is at least one permission in that row that is applied only locally, and will not be inherited to subtree.
6. *explicitly denied:* indicates all deny permissions applied on the content itself
7. *implicitly denied:* displays all inherited deny permissions on the content

![Hint to describe permission-type icons](images/permission-overview/OverviewWithLegend.png "Hint to describe permission-type icons")

### Content tree
Under the topbar section, the tree-structure of the Content Repository is displayed. Beside every content the basic permission types of Sense/Net are listed. By each permission-type its icon is displayed if the permission is applied on the content, or its place is left empty in case the permission is not set on that level.

**Current level permission-structure:** in this default view (using dark blue icons) inherited and explicitly set permissions can be identified easily:

![Inherited and explicitly set permissions on the current level](images/permission-overview/CurrentLevelInheritance.png "Inherited and explicitly set permissions on the current level")

**Permission structure in subtree:** if the view-switch is set to show permissions in the subtree, the second set of permission icons (the light blue ones) are made more visible. In this view the permission type indicators show up if - anywhere in the subtree of the selected content - any modification is applied on that permission type:

![Permission changes in the subtree](images/permission-overview/InSubtreePermissions.png "Permission changes in the subtree")

### Permission matrix
When a content in the tree will be selected, the permission matrix of the selected content opens up at the bottom section of the screen, in a separate panel. This table contains the selected content and its parent chain all the way up to the root, and displays the permission inheritance structure. Inherited and explicitly applied permissions are both shown in this panel. Another important feature of the permission matrix is that the group list of the permission set - related to the selected user - is shown in the last column of each level. This view is outstanding when the group chain of certain permissions need to be investigated in order to make decisions, if any user should be the member of a certain group, or should be removed in order to set up their permission-structure properly.

![Permission matrix and inheritance of a selected content](images/permission-overview/SelectedPermissionMatrix.png "Permission matrix and inheritance of a selected content")

## Related links
- [Permission System](__TODO__)
- [Permission API](__TODO__)
- [Permission Constraints](__TODO__)
- [Permission queries](__TODO__)
- [Permission settings in production environment](__TODO__)
