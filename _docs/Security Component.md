# Security Component

## Overview 
**Sense/Net ECM** is a huge product that has complex subsystems and permission handling is definitely one of them. This is why we decided to implement it as a standalone component. The *Security Component* is an independent module that can be used even in 3rd party projects outside of Sense/Net ECM.
This article is for *developers* who want to understand how the security component works and want to use it in their own projects. About licensing please contact us on [http://www.sensenet.com sensenet.com].
{{warning|This article **does not describe the Sense/Net ECM permission API**. If you want to know how to make security-related calls when you are developing for Sense/Net ECM, please head over to the [[Permission API]] article.}}

## Releases
- Main repository: [![NuGet](https://img.shields.io/github/release/sensenet/sn-security.png)](https://github.com/SenseNet/sn-security/releases)
- Security core: [![NuGet](https://img.shields.io/nuget/v/SenseNet.Security.png)](https://www.nuget.org/packages/SenseNet.Security)
- EF data provider: [![NuGet](https://img.shields.io/nuget/v/SenseNet.Security.EF6SecurityStore.png)](https://www.nuget.org/packages/SenseNet.Security.EF6SecurityStore)
- MSMQ message provider: [![NuGet](https://img.shields.io/nuget/v/SenseNet.Security.Messaging.Msmq.png)](https://www.nuget.org/packages/SenseNet.Security.Messaging.Msmq)

## Details
The *Security Component* in itself is able to manage a fully featured permission system of an application. It does the following things:
* **stores** the following items and relations:
  * entities (ids arranged in a hierarchy)
  * membership information (groups and their members' ids)
  * permission entries (related to the entities above)
* **evaluates permissions**: decides (using a super-fast algorithm) whether a certain identity has certain permissions for an entity - taking entity hierarchy and permission inheritance into account.

A client application that uses the component has to **keep the information stored in its repository and the security component consistent**: if a change happens in the entity tree structure (e.g. a new entity is added or an existing is moved) or membership structure (user-group relations), that change has to be made in the database of the *Security Component* too, using the API we describe in this article.
{{clear}}

### Libraries and usage
The Security Component consists of a library containing the core functionality of the component and a few additional libraries for the data layer and messaging implementations that you may replace with your own custom solutions. You simply have to copy the necessary libraries to your applications directory.

| Library                                | Description           | Usage  |
| -------------------------------------- | --------------------- | ------ |
| SenseNet.Security.dll                  | Core security library | Keep it in your application's binary folder. |
| SenseNet.Security.EF6SecurityStore.dll | Default data provider implementation, built on *Entity Framework 6* and a SQL data layer. |   Optional to use, you may replace it with a custom implementation of the *Security Component's* data provider. |
| SenseNet.Security.Messaging.Msmq.dll   | Default messaging provider implementation. | Optional to use, you may replace it with a custom implementation of the *Security Component's* messaging provider, or completely omit it if there is only a single app domain in your environment (e.g. no NLB). |

### Initialization
At application start the security component should be initialized with the necessary providers and other options (the values below should be settings in the main application of course).
```csharp
// instantiate providers
var securityDataProvider = new EF6SecurityDataProvider(connectionString);
var messageProvider = (IMessageProvider)Activator.CreateInstance(messageProviderType);
messageProvider.Initialize(new SecurityLogger());

var startTime = DateTime.Now;

SecurityContext.StartTheSystem(new SecurityConfiguration
{
    SecurityDataProvider = securityDataProvider,
    MessageProvider = messageProvider,
    SystemUserId = 1,
    VisitorUserId = 6,
    EveryoneGroupId = 8,
    OwnerGroupId = 9,
    SecuritActivityTimeoutInSeconds = 120
});

// start consuming messages (needed only in a load balanced environment)
messageProvider.Start(startTime);
```

### Security context
The component is built around the concept of the *security context* that represents the central object (basically the environment) for security operations. It contains the following elements:
* the user to check permissions for
* reference to shared objects 
  * internal cache
  * data provider
  * message provider

The context itself is not shared or static, a dedicated security context object should be created for different users. Of course it can be cached as necessary, e.g. for the lifetime of a request in an ASP.NET environment.
>The *SecurityContext* class is virtual and you will need to create your custom context implementation that is derived from it, mostly because of one of the following reasons:
>* **make custom calls** (e.g. permission asserts) before calling the built-in methods: the security component itself **does not check permission-related permissions** (e.g. *See permissions* or *Set permissions*) when you call its methods. This is the responsibility of the implementing application. In fact, the security component does not know anything about the different types of permissions, they are justs bits for the component.
>* **extend the API** with your custom methods.

### Permission types
The security component does not know anything about the different types of permissions. There is a limited number of permissions the component can handle (the maximum is *64*) and it handles them only as bits. This means if you want to work with *named permissions* (like *Open*, *Save*, etc.), you'll have to inherit from the built-in *PermissionTypeBase* class and define your named permissions as properties.
```csharp
public class PermissionType : PermissionTypeBase
{
    private PermissionType(string name, int index) : base(name, index) { }

    public static readonly PermissionType See;
    public static readonly PermissionType Open;
    public static readonly PermissionType Save;
	
    static PermissionType()
    {
        See = new PermissionType("See", 0);
        Open = new PermissionType("Open", 1) { Allows = new[] { See } };
        Save = new PermissionType("Save", 2) { Allows = new[] { Open } };
    }
}
```
>For more details please refer to the source code. It contains a sample implementation of a custom permission type class.

### Owner
Every entity has an owner that can be a *user* (in the future this may also be a group). For the security component this does not mean much, except for the evaluator algorithm: if the current user (that we are checking permissions for) is the owner of the entity, the component adds the *Owners* group id to its identity list (all the groups that the user is member of) on-the-fly during evaluation. If there are certain permissions defined for the Owners group, they will be taken into account during evaluation.

### API
In this section we list the main parts of the security API and provide a couple of examples for calling its methods. The examples below build on a previously created security context object.
```csharp
var context = new SecurityContext(user);
```
Most of the API methods are expecting an *entityId* that refers to the item to evaluate or set permissions for. The user is already defined by the context.
The methods listed below are only a couple of examples. For the complete list please refer to the source code or the intellisense in VS.

### Evaluator API
This is the most common API that contains methods for permission evaluation. The result of these calls is an aggregated boolean value that takes permission inheritance, group membership and allow/deny permissions into account. 
```csharp
// permission check for a single item
if (context.HasPermission(entityId, PermissionType.See)) { ... }
// permission check for a whole subtree
if (context.HasSubtreePermission(entityId, PermissionType.Open, PermissionType.AddNew)) { ... }
```

### Structure API
The *Security Component* stores entity ids and knows the concept of the *entity tree*. The following methods can be used for extending and modifying this entity structure.
```csharp
// main method for registering an entity in the security component
context.CreateSecurityEntity(entityId, parentId, ownerId);
// move an entity to a different folder
context.MoveEntity(entityId, targetId);
// delete an entity from the security component
context.DeleteEntity(entityId);
// modify the owner of the entity
context.ModifyEntityOwner(entityId, ownerId);
// check if the entity inherits permissions from it's parent
context.IsEntityInherited(entityId);
// Check if the entity actually exists. If it cannot be found, this method
// performs a callback to the host application for the entity if necessary.
context.IsEntityExist(entityId);
```

### Membership API
This part of the API mostly contains methods for adding/removing users to/from groups. A few examples:
```csharp
context.AddMembersToSecurityGroup(groupId, userMembers, groupMembers);
context.AddUserToSecurityGroups(userId, parentGroups);
context.RemoveUsersFromSecurityGroup(groupId, userMembers);
context.DeleteSecurityGroup(groupId);
context.DeleteIdentities(ids);
context.IsInGroup(memberId, groupId);
```

### ACL API
Editing permissions is done through a single entry point: the *Acl editor*. This class is responsible for adding/removing permissions, even on multiple entities in a batch operation.
```csharp
var editor = context.CreateAclEditor();
editor.Allow(entityId1, identityId, localOnly, PermissionType.Save);
editor.Deny(entityId2, identityId, localOnly, PermissionType.Delete);
// save the changes
editor.Apply();
```
Break permission inheritance and a fluent API.
```csharp
context.CreateAclEditor()
	.BreakInheritance(entityId1)
	.Allow(entityId2, identityId1, localOnly, PermissionType.Save)
	.Allow(entityId3, identityId2, localOnly, PermissionType.AddNew)
	.Apply();
```

### Permission query API
Permission queries are designed to let developers search for permissions defined on certain entities or entities with certain permissions.
```csharp
var identities = context.GetRelatedIdentities(entityId, PermissionLevel.AllowedOrDenied);
var permissions = context.GetRelatedPermissions(entityId, PermissionLevel.AllowedOrDenied, explicit, identityId);
var entities = context.GetRelatedEntities(entityId, PermissionLevel.AllowedOrDenied, explicit, identityId, permissions);
```

### Providers
In this section we describe the replaceable providers in the security component that you may customize.

#### Data provider
The built-in data provider (*EF6SecurityDataProvider*) was created to work with SQL Server, it should be enough for most cases.
You may freely create your own data provider that supports the data platform you need. The *ISecurityDataProvider* interface describes all the elements you have to implement. Here are a few examples:
```csharp
void InsertSecurityEntity(StoredSecurityEntity entity);
void DeleteSecurityEntity(int entityId);
SecurityGroup LoadSecurityGroup(int groupId);
void WritePermissionEntries(IEnumerable<StoredAce> aces);
```

#### Message provider
You will only need to use messaging if you are working with multiple app domains - e.g. in an ASP.NET environment with multiple web servers. For these cases we provide a built-in messaging system that uses MSMQ for sending security-related messages (e.g. entity structure changes) to other app domains. In case you want to use a different messaging technology, we provide the *IMessageProvider* interface that describes the messaging-related methods (e.g. sending or receiving a message) you should implement. Please take a look at the built-in message provider for examples.

## Related links
* [Permission System](__TODO__)
* [Permission API](__TODO__)
