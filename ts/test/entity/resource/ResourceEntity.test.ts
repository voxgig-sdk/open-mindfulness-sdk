

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenMindfulnessSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ResourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_MINDFULNESS_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_MINDFULNESS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenMindfulnessSDK.test()
    const ent = testsdk.Resource()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('resource hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of OpenMindfulnessSDK.test(offline).Resource().stream('list')) { }
    }, /offline/)

    for await (const _item of OpenMindfulnessSDK.test(offline).Resource()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = OpenMindfulnessSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Resource().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of OpenMindfulnessSDK.test().Resource().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new OpenMindfulnessSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Resource().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Resource().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenMindfulnessSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Resource().list({"limit":"x","q":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_MINDFULNESS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'resource.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access":{"a":true,"h":"Access","n":"access","r":false,"sh":"e.g.","t":"`$STRING`","key$":"access","index$":0},"age_max":{"a":true,"h":"Age Max","n":"age_max","r":false,"t":"`$INTEGER`","key$":"age_max","index$":1},"age_min":{"a":true,"h":"Age Min","n":"age_min","r":false,"t":"`$INTEGER`","key$":"age_min","index$":2},"audiences":{"a":true,"h":"Audiences","n":"audiences","r":false,"t":"`$ARRAY`","key$":"audiences","index$":3},"category":{"a":true,"h":"Category","n":"category","r":false,"t":"`$STRING`","key$":"category","index$":4},"duration_minutes":{"a":true,"h":"Duration Minutes","n":"duration_minutes","r":false,"t":"`$INTEGER`","key$":"duration_minutes","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":6},"skills":{"a":true,"h":"Skills","n":"skills","r":false,"t":"`$ARRAY`","key$":"skills","index$":7},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"t":"`$STRING`","key$":"slug","index$":8},"source_url":{"a":true,"h":"Source Url","n":"source_url","r":false,"t":"`$STRING`","key$":"source_url","index$":9},"summary":{"a":true,"h":"Summary","n":"summary","r":false,"t":"`$STRING`","key$":"summary","index$":10},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"t":"`$ARRAY`","key$":"tags","index$":11},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":12},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":14}},"id":{"field":"id","name":"id"},"name":"resource","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v1/search","q":{"exist":["q"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /v1/resources","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"age_max","or":"age_max","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"age_min","or":"age_min","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"audience","or":"audience","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"skill","or":"skill","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/v1/resources","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"resources"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"resource","name__orig":"resource","Name":"Resource","name_":"resource","name-":"resource","NAME":"RESOURCE","index$":9}, {"active":true,"entity":"resource","key$":"BasicResourceFlow","kind":"basic","name":"BasicResourceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"resource_ref01"}}],"index$":0}]}, 'Resource', {"GET /v1/search":{"protocol":"http","parameters":[{"name":"q","in":"query","required":true,"description":"Search text. Required; a missing or empty (or whitespace-only) value returns 400.","schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","description":"Max records to return (default 20). A non-numeric, non-integer, or non-positive value (e.g. `abc`, `1.5`, `0`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to the default. A value above the documented maximum (100) is the one exception: it is NOT an error, it is silently clamped to 100 — see /docs#pagination for the full rationale for that one intentional exception.\n","schema":{"type":"integer","default":20,"maximum":100},"x-ref":"#/components/parameters/limit","index$":1},{"name":"offset","in":"query","description":"Records to skip (default 0). A non-numeric, non-integer, or negative value (e.g. `abc`, `1.5`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to 0 — see /docs#pagination.\n","schema":{"type":"integer","default":0},"x-ref":"#/components/parameters/offset","index$":2}]},"GET /v1/resources":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Max records to return (default 20). A non-numeric, non-integer, or non-positive value (e.g. `abc`, `1.5`, `0`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to the default. A value above the documented maximum (100) is the one exception: it is NOT an error, it is silently clamped to 100 — see /docs#pagination for the full rationale for that one intentional exception.\n","schema":{"type":"integer","default":20,"maximum":100},"x-ref":"#/components/parameters/limit","index$":0},{"name":"offset","in":"query","description":"Records to skip (default 0). A non-numeric, non-integer, or negative value (e.g. `abc`, `1.5`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to 0 — see /docs#pagination.\n","schema":{"type":"integer","default":0},"x-ref":"#/components/parameters/offset","index$":1},{"name":"type","in":"query","schema":{"type":"string","enum":["blog","mindfulness_game","guided_practice","research","glossary","podcast_episode","panchavikas_pathway","panchavikas_download"]},"index$":2},{"name":"category","in":"query","schema":{"type":"string"},"index$":3},{"name":"audience","in":"query","schema":{"type":"string"},"index$":4},{"name":"skill","in":"query","schema":{"type":"string"},"index$":5},{"name":"age_min","in":"query","schema":{"type":"integer"},"index$":6},{"name":"age_max","in":"query","schema":{"type":"integer"},"index$":7}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let resource_ref01_data = Object.values(setup.data.existing.resource)[0] as any

    // LIST
    const resource_ref01_ent = client.Resource()
    const resource_ref01_match: any = {}

    const resource_ref01_list = (await resource_ref01_ent.list(resource_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/resource/ResourceTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenMindfulnessSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['resource01','resource02','resource03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_MINDFULNESS_TEST_RESOURCE_ENTID': idmap,
    'OPEN_MINDFULNESS_TEST_LIVE': 'FALSE',
    'OPEN_MINDFULNESS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPEN_MINDFULNESS_TEST_RESOURCE_ENTID']

  const live = 'TRUE' === env.OPEN_MINDFULNESS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_MINDFULNESS_TEST_RESOURCE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenMindfulnessSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.OPEN_MINDFULNESS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
