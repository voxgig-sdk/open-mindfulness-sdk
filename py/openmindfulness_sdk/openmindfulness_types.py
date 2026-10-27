# Typed models for the OpenMindfulness SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Blog(TypedDict, total=False):
    canonical_url: str
    excerpt: str
    id: str
    tags: list
    title: str


class BlogLoadMatch(TypedDict):
    id: str


class BlogListMatch(TypedDict, total=False):
    limit: int
    offset: int
    q: str
    tag: str


class Category(TypedDict, total=False):
    glossary: dict
    note: str
    whitepapers: dict


class CategoryLoadMatch(TypedDict, total=False):
    glossary: dict
    note: str
    whitepapers: dict


class CitationDetail(TypedDict, total=False):
    authors: str
    id: str
    journal: str
    key_finding: str
    limitations: str
    related_posts: list
    related_terms: list
    sample_size: str
    slug: str
    source_url: str
    study_type: str
    summary: str
    title: str
    topic: str
    type: str
    updated_at: str
    year: int


class CitationDetailLoadMatch(TypedDict):
    slug: str


class CitationDetailListMatch(TypedDict, total=False):
    limit: int
    offset: int
    study_type: str
    topic: str


class GameDetail(TypedDict, total=False):
    age_max: int
    age_min: int
    api_id: str
    audiences: list
    description: str
    duration_minutes: int
    free: bool
    icon: str
    id: str
    keywords: list
    skills: list
    slug: str
    tag: str
    title: str
    type: str
    updated_at: str
    url: str


class GameDetailLoadMatch(TypedDict):
    slug: str


class GameDetailListMatch(TypedDict, total=False):
    audience: str
    limit: int
    offset: int
    skill: str


class Glossary(TypedDict, total=False):
    also_known_as: list
    etymology: str
    extended_explanation: list
    id: str
    pillar: str
    related_posts: list
    related_terms: list
    slug: str
    summary: str
    title: str
    type: str
    updated_at: str


class GlossaryLoadMatch(TypedDict):
    id: str


class GlossaryListMatch(TypedDict, total=False):
    limit: int
    offset: int
    pillar: str


class Health(TypedDict, total=False):
    status: str
    time: str
    version: str


class HealthLoadMatch(TypedDict, total=False):
    status: str
    time: str
    version: str


class PanchaVikasResource(TypedDict, total=False):
    download_url: str
    id: str
    source_url: str
    summary: str
    title: str
    type: str


class PanchaVikasResourceListMatch(TypedDict, total=False):
    download_url: str
    id: str
    source_url: str
    summary: str
    title: str
    type: str


class PodcastEpisodeDetail(TypedDict, total=False):
    alternate_language_id: str
    audience: str
    duration_iso: str
    duration_seconds: int
    episode_number: int
    id: str
    key_question: str
    language: str
    release_date: str
    season_number: int
    season_title: str
    short_title: str
    slug: str
    summary: str
    title: str
    type: str
    updated_at: str
    url: str
    youtube_url: str


class PodcastEpisodeDetailLoadMatch(TypedDict):
    id: str


class PodcastEpisodeDetailListMatch(TypedDict, total=False):
    lang: str
    limit: int
    offset: int
    season: int


class Practice(TypedDict, total=False):
    audio_url: str
    canonical_url: str
    category: str
    excerpt: str
    id: str
    read_time_minutes: int
    related_practices: list
    slug: str
    title: str
    track_id: str
    type: str
    updated_at: str


class PracticeLoadMatch(TypedDict):
    id: str


class PracticeListMatch(TypedDict, total=False):
    category: str
    limit: int
    offset: int


class Resource(TypedDict, total=False):
    access: str
    age_max: int
    age_min: int
    audiences: list
    category: str
    duration_minutes: int
    id: str
    skills: list
    slug: str
    source_url: str
    summary: str
    tags: list
    title: str
    type: str
    updated_at: str


class ResourceListMatchRequired(TypedDict):
    q: str


class ResourceListMatch(ResourceListMatchRequired, total=False):
    limit: int
    offset: int
