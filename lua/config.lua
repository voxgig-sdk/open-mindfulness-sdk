-- OpenMindfulness SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "OpenMindfulness",
      slug = "open-mindfulness",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.theholisticcare.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["blog"] = {},
        ["category"] = {},
        ["citation_detail"] = {},
        ["game_detail"] = {},
        ["glossary"] = {},
        ["health"] = {},
        ["pancha_vikas_resource"] = {},
        ["podcast_episode_detail"] = {},
        ["practice"] = {},
        ["resource"] = {},
      },
    },
    entity = {
      ["blog"] = {
        ["fields"] = {
          {
            ["name"] = "canonical_url",
            ["title"] = "Canonical Url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "excerpt",
            ["title"] = "Excerpt",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Always an array, even when the post has no tags (never null).",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "blog",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/blog",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "blog",
                  },
                },
                ["parts"] = {
                  "v1",
                  "blog",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "tag",
                      ["orig"] = "tag",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/blog/{slug}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "blog",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "blog",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["slug"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "slug",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["category"] = {
        ["fields"] = {
          {
            ["name"] = "glossary",
            ["title"] = "Glossary",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "whitepapers",
            ["title"] = "Whitepapers",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "category",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/categories",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "categories",
                  },
                },
                ["parts"] = {
                  "v1",
                  "categories",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["citation_detail"] = {
        ["fields"] = {
          {
            ["name"] = "authors",
            ["title"] = "Authors",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Deterministic public ID in the form \"research:<slug>\".",
          },
          {
            ["name"] = "journal",
            ["title"] = "Journal",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "key_finding",
            ["title"] = "Key Finding",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "limitations",
            ["title"] = "Limitations",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "related_posts",
            ["title"] = "Related Posts",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "related_terms",
            ["title"] = "Related Terms",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "sample_size",
            ["title"] = "Sample Size",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source_url",
            ["title"] = "Source Url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "study_type",
            ["title"] = "Study Type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "topic",
            ["title"] = "Topic",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "year",
            ["title"] = "Year",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "citation_detail",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/whitepapers",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "whitepapers",
                  },
                },
                ["parts"] = {
                  "v1",
                  "whitepapers",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "study_type",
                      ["orig"] = "study_type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "topic",
                      ["orig"] = "topic",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/whitepapers/{slug}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "whitepapers",
                  },
                  {
                    ["var"] = "slug",
                  },
                },
                ["parts"] = {
                  "v1",
                  "whitepapers",
                  "{slug}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "slug",
                      ["orig"] = "slug",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "slug",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["game_detail"] = {
        ["fields"] = {
          {
            ["name"] = "age_max",
            ["title"] = "Age Max",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "age_min",
            ["title"] = "Age Min",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "api_id",
            ["title"] = "Api Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "audiences",
            ["title"] = "Audiences",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "duration_minutes",
            ["title"] = "Duration Minutes",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "free",
            ["title"] = "Free",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "icon",
            ["title"] = "Icon",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "The stable public game ID (same value as `api_id`), in the form \"MG-*\".",
          },
          {
            ["name"] = "keywords",
            ["title"] = "Keywords",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "skills",
            ["title"] = "Skills",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tag",
            ["title"] = "Tag",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "game_detail",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/mindfulness-games",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "mindfulness-games",
                  },
                },
                ["parts"] = {
                  "v1",
                  "mindfulness-games",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "audience",
                      ["orig"] = "audience",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "skill",
                      ["orig"] = "skill",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/mindfulness-games/{slug}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "mindfulness-games",
                  },
                  {
                    ["var"] = "slug",
                  },
                },
                ["parts"] = {
                  "v1",
                  "mindfulness-games",
                  "{slug}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "slug",
                      ["orig"] = "slug",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "slug",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["glossary"] = {
        ["fields"] = {
          {
            ["name"] = "also_known_as",
            ["title"] = "Also Known As",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "etymology",
            ["title"] = "Etymology",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "extended_explanation",
            ["title"] = "Extended Explanation",
            ["type"] = "`$ARRAY`",
            ["short"] = "A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Deterministic public ID in the form \"glossary:<slug>\".",
          },
          {
            ["name"] = "pillar",
            ["title"] = "Pillar",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "related_posts",
            ["title"] = "Related Posts",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "related_terms",
            ["title"] = "Related Terms",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "glossary",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/glossary",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "glossary",
                  },
                },
                ["parts"] = {
                  "v1",
                  "glossary",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "pillar",
                      ["orig"] = "pillar",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/glossary/{slug}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "glossary",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "glossary",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["slug"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "slug",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["health"] = {
        ["fields"] = {
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "time",
            ["title"] = "Time",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "version",
            ["title"] = "Version",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "health",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/health",
                ["segments"] = {
                  {
                    ["lit"] = "health",
                  },
                },
                ["parts"] = {
                  "health",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["pancha_vikas_resource"] = {
        ["fields"] = {
          {
            ["name"] = "download_url",
            ["title"] = "Download Url",
            ["type"] = "`$STRING`",
            ["short"] = "Present only on the panchavikas_download item.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source_url",
            ["title"] = "Source Url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "pancha_vikas_resource",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/panchavikas/resources",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "panchavikas",
                  },
                  {
                    ["lit"] = "resources",
                  },
                },
                ["parts"] = {
                  "v1",
                  "panchavikas",
                  "resources",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["podcast_episode_detail"] = {
        ["fields"] = {
          {
            ["name"] = "alternate_language_id",
            ["title"] = "Alternate Language Id",
            ["type"] = "`$STRING`",
            ["short"] = "The same episode in the other language.",
          },
          {
            ["name"] = "audience",
            ["title"] = "Audience",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "duration_iso",
            ["title"] = "Duration Iso",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "duration_seconds",
            ["title"] = "Duration Seconds",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "episode_number",
            ["title"] = "Episode Number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "key_question",
            ["title"] = "Key Question",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "language",
            ["title"] = "Language",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "release_date",
            ["title"] = "Release Date",
            ["type"] = "`$STRING`",
            ["format"] = "date",
          },
          {
            ["name"] = "season_number",
            ["title"] = "Season Number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "season_title",
            ["title"] = "Season Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "short_title",
            ["title"] = "Short Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = "`$STRING`",
            ["short"] = "The episode's short quick-answer summary.",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "The episode page on theholisticcare.com.",
            ["format"] = "uri",
          },
          {
            ["name"] = "youtube_url",
            ["title"] = "Youtube Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "podcast_episode_detail",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/podcast/episodes",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "podcast",
                  },
                  {
                    ["lit"] = "episodes",
                  },
                },
                ["parts"] = {
                  "v1",
                  "podcast",
                  "episodes",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "season",
                      ["orig"] = "season",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/podcast/episodes/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "podcast",
                  },
                  {
                    ["lit"] = "episodes",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "podcast",
                  "episodes",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["practice"] = {
        ["fields"] = {
          {
            ["name"] = "audio_url",
            ["title"] = "Audio Url",
            ["type"] = "`$STRING`",
            ["short"] = "Direct link to the MP3 file (Cloudflare R2).",
          },
          {
            ["name"] = "canonical_url",
            ["title"] = "Canonical Url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "category",
            ["title"] = "Category",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "excerpt",
            ["title"] = "Excerpt",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "The stable public track ID (same value as `track_id`), in the form \"SL-*\".",
          },
          {
            ["name"] = "read_time_minutes",
            ["title"] = "Read Time Minutes",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "related_practices",
            ["title"] = "Related Practices",
            ["type"] = "`$ARRAY`",
            ["short"] = "Free practices only — a paid track can never appear here even as a reference.",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "track_id",
            ["title"] = "Track Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "practice",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/practices",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "practices",
                  },
                },
                ["parts"] = {
                  "v1",
                  "practices",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/practices/{slug}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "practices",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "practices",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["slug"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "slug",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["resource"] = {
        ["fields"] = {
          {
            ["name"] = "access",
            ["title"] = "Access",
            ["type"] = "`$STRING`",
            ["short"] = "e.g.",
          },
          {
            ["name"] = "age_max",
            ["title"] = "Age Max",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "age_min",
            ["title"] = "Age Min",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "audiences",
            ["title"] = "Audiences",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "category",
            ["title"] = "Category",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "duration_minutes",
            ["title"] = "Duration Minutes",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "skills",
            ["title"] = "Skills",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source_url",
            ["title"] = "Source Url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "summary",
            ["title"] = "Summary",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "resource",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/search",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "v1",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "q",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/resources",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "resources",
                  },
                },
                ["parts"] = {
                  "v1",
                  "resources",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "age_max",
                      ["orig"] = "age_max",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "age_min",
                      ["orig"] = "age_min",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "audience",
                      ["orig"] = "audience",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "skill",
                      ["orig"] = "skill",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
