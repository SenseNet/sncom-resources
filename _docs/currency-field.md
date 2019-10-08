---
title: "Currency Field"
source_url: 'https://github.com/SenseNet/sensenet/blob/master/docs/currency-field.md'
category: Development
version: v7.0.0
tags: [currency, field]
---

# Currency Field

Currency [Field](/docs/field) is used for storing a number value as value in specified currency.

In a Currency Field number data can be stored as value.

## Field handler

- handler: SenseNet.ContentRepository.Fields.CurrencyField
- short name: **Currency**

## Configuration

The following properties can be set in the field's configuration:

- **MinValue**: (optional) defines the allowed minimum value of the input data.
- **MaxValue**: (optional) defines the allowed maximum value of the input data.
- **Format**: defines the currency type of the input data.
- **Digits**: (optional) defines the length of decimal places.

Usage in CTD:

```xml
<Field name="MyRevenue" type="Currency">
  <DisplayName>My Revenue</DisplayName>
  <Configuration>
    <MinValue>0</MinValue>
    <MaxValue>0</MaxValue>
    <Format>en-US</Format>
    <Digits>0</Digits>
  </Configuration>
</Field>
```