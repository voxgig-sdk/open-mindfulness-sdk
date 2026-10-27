# OpenMindfulness Golang SDK



The Golang SDK for the OpenMindfulness API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Blog(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/open-mindfulness-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/open-mindfulness-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/open-mindfulness-sdk/go=../open-mindfulness-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/open-mindfulness-sdk/go"
)

func main() {
    client := sdk.New()

    // List blog records — the value is a []any of entities, one per record.
    blogs, err := client.Blog(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range blogs.([]any) {
        fmt.Println(item.(sdk.Entity).Data())
    }

    // Load a single blog — the value is the entity; Data() reads its record.
    blog, err := client.Blog(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(blog.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
glossarys, err := client.Glossary(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = glossarys
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

glossarys, err := client.Glossary(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range glossarys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewOpenMindfulnessSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewOpenMindfulnessSDK

```go
func NewOpenMindfulnessSDK(options map[string]any) *OpenMindfulnessSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *OpenMindfulnessSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenMindfulnessSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Blog` | `(data map[string]any) OpenMindfulnessEntity` | Create a Blog entity instance. |
| `Category` | `(data map[string]any) OpenMindfulnessEntity` | Create a Category entity instance. |
| `CitationDetail` | `(data map[string]any) OpenMindfulnessEntity` | Create a CitationDetail entity instance. |
| `GameDetail` | `(data map[string]any) OpenMindfulnessEntity` | Create a GameDetail entity instance. |
| `Glossary` | `(data map[string]any) OpenMindfulnessEntity` | Create a Glossary entity instance. |
| `Health` | `(data map[string]any) OpenMindfulnessEntity` | Create a Health entity instance. |
| `PanchaVikasResource` | `(data map[string]any) OpenMindfulnessEntity` | Create a PanchaVikasResource entity instance. |
| `PodcastEpisodeDetail` | `(data map[string]any) OpenMindfulnessEntity` | Create a PodcastEpisodeDetail entity instance. |
| `Practice` | `(data map[string]any) OpenMindfulnessEntity` | Create a Practice entity instance. |
| `Resource` | `(data map[string]any) OpenMindfulnessEntity` | Create a Resource entity instance. |

### Entity interface (OpenMindfulnessEntity)

All entities implement the `OpenMindfulnessEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    blog, err := client.Blog(nil).List(nil, nil)
    if err != nil { /* handle */ }
    // blog is a []any of entities, one per record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Blog

| Field | Description |
| --- | --- |
| `"canonical_url"` |  |
| `"excerpt"` |  |
| `"id"` |  |
| `"tags"` | Always an array, even when the post has no tags (never null). |
| `"title"` |  |

Operations: List, Load.

API path: `/v1/blog`

#### Category

| Field | Description |
| --- | --- |
| `"glossary"` |  |
| `"note"` |  |
| `"whitepapers"` |  |

Operations: Load.

API path: `/v1/categories`

#### CitationDetail

| Field | Description |
| --- | --- |
| `"authors"` |  |
| `"id"` | Deterministic public ID in the form "research:<slug>". |
| `"journal"` |  |
| `"key_finding"` |  |
| `"limitations"` |  |
| `"related_posts"` |  |
| `"related_terms"` |  |
| `"sample_size"` |  |
| `"slug"` |  |
| `"source_url"` |  |
| `"study_type"` |  |
| `"summary"` |  |
| `"title"` |  |
| `"topic"` |  |
| `"type"` |  |
| `"updated_at"` |  |
| `"year"` |  |

Operations: List, Load.

API path: `/v1/whitepapers`

#### GameDetail

| Field | Description |
| --- | --- |
| `"age_max"` |  |
| `"age_min"` |  |
| `"api_id"` |  |
| `"audiences"` |  |
| `"description"` |  |
| `"duration_minutes"` |  |
| `"free"` |  |
| `"icon"` |  |
| `"id"` | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `"keywords"` |  |
| `"skills"` |  |
| `"slug"` |  |
| `"tag"` |  |
| `"title"` |  |
| `"type"` |  |
| `"updated_at"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/v1/mindfulness-games`

#### Glossary

| Field | Description |
| --- | --- |
| `"also_known_as"` |  |
| `"etymology"` |  |
| `"extended_explanation"` | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `"id"` | Deterministic public ID in the form "glossary:<slug>". |
| `"pillar"` |  |
| `"related_posts"` |  |
| `"related_terms"` |  |
| `"slug"` |  |
| `"summary"` |  |
| `"title"` |  |
| `"type"` |  |
| `"updated_at"` |  |

Operations: List, Load.

API path: `/v1/glossary`

#### Health

| Field | Description |
| --- | --- |
| `"status"` |  |
| `"time"` |  |
| `"version"` |  |

Operations: Load.

API path: `/health`

#### PanchaVikasResource

| Field | Description |
| --- | --- |
| `"download_url"` | Present only on the panchavikas_download item. |
| `"id"` |  |
| `"source_url"` |  |
| `"summary"` |  |
| `"title"` |  |
| `"type"` |  |

Operations: List.

API path: `/v1/panchavikas/resources`

#### PodcastEpisodeDetail

| Field | Description |
| --- | --- |
| `"alternate_language_id"` | The same episode in the other language. |
| `"audience"` |  |
| `"duration_iso"` |  |
| `"duration_seconds"` |  |
| `"episode_number"` |  |
| `"id"` |  |
| `"key_question"` |  |
| `"language"` |  |
| `"release_date"` |  |
| `"season_number"` |  |
| `"season_title"` |  |
| `"short_title"` |  |
| `"slug"` |  |
| `"summary"` | The episode's short quick-answer summary. |
| `"title"` |  |
| `"type"` |  |
| `"updated_at"` |  |
| `"url"` | The episode page on theholisticcare.com. |
| `"youtube_url"` |  |

Operations: List, Load.

API path: `/v1/podcast/episodes`

#### Practice

| Field | Description |
| --- | --- |
| `"audio_url"` | Direct link to the MP3 file (Cloudflare R2). |
| `"canonical_url"` |  |
| `"category"` |  |
| `"excerpt"` |  |
| `"id"` | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `"read_time_minutes"` |  |
| `"related_practices"` | Free practices only — a paid track can never appear here even as a reference. |
| `"slug"` |  |
| `"title"` |  |
| `"track_id"` |  |
| `"type"` |  |
| `"updated_at"` |  |

Operations: List, Load.

API path: `/v1/practices`

#### Resource

| Field | Description |
| --- | --- |
| `"access"` | e.g. |
| `"age_max"` |  |
| `"age_min"` |  |
| `"audiences"` |  |
| `"category"` |  |
| `"duration_minutes"` |  |
| `"id"` |  |
| `"skills"` |  |
| `"slug"` |  |
| `"source_url"` |  |
| `"summary"` |  |
| `"tags"` |  |
| `"title"` |  |
| `"type"` |  |
| `"updated_at"` |  |

Operations: List.

API path: `/v1/search`



## Entities


### Blog

Create an instance: `blog := client.Blog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canonical_url` | `string` |  |
| `excerpt` | `string` |  |
| `id` | `string` |  |
| `tags` | `[]any` | Always an array, even when the post has no tags (never null). |
| `title` | `string` |  |

#### Example: Load

```go
blog, err := client.Blog(nil).Load(map[string]any{"id": "blog_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(blog.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
blogs, err := client.Blog(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range blogs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Category

Create an instance: `category := client.Category(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `glossary` | `map[string]any` |  |
| `note` | `string` |  |
| `whitepapers` | `map[string]any` |  |

#### Example: Load

```go
category, err := client.Category(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(category.(sdk.Entity).Data()) // the loaded entity's record
```


### CitationDetail

Create an instance: `citationDetail := client.CitationDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authors` | `string` |  |
| `id` | `string` | Deterministic public ID in the form "research:<slug>". |
| `journal` | `string` |  |
| `key_finding` | `string` |  |
| `limitations` | `string` |  |
| `related_posts` | `[]any` |  |
| `related_terms` | `[]any` |  |
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

```go
citationDetail, err := client.CitationDetail(nil).Load(map[string]any{"slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(citationDetail.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
citationDetails, err := client.CitationDetail(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range citationDetails.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### GameDetail

Create an instance: `gameDetail := client.GameDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_max` | `int` |  |
| `age_min` | `int` |  |
| `api_id` | `string` |  |
| `audiences` | `[]any` |  |
| `description` | `string` |  |
| `duration_minutes` | `int` |  |
| `free` | `bool` |  |
| `icon` | `string` |  |
| `id` | `string` | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `[]any` |  |
| `skills` | `[]any` |  |
| `slug` | `string` |  |
| `tag` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
gameDetail, err := client.GameDetail(nil).Load(map[string]any{"slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(gameDetail.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
gameDetails, err := client.GameDetail(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range gameDetails.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Glossary

Create an instance: `glossary := client.Glossary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `[]any` |  |
| `etymology` | `string` |  |
| `extended_explanation` | `[]any` | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `string` | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `string` |  |
| `related_posts` | `[]any` |  |
| `related_terms` | `[]any` |  |
| `slug` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
glossary, err := client.Glossary(nil).Load(map[string]any{"id": "glossary_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(glossary.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
glossarys, err := client.Glossary(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range glossarys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Health

Create an instance: `health := client.Health(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `string` |  |
| `time` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```go
health, err := client.Health(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(health.(sdk.Entity).Data()) // the loaded entity's record
```


### PanchaVikasResource

Create an instance: `panchaVikasResource := client.PanchaVikasResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
panchaVikasResources, err := client.PanchaVikasResource(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range panchaVikasResources.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PodcastEpisodeDetail

Create an instance: `podcastEpisodeDetail := client.PodcastEpisodeDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
podcastEpisodeDetail, err := client.PodcastEpisodeDetail(nil).Load(map[string]any{"id": "podcast_episode_detail_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(podcastEpisodeDetail.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
podcastEpisodeDetails, err := client.PodcastEpisodeDetail(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range podcastEpisodeDetails.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Practice

Create an instance: `practice := client.Practice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio_url` | `string` | Direct link to the MP3 file (Cloudflare R2). |
| `canonical_url` | `string` |  |
| `category` | `string` |  |
| `excerpt` | `string` |  |
| `id` | `string` | The stable public track ID (same value as `track_id`), in the form "SL-*". |
| `read_time_minutes` | `int` |  |
| `related_practices` | `[]any` | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `string` |  |
| `title` | `string` |  |
| `track_id` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
practice, err := client.Practice(nil).Load(map[string]any{"id": "practice_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(practice.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
practices, err := client.Practice(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range practices.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Resource

Create an instance: `resource := client.Resource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `string` | e.g. |
| `age_max` | `int` |  |
| `age_min` | `int` |  |
| `audiences` | `[]any` |  |
| `category` | `string` |  |
| `duration_minutes` | `int` |  |
| `id` | `string` |  |
| `skills` | `[]any` |  |
| `slug` | `string` |  |
| `source_url` | `string` |  |
| `summary` | `string` |  |
| `tags` | `[]any` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```go
resources, err := client.Resource(nil).List(map[string]any{"q": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range resources.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/open-mindfulness-sdk/go/
├── open-mindfulness.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/open-mindfulness-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
glossary := client.Glossary(nil)
glossary.List(nil, nil)

// glossary.Data() now returns the glossary data from the last list
// glossary.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
