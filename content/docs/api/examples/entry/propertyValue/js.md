async function fetchContent() {
  try {
    const response = await fetch(
      "https://dev.demo.sensenet.com/OData.svc/Root/Content('IT')/DisplayName/$value",
      { credentials: "include" }
    );
    const result = await response.text();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

```
