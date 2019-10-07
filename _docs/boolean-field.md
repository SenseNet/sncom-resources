---

title: Boolean Field
source_url: https://github.com/SenseNet/sensenet.github.io/tree/master/_docs/boolean_field.md
category: Development
version: v7.0.0
tags: [boolean, field, field control]

---

# Boolean Field

The Boolean Field is used for storing a boolean value (true or false).

## Field Handler

- handler: SenseNet.ContentRepository.Fields.BooleanField
- short name: **Boolean**
Usage in CTD:

```xml
   <Field name="IsSystemContent" type="Boolean">
   ...
   </Field

```

## Supported Field Controls

[Boolean Field Control](./Boolean-Field-Control): a simple Checkbox control where the user can select the value to be true or false.

## Configuration

There are no specific properties defined for this Field Control besides the common properties.

>For a complete list of common Field Setting configuration properties see [CTD Field definition](./Content-Type-Definition#Field_definition).

## Example/Tutorials

Fully featured example:

```xml
    <Field name="RequiresRegistration" type="Boolean">
      <DisplayName>Requires registration</DisplayName>
      <Configuration>
        <VisibleBrowse>Hide</VisibleBrowse>
        <VisibleEdit>Advanced</VisibleEdit>
        <VisibleNew>Advanced</VisibleNew>
      </Configuration>
    </Field>
```

The above example configures the Reference Field so that:

- display name will be _Requires registration_
- the field will be _hidden_ in browse mode and it will be under the _advanced fields_ in edit and new mode when the Content is displayed with [Generic Content View](./Generic-Content-View).

## Related links

- [Field](./Field)
- [Boolean Field Control](./Boolean-Field-Control)

## References

[Category:](./Category) [Fields](./Field)
