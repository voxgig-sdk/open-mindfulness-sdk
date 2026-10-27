# THC Open Mindfulness Resources API

> A free, public, read-only REST API exposing The Holistic Care&#39;s open mindfulness resources, research citations (whitepapers), a plain-language glossary, free mindfulness games, free guided-audio practices, blog post excerpts, The Holistic Care Podcast episodes (English and Hindi), and the public PanchaVikas early-years framework, as structured JSON. No authentication required. A unified `/v1/resources` browse endpoint and a `/v1/search` endpoint aggregate across every family at once. Blog endpoints expose metadata/excerpts only, full article content remains on the canonical The Holistic Care website. See `/docs` for a fair-use/attribution note and a versioning policy alongside this reference.
>
> Licensing note: this OpenAPI spec and the repository&#39;s code are MIT licensed (see the `license` field below and `LICENSE` in the repo). The *content* this API returns (research summaries, glossary entries, game descriptions, guided-practice metadata, blog excerpts, podcast episode summaries, PanchaVikas materials) is NOT covered by that MIT license, it remains Copyright © The Holistic Care, all rights reserved, unless a specific resource states otherwise. See `LICENSING.md` in the repository for the full breakdown of software license vs. API access terms vs. content rights vs. attribution.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 17 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Blog

Results: A paginated list of blog post excerpts.; A single blog post excerpt.

SDK operations: `list`, `load`.

Key fields to recognise:

- `tags`: Always an array, even when the post has no tags (never null).

### Category

Results: Distinct topics and pillars currently in use.

SDK operations: `load`.

### CitationDetail

Results: A paginated list of research citations. Cached at the edge for 1 hour (see /docs#caching).; A single research citation, including related terms and posts.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: Deterministic public ID in the form &quot;research:&lt;slug&gt;&quot;. Never the raw Sanity `_id`.

### GameDetail

Results: A paginated list of the free mindfulness games (`pagination.total` gives the current count).; A single mindfulness game.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: The stable public game ID (same value as `api_id`), in the form &quot;MG-*&quot;. Never the raw Sanity `_id`.

### Glossary

Results: A paginated list of glossary terms.; A single glossary term, including its extended explanation and related terms/posts.

SDK operations: `list`, `load`.

Key fields to recognise:

- `extended_explanation`: A small Portable Text block array (Sanity&#39;s rich-text format), not plain HTML or Markdown.
- `id`: Deterministic public ID in the form &quot;glossary:&lt;slug&gt;&quot;. Never the raw Sanity `_id`.

### Health

Results: Service is up.

SDK operations: `load`.

### PanchaVikasResource

Results: The 5 pathways plus the guide download resource.

SDK operations: `list`.

Key fields to recognise:

- `download_url`: Present only on the `panchavikas_download` item.

### PodcastEpisodeDetail

Results: A paginated list of podcast episodes, ordered by season, episode, language.; A single podcast episode.

SDK operations: `list`, `load`.

Key fields to recognise:

- `alternate_language_id`: The same episode in the other language.
- `summary`: The episode&#39;s short quick-answer summary.
- `url`: The episode page on theholisticcare.com.

### Practice

Results: A paginated list of free practices.; A single free practice, including related free practices.

SDK operations: `list`, `load`.

Key fields to recognise:

- `audio_url`: Direct link to the MP3 file (Cloudflare R2). Never proxied.
- `id`: The stable public track ID (same value as `track_id`), in the form &quot;SL-*&quot;. Never the raw Sanity `_id`.
- `related_practices`: Free practices only, a paid track can never appear here even as a reference.

### Resource

Results: A paginated list of matching normalized public resources.; A paginated list of normalized public resources.

SDK operations: `list`.

Key fields to recognise:

- `access`: for example &quot;free&quot;. Never &quot;paid&quot;, no paid content is ever exposed by this API.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Blog | `list` | `GET /v1/blog` | See reference |
| Blog | `load` | `GET /v1/blog/{slug}` | See reference |
| Category | `load` | `GET /v1/categories` | See reference |
| CitationDetail | `list` | `GET /v1/whitepapers` | See reference |
| CitationDetail | `load` | `GET /v1/whitepapers/{slug}` | See reference |
| GameDetail | `list` | `GET /v1/mindfulness-games` | See reference |
| GameDetail | `load` | `GET /v1/mindfulness-games/{slug}` | See reference |
| Glossary | `list` | `GET /v1/glossary` | See reference |
| Glossary | `load` | `GET /v1/glossary/{slug}` | See reference |
| Health | `load` | `GET /health` | See reference |
| PanchaVikasResource | `list` | `GET /v1/panchavikas/resources` | See reference |
| PodcastEpisodeDetail | `list` | `GET /v1/podcast/episodes` | See reference |
| PodcastEpisodeDetail | `load` | `GET /v1/podcast/episodes/{id}` | See reference |
| Practice | `list` | `GET /v1/practices` | See reference |
| Practice | `load` | `GET /v1/practices/{slug}` | See reference |
| Resource | `list` | `GET /v1/search` | See reference |
| Resource | `list` | `GET /v1/resources` | See reference |

## Connect to the API

- Production (only environment currently deployed): `https://api.theholisticcare.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `open-mindfulness_list`: List records for an entity. Supported entities: `blog`, `citation_detail`, `game_detail`, `glossary`, `pancha_vikas_resource`, `podcast_episode_detail`, `practice`, `resource`.
- `open-mindfulness_load`: Load one record for an entity. Supported entities: `blog`, `category`, `citation_detail`, `game_detail`, `glossary`, `health`, `podcast_episode_detail`, `practice`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

