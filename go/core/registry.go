package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBlogEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

var NewCategoryEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

var NewCitationDetailEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

var NewGameDetailEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

var NewGlossaryEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

var NewHealthEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

var NewPanchaVikasResourceEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

var NewPodcastEpisodeDetailEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

var NewPracticeEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

var NewResourceEntityFunc func(client *OpenMindfulnessSDK, entopts map[string]any) OpenMindfulnessEntity

