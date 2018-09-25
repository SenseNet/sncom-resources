---
title: "Logging"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/logging.md'
category: Development
version: v7.0
tags: [logging, tracing, eventlog, event]
description: In enterprise platforms like sensenet one of the most important infrastructural features is logging and tracing. Developers need to know what is happening inside the application on-the-fly and historically too. This article is about the different logging layers of sensenet and the choices developers and operators have when assembling an application.
---

When we talk about logging, we usually mean a combination of the following related subjects:

- event logging
- audit logging
- tracing

This article covers the first two subjects. If you need to learn more about **tracing**, which is about a verbose log that is not necessarily switched on all the time but can be essential when we want to monitor the application's behavior closely, please visit the following article:

- [Tracing in sensenet](https://github.com/SenseNet/sn-tools/blob/master/docs/sntrace.md)

## What do we log?
Events are categorized according to the following log severity levels:

- **Error**: indicates errors that mark abnormal execution and needs the attention of operators or developers
- **Warning**: shows warning messages that do not affect the general flow of execution but might lead to errors
- **Information**: marks general information messages
- **Audit**: data or permission changes

All components and layers of sensenet write events about their behavior (e.g. initialization or exceptions) and the base system also informs operators during system startup and shutdown - for example about the loaded and configured providers. **Errors** and **warnings** are important to take care of because they may be a sign of degraded user experience or system health.

Many events contain properties beyond a simple message (for example the user or content that participated in the event), look for the extended properties section in the log when you observe events.

### Categories
Log messages are categorized not only by their severity levels but also by the source of events. Different subsystems may use different categories to make filtering of logs easier and to allow loggers to log events to different target locations. The AD sync tool for example uses the category _AdSync_. Developers may include custom categories when logging events.

### Event identifiers
It is possible to tag messages with specific event ids. Administrators may use those ids to filter the log flow. 3rd party developers can define custom event ids (as these are simple numbers) to create customized event log messages.

### Audit log
Audit events are special kinds of events that are usually related to data or permission changes. In sensenet they are treated a bit differently than regular events: they are written into the **database** by default. This is to make sure that all content operations (for example edit or delete) are tracked properly. The currently logged in user who performed the operation is also logged of course.

Audit events are currently accessible through the database provider API in sensenet or directly in the database: the `LogEntries` table contains all the records. In case of content operations you may find the `FormattedMessage` column useful that contains actual property changes.

## Custom events
The logging API (accessible through the `SnLog` class) lets developers write events the same way as the core features of sensenet do. They will be channeled to the same logging provider as internal events. To learn more please visit the [Diagnostics](https://github.com/SenseNet/sn-tools/tree/master/src/SenseNet.Tools/Diagnostics) article.

## Logging providers
Logging providers are replaceable in sensenet, meaning it is possible to direct log messages into the channel that makes sense in your environment. For example it is most likely that you'll use a different logging provider in case of an on-premise and a cloud environment.

#### Application Insights
This is the logger provider you'll want to choose in a cloud environment. It sends events to the [Azure Application Insights](https://docs.microsoft.com/en-us/azure/application-insights/) API which gives you rich monitoring and API options.

- [Application Insights logger](https://github.com/SenseNet/sn-logging-applicationinsights)

> The provider works in a local environment too: you can monitor events on the Azure portal the same way as if your app was in the cloud.

#### Other built-in loggers
Applications installed locally or in VMs may want to use older technologies. We offer several logger implementations in the [sensenet Tools](https://github.com/SenseNet/sn-tools) library.

- Event logger
- File system logger
- [Enterprise Library](https://github.com/SenseNet/sn-logging-entlib) (legacy)

To learn more about these, please visit the [Diagnostics](https://github.com/SenseNet/sn-tools/tree/master/src/SenseNet.Tools/Diagnostics) article.

## Configuration
Developers or operators may choose the appropriate logging provider and configure it in their application either in code:

```csharp
protected override void BuildRepository(IRepositoryBuilder repositoryBuilder)
{
    base.BuildRepository(repositoryBuilder);
    repositoryBuilder.UseLogger(new CustomEventLogger());
}
```

...or in configuration:

```xml
<sensenet>
  <providers>
    <add key="EventLogger" value="EventLoggerFullClassName" />
  </providers>
</sensenet>
```
