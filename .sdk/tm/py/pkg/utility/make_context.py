# OpenMindfulness SDK utility: make_context

from projectname_sdk.core.context import OpenMindfulnessContext


def make_context_util(ctxmap, basectx):
    return OpenMindfulnessContext(ctxmap, basectx)
