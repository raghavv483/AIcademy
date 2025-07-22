import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vylqagmifkmroogfukkh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!(file instanceof File)) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
        .from('aicadmeyfilestorage') // <-- replace with your bucket name
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
        .from('aicadmeyfilestorage')
        .getPublicUrl(filePath);
    //console.log('Public URL Data:', publicUrlData);

    return NextResponse.json({ url: publicUrlData.publicUrl });
}

