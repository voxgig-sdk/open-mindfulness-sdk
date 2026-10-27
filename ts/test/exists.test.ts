
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenMindfulnessSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OpenMindfulnessSDK.test()
    equal(testsdk instanceof OpenMindfulnessSDK, true,
      'OpenMindfulnessSDK.test() must return a client synchronously')
  })

})
