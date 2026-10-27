# OpenMindfulness Ruby SDK



The Ruby SDK for the OpenMindfulness API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Blog` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/open-mindfulness-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/open-mindfulness-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-open-mindfulness-sdk", path: "./open-mindfulness-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "OpenMindfulness_sdk"

client = OpenMindfulnessSDK.new
```

### 2. List blog records

```ruby
begin
  # list returns an Array of Blog entities, one per record; data_get reads the record.
  blogs = client.Blog.list
  blogs.each do |item|
    record = item.data_get
    puts "#{record["id"]} #{record["canonical_url"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a blog

```ruby
begin
  # load returns the ENTITY — call data_get for the Blog record (raises on error).
  blog = client.Blog.load({ "id" => "example_id" })
  puts blog.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  glossarys = client.Glossary.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = OpenMindfulnessSDK.test({
  "entity" => { "glossary" => { "test01" => { "id" => "test01" } } },
})

# list returns an Array of Glossary entities, one per mock record (raises on
# error); data_get reads each record.
glossarys = client.Glossary.list()
glossarys.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = OpenMindfulnessSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### OpenMindfulnessSDK

```ruby
require_relative "OpenMindfulness_sdk"
client = OpenMindfulnessSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = OpenMindfulnessSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenMindfulnessSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`OpenMindfulnessError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `blog = client.Blog`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canonical_url` | `String` |  |
| `excerpt` | `String` |  |
| `id` | `String` |  |
| `tags` | `Array` | Always an array, even when the post has no tags (never null). |
| `title` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Blog record (raises on error).
blog = client.Blog.load({ "id" => "blog_id" })
```

#### Example: List

```ruby
# list returns an Array of Blog entities, one per record (raises on error).
blogs = client.Blog.list
blogs.each { |item| puts item.data_get }
```


### Category

Create an instance: `category = client.Category`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `glossary` | `Hash` |  |
| `note` | `String` |  |
| `whitepapers` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Category record (raises on error).
category = client.Category.load()
```


### CitationDetail

Create an instance: `citation_detail = client.CitationDetail`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authors` | `String` |  |
| `id` | `String` | Deterministic public ID in the form "research:<slug>". |
| `journal` | `String` |  |
| `key_finding` | `String` |  |
| `limitations` | `String` |  |
| `related_posts` | `Array` |  |
| `related_terms` | `Array` |  |
| `sample_size` | `String` |  |
| `slug` | `String` |  |
| `source_url` | `String` |  |
| `study_type` | `String` |  |
| `summary` | `String` |  |
| `title` | `String` |  |
| `topic` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `String` |  |
| `year` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CitationDetail record (raises on error).
citation_detail = client.CitationDetail.load({ "slug" => "slug" })
```

#### Example: List

```ruby
# list returns an Array of CitationDetail entities, one per record (raises on error).
citation_details = client.CitationDetail.list
citation_details.each { |item| puts item.data_get }
```


### GameDetail

Create an instance: `game_detail = client.GameDetail`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_max` | `Integer` |  |
| `age_min` | `Integer` |  |
| `api_id` | `String` |  |
| `audiences` | `Array` |  |
| `description` | `String` |  |
| `duration_minutes` | `Integer` |  |
| `free` | `Boolean` |  |
| `icon` | `String` |  |
| `id` | `String` | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `Array` |  |
| `skills` | `Array` |  |
| `slug` | `String` |  |
| `tag` | `String` |  |
| `title` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GameDetail record (raises on error).
game_detail = client.GameDetail.load({ "slug" => "slug" })
```

#### Example: List

```ruby
# list returns an Array of GameDetail entities, one per record (raises on error).
game_details = client.GameDetail.list
game_details.each { |item| puts item.data_get }
```


### Glossary

Create an instance: `glossary = client.Glossary`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `Array` |  |
| `etymology` | `String` |  |
| `extended_explanation` | `Array` | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `String` | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `String` |  |
| `related_posts` | `Array` |  |
| `related_terms` | `Array` |  |
| `slug` | `String` |  |
| `summary` | `String` |  |
| `title` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Glossary record (raises on error).
glossary = client.Glossary.load({ "id" => "glossary_id" })
```

#### Example: List

```ruby
# list returns an Array of Glossary entities, one per record (raises on error).
glossarys = client.Glossary.list
glossarys.each { |item| puts item.data_get }
```


### Health

Create an instance: `health = client.Health`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `String` |  |
| `time` | `String` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Health record (raises on error).
health = client.Health.load()
```


### PanchaVikasResource

Create an instance: `pancha_vikas_resource = client.PanchaVikasResource`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `String` | Present only on the panchavikas_download item. |
| `id` | `String` |  |
| `source_url` | `String` |  |
| `summary` | `String` |  |
| `title` | `String` |  |
| `type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of PanchaVikasResource entities, one per record (raises on error).
pancha_vikas_resources = client.PanchaVikasResource.list
pancha_vikas_resources.each { |item| puts item.data_get }
```


### PodcastEpisodeDetail

Create an instance: `podcast_episode_detail = client.PodcastEpisodeDetail`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alternate_language_id` | `String` | The same episode in the other language. |
| `audience` | `String` |  |
| `duration_iso` | `String` |  |
| `duration_seconds` | `Integer` |  |
| `episode_number` | `Integer` |  |
| `id` | `String` |  |
| `key_question` | `String` |  |
| `language` | `String` |  |
| `release_date` | `String` |  |
| `season_number` | `Integer` |  |
| `season_title` | `String` |  |
| `short_title` | `String` |  |
| `slug` | `String` |  |
| `summary` | `String` | The episode's short quick-answer summary. |
| `title` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `String` |  |
| `url` | `String` | The episode page on theholisticcare.com. |
| `youtube_url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PodcastEpisodeDetail record (raises on error).
podcast_episode_detail = client.PodcastEpisodeDetail.load({ "id" => "podcast_episode_detail_id" })
```

#### Example: List

```ruby
# list returns an Array of PodcastEpisodeDetail entities, one per record (raises on error).
podcast_episode_details = client.PodcastEpisodeDetail.list
podcast_episode_details.each { |item| puts item.data_get }
```


### Practice

Create an instance: `practice = client.Practice`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio_url` | `String` | Direct link to the MP3 file (Cloudflare R2). |
| `canonical_url` | `String` |  |
| `category` | `String` |  |
| `excerpt` | `String` |  |
| `id` | `String` | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `read_time_minutes` | `Integer` |  |
| `related_practices` | `Array` | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `String` |  |
| `title` | `String` |  |
| `track_id` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Practice record (raises on error).
practice = client.Practice.load({ "id" => "practice_id" })
```

#### Example: List

```ruby
# list returns an Array of Practice entities, one per record (raises on error).
practices = client.Practice.list
practices.each { |item| puts item.data_get }
```


### Resource

Create an instance: `resource = client.Resource`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `String` | e.g. |
| `age_max` | `Integer` |  |
| `age_min` | `Integer` |  |
| `audiences` | `Array` |  |
| `category` | `String` |  |
| `duration_minutes` | `Integer` |  |
| `id` | `String` |  |
| `skills` | `Array` |  |
| `slug` | `String` |  |
| `source_url` | `String` |  |
| `summary` | `String` |  |
| `tags` | `Array` |  |
| `title` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Resource entities, one per record (raises on error).
resources = client.Resource.list({ "q" => "example" })
resources.each { |item| puts item.data_get }
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── OpenMindfulness_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`OpenMindfulness_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
glossary = client.Glossary
glossary.list()

# glossary.data_get now returns the glossary data from the last list
# glossary.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
