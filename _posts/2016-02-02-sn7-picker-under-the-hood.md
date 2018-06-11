---
title: "SN7 picker under the hood"
author: herflis
image: "/img/posts/engine.jpg"
tags: [document management, content picker]
---

Based on our former experience with the pickers in Sense/Net and on our UX researches, it was clear that the picker should be revamped in terms of both usability and customizability, to give developers a configurable and maintainable tool.

---

We decided to rewrite the whole plugin, change the different built-in third party stuff to KendoUI widgets, as this way we’re able to offer a more customizable but also more unified and clear solution to both developers and end-users in all use cases, such as Content, User or Portlet picking.

## KendoUI based parts

In the current version of Sense/Net, the picker is based on several different third-party JavaScript plugins. The tree is built with jquery-tree, the grid uses jQuery-grid and the picker window is a jquery-ui modal. Obviously three third party libraries can cause three time as much work when upgrading, debugging, testing. So it seemed that we can improve our pickers’ maintainability with choosing a library that can support all the functionality we needed. As we’ve been using KendoUI for years to build UI, it seemed obvious to use its tree and grid widget in Sense/Net picker and add KendoUI’s ListView to provide thumbnail view. The modal window is a special case, because we think we should give the portalbuilders and developers the freedom to build the UI that they want. This way, we can provide them the possibility of using any third party modal plugin.

## Configuration

As I mentioned before, the main purpose of rewriting the picker was to provide developers a plugin with comprehensive configurability so that they can use the same picker plugin for picking Content, Users, Portlets or anything else.

-   **views**: in this parameter you can list the name of the views that you want provide to list content in the picker. Now, you’re able to choose list or thumbnail view or both, which means if you use both views you can switch between them on the UI. Later, the picker will allow developers to add their custom views also.
-   **searcheable**: with this parameter you can switch search functionality on and off.
-   **expendable**: if you want to make enable users to add new Content through the picker, set this parameter to true. In addition, with this parameter on, you can specify which type of content can be added on the picker UI.
-   **allowMultipleSelection**: if you used Sense/Net picker before you’ll be familiar with this parameter which allows you to put users to select multiple content or not.
-   **treeOnly**: by setting this parameter to true only the tree will be displayed in the picker
-   **$modal**: as mentioned before, developers can use their chosen framework or library to provide a modal window for the picker. In this parameter you have to add the modal windows jQuery object which will contain the picker.
-   **callbacks**: in the callbacks section of the configuration you can define your own functionality related to the picker callback e.g. opening, closing or errors.
-   **templates**: in this section you can define your own HTML templates for the parts of the picker e.g. header, footer, gridrow etc.
-   **buttons**: in this section you can list the buttons that you want to display and use on the picker with their text, css classes and the functions you want to call when the button is clicked
-   **selectionroot**: this parameter is also a legacy one which was also provided in the previous picker. You can list here the selection root paths that will displayed and can be choosen on the picker UI to change the picker trees root.

## Sample

	var modal = new Foundation.Reveal($('[data-reveal]'));
	
	var snPicker = $('.reveal').Picker({
		views: ['list','thumbnail'],
		searchable: true,
		expendable: {
			types: ['Folder', 'DocumentLibrary']
		},
		allowMultipleSelection: false,
		treeOnly: false,
		$modal: $('.sn-modal'),
		callbacks: {
			open: function(){
				modal.open();
			},
			close: function(){
				modal.close();
				setTimeout(function(){
					snPicker.destroy();
				}, 1000)
			},
			error: function(message){
				console.log(message);
			}
		},
		templates: {
			header: '&lt;div class="picker-header"&gt;&lt;h3&gt;Copy content&lt;/h3&gt;&lt;/div&gt;',
			breadcrumb: '&lt;ul class="breadcrumbs"&gt;&lt;/div&gt;',
			body: '&lt;div class="picker-body"&gt;&lt;/div&gt;',
			footer: '&lt;div class="picker-footer"&gt;&lt;/div&gt;',
			thumbnail: '&lt;div class="column"&gt;&lt;span class="sn-icon sn-icon-#=Icon #"&gt;&lt;/span&gt;&lt;span class="title sn-isfolder-#=IsFolder#" data-url="#=Path#" title="#=Path#"&gt;#= DisplayName #&lt;/span&gt;&lt;/div&gt;',
			gridrow: '&lt;span class="sn-icon sn-icon-#=Icon#"&gt;&lt;/span&gt;&lt;span class="title sn-isfolder-#=IsFolder#" data-url="#=Path#" title="#=Path#"&gt;#=DisplayName#&lt;/span&gt;'
		},
		buttons: [
			{
			text: 'Ok',
			class: 'button'
			callback: function(path){
				console.log(path);
				}
			},
			{
			text: 'Cancel',
			class: 'button secondary',
			callback: function(){
				modal.close();
				setTimeout(function(){
					snPicker.destroy();
				}, 1000)
			}
		}],
		selectionRoot: ['/Root/Sites/Default_Site', '/Root'],
	}).data('Picker');

