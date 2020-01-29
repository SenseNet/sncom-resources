async function fetchContent() {
  try {
    const response = await fetch(
      "https://dev.demo.sensenet.com/OData.svc/Root/Content/IT/$count",
      { credentials: "include" }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

```
