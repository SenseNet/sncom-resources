---
title: "Dashboard customization"
source_url: "https://github.com/SenseNet/sensenet.github.io/blob/master/docs/admin-ui/dashboard.md"
category: Admin UI
version: v7.0
tags: [admin ui, dashboard, personal settings]
description: A quick overview about the available dashboard settings
---

# Dashboard customizations

You can create or edit custom dashboards in your [personal settings](/docs/admin-ui/personal-settings/)'s `dashboards` field. The two available options are `globalDefault` (that will be displayed if you haven't entered into a repository) and `repositoryDefault` (this one can be overwritten on a repository level). These fields can contain a list of widget settings. Each widget should have a `title`, a `widgetType` and some `settings` that depends on the type. They can also have a `minWidth` property for the minimum width.

You can use some string expressions that will be replaced with the corresponding values in the content or the title. These phrases are: `{currentUserName}`, `{currentRepositoryName}`, and `{currentRepositoryUrl}`

## Markdown widget

This widget type has only a `content` field in its settings that is a _markdown content_, the widget will simply display it. You can also use HTML syntax in markdown.

## Query widget

You can define a custom query with results using the Query widget. The `query` field should contain a content query, you can define the `columns` and define some controls to be shown or hidden. The fields are: `showColumnNames` (this also enables ordering), `showOpenInSearch` and `showRefresh`.

The query widget has an additional mode that you can enable with the `countOnly` field - if you enable this, only the hit count will be displayed.

## Updates widget

This one will check the _current repository's_ version info and compares it with the latest component versions published to [nuget.org](https://nuget.org). It will notify you when updates are available.

## The default dashboard

You can check the default repository dashboard as an example. It contains some generic information about the package versions, some stats about the users, documents and recent updates using the Query widget. It contains also links to useful docs and a contact info - they are created with the Markdown widget.

![The default dashboard](/img/admin-ui-default-dashboard.png "The default dashboard")
