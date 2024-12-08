import { Migration } from '@mikro-orm/migrations';

export class Migration20240906172837 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "product" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" varchar(255) not null, "name" varchar(255) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "cart" ("id" varchar(255) not null, "is_deleted" boolean not null default false, "user_id" varchar(255) not null, "order_id" varchar(255) null, "items" jsonb not null default \'[]\', constraint "cart_pkey" primary key ("id"));');
    this.addSql('alter table "cart" add constraint "cart_order_id_unique" unique ("order_id");');

    this.addSql('create table "order" ("id" varchar(255) not null, "user_id" varchar(255) not null, "cart_id" varchar(255) not null, "items" jsonb not null default \'[]\', "payment" jsonb not null default \'{}\', "delivery" jsonb not null default \'{}\', "comments" varchar(255) not null default \'\', "status" varchar(255) not null, "total" int not null default 0, constraint "order_pkey" primary key ("id"));');
    this.addSql('alter table "order" add constraint "order_cart_id_unique" unique ("cart_id");');

    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "cart" add constraint "cart_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete set null;');

    this.addSql('alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "cart" drop constraint "cart_user_id_foreign";');

    this.addSql('alter table "order" drop constraint "order_user_id_foreign";');

    this.addSql('alter table "order" drop constraint "order_cart_id_foreign";');

    this.addSql('alter table "cart" drop constraint "cart_order_id_foreign";');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "order" cascade;');
  }

}
