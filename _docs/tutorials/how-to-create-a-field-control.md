---
title:  "How to create a Field Control"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-create-a-field-control.md'
category: Tutorials
version: v6.0
tags: [field, field control, content type, sn6, backend]
description: This article describes the way for developers to create a custom Field Control.
---

# How to create a Field Control

There are numerous built-in field controls in the system you can use to build interactive user interfaces over content in content views. Field controls are highly customizable with field control templates, but sometimes custom ui logic cannot be implemented by simply customizing templates and fine-adjusting stylesheets. This article shows step-by-step how to implement a custom field control. Our field control will be used over a [LongText Field](/docs/longtext-field) to store the cast of a movie, and will provide a custom UI to manage the list of actors and roles.

## Steps

### 1.Create a new class

- [How to create a new class for source code](/tutorials/how-to-create-a-new-class-from-source)

### 2.Implement field control code

Our field control will handle the cast for a movie, and store all data in an underlying LongText field, as string containing ';' and '-' separated strings of actor names and roles. So the stored format will look something like the following:

```txt
actor1-role1;actor2-role2
```

Therefore the *SetData* method will parse the given object as a string and split it among the ';' and '-' characters; and the GetData method will return the cast in the exact same format as a string. The UI will define 2 server controls: the *InnerData* will be a textbox containing the up-to-date cast in the stored format, and will be updated by a small javascript. The *LiteralControl* will be the place of the generated markup, that will display actor names and roles with a customizable and human-readable layout. The markup will be built up on server side and updated on client side according to the following template:

```txt
<div>actor : role</div>
```

The main logic in our field control therefore is in the *SetData* method, that parses the stored data coming from the underlying field, sets the InnerData control's value to the stored string, and create the markup for the *LiteralControl*:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SenseNet.Portal.UI;
using SenseNet.Portal.UI.Controls;
using System.Web.UI.WebControls;
using SenseNet.ContentRepository.Storage;
 
namespace FieldControlSample
{
    public class Cast : FieldControl
    {
        // =================================== Init
        protected override void OnInit(EventArgs e)
        {
            UITools.AddScript("$skin/scripts/Cast.js");
            base.OnInit(e);
        }
 
        // =================================== Controls
        private const string INNERDATAID = "InnerData";
        private TextBox GetInnerControl()
        {
            return this.FindControlRecursive(INNERDATAID) as TextBox;
        }
        private const string LITERALCONTROLID = "LiteralControl";
        private Literal GetLiteralControl()
        {
            return this.FindControlRecursive(LITERALCONTROLID) as Literal;
        }
 
        // =================================== GetData / SetData
        public override object GetData()
        {
            return GetInnerControl().Text;
        }
        public override void SetData(object data)
        {
            var actorListMarkup = string.Empty;
            var strData = data as string;
            if (strData != null)
            {
                // split string and get ids
                var items = strData.Split(new char[] {';'}, StringSplitOptions.RemoveEmptyEntries);
                var ids = new List<int>();
                var characters = new List<string>();
                foreach (var item in items) {
                    var itemstr = item.Split('-');
                    ids.Add(Convert.ToInt32(itemstr[0]));
                    characters.Add(itemstr[1]);
                }
 
                // load nodes from ids and create markup. note: we load all nodes in one step for performant data retrieval
                var nodes = Node.LoadNodes(ids);
                var index = 0;
                foreach (var node in nodes)
                {
                    actorListMarkup = string.Concat(actorListMarkup, string.Format("<div>{0} : {1}</div>", node.DisplayName, characters[index++]));
                }
 
                // add data to hidden textbox. note: it is not present in browse mode
                var innerControl = GetInnerControl();
                if (innerControl != null) 
                    innerControl.Text = strData;
            }
 
            GetLiteralControl().Text = string.Format("<div id='sn-cast-list'>{0}</div>", actorListMarkup);
        }
    }
}
```

Note that we have overridden the OnInit method to include a custom javascript in the rendered page. The referenced *Cast.js* will be created in the next steps.

### 3.Create global templates

Let's create the template markups the field control will use. We start with the Browse template. Place the following code under */Root/Global/fieldcontroltemplates/Cast* as Browse.ascx:

```csharp
<%@  Language="C#" %>
<asp:Literal ID="LiteralControl" runat="server" />
```

The browse template is very simple, it will only contain the server control for the displayed cast markup, and nothing else. The edit template however will define a bit more UI logic. Besides the 2 server controls discussed above it provides some client controls to manipulate the cast:

- a label that will show the name of the selected actor,
- a hidden textbox that will contain the id of the selected actor,
- a button for opening a content picker to select an actor,
- a textbox to enter the role/character,
- a button to add the actor+role/character to the cast.

The client side logic will be defined in the javascript we will create in the next step. Place the following code under */Root/Global/fieldcontroltemplates/Cast* as Edit.ascx:

```html
<%@  Language="C#" %>
<asp:TextBox ID="InnerData" runat="server" style="display:none;" class="sn-cast-innerdata" />
<asp:Literal ID="LiteralControl" runat="server" />
<hr />
Add new actor: <br />
Actor: <label id="sn-cast-actorname" ></label>
<input type="text" id="sn-cast-actorid" style="display:none;" />
<input type="button" onclick="SN.PickerApplication.open({MultiSelectMode: 'none', TreeRoots: ['/Root/IMS', '/Root'],
  callBack: function(resultData) { 
      if (!resultData) 
         return;
      $('#sn-cast-actorid').val(resultData[0].Id);
      $('#sn-cast-actorname').text(resultData[0].DisplayName);
   } 
  }); return false;" value="select ..." />
