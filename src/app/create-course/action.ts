"use server";

import { db } from "../_configs/db";
import { Chapters, CourseList } from "../_configs/Schema";
import { v4 as uuidv4 } from "uuid";
import { and, eq } from 'drizzle-orm';

export const SaveCourseLayoutInDb = async ({
  userCourseInput,
  courseLayout,
  user,
}: {
  userCourseInput: any;
  courseLayout: string | null;
  user: any;
}) => {
  const courseId = uuidv4(); // Generate UUID
  try {
    await db.insert(CourseList).values({
      courseId: courseId,
      name: userCourseInput?.topic || 'Untitled Course',
      level: userCourseInput?.level || 'Beginner',
      courseOutput: courseLayout || null,
      createdBy: user?.primaryEmailAddress?.emailAddress || '',
      username: user?.fullName || null,
      userProfileImage: user?.imageUrl || null
    });

    return courseId;
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof (error as any).message === 'string'
    ) {
      message = (error as { message: string }).message;
    }
    console.error('Database insertion error:', message);
    // Optionally rethrow or return appropriate value here:
    // throw error;
  }
};

export const GetCourse = async (courseId: string, fullName: string) => {
  try {
    const result = await db.select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, courseId),
          eq(CourseList.username, fullName)
        )
      );

    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export const UpdateCourseImage = async ({
  courseId,
  imageUrl,
}: {
  courseId: string;
  imageUrl: string;
}) => {
  try {
    await db
      .update(CourseList)
      .set({ courseBanner: imageUrl }) // Make sure your schema has a courseBanner field
      .where(eq(CourseList.courseId, courseId));
    return true;
  } catch (error) {
    console.error('Database update error:', error);
    return false;
  }
};

export const UpdateVideoId = async ({
  content,
  videoId,
  courseId,
  chapterId
}: {
  content: any,
  videoId: string,
  courseId: string,
  chapterId: any
}) => {
  try {
    await db.insert(Chapters).values({
      chapterId,
      courseId,
      content,
      videoId
    });
    return true;
  } catch (error) {
    console.error("Error in inserting into Chapter Schema", error);
    return false;
  }
};

export const GetCourseContent = async (courseId: string) => {
  try {
    const content = await db
      .select()
      .from(Chapters)
      .where(eq(Chapters.courseId, courseId));

    return content;
  } catch (error) {
    console.error('Error fetching course content:', error);
    throw error;
  }
};
