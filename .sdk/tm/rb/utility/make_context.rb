# OpenMindfulness SDK utility: make_context
require_relative '../core/context'
module OpenMindfulnessUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpenMindfulnessContext.new(ctxmap, basectx)
  }
end
