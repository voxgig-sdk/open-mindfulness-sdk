"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PracticeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_MINDFULNESS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_MINDFULNESS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenMindfulnessSDK.test();
        const ent = testsdk.Practice();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('practice hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.OpenMindfulnessSDK.test(offline).Practice().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.OpenMindfulnessSDK.test(offline).Practice()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.OpenMindfulnessSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Practice().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.OpenMindfulnessSDK.test().Practice().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.OpenMindfulnessSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Practice().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Practice().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpenMindfulnessSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Practice().list({ "category": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_MINDFULNESS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'practice.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "audio_url": { "a": true, "h": "Audio Url", "n": "audio_url", "r": false, "sh": "Direct link to the MP3 file (Cloudflare R2).", "t": "`$STRING`", "key$": "audio_url", "index$": 0 }, "canonical_url": { "a": true, "h": "Canonical Url", "n": "canonical_url", "r": false, "t": "`$STRING`", "key$": "canonical_url", "index$": 1 }, "category": { "a": true, "h": "Category", "n": "category", "r": false, "t": "`$STRING`", "key$": "category", "index$": 2 }, "excerpt": { "a": true, "h": "Excerpt", "n": "excerpt", "r": false, "t": "`$STRING`", "key$": "excerpt", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The stable public track ID (same value as `track_id`), in the form \"SL-*\".", "t": "`$STRING`", "key$": "id", "index$": 4 }, "read_time_minutes": { "a": true, "h": "Read Time Minutes", "n": "read_time_minutes", "r": false, "t": "`$INTEGER`", "key$": "read_time_minutes", "index$": 5 }, "related_practices": { "a": true, "h": "Related Practices", "n": "related_practices", "r": false, "sh": "Free practices only — a paid track can never appear here even as a reference.", "t": "`$ARRAY`", "key$": "related_practices", "index$": 6 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": false, "t": "`$STRING`", "key$": "slug", "index$": 7 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "t": "`$STRING`", "key$": "title", "index$": 8 }, "track_id": { "a": true, "h": "Track Id", "n": "track_id", "r": false, "t": "`$STRING`", "key$": "track_id", "index$": 9 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$STRING`", "key$": "type", "index$": 10 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "t": "`$STRING`", "key$": "updated_at", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "practice", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/practices", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/practices", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "practices" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/practices/{slug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/practices/{slug}", "q": { "exist": ["id"] }, "r": { "param": { "slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "practices" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "practice", "name__orig": "practice", "Name": "Practice", "name_": "practice", "name-": "practice", "NAME": "PRACTICE", "index$": 8 }, { "active": true, "entity": "practice", "key$": "BasicPracticeFlow", "kind": "basic", "name": "BasicPracticeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "practice_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "practice_ref01", "srcdatavar": "practice_ref01_data", "suffix": "_dt0" }, "m": { "id": "practice01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-practice_ref01" } }], "index$": 1, "route": "GET /v1/practices/{slug}", "record": {} }] }, 'Practice', { "GET /v1/practices": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "description": "Max records to return (default 20). A non-numeric, non-integer, or non-positive value (e.g. `abc`, `1.5`, `0`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to the default. A value above the documented maximum (100) is the one exception: it is NOT an error, it is silently clamped to 100 — see /docs#pagination for the full rationale for that one intentional exception.\n", "schema": { "type": "integer", "default": 20, "maximum": 100 }, "x-ref": "#/components/parameters/limit", "index$": 0 }, { "name": "offset", "in": "query", "description": "Records to skip (default 0). A non-numeric, non-integer, or negative value (e.g. `abc`, `1.5`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to 0 — see /docs#pagination.\n", "schema": { "type": "integer", "default": 0 }, "x-ref": "#/components/parameters/offset", "index$": 1 }, { "name": "category", "in": "query", "schema": { "type": "string", "enum": ["mindfulness", "children", "breathwork", "nondual-awareness", "yoga-nidra", "students", "sleep"] }, "index$": 2 }] }, "GET /v1/practices/{slug}": { "protocol": "http", "parameters": [{ "name": "slug", "in": "path", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/slug", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let practice_ref01_data = Object.values(setup.data.existing.practice)[0];
        // LIST
        const practice_ref01_ent = client.Practice();
        const practice_ref01_match = {};
        const practice_ref01_list = (await practice_ref01_ent.list(practice_ref01_match)).map((e) => e.data());
        // LOAD
        const practice_ref01_match_dt0 = {};
        practice_ref01_match_dt0.id = practice_ref01_data.id;
        const practice_ref01_data_dt0 = (await practice_ref01_ent.load(practice_ref01_match_dt0)).data();
        (0, node_assert_1.default)(practice_ref01_data_dt0.id === practice_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/practice/PracticeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenMindfulnessSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['practice01', 'practice02', 'practice03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_MINDFULNESS_TEST_PRACTICE_ENTID': idmap,
        'OPEN_MINDFULNESS_TEST_LIVE': 'FALSE',
        'OPEN_MINDFULNESS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['OPEN_MINDFULNESS_TEST_PRACTICE_ENTID'];
    const live = 'TRUE' === env.OPEN_MINDFULNESS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_MINDFULNESS_TEST_PRACTICE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpenMindfulnessSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=PracticeEntity.test.js.map