---
title: How to add a query based menu item and screen to the drawer
source_url: "https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/admin-ui/how-to-add-query-to-menu.md"
category: Admin UI
tags: [admin ui, customization, drawer, content, search, query]
description: This article helps you to add a query based menu item and screen to the drawer on the Admin UI.
---

# How to add a query based menu item and screen to the drawer

The Drawer can be customized with the [personal settings](/docs/admin-ui/personal-settings) editor. To add a new menu item select the ⚙️ icon on the left side menu and copy and paste the code below.

```json
{
  "default": {
    "drawer": {
      "items": [
        {
          "itemType": "Query",
          "settings": {
            "description": "5 Files that modified recently",
            "icon": "LinkList",
            "title": "Recent files",
            "term": "+Type:File .REVERSESORT:ModificationDate .TOP:5",
            "columns": ["DisplayName", "ModifiedBy", "ModificationDate"]
          }
        }
      ]
    }
  }
}
```

You should see exactly one menu item that looks like this.

![query view](/img/posts/query-view.png "Query view")

There are few options that you can use for customization:
  - description - this is shown in the tooltip of the icon
  - icon - predefined set of icons you can choose from. Use CTRL + SPACE to see possible values
  - title - this is shown in two places. In the tooltip and in the view as well
  - term - is a [content query](/docs/content-query)
  - columns - array of columns to display. These are the name of the fields on the content
