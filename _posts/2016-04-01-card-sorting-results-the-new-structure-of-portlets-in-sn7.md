---
title: "Card Sorting results – the new structure of portlets in SN7"
author: ildika
tags: [ux, card sorting, test results, portlet structure]
---

First of all, thank you guys for taking your time and completing our test! The result was quite instructive for us

---

First of all, thank you guys for taking your time and completing our test! The result was quite instructive for us. It provided us a solid starting point for us to design the new architecture of the portlet system in SN7.

By analyzing the results of the Card sorting test, we learned a lot about how end users and developers are related to the portlets in Sense/Net, since both groups were represented as participants in the test.

Briefly, the main benefits that we drew from this research were the following:


-   We learned that end-users and developers use portlets very differently, on very different levels, and for different purposes
-   Therefore we decided to build a two-level system to serve both user categories
-   The Portlet level will support developers with a wide range of fully customizable webparts, tailored for their needs
-   The Widget level will support end-users with preconfigured widgets, which are actually easy-to-use predefined dynamic content-boxes
-   We'll get rid of the unused portlets
-   We'll reorganize the structure of portlet categories based on the results of Card Sorting test
-   We'll design a tag system, to provide easier search options between portlets and widgets

## Portlets for Developers

A Portlet, until it gets displayed on a Portlet Page needs to be set up and configured in a couple of ways. Portlets also need to be armed with the efficient Appearance, ListView, ViewFrame, Context, Query, Cache and a couple of other UI elements and parameters that provide full customization, but are not obvious to setup or to install for end-users.

For example, the List Portlet is able to display any kind of content stored in a Content List. This Portlet -just like before- is fully customizable with the required UI elements to be added: a ViewFrame that displays a toolbar, and a ListView to display the content itself according to the required layout.

In Sense/Net 6 all these functions were achievable through four tabs on the editor-surface of the Portlet. So, to display a Calendar with the ListPortlet, you needed to set up the basic layout of the Portlet, and beside the ViewFrame, you also needed to pick the ListView as "Default view" from a Content Picker, which offered all Views in the Solution.

![Portlets in Sense/Net](http://wiki.sensenet.com/images/4/48/ContentListPortlet-props.png)

By redesigning Portlets, besides the existing use of Portlets for developers, we wanted to facilitate the use of built-in Widgets. These are inherited from Portlets with predefined UI components, for specialized use cases, with an easy-to-use interface for non-developers. The Calendar Widget in the future SN7 will have the CalendarView defined by default, no further setup will be required for the UI.

## Widgets inherited from List Portlet

To deliver ready-made solutions to end-users, SN7 will sport pre-configured Widgets inherited from the List Portlet for the most common use cases. These Widgets are each specialized for actual purposes, mounted with a specific ContentView. These will be more or less the following:

-   Calendar Widget
-   Document Library Widget
-   Tasks Widget
-   Gallery Widget
-   Workspace list Widget

Adding a Widget like this to a Portlet Page will not require any coding- or Portal Builder-knowledge, only the name of the Widget and the data source needs to be given and there it is, a ready-made webpart inlayed to the selected Zone of the Page.

![Widget wireframe](http://download.sensenet.com/BlogPostImages/CardSorting/widget-wireframe.jpg)

