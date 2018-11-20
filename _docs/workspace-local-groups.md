---
title: "Workspace local groups"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/workspace-local-groups.md'
category: Concepts
version: v7.0
tags: [workspace, user, group, local]
description: "Local groups let site builders define workspace-specific groups with predefined permissions to make onboarding new users easier."
---

# Workspace local groups

In sensenet the default location of users and groups is the *IMS* folder. However we can create groups under workspaces too. The main purpose of **Workspace local groups** is to help permission management inside workspaces. They are located under the *Groups* system folder in workspaces and workspace permissions can be defined for these groups. If the local group structure is properly configured, the only thing workspace administrators should do when a new user is assigned to a workspace is to *add them to the proper local group(s)* instead of assigning permissions to individual users.

In sensenet there are three predefined local groups (_Owners_, _Members_, _Visitors_) that cover the most important use cases but there are no limitations to add or remove groups or modify the default behavior. Groups are contents too (like almost everything in sensenet), so you can add additional groups to workspaces as easily as you add folders. Populating a group with users is an easy task as well using our group management GUI with instant search capability.

You can use local groups when you are building up **workspace templates** as well. With this technique you can provide ready-made workspaces for your users.

## Built-in local groups
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
| Force undo checkout          | ![ok]  |         |          |
| Add New                      | ![ok]  | ![ok]   |          |
| Approve                      | ![ok]  |         |          |
| Delete                       | ![ok]  | ![ok]   |          |
| Recall Old Version           | ![ok]  | ![ok]   |          |
| See Permissions              | ![ok]  |         |          |
| Set Permissions              | ![ok]  |         |          |
| Run Application              | ![ok]  | ![ok]   | ![ok]    |
| Manage Lists and Workspaces  | ![ok]  |         |          |
|||||

[ok]: img/workspace-local-groups/ico-ok.gif

> Please note that the local groups listed above have nothing to do with the global *Owners* group or the *Visitor* user. Please visit [this article](built-in-groups-and-users) for details about global built-in groups and users.