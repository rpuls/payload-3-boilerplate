import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// Compatibility patch for upgrading existing 3.4-era databases to newer Payload 3.x schemas.
// This migration is intentionally idempotent so both fresh installs and existing installs succeed.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    CREATE TABLE IF NOT EXISTS "users_sessions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "expires_at" timestamp(3) with time zone NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "users_sessions"
        ADD CONSTRAINT "users_sessions_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");

    ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "placeholder" varchar;
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // no-op on purpose: this is an additive compatibility migration.
  await payload.db.drizzle.execute(sql`SELECT 1;`)
}

