# OpenMindfulness SDK exists test

require "minitest/autorun"
require_relative "../OpenMindfulness_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OpenMindfulnessSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
