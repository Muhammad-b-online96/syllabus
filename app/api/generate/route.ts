import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateLessonPlan } from '@/lib/ollama';

export async function POST(request: Request) {
  try {
    const { curriculumId, chunkId, extraNotes } = await request.json();

    if (!curriculumId || !chunkId) {
      return NextResponse.json(
        { error: 'Curriculum ID and chunk ID are required' },
        { status: 400 }
      );
    }

    // Fetch curriculum and chunk data
    const { data: chunk, error: chunkError } = await supabaseAdmin
      .from('curriculum_chunks')
      .select(`
        content,
        curricula (
          title,
          subject,
          grade_level,
          term
        )
      `)
      .eq('id', chunkId)
      .single();

    if (chunkError || !chunk) {
      throw new Error('Chunk not found');
    }

    // Build prompt for the AI
    const prompt = `
      Create a detailed lesson plan based on the following curriculum content:
      
      Subject: ${chunk.curricula.subject}
      Grade Level: ${chunk.curricula.grade_level}
      Term: ${chunk.curricula.term}
      
      Content:
      ${chunk.content}
      
      ${extraNotes ? `Additional Notes:\n${extraNotes}` : ''}
      
      Generate a structured lesson plan with:
      1. Title
      2. Learning Objectives (3-5)
      3. Required Materials
      4. Procedure (step-by-step with timing)
      5. Assessment Strategy
      6. Homework/Follow-up
      
      Format the response as JSON.
    `;

    // Generate lesson plan using Ollama
    const lessonPlanContent = await generateLessonPlan(prompt);
    
    // Parse the response and store in database
    const lessonPlan = JSON.parse(lessonPlanContent);
    
    const { data: savedPlan, error: saveError } = await supabaseAdmin
      .from('lesson_plans')
      .insert({
        curriculum_id: curriculumId,
        chunk_id: chunkId,
        title: lessonPlan.title,
        objectives: lessonPlan.objectives,
        materials: lessonPlan.materials,
        procedure: lessonPlan.procedure,
        assessment: lessonPlan.assessment,
        homework: lessonPlan.homework
      })
      .select()
      .single();

    if (saveError) {
      throw saveError;
    }

    return NextResponse.json({
      success: true,
      plan: savedPlan
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate lesson plan' },
      { status: 500 }
    );
  }
}