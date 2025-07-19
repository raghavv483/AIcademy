CREATE TABLE "courseList" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"level" varchar NOT NULL,
	"courseOutput" json NOT NULL,
	"createdBy" varchar NOT NULL,
	"userName" varchar,
	"userProfileImage" varchar
);
