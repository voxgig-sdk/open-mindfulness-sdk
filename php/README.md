# OpenMindfulness PHP SDK



The PHP SDK for the OpenMindfulness API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Blog()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/open-mindfulness-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/open-mindfulness-sdk
composer config repositories.open-mindfulness-sdk path ./open-mindfulness-sdk/php
composer require voxgig-sdk/open-mindfulness-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'openmindfulness_sdk.php';

$client = new OpenMindfulnessSDK();
```

### 2. List blog records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $blogs = $client->Blog()->list();
    foreach ($blogs as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["canonical_url"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a blog

```php
try {
    // load() returns the ENTITY — call data_get() for the Blog record (throws on error).
    $blog = $client->Blog()->load(["id" => "example_id"]);
    print_r($blog->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $glossarys = $client->Glossary()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = OpenMindfulnessSDK::test([
    "entity" => ["glossary" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$glossary = $client->Glossary()->list();
print_r(array_map(fn($item) => $item->data_get(), $glossary));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new OpenMindfulnessSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPEN_MINDFULNESS_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### OpenMindfulnessSDK

```php
require_once 'openmindfulness_sdk.php';
$client = new OpenMindfulnessSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = OpenMindfulnessSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### OpenMindfulnessSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Blog` | `($data): BlogEntity` | Create a Blog entity instance. |
| `Category` | `($data): CategoryEntity` | Create a Category entity instance. |
| `CitationDetail` | `($data): CitationDetailEntity` | Create a CitationDetail entity instance. |
| `GameDetail` | `($data): GameDetailEntity` | Create a GameDetail entity instance. |
| `Glossary` | `($data): GlossaryEntity` | Create a Glossary entity instance. |
| `Health` | `($data): HealthEntity` | Create a Health entity instance. |
| `PanchaVikasResource` | `($data): PanchaVikasResourceEntity` | Create a PanchaVikasResource entity instance. |
| `PodcastEpisodeDetail` | `($data): PodcastEpisodeDetailEntity` | Create a PodcastEpisodeDetail entity instance. |
| `Practice` | `($data): PracticeEntity` | Create a Practice entity instance. |
| `Resource` | `($data): ResourceEntity` | Create a Resource entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$blog = $client->Blog();`

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
| `tags` | `array` | Always an array, even when the post has no tags (never null). |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Blog record (throws on error).
$blog = $client->Blog()->load(["id" => "blog_id"]);
```

#### Example: List

```php
// list() returns an array of Blog entities, one per record (throws on error).
$blogs = $client->Blog()->list();
```


### Category

Create an instance: `$category = $client->Category();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `glossary` | `array` |  |
| `note` | `string` |  |
| `whitepapers` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Category record (throws on error).
$category = $client->Category()->load();
```


### CitationDetail

Create an instance: `$citation_detail = $client->CitationDetail();`

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
| `related_posts` | `array` |  |
| `related_terms` | `array` |  |
| `sample_size` | `string` |  |
| `slug` | `string` |  |
| `source_url` | `string` |  |
| `study_type` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `topic` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `year` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CitationDetail record (throws on error).
$citation_detail = $client->CitationDetail()->load(["slug" => "slug"]);
```

#### Example: List

```php
// list() returns an array of CitationDetail entities, one per record (throws on error).
$citation_details = $client->CitationDetail()->list();
```


### GameDetail

Create an instance: `$game_detail = $client->GameDetail();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_max` | `int` |  |
| `age_min` | `int` |  |
| `api_id` | `string` |  |
| `audiences` | `array` |  |
| `description` | `string` |  |
| `duration_minutes` | `int` |  |
| `free` | `bool` |  |
| `icon` | `string` |  |
| `id` | `string` | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `array` |  |
| `skills` | `array` |  |
| `slug` | `string` |  |
| `tag` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GameDetail record (throws on error).
$game_detail = $client->GameDetail()->load(["slug" => "slug"]);
```

#### Example: List

```php
// list() returns an array of GameDetail entities, one per record (throws on error).
$game_details = $client->GameDetail()->list();
```


### Glossary

Create an instance: `$glossary = $client->Glossary();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `array` |  |
| `etymology` | `string` |  |
| `extended_explanation` | `array` | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `string` | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `string` |  |
| `related_posts` | `array` |  |
| `related_terms` | `array` |  |
| `slug` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Glossary record (throws on error).
$glossary = $client->Glossary()->load(["id" => "glossary_id"]);
```

#### Example: List

```php
// list() returns an array of Glossary entities, one per record (throws on error).
$glossarys = $client->Glossary()->list();
```


### Health

Create an instance: `$health = $client->Health();`

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

```php
// load() returns the ENTITY — call data_get() for the Health record (throws on error).
$health = $client->Health()->load();
```


### PanchaVikasResource

Create an instance: `$pancha_vikas_resource = $client->PanchaVikasResource();`

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

```php
// list() returns an array of PanchaVikasResource entities, one per record (throws on error).
$pancha_vikas_resources = $client->PanchaVikasResource()->list();
```


### PodcastEpisodeDetail

Create an instance: `$podcast_episode_detail = $client->PodcastEpisodeDetail();`

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
| `duration_seconds` | `int` |  |
| `episode_number` | `int` |  |
| `id` | `string` |  |
| `key_question` | `string` |  |
| `language` | `string` |  |
| `release_date` | `string` |  |
| `season_number` | `int` |  |
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

```php
// load() returns the ENTITY — call data_get() for the PodcastEpisodeDetail record (throws on error).
$podcast_episode_detail = $client->PodcastEpisodeDetail()->load(["id" => "podcast_episode_detail_id"]);
```

#### Example: List

```php
// list() returns an array of PodcastEpisodeDetail entities, one per record (throws on error).
$podcast_episode_details = $client->PodcastEpisodeDetail()->list();
```


### Practice

Create an instance: `$practice = $client->Practice();`

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
| `read_time_minutes` | `int` |  |
| `related_practices` | `array` | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `string` |  |
| `title` | `string` |  |
| `track_id` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Practice record (throws on error).
$practice = $client->Practice()->load(["id" => "practice_id"]);
```

#### Example: List

```php
// list() returns an array of Practice entities, one per record (throws on error).
$practices = $client->Practice()->list();
```


### Resource

Create an instance: `$resource = $client->Resource();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `string` | e.g. |
| `age_max` | `int` |  |
| `age_min` | `int` |  |
| `audiences` | `array` |  |
| `category` | `string` |  |
| `duration_minutes` | `int` |  |
| `id` | `string` |  |
| `skills` | `array` |  |
| `slug` | `string` |  |
| `source_url` | `string` |  |
| `summary` | `string` |  |
| `tags` | `array` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```php
// list() returns an array of Resource entities, one per record (throws on error).
$resources = $client->Resource()->list(["q" => "example"]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── openmindfulness_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`openmindfulness_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$glossary = $client->Glossary();
$glossary->list();

// $glossary->data_get() now returns the glossary data from the last list
// $glossary->match_get() returns the last match criteria
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
