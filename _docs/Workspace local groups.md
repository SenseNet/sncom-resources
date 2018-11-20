# Workspace local groups

In sensenet the default location of users and groups is the *IMS* folder. However we can create groups under workspaces too. The main purpose of **Workspace local groups** is to help permission management inside workspaces. They are located under the *Groups* system folder in workspaces and workspace permissions can be defined for these groups. If the local group structure is properly configured, the only thing workspace administrators should do when a new user is assigned to a workspace is to *add them to the proper local group(s)* instead of assigning permissions to individual users.

In sensenet there are three predefined local groups (_Owners_, _Members_, _Visitors_) that cover the most important use cases but there are no limitations to add or remove groups or modify the default behavior. Groups are contents too (like almost everything in sensenet), so you can add additional groups to workspaces as easily as you add folders. Populating a group with users is an easy task as well using our group management GUI with instant search capability.

You can use local groups when you are building up **workspace templates** as well. With this technique you can provide ready-made workspaces for your users.

### Built-in groups
In sensenet there are three predefined local groups with three different permission levels. 

- **Owners** have full control over their workspaces, only they have the right to set permissions, manage local groups, or modify the configuration of lists and workspaces. They are like local administrators. 
- **Members** are the typical users of a workspace: they can create, modify, publish content, but they can not approve them, or modify the top level settings of workspaces. 
- **Visitors** have only open permissions.

| Permission                   | Owners | Members | Visitors |
| ---------------------------- | ------ | ------- | -------- |
| See                          | ![ok]  | ![ok]   | ![ok]    |
| Open                         | ![ok]  | ![ok]   | ![ok]    |
| Open Minor                   | ![ok]  | ![ok]   |          |
| Save                         | ![ok]  | ![ok]   |          |
| Publish                      | ![ok]  | ![ok]   |          |
| Force Checkin                | ![ok]  |         |          |
| Add New                      | ![ok]  | ![ok]   |          |
| Approve                      | ![ok]  |         |          |
| Delete                       | ![ok]  | ![ok]   |          |
| Recall Old Version           | ![ok]  | ![ok]   |          |
| Delete Old Version           | ![ok]  |         |          |
| See Permissions              | ![ok]  |         |          |
| Set Permissions              | ![ok]  |         |          |
| Run Application              | ![ok]  | ![ok]   | ![ok]    |
| Manage Lists and Workspaces  | ![ok]  |         |          |
[ok]: images/workspace-local-groups/ico-ok.gif


>Please note that the local groups listed above have nothing to do with the global *Owners* group or the *Visitor* user. Please visit [Special and built-in groups and users|this article](__TODO__) for details about global built-in groups and users.

### Displaying members in workspaces
Workspace members are by default displayed on workspace pages. A simple [Content collection Portlet](__TODO__) is used, that is bound to the *Groups* folder of the current workspace, and the renderer is:

```
/Root/Global/renderers/Workspace/WorkspaceMembers.ascx
```

The portlet shows all users and groups that are members of any of the workspace local groups - also displaying the specific group in which they belong:

![Workspace members](images/workspace-local-groups/WorkspaceMembers1.png "Workspace members")

A user or group can be a member of more than one local groups, in this case all group membership info is displayed for the specific user:

![Members in multiple groups](images/workspace-local-groups/WorkspaceMembers2.png "Members in multiple groups")

The users having Save permission to the *Groups* folder are allowed to manage users, meaning they can remove users from the groups clicking the red cross at the user's group label, and they can also add users to workspace local groups using the *Add new members* link displayed at the top of the members list. By default, members of the workspace Owners local group and members of the global Administrators group have Save permission to the *Groups* folder and thus have permission to manage workspace local groups membership. The *Add users to workspace* dialog that pops up after clicking the *Add new members* link shows all workspace local groups with a [Label Picker](__TODO__) control to allow easy adding of new users to groups. The Label Pickers are accompanied with [Content Picker](__TODO__)s, so users can also be picked via an interface with wider overview capabilities.

![Adding members to local groups](images/workspace-local-groups/WorkspaceMembers3.png "Adding members to local groups")

The above dialog always shows all local groups, meaning that new local groups can be created in the [Content Repository](__TODO__) under the workspace's Group folder without having to change the dialog UI layout. Workspace Owners can manage new groups right away using the same UI, as new groups will be listed automatically.

### Displaying members in profile page
A user's workspace membership is displayed on its profile page, in the portlet entitled *My workspaces*. This is a simple [Content collection Portlet](__TODO__) bound to the *User* property of the current workspace (which is the user that belongs to the current profile page) - the renderer is:

```
/Root/Global/renderers/Workspace/MyWorkspacesList.ascx
```

The portlet shows all workspaces for the specific user also displaying group information:

![My workspaces list](images/workspace-local-groups/WorkspaceMembers4.png "My workspaces list")

If the user is a member of multiple groups within the same workspace, all groups are enlisted:

![Multiple groups are listed](images/workspace-local-groups/WorkspaceMembers5.png "Multiple groups are listed")

If the user is not directly a member of a workspace local group, but is contained via another group that is a member of a workspace local group, the user's group membership is displayed with the containing group also being indicated (in this example the user is a member of MyGroup, and MyGroup is a member of the Visitors local group of the *Budapest Project Workspace*:

![Membership via another group](images/workspace-local-groups/WorkspaceMembers6.png "Membership via another group")

A user's group membership can be managed via the workspace page (or in Explore managing the workspace local groups), by users having permission to manage workspace local groups.