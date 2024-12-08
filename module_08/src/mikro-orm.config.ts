import * as dotenv from 'dotenv'
dotenv.config()
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { SeedManager } from '@mikro-orm/seeder';

const options: Options<PostgreSqlDriver> = {
  entities: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: './dist/migrations', // path to the folder with migrations
    pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  seeder: {
    path: './dist/seeders', // path to the folder with seeders
    pathTs: './src/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  dbName: process.env.MIKRO_ORM_DB_NAME,
  user: process.env.MIKRO_ORM_USER,
  password: process.env.MIKRO_ORM_PASSWORD,
  port: Number(process.env.MIKRO_ORM_PORT),
  driver: PostgreSqlDriver,
  extensions: [SeedManager],
};

export default options;