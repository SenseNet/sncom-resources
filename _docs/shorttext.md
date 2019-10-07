---
title: shorttext
source_url: https://github.com/SenseNet/sensenet/blob/master/docs/shorttext.md
category: Development
version: v7.0.0
tags:shorttext
---
# ShortText Field
 
## Overview

ShortText [Field](http://wiki.sensenet.com/Field) is used for storing short strings. Maximum length of the stored data is 450 characters (this value however can be limited to a lower value in the Field Setting of the Field). If you want to store text strings longer than this consider using the LongText Field.

## Details

The following apply to the behavior of the Field:

- **Regular expression**: data input can be validated against a regular expression defined in the [Field Settings](http://wiki.sensenet.com/Field_Setting).

## Field handler
- handler: SenseNet.ContentRepository.Fields.ShortTextField
- short name: **ShortText**

Usage in CTD:
```
   <Field name="ShortDesc" type="ShortText">
   ...
   </Field>
```

## Supported Field Controls
- [ShortText Field Control](http://wiki.sensenet.com/ShortText_Field_Control): a simple textbox control where user can edit value (if non-readonly).

## Configuration
The following properties can be set in the Field's [Field Setting](http://wiki.sensenet.com/Field_Setting) configuration:

- **ReadOnly**: a boolean property defining whether the Field data can be edited. If it is set to true, the Field is rendered as label instead of textbox.
- **Compulsory**: a boolean property defining whether the Field has to contain any data. If it is set to true, but Field doesn't contain any data the portal displays an error message on saving this content.
- **DefaultValue**: specifies the value filled in, when a new content is added.
- **MaxLength**: an integer type property defining the maximum length of the inserted text: 0 to infinite.
- **MinLength**: an integer type property defining the minimal expected length of the inserted text: 0 to infinite.
- **Regex**: contains common regular expression against which the Field is validated. E.g. [a-zA-Z0-9]*$

## Example/Tutorials
Fully featured example:
```
<Field name="ShortText1" type="ShortText">
      <DisplayName>ShortText data</DisplayName>
      <Description>Field for storing at most 450 characters.</Description>
      <Configuration>
        <ReadOnly>false</ReadOnly>
        <Compulsory>true</Compulsory>
        <DefaultValue>hello world</DefaultValue>
        <MaxLength>15</MaxLength>
        <MinLength>3</MinLength>
        <Regex>[a-zA-Z0-9]*$</Regex>
      </Configuration>
</Field>
```
The above example configures the ShortText Field so that:

- default value is set to hello world
- at most 15 characters are allowed to be inserted
- at least 3 characters are expected to be inserted
- Field value is editable (not read-only)
- Field can contain only letters and numbers
## Related links
- [Field](http://wiki.sensenet.com/Field)
- [ShortText Field Control](http://wiki.sensenet.com/ShortText_Field_Control)
## References
