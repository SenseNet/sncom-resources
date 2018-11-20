# Permission constraints

## Overview

You can set different permissions on a single Content for users/groups/organizational units using the Sense/Net [Permission System](__TODO__). There are a number of different [Permission System#Permission types|permission types](__TODO__) that can be used to control different types of access - access like see, open, save, etc. These permission types are related to each other and setting a specific permission type may result in automatic setting of another.

## Details

### Permission groups
The different [Permission System#Permission types|permission types](__TODO__) fall into one of the four permission groups:
1. Read permissions: **See, Open, OpenMinor**,
2. Write permissions: **Save, Publish, ForceCheckin, AddNew, Approve, Delete, RecallOldVersion, DeleteOldVersion**,
3. Permission control: **SeePermissions, SetPermissions**,
4. Application: **RunApplication**.
5. Workspace administration: **Manage lists and workspaces**.

![Permission groups](images/permission-constraints/PermissionGroups.png "Permission groups")

### Permission constraints
#### 1. Checking any 'Deny' checkbox clears 'Allow' in same row and vice versa

![Allow clears Deny](images/permission-constraints/AllowClearsDeny.png "Allow clears Deny")
<br/>
![Deny clears Allow](images/permission-constraints/DenyClearsAllow.png "Deny clears Allow")

#### 2. There are five level of read permissions. Allowing a higher level allows lower levels
Except: *Preview without watermark* and *Preview without redaction* are independent from each other so these permissions are on the same level.
- Allow *Open* allows *See*:
- Allow *Restricted preview* allows *See*:
- Allow *Preview without watermark* or *Preview without redaction* allows *Restricted preview* and *See*:
- Allow *Open* allows all Previews and *See*
- Allow *OpenMinor* allow *Open*, 3 Previews and *See*.
- Allow *OpenMinor* allows *Open* and *See*:

![Allow OpenMinor](images/permission-constraints/OpenMinorAllow.png "Allow OpenMinor")

#### 3. Allowing any write permission allows every read permission
e.g. allowing *Publish* allows *See*, *Open*, *OpenMinor*:

![Allow a write permission](images/permission-constraints/WriteAllow.png "Allow a write permission")

#### 4. Clearing a lower read level clears higher read levels and every write permission. In the same way denying a lower read level denies higher read levels and every write permission:

(there is only one exception: *Preview without watermark* and *Preview without redaction* do not clear or deny each other)
e.g. denying *Restricted preview* denies *Preview without watermark*, *Preview without redaction*, *OpenMinor*, every write permissions: *Save, Publish, ForceCheckin, AddNew, Approve, Delete, RecallOldVersion, DeleteOldVersion* and *Manage lists and workspaces*:

![Deny Open](images/permission-constraints/OpenDeny.png "Deny Open")

#### 5. Permission controlling permissions
Allowing *SetPermissions* allows *SeePermissions*. Clearing/denying *SeePermissions* clears/denies *SetPermissions*.

![See and SetPermissions](images/permission-constraints/SeeAndSetPermissions.png "See and SetPermissions")

#### 6. Manage List and workspaces permission
Allowing *Manage List and workspaces* allows all permissions in the open group, *Save*, *Add new* and *Delete* permissions. Clearing or denying  any of the mentioned permission clears or denies the *Manage List and workspaces*.

Allowing *Manage List and workspaces:*
![ManageListsAndWorkspaces](images/permission-constraints/ManageListsAndWorkspaces.png "ManageListsAndWorkspaces")

## Related links
- [Permission System](__TODO__)
- [How to set permissions on a content](__TODO__)
- [Permission Overview](__TODO__)
