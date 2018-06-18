---
title:  "Content Type"
tags: [content, content type, ctd]
description: Content Type
permalink: /guides/content-type-system/content-type
index: 0
---

## Content Type

The /docs/content-repository contains many different types of content. Content vary in structure and even in function. Different types of content contain different fields, are displayed with different views, and may also implement different business logic. The **fields**, **views** and **business logic** of a content is defined by its type - the **Content Type**.

Content Types are defined in a type hierarchy: a Content Type may be inherited from another Content Type - thus automatically inheriting its fields. Multiple inheritance is not allowed so Content Types are arranged in a simple tree.

A Content Type is a special content in the Content Repository. Content Types define the structure and functioning of content:

- name, description of content types and available set of fields are defined with an xml configuration (Content Type Definition or CTD),
- optional custom business logic is implemented via a custom Content Handler/docs/content-handler, custom Fields/docs/field and custom Field Controls/docs/field-control.
For example a User has a name, e-mail address, etc. - these fields of the User Content Type are defined by its Content Type Definition. When saving a User it can be synchronized into an Active Directory - this logic is implemented in its Content Handler.

## Content Type hierarchy

Content Types can inherit fields from their ancestors. For example a *Domain* type inherits all the fields of the basic *Folder* type. A Content Type may only inherit fields from a single type thus the Content Types are arranged in a simple tree hierarchy. Inherited field configuration can be overridden in derived types. Field inheritance and overriding is defined in the Content Type Definition/docs/ctd of the type.