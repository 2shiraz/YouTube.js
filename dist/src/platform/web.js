var _Cache_instances, _Cache_persistent_directory, _Cache_persistent, _Cache_getBrowserDB;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Platform } from '../utils/Utils.js';
import sha1Hash from './polyfills/web-crypto.js';
import package_json from '../../package.json' assert { type: 'json' };
import evaluate from './jsruntime/jinter.js';
import * as Log from '../utils/Log.js';
const CACHE_TAG = 'Cache';
class Cache {
    constructor(persistent = false, persistent_directory) {
        _Cache_instances.add(this);
        _Cache_persistent_directory.set(this, void 0);
        _Cache_persistent.set(this, void 0);
        __classPrivateFieldSet(this, _Cache_persistent_directory, persistent_directory || '', "f");
        __classPrivateFieldSet(this, _Cache_persistent, persistent, "f");
    }
    get cache_dir() {
        return __classPrivateFieldGet(this, _Cache_persistent, "f") ? __classPrivateFieldGet(this, _Cache_persistent_directory, "f") : '';
    }
    async get(key) {
        const db = await __classPrivateFieldGet(this, _Cache_instances, "m", _Cache_getBrowserDB).call(this);
        if (!db)
            return;
        return new Promise((resolve, reject) => {
            const request = db.transaction('kv-store', 'readonly').objectStore('kv-store').get(key);
            request.onerror = reject;
            request.onsuccess = function () {
                const result = this.result?.v;
                if (result instanceof ArrayBuffer) {
                    resolve(result);
                }
                else if (ArrayBuffer.isView(result)) {
                    resolve(result.buffer);
                }
                else {
                    resolve(undefined);
                }
            };
        });
    }
    async set(key, value) {
        const db = await __classPrivateFieldGet(this, _Cache_instances, "m", _Cache_getBrowserDB).call(this);
        if (!db)
            return;
        return new Promise((resolve, reject) => {
            const request = db.transaction('kv-store', 'readwrite').objectStore('kv-store').put({ k: key, v: value });
            request.onerror = reject;
            request.onsuccess = () => resolve();
        });
    }
    async remove(key) {
        const db = await __classPrivateFieldGet(this, _Cache_instances, "m", _Cache_getBrowserDB).call(this);
        if (!db)
            return;
        return new Promise((resolve, reject) => {
            const request = db.transaction('kv-store', 'readwrite').objectStore('kv-store').delete(key);
            request.onerror = reject;
            request.onsuccess = () => resolve();
        });
    }
}
_Cache_persistent_directory = new WeakMap(), _Cache_persistent = new WeakMap(), _Cache_instances = new WeakSet(), _Cache_getBrowserDB = function _Cache_getBrowserDB() {
    const indexedDB = Reflect.get(globalThis, 'indexedDB') || Reflect.get(globalThis, 'webkitIndexedDB') || Reflect.get(globalThis, 'mozIndexedDB') || Reflect.get(globalThis, 'msIndexedDB');
    if (!indexedDB)
        return Log.warn(CACHE_TAG, 'IndexedDB is not supported. No cache will be used.');
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('youtubei.js', 1);
        request.onsuccess = function () {
            resolve(this.result);
        };
        request.onerror = function (event) {
            reject('indexedDB request error');
            console.error(event);
        };
        request.onupgradeneeded = function () {
            const store = this.result.createObjectStore('kv-store', {
                keyPath: 'k'
            });
            store.transaction.oncomplete = function () {
                resolve(this.db);
            };
        };
    });
};
Platform.load({
    runtime: 'browser',
    server: false,
    info: {
        version: package_json.version,
        bugs_url: package_json.bugs.url,
        repo_url: package_json.homepage.split('#')[0]
    },
    Cache: Cache,
    sha1Hash,
    uuidv4() {
        if (globalThis.crypto?.randomUUID()) {
            return globalThis.crypto.randomUUID();
        }
        // See https://stackoverflow.com/a/2117523
        return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (cc) => {
            const c = parseInt(cc);
            return (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        });
    },
    eval: evaluate,
    fetch: globalThis.fetch,
    Request: globalThis.Request,
    Response: globalThis.Response,
    Headers: globalThis.Headers,
    FormData: globalThis.FormData,
    File: globalThis.File,
    ReadableStream: globalThis.ReadableStream,
    CustomEvent: globalThis.CustomEvent
});
export * from './lib.js';
import Innertube from './lib.js';
export default Innertube;
//# sourceMappingURL=web.js.map