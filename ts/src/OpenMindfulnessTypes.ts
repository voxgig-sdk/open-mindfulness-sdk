// Typed models for the OpenMindfulness SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Blog {
  canonical_url?: string
  excerpt?: string
  id?: string
  tags?: any[]
  title?: string
}

export interface BlogLoadMatch {
  id: string
}

export interface BlogListMatch {
  limit?: number
  offset?: number
  q?: string
  tag?: string
}

export interface Category {
  glossary?: Record<string, any>
  note?: string
  whitepapers?: Record<string, any>
}

export interface CategoryLoadMatch {
  glossary?: Record<string, any>
  note?: string
  whitepapers?: Record<string, any>
}

export interface CitationDetail {
  authors?: string
  id?: string
  journal?: string
  key_finding?: string
  limitations?: string
  related_posts?: any[]
  related_terms?: any[]
  sample_size?: string
  slug?: string
  source_url?: string
  study_type?: string
  summary?: string
  title?: string
  topic?: string
  type?: string
  updated_at?: string
  year?: number
}

export interface CitationDetailLoadMatch {
  slug: string
}

export interface CitationDetailListMatch {
  limit?: number
  offset?: number
  study_type?: string
  topic?: string
}

export interface GameDetail {
  age_max?: number
  age_min?: number
  api_id?: string
  audiences?: any[]
  description?: string
  duration_minutes?: number
  free?: boolean
  icon?: string
  id?: string
  keywords?: any[]
  skills?: any[]
  slug?: string
  tag?: string
  title?: string
  type?: string
  updated_at?: string
  url?: string
}

export interface GameDetailLoadMatch {
  slug: string
}

export interface GameDetailListMatch {
  audience?: string
  limit?: number
  offset?: number
  skill?: string
}

export interface Glossary {
  also_known_as?: any[]
  etymology?: string
  extended_explanation?: any[]
  id?: string
  pillar?: string
  related_posts?: any[]
  related_terms?: any[]
  slug?: string
  summary?: string
  title?: string
  type?: string
  updated_at?: string
}

export interface GlossaryLoadMatch {
  id: string
}

export interface GlossaryListMatch {
  limit?: number
  offset?: number
  pillar?: string
}

export interface Health {
  status?: string
  time?: string
  version?: string
}

export interface HealthLoadMatch {
  status?: string
  time?: string
  version?: string
}

export interface PanchaVikasResource {
  download_url?: string
  id?: string
  source_url?: string
  summary?: string
  title?: string
  type?: string
}

export interface PanchaVikasResourceListMatch {
  download_url?: string
  id?: string
  source_url?: string
  summary?: string
  title?: string
  type?: string
}

export interface PodcastEpisodeDetail {
  alternate_language_id?: string
  audience?: string
  duration_iso?: string
  duration_seconds?: number
  episode_number?: number
  id?: string
  key_question?: string
  language?: string
  release_date?: string
  season_number?: number
  season_title?: string
  short_title?: string
  slug?: string
  summary?: string
  title?: string
  type?: string
  updated_at?: string
  url?: string
  youtube_url?: string
}

export interface PodcastEpisodeDetailLoadMatch {
  id: string
}

export interface PodcastEpisodeDetailListMatch {
  lang?: string
  limit?: number
  offset?: number
  season?: number
}

export interface Practice {
  audio_url?: string
  canonical_url?: string
  category?: string
  excerpt?: string
  id?: string
  read_time_minutes?: number
  related_practices?: any[]
  slug?: string
  title?: string
  track_id?: string
  type?: string
  updated_at?: string
}

export interface PracticeLoadMatch {
  id: string
}

export interface PracticeListMatch {
  category?: string
  limit?: number
  offset?: number
}

export interface Resource {
  access?: string
  age_max?: number
  age_min?: number
  audiences?: any[]
  category?: string
  duration_minutes?: number
  id?: string
  skills?: any[]
  slug?: string
  source_url?: string
  summary?: string
  tags?: any[]
  title?: string
  type?: string
  updated_at?: string
}

export interface ResourceListMatch {
  limit?: number
  offset?: number
  q: string
}

