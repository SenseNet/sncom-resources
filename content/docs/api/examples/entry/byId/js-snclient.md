```javascript
import { Repository } from "@sensenet/client-core";

const repository = new Repository({
  repositoryUrl: "https://dev.demo.sensenet.com"
});

try {
    const result = await repository.load({
      idOrPath: 1284,
    });
  console.log(result);
} catch (error) {
  console.log(error);
}
```
