---
title: "Version Info"
source_url: "https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/admin-ui/version-info.md"
category: Admin UI
version: v7.0
tags: [admin ui, version, settings]
description: An overview the version information available for the running instance
---

# Verison Info

Version Info provides information on the currently running instance of sensenet.

![Version Info](/img/setup-dashboard.png "Version information page")

## Admin UI

The Admin UI section contains information regarding the sensenet client.

**Application version**: Running version of the sensenet client.

**Branch name**: sensenet client Github branch in use. Clicking on the branch will
direct users to the Github client repository.

**Commit Hash**: Latest commit for the current branch. Clicking on the hash
will direct users to the file diff for the commit.

## Components

Several sensenet components are utilized with the sensenet installation. This
section describes the components in use and the respective versions.

## Installed packages

Similar to the Components section, the installed packages detail all sensenet
packages installed, versions, and package descriptions for the installed
version of sensenet.

## Assemblies

When sensenet is compiled, additional assemblies are linked for use. These
assemblies can be standard .NET libraries, open-source libraries (e.g. nuget),
or locally built libraries (e.g. sensenet).

All information regarding included assemblies is detailed in this section.

### Assembly Information Breakdown

| Item | Description |
| ---- | ----------- |
| Name | Full assembly name |
| Version | Included version |
| Culture | Assembly culture (e.g. currency, date. etc.) |
| PublicKeyToken | 64-bit hash corresponding to private key used to sign assembly |
| File location | Absolute path for the assembly in the currently running client |
