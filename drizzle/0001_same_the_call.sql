ALTER TABLE "courseList" ADD COLUMN "courseId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "courseList" ADD COLUMN "includeVideo" varchar DEFAULT 'Yes' NOT NULL;--> statement-breakpoint
ALTER TABLE "courseList" DROP COLUMN "userName";