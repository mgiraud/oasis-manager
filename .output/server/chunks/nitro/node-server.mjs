globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { createStorage } from 'unstorage';
import { withQuery, withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"API_BASE_URL":"https://api.lestransalpins.org/api"}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      return event.req.originalUrl || event.req.url;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(_error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(_error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: "",
    data: _error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (errorObject.statusCode !== 404) {
    console.error("[nuxt] [request error]", errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error) => {
    console.error("[nitro] Error while generating error response", error);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/_nuxt/Carrousel-96967744.mjs": {
    "type": "application/javascript",
    "etag": "\"6e6-N73DAJQfsmHjUSorsJvqlH3a+cc\"",
    "mtime": "2022-05-14T07:16:05.367Z",
    "path": "../public/_nuxt/Carrousel-96967744.mjs"
  },
  "/_nuxt/CheckboxField-20f6aa23.mjs": {
    "type": "application/javascript",
    "etag": "\"34f-Tajo3OlbiK0+Gu7x3AewLND5Xvg\"",
    "mtime": "2022-05-14T07:16:05.366Z",
    "path": "../public/_nuxt/CheckboxField-20f6aa23.mjs"
  },
  "/_nuxt/ConfirmationDeleteModal-057bf1b8.mjs": {
    "type": "application/javascript",
    "etag": "\"6ac-juWPAfHnAjFr0E0Lwmy/IkLxi9M\"",
    "mtime": "2022-05-14T07:16:05.366Z",
    "path": "../public/_nuxt/ConfirmationDeleteModal-057bf1b8.mjs"
  },
  "/_nuxt/Editor-efecd958.mjs": {
    "type": "application/javascript",
    "etag": "\"a208-uqvj0AVilsF8kEoV2lXE02poSas\"",
    "mtime": "2022-05-14T07:16:05.366Z",
    "path": "../public/_nuxt/Editor-efecd958.mjs"
  },
  "/_nuxt/FileManager-0bb7eff3.mjs": {
    "type": "application/javascript",
    "etag": "\"4385-In4iPU25/tSfMKZEV3dbsinQgao\"",
    "mtime": "2022-05-14T07:16:05.365Z",
    "path": "../public/_nuxt/FileManager-0bb7eff3.mjs"
  },
  "/_nuxt/FormComponent-02143e6d.mjs": {
    "type": "application/javascript",
    "etag": "\"17d0-JqFQHupVP2WFGUCblAJw82rlsCQ\"",
    "mtime": "2022-05-14T07:16:05.365Z",
    "path": "../public/_nuxt/FormComponent-02143e6d.mjs"
  },
  "/_nuxt/FormComponent-b7a4fe24.mjs": {
    "type": "application/javascript",
    "etag": "\"1098-AJSApm1+OAqsWXsoFuqa4B97THM\"",
    "mtime": "2022-05-14T07:16:05.364Z",
    "path": "../public/_nuxt/FormComponent-b7a4fe24.mjs"
  },
  "/_nuxt/FormComponent-db6b4874.mjs": {
    "type": "application/javascript",
    "etag": "\"772-/k4cWDc5r0tEN/vKTlSwHLInHgY\"",
    "mtime": "2022-05-14T07:16:05.364Z",
    "path": "../public/_nuxt/FormComponent-db6b4874.mjs"
  },
  "/_nuxt/Icon-b7f67c13.mjs": {
    "type": "application/javascript",
    "etag": "\"18d-cNhRTt7ni6fHTFqMLv5ngXhTZcU\"",
    "mtime": "2022-05-14T07:16:05.363Z",
    "path": "../public/_nuxt/Icon-b7f67c13.mjs"
  },
  "/_nuxt/Notification-e168f13f.mjs": {
    "type": "application/javascript",
    "etag": "\"22cb-Q7s6wSzcVwopJhTGVIoOGf8iT5c\"",
    "mtime": "2022-05-14T07:16:05.363Z",
    "path": "../public/_nuxt/Notification-e168f13f.mjs"
  },
  "/_nuxt/PageComponent-7f789f1a.mjs": {
    "type": "application/javascript",
    "etag": "\"269-YJcUgimKMeXc7504mUeGRsqiG6A\"",
    "mtime": "2022-05-14T07:16:05.362Z",
    "path": "../public/_nuxt/PageComponent-7f789f1a.mjs"
  },
  "/_nuxt/PreviewImage-005792ee.mjs": {
    "type": "application/javascript",
    "etag": "\"320-rsKyKgdSCZPIJgDOf8Jg4JCnB/s\"",
    "mtime": "2022-05-14T07:16:05.362Z",
    "path": "../public/_nuxt/PreviewImage-005792ee.mjs"
  },
  "/_nuxt/TextField-e0d4bdd8.mjs": {
    "type": "application/javascript",
    "etag": "\"a92-zOn248EgHf4pA3LmhZuerAGRSoQ\"",
    "mtime": "2022-05-14T07:16:05.361Z",
    "path": "../public/_nuxt/TextField-e0d4bdd8.mjs"
  },
  "/_nuxt/_...slug_-4b968b00.mjs": {
    "type": "application/javascript",
    "etag": "\"3cd-WC8U91679fTqE8qWMNFPHMFs6os\"",
    "mtime": "2022-05-14T07:16:05.361Z",
    "path": "../public/_nuxt/_...slug_-4b968b00.mjs"
  },
  "/_nuxt/_id_-6b7ab8e3.mjs": {
    "type": "application/javascript",
    "etag": "\"9a5-RWG6RZE2LzKTwJAlhTqzBsSMxBA\"",
    "mtime": "2022-05-14T07:16:05.360Z",
    "path": "../public/_nuxt/_id_-6b7ab8e3.mjs"
  },
  "/_nuxt/_id_-d791ae74.mjs": {
    "type": "application/javascript",
    "etag": "\"12db-MuTNsT/KTdgTXSA2/3pxpBu75bw\"",
    "mtime": "2022-05-14T07:16:05.360Z",
    "path": "../public/_nuxt/_id_-d791ae74.mjs"
  },
  "/_nuxt/_id_-da0c9a44.mjs": {
    "type": "application/javascript",
    "etag": "\"4cc-AGSfh4+uRYIQaWfpHzHSIiAN/Vc\"",
    "mtime": "2022-05-14T07:16:05.359Z",
    "path": "../public/_nuxt/_id_-da0c9a44.mjs"
  },
  "/_nuxt/_id_-fbc77655.mjs": {
    "type": "application/javascript",
    "etag": "\"6bf-6HvMqhtyZ3U9DVca0s8nogyAxa8\"",
    "mtime": "2022-05-14T07:16:05.359Z",
    "path": "../public/_nuxt/_id_-fbc77655.mjs"
  },
  "/_nuxt/_slug_-14d67209.mjs": {
    "type": "application/javascript",
    "etag": "\"5d7-SyGy6h+RjZ8DKStZG326tClkcTY\"",
    "mtime": "2022-05-14T07:16:05.358Z",
    "path": "../public/_nuxt/_slug_-14d67209.mjs"
  },
  "/_nuxt/_slug_-37f66acf.mjs": {
    "type": "application/javascript",
    "etag": "\"7f6-XWUKaF3CtNcWxo5OTK8OH9+v+Yc\"",
    "mtime": "2022-05-14T07:16:05.358Z",
    "path": "../public/_nuxt/_slug_-37f66acf.mjs"
  },
  "/_nuxt/add-20af2b90.mjs": {
    "type": "application/javascript",
    "etag": "\"581-O/nHqAYRZ96NsTBXik0iEUAtJ0E\"",
    "mtime": "2022-05-14T07:16:05.357Z",
    "path": "../public/_nuxt/add-20af2b90.mjs"
  },
  "/_nuxt/add-aeb10a68.mjs": {
    "type": "application/javascript",
    "etag": "\"668-EYJlonwno33CjglEBIHbZw3iGpI\"",
    "mtime": "2022-05-14T07:16:05.357Z",
    "path": "../public/_nuxt/add-aeb10a68.mjs"
  },
  "/_nuxt/add-fc9873ca.mjs": {
    "type": "application/javascript",
    "etag": "\"614-Rt98Xmiw75PR6blOaAYqiewPvOc\"",
    "mtime": "2022-05-14T07:16:05.356Z",
    "path": "../public/_nuxt/add-fc9873ca.mjs"
  },
  "/_nuxt/admin-8036f0ba.mjs": {
    "type": "application/javascript",
    "etag": "\"e56-wzxIkCwsdqDZaKW87pm8S7PYABk\"",
    "mtime": "2022-05-14T07:16:05.356Z",
    "path": "../public/_nuxt/admin-8036f0ba.mjs"
  },
  "/_nuxt/admin.ad2b3ac7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6485-rblqwF6EdSUW+kUDnEKRzdad7sg\"",
    "mtime": "2022-05-14T07:16:05.355Z",
    "path": "../public/_nuxt/admin.ad2b3ac7.css"
  },
  "/_nuxt/asyncData-189d8b04.mjs": {
    "type": "application/javascript",
    "etag": "\"8c9-/diW/dmCvpETIlZR6O3+saNP01A\"",
    "mtime": "2022-05-14T07:16:05.355Z",
    "path": "../public/_nuxt/asyncData-189d8b04.mjs"
  },
  "/_nuxt/contact-2bc995d0.mjs": {
    "type": "application/javascript",
    "etag": "\"1051-8n7xy7PS5Eh6KZ+vm/95xb7Zmvo\"",
    "mtime": "2022-05-14T07:16:05.354Z",
    "path": "../public/_nuxt/contact-2bc995d0.mjs"
  },
  "/_nuxt/default-7f7dddc8.mjs": {
    "type": "application/javascript",
    "etag": "\"1af5-gaTWJi7Vm8/FPrXTh6XkhSUghDA\"",
    "mtime": "2022-05-14T07:16:05.354Z",
    "path": "../public/_nuxt/default-7f7dddc8.mjs"
  },
  "/_nuxt/dialog-b0bfe91c.mjs": {
    "type": "application/javascript",
    "etag": "\"2bb3-JN2G4WGW6UBBTZoCqyNqTBAKXPY\"",
    "mtime": "2022-05-14T07:16:05.353Z",
    "path": "../public/_nuxt/dialog-b0bfe91c.mjs"
  },
  "/_nuxt/entry-7a7af91b.mjs": {
    "type": "application/javascript",
    "etag": "\"a747a-w+tkUxvuozyR9cQ+Uk4q5h4Kxc8\"",
    "mtime": "2022-05-14T07:16:05.353Z",
    "path": "../public/_nuxt/entry-7a7af91b.mjs"
  },
  "/_nuxt/entry.367a4adb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"831d-bewJawZtFTOL2eU89Cte76m9/xI\"",
    "mtime": "2022-05-14T07:16:05.350Z",
    "path": "../public/_nuxt/entry.367a4adb.css"
  },
  "/_nuxt/index-360f3aba.mjs": {
    "type": "application/javascript",
    "etag": "\"193-9VxJOX5jreGC21+x/H7coY1UeZw\"",
    "mtime": "2022-05-14T07:16:05.334Z",
    "path": "../public/_nuxt/index-360f3aba.mjs"
  },
  "/_nuxt/index-4783cac5.mjs": {
    "type": "application/javascript",
    "etag": "\"d05-OGJEp/PiMjxRxm2khwwZj09MOuU\"",
    "mtime": "2022-05-14T07:16:05.334Z",
    "path": "../public/_nuxt/index-4783cac5.mjs"
  },
  "/_nuxt/index-5d6dbdbf.mjs": {
    "type": "application/javascript",
    "etag": "\"c06-qDGD89z8nPauKcMd4uGZEKlCjD0\"",
    "mtime": "2022-05-14T07:16:05.333Z",
    "path": "../public/_nuxt/index-5d6dbdbf.mjs"
  },
  "/_nuxt/index-6b68a06b.mjs": {
    "type": "application/javascript",
    "etag": "\"819-xzbRPGMN8uJHzeeycpeB7TgRarY\"",
    "mtime": "2022-05-14T07:16:05.333Z",
    "path": "../public/_nuxt/index-6b68a06b.mjs"
  },
  "/_nuxt/index-6e055d95.mjs": {
    "type": "application/javascript",
    "etag": "\"930-unmX2q2SF+7JEJ2QN8z2leyjwjc\"",
    "mtime": "2022-05-14T07:16:05.333Z",
    "path": "../public/_nuxt/index-6e055d95.mjs"
  },
  "/_nuxt/index-726afa4c.mjs": {
    "type": "application/javascript",
    "etag": "\"792-XgEG/P5rfhn9PMuNfYKmO4PZnSw\"",
    "mtime": "2022-05-14T07:16:05.332Z",
    "path": "../public/_nuxt/index-726afa4c.mjs"
  },
  "/_nuxt/index-aec97de2.mjs": {
    "type": "application/javascript",
    "etag": "\"b3e-gzA+zf+yKTTEmmQnMdSSy0M6rFg\"",
    "mtime": "2022-05-14T07:16:05.332Z",
    "path": "../public/_nuxt/index-aec97de2.mjs"
  },
  "/_nuxt/index-f7b09cd6.mjs": {
    "type": "application/javascript",
    "etag": "\"ced-A6KABI0qcbePIsRyY2S0iPF19CI\"",
    "mtime": "2022-05-14T07:16:05.331Z",
    "path": "../public/_nuxt/index-f7b09cd6.mjs"
  },
  "/_nuxt/is-admin-6dfdc9bf.mjs": {
    "type": "application/javascript",
    "etag": "\"82-rssy/WPyisMp0Oiz9PCkT9+GjLM\"",
    "mtime": "2022-05-14T07:16:05.331Z",
    "path": "../public/_nuxt/is-admin-6dfdc9bf.mjs"
  },
  "/_nuxt/login-3b4d4aff.mjs": {
    "type": "application/javascript",
    "etag": "\"ce4-tMHJJw5c6anFMbmpp8hLtvUFcgw\"",
    "mtime": "2022-05-14T07:16:05.330Z",
    "path": "../public/_nuxt/login-3b4d4aff.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"3bde-KD3exV8F7cQsM9tKsxcdajRHELM\"",
    "mtime": "2022-05-14T07:16:05.329Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/media-b29acfb4.mjs": {
    "type": "application/javascript",
    "etag": "\"255-DBE4ivRyTEo71WviXAbBtncZxH8\"",
    "mtime": "2022-05-14T07:16:05.329Z",
    "path": "../public/_nuxt/media-b29acfb4.mjs"
  },
  "/_nuxt/mentions-legales-6cf1e26c.mjs": {
    "type": "application/javascript",
    "etag": "\"5bc-AxoyWDnJTaRdBO8Jllclz8Bafy0\"",
    "mtime": "2022-05-14T07:16:05.328Z",
    "path": "../public/_nuxt/mentions-legales-6cf1e26c.mjs"
  },
  "/_nuxt/newsletter-101f1dc7.mjs": {
    "type": "application/javascript",
    "etag": "\"54a-2wG/W/7/sLCT1V2ML2II225/mLQ\"",
    "mtime": "2022-05-14T07:16:05.328Z",
    "path": "../public/_nuxt/newsletter-101f1dc7.mjs"
  },
  "/_nuxt/nous-rejoindre-c96f2521.mjs": {
    "type": "application/javascript",
    "etag": "\"273f-X6ZPhEp9f7CIoy2F4lRKXp+Y1/A\"",
    "mtime": "2022-05-14T07:16:05.327Z",
    "path": "../public/_nuxt/nous-rejoindre-c96f2521.mjs"
  },
  "/_nuxt/transition-82de0b1f.mjs": {
    "type": "application/javascript",
    "etag": "\"1a99-47g6AgmvjcWY2OERqHyTYdk2C6A\"",
    "mtime": "2022-05-14T07:16:05.327Z",
    "path": "../public/_nuxt/transition-82de0b1f.mjs"
  },
  "/_nuxt/use-outside-click-17810f29.mjs": {
    "type": "application/javascript",
    "etag": "\"1996-cwjQKn8JnnYdhVKAawxLUP5pWmc\"",
    "mtime": "2022-05-14T07:16:05.326Z",
    "path": "../public/_nuxt/use-outside-click-17810f29.mjs"
  },
  "/_nuxt/use-resolve-button-type-229cdeb6.mjs": {
    "type": "application/javascript",
    "etag": "\"50d-6fh8PQxY09uxZg8WS/9NOvx4jzY\"",
    "mtime": "2022-05-14T07:16:05.325Z",
    "path": "../public/_nuxt/use-resolve-button-type-229cdeb6.mjs"
  },
  "/_nuxt/useDateHelper-e4869b7b.mjs": {
    "type": "application/javascript",
    "etag": "\"88aa-fYk7/OU2r2T3TPLY0AnQkZC3PPQ\"",
    "mtime": "2022-05-14T07:16:05.324Z",
    "path": "../public/_nuxt/useDateHelper-e4869b7b.mjs"
  },
  "/_nuxt/useStringHelper-b0dd0f5e.mjs": {
    "type": "application/javascript",
    "etag": "\"6e-CNuUFbr2SegccFDH6tSLbFDCAvI\"",
    "mtime": "2022-05-14T07:16:05.321Z",
    "path": "../public/_nuxt/useStringHelper-b0dd0f5e.mjs"
  },
  "/files/questionnaire_transalpins_v1.pdf": {
    "type": "application/pdf",
    "etag": "\"10d73-UH8H3aqibf890qJvtuEXBj7O17U\"",
    "mtime": "2022-05-14T07:16:05.376Z",
    "path": "../public/files/questionnaire_transalpins_v1.pdf"
  },
  "/icons/remixicon.symbol.svg": {
    "type": "image/svg+xml",
    "etag": "\"db38b-RrC2wA7G8siCsKCvOFIoeK4Jk7g\"",
    "mtime": "2022-05-14T07:16:05.375Z",
    "path": "../public/icons/remixicon.symbol.svg"
  },
  "/images/vercors.jpg": {
    "type": "image/jpeg",
    "etag": "\"145b90-E6FmIM3F1w++JwhgRKS6rKTnLgI\"",
    "mtime": "2022-05-14T07:16:05.371Z",
    "path": "../public/images/vercors.jpg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = ["/_nuxt"];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _152570 = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _lazy_273154 = () => import('../handlers/renderer.mjs').then(function (n) { return n.a; });

const handlers = [
  { route: '', handler: _152570, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_273154, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_273154, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { nodeServer as n, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map
