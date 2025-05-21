import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const grade = formData.get('grade') as string;
    const subject = formData.get('subject') as string;
    const term = formData.get('term') as string;

    if (!file || !type || !grade || !subject || !term) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('curricula')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600'
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('curricula')
      .getPublicUrl(fileName);

    // Insert curriculum metadata into database
    const { data: curriculum, error: dbError } = await supabaseAdmin
      .from('curricula')
      .insert({
        title: file.name.replace(`.${fileExt}`, ''),
        type,
        grade_level: grade,
        subject,
        term,
        source_url: publicUrl,
        uploaded_by: request.headers.get('x-user-id') || 'anonymous',
        school_id: request.headers.get('x-school-id') || 'default'
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    return NextResponse.json({
      success: true,
      curriculumId: curriculum.id
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload curriculum' },
      { status: 500 }
    );
  }
}