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
(0, node_test_1.describe)('PodcastEpisodeDetailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_MINDFULNESS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_MINDFULNESS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenMindfulnessSDK.test();
        const ent = testsdk.PodcastEpisodeDetail();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('podcast_episode_detail hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.OpenMindfulnessSDK.test(offline).PodcastEpisodeDetail().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.OpenMindfulnessSDK.test(offline).PodcastEpisodeDetail()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.OpenMindfulnessSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.PodcastEpisodeDetail().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.OpenMindfulnessSDK.test().PodcastEpisodeDetail().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.OpenMindfulnessSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.PodcastEpisodeDetail().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.PodcastEpisodeDetail().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.OpenMindfulnessSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PodcastEpisodeDetail().list({ "lang": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_MINDFULNESS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'podcast_episode_detail.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "alternate_language_id": { "a": true, "h": "Alternate Language Id", "n": "alternate_language_id", "r": false, "sh": "The same episode in the other language.", "t": "`$STRING`", "key$": "alternate_language_id", "index$": 0 }, "audience": { "a": true, "h": "Audience", "n": "audience", "r": false, "t": "`$STRING`", "key$": "audience", "index$": 1 }, "duration_iso": { "a": true, "h": "Duration Iso", "n": "duration_iso", "r": false, "t": "`$STRING`", "key$": "duration_iso", "index$": 2 }, "duration_seconds": { "a": true, "h": "Duration Seconds", "n": "duration_seconds", "r": false, "t": "`$INTEGER`", "key$": "duration_seconds", "index$": 3 }, "episode_number": { "a": true, "h": "Episode Number", "n": "episode_number", "r": false, "t": "`$INTEGER`", "key$": "episode_number", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "key_question": { "a": true, "h": "Key Question", "n": "key_question", "r": false, "t": "`$STRING`", "key$": "key_question", "index$": 6 }, "language": { "a": true, "h": "Language", "n": "language", "r": false, "t": "`$STRING`", "key$": "language", "index$": 7 }, "release_date": { "a": true, "fo": "date", "h": "Release Date", "n": "release_date", "r": false, "t": "`$STRING`", "key$": "release_date", "index$": 8 }, "season_number": { "a": true, "h": "Season Number", "n": "season_number", "r": false, "t": "`$INTEGER`", "key$": "season_number", "index$": 9 }, "season_title": { "a": true, "h": "Season Title", "n": "season_title", "r": false, "t": "`$STRING`", "key$": "season_title", "index$": 10 }, "short_title": { "a": true, "h": "Short Title", "n": "short_title", "r": false, "t": "`$STRING`", "key$": "short_title", "index$": 11 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": false, "t": "`$STRING`", "key$": "slug", "index$": 12 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": false, "sh": "The episode's short quick-answer summary.", "t": "`$STRING`", "key$": "summary", "index$": 13 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "t": "`$STRING`", "key$": "title", "index$": 14 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$STRING`", "key$": "type", "index$": 15 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "t": "`$STRING`", "key$": "updated_at", "index$": 16 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "sh": "The episode page on theholisticcare.com.", "t": "`$STRING`", "key$": "url", "index$": 17 }, "youtube_url": { "a": true, "fo": "uri", "h": "Youtube Url", "n": "youtube_url", "r": false, "t": "`$STRING`", "key$": "youtube_url", "index$": 18 } }, "id": { "field": "id", "name": "id" }, "name": "podcast_episode_detail", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/podcast/episodes", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "season", "or": "season", "r": false, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/v1/podcast/episodes", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "podcast" }, { "lit": "episodes" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/podcast/episodes/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/podcast/episodes/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "podcast" }, { "lit": "episodes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "podcast_episode_detail", "name__orig": "podcast_episode_detail", "Name": "PodcastEpisodeDetail", "name_": "podcast_episode_detail", "name-": "podcast-episode-detail", "NAME": "PODCAST_EPISODE_DETAIL", "index$": 7 }, { "active": true, "entity": "podcast_episode_detail", "key$": "BasicPodcastEpisodeDetailFlow", "kind": "basic", "name": "BasicPodcastEpisodeDetailFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "podcast_episode_detail_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "podcast_episode_detail_ref01", "srcdatavar": "podcast_episode_detail_ref01_data", "suffix": "_dt0" }, "m": { "id": "podcast_episode_detail01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-podcast_episode_detail_ref01" } }], "index$": 1, "route": "GET /v1/podcast/episodes/{id}", "record": {} }] }, 'PodcastEpisodeDetail', { "GET /v1/podcast/episodes": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "description": "Max records to return (default 20). A non-numeric, non-integer, or non-positive value (e.g. `abc`, `1.5`, `0`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to the default. A value above the documented maximum (100) is the one exception: it is NOT an error, it is silently clamped to 100 — see /docs#pagination for the full rationale for that one intentional exception.\n", "schema": { "type": "integer", "default": 20, "maximum": 100 }, "x-ref": "#/components/parameters/limit", "index$": 0 }, { "name": "offset", "in": "query", "description": "Records to skip (default 0). A non-numeric, non-integer, or negative value (e.g. `abc`, `1.5`, `-1`) returns a 400 `invalid_parameter` error rather than silently falling back to 0 — see /docs#pagination.\n", "schema": { "type": "integer", "default": 0 }, "x-ref": "#/components/parameters/offset", "index$": 1 }, { "name": "lang", "in": "query", "schema": { "type": "string", "enum": ["en", "hi"] }, "index$": 2 }, { "name": "season", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 3 }] }, "GET /v1/podcast/episodes/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Stable episode id, e.g. PC-S02E03-EN (case-insensitive).", "schema": { "type": "string", "pattern": "^PC-S[0-9]{1,3}E[0-9]{1,3}-(EN|HI)$" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let podcast_episode_detail_ref01_data = Object.values(setup.data.existing.podcast_episode_detail)[0];
        // LIST
        const podcast_episode_detail_ref01_ent = client.PodcastEpisodeDetail();
        const podcast_episode_detail_ref01_match = {};
        const podcast_episode_detail_ref01_list = (await podcast_episode_detail_ref01_ent.list(podcast_episode_detail_ref01_match)).map((e) => e.data());
        // LOAD
        const podcast_episode_detail_ref01_match_dt0 = {};
        podcast_episode_detail_ref01_match_dt0.id = podcast_episode_detail_ref01_data.id;
        const podcast_episode_detail_ref01_data_dt0 = (await podcast_episode_detail_ref01_ent.load(podcast_episode_detail_ref01_match_dt0)).data();
        (0, node_assert_1.default)(podcast_episode_detail_ref01_data_dt0.id === podcast_episode_detail_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/podcast_episode_detail/PodcastEpisodeDetailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenMindfulnessSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['podcast_episode_detail01', 'podcast_episode_detail02', 'podcast_episode_detail03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_MINDFULNESS_TEST_PODCAST_EPISODE_DETAIL_ENTID': idmap,
        'OPEN_MINDFULNESS_TEST_LIVE': 'FALSE',
        'OPEN_MINDFULNESS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['OPEN_MINDFULNESS_TEST_PODCAST_EPISODE_DETAIL_ENTID'];
    const live = 'TRUE' === env.OPEN_MINDFULNESS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_MINDFULNESS_TEST_PODCAST_EPISODE_DETAIL_ENTID'];
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
//# sourceMappingURL=PodcastEpisodeDetailEntity.test.js.map