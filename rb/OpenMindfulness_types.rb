# frozen_string_literal: true

# Typed models for the OpenMindfulness SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Blog entity data model.
#
# @!attribute [rw] canonical_url
#   @return [String, nil]
#
# @!attribute [rw] excerpt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Blog = Struct.new(
  :canonical_url,
  :excerpt,
  :id,
  :tags,
  :title,
  keyword_init: true
)

# Request payload for Blog#load.
#
# @!attribute [rw] id
#   @return [String]
BlogLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Blog#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
BlogListMatch = Struct.new(
  :limit,
  :offset,
  :q,
  :tag,
  keyword_init: true
)

# Category entity data model.
#
# @!attribute [rw] glossary
#   @return [Hash, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] whitepapers
#   @return [Hash, nil]
Category = Struct.new(
  :glossary,
  :note,
  :whitepapers,
  keyword_init: true
)

# Request payload for Category#load.
#
# @!attribute [rw] glossary
#   @return [Hash, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] whitepapers
#   @return [Hash, nil]
CategoryLoadMatch = Struct.new(
  :glossary,
  :note,
  :whitepapers,
  keyword_init: true
)

# CitationDetail entity data model.
#
# @!attribute [rw] authors
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] journal
#   @return [String, nil]
#
# @!attribute [rw] key_finding
#   @return [String, nil]
#
# @!attribute [rw] limitations
#   @return [String, nil]
#
# @!attribute [rw] related_posts
#   @return [Array, nil]
#
# @!attribute [rw] related_terms
#   @return [Array, nil]
#
# @!attribute [rw] sample_size
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] study_type
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
CitationDetail = Struct.new(
  :authors,
  :id,
  :journal,
  :key_finding,
  :limitations,
  :related_posts,
  :related_terms,
  :sample_size,
  :slug,
  :source_url,
  :study_type,
  :summary,
  :title,
  :topic,
  :type,
  :updated_at,
  :year,
  keyword_init: true
)

# Request payload for CitationDetail#load.
#
# @!attribute [rw] slug
#   @return [String]
CitationDetailLoadMatch = Struct.new(
  :slug,
  keyword_init: true
)

# Request payload for CitationDetail#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] study_type
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [String, nil]
CitationDetailListMatch = Struct.new(
  :limit,
  :offset,
  :study_type,
  :topic,
  keyword_init: true
)

# GameDetail entity data model.
#
# @!attribute [rw] age_max
#   @return [Integer, nil]
#
# @!attribute [rw] age_min
#   @return [Integer, nil]
#
# @!attribute [rw] api_id
#   @return [String, nil]
#
# @!attribute [rw] audiences
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] duration_minutes
#   @return [Integer, nil]
#
# @!attribute [rw] free
#   @return [Boolean, nil]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] keywords
#   @return [Array, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
GameDetail = Struct.new(
  :age_max,
  :age_min,
  :api_id,
  :audiences,
  :description,
  :duration_minutes,
  :free,
  :icon,
  :id,
  :keywords,
  :skills,
  :slug,
  :tag,
  :title,
  :type,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for GameDetail#load.
#
# @!attribute [rw] slug
#   @return [String]
GameDetailLoadMatch = Struct.new(
  :slug,
  keyword_init: true
)

# Request payload for GameDetail#list.
#
# @!attribute [rw] audience
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] skill
#   @return [String, nil]
GameDetailListMatch = Struct.new(
  :audience,
  :limit,
  :offset,
  :skill,
  keyword_init: true
)

# Glossary entity data model.
#
# @!attribute [rw] also_known_as
#   @return [Array, nil]
#
# @!attribute [rw] etymology
#   @return [String, nil]
#
# @!attribute [rw] extended_explanation
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] pillar
#   @return [String, nil]
#
# @!attribute [rw] related_posts
#   @return [Array, nil]
#
# @!attribute [rw] related_terms
#   @return [Array, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
Glossary = Struct.new(
  :also_known_as,
  :etymology,
  :extended_explanation,
  :id,
  :pillar,
  :related_posts,
  :related_terms,
  :slug,
  :summary,
  :title,
  :type,
  :updated_at,
  keyword_init: true
)

