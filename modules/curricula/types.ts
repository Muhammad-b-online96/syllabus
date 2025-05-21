export interface Curriculum {
  id: string;
  title: string;
  subject: string;
  grade_level: string;
  term: string;
  school_id: string;
  uploaded_by: string;
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface CurriculumChunk {
  id: string;
  curriculum_id: string;
  content: string;
  embedding: number[];
  sequence: number;
  created_at: string;
}

export interface LessonPlan {
  id: string;
  curriculum_id: string;
  chunk_id: string;
  title: string;
  objectives: string[];
  materials: string[];
  procedure: {
    step: number;
    duration: string;
    activity: string;
    description: string;
  }[];
  assessment: string;
  homework: string;
  created_at: string;
  updated_at: string;
}

export interface UploadCurriculumPayload {
  file: File;
  type: string;
  grade: string;
  subject: string;
  term: string;
}