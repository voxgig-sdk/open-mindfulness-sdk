# OpenMindfulness Lua SDK



The Lua SDK for the OpenMindfulness API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Blog()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/open-mindfulness-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("open-mindfulness_sdk")

local client = sdk.new()
```

### 2. List blog records

Entity operations return `(value, err)`. For `list`, `value` is an
array of entities, one per record — iterate it directly (there is no
wrapper), and read each record with `data_get()`.

```lua
local blogs, err = client:Blog():list()
if err then error(err) end

for _, item in ipairs(blogs) do
  local rec = item:data_get()
  print(rec["id"])
end
```

### 3. Load a blog

`load` returns the entity; `data_get()` reads its record.

```lua
local blog, err = client:Blog():load({ id = "example_id" })
if err then error(err) end
local rec = blog:data_get()
print(rec["id"])
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local glossarys, err = client:Glossary():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Glossary():list()
-- result is an array of entities, one per mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPEN_MINDFULNESS_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### OpenMindfulnessSDK

```lua
local sdk = require("open-mindfulness_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenMindfulnessSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Blog` | `(data) -> BlogEntity` | Create a Blog entity instance. |
| `Category` | `(data) -> CategoryEntity` | Create a Category entity instance. |
| `CitationDetail` | `(data) -> CitationDetailEntity` | Create a CitationDetail entity instance. |
| `GameDetail` | `(data) -> GameDetailEntity` | Create a GameDetail entity instance. |
| `Glossary` | `(data) -> GlossaryEntity` | Create a Glossary entity instance. |
| `Health` | `(data) -> HealthEntity` | Create a Health entity instance. |
| `PanchaVikasResource` | `(data) -> PanchaVikasResourceEntity` | Create a PanchaVikasResource entity instance. |
| `PodcastEpisodeDetail` | `(data) -> PodcastEpisodeDetailEntity` | Create a PodcastEpisodeDetail entity instance. |
| `Practice` | `(data) -> PracticeEntity` | Create a Practice entity instance. |
| `Resource` | `(data) -> ResourceEntity` | Create a Resource entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local blog, err = client:Blog():load({ id = "example_id" })
    if err then error(err) end
    -- blog is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Blog

| Field | Description |
| --- | --- |
| `canonical_url` |  |
| `excerpt` |  |
| `id` |  |
| `tags` | Always an array, even when the post has no tags (never null). |
| `title` |  |

Operations: List, Load.

API path: `/v1/blog`

#### Category

| Field | Description |
| --- | --- |
| `glossary` |  |
| `note` |  |
| `whitepapers` |  |

Operations: Load.

API path: `/v1/categories`

#### CitationDetail

| Field | Description |
| --- | --- |
| `authors` |  |
| `id` | Deterministic public ID in the form "research:<slug>". |
| `journal` |  |
| `key_finding` |  |
| `limitations` |  |
| `related_posts` |  |
| `related_terms` |  |
| `sample_size` |  |
| `slug` |  |
| `source_url` |  |
| `study_type` |  |
| `summary` |  |
| `title` |  |
| `topic` |  |
| `type` |  |
| `updated_at` |  |
| `year` |  |

Operations: List, Load.

API path: `/v1/whitepapers`

#### GameDetail

| Field | Description |
| --- | --- |
| `age_max` |  |
| `age_min` |  |
| `api_id` |  |
| `audiences` |  |
| `description` |  |
| `duration_minutes` |  |
| `free` |  |
| `icon` |  |
| `id` | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` |  |
| `skills` |  |
| `slug` |  |
| `tag` |  |
| `title` |  |
| `type` |  |
| `updated_at` |  |
| `url` |  |

Operations: List, Load.

API path: `/v1/mindfulness-games`

#### Glossary

| Field | Description |
| --- | --- |
| `also_known_as` |  |
| `etymology` |  |
| `extended_explanation` | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` |  |
| `related_posts` |  |
| `related_terms` |  |
| `slug` |  |
| `summary` |  |
| `title` |  |
| `type` |  |
| `updated_at` |  |

Operations: List, Load.

API path: `/v1/glossary`

#### Health

| Field | Description |
| --- | --- |
| `status` |  |
| `time` |  |
| `version` |  |

Operations: Load.

API path: `/health`

#### PanchaVikasResource

| Field | Description |
| --- | --- |
| `download_url` | Present only on the panchavikas_download item. |
| `id` |  |
| `source_url` |  |
| `summary` |  |
| `title` |  |
| `type` |  |

Operations: List.

API path: `/v1/panchavikas/resources`

#### PodcastEpisodeDetail

| Field | Description |
| --- | --- |
| `alternate_language_id` | The same episode in the other language. |
| `audience` |  |
| `duration_iso` |  |
| `duration_seconds` |  |
| `episode_number` |  |
| `id` |  |
| `key_question` |  |
| `language` |  |
| `release_date` |  |
| `season_number` |  |
| `season_title` |  |
| `short_title` |  |
| `slug` |  |
| `summary` | The episode's short quick-answer summary. |
| `title` |  |
| `type` |  |
| `updated_at` |  |
| `url` | The episode page on theholisticcare.com. |
| `youtube_url` |  |

Operations: List, Load.

API path: `/v1/podcast/episodes`

#### Practice

| Field | Description |
| --- | --- |
| `audio_url` | Direct link to the MP3 file (Cloudflare R2). |
| `canonical_url` |  |
| `category` |  |
| `excerpt` |  |
| `id` | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `read_time_minutes` |  |
| `related_practices` | Free practices only — a paid track can never appear here even as a reference. |
| `slug` |  |
| `title` |  |
| `track_id` |  |
| `type` |  |
| `updated_at` |  |

