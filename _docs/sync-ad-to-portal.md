---
title: "Sync Active Directory to the portal"
source_url: 'https://github.com/SenseNet/sn-adsync/blob/master/docs/sync-ad-to-portal.md'
category: Guides
version: v7.0
tags: [ad, sync, sn7]
description: Active Directory Synchronization is about replicating LDAP or portal users, groups and other security-related entities in another server or repository. In case of 'AD to Portal' sync this means creating the same set of entities in the Content Repository as in in Active Directory (AD).

---

# Sync Active Directory to the portal
[Active Directory Synchronization](/docs/adsync) is about *replicating* LDAP or portal users, groups and other security-related entities in another server or repository. In case of 'AD to Portal' sync this means creating the same set of entities in the [Content Repository](/docs/content-repository) as in in **Active Directory (AD)**.

The synchronization of users from Active Directory to the portal is performed by a [task executor](/docs/task-management#Task_Executor) tool. For details about deploying and managing task executors please visit the following article:

- [Task Management: deploying executors](/docs/task-management-for-developers#Deploying_executor_tools)

The tool can be found in the web folder at the following location:

```txt
TaskManagement\TaskExecutors\SyncAD2Portal 
```

> This tool is **not intended to be executed manually**. Please copy it to the appropriate [Task Management](/docs/task-management-for-developers) location and let the task management framework execute the tool automatically.

The program connects to the AD servers according to the sync-trees specified in the setting and synchronizes all objects to the portal in the following order:

- **Organizational Units** and **AD Folders** in all sync-trees are created/updated
- **Users** in all sync-trees are created/updated
- **Groups** in all sync-trees are created/updated
- All **Users** on the portal that are not present in AD are deleted
- All **Groups** on the portal that are not present in AD are deleted
- All **Organizational Units** and **AD Folders** on the portal that are not present in AD are deleted

For general details please refer to [Active Directory Synchronization](/docs/adsync).

### Installation
To configure AD to portal sync follow these steps:

1. Copy the executor folder (see above) to the agent machine
2. Set the necessary values in the setting in the Content Repository (see below)

### Settings
The settings for AD to Portal sync can be found here:

```txt
/Root/System/Settings/SyncAD2Portal.settings
```

By navigating to this file in Content Explorer there are two ways to edit the settings:

- In explore mode: we provide a graphical user interface to edit settings
- Clicking on the *Edit in browser* link: the underlying JSON text can be edited in the browser's code editor

> Please note that all values (AD and Content Repository paths, property names, etc.) are **case sensitive**. Please use the exact same names here as the ones you see in Active Directory.

The settings can be divided into the following main parts:

- General settings
- Servers
- Sync-tree definitions
- User property mapping definitions

#### General settings
- In this section a global switch can be set to control whether Active Directory synchronization is **enabled** or not. If this checkbox is not checked, setting values will be preserved but no synchronization process will start.
- Scheduling can be set by **frequency** or **exact time** parameter. Frequency must be set if ad sync needs to be started periodically. The value is set here in minutes (counted from midnight). If an exact time is set, ad sync will be executed once a day, at the provided *UTC time*.
- Parallel operations can be set by a whole number value. This defines how many parallel operations are allowed for the ad sync tool. A higher number means faster sync, but also a higher load on the server.

#### Servers
In this section you can define one or more server connections for the ad sync tool. You may have to define multiple servers in case you have multiple AD servers or your sync trees (see below) require different user credentials.

- Server data is displayed in a grid. Values in the grid can be edited in a popup window by clicking on the edit icon in the end of a row. Existing servers can be deleted as well.
- One can add new servers to be used by ad sync, also in a popup window, by entering server data in the input fields.

![Server settings](https://github.com/SenseNet/sn-adsync/raw/master/docs/images/adsync-settings-servers.png "Server settings")

##### Server properties
- **Name**: friendly name for the server. This value is referenced by sync trees when selecting a server.
- **LDAP Server**: ip address or fully qualified domain name (the latter is preferred).
- **Novell eDirectory**: set this property to true when using **eDir to Portal sync** (see below).
- **Logon credentials**: this section holds information about the user having sufficient rights to retrieve information from AD. The password is securely encrypted (see [Cryptographic API](/docs/cryptography) for details) and it is hidden after you set it for the first time. If *Anonymous* is set, the tool tries to connect to the directory without user credentials.
- **Use SSL**: the tool tries to establish a connection to the server over SSL.
- **Port**: the port to be used when connecting to the server (*optional*).
- **Sync Enabled State**: when set to true the *enabled/disabled* state of users are synchronized.
- **Sync Username**: when set to true the name of users are synchronized to portal content and login names.
- **Deleted Portal Objects Path**: when objects are deleted from the AD, the corresponding portal objects except users are also deleted. Portal users are moved to the path defined in this configuration section instead.
- **UserType**: the custom user type that is created when a new AD user is synced to the portal (*optional*, default is *User*)

> Please note that before setting a **password** above for a domain user that has access to the AD, you have to configure the certificate that we use for encrypting/decrypting the password.
>
> [Cryptography: setting a certificate](/docs/cryptography#certificate)

#### Sync-tree definitions
A sync tree defines a container that should be synced from a certain LDAP server to the portal. You may define exceptions and filters to shorten the list of sync objects.

- Sync-tree parameters are displayed in the grid. Displayed values can be edited in a popup window by clicking on the edit icon in the end of the row. Existing trees can be deleted as well.
- One can add new tree to be synced also in a popup window.

At least one sync tree has to be defined for the process to do its job. 

![Sync trees](https://github.com/SenseNet/sn-adsync/raw/master/docs/images/adsync-settings-synctrees.png "Sync trees")

##### Sync-tree properties
- **Server**: select one of the available servers from the list.
- **Base DN**: AD path (distinguished name) of the AD sync-tree root object. It has to exist on the AD server. This is usually a domain or an organizational unit.
- **Portal Path**: Content Repository path of the portal sync-tree root object. It may refer to a non-existing path on the portal - in this case it will be automatically created using the parent and ancestor names defined in the *PortalPath* and the corresponding AD object types according to *Base DN* above. 

> *PortalPath* should be the exact match of *Base DN* (ie ```OU=x,OU=y,DC=a,DC=b``` should be mapped to */Root/IMS/a/y/x*). To skip a line of levels (ie. */Root/IMS/a/x*) all the containers (*a* and *x*) should be created manually and the *SyncGuid* field should be set manually before syncing!

- **AD Exceptions** (*optional*): objects under the AD path defined here will not be synchronized (will be skipped).
- **Filters**: the following filters can be used to appoint only a subset of the objects. So unlike exceptions above (that leave out subtrees) these filters will define what to **include** in the sync process. The default is everything of course.
- **User filter**: LDAP filter for users (see filter syntax on [MSDN](https://msdn.microsoft.com/en-us/library/aa746475(v=vs.85).aspx))
- **Group filter**: LDAP filter for groups
- **Container filter**: LDAP filter for containers
- **Sync Groups**: when set to *false*, groups under the current sync-tree will not be synchronized. Useful to speed up syncing when group sync is not necessary. 
- **Sync Photos**: if set to true, user thumbnail photos will be synced as avatar images to the portal.
- **Mappings**: please choose from one of the existing mapping definitions below.

#### User property mapping definitions
In this section one can define property mappings that determine the target fields of synchronized AD properties. Properties can be split to multiple fields, or multiple properties can be merged to a single field. 

You have to select a property mapping definition for every sync tree above.

- **Ad Properties**: AD user property to be synced. In most cases this is a single property, but it can be a list (see below).
- **Portal Property**: a portal user's field
- **unique**: indicates that the property's value must be unique, so when the user is deleted this property's value is going to be prefixed with the deletion date
- **maxLength**: indicates that the property's value's length may not exceed the defined. If the length of the property's value is greater than what is defined here then the value will be truncated.

In special cases the different properties cannot be mapped one-on-one to each other. A separator character can be defined that helps concatenating or splitting property values. The following scenarios are supported:

- one AD property and one portal property: the given property values are mapped to each other one-on-one
- multiple AD properties and one portal property: AD property values will be concatenated to the given portal field using the separator character.
- one AD property and multiple portal properties: the single AD property value is split up along the separator and the resulting values are set to the given portal properties in corresponding order

### Monitoring
As AD sync is a task executor, it provides a real-time progress that you can follow on the [Task Monitor](/docs/task-management#Monitoring) user interface.

### Logging
The AD sync tool creates an extensive log next to itself in the file system. In case of errors or unexpected behavior you should examine the latest log for details.

```txt
SyncAD2Portal_20160522-132243.log
```

After every sync execution a summary is sent to the portal that will be logged into the *Event log* (execution time, number of errors).

## Example/Tutorials
The following example displays the underlying JSON that contains all the settings that are accessible on the UI. This json can be edited by clicking on the *Edit in browser* link of the AD sync setting in Content Explorer. 

```json
{  
   "Enabled":true,
   "Scheduling": {
         "Frequency": 0,                                                
         "ExactTime": "01:00:00"                           
   },
   "ParallelOperations": 10,   
   "Servers":[  
      {  
         "Name":"testcorp",
         "LdapServer":"exampledc.examplecorp.local",
         "Novell":false,
         "LogonCredentials":{  
            "Username":"examplecorp\\adadmin",
            "Password":"",
            "Anonymous":false
         },
         "UseSsl":true,
         "Port":0,
         "SyncEnabledState":true,
         "SyncUserName":true,
         "DeletedPortalObjectsPath":"/Root/IMS/Deleted",
         "UserType":"User"
      }
   ],
   "SyncTrees":[  
      {  
         "Server":"testcorp",
         "BaseDN":"OU=Company001,DC=examplecorp,DC=local",
         "PortalPath":"/Root/IMS/examplecorp/Company001",
         "ADExceptions":[  ""  ],
         "UserFilter":"*",
         "GroupFilter": "*",
         "ContainerFilter":  "*",
         "SyncGroups": true,
         "SyncPhotos": true,
         "Mappings":"ActiveDirectory"
      }
   ],
   "MappingDefinitions":[  
      {  
         "Name":"ActiveDirectory",
         "Mappings":[  
            {  
               "Separator":",",
               "ADProperties":[  
                  {  
                     "Name":"mail",
                     "Unique":true
                  }
               ],
               "PortalProperties":[  
                  {  
                     "Name":"Email",
                     "Unique":true
                  }
               ]
            },
            {  
               "Separator":",",
               "ADProperties":[  
                  {  
                     "Name":"givenName",
                     "Unique":false,
                     "MaxLength":100
                  },
                  {  
                     "Name":"sn",
                     "MaxLength":100
                  },
                  {  
                     "Name":"initials",
                     "Unique":false,
                     "MaxLength":6
                  }
               ],
               "PortalProperties":[  
                  {  
                     "Name":"FullName"
                  }
               ]
            }
         ]
      }
   ]
}
```

## FAQ
**Q:** **How can I assign permission settings for the AD groups on the portal?**

**A:** After the first synchronization users and groups will be created on the portal. Group membership information is also synchronized, so the portal groups will contain those users whose pairs in AD are members of the corresponding AD groups. You can assign permissions to the created portal groups after the first synchronization. These permission settings will remain unchanged for subsequent synchronizations, as long as the groups are not deleted from AD.


**Q:** **Can I synchronize objects from AD after I have manually created them in the portal?**

**A:** Only if you set the *SyncGuid* property of the portal object (let it be an OU, an ADFolder, a Group, or a User) to the value of the *objectGuid* property of the corresponding AD object, and start the sync afterwards. This method however is not advised. We encourage you to set up the AD sync configuration so that all portal objects are created by the first synchronization.


**Q:** **What happens if I move a synced orgunit to another path in the same sync-tree in AD?**

**A:** The orgunit and all of its contents will be moved to the corresponding place on the portal.


**Q:** **What happens if I move a synced object in AD to a path that is not under any defined sync-tree?**

**A:** This is considered as deletion and object is deleted from the portal (users are disabled, other objects are deleted).


**Q:** **What happens if I move a synced object to a path that is under a different sync-tree in AD?**

**A:** If the target sync-tree resides on the same AD server as the source sync-tree, the object is moved in the repository too.


**Q:** **What happens if I move an unsynced object in AD under a sync-tree?**

**A:** This is considered as creating a new object so a new object is created in the repository.


**Q:** **What happens if I move a synced object out of a sync-tree in AD and then move it back later?**

**A:** In case of users the object is deleted and thus moved to the appointed delete folder. Then it is moved back and its properties get updated - provided that the delete folder is under */Root/IMS*. In case of other types of objects the object will be deleted and later a new object is created.


**Q:** **What happens if I create a new user under a sync-tree but the properties defined cause an error on the portal?**

**A:** The user is not created on the portal. Before you try to resync the user make sure to save it in the AD so that its *whenchanged* property is updated.


**Q:** **What happens if I update a user in AD so that its name and some properties are changed but the changes cause an error on the portal?**

**A:** The changes are not updated and the error is logged. Before you try to resync the user make sure to save it in AD so that its *whenchanged* property is updated.


**Q:** **What happens if I create a new object in AD and an object with the same name (but no Guid) already exists on the portal?**

**A:** If the existing object with the same name is not under a sync-tree, the object will not be created. Otherwise the new object still cannot be created, but the *obstacle* object is deleted from the portal, as there won't be any corresponding object in the AD. Thus in the next sync phase the object from AD is synced and a new object on the portal is created.


**Q:** **What happens if I put an unsynced user in a synced group in AD?**

**A:** A warning is logged. This does not affect the other users in the group.


**Q:** **What happens if I put an unsynced user in a synced group and later move the user under the same sync-tree in AD?**

**A:** Groups are always updated, so the new user created on the portal will be a member of the synced group.


**Q:** **What happens if I delete a user from AD?**

**A:** The corresponding user on the portal is disabled and moved to the configured delete folder. It is renamed and its unique property values are prefixed with the date of deletion.


**Q:** **What happens if I delete an orgunit or container from AD?**

**A:** Every portal object contained in the corresponding container is deleted including the container itself. Contained users are disabled and moved to the delete folder.


**Q:** **What happens if I delete a group from AD?**

**A:** The corresponding portal group is deleted. Member users remain unchanged.


**Q:** **What happens if I deleted a synced user from AD and then I create a new user with the same properties?**

**A:** The deleted user is moved to the deleted folder and a new user is created with a new Guid.


**Q:** **What happens if I remove a synced AD user's property?**

**A:** The value of the property on the portal is set to empty.


## References
- [LDAP Search Filter Syntax on MSDN](https://msdn.microsoft.com/en-us/library/aa746475(v=vs.85).aspx)
