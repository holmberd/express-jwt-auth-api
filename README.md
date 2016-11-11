##express-jwt-auth-api
+ Supports JWT authentication.

###Authentication Sequence
![alt tag](https://github.com/holmberd/express-jwt-auth-api/blob/master/auth.flow.png)

###API

####Buisness logic API's

```
POST    /auth/facebook          // Authenticates user with facebook.
                                // Recives a valid facbook access_token.
                                // #Success: If no user match found in db then 
                                // create a new user record, else return user_id JWT token.
                                // #Failure: Return JSON error message.

POST    /auth/token             // Refresh token expiration time field.
                                // Receives a valid, not expired JWT and returns 
                                // the same signed JWT with a updated expiration field.

GET     /users/me               // Return current user data in JSON.
```
####Page Render URI's 
```
GET     /{root}                 // Renders home page.
GET     /login                  // Renders login page.
```

##License

Free to use and abuse under the MIT license.
http://www.opensource.org/licenses/mit-license.php
