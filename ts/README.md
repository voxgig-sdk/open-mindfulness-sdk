# OpenMindfulness TypeScript SDK



The TypeScript SDK for the OpenMindfulness API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Blog()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/open-mindfulness-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/open-mindfulness-sdk
npm install ./open-mindfulness-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OpenMindfulnessSDK } from '@voxgig-sdk/open-mindfulness-sdk'

const client = new OpenMindfulnessSDK()
```

### 2. List blog records

`list()` resolves to an array of Blog ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const blogs = await client.Blog().list()

for (const blog of blogs) {
  console.log(blog.data())
}
```

### 3. Load a blog

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const blog = await client.Blog().load({ id: 'example_id' })
  console.log(blog.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const glossarys = await client.Glossary().list()
  console.log(glossarys.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OpenMindfulnessSDK.test()

const glossarys = await client.Glossary().list()
// glossarys is an array of Glossary entities, one per mock record
console.log(glossarys.map((glossary) => glossary.data()))
```

You can also use the instance method:

```ts
const client = new OpenMindfulnessSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Glossary()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OpenMindfulnessSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPEN_MINDFULNESS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### OpenMindfulnessSDK

#### Constructor

```ts
new OpenMindfulnessSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Blog(data?)` | `BlogEntity` | Create a Blog entity instance. |
| `Category(data?)` | `CategoryEntity` | Create a Category entity instance. |
| `CitationDetail(data?)` | `CitationDetailEntity` | Create a CitationDetail entity instance. |
| `GameDetail(data?)` | `GameDetailEntity` | Create a GameDetail entity instance. |
| `Glossary(data?)` | `GlossaryEntity` | Create a Glossary entity instance. |
| `Health(data?)` | `HealthEntity` | Create a Health entity instance. |
| `PanchaVikasResource(data?)` | `PanchaVikasResourceEntity` | Create a PanchaVikasResource entity instance. |
| `PodcastEpisodeDetail(data?)` | `PodcastEpisodeDetailEntity` | Create a PodcastEpisodeDetail entity instance. |
| `Practice(data?)` | `PracticeEntity` | Create a Practice entity instance. |
| `Resource(data?)` | `ResourceEntity` | Create a Resource entity instance. |
| `tester(testopts?, sdkopts?)` | `OpenMindfulnessSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OpenMindfulnessSDK.test(testopts?, sdkopts?)` | `OpenMindfulnessSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpenMindfulnessSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Blog

| Field | Description |
| --- | --- |
| `canonical_url` |  |
| `excerpt` |  |
| `id` |  |
| `tags` | Always an array, even when the post has no tags (never null). |
| `title` |  |

Operations: list, load.

API path: `/v1/blog`

#### Category

| Field | Description |
| --- | --- |
| `glossary` |  |
| `note` |  |
| `whitepapers` |  |

Operations: load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/v1/glossary`

#### Health

| Field | Description |
| --- | --- |
| `status` |  |
| `time` |  |
| `version` |  |

Operations: load.

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

Operations: list.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list.

API path: `/v1/search`



## Entities


### Blog

Create an instance: `const blog = client.Blog()`

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
| `tags` | `any[]` | Always an array, even when the post has no tags (never null). |
| `title` | `string` |  |

#### Example: Load

```ts
const blog = await client.Blog().load({ id: 'blog_id' })
```

#### Example: List

```ts
const blogs = await client.Blog().list()
```


### Category

Create an instance: `const category = client.Category()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `glossary` | `Record<string, any>` |  |
| `note` | `string` |  |
| `whitepapers` | `Record<string, any>` |  |

#### Example: Load

```ts
const category = await client.Category().load()
```


### CitationDetail

Create an instance: `const citation_detail = client.CitationDetail()`

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
| `related_posts` | `any[]` |  |
| `related_terms` | `any[]` |  |
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

```ts
const citation_detail = await client.CitationDetail().load({ slug: 'slug' })
```

#### Example: List

```ts
const citation_details = await client.CitationDetail().list()
```


### GameDetail

Create an instance: `const game_detail = client.GameDetail()`

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
| `audiences` | `any[]` |  |
| `description` | `string` |  |
| `duration_minutes` | `number` |  |
| `free` | `boolean` |  |
| `icon` | `string` |  |
| `id` | `string` | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `any[]` |  |
| `skills` | `any[]` |  |
| `slug` | `string` |  |
| `tag` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const game_detail = await client.GameDetail().load({ slug: 'slug' })
```

#### Example: List

```ts
const game_details = await client.GameDetail().list()
```


### Glossary

Create an instance: `const glossary = client.Glossary()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `any[]` |  |
| `etymology` | `string` |  |
| `extended_explanation` | `any[]` | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `string` | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `string` |  |
| `related_posts` | `any[]` |  |
| `related_terms` | `any[]` |  |
| `slug` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const glossary = await client.Glossary().load({ id: 'glossary_id' })
```

#### Example: List

```ts
const glossarys = await client.Glossary().list()
```


### Health

Create an instance: `const health = client.Health()`

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

```ts
const health = await client.Health().load()
```


### PanchaVikasResource

Create an instance: `const pancha_vikas_resource = client.PanchaVikasResource()`

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

```ts
const pancha_vikas_resources = await client.PanchaVikasResource().list()
```


### PodcastEpisodeDetail

Create an instance: `const podcast_episode_detail = client.PodcastEpisodeDetail()`

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

```ts
const podcast_episode_detail = await client.PodcastEpisodeDetail().load({ id: 'podcast_episode_detail_id' })
```

#### Example: List

```ts
const podcast_episode_details = await client.PodcastEpisodeDetail().list()
```


### Practice

Create an instance: `const practice = client.Practice()`

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
| `related_practices` | `any[]` | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `string` |  |
| `title` | `string` |  |
| `track_id` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const practice = await client.Practice().load({ id: 'practice_id' })
```

#### Example: List

```ts
const practices = await client.Practice().list()
```


### Resource

Create an instance: `const resource = client.Resource()`

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
| `audiences` | `any[]` |  |
| `category` | `string` |  |
| `duration_minutes` | `number` |  |
| `id` | `string` |  |
| `skills` | `any[]` |  |
| `slug` | `string` |  |
| `source_url` | `string` |  |
| `summary` | `string` |  |
| `tags` | `any[]` |  |
| `title` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```ts
const resources = await client.Resource().list({ q: "example" })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
open-mindfulness/
├── src/
│   ├── OpenMindfulnessSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OpenMindfulnessSDK } from '@voxgig-sdk/open-mindfulness-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const glossary = client.Glossary()
await glossary.list()

// glossary.data() now returns the glossary data from the last `list`
// glossary.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
