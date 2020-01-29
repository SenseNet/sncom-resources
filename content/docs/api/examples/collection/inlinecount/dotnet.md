```csharp
var result = await RESTCaller.GetResponseJsonAsync(new ODataRequest
{
    IsCollectionRequest = true,
    Path = "/Root/Content/IT",
    Top = 3,
    Skip = 4,
    Parameters = { { "$inlinecount", "allpages" } }
});
```
