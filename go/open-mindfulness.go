package voxgigopenmindfulnesssdk

import (
	"github.com/voxgig-sdk/open-mindfulness-sdk/go/core"
	"github.com/voxgig-sdk/open-mindfulness-sdk/go/entity"
	"github.com/voxgig-sdk/open-mindfulness-sdk/go/feature"
	_ "github.com/voxgig-sdk/open-mindfulness-sdk/go/utility"
)

// Type aliases preserve external API.
type OpenMindfulnessSDK = core.OpenMindfulnessSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OpenMindfulnessEntity = core.OpenMindfulnessEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OpenMindfulnessError = core.OpenMindfulnessError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewBlogEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewBlogEntity(client, entopts)
	}
	core.NewCategoryEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewCategoryEntity(client, entopts)
	}
	core.NewCitationDetailEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewCitationDetailEntity(client, entopts)
	}
	core.NewGameDetailEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewGameDetailEntity(client, entopts)
	}
	core.NewGlossaryEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewGlossaryEntity(client, entopts)
	}
	core.NewHealthEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewHealthEntity(client, entopts)
	}
	core.NewPanchaVikasResourceEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewPanchaVikasResourceEntity(client, entopts)
	}
	core.NewPodcastEpisodeDetailEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewPodcastEpisodeDetailEntity(client, entopts)
	}
	core.NewPracticeEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewPracticeEntity(client, entopts)
	}
	core.NewResourceEntityFunc = func(client *core.OpenMindfulnessSDK, entopts map[string]any) core.OpenMindfulnessEntity {
		return entity.NewResourceEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOpenMindfulnessSDK = core.NewOpenMindfulnessSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewOpenMindfulnessSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *OpenMindfulnessSDK  { return NewOpenMindfulnessSDK(nil) }
func Test() *OpenMindfulnessSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
