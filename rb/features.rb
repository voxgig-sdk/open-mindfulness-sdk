# OpenMindfulness SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpenMindfulnessFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenMindfulnessBaseFeature.new
    when "ratelimit"
      OpenMindfulnessRatelimitFeature.new
    when "retry"
      OpenMindfulnessRetryFeature.new
    when "test"
      OpenMindfulnessTestFeature.new
    when "timeout"
      OpenMindfulnessTimeoutFeature.new
    else
      OpenMindfulnessBaseFeature.new
    end
  end
end
