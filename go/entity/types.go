// Typed models for the OpenMindfulness SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/open-mindfulness-sdk/go/core"
)

// Blog is the typed data model for the blog entity.
type Blog struct {
}

// BlogLoadMatch is the typed request payload for Blog.LoadTyped.
type BlogLoadMatch struct {
	Id string `json:"id"`
}

// BlogListMatch is the typed request payload for Blog.ListTyped.
type BlogListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Q *string `json:"q,omitempty"`
	Tag *string `json:"tag,omitempty"`
}

// Category is the typed data model for the category entity.
type Category struct {
}

// CategoryLoadMatch is the typed request payload for Category.LoadTyped.
type CategoryLoadMatch struct {
	Glossary *map[string]any `json:"glossary,omitempty"`
	Note *string `json:"note,omitempty"`
	Whitepapers *map[string]any `json:"whitepapers,omitempty"`
}

// CitationDetail is the typed data model for the citation_detail entity.
type CitationDetail struct {
}

// CitationDetailLoadMatch is the typed request payload for CitationDetail.LoadTyped.
type CitationDetailLoadMatch struct {
	Slug string `json:"slug"`
}

// CitationDetailListMatch is the typed request payload for CitationDetail.ListTyped.
type CitationDetailListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	StudyType *string `json:"study_type,omitempty"`
	Topic *string `json:"topic,omitempty"`
}

// GameDetail is the typed data model for the game_detail entity.
type GameDetail struct {
}

// GameDetailLoadMatch is the typed request payload for GameDetail.LoadTyped.
type GameDetailLoadMatch struct {
	Slug string `json:"slug"`
}

// GameDetailListMatch is the typed request payload for GameDetail.ListTyped.
type GameDetailListMatch struct {
	Audience *string `json:"audience,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Skill *string `json:"skill,omitempty"`
}

// Glossary is the typed data model for the glossary entity.
type Glossary struct {
}

// GlossaryLoadMatch is the typed request payload for Glossary.LoadTyped.
type GlossaryLoadMatch struct {
	Id string `json:"id"`
}

// GlossaryListMatch is the typed request payload for Glossary.ListTyped.
type GlossaryListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Pillar *string `json:"pillar,omitempty"`
}

// Health is the typed data model for the health entity.
type Health struct {
}

// HealthLoadMatch is the typed request payload for Health.LoadTyped.
type HealthLoadMatch struct {
	Status *string `json:"status,omitempty"`
	Time *string `json:"time,omitempty"`
	Version *string `json:"version,omitempty"`
}

// PanchaVikasResource is the typed data model for the pancha_vikas_resource entity.
type PanchaVikasResource struct {
}

// PanchaVikasResourceListMatch is the typed request payload for PanchaVikasResource.ListTyped.
type PanchaVikasResourceListMatch struct {
	DownloadUrl *string `json:"download_url,omitempty"`
	Id *string `json:"id,omitempty"`
	SourceUrl *string `json:"source_url,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
}

// PodcastEpisodeDetail is the typed data model for the podcast_episode_detail entity.
type PodcastEpisodeDetail struct {
}

// PodcastEpisodeDetailLoadMatch is the typed request payload for PodcastEpisodeDetail.LoadTyped.
type PodcastEpisodeDetailLoadMatch struct {
	Id string `json:"id"`
}

// PodcastEpisodeDetailListMatch is the typed request payload for PodcastEpisodeDetail.ListTyped.
type PodcastEpisodeDetailListMatch struct {
	Lang *string `json:"lang,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Season *int `json:"season,omitempty"`
}

// Practice is the typed data model for the practice entity.
type Practice struct {
}

// PracticeLoadMatch is the typed request payload for Practice.LoadTyped.
type PracticeLoadMatch struct {
	Id string `json:"id"`
}

// PracticeListMatch is the typed request payload for Practice.ListTyped.
type PracticeListMatch struct {
	Category *string `json:"category,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
}

// Resource is the typed data model for the resource entity.
type Resource struct {
}

// ResourceListMatch is the typed request payload for Resource.ListTyped.
type ResourceListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Q string `json:"q"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