<br />
Character: <input type="text" id="sn-cast-character" />
<br />
<input type="submit" value="Add" onclick="Cast.Add();return false;" />
```

### 4.Implement javascript logic

The last step is to bring the client side controls alive. The following javascript does the following:

- references jquery and the content picker javascripts, because it will rely upon those functionalities,
- defines the *Add* function that will be called when the user clicks the Add button. It gathers data from the textboxes and adds the markup to the LiteralControl's markup and the actor's id and role name to the control holding the field data.

Place the following code as */Root/Global/scripts/Cast.js*, we referenced it this way from our field control code-behind:

```js
/// <depends path="$skin/scripts/jquery/jquery.js" />
/// <depends path="$skin/scripts/sn/SN.Picker.js" />
 
Cast = {
  Add: function() {
    var actorname = $('#sn-cast-actorname').text();
    var actorid = $('#sn-cast-actorid').val();
    var character = $('#sn-cast-character').val();
    Cast.AddItemToList(actorname, character);
    Cast.AddItemToHiddenTextbox(actorid, character);
  },
  AddItemToList: function(actorname, character) {
    // add new div to list of actors
    var markup = '<div>' + actorname + ' : ' + character + '</div>';
    $('#sn-cast-list').append(markup);
  },
  AddItemToHiddenTextbox: function(actorid, character) {
    // add data to hidden textbox
    var tb = $('.sn-cast-innerdata');
    tb.val(tb.val() + actorid + '-' + character + ';');
  }
}
```

### 5.Register tagprefix in web.config

Register a tagprefix in the web.config, so we can easily use field controls from our new namespace. This will come handy if we want to reference our control in a CTD. Make sure you use the assembly name of your project:

```xml
<add tagPrefix="mycontrol" namespace="FieldControlSample" assembly="FieldControlSample" />
```

### 6.Test the field control

We have created a class to hold the field control code-behind, uploaded the global templates and defined the javascript handling the client side logic. We are basically ready. This is how we can try it. Let's define a new *Movie* content type:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ContentType name="Movie" parentType="GenericContent" handler="SenseNet.ContentRepository.GenericContent" xmlns="http://schemas.sensenet.com/SenseNet/ContentRepository/ContentTypeDefinition">
  <DisplayName>Movie</DisplayName>
  <Description></Description>
  <Icon>Content</Icon>
  <Fields>
    <Field name="Cast" type="LongText">
      <DisplayName>Cast</DisplayName>
      <Description>Actors and characters</Description>
      <Configuration>
        <ControlHint>mycontrol:Cast</ControlHint>
      </Configuration>
    </Field>
  </Fields>
</ContentType>
```

In [Content Explorer](/docs/content-explorer) go to /Root/Sites/Default_Site, and configure it so that we can add Movie types under it ([Allowed Child Types#Content settings](/docs/allowed-childtypes)). Create a new Movie content, our field control should appear at the Cast field:

<div style="text-align: center;">
<img src="/docs/img/Howtocreateafieldcontrol.png" width="600" border="0" />
</div>

It does not look very neet, but it is functioning and creating a new design for it should not be a big deal.