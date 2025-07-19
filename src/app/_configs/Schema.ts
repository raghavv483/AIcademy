import { json, pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const CourseList = pgTable('courseList', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(), // Add this line
    name: varchar('name').notNull(),
    level: varchar('level').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    courseOutput: json('courseOutput').notNull(),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('userName'),
    userProfileImage: varchar('userProfileImage')
});