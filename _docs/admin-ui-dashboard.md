---
title: "Dashboard customization"
source_url: "https://github.com/SenseNet/sensenet.github.io/blob/master/docs/admin-ui-personal-settings.md"
category: Admin UI
version: v7.0
tags: [admin ui, dashboard, personal settings]
description: A quick overview about the available dashboard settings
---

# Dashboard customizations

You can create or edit custom dashboards in your [personal settings](/docs/admin-ui-personal-settings/)'s `dashboards` section. The two available dashboards here are `globalDefault` (that will be displayed if you haven't entered into a repository) and `repositoryDefault` (this one can be overwritten on a repository level). These fields can contain a list of widget settings. Each widget should have a `title`, a `widgetType` and some `settings` that depends on the type. They can also have a `minWidth` setting for the minimum width.

You can use some string expressions that will be replaced with the corresponding values in the content or the title. These phrases are: `{currentUserName}`, `{currentRepositoryName}`, and `{currentRepositoryUrl}`

## Markdown widget

This widtet type has only a `content` field in it's settings that is a _markdown content_, the widget will simply display it. You can also use HTML syntax in markdown.

## Updates widget

This widget will check the _current repository's_ version info and compares it with the latest component versions published to [nuget.org](https://nuget.org). It will notify you when updates are available.

## Query widget

You can define a custom query with results using the Query widget. The `query` field should contain a content query, you can define the `columns` and define some controls to be shown or hidden. The fields are: `showColumnNames` (this also enables ordering), `showOpenInSearch` and `showRefresh`.

The query widget has an additional mode that you can enable with the `countOnly` field - if you enable this, only the hit count will be displayed.

![The default dashboard](/img/admin-ui-default-dashboard.png "The default dashboard")
