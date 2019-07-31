---
title:  "1000 content demo"
source_url: 'https://github.com/SenseNet/sensenet/blob/master/docs/demo/1000-content-demo.md'
category: Demo
version: v7.0.0
tags: [demo, metrics, poc, test] 
description: This document is about the 1000 content demo repository.
hidden: true
---

# 1000 content demo

The 1000 content demo and test repository demonstrates a basic setup of sensenet with a bunch of example content to try out its capabilities. It provides a good insight into the content structure of a common project giving the opportunity to verify the functionality with making a proof of concept trying out the API and the admin surface. This enviroment is based on a daily build which means all the built-in demo content are reimported, the configurations are restored and the customer-created stuff are removed every day.

<div class="docs-highlight">
    <i class="fa fa-info"></i>
    <p>
        If you want your own empty try-out repository, go to <a href="https://www.sensenet.com/sign-up/">https://www.sensenet.com/sign-up/</a> and register a free account.
    </p>
</div>

This demo setup provides a large array of various types of content from demo users and groups till task-, image- and document libraries. Content of the demo repository:

<ul class="doc-innerlist">
    <li>
        <strong>3 demo users</strong> for testing the possible user tasks and jobs. Business Cat is an admin user with full access, Developer Dog is developer user who has control only over the content types, the settings and can see the version info and Editor Manatee is a content editor who can manage the non-system content items, build or save custom search querys.
    </li>
    <li>
        <strong>3 demo groups</strong> to demonstrate possible roles: one for admins, one for developers and one for editors. Each group has one member of the above users.
    </li>
    <li>
        <strong>3 workspaces</strong>.
        <ul style="margin-top: 10px">
            <li>
                <strong>3 local groups</strong> per workspace to demonstrate permission and role management inside workspaces.
            </li>
            <li>
                <strong>1 document library</strong> per workspace with <strong>10 folders, 26 file various demo files</strong> in each of the folders and with <strong>one extra large file</strong> in the IT workspace's doclib.
            </li>
            <li>
                <strong>1 image library</strong> per workspace with <strong>10 demo pictures</strong> in each of them.
            </li>
            <li>
                <strong>1 memolist</strong> per workspace with <strong>10 example memos</strong> in each of them.
            </li>
            <li>
                <strong>1 tasklist</strong> per workspace with <strong>10 tasks</strong>.
            </li>
            <li>
                <strong>1 calendar</strong> per workspace with <strong>10 calendar events</strong> in each of them.
            </li>
            <li>
                <strong>1 linklist</strong> per workspace with <strong>10 link content</strong>.
            </li>
        </ul>
    </li>
</ul>

The document libraries mainly contain Microsoft Office word, excel and powerpoint files, pdf's and some simple text files. They're not only showing variety of types but also are written in different languages, so you're able to check out search capabitities with special characters and symbols as well.

Document preview generation is switched on in this repository and as it is configured in the built-in setting two preview images will be generated in one round. The first two pages of the demo files are automatically generated when the repository is created.

**Number of content**: There're 982 items excluding and 2375 including system content in the top level container names Content (/Root/Content). In the first case System Folders (e.g. local groups) and Preview images don't count.

**Size of the db**: This demo enviroment gives us an insight into the possible storage needs of a repository as well:

#### Whole database

|                |   |
| -------------- | - |
| **Db size** [ALLOCATED] | 37 200 MB (33Gb db + 4Gb log) |
| **Db size** [USED] | 18 420 MB |
| **Files table** | 2 551 MB |
| **Versions table** | 15 816 MB |

#### In the Content subtree (size, binary+indexdoc)

|  |   |
| ---------------------------------------------- | - |
| **All** | 17 936 MB |
| **Docs** | 17 575 MB |
| **Preview images** | 361 MB |


<div class="docs-highlight">
    <i class="fa fa-info"></i>
    <p>
        As a next step continue exploring this demo repository without registration <a href="/docs/tutorials/explore-1000-content-demo-repository/#adminui">on the admin surface</a> or through <a href="/docs/tutorials/explore-1000-content-demo-repository/#try-the-api">API calls</a>.
    </p>
</div>