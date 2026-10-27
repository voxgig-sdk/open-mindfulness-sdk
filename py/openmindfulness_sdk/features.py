# OpenMindfulness SDK feature factory

from openmindfulness_sdk.feature.base_feature import OpenMindfulnessBaseFeature
from openmindfulness_sdk.feature.ratelimit_feature import OpenMindfulnessRatelimitFeature
from openmindfulness_sdk.feature.retry_feature import OpenMindfulnessRetryFeature
from openmindfulness_sdk.feature.test_feature import OpenMindfulnessTestFeature
from openmindfulness_sdk.feature.timeout_feature import OpenMindfulnessTimeoutFeature


_FEATURES = {
    "base": lambda: OpenMindfulnessBaseFeature(),
    "ratelimit": lambda: OpenMindfulnessRatelimitFeature(),
    "retry": lambda: OpenMindfulnessRetryFeature(),
    "test": lambda: OpenMindfulnessTestFeature(),
    "timeout": lambda: OpenMindfulnessTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
