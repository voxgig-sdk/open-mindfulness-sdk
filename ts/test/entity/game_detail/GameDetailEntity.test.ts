

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


describe('GameDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_MINDFULNESS_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_MINDFULNESS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenMindfulnessSDK.test()
    const ent = testsdk.GameDetail()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('game_detail hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of OpenMindfulnessSDK.test(offline).GameDetail().stream('list')) { }
    }, /offline/)

    for await (const _item of OpenMindfulnessSDK.test(offline).GameDetail()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = OpenMindfulnessSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.GameDetail().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of OpenMindfulnessSDK.test().GameDetail().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new OpenMindfulnessSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.GameDetail().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.GameDetail().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenMindfulnessSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GameDetail().list({"audience":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_MINDFULNESS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'game_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"age_max":{"a":true,"h":"Age Max","n":"age_max","r":false,"t":"`$INTEGER`","key$":"age_max","index$":0},"age_min":{"a":true,"h":"Age Min","n":"age_min","r":false,"t":"`$INTEGER`","key$":"age_min","index$":1},"api_id":{"a":true,"h":"Api Id","n":"api_id","r":false,"t":"`$STRING`","key$":"api_id","index$":2},"audiences":{"a":true,"h":"Audiences","n":"audiences","r":false,"t":"`$ARRAY`","key$":"audiences","index$":3},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":4},"duration_minutes":{"a":true,"h":"Duration Minutes","n":"duration_minutes","r":false,"t":"`$INTEGER`","key$":"duration_minutes","index$":5},"free":{"a":true,"h":"Free","n":"free","r":false,"t":"`$BOOLEAN`","key$":"free","index$":6},"icon":{"a":true,"h":"Icon","n":"icon","r":false,"t":"`$STRING`","key$":"icon","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The stable public game ID (same value as `api_id`), in the form \"MG-*\".","t":"`$STRING`","key$":"id","index$":8},"keywords":{"a":true,"h":"Keywords","n":"keywords","r":false,"t":"`$ARRAY`","key$":"keywords","index$":9},"skills":{"a":true,"h":"Skills","n":"skills","r":false,"t":"`$ARRAY`","key$":"skills","index$":10},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"t":"`$STRING`","key$":"slug","index$":11},"tag":{"a":true,"h":"Tag","n":"tag","r":false,"t":"`$STRING`","key$":"tag","index$":12},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":13},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":14},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":15},"url":{"a":true,"h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":16}},"id":{"field":"id","name":"id"},"name":"game_detail","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/mindfulness-games","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"audience","or":"audience","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"skill","or":"skill","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v1/mindfulness-games","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"mindfulness-games"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/mindfulness-games/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/mindfulness-games/{slug}","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"mindfulness-games"},{"var":"slug"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"game_detail","name__orig":"game_detail","Name":"GameDetail","name_":"game_detail","name-":"game-detail","NAME":"GAME_DETAIL","index$":3}, {"active":true,"entity":"game_detail","key$":"BasicGameDetailFlow","kind":"basic","name":"BasicGameDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"game_detail_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"game_detail_ref01","srcdatavar":"game_detail_ref01_data","suffix":"_dt0"},"m":{"id":"game_detail01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-game_detail_ref01"}}],"unreachable":true}]}, 'GameDetail', {"GET /v1/mindfulness-games":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Max records to return (default 20). A non-numeric, non-integer, or non-positive value (e.g. `abc`, `1.5`, `0`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to the default. A value above the documented maximum (100) is the one exception: it is NOT an error, it is silently clamped to 100 — see /docs#pagination for the full rationale for that one intentional exception.\n","schema":{"type":"integer","default":20,"maximum":100},"x-ref":"#/components/parameters/limit","index$":0},{"name":"offset","in":"query","description":"Records to skip (default 0). A non-numeric, non-integer, or negative value (e.g. `abc`, `1.5`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to 0 — see /docs#pagination.\n","schema":{"type":"integer","default":0},"x-ref":"#/components/parameters/offset","index$":1},{"name":"audience","in":"query","schema":{"type":"string","enum":["children","teens","adults","educators","parents"]},"index$":2},{"name":"skill","in":"query","schema":{"type":"string","enum":["attention","body-awareness","breathwork","cognitive-reframing","emotional-regulation","gratitude","grounding","loving-kindness","mindful-listening","nondual-awareness","relaxation","self-compassion","sleep"]},"index$":3}]},"GET /v1/mindfulness-games/{slug}":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/slug","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let game_detail_ref01_data = Object.values(setup.data.existing.game_detail)[0] as any

    // LIST
    const game_detail_ref01_ent = client.GameDetail()
    const game_detail_ref01_match: any = {}

    const game_detail_ref01_list = (await game_detail_ref01_ent.list(game_detail_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/game_detail/GameDetailTestData.json')

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
    ['game_detail01','game_detail02','game_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_MINDFULNESS_TEST_GAME_DETAIL_ENTID': idmap,
    'OPEN_MINDFULNESS_TEST_LIVE': 'FALSE',
    'OPEN_MINDFULNESS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPEN_MINDFULNESS_TEST_GAME_DETAIL_ENTID']

  const live = 'TRUE' === env.OPEN_MINDFULNESS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_MINDFULNESS_TEST_GAME_DETAIL_ENTID']
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
  
