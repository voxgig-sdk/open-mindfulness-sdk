# OpenMindfulness SDK exists test

import pytest
from openmindfulness_sdk import OpenMindfulnessSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpenMindfulnessSDK.test(None, None)
        assert testsdk is not None
