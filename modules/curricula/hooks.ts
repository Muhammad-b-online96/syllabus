import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Curriculum, CurriculumChunk, LessonPlan, UploadCurriculumPayload } from './types';

export function useUploadCurriculum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UploadCurriculumPayload) => {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload curriculum');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curricula'] });
    },
  });
}

export function useCurriculaList() {
  return useQuery({
    queryKey: ['curricula'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('curricula')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Curriculum[];
    },
  });
}

export function useChunks(curriculumId: string) {
  return useQuery({
    queryKey: ['chunks', curriculumId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('curriculum_chunks')
        .select('*')
        .eq('curriculum_id', curriculumId)
        .order('sequence');

      if (error) throw error;
      return data as CurriculumChunk[];
    },
  });
}

export function useGenerateLessonPlan() {
  return useMutation({
    mutationFn: async ({
      curriculumId,
      chunkId,
      extraNotes,
    }: {
      curriculumId: string;
      chunkId: string;
      extraNotes?: string;
    }) => {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curriculumId, chunkId, extraNotes }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate lesson plan');
      }

      return response.json();
    },
  });
}