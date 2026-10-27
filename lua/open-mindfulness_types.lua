-- Typed models for the OpenMindfulness SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Blog
---@field canonical_url? string
---@field excerpt? string
---@field id? string
---@field tags? table
---@field title? string

---@class BlogLoadMatch
---@field id string

---@class BlogListMatch
---@field limit? number
---@field offset? number
---@field q? string
---@field tag? string

---@class Category
---@field glossary? table
---@field note? string
---@field whitepapers? table

---@class CategoryLoadMatch
---@field glossary? table
---@field note? string
---@field whitepapers? table

---@class CitationDetail
---@field authors? string
---@field id? string
---@field journal? string
---@field key_finding? string
---@field limitations? string
---@field related_posts? table
---@field related_terms? table
---@field sample_size? string
---@field slug? string
---@field source_url? string
---@field study_type? string
---@field summary? string
---@field title? string
---@field topic? string
---@field type? string
---@field updated_at? string
---@field year? number

---@class CitationDetailLoadMatch
---@field slug string

---@class CitationDetailListMatch
---@field limit? number
---@field offset? number
---@field study_type? string
---@field topic? string

---@class GameDetail
---@field age_max? number
---@field age_min? number
---@field api_id? string
---@field audiences? table
---@field description? string
---@field duration_minutes? number
---@field free? boolean
---@field icon? string
---@field id? string
---@field keywords? table
---@field skills? table
---@field slug? string
---@field tag? string
---@field title? string
---@field type? string
---@field updated_at? string
---@field url? string

---@class GameDetailLoadMatch
---@field slug string

---@class GameDetailListMatch
---@field audience? string
---@field limit? number
---@field offset? number
---@field skill? string

---@class Glossary
---@field also_known_as? table
---@field etymology? string
---@field extended_explanation? table
---@field id? string
---@field pillar? string
---@field related_posts? table
---@field related_terms? table
---@field slug? string
---@field summary? string
---@field title? string
---@field type? string
---@field updated_at? string

---@class GlossaryLoadMatch
---@field id string

---@class GlossaryListMatch
---@field limit? number
---@field offset? number
---@field pillar? string

---@class Health
---@field status? string
---@field time? string
---@field version? string

---@class HealthLoadMatch
---@field status? string
---@field time? string
---@field version? string

---@class PanchaVikasResource
---@field download_url? string
---@field id? string
---@field source_url? string
---@field summary? string
---@field title? string
---@field type? string

---@class PanchaVikasResourceListMatch
---@field download_url? string
---@field id? string
---@field source_url? string
---@field summary? string
---@field title? string
---@field type? string

---@class PodcastEpisodeDetail
---@field alternate_language_id? string
---@field audience? string
---@field duration_iso? string
---@field duration_seconds? number
---@field episode_number? number
---@field id? string
---@field key_question? string
---@field language? string
---@field release_date? string
---@field season_number? number
---@field season_title? string
---@field short_title? string
---@field slug? string
---@field summary? string
---@field title? string
---@field type? string
---@field updated_at? string
---@field url? string
---@field youtube_url? string

---@class PodcastEpisodeDetailLoadMatch
---@field id string

---@class PodcastEpisodeDetailListMatch
---@field lang? string
---@field limit? number
---@field offset? number
---@field season? number

---@class Practice
---@field audio_url? string
---@field canonical_url? string
---@field category? string
---@field excerpt? string
---@field id? string
---@field read_time_minutes? number
---@field related_practices? table
---@field slug? string
---@field title? string
---@field track_id? string
---@field type? string
---@field updated_at? string

---@class PracticeLoadMatch
---@field id string

---@class PracticeListMatch
---@field category? string
---@field limit? number
---@field offset? number

---@class Resource
---@field access? string
---@field age_max? number
---@field age_min? number
---@field audiences? table
---@field category? string
---@field duration_minutes? number
---@field id? string
---@field skills? table
---@field slug? string
---@field source_url? string
---@field summary? string
---@field tags? table
---@field title? string
---@field type? string
---@field updated_at? string

---@class ResourceListMatch
---@field limit? number
---@field offset? number
---@field q string

local M = {}

return M
