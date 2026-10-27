package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OpenMindfulness",
			"slug": "open-mindfulness",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.theholisticcare.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"blog": map[string]any{},
				"category": map[string]any{},
				"citation_detail": map[string]any{},
				"game_detail": map[string]any{},
				"glossary": map[string]any{},
				"health": map[string]any{},
				"pancha_vikas_resource": map[string]any{},
				"podcast_episode_detail": map[string]any{},
				"practice": map[string]any{},
				"resource": map[string]any{},
			},
		},
		"entity": map[string]any{
			"blog": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "canonical_url",
						"title": "Canonical Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "excerpt",
						"title": "Excerpt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"short": "Always an array, even when the post has no tags (never null).",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "blog",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/blog",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "blog",
									},
								},
								"parts": []any{
									"v1",
									"blog",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "tag",
											"orig": "tag",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/blog/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "blog",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"blog",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"category": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "glossary",
						"title": "Glossary",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "whitepapers",
						"title": "Whitepapers",
						"type": "`$OBJECT`",
					},
				},
				"name": "category",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/categories",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "categories",
									},
								},
								"parts": []any{
									"v1",
									"categories",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"citation_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "authors",
						"title": "Authors",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Deterministic public ID in the form \"research:<slug>\".",
					},
					map[string]any{
						"name": "journal",
						"title": "Journal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key_finding",
						"title": "Key Finding",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "limitations",
						"title": "Limitations",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "related_posts",
						"title": "Related Posts",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "related_terms",
						"title": "Related Terms",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "sample_size",
						"title": "Sample Size",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_url",
						"title": "Source Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "study_type",
						"title": "Study Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "topic",
						"title": "Topic",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "citation_detail",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/whitepapers",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "whitepapers",
									},
								},
								"parts": []any{
									"v1",
									"whitepapers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "study_type",
											"orig": "study_type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "topic",
											"orig": "topic",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/whitepapers/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "whitepapers",
									},
									map[string]any{
										"var": "slug",
									},
								},
								"parts": []any{
									"v1",
									"whitepapers",
									"{slug}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"game_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "age_max",
						"title": "Age Max",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "age_min",
						"title": "Age Min",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "api_id",
						"title": "Api Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "audiences",
						"title": "Audiences",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration_minutes",
						"title": "Duration Minutes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "free",
						"title": "Free",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The stable public game ID (same value as `api_id`), in the form \"MG-*\".",
					},
					map[string]any{
						"name": "keywords",
						"title": "Keywords",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "skills",
						"title": "Skills",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tag",
						"title": "Tag",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "game_detail",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/mindfulness-games",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "mindfulness-games",
									},
								},
								"parts": []any{
									"v1",
									"mindfulness-games",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "audience",
											"orig": "audience",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "skill",
											"orig": "skill",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/mindfulness-games/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "mindfulness-games",
									},
									map[string]any{
										"var": "slug",
									},
								},
								"parts": []any{
									"v1",
									"mindfulness-games",
									"{slug}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"glossary": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "also_known_as",
						"title": "Also Known As",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "etymology",
						"title": "Etymology",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "extended_explanation",
						"title": "Extended Explanation",
						"type": "`$ARRAY`",
						"short": "A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Deterministic public ID in the form \"glossary:<slug>\".",
					},
					map[string]any{
						"name": "pillar",
						"title": "Pillar",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "related_posts",
						"title": "Related Posts",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "related_terms",
						"title": "Related Terms",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "glossary",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/glossary",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "glossary",
									},
								},
								"parts": []any{
									"v1",
									"glossary",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pillar",
											"orig": "pillar",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/glossary/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "glossary",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"glossary",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"health": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "time",
						"title": "Time",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
					},
				},
				"name": "health",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/health",
								"segments": []any{
									map[string]any{
										"lit": "health",
									},
								},
								"parts": []any{
									"health",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"pancha_vikas_resource": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "download_url",
						"title": "Download Url",
						"type": "`$STRING`",
						"short": "Present only on the panchavikas_download item.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_url",
						"title": "Source Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "pancha_vikas_resource",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/panchavikas/resources",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "panchavikas",
									},
									map[string]any{
										"lit": "resources",
									},
								},
								"parts": []any{
									"v1",
									"panchavikas",
									"resources",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"podcast_episode_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alternate_language_id",
						"title": "Alternate Language Id",
						"type": "`$STRING`",
						"short": "The same episode in the other language.",
					},
					map[string]any{
						"name": "audience",
						"title": "Audience",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration_iso",
						"title": "Duration Iso",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration_seconds",
						"title": "Duration Seconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "episode_number",
						"title": "Episode Number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key_question",
						"title": "Key Question",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "release_date",
						"title": "Release Date",
						"type": "`$STRING`",
						"format": "date",
					},
					map[string]any{
						"name": "season_number",
						"title": "Season Number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "season_title",
						"title": "Season Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "short_title",
						"title": "Short Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
						"short": "The episode's short quick-answer summary.",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The episode page on theholisticcare.com.",
						"format": "uri",
					},
					map[string]any{
						"name": "youtube_url",
						"title": "Youtube Url",
						"type": "`$STRING`",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "podcast_episode_detail",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/podcast/episodes",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "podcast",
									},
									map[string]any{
										"lit": "episodes",
									},
								},
								"parts": []any{
									"v1",
									"podcast",
									"episodes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/podcast/episodes/{id}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "podcast",
									},
									map[string]any{
										"lit": "episodes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"podcast",
									"episodes",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"practice": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "audio_url",
						"title": "Audio Url",
						"type": "`$STRING`",
						"short": "Direct link to the MP3 file (Cloudflare R2).",
					},
					map[string]any{
						"name": "canonical_url",
						"title": "Canonical Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "excerpt",
						"title": "Excerpt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The stable public track ID (same value as `track_id`), in the form \"SL-*\".",
					},
					map[string]any{
						"name": "read_time_minutes",
						"title": "Read Time Minutes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "related_practices",
						"title": "Related Practices",
						"type": "`$ARRAY`",
						"short": "Free practices only — a paid track can never appear here even as a reference.",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "track_id",
						"title": "Track Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "practice",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/practices",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "practices",
									},
								},
								"parts": []any{
									"v1",
									"practices",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/practices/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "practices",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"practices",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"resource": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "access",
						"title": "Access",
						"type": "`$STRING`",
						"short": "e.g.",
					},
					map[string]any{
						"name": "age_max",
						"title": "Age Max",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "age_min",
						"title": "Age Min",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "audiences",
						"title": "Audiences",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration_minutes",
						"title": "Duration Minutes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "skills",
						"title": "Skills",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_url",
						"title": "Source Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "resource",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/search",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"v1",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/resources",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "resources",
									},
								},
								"parts": []any{
									"v1",
									"resources",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "age_max",
											"orig": "age_max",
											"type": "`$INTEGER`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "age_min",
											"orig": "age_min",
											"type": "`$INTEGER`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "audience",
											"orig": "audience",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "skill",
											"orig": "skill",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
