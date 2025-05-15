export interface Episode {
    id: number
    title: string
    description: string
    audio_url: string
    transcription: string | null
    user_id: number
    created_at: Date
  }
  