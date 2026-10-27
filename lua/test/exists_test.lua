-- OpenMindfulness SDK exists test

local sdk = require("open-mindfulness_sdk")

describe("OpenMindfulnessSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
