---

title:  "A road to .Net Standard"
author: tusmester
image: "../img/posts/road-to-netstandard-v1.png"
tags: [upgrade, standard, patch, framework]

---

There is a lot going on with .Net these days. First came the new era of .Net Core, then a new standard emerged that serves as a bridge between the old and the new platforms. We have to make sensenet available to as many customers as possible. This is why we started to unify our projects to support [.Net Standard 2.0](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) that contains a lot more apis than its predecessors.

---

## A unified .Net platform
To offer at least parts of sensenet in .Net Standard format, we have to upgrade all our libraries to **at least .Net Framework 4.6.1**, because that is the oldest version on the framework line that supports .Net Standard 2.0. This already happened in the last few days: we released a new version of our components containing the new libraries.

This means that starting with **sensenet Services 7.2** the application project that uses sensenet packages has to be at least on .Net Framework 4.6.1 or later. This should not be a big deal as that version is relatively old.

> That was the easy part.

## I'm confused, .Net Framework or Standard?
sensenet consists of many libraries. The goal is to offer these libraries to the broadest customer audience possible. The .Net Standard format lets both **.Net Framework** (4.6.1+) and **.Net Core** (2.0+) applications use our packages. This lets older projects get the new features while modern environments (for example a full cloud-ready build system) can also use the same code base.

> We are not there yet.

## Converting sensenet libraries
There are some features or apis in sensenet that are **not available in .Net Standard** (of course in a future version of the standard there may be more apis available). For example EventLog access, MSMQ messaging and Workflow among them. Our approach is to replace these features with more modern solutions or separate them into their own components and make them available as a legacy option. There are other reasons too: for example as MSMQ is **not available in the cloud**, we will offer a different solution (RabbitMQ or Azure Service Bus) for messaging in cloud deployments.

This means we will convert our project one-by-one, starting from the bottom to the top. *SenseNet.Tools*, *Common* and *Search* libraries are already converted to netstandard, as you can see in the following diagram.

[ converted projects diagram ]

## Easier upgrades
