# OpenMindfulness SDK utility: prepare_body
require_relative 'media'
module OpenMindfulnessUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return OpenMindfulnessUtilities.raw_body(ctx.reqdata) if OpenMindfulnessUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
