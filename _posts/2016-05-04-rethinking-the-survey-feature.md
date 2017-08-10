---
title: "Rethinking the survey feature"
author: ildika
image: "/img/posts/rethinking.jpg"
tags: [survey, ui]
---

To fulfill an important need of Sense/Net users that were reported towards us several times recently, we have been developing a brand new, nice and easy-to-use feature in the Product. This is a Survey-editor application, which is being built to be fully customizable and extendable via the templated structure.

---

To fulfill an important need of Sense/Net users that were reported towards us several times recently, we have been developing a brand new, nice and easy-to-use feature in the Product. This is a Survey-editor application, which is being built to be fully customizable and extendable via the templated structure.

## Creating the UI

With the use of this integrated app you can build your own Survey through a graphic user interface, with no coding skills. Solely by clicking, users can put together all necessary elements of their Survey, and configure them according to their actual needs.

To make the UI ready for this, the following items need to be added or upgraded in the content-explorer of Sense/Net.

-   Specialized content-types for the Surveys and future Survey items (new custom CTDs))
-   Custom Add-, Edit- and Browse pages in the (apps) folder for creating, editing or browsing a Survey.
-   Including the necessary JavaScript files and stylesheets for running application

## Creating a new Survey

![Add new survey](http://download.sensenet.com/BlogPostImages/SurveyEditor/add-new-survey.png "Add new survey")

After having opened the Survey creator app, one can easily create a new Survey by setting the parameters on a graphic UI:

-   Title of Survey
-   Description of Survey
-   If Progress bar is desired to be displayed, to lead completion step by step through sections
-   Welcome message
-   Good bye message (not only plain text but links or even html could be added here)
-   Adding Sections

![Add new section](http://download.sensenet.com/BlogPostImages/SurveyEditor/add-new-section.png "Add new section")

Added sections can be configured by the following parameters:

-   Title of Sections
-   Description of Sections
-   Hint to Section, to help completing the section, if necessary
-   Deleting Sections
-   Set the order of Sections by Drag&amp;Drop them

![Add new question](http://download.sensenet.com/BlogPostImages/SurveyEditor/add-new-question.png "Add new question")

In each section multiple questions can be included of different predefined types - e.g. Number, Short answer or Date and time.

![Edit question](http://download.sensenet.com/BlogPostImages/SurveyEditor/edit-question.png "Edit question")

After having added a question there is a bunch of possibilities to be configured:

-   Set if the question is required to be answered
-   Check if a hint-text needs to be shown
-   Check if the placeholder in the answer-textbox is to be customized
-   Check if custom or predefined validation is required to be applied while answering the question

Questions can be reordered by drag&amp;drop, and you can check how your question will be presented on the survey UI.

## Completing a Survey

After a survey is assembled and saved, it is ready to be filled.

![Complete a survey](http://download.sensenet.com/BlogPostImages/SurveyEditor/complete-survey.png "Complete a survey")

Sections and Questions are shown in the Survey editor via a preview, which is rendered by the very same layout as they appear in the upshot Survey.

