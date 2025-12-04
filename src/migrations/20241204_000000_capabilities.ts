import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    -- Create capabilities status enum
    CREATE TYPE "public"."enum_capabilities_status" AS ENUM('draft', 'published');

    -- Create main capabilities table
    CREATE TABLE IF NOT EXISTS "capabilities" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "status" "enum_capabilities_status" DEFAULT 'draft' NOT NULL,
      "hero_eyebrow" varchar,
      "hero_title" varchar NOT NULL,
      "hero_description" varchar NOT NULL,
      "hero_primary_cta_text" varchar NOT NULL,
      "hero_primary_cta_url" varchar NOT NULL,
      "hero_secondary_cta_text" varchar NOT NULL,
      "hero_secondary_cta_url" varchar NOT NULL,
      "hero_image_id" integer,
      "problem_title" varchar NOT NULL,
      "problem_description" varchar NOT NULL,
      "solution_title" varchar NOT NULL,
      "solution_description" varchar NOT NULL,
      "workflow_title" varchar NOT NULL,
      "workflow_description" varchar,
      "features_included_title" varchar NOT NULL,
      "integration_magic_title" varchar NOT NULL,
      "integration_magic_description" varchar NOT NULL,
      "use_cases_title" varchar NOT NULL,
      "cta_title" varchar NOT NULL,
      "cta_description" varchar NOT NULL,
      "cta_button_text" varchar NOT NULL,
      "cta_button_url" varchar NOT NULL,
      "seo_title" varchar,
      "seo_description" varchar,
      "seo_image_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- Create capabilities problem pain points array table
    CREATE TABLE IF NOT EXISTS "capabilities_problem_pain_points" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    -- Create capabilities solution features array table
    CREATE TABLE IF NOT EXISTS "capabilities_solution_features" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "icon" varchar
    );

    -- Create capabilities workflow steps array table
    CREATE TABLE IF NOT EXISTS "capabilities_workflow_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "number" numeric NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL
    );

    -- Create capabilities features included key capabilities array table
    CREATE TABLE IF NOT EXISTS "capabilities_features_included_key_capabilities" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "icon" varchar
    );

    -- Create capabilities integration magic integrations array table
    CREATE TABLE IF NOT EXISTS "capabilities_integration_magic_integrations" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "description" varchar NOT NULL,
      "logo_id" integer
    );

    -- Create capabilities use cases cases array table
    CREATE TABLE IF NOT EXISTS "capabilities_use_cases_cases" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "persona" varchar NOT NULL
    );

    -- Create capabilities use cases cases metrics array table (nested)
    CREATE TABLE IF NOT EXISTS "capabilities_use_cases_cases_metrics" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "value" varchar NOT NULL
    );

    -- Add capabilities_id to payload_locked_documents_rels
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "capabilities_id" integer;

    -- Add foreign key constraints
    DO $$ BEGIN
      ALTER TABLE "capabilities" ADD CONSTRAINT "capabilities_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "capabilities" ADD CONSTRAINT "capabilities_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "capabilities_problem_pain_points" ADD CONSTRAINT "capabilities_problem_pain_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "capabilities_solution_features" ADD CONSTRAINT "capabilities_solution_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "capabilities_workflow_steps" ADD CONSTRAINT "capabilities_workflow_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "capabilities_features_included_key_capabilities" ADD CONSTRAINT "capabilities_features_included_key_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "capabilities_integration_magic_integrations" ADD CONSTRAINT "capabilities_integration_magic_integrations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "capabilities_integration_magic_integrations" ADD CONSTRAINT "capabilities_integration_magic_integrations_logo_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "capabilities_use_cases_cases" ADD CONSTRAINT "capabilities_use_cases_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "capabilities_use_cases_cases_metrics" ADD CONSTRAINT "capabilities_use_cases_cases_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."capabilities_use_cases_cases"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_capabilities_fk" FOREIGN KEY ("capabilities_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    -- Create indexes
    CREATE UNIQUE INDEX IF NOT EXISTS "capabilities_slug_idx" ON "capabilities" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "capabilities_updated_at_idx" ON "capabilities" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "capabilities_created_at_idx" ON "capabilities" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "capabilities_problem_pain_points_order_idx" ON "capabilities_problem_pain_points" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "capabilities_problem_pain_points_parent_id_idx" ON "capabilities_problem_pain_points" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "capabilities_solution_features_order_idx" ON "capabilities_solution_features" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "capabilities_solution_features_parent_id_idx" ON "capabilities_solution_features" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "capabilities_workflow_steps_order_idx" ON "capabilities_workflow_steps" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "capabilities_workflow_steps_parent_id_idx" ON "capabilities_workflow_steps" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "capabilities_features_included_key_capabilities_order_idx" ON "capabilities_features_included_key_capabilities" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "capabilities_features_included_key_capabilities_parent_id_idx" ON "capabilities_features_included_key_capabilities" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "capabilities_integration_magic_integrations_order_idx" ON "capabilities_integration_magic_integrations" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "capabilities_integration_magic_integrations_parent_id_idx" ON "capabilities_integration_magic_integrations" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "capabilities_use_cases_cases_order_idx" ON "capabilities_use_cases_cases" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "capabilities_use_cases_cases_parent_id_idx" ON "capabilities_use_cases_cases" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "capabilities_use_cases_cases_metrics_order_idx" ON "capabilities_use_cases_cases_metrics" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "capabilities_use_cases_cases_metrics_parent_id_idx" ON "capabilities_use_cases_cases_metrics" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_capabilities_id_idx" ON "payload_locked_documents_rels" USING btree ("capabilities_id");
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    -- Drop indexes
    DROP INDEX IF EXISTS "payload_locked_documents_rels_capabilities_id_idx";
    DROP INDEX IF EXISTS "capabilities_use_cases_cases_metrics_parent_id_idx";
    DROP INDEX IF EXISTS "capabilities_use_cases_cases_metrics_order_idx";
    DROP INDEX IF EXISTS "capabilities_use_cases_cases_parent_id_idx";
    DROP INDEX IF EXISTS "capabilities_use_cases_cases_order_idx";
    DROP INDEX IF EXISTS "capabilities_integration_magic_integrations_parent_id_idx";
    DROP INDEX IF EXISTS "capabilities_integration_magic_integrations_order_idx";
    DROP INDEX IF EXISTS "capabilities_features_included_key_capabilities_parent_id_idx";
    DROP INDEX IF EXISTS "capabilities_features_included_key_capabilities_order_idx";
    DROP INDEX IF EXISTS "capabilities_workflow_steps_parent_id_idx";
    DROP INDEX IF EXISTS "capabilities_workflow_steps_order_idx";
    DROP INDEX IF EXISTS "capabilities_solution_features_parent_id_idx";
    DROP INDEX IF EXISTS "capabilities_solution_features_order_idx";
    DROP INDEX IF EXISTS "capabilities_problem_pain_points_parent_id_idx";
    DROP INDEX IF EXISTS "capabilities_problem_pain_points_order_idx";
    DROP INDEX IF EXISTS "capabilities_created_at_idx";
    DROP INDEX IF EXISTS "capabilities_updated_at_idx";
    DROP INDEX IF EXISTS "capabilities_slug_idx";

    -- Drop constraints
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_capabilities_fk";
    ALTER TABLE "capabilities_use_cases_cases_metrics" DROP CONSTRAINT IF EXISTS "capabilities_use_cases_cases_metrics_parent_id_fk";
    ALTER TABLE "capabilities_use_cases_cases" DROP CONSTRAINT IF EXISTS "capabilities_use_cases_cases_parent_id_fk";
    ALTER TABLE "capabilities_integration_magic_integrations" DROP CONSTRAINT IF EXISTS "capabilities_integration_magic_integrations_logo_id_fk";
    ALTER TABLE "capabilities_integration_magic_integrations" DROP CONSTRAINT IF EXISTS "capabilities_integration_magic_integrations_parent_id_fk";
    ALTER TABLE "capabilities_features_included_key_capabilities" DROP CONSTRAINT IF EXISTS "capabilities_features_included_key_capabilities_parent_id_fk";
    ALTER TABLE "capabilities_workflow_steps" DROP CONSTRAINT IF EXISTS "capabilities_workflow_steps_parent_id_fk";
    ALTER TABLE "capabilities_solution_features" DROP CONSTRAINT IF EXISTS "capabilities_solution_features_parent_id_fk";
    ALTER TABLE "capabilities_problem_pain_points" DROP CONSTRAINT IF EXISTS "capabilities_problem_pain_points_parent_id_fk";
    ALTER TABLE "capabilities" DROP CONSTRAINT IF EXISTS "capabilities_seo_image_id_media_id_fk";
    ALTER TABLE "capabilities" DROP CONSTRAINT IF EXISTS "capabilities_hero_image_id_media_id_fk";

    -- Drop capabilities_id column from payload_locked_documents_rels
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "capabilities_id";

    -- Drop tables
    DROP TABLE IF EXISTS "capabilities_use_cases_cases_metrics" CASCADE;
    DROP TABLE IF EXISTS "capabilities_use_cases_cases" CASCADE;
    DROP TABLE IF EXISTS "capabilities_integration_magic_integrations" CASCADE;
    DROP TABLE IF EXISTS "capabilities_features_included_key_capabilities" CASCADE;
    DROP TABLE IF EXISTS "capabilities_workflow_steps" CASCADE;
    DROP TABLE IF EXISTS "capabilities_solution_features" CASCADE;
    DROP TABLE IF EXISTS "capabilities_problem_pain_points" CASCADE;
    DROP TABLE IF EXISTS "capabilities" CASCADE;

    -- Drop enum
    DROP TYPE IF EXISTS "public"."enum_capabilities_status";
  `)
}
