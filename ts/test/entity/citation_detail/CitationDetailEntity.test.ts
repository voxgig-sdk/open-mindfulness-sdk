

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


describe('CitationDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_MINDFULNESS_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_MINDFULNESS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenMindfulnessSDK.test()
    const ent = testsdk.CitationDetail()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('citation_detail hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of OpenMindfulnessSDK.test(offline).CitationDetail().stream('list')) { }
    }, /offline/)

    for await (const _item of OpenMindfulnessSDK.test(offline).CitationDetail()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = OpenMindfulnessSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.CitationDetail().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of OpenMindfulnessSDK.test().CitationDetail().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new OpenMindfulnessSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.CitationDetail().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.CitationDetail().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenMindfulnessSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CitationDetail().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_MINDFULNESS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'citation_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"authors":{"a":true,"h":"Authors","n":"authors","r":false,"t":"`$STRING`","key$":"authors","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Deterministic public ID in the form \"research:<slug>\".","t":"`$STRING`","key$":"id","index$":1},"journal":{"a":true,"h":"Journal","n":"journal","r":false,"t":"`$STRING`","key$":"journal","index$":2},"key_finding":{"a":true,"h":"Key Finding","n":"key_finding","r":false,"t":"`$STRING`","key$":"key_finding","index$":3},"limitations":{"a":true,"h":"Limitations","n":"limitations","r":false,"t":"`$STRING`","key$":"limitations","index$":4},"related_posts":{"a":true,"h":"Related Posts","n":"related_posts","r":false,"t":"`$ARRAY`","key$":"related_posts","index$":5},"related_terms":{"a":true,"h":"Related Terms","n":"related_terms","r":false,"t":"`$ARRAY`","key$":"related_terms","index$":6},"sample_size":{"a":true,"h":"Sample Size","n":"sample_size","r":false,"t":"`$STRING`","key$":"sample_size","index$":7},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"t":"`$STRING`","key$":"slug","index$":8},"source_url":{"a":true,"h":"Source Url","n":"source_url","r":false,"t":"`$STRING`","key$":"source_url","index$":9},"study_type":{"a":true,"h":"Study Type","n":"study_type","r":false,"t":"`$STRING`","key$":"study_type","index$":10},"summary":{"a":true,"h":"Summary","n":"summary","r":false,"t":"`$STRING`","key$":"summary","index$":11},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":12},"topic":{"a":true,"h":"Topic","n":"topic","r":false,"t":"`$STRING`","key$":"topic","index$":13},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":14},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":15},"year":{"a":true,"h":"Year","n":"year","r":false,"t":"`$INTEGER`","key$":"year","index$":16}},"id":{"field":"id","name":"id"},"name":"citation_detail","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/whitepapers","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"study_type","or":"study_type","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"topic","or":"topic","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v1/whitepapers","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"whitepapers"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/whitepapers/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/whitepapers/{slug}","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"whitepapers"},{"var":"slug"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"citation_detail","name__orig":"citation_detail","Name":"CitationDetail","name_":"citation_detail","name-":"citation-detail","NAME":"CITATION_DETAIL","index$":2}, {"active":true,"entity":"citation_detail","key$":"BasicCitationDetailFlow","kind":"basic","name":"BasicCitationDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"citation_detail_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"citation_detail_ref01","srcdatavar":"citation_detail_ref01_data","suffix":"_dt0"},"m":{"id":"citation_detail01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-citation_detail_ref01"}}],"unreachable":true}]}, 'CitationDetail', {"GET /v1/whitepapers":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Max records to return (default 20). A non-numeric, non-integer, or non-positive value (e.g. `abc`, `1.5`, `0`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to the default. A value above the documented maximum (100) is the one exception: it is NOT an error, it is silently clamped to 100 — see /docs#pagination for the full rationale for that one intentional exception.\n","schema":{"type":"integer","default":20,"maximum":100},"x-ref":"#/components/parameters/limit","index$":0},{"name":"offset","in":"query","description":"Records to skip (default 0). A non-numeric, non-integer, or negative value (e.g. `abc`, `1.5`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to 0 — see /docs#pagination.\n","schema":{"type":"integer","default":0},"x-ref":"#/components/parameters/offset","index$":1},{"name":"topic","in":"query","schema":{"type":"string","enum":["mindfulness","meditation","yoga","sleep","nonduality","children","anxiety","physiology"]},"index$":2},{"name":"study_type","in":"query","schema":{"type":"string","enum":["rct","meta-analysis","observational","cohort","clinical-trial","physiological","guideline"]},"index$":3}]},"GET /v1/whitepapers/{slug}":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/slug","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let citation_detail_ref01_data = Object.values(setup.data.existing.citation_detail)[0] as any

    // LIST
    const citation_detail_ref01_ent = client.CitationDetail()
    const citation_detail_ref01_match: any = {}

    const citation_detail_ref01_list = (await citation_detail_ref01_ent.list(citation_detail_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/citation_detail/CitationDetailTestData.json')

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
    ['citation_detail01','citation_detail02','citation_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_MINDFULNESS_TEST_CITATION_DETAIL_ENTID': idmap,
    'OPEN_MINDFULNESS_TEST_LIVE': 'FALSE',
    'OPEN_MINDFULNESS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPEN_MINDFULNESS_TEST_CITATION_DETAIL_ENTID']

  const live = 'TRUE' === env.OPEN_MINDFULNESS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_MINDFULNESS_TEST_CITATION_DETAIL_ENTID']
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
  
