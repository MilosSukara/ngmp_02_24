# Module 05
## Commands
### Start
> `npm start`
### Stop
> `npm stop`

## Evaluation criteria
(1) Server is created using http module, no frameworks are used  
(1) Commands to start and stop server are added to package.json   
(2) `POST /api/users` - create user endpoint is implemented based on Swagger  
(2) `GET /api/users` - get users endpoint is implemented based on Swagger  
(2) `DELETE /api/users/:userId` - delete user endpoint is implemented based on Swagger  
(2) `GET /api/users/:userId/hobbies` - get user hobbies endpoint is implemented based on Swagger  	
(2) `PATCH /api/users/:userId/hobbies` - update user hobbies endpoint is implemented based on Swagger  	  
(1) Proper caching headers are added for getting list of users and hobbies for a specific user  
(2) Hypermedia links (HATEOAS) are included into responses  