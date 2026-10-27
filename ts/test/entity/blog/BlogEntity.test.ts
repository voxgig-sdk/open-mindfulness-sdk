

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


describe('BlogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_MINDFULNESS_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_MINDFULNESS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenMindfulnessSDK.test()
    const ent = testsdk.Blog()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('blog hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of OpenMindfulnessSDK.test(offline).Blog().stream('list')) { }
    }, /offline/)

    for await (const _item of OpenMindfulnessSDK.test(offline).Blog()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = OpenMindfulnessSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Blog().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of OpenMindfulnessSDK.test().Blog().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new OpenMindfulnessSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Blog().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Blog().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenMindfulnessSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Blog().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_MINDFULNESS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'blog.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"canonical_url":{"a":true,"h":"Canonical Url","n":"canonical_url","r":false,"t":"`$STRING`","key$":"canonical_url","index$":0},"excerpt":{"a":true,"h":"Excerpt","n":"excerpt","r":false,"t":"`$STRING`","key$":"excerpt","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"Always an array, even when the post has no tags (never null).","t":"`$ARRAY`","key$":"tags","index$":3},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":4}},"id":{"field":"id","name":"id"},"name":"blog","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/blog","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v1/blog","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"blog"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/blog/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/blog/{slug}","q":{"exist":["id"]},"r":{"param":{"slug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"blog"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"blog","name__orig":"blog","Name":"Blog","name_":"blog","name-":"blog","NAME":"BLOG","index$":0}, {"active":true,"entity":"blog","key$":"BasicBlogFlow","kind":"basic","name":"BasicBlogFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"blog_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"blog_ref01","srcdatavar":"blog_ref01_data","suffix":"_dt0"},"m":{"id":"blog01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-blog_ref01"}}],"index$":1,"route":"GET /v1/blog/{slug}","record":{}}]}, 'Blog', {"GET /v1/blog":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Max records to return (default 20). A non-numeric, non-integer, or non-positive value (e.g. `abc`, `1.5`, `0`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to the default. A value above the documented maximum (100) is the one exception: it is NOT an error, it is silently clamped to 100 — see /docs#pagination for the full rationale for that one intentional exception.\n","schema":{"type":"integer","default":20,"maximum":100},"x-ref":"#/components/parameters/limit","index$":0},{"name":"offset","in":"query","description":"Records to skip (default 0). A non-numeric, non-integer, or negative value (e.g. `abc`, `1.5`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to 0 — see /docs#pagination.\n","schema":{"type":"integer","default":0},"x-ref":"#/components/parameters/offset","index$":1},{"name":"tag","in":"query","description":"Fuzzy-matches against the post's tags.","schema":{"type":"string"},"index$":2},{"name":"q","in":"query","description":"Free-text search across title, excerpt, and tags only. Never searches article body.","schema":{"type":"string"},"index$":3}]},"GET /v1/blog/{slug}":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/slug","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let blog_ref01_data = Object.values(setup.data.existing.blog)[0] as any

    // LIST
    const blog_ref01_ent = client.Blog()
    const blog_ref01_match: any = {}

    const blog_ref01_list = (await blog_ref01_ent.list(blog_ref01_match)).map((e: any) => e.data())


    // LOAD
    const blog_ref01_match_dt0: any = {}
    blog_ref01_match_dt0.id = blog_ref01_data.id
    const blog_ref01_data_dt0 = (await blog_ref01_ent.load(blog_ref01_match_dt0)).data()
    assert(blog_ref01_data_dt0.id === blog_ref01_data.id)


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
      '../../../../.sdk/test/entity/blog/BlogTestData.json')

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
    ['blog01','blog02','blog03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_MINDFULNESS_TEST_BLOG_ENTID': idmap,
    'OPEN_MINDFULNESS_TEST_LIVE': 'FALSE',
    'OPEN_MINDFULNESS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPEN_MINDFULNESS_TEST_BLOG_ENTID']

  const live = 'TRUE' === env.OPEN_MINDFULNESS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_MINDFULNESS_TEST_BLOG_ENTID']
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
  
