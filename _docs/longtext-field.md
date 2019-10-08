---
title: "LongText Field"
source_url: 'https://github.com/SenseNet/sensenet/blob/master/docs/longtext-field.md'
category: Development
version: v7.0.0
tags: [longtext, field]
---

# LongText Field

The LongText [Field](/field) used for storing text without length restrictions.

## Field handler

- SenseNet.ContentRepository.Fields.LongTextField
- short name: **LongText**

Usage in CTD:

```xml
<Field name="LongDescription" type="LongText">
...
</Field>
```

## Supported Field Controls

- LongText Field Control(/longtext-field-control): a simple textarea control where user can edit value (if non-readonly).

## Configuration

The following properties can be set in the Field's Field Setting configuration:

- **MinLength**: an integer type property defining the minimal expected length of the inserted text: 0 to infinite.
- **MaxLength**: an integer type property defining the maximum length of the inserted text: 0 to infinite.
- **TextType**: defines the rendering mode of the input box. Available settings:
    - **LongText**: box is rendered as a simple textarea.
    - **RichText**: box is rendered as a textarea and contains editor buttons at the bottom of the box.
    - **AdvancedRichText**: box is rendered as a resizable textarea and contains breadcrumb indicator at the bottom of the box.

>Be aware when **RichText** or **AdvancedRichText** is set as *TextType*, HTML tags are appended to the inserted text - that are not visible for the user. These extra characters are calculated in the length of the inserted text, thus *MinLength* and *MaxLength* settings in these cases should be used with precautions.

>For a complete list of common **Field Setting** configuration properties see [CTD Field definition](/Content_Type_Definition#Field_definition).

## Example/Tutorials

Fully featured example:

```xml
<Field name="LongText1" type="LongText">
      <DisplayName>LongText data</DisplayName>
      <Description>Field for storing more than 450 characters.</Description>
      <Configuration>
        <ReadOnly>false</ReadOnly>
        <Compulsory>true</Compulsory>
        <DefaultValue>hello world</DefaultValue>
        <MaxLength>300</MaxLength>
        <MinLength>3</MinLength>
        <TextType>LongText</TextType>
      </Configuration>
</Field>
```

The above example configures the LongText Field so that:

- default value is set to hello world
- at most 300 characters are allowed to be inserted
- at least 3 characters are expected to be inserted
- Field value is editable (not read-only)
- Field control is rendered as simple textarea

## Related links

- [Field](/field)
- [longText Field Control](/longtext-field-control)
