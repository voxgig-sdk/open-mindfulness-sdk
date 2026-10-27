# OpenMindfulness Lua SDK Reference

Complete API reference for the OpenMindfulness Lua SDK.


## OpenMindfulnessSDK

### Constructor

```lua
local sdk = require("open-mindfulness_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Blog(data)`

Create a new `Blog` entity instance. Pass `nil` for no initial data.

#### `Category(data)`

Create a new `Category` entity instance. Pass `nil` for no initial data.

#### `CitationDetail(data)`

Create a new `CitationDetail` entity instance. Pass `nil` for no initial data.

#### `GameDetail(data)`

Create a new `GameDetail` entity instance. Pass `nil` for no initial data.

#### `Glossary(data)`

Create a new `Glossary` entity instance. Pass `nil` for no initial data.

#### `Health(data)`

Create a new `Health` entity instance. Pass `nil` for no initial data.

#### `PanchaVikasResource(data)`

Create a new `PanchaVikasResource` entity instance. Pass `nil` for no initial data.

#### `PodcastEpisodeDetail(data)`

Create a new `PodcastEpisodeDetail` entity instance. Pass `nil` for no initial data.

#### `Practice(data)`

Create a new `Practice` entity instance. Pass `nil` for no initial data.

#### `Resource(data)`

Create a new `Resource` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BlogEntity

```lua
local blog = client:Blog(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_url` | `string` | No |  |
| `excerpt` | `string` | No |  |
| `id` | `string` | No |  |
| `tags` | `table` | No | Always an array, even when the post has no tags (never null). |
| `title` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Blog():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Blog():load({ id = "blog_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BlogEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CategoryEntity

```lua
local category = client:Category(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `glossary` | `table` | No |  |
| `note` | `string` | No |  |
| `whitepapers` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Category():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CategoryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CitationDetailEntity

```lua
local citation_detail = client:CitationDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authors` | `string` | No |  |
| `id` | `string` | No | Deterministic public ID in the form "research:<slug>". |
| `journal` | `string` | No |  |
| `key_finding` | `string` | No |  |
| `limitations` | `string` | No |  |
| `related_posts` | `table` | No |  |
| `related_terms` | `table` | No |  |
| `sample_size` | `string` | No |  |
| `slug` | `string` | No |  |
| `source_url` | `string` | No |  |
| `study_type` | `string` | No |  |
| `summary` | `string` | No |  |
| `title` | `string` | No |  |
| `topic` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `year` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CitationDetail():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CitationDetail():load({ slug = "slug" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CitationDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GameDetailEntity

```lua
local game_detail = client:GameDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_max` | `number` | No |  |
| `age_min` | `number` | No |  |
| `api_id` | `string` | No |  |
| `audiences` | `table` | No |  |
| `description` | `string` | No |  |
| `duration_minutes` | `number` | No |  |
| `free` | `boolean` | No |  |
| `icon` | `string` | No |  |
| `id` | `string` | No | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `table` | No |  |
| `skills` | `table` | No |  |
| `slug` | `string` | No |  |
| `tag` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:GameDetail():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:GameDetail():load({ slug = "slug" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GameDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GlossaryEntity

```lua
local glossary = client:Glossary(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `table` | No |  |
| `etymology` | `string` | No |  |
| `extended_explanation` | `table` | No | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `string` | No | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `string` | No |  |
| `related_posts` | `table` | No |  |
| `related_terms` | `table` | No |  |
| `slug` | `string` | No |  |
| `summary` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Glossary():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Glossary():load({ id = "glossary_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GlossaryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HealthEntity

```lua
local health = client:Health(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |
| `time` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Health():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PanchaVikasResourceEntity

```lua
local pancha_vikas_resource = client:PanchaVikasResource(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `string` | No | Present only on the panchavikas_download item. |
| `id` | `string` | No |  |
| `source_url` | `string` | No |  |
| `summary` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PanchaVikasResource():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PanchaVikasResourceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PodcastEpisodeDetailEntity

```lua
local podcast_episode_detail = client:PodcastEpisodeDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alternate_language_id` | `string` | No | The same episode in the other language. |
| `audience` | `string` | No |  |
| `duration_iso` | `string` | No |  |
| `duration_seconds` | `number` | No |  |
| `episode_number` | `number` | No |  |
| `id` | `string` | No |  |
| `key_question` | `string` | No |  |
| `language` | `string` | No |  |
| `release_date` | `string` | No |  |
| `season_number` | `number` | No |  |
| `season_title` | `string` | No |  |
| `short_title` | `string` | No |  |
| `slug` | `string` | No |  |
| `summary` | `string` | No | The episode's short quick-answer summary. |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No | The episode page on theholisticcare.com. |
| `youtube_url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PodcastEpisodeDetail():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PodcastEpisodeDetail():load({ id = "podcast_episode_detail_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PodcastEpisodeDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PracticeEntity

```lua
local practice = client:Practice(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio_url` | `string` | No | Direct link to the MP3 file (Cloudflare R2). |
| `canonical_url` | `string` | No |  |
| `category` | `string` | No |  |
| `excerpt` | `string` | No |  |
| `id` | `string` | No | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `read_time_minutes` | `number` | No |  |
| `related_practices` | `table` | No | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `string` | No |  |
| `title` | `string` | No |  |
| `track_id` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Practice():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Practice():load({ id = "practice_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PracticeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResourceEntity

```lua
local resource = client:Resource(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `string` | No | e.g. |
| `age_max` | `number` | No |  |
| `age_min` | `number` | No |  |
| `audiences` | `table` | No |  |
| `category` | `string` | No |  |
| `duration_minutes` | `number` | No |  |
| `id` | `string` | No |  |
| `skills` | `table` | No |  |
| `slug` | `string` | No |  |
| `source_url` | `string` | No |  |
| `summary` | `string` | No |  |
| `tags` | `table` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Resource():list({ q = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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