## Sample2
```
	var modal = new Foundation.Reveal($('[data-reveal]'));
	
	var snPicker = $('.reveal').Picker({
		views: ['list','thumbnail'],
		searchable: true,
		expendable: {
			types: ['Folder', 'DocumentLibrary']
		},
		allowMultipleSelection: false,
		treeOnly: false,
		$modal: $('.sn-modal'),
		callbacks: {
			open: function(){
				modal.open();
			},
			close: function(){
				modal.close();
				setTimeout(function(){
					snPicker.destroy();
				}, 1000)
			},
			error: function(message){
				console.log(message);
			}
		},
		templates: {
			header: '&lt;div class="picker-header"&gt;&lt;h3&gt;Copy content&lt;/h3&gt;&lt;/div&gt;',
			breadcrumb: '&lt;ul class="breadcrumbs"&gt;&lt;/div&gt;',
			body: '&lt;div class="picker-body"&gt;&lt;/div&gt;',
			footer: '&lt;div class="picker-footer"&gt;&lt;/div&gt;',
			thumbnail: '&lt;div class="column"&gt;&lt;span class="sn-icon sn-icon-#=Icon #"&gt;&lt;/span&gt;&lt;span class="title sn-isfolder-#=IsFolder#" data-url="#=Path#" title="#=Path#"&gt;#= DisplayName #&lt;/span&gt;&lt;/div&gt;',
			gridrow: '&lt;span class="sn-icon sn-icon-#=Icon#"&gt;&lt;/span&gt;&lt;span class="title sn-isfolder-#=IsFolder#" data-url="#=Path#" title="#=Path#"&gt;#=DisplayName#&lt;/span&gt;'
		},
		buttons: [
			{
			text: 'Ok',
			class: 'button'
			callback: function(path){
				console.log(path);
				}
			},
			{
			text: 'Cancel',
			class: 'button secondary',
			callback: function(){
				modal.close();
				setTimeout(function(){
					snPicker.destroy();
				}, 1000)
			}
		}],
		selectionRoot: ['/Root/Sites/Default_Site', '/Root'],
	}).data('Picker')
```

## Skins vs. picker – How to use it with bootstrap or foundation and their modal windows

As you could have read in [previous blog posts](https://blog.sensenet.com/admin/post/2015/11/27/skin-system-revamp-in-sn7.aspx "previous blog posts"), we’re working hard to make everything skinnable in SN7. With the new picker you’ll be able to define your own modal window which allows you to use Bootstrap’s or Foundation’s modal widget. You can set your modal object as the $modal parameter of the picker plugin and use its open and close actions on picker callbacks. With the templates and buttons section you can add the framework related classes and markup to the parts of the picker to make it styleable with bootstrap or foundation or other ui libraries.

![Foundation grid on tablet](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/tabletfoundationgrid.png "Foundation grid on tablet")



## Templating

As long as we build in KendoUI plugins into the picker, we’re able to use its templating in them. This allows you to customize the markup of a grid row or a thumbnail item through plugins ’templates’ config section. For now, there’re some limitations related to these templates because the grid and the thumbnail view uses and displays a limited number of Fields. Later, we will allow you to list the fields that you want to display and then you will able to add fully custom templates with KendoUI’s templating syntax. Now you’re only able to add some additional classes and change the markup in a way you keep the Kendo variables.

![Bootstrap grid on tablet](http://download.sensenet.com/BlogPostImages/SN7CopyPicker/tabletbootstrapthumb.png "Bootstrap grid on tablet")



## Calling plugin functions from outside

The plugin provides some functions that can be called outside the it.

-   **init**: initializes the plugin
-   **open**: opens the modal window
-   **close**: closes the modal window
-   **destroy**: destroys picker plugin
-   **modal**: returns the modal window object
-   **header**: returns the header object
-   **breadcrumb**: returns the breadcrumb object
-   **body**: returns the body object
-   **splitter**: returns the splitter object
-   **tree**: returns the tree object
-   **grid**: returns the grid object
-   **thumbnails**: returns the thumbnail list object
-   **footer**: returns the footer object
-   **selected**: returns the selected items path

