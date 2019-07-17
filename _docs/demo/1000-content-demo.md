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

The 1000 content demo and test repository demonstrates a basic setup of sensenet allowing to try out the content repository. It provides a good insight into the content structure of a common project giving the opportunity to verify the functionality making a proof of concept trying out the API and the admin surface. This enviroment is based on a daily build which means all the built-in demo content are reimported, the configurations are restored and the customer-created stuff are removed every day.

<div class="docs-highlight">
    <i class="fa fa-info"></i>
    <p>
        If you want your own empty try-out repository, go to <a href="https://www.sensenet.com/sign-up/">https://www.sensenet.com/sign-up/</a> and register your free account.
    </p>
</div>

This demo setup provides a large array of various types of content from demo users and groups till task-, image- and document libraries. Content of the demo repository:

<ul class="doc-innerlist">
    <li>
        <strong>3 demo users</strong> for testing the possible user tasks and jobs. Business Cat is an admin user with full access, Developer Dog is developer user who has control only over the content types, the settings and can see the version info, Editor Manatee is a content editor who can manage the non-system content items, build or save custom search querys.
    </li>
    <li>
        <strong>3 demo groups</strong> to demonstrate possible roles: one for admins, one for developers and one for editor. Each groups have one member of the above users.
    </li>
    <li>
        <strong>3 workspaces</strong>.
        <ul style="margin-top: 10px">
            <li>
                <strong>3 local groups</strong> per workspace to demonstrate permission and role management inside workspaces.
            </li>
            <li>
                <strong>1 document library</strong> per workspace with <strong>10 folders, 26 file various demo files</strong> in each of the folders and <strong>one extra large file</strong> in the IT workspace's doclib.
            </li>
            <li>
                <strong>1 image library</strong> per workspace with <strong>10 demo pictures</strong> in each of them
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

The document libraries mainly contain Microsoft Office word, excel and powerpoint files, besides from pdf's and some simple text files. They're not only showing variety of types but also are written in different languages, so you're able to check out search capabitities with special characters and symbols as well.

Document preview generation is switched on in this repository and as it is configured in the built-in setting two images will be generated in one round. The first two pages of the demo files are automatically generated when the repository is created.

**Number of content**: There're 982 items excluding and 2375 including system content in the top level container names Content (/Root/Content). In the first case System Folders (e.g. local groups) and Preview images don't count.

**Size of the db**: x

<div class="docs-highlight">
    <i class="fa fa-info"></i>
    <p>
        As a next step you can continue <a href="/tutorials/explore-1000-content-demo-repository">exploring this repository</a> using its url on the login form at <a href="admin.sensenet.com">admin.sensenet.com</a> or you can digg a bit deeper making a proof of concept application connected to this repository <a href="/tutorials/getting-started-with-sensenet-and-javascript">trying the APIs</a>. 
    </p>
</div>