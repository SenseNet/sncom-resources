```javascript
import { Repository } from "@sensenet/client-core";

const repository = new Repository({
  repositoryUrl: "https://dev.demo.sensenet.com"
});

try {
    const result = await repository.loadCollection({
      path: "/Root/Content/IT",
      oDataOptions: {
        top: 3,
        skip: 4,
        inlineCount: "allpages"
      }
    });
  console.log(result);
} catch (error) {
  console.log(error);
}
```
