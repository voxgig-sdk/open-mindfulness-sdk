# OpenMindfulness Python SDK Reference

Complete API reference for the OpenMindfulness Python SDK.


## OpenMindfulnessSDK

### Constructor

```python
from openmindfulness_sdk import OpenMindfulnessSDK

client = OpenMindfulnessSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenMindfulnessSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OpenMindfulnessSDK.test()
```


### Instance Methods

#### `Blog(data=None)`

Create a new `BlogEntity` instance. Pass `None` for no initial data.

#### `Category(data=None)`

Create a new `CategoryEntity` instance. Pass `None` for no initial data.

#### `CitationDetail(data=None)`

Create a new `CitationDetailEntity` instance. Pass `None` for no initial data.

#### `GameDetail(data=None)`

Create a new `GameDetailEntity` instance. Pass `None` for no initial data.

#### `Glossary(data=None)`

Create a new `GlossaryEntity` instance. Pass `None` for no initial data.

#### `Health(data=None)`

Create a new `HealthEntity` instance. Pass `None` for no initial data.

#### `PanchaVikasResource(data=None)`

Create a new `PanchaVikasResourceEntity` instance. Pass `None` for no initial data.

#### `PodcastEpisodeDetail(data=None)`

Create a new `PodcastEpisodeDetailEntity` instance. Pass `None` for no initial data.

#### `Practice(data=None)`

Create a new `PracticeEntity` instance. Pass `None` for no initial data.

#### `Resource(data=None)`

Create a new `ResourceEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BlogEntity

```python
blog = client.Blog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_url` | `str` | No |  |
| `excerpt` | `str` | No |  |
| `id` | `str` | No |  |
| `tags` | `list` | No | Always an array, even when the post has no tags (never null). |
| `title` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[BlogEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Blog().list()
for blog in results:
    print(blog.data_get())
```

#### `load(reqmatch, ctrl=None) -> BlogEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Blog().load({"id": "blog_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BlogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CategoryEntity

```python
category = client.Category()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `glossary` | `dict` | No |  |
| `note` | `str` | No |  |
| `whitepapers` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> CategoryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Category().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CategoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CitationDetailEntity

```python
citation_detail = client.CitationDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authors` | `str` | No |  |
| `id` | `str` | No | Deterministic public ID in the form "research:<slug>". |
| `journal` | `str` | No |  |
| `key_finding` | `str` | No |  |
| `limitations` | `str` | No |  |
| `related_posts` | `list` | No |  |
| `related_terms` | `list` | No |  |
| `sample_size` | `str` | No |  |
| `slug` | `str` | No |  |
| `source_url` | `str` | No |  |
| `study_type` | `str` | No |  |
| `summary` | `str` | No |  |
| `title` | `str` | No |  |
| `topic` | `str` | No |  |
| `type` | `str` | No |  |
| `updated_at` | `str` | No |  |
| `year` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CitationDetailEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CitationDetail().list()
for citation_detail in results:
    print(citation_detail.data_get())
```

#### `load(reqmatch, ctrl=None) -> CitationDetailEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CitationDetail().load({"slug": "slug"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CitationDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GameDetailEntity

