var typedoc = typedoc || {};
            typedoc.search = typedoc.search || {};
            typedoc.search.data = {"kinds":{"4":"Enumeration","16":"Enumeration member","128":"Class","256":"Interface","512":"Constructor","1024":"Property","2048":"Method","65536":"Type literal","262144":"Accessor","4194304":"Type alias"},"rows":[{"id":0,"kind":256,"name":"LoginResponse","url":"interfaces/loginresponse.html","classes":"tsd-kind-interface"},{"id":1,"kind":1024,"name":"access","url":"interfaces/loginresponse.html#access","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"LoginResponse"},{"id":2,"kind":1024,"name":"refresh","url":"interfaces/loginresponse.html#refresh","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"LoginResponse"},{"id":3,"kind":256,"name":"OauthProvider","url":"interfaces/oauthprovider.html","classes":"tsd-kind-interface"},{"id":4,"kind":2048,"name":"getToken","url":"interfaces/oauthprovider.html#gettoken","classes":"tsd-kind-method tsd-parent-kind-interface","parent":"OauthProvider"},{"id":5,"kind":2048,"name":"login","url":"interfaces/oauthprovider.html#login","classes":"tsd-kind-method tsd-parent-kind-interface","parent":"OauthProvider"},{"id":6,"kind":1024,"name":"dispose","url":"interfaces/oauthprovider.html#dispose","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-inherited","parent":"OauthProvider"},{"id":7,"kind":65536,"name":"__type","url":"interfaces/oauthprovider.html#dispose.__type","classes":"tsd-kind-type-literal tsd-parent-kind-property tsd-is-not-exported","parent":"OauthProvider.dispose"},{"id":8,"kind":256,"name":"RefreshResponse","url":"interfaces/refreshresponse.html","classes":"tsd-kind-interface"},{"id":9,"kind":1024,"name":"access","url":"interfaces/refreshresponse.html#access","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"RefreshResponse"},{"id":10,"kind":256,"name":"TokenPayload","url":"interfaces/tokenpayload.html","classes":"tsd-kind-interface"},{"id":11,"kind":1024,"name":"iss","url":"interfaces/tokenpayload.html#iss","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"TokenPayload"},{"id":12,"kind":1024,"name":"sub","url":"interfaces/tokenpayload.html#sub","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"TokenPayload"},{"id":13,"kind":1024,"name":"aud","url":"interfaces/tokenpayload.html#aud","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"TokenPayload"},{"id":14,"kind":1024,"name":"exp","url":"interfaces/tokenpayload.html#exp","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"TokenPayload"},{"id":15,"kind":1024,"name":"iat","url":"interfaces/tokenpayload.html#iat","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"TokenPayload"},{"id":16,"kind":1024,"name":"nbf","url":"interfaces/tokenpayload.html#nbf","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"TokenPayload"},{"id":17,"kind":1024,"name":"name","url":"interfaces/tokenpayload.html#name","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"TokenPayload"},{"id":18,"kind":128,"name":"Token","url":"classes/token.html","classes":"tsd-kind-class"},{"id":19,"kind":262144,"name":"_tokenPayload","url":"classes/token.html#_tokenpayload","classes":"tsd-kind-get-signature tsd-parent-kind-class tsd-is-private","parent":"Token"},{"id":20,"kind":2048,"name":"fromEpoch","url":"classes/token.html#fromepoch","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-private","parent":"Token"},{"id":21,"kind":262144,"name":"Username","url":"classes/token.html#username","classes":"tsd-kind-get-signature tsd-parent-kind-class","parent":"Token"},{"id":22,"kind":2048,"name":"GetPayload","url":"classes/token.html#getpayload","classes":"tsd-kind-method tsd-parent-kind-class","parent":"Token"},{"id":23,"kind":262144,"name":"ExpirationTime","url":"classes/token.html#expirationtime","classes":"tsd-kind-get-signature tsd-parent-kind-class","parent":"Token"},{"id":24,"kind":262144,"name":"NotBefore","url":"classes/token.html#notbefore","classes":"tsd-kind-get-signature tsd-parent-kind-class","parent":"Token"},{"id":25,"kind":2048,"name":"IsValid","url":"classes/token.html#isvalid","classes":"tsd-kind-method tsd-parent-kind-class","parent":"Token"},{"id":26,"kind":2048,"name":"AwaitNotBeforeTime","url":"classes/token.html#awaitnotbeforetime","classes":"tsd-kind-method tsd-parent-kind-class","parent":"Token"},{"id":27,"kind":262144,"name":"IssuedDate","url":"classes/token.html#issueddate","classes":"tsd-kind-get-signature tsd-parent-kind-class","parent":"Token"},{"id":28,"kind":2048,"name":"toString","url":"classes/token.html#tostring","classes":"tsd-kind-method tsd-parent-kind-class","parent":"Token"},{"id":29,"kind":2048,"name":"FromHeadAndPayload","url":"classes/token.html#fromheadandpayload","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-static","parent":"Token"},{"id":30,"kind":2048,"name":"CreateEmpty","url":"classes/token.html#createempty","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-static","parent":"Token"},{"id":31,"kind":512,"name":"constructor","url":"classes/token.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-private","parent":"Token"},{"id":32,"kind":1024,"name":"headerEncoded","url":"classes/token.html#headerencoded","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"Token"},{"id":33,"kind":1024,"name":"payloadEncoded","url":"classes/token.html#payloadencoded","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"Token"},{"id":34,"kind":4,"name":"TokenPersist","url":"enums/tokenpersist.html","classes":"tsd-kind-enum"},{"id":35,"kind":16,"name":"Session","url":"enums/tokenpersist.html#session","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"TokenPersist"},{"id":36,"kind":16,"name":"Expiration","url":"enums/tokenpersist.html#expiration","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"TokenPersist"},{"id":37,"kind":4,"name":"TokenStoreType","url":"enums/tokenstoretype.html","classes":"tsd-kind-enum"},{"id":38,"kind":16,"name":"SessionCookie","url":"enums/tokenstoretype.html#sessioncookie","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"TokenStoreType"},{"id":39,"kind":16,"name":"ExpirationCookie","url":"enums/tokenstoretype.html#expirationcookie","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"TokenStoreType"},{"id":40,"kind":16,"name":"SessionStorage","url":"enums/tokenstoretype.html#sessionstorage","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"TokenStoreType"},{"id":41,"kind":16,"name":"LocalStorage","url":"enums/tokenstoretype.html#localstorage","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"TokenStoreType"},{"id":42,"kind":16,"name":"InMemory","url":"enums/tokenstoretype.html#inmemory","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"TokenStoreType"},{"id":43,"kind":128,"name":"TokenStore","url":"classes/tokenstore.html","classes":"tsd-kind-class"},{"id":44,"kind":512,"name":"constructor","url":"classes/tokenstore.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class","parent":"TokenStore"},{"id":45,"kind":1024,"name":"baseUrl","url":"classes/tokenstore.html#baseurl","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":46,"kind":1024,"name":"keyTemplate","url":"classes/tokenstore.html#keytemplate","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":47,"kind":1024,"name":"tokenPersist","url":"classes/tokenstore.html#tokenpersist","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":48,"kind":1024,"name":"documentRef","url":"classes/tokenstore.html#documentref","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":49,"kind":1024,"name":"localStorageRef","url":"classes/tokenstore.html#localstorageref","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":50,"kind":1024,"name":"sessionStorageRef","url":"classes/tokenstore.html#sessionstorageref","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":51,"kind":1024,"name":"innerStore","url":"classes/tokenstore.html#innerstore","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":52,"kind":1024,"name":"tokenStoreType","url":"classes/tokenstore.html#tokenstoretype","classes":"tsd-kind-property tsd-parent-kind-class","parent":"TokenStore"},{"id":53,"kind":2048,"name":"getStoreKey","url":"classes/tokenstore.html#getstorekey","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":54,"kind":2048,"name":"getTokenFromCookie","url":"classes/tokenstore.html#gettokenfromcookie","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":55,"kind":2048,"name":"setTokenToCookie","url":"classes/tokenstore.html#settokentocookie","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-private","parent":"TokenStore"},{"id":56,"kind":2048,"name":"GetToken","url":"classes/tokenstore.html#gettoken","classes":"tsd-kind-method tsd-parent-kind-class","parent":"TokenStore"},{"id":57,"kind":2048,"name":"SetToken","url":"classes/tokenstore.html#settoken","classes":"tsd-kind-method tsd-parent-kind-class","parent":"TokenStore"},{"id":58,"kind":262144,"name":"AccessToken","url":"classes/tokenstore.html#accesstoken","classes":"tsd-kind-accessor tsd-parent-kind-class","parent":"TokenStore"},{"id":59,"kind":262144,"name":"RefreshToken","url":"classes/tokenstore.html#refreshtoken","classes":"tsd-kind-accessor tsd-parent-kind-class","parent":"TokenStore"},{"id":60,"kind":4194304,"name":"TokenType","url":"globals.html#tokentype","classes":"tsd-kind-type-alias"},{"id":61,"kind":128,"name":"JwtService","url":"classes/jwtservice.html","classes":"tsd-kind-class"},{"id":62,"kind":2048,"name":"setup","url":"classes/jwtservice.html#setup","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-static","parent":"JwtService"},{"id":63,"kind":1024,"name":"jwtTokenKeyTemplate","url":"classes/jwtservice.html#jwttokenkeytemplate","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"JwtService"},{"id":64,"kind":2048,"name":"dispose","url":"classes/jwtservice.html#dispose","classes":"tsd-kind-method tsd-parent-kind-class","parent":"JwtService"},{"id":65,"kind":1024,"name":"oauthProviders","url":"classes/jwtservice.html#oauthproviders","classes":"tsd-kind-property tsd-parent-kind-class","parent":"JwtService"},{"id":66,"kind":1024,"name":"currentUser","url":"classes/jwtservice.html#currentuser","classes":"tsd-kind-property tsd-parent-kind-class","parent":"JwtService"},{"id":67,"kind":1024,"name":"state","url":"classes/jwtservice.html#state","classes":"tsd-kind-property tsd-parent-kind-class","parent":"JwtService"},{"id":68,"kind":1024,"name":"tokenStore","url":"classes/jwtservice.html#tokenstore","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"JwtService"},{"id":69,"kind":1024,"name":"updateLock","url":"classes/jwtservice.html#updatelock","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"JwtService"},{"id":70,"kind":2048,"name":"checkForUpdate","url":"classes/jwtservice.html#checkforupdate","classes":"tsd-kind-method tsd-parent-kind-class","parent":"JwtService"},{"id":71,"kind":2048,"name":"execTokenRefresh","url":"classes/jwtservice.html#exectokenrefresh","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-private","parent":"JwtService"},{"id":72,"kind":2048,"name":"updateUser","url":"classes/jwtservice.html#updateuser","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-private","parent":"JwtService"},{"id":73,"kind":512,"name":"constructor","url":"classes/jwtservice.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class","parent":"JwtService"},{"id":74,"kind":1024,"name":"repository","url":"classes/jwtservice.html#repository","classes":"tsd-kind-property tsd-parent-kind-class","parent":"JwtService"},{"id":75,"kind":1024,"name":"userLoadOptions","url":"classes/jwtservice.html#userloadoptions","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"JwtService"},{"id":76,"kind":1024,"name":"latencyCompensationMs","url":"classes/jwtservice.html#latencycompensationms","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"JwtService"},{"id":77,"kind":2048,"name":"handleAuthenticationResponse","url":"classes/jwtservice.html#handleauthenticationresponse","classes":"tsd-kind-method tsd-parent-kind-class","parent":"JwtService"},{"id":78,"kind":2048,"name":"login","url":"classes/jwtservice.html#login","classes":"tsd-kind-method tsd-parent-kind-class","parent":"JwtService"},{"id":79,"kind":2048,"name":"logout","url":"classes/jwtservice.html#logout","classes":"tsd-kind-method tsd-parent-kind-class","parent":"JwtService"}]};