# Request payload for Glossary#load.
#
# @!attribute [rw] id
#   @return [String]
GlossaryLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Glossary#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] pillar
#   @return [String, nil]
GlossaryListMatch = Struct.new(
  :limit,
  :offset,
  :pillar,
  keyword_init: true
)

# Health entity data model.
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Health = Struct.new(
  :status,
  :time,
  :version,
  keyword_init: true
)

# Request payload for Health#load.
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
HealthLoadMatch = Struct.new(
  :status,
  :time,
  :version,
  keyword_init: true
)

# PanchaVikasResource entity data model.
#
# @!attribute [rw] download_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
PanchaVikasResource = Struct.new(
  :download_url,
  :id,
  :source_url,
  :summary,
  :title,
  :type,
  keyword_init: true
)

# Request payload for PanchaVikasResource#list.
#
# @!attribute [rw] download_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
PanchaVikasResourceListMatch = Struct.new(
  :download_url,
  :id,
  :source_url,
  :summary,
  :title,
  :type,
  keyword_init: true
)

# PodcastEpisodeDetail entity data model.
#
# @!attribute [rw] alternate_language_id
#   @return [String, nil]
#
# @!attribute [rw] audience
#   @return [String, nil]
#
# @!attribute [rw] duration_iso
#   @return [String, nil]
#
# @!attribute [rw] duration_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] episode_number
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] key_question
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] season_number
#   @return [Integer, nil]
#
# @!attribute [rw] season_title
#   @return [String, nil]
#
# @!attribute [rw] short_title
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] youtube_url
#   @return [String, nil]
PodcastEpisodeDetail = Struct.new(
  :alternate_language_id,
  :audience,
  :duration_iso,
  :duration_seconds,
  :episode_number,
  :id,
  :key_question,
  :language,
  :release_date,
  :season_number,
  :season_title,
  :short_title,
  :slug,
  :summary,
  :title,
  :type,
  :updated_at,
  :url,
  :youtube_url,
  keyword_init: true
)

# Request payload for PodcastEpisodeDetail#load.
#
# @!attribute [rw] id
#   @return [String]
PodcastEpisodeDetailLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for PodcastEpisodeDetail#list.
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] season
#   @return [Integer, nil]
PodcastEpisodeDetailListMatch = Struct.new(
  :lang,
  :limit,
  :offset,
  :season,
  keyword_init: true
)

# Practice entity data model.
#
# @!attribute [rw] audio_url
#   @return [String, nil]
#
# @!attribute [rw] canonical_url
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] excerpt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] read_time_minutes
#   @return [Integer, nil]
#
# @!attribute [rw] related_practices
#   @return [Array, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] track_id
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
Practice = Struct.new(
  :audio_url,
  :canonical_url,
  :category,
  :excerpt,
  :id,
  :read_time_minutes,
  :related_practices,
  :slug,
  :title,
  :track_id,
  :type,
  :updated_at,
  keyword_init: true
)

# Request payload for Practice#load.
#
# @!attribute [rw] id
#   @return [String]
PracticeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Practice#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
PracticeListMatch = Struct.new(
  :category,
  :limit,
  :offset,
  keyword_init: true
)

# Resource entity data model.
#
# @!attribute [rw] access
#   @return [String, nil]
#
# @!attribute [rw] age_max
#   @return [Integer, nil]
#
# @!attribute [rw] age_min
#   @return [Integer, nil]
#
# @!attribute [rw] audiences
#   @return [Array, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] duration_minutes
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
Resource = Struct.new(
  :access,
  :age_max,
  :age_min,
  :audiences,
  :category,
  :duration_minutes,
  :id,
  :skills,
  :slug,
  :source_url,
  :summary,
  :tags,
  :title,
  :type,
  :updated_at,
  keyword_init: true
)

# Request payload for Resource#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
ResourceListMatch = Struct.new(
  :limit,
  :offset,
  :q,
  keyword_init: true
)

