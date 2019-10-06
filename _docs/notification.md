---
title: "Notification"
source_url: 'https://github.com/SenseNet/sn-notification/blob/master/docs/notification.md'
category: Guides
version: v7.0
tags: [notification, sn7]
description: Notification is a feature for users who want to be informed about Content changes in the system. Users can subscribe to notifications on possible changes to Content items. Notifications are email messages sent to the subsriber's address.

---

# Notification
Notification is a feature for users who want to be informed about Content changes in the system. Users can *subscribe* to notifications on possible changes to Content items. Notifications are *email messages* sent to the subsriber's address.

These Content changes can be any kind of change like making a new Content, editing, deleting, renaming, copying or moving an existing Content. The subscriber will receive emails about these Content changes. For these emails *custom templates* can be set that may contain dynamic parameters, filled with content field values. 

Subscribers can edit their own subscriptions, but do not have access to others'. Only *user administrators* can view, edit, delete, activate or deactivate notifications for the users they have access to (see details below).

> Notification is turned on by default. To turn off this feature you have to disable it in the application configuration file. For details, see the [Configuration](#Configuration) section below.

> Users will be able to subscribe only if they have an **email address** in the system. If their email address changes, all their notifications will be sent to their new email address from than on.

## Subscribing to content changes
Notifications can be set up for any Content in the system easily in any list or library or in Content Explorer. You have to click the dropdown action menu on a Content to get the list of available actions and select the ''Set Notification'' action. You also have access to workspace notification settings in the top right corner of your workspace dashboard (Workspace actions menu).

![Set notification](https://github.com/SenseNet/sn-notification/raw/master/docs/images/notification-add.png "Set notification")

## Listing and editing notifications
To see all the Notifications for a user, you have to use the user's *Notification admin* action, accessible in Content Explorer on any user content - if you have admin privileges for that user. You should see something like this:

![Notification list](https://github.com/SenseNet/sn-notification/raw/master/docs/images/notification-list.png "Notification list")

The *Edit* link leads you to the notification edit page where you can see and even change the details (frequency, language) - or switch on notifications temporarily by inactivating the subscription.

![Edit notification](https://github.com/SenseNet/sn-notification/raw/master/docs/images/notification-edit.png "Edit notification")

> A user can not have more than one notification for the same content. Notifications are bound to **content paths** in the repository. That means if the content path is changed (e.g. the content was moved), all the notifications related to that content will become invalid.

### Deleting Notifications
In the list view you can even delete notifications by clicking on the ''Delete'' button. The notification will be deleted at the background, the user won't be notified about this event.

<a name="Configuration"></a>
## Configuration
#### Prerequisites
This feature requires a mail server to be configured in web.config. Please make sure that you added this fragment filled with the address and optionally access credentials to your mail server.

```xml
<system.net>
    <mailSettings>
      <smtp deliveryMethod="Network">
        <network host="mail.example.com" defaultCredentials="true" />
      </smtp>
    </mailSettings>
</system.net>
```

Notification configuration is placed in the "sensenet/notification" section of the web.config. The section definition is:

```xml
<section name="notification" type="System.Configuration.NameValueFileSectionHandler"/>
```

#### Feature activation
There is a master switch for the notification feature. Default is "on" - meaning notification is enabled, events are collected and mails are sent. Deactivate the feature with this line:

```xml
<sensenet>
   <notification>
      <add key="MasterSwitch" value="off"/>
   </notification>
</sensenet>
```

#### Notification processing
The notifications are sent periodically in one email *per subscription* or *per user*. Events' descriptions in the monitored periods are aggregated in one email. There are four configurable time frequencies. Every frequency can be switched off using the "Never" keyword.

##### Emails per user or per subscription
If the user is subscribed to several different content (e.g. a couple of workspaces), emails may be sent per subscription or aggregated into one email per user. This depends on the following configuration setting:

```xml
<add key="GroupNotificationsByUser" value="true"/>
```
By default grouping notifications by user is *enabled*.

#### Instant notifications
Instant emailing is done only in certain intervals to avoid performance degradation. We recommend that the notification's heartbeat should be a couple of minutes (2-10). The default setting is 5.

```xml
<add key="TimerInterval" value="5"/>
```

### Configurations by frequency
#### Immediately
The "Never" keyword can be used to switch off instant mailing. If the instant notification is needed, simply delete or comment out this line in configuration:

```xml
<add key="Immediately" value="Never"/>
```

#### Daily
The setting is the time of starting daily event collecting and sending mails. Valid value is: ''[minutes][:][seconds]''. For example:

```xml
<add key="Daily" value="01:00"/>
```
#### Weekly
The setting consists of two terms: a day of week and a time: ''[DayOfWeek][space][Time]''. Day of week is one of the following: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. Time setting is the same as in the "Daily" case. Example:

```xml
<add key="Weekly" value="Monday 01:00"/>
```
#### Monthly
This period can be configured in three different ways.

1. Specify a day of the month. The valid value is: ''[Every][space][DayNumber][,][space][Time]''. For example:

```xml
<add key="Monthly" value="Every 1, 01:00"/>
```

2. Specify a week and a weekday of the month. The valid value is: ''[Week][space][DayOfWeek][space][Time]''. Week can be 1st, 2nd, 3rd, 4th. DayOfWeek setting is the same as in the "Weekly" case. Time setting is the same as in the "Daily" case. Example:

```xml
<add key="Monthly" value="1st Sunday 01:00"/>
```

3. Specify the last weekday of the month. The valid value is: ''[Last][space][DayOfWeek][space][Time]''. DayOfWeek setting is the same as in the "Weekly" case. Time setting is the same as in the "Daily" case. Example:

```xml
<add key="Monthly" value="Last Sunday 01:00"/>
```

#### Boundaries
- If the setting is "4th Sunday 1:00" and the current month does not have 4 Sundays, the mails will be sent on the 3th Sunday.
- Use "Last" keyword instead of 5th weekday.
- If the current month is shorter than the configured "Every" day number, the mails will be sent on the last day of the month.

### Performance considerations
If you installed the system on a low-resource environment but still want to use notifications, consider the following:

- It is recommended that notification processing happens when the server is in a calm period so configure times sometime during the night if possible.
- Use longer periods for instant mailing e.g. 5-10 (or more) minutes.
- Do not use the monthly period if it is not important. The event collecting for subscriptions during the longest period can use a large amount of memory.
- Use the "MasterSwitch" instead of switching off every frequency. If the master switch is on, the events are still recorded in the database, even if messages are not sent because of other config values.

### Sending notifications
Under the notification section you will find five settings regarding to the notification sender componenet of the system:

- **NotificationSenderAddress**: this email address will be set as the sender address in notification messages.
- **RetryCount**: if an error interrupts the message sending process (e.g. *TransactionFailed*) the system will wait for a while (defined in *RetryDelay* below), then tries to send the message again. RetryCount specifies the maximum number of these iterations.
- **RetryDelay**: time interval between two message sending attempts (in milliseconds).
- **TakeCount**: number of messages that will be retrieved from the message queue in each sending iteration.
- **MessageEncoding**: codepage name that will be used in messages (e.g. iso-8859-2, utf-8).

#### Sample configuration
```xml
<add key="NotificationSenderAddress" value="noreply@sensenet.com"/>
<add key="RetryCount" value="3"/>
<add key="RetryDelay" value="2000"/>
<add key="TakeCount" value="20"/>
<add key="MessageEncoding" value="utf-8"/>
```

## Templating
Notification messages are emails that are constructed based on **templates in string resources**. To modify these messages you should navigate to the */Root/Localization* folder in the repository and edit the *MessageTemplateResources.xml* resource file. Templates are multilingual and can be customized according to your needs.

### Notification message structure

- **Subject** (subject template)
- **Body**
    - HEADER TEMPLATE
    - ...
    - CHANGE TEMPLATE
    - CHANGE TEMPLATE
    - CHANGE TEMPLATE
    - ... 
    - FOOTER TEMPLATE

### Default templates
This section lists the available template variables you can customize for different sections and frequencies.

#### Subject templates
You can customize the email subject for every frequency mode by changing the value of the following resource keys:

- ImmediatelySubject
- DailySubject
- WeeklySubject
- MonthlySubject

#### Header templates
A list of header templates, placed at the beginning of the mail body:

- ImmediatelyHeader
- DailyHeader
- WeeklyHeader
- MonthlyHeader

#### Change templates
A list of content change templates:

- DocumentCreated
- DocumentMajorVersionModified
- DocumentMinorVersionModified
- DocumentCopiedFrom
- DocumentMovedFrom
- DocumentMovedTo
- DocumentRenamedFrom
- DocumentRenamedTo
- DocumentDeleted
- DocumentRestored

#### Footer templates
A list of footer templates:

- ImmediatelyFooter
- DailyFooter
- WeeklyFooter
- MonthlyFooter

### Keywords in templates
You can use the following keywords inside the templates. They will be replaced with proper values.

![Template keywords](https://github.com/SenseNet/sn-notification/raw/master/docs/images/notification-keywords.png "Template keywords")

## Custom Notifications
Besides changing the built-in configurations and templates it is possible to further customize the notification messages and control the notification process using **Notification Configs**. Please read the following article to learn more:

- [Custom Notifications](/docs/custom-notifications)