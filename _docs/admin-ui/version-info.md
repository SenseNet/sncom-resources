---
title: "Version Info"
source_url: "https://github.com/SenseNet/sensenet.github.io/blob/master/docs/admin-ui/version-info.md"
category: Admin UI
version: v7.0
tags: [admin ui, version, settings]
description: An overview the version information available for the running instance
---

# Verison Info

Version Info provides information on the currently running instance of SenseNet.

![Version Info](/img/setup-dashboard.png "Version information page")

## Admin UI

The Admin UI section contains information regarding the SenseNet client.

**Application version**: Running version of the SenseNet client.

**Branch name**: SenseNet client Github branch in use. Clicking on the branch will
direct users to the Github client repository.

**Commit Hash**: Latest commit for the current branch. Clicking on the hash
will direct users to the file diff for the commit.

## Components

Several SenseNet components are utilized with the SenseNet installation. This
section describes the components in use and the respective versions.

## Installed packages

Similar to the Components section, the installed packages detail all SenseNet
packages installed, versions, and package descriptions for the installed
version of SenseNet.

## Assemblies

When SenseNet is compiled, additional assemblies are linked for use. These
assemblies can be standard .NET libraries, open-source libraries (e.g. nuget),
or locally built libraries (e.g. SenseNet).

All information regarding included assemblies is detailed in this section.

### Assembly Information Breakdown

| Item | Description |
| ---- | ----------- |
| Name | Full assembly name |
| Version | Included version |
| Culture | Assembly culture (e.g. currency, date. etc.) |
| PublicKeyToken | 64-bit hash corresponding to private key used to sign assembly |
| File location | Absolute path for the assembly in the currently running client |
