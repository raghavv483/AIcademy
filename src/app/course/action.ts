"use server"

import { db } from "@/app/_configs/db";
import { CourseList } from "@/app/_configs/Schema";
import { eq } from "drizzle-orm";

export const getCourseById = async (courseId: string) => {
    const result = await db.select().from(CourseList)
        .where(eq(CourseList.courseId, courseId))
    
    return result;
}
