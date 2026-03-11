ALTER TABLE "bookings" ADD COLUMN "payment_status" varchar(20) DEFAULT 'unpaid';--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "stripe_session_id" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "onboarding_data" ADD CONSTRAINT "onboarding_data_user_id_unique" UNIQUE("user_id");