# OpenMindfulness PHP SDK Reference

Complete API reference for the OpenMindfulness PHP SDK.


## OpenMindfulnessSDK

### Constructor

```php
require_once __DIR__ . '/openmindfulness_sdk.php';

$client = new OpenMindfulnessSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenMindfulnessSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = OpenMindfulnessSDK::test();
```


### Instance Methods

#### `Blog($data = null)`

Create a new `BlogEntity` instance. Pass `null` for no initial data.

#### `Category($data = null)`

Create a new `CategoryEntity` instance. Pass `null` for no initial data.

#### `CitationDetail($data = null)`

Create a new `CitationDetailEntity` instance. Pass `null` for no initial data.

#### `GameDetail($data = null)`

Create a new `GameDetailEntity` instance. Pass `null` for no initial data.

#### `Glossary($data = null)`

Create a new `GlossaryEntity` instance. Pass `null` for no initial data.

#### `Health($data = null)`

Create a new `HealthEntity` instance. Pass `null` for no initial data.

#### `PanchaVikasResource($data = null)`

Create a new `PanchaVikasResourceEntity` instance. Pass `null` for no initial data.

#### `PodcastEpisodeDetail($data = null)`

Create a new `PodcastEpisodeDetailEntity` instance. Pass `null` for no initial data.

#### `Practice($data = null)`

Create a new `PracticeEntity` instance. Pass `null` for no initial data.

#### `Resource($data = null)`

Create a new `ResourceEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): OpenMindfulnessUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BlogEntity

```php
$blog = $client->Blog();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_url` | `string` | No |  |
| `excerpt` | `string` | No |  |
| `id` | `string` | No |  |
| `tags` | `array` | No | Always an array, even when the post has no tags (never null). |
| `title` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Blog()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Blog()->load(["id" => "blog_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BlogEntity`

Create a new `BlogEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CategoryEntity

```php
$category = $client->Category();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `glossary` | `array` | No |  |
| `note` | `string` | No |  |
| `whitepapers` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Category()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CategoryEntity`

Create a new `CategoryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CitationDetailEntity

```php
$citation_detail = $client->CitationDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authors` | `string` | No |  |
| `id` | `string` | No | Deterministic public ID in the form "research:<slug>". |
| `journal` | `string` | No |  |
| `key_finding` | `string` | No |  |
| `limitations` | `string` | No |  |
| `related_posts` | `array` | No |  |
| `related_terms` | `array` | No |  |
| `sample_size` | `string` | No |  |
| `slug` | `string` | No |  |
| `source_url` | `string` | No |  |
| `study_type` | `string` | No |  |
| `summary` | `string` | No |  |
| `title` | `string` | No |  |
| `topic` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `year` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CitationDetail()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CitationDetail()->load(["slug" => "slug"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CitationDetailEntity`

Create a new `CitationDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GameDetailEntity

```php
$game_detail = $client->GameDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_max` | `int` | No |  |
| `age_min` | `int` | No |  |
| `api_id` | `string` | No |  |
| `audiences` | `array` | No |  |
| `description` | `string` | No |  |
| `duration_minutes` | `int` | No |  |
| `free` | `bool` | No |  |
| `icon` | `string` | No |  |
| `id` | `string` | No | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `array` | No |  |
| `skills` | `array` | No |  |
| `slug` | `string` | No |  |
| `tag` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->GameDetail()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->GameDetail()->load(["slug" => "slug"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GameDetailEntity`

Create a new `GameDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GlossaryEntity

```php
$glossary = $client->Glossary();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `array` | No |  |
| `etymology` | `string` | No |  |
| `extended_explanation` | `array` | No | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `string` | No | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `string` | No |  |
| `related_posts` | `array` | No |  |
| `related_terms` | `array` | No |  |
| `slug` | `string` | No |  |
| `summary` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Glossary()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Glossary()->load(["id" => "glossary_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GlossaryEntity`

Create a new `GlossaryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HealthEntity

```php
$health = $client->Health();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |
| `time` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Health()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HealthEntity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PanchaVikasResourceEntity

```php
$pancha_vikas_resource = $client->PanchaVikasResource();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PanchaVikasResource()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PanchaVikasResourceEntity`

Create a new `PanchaVikasResourceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PodcastEpisodeDetailEntity

```php
$podcast_episode_detail = $client->PodcastEpisodeDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alternate_language_id` | `string` | No | The same episode in the other language. |
| `audience` | `string` | No |  |
| `duration_iso` | `string` | No |  |
| `duration_seconds` | `int` | No |  |
| `episode_number` | `int` | No |  |
| `id` | `string` | No |  |
| `key_question` | `string` | No |  |
| `language` | `string` | No |  |
| `release_date` | `string` | No |  |
| `season_number` | `int` | No |  |
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PodcastEpisodeDetail()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->PodcastEpisodeDetail()->load(["id" => "podcast_episode_detail_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PodcastEpisodeDetailEntity`

Create a new `PodcastEpisodeDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PracticeEntity

```php
$practice = $client->Practice();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio_url` | `string` | No | Direct link to the MP3 file (Cloudflare R2). |
| `canonical_url` | `string` | No |  |
| `category` | `string` | No |  |
| `excerpt` | `string` | No |  |
| `id` | `string` | No | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `read_time_minutes` | `int` | No |  |
| `related_practices` | `array` | No | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `string` | No |  |
| `title` | `string` | No |  |
| `track_id` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Practice()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Practice()->load(["id" => "practice_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PracticeEntity`

Create a new `PracticeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResourceEntity

```php
$resource = $client->Resource();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `string` | No | e.g. |
| `age_max` | `int` | No |  |
| `age_min` | `int` | No |  |
| `audiences` | `array` | No |  |
| `category` | `string` | No |  |
| `duration_minutes` | `int` | No |  |
| `id` | `string` | No |  |
| `skills` | `array` | No |  |
| `slug` | `string` | No |  |
| `source_url` | `string` | No |  |
| `summary` | `string` | No |  |
| `tags` | `array` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Resource()->list(["q" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResourceEntity`

Create a new `ResourceEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new OpenMindfulnessSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