```python
game_detail = client.GameDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_max` | `int` | No |  |
| `age_min` | `int` | No |  |
| `api_id` | `str` | No |  |
| `audiences` | `list` | No |  |
| `description` | `str` | No |  |
| `duration_minutes` | `int` | No |  |
| `free` | `bool` | No |  |
| `icon` | `str` | No |  |
| `id` | `str` | No | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `list` | No |  |
| `skills` | `list` | No |  |
| `slug` | `str` | No |  |
| `tag` | `str` | No |  |
| `title` | `str` | No |  |
| `type` | `str` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[GameDetailEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.GameDetail().list()
for game_detail in results:
    print(game_detail.data_get())
```

#### `load(reqmatch, ctrl=None) -> GameDetailEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.GameDetail().load({"slug": "slug"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GameDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GlossaryEntity

```python
glossary = client.Glossary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `list` | No |  |
| `etymology` | `str` | No |  |
| `extended_explanation` | `list` | No | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `str` | No | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `str` | No |  |
| `related_posts` | `list` | No |  |
| `related_terms` | `list` | No |  |
| `slug` | `str` | No |  |
| `summary` | `str` | No |  |
| `title` | `str` | No |  |
| `type` | `str` | No |  |
| `updated_at` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[GlossaryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Glossary().list()
for glossary in results:
    print(glossary.data_get())
```

#### `load(reqmatch, ctrl=None) -> GlossaryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Glossary().load({"id": "glossary_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GlossaryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HealthEntity

```python
health = client.Health()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `str` | No |  |
| `time` | `str` | No |  |
| `version` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> HealthEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Health().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PanchaVikasResourceEntity

```python
pancha_vikas_resource = client.PanchaVikasResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `str` | No | Present only on the panchavikas_download item. |
| `id` | `str` | No |  |
| `source_url` | `str` | No |  |
| `summary` | `str` | No |  |
| `title` | `str` | No |  |
| `type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PanchaVikasResourceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PanchaVikasResource().list()
for pancha_vikas_resource in results:
    print(pancha_vikas_resource.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PanchaVikasResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PodcastEpisodeDetailEntity

```python
podcast_episode_detail = client.PodcastEpisodeDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alternate_language_id` | `str` | No | The same episode in the other language. |
| `audience` | `str` | No |  |
| `duration_iso` | `str` | No |  |
| `duration_seconds` | `int` | No |  |
| `episode_number` | `int` | No |  |
| `id` | `str` | No |  |
| `key_question` | `str` | No |  |
| `language` | `str` | No |  |
| `release_date` | `str` | No |  |
| `season_number` | `int` | No |  |
| `season_title` | `str` | No |  |
| `short_title` | `str` | No |  |
| `slug` | `str` | No |  |
| `summary` | `str` | No | The episode's short quick-answer summary. |
| `title` | `str` | No |  |
| `type` | `str` | No |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | No | The episode page on theholisticcare.com. |
| `youtube_url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PodcastEpisodeDetailEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PodcastEpisodeDetail().list()
for podcast_episode_detail in results:
    print(podcast_episode_detail.data_get())
```

#### `load(reqmatch, ctrl=None) -> PodcastEpisodeDetailEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.PodcastEpisodeDetail().load({"id": "podcast_episode_detail_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PodcastEpisodeDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PracticeEntity

```python
practice = client.Practice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio_url` | `str` | No | Direct link to the MP3 file (Cloudflare R2). |
| `canonical_url` | `str` | No |  |
| `category` | `str` | No |  |
| `excerpt` | `str` | No |  |
| `id` | `str` | No | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `read_time_minutes` | `int` | No |  |
| `related_practices` | `list` | No | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `str` | No |  |
| `title` | `str` | No |  |
| `track_id` | `str` | No |  |
| `type` | `str` | No |  |
| `updated_at` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PracticeEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Practice().list()
for practice in results:
    print(practice.data_get())
```

#### `load(reqmatch, ctrl=None) -> PracticeEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Practice().load({"id": "practice_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PracticeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResourceEntity

```python
resource = client.Resource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `str` | No | e.g. |
| `age_max` | `int` | No |  |
| `age_min` | `int` | No |  |
| `audiences` | `list` | No |  |
| `category` | `str` | No |  |
| `duration_minutes` | `int` | No |  |
| `id` | `str` | No |  |
| `skills` | `list` | No |  |
| `slug` | `str` | No |  |
| `source_url` | `str` | No |  |
| `summary` | `str` | No |  |
| `tags` | `list` | No |  |
| `title` | `str` | No |  |
| `type` | `str` | No |  |
| `updated_at` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ResourceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Resource().list({"q": "example"})
for resource in results:
    print(resource.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = OpenMindfulnessSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

