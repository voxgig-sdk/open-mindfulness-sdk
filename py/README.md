# OpenMindfulness Python SDK



The Python SDK for the OpenMindfulness API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Blog()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/open-mindfulness-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from openmindfulness_sdk import OpenMindfulnessSDK

client = OpenMindfulnessSDK()
```

### 2. List blog records

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    blogs = client.Blog().list()
    for blog in blogs:
        print(blog.data_get())
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a blog

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    blog = client.Blog().load({"id": "example_id"})
    print(blog.data_get())
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    glossarys = client.Glossary().list()
    print([item.data_get() for item in glossarys])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = OpenMindfulnessSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
glossary = client.Glossary().list()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = OpenMindfulnessSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### OpenMindfulnessSDK

```python
from openmindfulness_sdk import OpenMindfulnessSDK

client = OpenMindfulnessSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = OpenMindfulnessSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### OpenMindfulnessSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `blog = client.Blog()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canonical_url` | `str` |  |
| `excerpt` | `str` |  |
| `id` | `str` |  |
| `tags` | `list` | Always an array, even when the post has no tags (never null). |
| `title` | `str` |  |

#### Example: Load

```python
blog = client.Blog().load({"id": "blog_id"})
```

#### Example: List

```python
blogs = client.Blog().list()
```


### Category

Create an instance: `category = client.Category()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `glossary` | `dict` |  |
| `note` | `str` |  |
| `whitepapers` | `dict` |  |

#### Example: Load

```python
category = client.Category().load()
```


### CitationDetail

Create an instance: `citation_detail = client.CitationDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authors` | `str` |  |
| `id` | `str` | Deterministic public ID in the form "research:<slug>". |
| `journal` | `str` |  |
| `key_finding` | `str` |  |
| `limitations` | `str` |  |
| `related_posts` | `list` |  |
| `related_terms` | `list` |  |
| `sample_size` | `str` |  |
| `slug` | `str` |  |
| `source_url` | `str` |  |
| `study_type` | `str` |  |
| `summary` | `str` |  |
| `title` | `str` |  |
| `topic` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |
| `year` | `int` |  |

#### Example: Load

```python
citation_detail = client.CitationDetail().load({"slug": "slug"})
```

#### Example: List

```python
citation_details = client.CitationDetail().list()
```


### GameDetail

Create an instance: `game_detail = client.GameDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_max` | `int` |  |
| `age_min` | `int` |  |
| `api_id` | `str` |  |
| `audiences` | `list` |  |
| `description` | `str` |  |
| `duration_minutes` | `int` |  |
| `free` | `bool` |  |
| `icon` | `str` |  |
| `id` | `str` | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `list` |  |
| `skills` | `list` |  |
| `slug` | `str` |  |
| `tag` | `str` |  |
| `title` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
game_detail = client.GameDetail().load({"slug": "slug"})
```

#### Example: List

```python
game_details = client.GameDetail().list()
```


### Glossary

Create an instance: `glossary = client.Glossary()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `list` |  |
| `etymology` | `str` |  |
| `extended_explanation` | `list` | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `str` | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `str` |  |
| `related_posts` | `list` |  |
| `related_terms` | `list` |  |
| `slug` | `str` |  |
| `summary` | `str` |  |
| `title` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
glossary = client.Glossary().load({"id": "glossary_id"})
```

#### Example: List

```python
glossarys = client.Glossary().list()
```


### Health

Create an instance: `health = client.Health()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `str` |  |
| `time` | `str` |  |
| `version` | `str` |  |

#### Example: Load

```python
health = client.Health().load()
```


### PanchaVikasResource

Create an instance: `pancha_vikas_resource = client.PanchaVikasResource()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `str` | Present only on the panchavikas_download item. |
| `id` | `str` |  |
| `source_url` | `str` |  |
| `summary` | `str` |  |
| `title` | `str` |  |
| `type` | `str` |  |

#### Example: List

```python
pancha_vikas_resources = client.PanchaVikasResource().list()
```


### PodcastEpisodeDetail

Create an instance: `podcast_episode_detail = client.PodcastEpisodeDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alternate_language_id` | `str` | The same episode in the other language. |
| `audience` | `str` |  |
| `duration_iso` | `str` |  |
| `duration_seconds` | `int` |  |
| `episode_number` | `int` |  |
| `id` | `str` |  |
| `key_question` | `str` |  |
| `language` | `str` |  |
| `release_date` | `str` |  |
| `season_number` | `int` |  |
| `season_title` | `str` |  |
| `short_title` | `str` |  |
| `slug` | `str` |  |
| `summary` | `str` | The episode's short quick-answer summary. |
| `title` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |
| `url` | `str` | The episode page on theholisticcare.com. |
| `youtube_url` | `str` |  |

#### Example: Load

```python
podcast_episode_detail = client.PodcastEpisodeDetail().load({"id": "podcast_episode_detail_id"})
```

#### Example: List

```python
podcast_episode_details = client.PodcastEpisodeDetail().list()
```


### Practice

Create an instance: `practice = client.Practice()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio_url` | `str` | Direct link to the MP3 file (Cloudflare R2). |
| `canonical_url` | `str` |  |
| `category` | `str` |  |
| `excerpt` | `str` |  |
| `id` | `str` | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `read_time_minutes` | `int` |  |
| `related_practices` | `list` | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `str` |  |
| `title` | `str` |  |
| `track_id` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
practice = client.Practice().load({"id": "practice_id"})
```

#### Example: List

```python
practices = client.Practice().list()
```


### Resource

Create an instance: `resource = client.Resource()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `str` | e.g. |
| `age_max` | `int` |  |
| `age_min` | `int` |  |
| `audiences` | `list` |  |
| `category` | `str` |  |
| `duration_minutes` | `int` |  |
| `id` | `str` |  |
| `skills` | `list` |  |
| `slug` | `str` |  |
| `source_url` | `str` |  |
| `summary` | `str` |  |
| `tags` | `list` |  |
| `title` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |

#### Example: List

```python
resources = client.Resource().list({"q": "example"})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── openmindfulness_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`openmindfulness_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
glossary = client.Glossary()
glossary.list()

# glossary.data_get() now returns the glossary data from the last list
# glossary.match_get() returns the last match criteria
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
