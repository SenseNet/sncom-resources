# Docribution guide
In this article we collect the best practices we use for creating and editing documentation for [sensenet ECM](https://github.com/SenseNet/sensenet). Please follow these advices if you want to help the community by making a fix or creating a brand new document.

### Where are the documents?

#### Original repository
The [components of sensenet ECM](/docs/sensenet-components) are stored in many repositories. Articles related to a single feature should be created and maintained in the **repository of the component it is related to**. We update articles here in the github.io repository in batch from time-to-time, so please do not change anything here, but in the original location. You can find the original location of a document in the following places:

- at the bottom of every document there is a link to the original md file
- in the markdown file's hidden header there is the same source link as above

In this article we refer to the repository the documentation comes from as the *original repository*.

For a list of sensenet-related repositories, visit the [main organization](https://github.com/SenseNet).

#### General articles, tutorials
There are several topics that cover a broader range of features than a single component, or they are maybe about an enterprise feature that does not have a public repository. The same goes for 'How-to' articles. These types of documents are created and stored here, in the github.io repository in the following subfolder (and do not have an original location):
- /docs/tutorials
 
### Naming documents
Document names should be in lower case, words are separated using dashes.

`my-new-feaure.md`

### Titles and headings
Articles should contain a single title; do not use an 'h1' heading more than once.

`# My feature title`

### Image urls
Images are stored in the original repository, so we need to reference them by their absolute url:
- https://raw.githubusercontent.com/SenseNet/sensenet/master/docs/images/content1.png
> Always reference images from the master branch, because sub-branches come and go, only the master is considered stable.

### Linked document in the same repo
When you reference a document from the same repository, use a relative url:
- /docs/some-other-stuff.md

### Linked document in a different repo
A linked document that lives in a different repo than the original one has to be referenced by its absolute url:
- **Simple doc**: https://github.com/SenseNet/sn-webpages/blob/master/docs/install-webpages-from-nuget.md
- **Tutorial**: http://community.sensenet.com/docs/tutorials/snadmin-create-custom-step
>Don't worry, our batch update script will remove the prefix so that the link points to the final article (that is stored here in the github.io repo), this is only needed to be sure that the article is usable in the original location too.