---
title: "Enchancing the copy experience in SN7"
author: ildika
tags: Documentation, Feature, GUI, 
---

As the result of the competitor analysis we prepared the redesign of the new, skinnable Picker for SN7

---

As the result of the competitor analysis we prepared the redesign of the new, skinnable Picker for SN7. We understood a lot of conceptual expectations from users by looking at our competitors’ solutions. These were all taken into consideration when developing custom solutions for individual picker-types in SN7. As the whole development cycle is quite complex, we decided to divide it into sections. In the first phase we implemented the most powerful functions:

-   root-selection
-   search under selected root
-   add and delete container elements
-   parameterized view
-   configurable layout and structure

We started the development of our solution with the picker for copy-action. We uniformly used KendoUI widgets to implement the tree-, grid-, and thumbnail views. We followed the &bdquo;mobile first” approach, so we started with the implementation of the UI for CopyPicker for mobile devices.

## Configuration of the Picker

A config file is placed in the solution, including a javascript configuration module to easily setup the necessary parameters, like:

-   views
-   searchability
-   allowed types to add
-   modal markup template
-   selection type
-   button configurations
-   selection root

## Actions in picker

### Delete

The currently active element in the breadcrumb is highlighted, so the content of this node is displayed in a grid, where downward navigation is possible by tapping on the selected title. Navigation upwards in the tree will be executed by tapping the previous elements in the breadcrumb. Deleting is also possible on the selected item in grid- or thumbnail, by tapping the delete icon. Delete action needs to be confirmed in order to avoid unintentional loss of data.

![Delete from gridview on mobile](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/mobilegriddelete.png)  ![Delete from thumbnailview on mobile](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/mobilethumbdelete.png)

### Create New Container

By tapping the &bdquo;add-icon” in the end of the breadcrumb, an overlay modal opens to add a new container. From a dropdown, expendable items can be selected as allowed content-types from the configuration. In our prototype &bdquo;Folder” or &bdquo;Document Library” ContentTypes are allowed. In the text-input the name will be added to the item, which is &bdquo;New ContentType name” by default.

![Create new folder on mobile](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/mobilecreatenew.png)

## Skinnable layout for mobile devices

We created a custom Picker setup to copy contents, to introduce the main functional elements. We designed our prototype to be able to build Bootstrap or Foundation based solutions. 
In the header of the modal-dialog a breadcrumb-bar helps navigation, and the add-icon provides the possibility to add new containers to the current item as copy-destinations. The search bar on top helps you to look up other containers as a targets under the selected node.

_**Copy-picker with grid-view displayed by Bootstrap and Foundation:**_

_**  ![Gridview with Bootstrap for mobile](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/mobilebootstrapgrid.png)  ![Gridview with Foundation for mobile](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/mobilefoundationgrid.png)**_

Views can be chosen in the configuration. In our prototype grid or thumbnail views can be selected. Configuration also provides an opportunity to choose a tree-only view.

## Layout for desktop and tablet

Depending on the screen-size and resolution, we used the Bootstrap and Foundation css classes to setup the view for the layout of the picker. Depending on the resolution and configuration, the picker will display each or both tree and grid/thumbnail splitter, unless of course we setup "TreeOnly" in the configuration.

_**Picker with thumbnail-view for tablet built with Bootstrap**_

![Copypicker built from Bootstrap for desktop](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/tabletbootstrapthumb.png)

_**Picker with grid-view for desktop built with Foundation**_

![Copypicker view built with Foundation](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/tabletfoundationgrid.png)

_**Tree-only view on iPad with Bootstrap**_

![Tree-only view for copy picker](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/tabletbootstraptree.png)

