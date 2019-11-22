---
title: "Drawer customization in general"
source_url: "https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/admin-ui/drawer-customization-in-general.md"
category: Admin UI
tags: [admin ui, customization, drawer, content, search]
description: This article gives a brief overview about the customization of the Drawer (the left side menu) on the Admin UI.
---

# Drawer (aka. left side menu)

The Drawer component is the left side navigation menu. It lets you access the [personal settings](/docs/admin-ui/personal-settings), [setup](/docs/admin-ui/setup), [version-info](/docs/admin-ui/version-info) and more other menupoints.

## Customization

You can customize the drawer with the [personal settings](/docs/admin-ui/personal-settings). There are 3 main options that you can pass to the drawer settings.

1. enabled - boolean value (it can be `true` or `false`)
2. type - string value (`"mini-variant"`, `"permanent"`, `"temporary"`)
3. items - array of DrawerItem (this is a complex type, look for examples below)

### Enabled

This it the simplest setting that can enable or disable the drawer itself. Don't worry if you disabled the drawer and can't find personal settings. You can access it from the [Command palette](/docs/admin-ui/command-palette) with typing in *personal settings* and pressing enter.

Example setting:

```json
{
  "default": {
    "drawer": {
      "enabled": false
    }
  }
}
```

### Type

There are 3 possible values for choosing the type of the drawer:

**mini-variant** - This can be opened and closed as it is shown above. _This is currently the default setting for desktop mode_

![drawer mini-variant](/img/drawer-mini-variant.png "Drawer mini-variant"){:height="600px"}

**permanent** - In this mode the drawer is always open.

![drawer permanent](/img/drawer-permanent.png "Drawer permanent"){:height="600px"}

**temporary** - In this mode there is no sidebar only a hamburger menu in the top left corner. _This is currently the default setting for mobile mode_

![drawer temporary](/img/drawer-temporary.gif "Drawer temporary")

### Items
