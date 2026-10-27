<?php
declare(strict_types=1);

// Typed models for the OpenMindfulness SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Blog entity data model. */
class Blog
{
    public ?string $canonical_url = null;
    public ?string $excerpt = null;
    public ?string $id = null;
    public ?array $tags = null;
    public ?string $title = null;
}

/** Request payload for Blog#load. */
class BlogLoadMatch
{
    public string $id;
}

/** Request payload for Blog#list. */
class BlogListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $q = null;
    public ?string $tag = null;
}

/** Category entity data model. */
class Category
{
    public ?array $glossary = null;
    public ?string $note = null;
    public ?array $whitepapers = null;
}

/** Request payload for Category#load. */
class CategoryLoadMatch
{
    public ?array $glossary = null;
    public ?string $note = null;
    public ?array $whitepapers = null;
}

/** CitationDetail entity data model. */
class CitationDetail
{
    public ?string $authors = null;
    public ?string $id = null;
    public ?string $journal = null;
    public ?string $key_finding = null;
    public ?string $limitations = null;
    public ?array $related_posts = null;
    public ?array $related_terms = null;
    public ?string $sample_size = null;
    public ?string $slug = null;
    public ?string $source_url = null;
    public ?string $study_type = null;
    public ?string $summary = null;
    public ?string $title = null;
    public ?string $topic = null;
    public ?string $type = null;
    public ?string $updated_at = null;
    public ?int $year = null;
}

/** Request payload for CitationDetail#load. */
class CitationDetailLoadMatch
{
    public string $slug;
}

/** Request payload for CitationDetail#list. */
class CitationDetailListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $study_type = null;
    public ?string $topic = null;
}

/** GameDetail entity data model. */
class GameDetail
{
    public ?int $age_max = null;
    public ?int $age_min = null;
    public ?string $api_id = null;
    public ?array $audiences = null;
    public ?string $description = null;
    public ?int $duration_minutes = null;
    public ?bool $free = null;
    public ?string $icon = null;
    public ?string $id = null;
    public ?array $keywords = null;
    public ?array $skills = null;
    public ?string $slug = null;
    public ?string $tag = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Request payload for GameDetail#load. */
class GameDetailLoadMatch
{
    public string $slug;
}

/** Request payload for GameDetail#list. */
class GameDetailListMatch
{
    public ?string $audience = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $skill = null;
}

/** Glossary entity data model. */
class Glossary
{
    public ?array $also_known_as = null;
    public ?string $etymology = null;
    public ?array $extended_explanation = null;
    public ?string $id = null;
    public ?string $pillar = null;
    public ?array $related_posts = null;
    public ?array $related_terms = null;
    public ?string $slug = null;
    public ?string $summary = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $updated_at = null;
}

/** Request payload for Glossary#load. */
class GlossaryLoadMatch
{
    public string $id;
}

/** Request payload for Glossary#list. */
class GlossaryListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $pillar = null;
}

/** Health entity data model. */
class Health
{
    public ?string $status = null;
    public ?string $time = null;
    public ?string $version = null;
}

/** Request payload for Health#load. */
class HealthLoadMatch
{
    public ?string $status = null;
    public ?string $time = null;
    public ?string $version = null;
}

/** PanchaVikasResource entity data model. */
class PanchaVikasResource
{
    public ?string $download_url = null;
    public ?string $id = null;
    public ?string $source_url = null;
    public ?string $summary = null;
    public ?string $title = null;
    public ?string $type = null;
}

/** Request payload for PanchaVikasResource#list. */
class PanchaVikasResourceListMatch
{
    public ?string $download_url = null;
    public ?string $id = null;
    public ?string $source_url = null;
    public ?string $summary = null;
    public ?string $title = null;
    public ?string $type = null;
}

/** PodcastEpisodeDetail entity data model. */
class PodcastEpisodeDetail
{
    public ?string $alternate_language_id = null;
    public ?string $audience = null;
    public ?string $duration_iso = null;
    public ?int $duration_seconds = null;
    public ?int $episode_number = null;
    public ?string $id = null;
    public ?string $key_question = null;
    public ?string $language = null;
    public ?string $release_date = null;
    public ?int $season_number = null;
    public ?string $season_title = null;
    public ?string $short_title = null;
    public ?string $slug = null;
    public ?string $summary = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $updated_at = null;
    public ?string $url = null;
    public ?string $youtube_url = null;
}

/** Request payload for PodcastEpisodeDetail#load. */
class PodcastEpisodeDetailLoadMatch
{
    public string $id;
}

/** Request payload for PodcastEpisodeDetail#list. */
class PodcastEpisodeDetailListMatch
{
    public ?string $lang = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?int $season = null;
}

/** Practice entity data model. */
class Practice
{
    public ?string $audio_url = null;
    public ?string $canonical_url = null;
    public ?string $category = null;
    public ?string $excerpt = null;
    public ?string $id = null;
    public ?int $read_time_minutes = null;
    public ?array $related_practices = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $track_id = null;
    public ?string $type = null;
    public ?string $updated_at = null;
}

/** Request payload for Practice#load. */
class PracticeLoadMatch
{
    public string $id;
}

/** Request payload for Practice#list. */
class PracticeListMatch
{
    public ?string $category = null;
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Resource entity data model. */
class ResourceType
{
    public ?string $access = null;
    public ?int $age_max = null;
    public ?int $age_min = null;
    public ?array $audiences = null;
    public ?string $category = null;
    public ?int $duration_minutes = null;
    public ?string $id = null;
    public ?array $skills = null;
    public ?string $slug = null;
    public ?string $source_url = null;
    public ?string $summary = null;
    public ?array $tags = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $updated_at = null;
}

/** Request payload for Resource#list. */
class ResourceListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
    public string $q;
}

