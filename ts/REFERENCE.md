# OpenMindfulness TypeScript SDK Reference

Complete API reference for the OpenMindfulness TypeScript SDK.


## OpenMindfulnessSDK

### Constructor

```ts
new OpenMindfulnessSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenMindfulnessSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpenMindfulnessSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpenMindfulnessSDK` instance in test mode.


### Instance Methods

#### `Blog(data?: object)`

Create a new `Blog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BlogEntity` instance.

#### `Category(data?: object)`

Create a new `Category` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CategoryEntity` instance.

#### `CitationDetail(data?: object)`

Create a new `CitationDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CitationDetailEntity` instance.

#### `GameDetail(data?: object)`

Create a new `GameDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GameDetailEntity` instance.

#### `Glossary(data?: object)`

Create a new `Glossary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GlossaryEntity` instance.

#### `Health(data?: object)`

Create a new `Health` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HealthEntity` instance.

#### `PanchaVikasResource(data?: object)`

Create a new `PanchaVikasResource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PanchaVikasResourceEntity` instance.

#### `PodcastEpisodeDetail(data?: object)`

Create a new `PodcastEpisodeDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PodcastEpisodeDetailEntity` instance.

#### `Practice(data?: object)`

Create a new `Practice` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PracticeEntity` instance.

#### `Resource(data?: object)`

Create a new `Resource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResourceEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OpenMindfulnessSDK.test()`.

**Returns:** `OpenMindfulnessSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## BlogEntity

```ts
const blog = client.Blog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_url` | `string` | No |  |
| `excerpt` | `string` | No |  |
| `id` | `string` | No |  |
| `tags` | `any[]` | No | Always an array, even when the post has no tags (never null). |
| `title` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Blog().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Blog().load({ id: 'blog_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BlogEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CategoryEntity

```ts
const category = client.Category()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `glossary` | `Record<string, any>` | No |  |
| `note` | `string` | No |  |
| `whitepapers` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Category().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CategoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CitationDetailEntity

```ts
const citation_detail = client.CitationDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authors` | `string` | No |  |
| `id` | `string` | No | Deterministic public ID in the form "research:<slug>". |
| `journal` | `string` | No |  |
| `key_finding` | `string` | No |  |
| `limitations` | `string` | No |  |
| `related_posts` | `any[]` | No |  |
| `related_terms` | `any[]` | No |  |
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CitationDetail().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CitationDetail().load({ slug: 'slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CitationDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GameDetailEntity

```ts
const game_detail = client.GameDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_max` | `number` | No |  |
| `age_min` | `number` | No |  |
| `api_id` | `string` | No |  |
| `audiences` | `any[]` | No |  |
| `description` | `string` | No |  |
| `duration_minutes` | `number` | No |  |
| `free` | `boolean` | No |  |
| `icon` | `string` | No |  |
| `id` | `string` | No | The stable public game ID (same value as `api_id`), in the form "MG-*". |
| `keywords` | `any[]` | No |  |
| `skills` | `any[]` | No |  |
| `slug` | `string` | No |  |
| `tag` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.GameDetail().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.GameDetail().load({ slug: 'slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GameDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GlossaryEntity

```ts
const glossary = client.Glossary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `any[]` | No |  |
| `etymology` | `string` | No |  |
| `extended_explanation` | `any[]` | No | A small Portable Text block array (Sanity's rich-text format), not plain HTML or Markdown. |
| `id` | `string` | No | Deterministic public ID in the form "glossary:<slug>". |
| `pillar` | `string` | No |  |
| `related_posts` | `any[]` | No |  |
| `related_terms` | `any[]` | No |  |
| `slug` | `string` | No |  |
| `summary` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Glossary().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Glossary().load({ id: 'glossary_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GlossaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HealthEntity

```ts
const health = client.Health()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |
| `time` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Health().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HealthEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PanchaVikasResourceEntity

```ts
const pancha_vikas_resource = client.PanchaVikasResource()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PanchaVikasResource().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PanchaVikasResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PodcastEpisodeDetailEntity

```ts
const podcast_episode_detail = client.PodcastEpisodeDetail()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PodcastEpisodeDetail().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PodcastEpisodeDetail().load({ id: 'podcast_episode_detail_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PodcastEpisodeDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PracticeEntity

```ts
const practice = client.Practice()
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
| `related_practices` | `any[]` | No | Free practices only — a paid track can never appear here even as a reference. |
| `slug` | `string` | No |  |
| `title` | `string` | No |  |
| `track_id` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Practice().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Practice().load({ id: 'practice_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PracticeEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResourceEntity

```ts
const resource = client.Resource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `string` | No | e.g. |
| `age_max` | `number` | No |  |
| `age_min` | `number` | No |  |
| `audiences` | `any[]` | No |  |
| `category` | `string` | No |  |
| `duration_minutes` | `number` | No |  |
| `id` | `string` | No |  |
| `skills` | `any[]` | No |  |
| `slug` | `string` | No |  |
| `source_url` | `string` | No |  |
| `summary` | `string` | No |  |
| `tags` | `any[]` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Resource().list({ q: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenMindfulnessSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new OpenMindfulnessSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

