---

title:  "Docviewer"
author: CsabaPeter
image: "../img/posts/road-to-netstandard-header.jpg"
tags: [upgrade, standard, patch, framework]

---

There is a lot going on with .Net these days. First came the new era of .Net Core, then a new standard emerged that serves as a bridge between the old and the new platforms. We have to make sensenet available to as many customers as possible. This is why we started to unify our projects to support [.Net Standard 2.0](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) that contains a lot more APIs than its predecessors.

---

## A unified .Net platform
To offer at least parts of sensenet in .Net Standard format, we have to upgrade all our libraries to **at least .Net Framework 4.6.1**, because that is the oldest version on the framework line that supports .Net Standard 2.0. This already happened in the last few days: we released a new version of our components containing the new libraries.

This means that starting with **sensenet Services 7.2** the application project that uses sensenet packages has to be at least on .Net Framework 4.6.1 or later. This should not be a big deal as that version is relatively old.

> **Important**: please note that there was a [type forwarding issue](https://github.com/dotnet/standard/issues/300) in .Net Framework 4.6.1 that breaks interop with a netstandard assembly if it contains certain methods in a class marked as Serialized. This means that although your projects may be on 4.6.1, on the target (executing) machine at least **.Net Framework 4.7.2** has to be installed.

## I'm confused, .Net Framework, Core or Standard?
sensenet consists of many libraries. The goal is to offer these libraries to the broadest customer audience possible. The .Net Standard format lets both **.Net Framework** (4.6.1+) and **.Net Core** (2.0+) applications use our packages. This lets older projects get the new features while modern environments (for example a full cloud-ready build and deployment system) can also use the same code base.

> But we are not there yet.

## Converting sensenet libraries
There are some features or APIs in sensenet that are **not available in .Net Standard** (of course in a future version of the standard there may be more APIs available but we can only work with what we have now): *EventLog* access, *MSMQ messaging* and *Workflow Foundation* among them. Our approach is to replace these features with more modern solutions or separate them into their own components and make them available as a legacy option. 

There are other reasons for decomposing some features: as MSMQ is **not available in the cloud**, we will offer a different solution (based on *RabbitMQ* or *Azure Service Bus*) for messaging in cloud deployments.

This means we will convert our projects one-by-one, starting from the bottom. *SenseNet.Tools*, *Common*, *Search* and a few other libraries are already converted to netstandard, as you can see in the following diagram.

![Converting projects to netstandard](/img/posts/netstandard_diagram_01.png "sensenet netstandard libraries")

As we move forward with this project, we will post updates on how many and what kind of issues we have left and which packages are converted to netstandard.

## How does this affect my project?
You should not notice much - at least at the beginning. When we release a new version, NuGet will take care of updating your dll references. 

We try to convert or move features in the background, without changing the API if possible. When we remove and replace a dependency (e.g. *Enterprise Library* soon) you'll have the option to use either the old or the new technology (in this case a more modern, service-oriented logging module).

## Easier upgrades
Ok, but does not this mean that I'll have to update sensenet packages too frequently and execute patches all day?

> Fortunately not.

Our components (e.g. Services, WebPages) have two parts: libraries and a database part (e.g. content type definitions, views, etc.). If *only the dll part changes* (as is the case when we refactor the code base in the background), you *do not have to execute an SnAdmin patch*, because the dll is still compatible with the content items in the database.

Starting with sensenet 7.2, our components know the last supported version for their database part, so if there were no changes in the content repository, you can just **update the NuGet package in Visual Studio** and compile your application!

Photo by [rawpixel](https://unsplash.com/photos/FWOGqSKq_Cs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/standard?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)