```javascript
import { Repository } from "@sensenet/client-core";

const repository = new Repository({
  repositoryUrl: "https://dev.demo.sensenet.com"
});

try {
  const result = await repository.loadCollection({
    path: "/Root/Content/IT/$count"
  });
  console.log(result);
} catch (error) {
  console.log(error);
}
```
