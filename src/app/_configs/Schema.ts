
import { boolean, json, pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"

export const CourseList = pgTable('courseList', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(), // Add this line
    name: varchar('name').notNull(),
    level: varchar('level').notNull(),
    includeVideo: varchar('includeVideo').notNull().default('Yes'),
    courseOutput: json('courseOutput').notNull(),
    createdBy: varchar('createdBy').notNull(),
    username: varchar('username'),
    userProfileImage: varchar('userProfileImage'),
    courseBanner: varchar('courseBanner'),
    publish: boolean('publish').default(false)
});

export const Chapters = pgTable('chapters', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    chapterId: integer('chapterId').notNull(),
    content: json('content').notNull(),
    videoId: varchar('videoId').notNull()
}
)