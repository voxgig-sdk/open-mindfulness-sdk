"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "blog",
        "accessor": "Blog",
        "op": "list",
        "method": "GET",
        "path": "/v1/blog",
        "args": [],
        "select": {
            "limit": 20,
            "offset": 0,
            "q": "v1",
            "tag": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "tag",
            "q"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "q",
                "wire": "q"
            },
            {
                "name": "tag",
                "wire": "tag"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "title": "Mindfulness for Anxiety: A Complete Guide",
                    "excerpt": "A practical, evidence-informed guide to using mindfulness for anxiety.",
                    "tags": [
                        "mindfulness",
                        "anxiety"
                    ],
                    "canonical_url": "https://www.theholisticcare.com/blog/mindfulness-for-anxiety"
                }
            ],
            "pagination": {
                "limit": 1,
                "offset": 1,
                "total": 1
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "blog",
        "accessor": "Blog",
        "op": "load",
        "method": "GET",
        "path": "/v1/blog/{slug}",
        "args": [
            {
                "name": "id",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "title": "Mindfulness for Anxiety: A Complete Guide",
                "excerpt": "A practical, evidence-informed guide to using mindfulness for anxiety.",
                "tags": [
                    "mindfulness",
                    "anxiety"
                ],
                "canonical_url": "https://www.theholisticcare.com/blog/mindfulness-for-anxiety"
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "category",
        "accessor": "Category",
        "op": "load",
        "method": "GET",
        "path": "/v1/categories",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "whitepapers": {
                    "topics": [
                        "mindfulness",
                        "meditation",
                        "yoga"
                    ]
                },
                "glossary": {
                    "pillars": [
                        "nonduality",
                        "yoga",
                        "meditation"
                    ]
                },
                "note": "Interim taxonomy covering only fields that exist today."
            }
        },
        "idField": "id"
    },
    {
        "entity": "citation_detail",
        "accessor": "CitationDetail",
        "op": "list",
        "method": "GET",
        "path": "/v1/whitepapers",
        "args": [],
        "select": {
            "limit": 20,
            "offset": 0,
            "study_type": "v1",
            "topic": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "topic",
            "study_type"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "study_type",
                "wire": "study_type"
            },
            {
                "name": "topic",
                "wire": "topic"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "research:goyal-2014-meditation-programs",
                    "slug": "goyal-2014-meditation-programs",
                    "type": "research_citation",
                    "title": "Meditation Programs for Psychological Stress and Well-Being",
                    "authors": "Goyal M, Singh S, Sibinga EMS, et al.",
                    "year": 2014,
                    "journal": "JAMA Internal Medicine",
                    "study_type": "meta-analysis",
                    "sample_size": "3,515 participants across 47 trials",
                    "topic": "mindfulness",
                    "summary": "A meta-analysis of 47 randomized trials of meditation programs for psychological stress and well-being.",
                    "key_finding": "Moderate evidence of improved anxiety, depression, and pain outcomes.",
                    "limitations": "Most trials had a moderate risk of bias and few compared meditation with active treatments.",
                    "source_url": "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1809754",
                    "updated_at": "2026-09-01T00:00:00.000Z"
                }
            ],
            "pagination": {
                "limit": 1,
                "offset": 1,
                "total": 1
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "citation_detail",
        "accessor": "CitationDetail",
        "op": "load",
        "method": "GET",
        "path": "/v1/whitepapers/{slug}",
        "args": [
            {
                "name": "slug",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "research:goyal-2014-meditation-programs",
                "slug": "goyal-2014-meditation-programs",
                "type": "research_citation",
                "title": "Meditation Programs for Psychological Stress and Well-Being",
                "authors": "Goyal M, Singh S, Sibinga EMS, et al.",
                "year": 2014,
                "journal": "JAMA Internal Medicine",
                "study_type": "meta-analysis",
                "sample_size": "3,515 participants across 47 trials",
                "topic": "mindfulness",
                "summary": "A meta-analysis of 47 randomized trials of meditation programs for psychological stress and well-being.",
                "key_finding": "Moderate evidence of improved anxiety, depression, and pain outcomes.",
                "limitations": "Most trials had a moderate risk of bias and few compared meditation with active treatments.",
                "source_url": "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1809754",
                "updated_at": "2026-09-01T00:00:00.000Z",
                "related_posts": [
                    {
                        "slug": "x",
                        "title": "x"
                    }
                ],
                "related_terms": [
                    {
                        "slug": "x",
                        "title": "x"
                    }
                ]
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "game_detail",
        "accessor": "GameDetail",
        "op": "list",
        "method": "GET",
        "path": "/v1/mindfulness-games",
        "args": [],
        "select": {
            "audience": "v1",
            "limit": 20,
            "offset": 0,
            "skill": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "audience",
            "skill"
        ],
        "queryArgs": [
            {
                "name": "audience",
                "wire": "audience"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "skill",
                "wire": "skill"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "MG-001",
                    "slug": "breathing-buddy",
                    "type": "mindfulness_game",
                    "api_id": "MG-001",
                    "title": "Breathing Buddy",
                    "url": "https://www.theholisticcare.com/games/breathing-buddy.html",
                    "icon": "🫧",
                    "tag": "Breathing",
                    "description": "A gentle breathing pacer for young children.",
                    "free": true,
                    "keywords": [
                        "breathing",
                        "calm",
                        "kids"
                    ],
                    "audiences": [
                        "children"
                    ],
                    "age_min": 5,
                    "age_max": 12,
                    "duration_minutes": 5,
                    "skills": [
                        "breathwork"
                    ],
                    "updated_at": "2026-09-24T00:00:00.000Z"
                }
            ],
            "pagination": {
                "limit": 1,
                "offset": 1,
                "total": 1
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "game_detail",
        "accessor": "GameDetail",
        "op": "load",
        "method": "GET",
        "path": "/v1/mindfulness-games/{slug}",
        "args": [
            {
                "name": "slug",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "MG-001",
                "slug": "breathing-buddy",
                "type": "mindfulness_game",
                "api_id": "MG-001",
                "title": "Breathing Buddy",
                "url": "https://www.theholisticcare.com/games/breathing-buddy.html",
                "icon": "🫧",
                "tag": "Breathing",
                "description": "A gentle breathing pacer for young children.",
                "free": true,
                "keywords": [
                    "breathing",
                    "calm",
                    "kids"
                ],
                "audiences": [
                    "children"
                ],
                "age_min": 5,
                "age_max": 12,
                "duration_minutes": 5,
                "skills": [
                    "breathwork"
                ],
                "updated_at": "2026-09-24T00:00:00.000Z"
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "glossary",
        "accessor": "Glossary",
        "op": "list",
        "method": "GET",
        "path": "/v1/glossary",
        "args": [],
        "select": {
            "limit": 20,
            "offset": 0,
            "pillar": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "pillar"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "pillar",
                "wire": "pillar"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "glossary:pranayama",
                    "slug": "pranayama",
                    "type": "glossary_term",
                    "title": "Pranayama",
                    "pillar": "yoga",
                    "summary": "The yogic practice of consciously regulating the breath.",
                    "etymology": "Sanskrit: prana (life force/breath) + ayama (extension, restraint).",
                    "also_known_as": [
                        "breathwork",
                        "breath control"
                    ],
                    "updated_at": "2026-09-01T00:00:00.000Z"
                }
            ],
            "pagination": {
                "limit": 1,
                "offset": 1,
                "total": 1
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "glossary",
        "accessor": "Glossary",
        "op": "load",
        "method": "GET",
        "path": "/v1/glossary/{slug}",
        "args": [
            {
                "name": "id",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "glossary:pranayama",
                "slug": "pranayama",
                "type": "glossary_term",
                "title": "Pranayama",
                "pillar": "yoga",
                "summary": "The yogic practice of consciously regulating the breath.",
                "etymology": "Sanskrit: prana (life force/breath) + ayama (extension, restraint).",
                "also_known_as": [
                    "breathwork",
                    "breath control"
                ],
                "updated_at": "2026-09-01T00:00:00.000Z",
                "extended_explanation": [
                    {}
                ],
                "related_terms": [
                    {
                        "slug": "x",
                        "title": "x"
                    }
                ],
                "related_posts": [
                    {
                        "slug": "x",
                        "title": "x"
                    }
                ]
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "health",
        "accessor": "Health",
        "op": "load",
        "method": "GET",
        "path": "/health",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "status": "ok",
            "version": "v1",
            "time": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "pancha_vikas_resource",
        "accessor": "PanchaVikasResource",
        "op": "list",
        "method": "GET",
        "path": "/v1/panchavikas/resources",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "PV-pathway-prithvi",
                    "type": "panchavikas_pathway",
                    "title": "Prithvi",
                    "summary": "Ground & Grow: Body, senses, stability, health, independence and nature connection.",
                    "source_url": "https://www.theholisticcare.com/panchavikas"
                }
            ],
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "podcast_episode_detail",
        "accessor": "PodcastEpisodeDetail",
        "op": "list",
        "method": "GET",
        "path": "/v1/podcast/episodes",
        "args": [],
        "select": {
            "lang": "v1",
            "limit": 20,
            "offset": 0,
            "season": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "lang",
            "season"
        ],
        "queryArgs": [
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "season",
                "wire": "season"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "PC-S02E03-EN",
                    "type": "podcast_episode",
                    "slug": "x",
                    "title": "x",
                    "short_title": "x",
                    "language": "en",
                    "season_number": 1,
                    "season_title": "x",
                    "episode_number": 1,
                    "summary": "x",
                    "key_question": "x",
                    "audience": "x",
                    "duration_iso": "PT1M42S",
                    "duration_seconds": 1,
                    "release_date": "2026-01-01",
                    "url": "x",
                    "youtube_url": "x",
                    "alternate_language_id": "x",
                    "updated_at": "2026-01-01T00:00:00Z"
                }
            ],
            "pagination": {
                "limit": 1,
                "offset": 1,
                "total": 1
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "podcast_episode_detail",
        "accessor": "PodcastEpisodeDetail",
        "op": "load",
        "method": "GET",
        "path": "/v1/podcast/episodes/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "PC-S02E03-EN",
                "type": "podcast_episode",
                "slug": "x",
                "title": "x",
                "short_title": "x",
                "language": "en",
                "season_number": 1,
                "season_title": "x",
                "episode_number": 1,
                "summary": "x",
                "key_question": "x",
                "audience": "x",
                "duration_iso": "PT1M42S",
                "duration_seconds": 1,
                "release_date": "2026-01-01",
                "url": "x",
                "youtube_url": "x",
                "alternate_language_id": "x",
                "updated_at": "2026-01-01T00:00:00Z"
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "practice",
        "accessor": "Practice",
        "op": "list",
        "method": "GET",
        "path": "/v1/practices",
        "args": [],
        "select": {
            "category": "v1",
            "limit": 20,
            "offset": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "category"
        ],
        "queryArgs": [
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "SL-041",
                    "slug": "letting-go-of-the-day",
                    "type": "practice",
                    "track_id": "SL-041",
                    "title": "Letting Go of the Day",
                    "category": "sleep",
                    "excerpt": "A short wind-down practice for releasing the events of the day before sleep.",
                    "audio_url": "https://files.theholisticcare.com/stillness-library-free/letting-go-of-the-day.mp3",
                    "read_time_minutes": 6,
                    "canonical_url": "https://www.theholisticcare.com/stillness-library/letting-go-of-the-day",
                    "updated_at": "2026-09-05T00:00:00.000Z"
                }
            ],
            "pagination": {
                "limit": 1,
                "offset": 1,
                "total": 1
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "practice",
        "accessor": "Practice",
        "op": "load",
        "method": "GET",
        "path": "/v1/practices/{slug}",
        "args": [
            {
                "name": "id",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "SL-041",
                "slug": "letting-go-of-the-day",
                "type": "practice",
                "track_id": "SL-041",
                "title": "Letting Go of the Day",
                "category": "sleep",
                "excerpt": "A short wind-down practice for releasing the events of the day before sleep.",
                "audio_url": "https://files.theholisticcare.com/stillness-library-free/letting-go-of-the-day.mp3",
                "read_time_minutes": 6,
                "canonical_url": "https://www.theholisticcare.com/stillness-library/letting-go-of-the-day",
                "updated_at": "2026-09-05T00:00:00.000Z",
                "related_practices": [
                    {
                        "slug": "x",
                        "title": "x"
                    }
                ]
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "resource",
        "accessor": "Resource",
        "op": "list",
        "method": "GET",
        "path": "/v1/search",
        "args": [],
        "select": {
            "q": "v1",
            "limit": 20,
            "offset": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "q",
            "limit",
            "offset"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "q",
                "wire": "q"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "MG-001",
                    "title": "Breathing Buddy",
                    "slug": "breathing-buddy",
                    "type": "mindfulness_game",
                    "summary": "A gentle breathing pacer for young children.",
                    "category": "Breathing",
                    "tags": [
                        "breathing",
                        "calm",
                        "kids"
                    ],
                    "audiences": [
                        "children"
                    ],
                    "age_min": 5,
                    "age_max": 12,
                    "duration_minutes": 5,
                    "skills": [
                        "breathwork"
                    ],
                    "access": "free",
                    "source_url": "https://www.theholisticcare.com/games/breathing-buddy.html",
                    "updated_at": "2026-09-24T00:00:00.000Z"
                }
            ],
            "pagination": {
                "limit": 1,
                "offset": 1,
                "total": 1
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    },
    {
        "entity": "resource",
        "accessor": "Resource",
        "op": "list",
        "method": "GET",
        "path": "/v1/resources",
        "args": [],
        "select": {
            "age_max": "v1",
            "age_min": "v1",
            "audience": "v1",
            "category": "v1",
            "limit": 20,
            "offset": 0,
            "skill": "v1",
            "type": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "type",
            "category",
            "audience",
            "skill",
            "age_min",
            "age_max"
        ],
        "queryArgs": [
            {
                "name": "age_max",
                "wire": "age_max"
            },
            {
                "name": "age_min",
                "wire": "age_min"
            },
            {
                "name": "audience",
                "wire": "audience"
            },
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "skill",
                "wire": "skill"
            },
            {
                "name": "type",
                "wire": "type"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "MG-001",
                    "title": "Breathing Buddy",
                    "slug": "breathing-buddy",
                    "type": "mindfulness_game",
                    "summary": "A gentle breathing pacer for young children.",
                    "category": "Breathing",
                    "tags": [
                        "breathing",
                        "calm",
                        "kids"
                    ],
                    "audiences": [
                        "children"
                    ],
                    "age_min": 5,
                    "age_max": 12,
                    "duration_minutes": 5,
                    "skills": [
                        "breathwork"
                    ],
                    "access": "free",
                    "source_url": "https://www.theholisticcare.com/games/breathing-buddy.html",
                    "updated_at": "2026-09-24T00:00:00.000Z"
                }
            ],
            "pagination": {
                "limit": 1,
                "offset": 1,
                "total": 1
            },
            "meta": {
                "generated_at": "2026-01-01T00:00:00Z",
                "provider": "The Holistic Care",
                "source": "https://www.theholisticcare.com"
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map