Operations: List, Load.

API path: `/v1/practices`

#### Resource

| Field | Description |
| --- | --- |
| `access` | e.g. |
| `age_max` |  |
| `age_min` |  |
| `audiences` |  |
| `category` |  |
| `duration_minutes` |  |
| `id` |  |
| `skills` |  |
| `slug` |  |
| `source_url` |  |
| `summary` |  |
| `tags` |  |
| `title` |  |
| `type` |  |
| `updated_at` |  |

Operations: List.

API path: `/v1/search`



## Entities


### Blog

Create an instance: `local blog = client:Blog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canonical_url` | `string` |  |
| `excerpt` | `string` |  |
| `id` | `string` |  |
| `tags` | `table` | Always an array, even when the post has no tags (never null). |
| `title` | `string` |  |

#### Example: Load

```lua
local blog, err = client:Blog():load({ id = "blog_id" })
```

#### Example: List

```lua
local blogs, err = client:Blog():list()
```


### Category

Create an instance: `local category = client:Category(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `glossary` | `table` |  |
| `note` | `string` |  |
| `whitepapers` | `table` |  |

#### Example: Load

```lua
local category, err = client:Category():load()
```


### CitationDetail

Create an instance: `local citation_detail = client:CitationDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authors` | `string` |  |
| `id` | `string` | Deterministic public ID in the form "research:<slug>". |
| `journal` | `string` |  |
| `key_finding` | `string` |  |
| `limitations` | `string` |  |
| `related_posts` | `table` |  |
| `related_terms` | `table` |  |
| `sample_size` | `string` |  |
| `slug` | `string` |  |
| `source_url` | `string` |  |
| `study_type` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `topic` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `year` | `number` |  |

#### Example: Load

```lua
local citation_detail, err = client:CitationDetail():load({ slug = "slug" })
```

#### Example: List

```lua
local citation_details, err = client:CitationDetail():list()
```


### GameDetail

Create an instance: `local game_detail = client:GameDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_max` | `number` |  |
| `age_min` | `number` |  |
| `api_id` | `string` |  |
| `audiences` | `table` |  |
| `description` | `string` |  |
| `duration_minutes` | `number` |  |
| `free` | `boolean` |  |
| `icon` | `string` |  |
| `id` | `string` | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `table` |  |
| `skills` | `table` |  |
| `slug` | `string` |  |
| `tag` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local game_detail, err = client:GameDetail():load({ slug = "slug" })
```

#### Example: List

```lua
local game_details, err = client:GameDetail():list()
```


### Glossary

Create an instance: `local glossary = client:Glossary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `table` |  |
| `etymology` | `string` |  |
| `extended_explanation` | `table` | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `string` | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `string` |  |
| `related_posts` | `table` |  |
| `related_terms` | `table` |  |
| `slug` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local glossary, err = client:Glossary():load({ id = "glossary_id" })
```

#### Example: List

```lua
local glossarys, err = client:Glossary():list()
```


### Health

Create an instance: `local health = client:Health(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `string` |  |
| `time` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local health, err = client:Health():load()
```


### PanchaVikasResource

Create an instance: `local pancha_vikas_resource = client:PanchaVikasResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `string` | Present only on the panchavikas_download item. |
| `id` | `string` |  |
| `source_url` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |

#### Example: List

```lua
local pancha_vikas_resources, err = client:PanchaVikasResource():list()
```


### PodcastEpisodeDetail

Create an instance: `local podcast_episode_detail = client:PodcastEpisodeDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alternate_language_id` | `string` | The same episode in the other language. |
| `audience` | `string` |  |
| `duration_iso` | `string` |  |
| `duration_seconds` | `number` |  |
| `episode_number` | `number` |  |
| `id` | `string` |  |
| `key_question` | `string` |  |
| `language` | `string` |  |
| `release_date` | `string` |  |
| `season_number` | `number` |  |
| `season_title` | `string` |  |
| `short_title` | `string` |  |
| `slug` | `string` |  |
| `summary` | `string` | The episode's short quick-answer summary. |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` | The episode page on theholisticcare.com. |
| `youtube_url` | `string` |  |

#### Example: Load

```lua
local podcast_episode_detail, err = client:PodcastEpisodeDetail():load({ id = "podcast_episode_detail_id" })
```

#### Example: List

```lua
local podcast_episode_details, err = client:PodcastEpisodeDetail():list()
```


### Practice

Create an instance: `local practice = client:Practice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio_url` | `string` | Direct link to the MP3 file (Cloudflare R2). |
| `canonical_url` | `string` |  |
| `category` | `string` |  |
| `excerpt` | `string` |  |
| `id` | `string` | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `read_time_minutes` | `number` |  |
| `related_practices` | `table` | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `string` |  |
| `title` | `string` |  |
| `track_id` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local practice, err = client:Practice():load({ id = "practice_id" })
```

#### Example: List

```lua
local practices, err = client:Practice():list()
```


### Resource

Create an instance: `local resource = client:Resource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `string` | e.g. |
| `age_max` | `number` |  |
| `age_min` | `number` |  |
| `audiences` | `table` |  |
| `category` | `string` |  |
| `duration_minutes` | `number` |  |
| `id` | `string` |  |
| `skills` | `table` |  |
| `slug` | `string` |  |
| `source_url` | `string` |  |
| `summary` | `string` |  |
| `tags` | `table` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```lua
local resources, err = client:Resource():list({ q = "example" })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── open-mindfulness_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`open-mindfulness_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local glossary = client:Glossary()
glossary:list()

-- glossary:data_get() now returns the glossary data from the last list
-- glossary:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
