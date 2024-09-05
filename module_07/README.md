# Module 07
## Commands
### Start
> `podman-compose up (-d)`
### Stop
> `podman-compose down`

## Postman Collection & Environment

The data can be found in the `postman` directory.

## DB manipulation
The DB is seeded via `/mongodb/initdb.d/mongo-init.js` file.

If you need a fresh start for testing purposes:
1. `podman-compose down` (in case there are running containers)
2. `podman image prune -f && podman volume prune -f`
3. `podman-compose up`