# Module 06
## Commands
### Start
> `npm start`
### Stop
> `npm stop`

## Postman Collection & Environment

The data can be found in the `postman` directory.


## Acceptance criteria:

> Note: TypeScript should be used.

1. Server is created using Express framework.
   -  Server should be started using npm start command and stopped by npm run stop. Server is running on 8000 port.

2. API implementation follows Swagger. Proper HTTP status codes are returned in responses (not only 200 or 500).
   - Auth endpoints should be skipped at this point.
   - If token is not provided, 401 status code should be returned. If there is no such a user, 403 status code should be returned.
   - At least one product should be available in /api/products endpoint
   - Order entity has copy of products. If you have only product id in order, it may lead to inconsistency. For example, if user creates an order and after that price is changed, the order price shouldn't be changed.
3. Application is implemented following Three Layered Architecture. Layers are separated by file names. For example xxx.repository.ts contains functions to retrieve data (data access layer), xxx.service.ts contains services that implement business logic, xxx.controller.ts contains functions that manage status codes/responses returned (presentation layer).
4. Data is stored either in memory or on file system.
5. joi is used to validate request bodies.
6. Simple authentication middleware is added to check if user with such id exists. User id is passed in x-user-id header.
    admin value is hardcoded for x-user-id header and can be used to access all these endpoints. 