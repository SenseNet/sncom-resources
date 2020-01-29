```javascript
import { Repository } from "@sensenet/client-core";

const repository = new Repository({
    repositoryUrl: "https://dev.demo.sensenet.com"
  });
const result = await repository.loadCollection({ path: "/Root/Content" });
console.log(result);
```
