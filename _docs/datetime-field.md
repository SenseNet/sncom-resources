---

title: DateTime Field
source_url: https://github.com/SenseNet/sensenet.github.io/tree/master/_docs/datetime-field.md
category: Development
version: v7.0.0
tags: [datetime, field, field control]

---

# DateTime Field

DateTime is a [Field](/docs/field) that stores a date and a time value.

## Field Handler

- handler: SenseNet.ContentRepository.Fields.DateTimeField
- short name: **DateTime**

Usage in CTD:

```xml
<Field name="CreationDate" type="DateTime">
...
</Field>
```

## Supported Field Controls

[DatePicker Field Control](./datepicker-fieldcontrol): a simple grid displaying a clickable calendar in month view

## Configuration

The following properties can be set in the field's configuration:

- **DateTimeMode**: (optional) an enumeration which defines the presentation mode of the stored value: *None*, *Date* and *DateAndTime*. This only controls the behavior of the [DatePicker Field Control](./datepicker-fieldcontrol). Default is *None*.
- **Precision**: (optional) an enumeration which defines the precision of the indexed value: *Millisecond*, *Second*, *Minute*, *Hour*, *Day* (Default is *Minute*). This does not affect the stored value, only the value stored in the index, making it possible to use different precision levels depending on the nature of the application. Chosing a finer or coarser precision than the optimal may cause slower query running and larger index files than what would be reasonable. Default is *Minute*.

> For a complete list of common Field Setting configuration properties see [CTD Field definition](./content-type-definition#Field_definition).

## Example/Tutorials

Fully featured example:

```xml
<Field name="MyDateTimeField" type="DateTime">
  <DisplayName>My DateTime field</DisplayName>
  <Description>DateTime content</Description>
  <Configuration>
    <DateTimeMode>DateAndTime</DateTimeMode>
    <Precision>Second</Precision>
  </Configuration>
</Field>
```

The above example configures the DateTime field so that:

- it stores the date and time values
- it stores the date/time in the index in seconds