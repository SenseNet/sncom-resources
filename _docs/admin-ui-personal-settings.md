---
title: "Personal settings"
source_url: "https://github.com/SenseNet/sensenet.github.io/blob/master/docs/admin-ui-personal-settings.md"
category: Admin UI
version: v7.0
tags: [admin ui, personal settings, settings, dashboard]
description: Some guidance on what can you personalize on the Admin UI
---

# Personal Settings

There are several things that you can customize according to your taste on the Admin UI. You can do most of them in the Personal Settings page. You can open your settings by clicking on the gear ⚙ icon in the bottom left corner on the drawer.

The settings are stored in a JSON format but you can get some help with the available settings by pressing the **CTRL+SPACE** combo.

## Default, Mobile, Desktop, Tablet

Some settings can depend on the device that you use. You can set different settings for these devices - and a default value that will be applied if you don't provide a setting on device level.

### Theme

You can change between **light** 🌞 and **dark** 🌜 theme.

### Content

You can set up a `browseType` - it can be `explorer` (a tree with a content list), `commander` (a two-panel view) or `simple` (just a simple content list, the best for mobile). You can also define a list of `fields` that should be displayed.

### Drawer

You can enable or disable the drawer, change the drawer type and define a list of preconfigured items to display. The drawer types are:

- temporary, useful for mobile devices
- permanent with icons and text
- mini-variant whitch displays only the icon by default but can be expanded

### Command Palette

You can enable or disable the [command palette](/docs/admin-ui-command-palette/) and define a `wrapQuery` expression that will be added to any command palette query.

## Dashboard

You can customize your ``globalDefault`and`repositoryDefault` [dashboards](/docs/admin-ui-dashboard/) here.

## Repositories

Your `repositories` are also stored in the personal settings with an `url` and the last user's `loginName`. You can also define a user-friendly `displayName` (that will be displayed as the repository's title instead of the URL) and you can also override the repository's default _dashboard_

## Last used repository

The last used repository's URL is also stored in your settings in the `lastRepository` field. This field will be updated automatically when you switch between repositories.

## Language

You can select between the `default` (english) and `hungarian` language with the `language` field.

## Events and logging

You can define the size of the event log with the `eventLogSize`. Only the last N entries will be saved. There is another setting for the entries to persist in the log: the `logLevel` field. You can also enable / disable attaching the log when you send a crash report with the `sendLogWithCrashReports` field.

![Changing the theme in the personal settings](/img/admin-ui-personal-setting-theme.gif "Changing the theme in the personal settings")
admin-ui-personal-setting-theme
