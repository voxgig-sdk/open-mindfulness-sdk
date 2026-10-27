# OpenMindfulness Ruby SDK Reference

Complete API reference for the OpenMindfulness Ruby SDK.


## OpenMindfulnessSDK

### Constructor

```ruby
require_relative 'OpenMindfulness_sdk'

client = OpenMindfulnessSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenMindfulnessSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = OpenMindfulnessSDK.test
```


### Instance Methods

#### `Blog(data = nil)`

Create a new `Blog` entity instance. Pass `nil` for no initial data.

#### `Category(data = nil)`

Create a new `Category` entity instance. Pass `nil` for no initial data.

#### `CitationDetail(data = nil)`

Create a new `CitationDetail` entity instance. Pass `nil` for no initial data.

#### `GameDetail(data = nil)`

Create a new `GameDetail` entity instance. Pass `nil` for no initial data.

#### `Glossary(data = nil)`

Create a new `Glossary` entity instance. Pass `nil` for no initial data.

#### `Health(data = nil)`

Create a new `Health` entity instance. Pass `nil` for no initial data.

#### `PanchaVikasResource(data = nil)`

Create a new `PanchaVikasResource` entity instance. Pass `nil` for no initial data.

#### `PodcastEpisodeDetail(data = nil)`

Create a new `PodcastEpisodeDetail` entity instance. Pass `nil` for no initial data.

#### `Practice(data = nil)`

Create a new `Practice` entity instance. Pass `nil` for no initial data.

#### `Resource(data = nil)`

Create a new `Resource` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BlogEntity

```ruby
blog = client.Blog
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_url` | `String` | No |  |
| `excerpt` | `String` | No |  |
| `id` | `String` | No |  |
| `tags` | `Array` | No | Always an array, even when the post has no tags (never null). |
| `title` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Blog.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Blog.load({ "id" => "blog_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BlogEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CategoryEntity

```ruby
category = client.Category
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `glossary` | `Hash` | No |  |
| `note` | `String` | No |  |
| `whitepapers` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Category.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CategoryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CitationDetailEntity

```ruby
citation_detail = client.CitationDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authors` | `String` | No |  |
| `id` | `String` | No | Deterministic public ID in the form "research:<slug>". |
| `journal` | `String` | No |  |
| `key_finding` | `String` | No |  |
| `limitations` | `String` | No |  |
| `related_posts` | `Array` | No |  |
| `related_terms` | `Array` | No |  |
| `sample_size` | `String` | No |  |
| `slug` | `String` | No |  |
| `source_url` | `String` | No |  |
| `study_type` | `String` | No |  |
| `summary` | `String` | No |  |
| `title` | `String` | No |  |
| `topic` | `String` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `String` | No |  |
| `year` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CitationDetail.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CitationDetail.load({ "slug" => "slug" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CitationDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GameDetailEntity

```ruby
game_detail = client.GameDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_max` | `Integer` | No |  |
| `age_min` | `Integer` | No |  |
| `api_id` | `String` | No |  |
| `audiences` | `Array` | No |  |
| `description` | `String` | No |  |
| `duration_minutes` | `Integer` | No |  |
| `free` | `Boolean` | No |  |
| `icon` | `String` | No |  |
| `id` | `String` | No | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `Array` | No |  |
| `skills` | `Array` | No |  |
| `slug` | `String` | No |  |
| `tag` | `String` | No |  |
| `title` | `String` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.GameDetail.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.GameDetail.load({ "slug" => "slug" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GameDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GlossaryEntity

```ruby
glossary = client.Glossary
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `Array` | No |  |
| `etymology` | `String` | No |  |
| `extended_explanation` | `Array` | No | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `String` | No | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `String` | No |  |
| `related_posts` | `Array` | No |  |
| `related_terms` | `Array` | No |  |
| `slug` | `String` | No |  |
| `summary` | `String` | No |  |
| `title` | `String` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Glossary.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Glossary.load({ "id" => "glossary_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GlossaryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HealthEntity

```ruby
health = client.Health
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `String` | No |  |
| `time` | `String` | No |  |
| `version` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Health.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PanchaVikasResourceEntity

```ruby
pancha_vikas_resource = client.PanchaVikasResource
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `String` | No | Present only on the panchavikas_download item. |
| `id` | `String` | No |  |
| `source_url` | `String` | No |  |
| `summary` | `String` | No |  |
| `title` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PanchaVikasResource.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PanchaVikasResourceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PodcastEpisodeDetailEntity

```ruby
podcast_episode_detail = client.PodcastEpisodeDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alternate_language_id` | `String` | No | The same episode in the other language. |
| `audience` | `String` | No |  |
| `duration_iso` | `String` | No |  |
| `duration_seconds` | `Integer` | No |  |
| `episode_number` | `Integer` | No |  |
| `id` | `String` | No |  |
| `key_question` | `String` | No |  |
| `language` | `String` | No |  |
| `release_date` | `String` | No |  |
| `season_number` | `Integer` | No |  |
| `season_title` | `String` | No |  |
| `short_title` | `String` | No |  |
| `slug` | `String` | No |  |
| `summary` | `String` | No | The episode's short quick-answer summary. |
| `title` | `String` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No | The episode page on theholisticcare.com. |
| `youtube_url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PodcastEpisodeDetail.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PodcastEpisodeDetail.load({ "id" => "podcast_episode_detail_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PodcastEpisodeDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PracticeEntity

```ruby
practice = client.Practice
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio_url` | `String` | No | Direct link to the MP3 file (Cloudflare R2). |
| `canonical_url` | `String` | No |  |
| `category` | `String` | No |  |
| `excerpt` | `String` | No |  |
| `id` | `String` | No | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `read_time_minutes` | `Integer` | No |  |
| `related_practices` | `Array` | No | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `String` | No |  |
| `title` | `String` | No |  |
| `track_id` | `String` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Practice.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Practice.load({ "id" => "practice_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PracticeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResourceEntity

```ruby
resource = client.Resource
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `String` | No | e.g. |
| `age_max` | `Integer` | No |  |
| `age_min` | `Integer` | No |  |
| `audiences` | `Array` | No |  |
| `category` | `String` | No |  |
| `duration_minutes` | `Integer` | No |  |
| `id` | `String` | No |  |
| `skills` | `Array` | No |  |
| `slug` | `String` | No |  |
| `source_url` | `String` | No |  |
| `summary` | `String` | No |  |
| `tags` | `Array` | No |  |
| `title` | `String` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Resource.list({ "q" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResourceEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = OpenMindfulnessSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

