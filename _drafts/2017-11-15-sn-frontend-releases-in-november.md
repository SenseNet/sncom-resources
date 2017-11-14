---

title: "Autumn happenings in sensenet frontend-ville"
author: [gallayl, herflis]
image: "../img/posts/frontend-ville.jpg"
tags: [javascript, typescript, frontend development, redux]

---

Busy weeks behind us at the frontend division of the sensenet team. New features on the backend and our in-progress [DMS MVP](http://dms.demo.sensenet.com) generated tons of tasks and gave us many improvement points. But now we've released all these new stuff, so we can lay back a bit and sum up what's done. Join us in checking-out the latests and maybe you'll catch a bit about the upcomings.

---

## sn-client-js 3.0.0

### Upload

### Batch actions

### OAuth

## sn-client-auth-google 1.0.0

## sn-redux 3.4.0

[sn-redux](https://github.com/SenseNet/sn-redux) always keeps an eye on [sn-client-js](https://github.com/SenseNet/sn-client-js), we're working mostly in paralell and this is how it happened this time. Learn how the new features was added and what and how you can achieve with them.

### Upload

There're three new actions to handle the upload related stuff. One for an upload request (can only handle one file at once), one for handling if a file was uploaded successfully and one for the upload failure. The upload functionality is implemented in the related reducers too, so if a new file was uploaded, its id is added to the ```ids``` array and the ```entities``` object will contain the new content. Of course there's a new [redux-observable](https://redux-observable.js.org/) epic handling the ajax request in the background, so to have the upload functionality you have to call the upload action simply:

```typescript
Actions.UploadRequest(content, file)
```

Param ```content``` is the parent content object and ```file``` is the file that should be uploaded.

Learn more about upload in sn-redux in the [API references](https://www.sensenet.com/Root/Sites/sensenet.com/documentation/sn-redux/modules/_actions_.actions.html#uploadrequest). 

### Batch actions

From now on batch operations are also supported in [sn-redux](https://github.com/SenseNet/sn-redux) with three new actions apiece for handling requests, operation successes and failures. Because batch operations' responses could be mixed (some content could be uploaded and some could not) a new reducer called ```batchResponses``` is added to hold the custom response and the error. At the background three new epics handle the processes. 

Learn more about the batch operations in [sn-redux](https://github.com/SenseNet/sn-redux) in the [API references](https://www.sensenet.com/Root/Sites/sensenet.com/documentation/sn-redux/index.html). 

### OAuth

## What's next

![Got stuff to do, can't talk now](/img/posts/busy.gif)