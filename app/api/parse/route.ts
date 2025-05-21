import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import * as pdfjsLib from 'pdfjs-dist';
import { chunkText } from '@/lib/embeddings';

export const runtime = 'edge';

async function extractTextFromPDF(url: string): Promise<string> {
  const pdf = await pdfjsLib.getDocument(url).promise;
  let text = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
    text += pageText + '\n';
  }
  
  return text;
}

export async function POST(request: Request) {
  try {
    const { curriculumId } = await request.json();

    if (!curriculumId) {
      return NextResponse.json(
        { error: 'Curriculum ID is required' },
        { status: 400 }
      );
    }

    // Get curriculum data
    const { data: curriculum, error: fetchError } = await supabaseAdmin
      .from('curricula')
      .select('source_url')
      .eq('id', curriculumId)
      .single();

    if (fetchError || !curriculum) {
      throw new Error('Curriculum not found');
    }

    // Extract text from PDF
    const text = await extractTextFromPDF(curriculum.source_url);
    const chunks = chunkText(text);

    // Insert chunks into database
    const chunkInserts = chunks.map((content, index) => ({
      curriculum_id: curriculumId,
      content,
      sequence: index + 1
    }));

    const { error: insertError } = await supabaseAdmin
      .from('curriculum_chunks')
      .insert(chunkInserts);

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Parse error:', error);
    return NextResponse.json(
      { error: 'Failed to parse curriculum' },
      { status: 500 }
    );
  }
}