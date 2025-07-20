import { NextRequest, NextResponse } from 'next/server';
import { getUserCourse } from '@/app/dashboard/action';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const fullName = searchParams.get('fullName');
   

    if (!fullName) {
        return NextResponse.json({ error: 'Missing username' }, { status: 400 });
    }
    try {
        console.log(fullName);
        
        const courses = await getUserCourse({ username:fullName });
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json({ error: 'Database error', details: String(error) }, { status: 500 });
    }
}