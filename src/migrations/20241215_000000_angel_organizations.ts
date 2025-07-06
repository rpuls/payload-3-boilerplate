import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "angel_organizations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"organization_name" varchar NOT NULL,
  	"state" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"type" varchar NOT NULL,
  	"status" varchar NOT NULL,
  	"quality_score" decimal(3,1),
  	"website" varchar,
  	"contact" varchar,
  	"founded" integer,
  	"aca_member" boolean DEFAULT false,
  	"last_verified" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "angel_organizations_id" integer;
  
  CREATE INDEX IF NOT EXISTS "angel_organizations_state_idx" ON "angel_organizations" USING btree ("state");
  CREATE INDEX IF NOT EXISTS "angel_organizations_city_idx" ON "angel_organizations" USING btree ("city");
  CREATE INDEX IF NOT EXISTS "angel_organizations_type_idx" ON "angel_organizations" USING btree ("type");
  CREATE INDEX IF NOT EXISTS "angel_organizations_status_idx" ON "angel_organizations" USING btree ("status");
  CREATE INDEX IF NOT EXISTS "angel_organizations_quality_score_idx" ON "angel_organizations" USING btree ("quality_score");
  CREATE INDEX IF NOT EXISTS "angel_organizations_aca_member_idx" ON "angel_organizations" USING btree ("aca_member");
  CREATE INDEX IF NOT EXISTS "angel_organizations_updated_at_idx" ON "angel_organizations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "angel_organizations_created_at_idx" ON "angel_organizations" USING btree ("created_at");
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_angel_organizations_fk" FOREIGN KEY ("angel_organizations_id") REFERENCES "public"."angel_organizations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_angel_organizations_id_idx" ON "payload_locked_documents_rels" USING btree ("angel_organizations_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "angel_organizations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "angel_organizations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_angel_organizations_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_angel_organizations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "angel_organizations_id";`)
} 