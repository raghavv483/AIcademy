"use server";
import { useUser } from "@clerk/nextjs";
import { db } from "../_configs/db";
import { CourseList } from "../_configs/Schema";
import { v4 as uuidv4 } from "uuid";

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
    //setLoading(true);
   // const {user} = useUser()
    try {
      const result = await db.insert(CourseList).values({
        courseId: courseId,
        name: userCourseInput?.topic || 'Untitled Course',
        level: userCourseInput?.level || 'Beginner',
        courseOutput: courseLayout || null,
        createdBy: user?.primaryEmailAddress?.emailAddress || '',
        userName: user?.fullName || null,
        userProfileImage: user?.imageUrl || null
      });
      
     // setLoading(false);
     
      return courseId;
    } catch (error) {
      console.error('Database insertion error:', error);
      //setLoading(false);
    }
  };