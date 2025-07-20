CREATE TABLE "chapters" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"chapterId" integer NOT NULL,
	"content" json NOT NULL,
	"videoId" varchar NOT NULL
);
