# Module 08
## Commands
### Start
> `podman-compose up (-d)`
### Stop
> `podman-compose down`

## Postman Collection & Environment

The data can be found in the `postman` directory.

If you need a fresh start for testing purposes:
1. `podman-compose down` (in case there are running containers)
2. `podman image prune -f && podman volume prune -f`
3. `podman-compose up`

## DB manipulation
The DB is seeded via `/src/seeders/DatabaseSeeder.ts` file.
The migration and seeder commands:
1. Create migration: `npx mikro-orm-esm migration:create`
2. Migrate to latest version: `npx mikro-orm-esm migration:up`
3. Run seeder: `npx mikro-orm-esm seeder:run`
