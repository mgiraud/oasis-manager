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
import redirectSSL from 'redirect-ssl';

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
  "/_nuxt/Carrousel-ada483ff.mjs": {
    "type": "application/javascript",
    "etag": "\"6e7-frnxpVol6kFkc2mLjGHTvhumq8k\"",
    "mtime": "2022-05-24T12:35:53.365Z",
    "path": "../public/_nuxt/Carrousel-ada483ff.mjs"
  },
  "/_nuxt/CheckboxField-23418cc9.mjs": {
    "type": "application/javascript",
    "etag": "\"34f-mZH7lS2asiEjvlikPB2kTusE6FY\"",
    "mtime": "2022-05-24T12:35:53.365Z",
    "path": "../public/_nuxt/CheckboxField-23418cc9.mjs"
  },
  "/_nuxt/ConfirmationDeleteModal-cd61dbe7.mjs": {
    "type": "application/javascript",
    "etag": "\"6ac-KI9J1RaDoUsdgWn4m4aQsWqDB5A\"",
    "mtime": "2022-05-24T12:35:53.365Z",
    "path": "../public/_nuxt/ConfirmationDeleteModal-cd61dbe7.mjs"
  },
  "/_nuxt/Editor-bea37c24.mjs": {
    "type": "application/javascript",
    "etag": "\"859f-JM/xipx2IJcv8uBUOZolkS0WrPg\"",
    "mtime": "2022-05-24T12:35:53.364Z",
    "path": "../public/_nuxt/Editor-bea37c24.mjs"
  },
  "/_nuxt/FileManager-d5b0634a.mjs": {
    "type": "application/javascript",
    "etag": "\"6e18-fXoyNhx1mvKag4gu7Yuzmvr227k\"",
    "mtime": "2022-05-24T12:35:53.364Z",
    "path": "../public/_nuxt/FileManager-d5b0634a.mjs"
  },
  "/_nuxt/FormComponent-369f4d89.mjs": {
    "type": "application/javascript",
    "etag": "\"772-Buz8Quu+o8m7M+3aijxDTCfFreM\"",
    "mtime": "2022-05-24T12:35:53.364Z",
    "path": "../public/_nuxt/FormComponent-369f4d89.mjs"
  },
  "/_nuxt/FormComponent-5b78e617.mjs": {
    "type": "application/javascript",
    "etag": "\"17f4-9SWtOuOmwZoWJKa7LDWdCoDSsYY\"",
    "mtime": "2022-05-24T12:35:53.363Z",
    "path": "../public/_nuxt/FormComponent-5b78e617.mjs"
  },
  "/_nuxt/FormComponent-5c0176e0.mjs": {
    "type": "application/javascript",
    "etag": "\"1098-s7bTwhfl1xPCZL/fu5/ONmJ3k2U\"",
    "mtime": "2022-05-24T12:35:53.363Z",
    "path": "../public/_nuxt/FormComponent-5c0176e0.mjs"
  },
  "/_nuxt/Icon-6e6283c1.mjs": {
    "type": "application/javascript",
    "etag": "\"18d-vdtaYISLyFUtg7Lov/HjLVcwRjA\"",
    "mtime": "2022-05-24T12:35:53.363Z",
    "path": "../public/_nuxt/Icon-6e6283c1.mjs"
  },
  "/_nuxt/Notification-e0e3f108.mjs": {
    "type": "application/javascript",
    "etag": "\"22ca-yoYFKwKzpaq299cw8kFP/X/68rs\"",
    "mtime": "2022-05-24T12:35:53.362Z",
    "path": "../public/_nuxt/Notification-e0e3f108.mjs"
  },
  "/_nuxt/PageComponent-09f24025.mjs": {
    "type": "application/javascript",
    "etag": "\"269-2bjoiKaW08LyQD0jZHfyWN8sAvc\"",
    "mtime": "2022-05-24T12:35:53.362Z",
    "path": "../public/_nuxt/PageComponent-09f24025.mjs"
  },
  "/_nuxt/PreviewImage-d94dd697.mjs": {
    "type": "application/javascript",
    "etag": "\"34e-AhQMEsU2zM5BCQPiKs4Io5BIsOw\"",
    "mtime": "2022-05-24T12:35:53.362Z",
    "path": "../public/_nuxt/PreviewImage-d94dd697.mjs"
  },
  "/_nuxt/TextField-69fdc5c3.mjs": {
    "type": "application/javascript",
    "etag": "\"a92-Mq8G1iag9Vy6fUdVj9FQd+C/rFY\"",
    "mtime": "2022-05-24T12:35:53.361Z",
    "path": "../public/_nuxt/TextField-69fdc5c3.mjs"
  },
  "/_nuxt/_...slug_-2d8c40ad.mjs": {
    "type": "application/javascript",
    "etag": "\"3cd-ovoEIafNdZahv1293wCt0bF72Xw\"",
    "mtime": "2022-05-24T12:35:53.361Z",
    "path": "../public/_nuxt/_...slug_-2d8c40ad.mjs"
  },
  "/_nuxt/_id_-3f34af43.mjs": {
    "type": "application/javascript",
    "etag": "\"6be-6mKpmpx1eorkKe/atj9VyHCxgZQ\"",
    "mtime": "2022-05-24T12:35:53.361Z",
    "path": "../public/_nuxt/_id_-3f34af43.mjs"
  },
  "/_nuxt/_id_-4d669a5d.mjs": {
    "type": "application/javascript",
    "etag": "\"9a5-bX2AL++s8RfJhlIF/tfrjSmP/do\"",
    "mtime": "2022-05-24T12:35:53.360Z",
    "path": "../public/_nuxt/_id_-4d669a5d.mjs"
  },
  "/_nuxt/_id_-5cd3be64.mjs": {
    "type": "application/javascript",
    "etag": "\"12db-aI398x1rrxzsPLgqdqHphmNR1K8\"",
    "mtime": "2022-05-24T12:35:53.360Z",
    "path": "../public/_nuxt/_id_-5cd3be64.mjs"
  },
  "/_nuxt/_id_-b06914bb.mjs": {
    "type": "application/javascript",
    "etag": "\"4cc-cRFNFdCqkeszcM0hCZ23bRYI3LU\"",
    "mtime": "2022-05-24T12:35:53.360Z",
    "path": "../public/_nuxt/_id_-b06914bb.mjs"
  },
  "/_nuxt/_slug_-71bbf816.mjs": {
    "type": "application/javascript",
    "etag": "\"5d7-0xB0n+4CCCf4wYnl1vBtcXrUEFA\"",
    "mtime": "2022-05-24T12:35:53.359Z",
    "path": "../public/_nuxt/_slug_-71bbf816.mjs"
  },
  "/_nuxt/_slug_-ca2daf09.mjs": {
    "type": "application/javascript",
    "etag": "\"7f5-Y6hiQBCGAtmyoiaLg/O1UGwgM9c\"",
    "mtime": "2022-05-24T12:35:53.359Z",
    "path": "../public/_nuxt/_slug_-ca2daf09.mjs"
  },
  "/_nuxt/add-0ea43859.mjs": {
    "type": "application/javascript",
    "etag": "\"667-dijH226NzDEeFV3R8Patm5VGjnc\"",
    "mtime": "2022-05-24T12:35:53.359Z",
    "path": "../public/_nuxt/add-0ea43859.mjs"
  },
  "/_nuxt/add-3f8d8893.mjs": {
    "type": "application/javascript",
    "etag": "\"613-Rieup7M+1IP3yYXBjpRgScQ7ONg\"",
    "mtime": "2022-05-24T12:35:53.358Z",
    "path": "../public/_nuxt/add-3f8d8893.mjs"
  },
  "/_nuxt/add-9e635004.mjs": {
    "type": "application/javascript",
    "etag": "\"581-xuGWifSKYqsGvMd0grLVa5/cRtM\"",
    "mtime": "2022-05-24T12:35:53.358Z",
    "path": "../public/_nuxt/add-9e635004.mjs"
  },
  "/_nuxt/admin-5ba75640.mjs": {
    "type": "application/javascript",
    "etag": "\"e55-sLkl1rM+RrBK/BjE3fxzUP8JI7s\"",
    "mtime": "2022-05-24T12:35:53.357Z",
    "path": "../public/_nuxt/admin-5ba75640.mjs"
  },
  "/_nuxt/admin.5494c02b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6624-grUyzmCNU+Ora8hhJhwTEcEVvyc\"",
    "mtime": "2022-05-24T12:35:53.357Z",
    "path": "../public/_nuxt/admin.5494c02b.css"
  },
  "/_nuxt/asyncData-2ab7c675.mjs": {
    "type": "application/javascript",
    "etag": "\"8c9-3Kla+f1f6AKN4FvYjupE4Wxhkwk\"",
    "mtime": "2022-05-24T12:35:53.357Z",
    "path": "../public/_nuxt/asyncData-2ab7c675.mjs"
  },
  "/_nuxt/calculate-active-index-130b59fd.mjs": {
    "type": "application/javascript",
    "etag": "\"335-M4Ep5FtT23eljsgA7eXLYV8lv1U\"",
    "mtime": "2022-05-24T12:35:53.356Z",
    "path": "../public/_nuxt/calculate-active-index-130b59fd.mjs"
  },
  "/_nuxt/contact-8c602b3d.mjs": {
    "type": "application/javascript",
    "etag": "\"1051-sziSOVgoJ7z5HLyjciJHGKumvSM\"",
    "mtime": "2022-05-24T12:35:53.356Z",
    "path": "../public/_nuxt/contact-8c602b3d.mjs"
  },
  "/_nuxt/default-9398f778.mjs": {
    "type": "application/javascript",
    "etag": "\"1aef-1S9rfdIpgHnKrCLRD3RwRDKJlzw\"",
    "mtime": "2022-05-24T12:35:53.356Z",
    "path": "../public/_nuxt/default-9398f778.mjs"
  },
  "/_nuxt/default.ea0f13f1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"664b-1BtnPpgs3j3Qtyl3aisRdMpDLpI\"",
    "mtime": "2022-05-24T12:35:53.355Z",
    "path": "../public/_nuxt/default.ea0f13f1.css"
  },
  "/_nuxt/dialog-c1d3e695.mjs": {
    "type": "application/javascript",
    "etag": "\"2bae-wDeIWmY75yZ/wIvYUTwuDv22NS4\"",
    "mtime": "2022-05-24T12:35:53.355Z",
    "path": "../public/_nuxt/dialog-c1d3e695.mjs"
  },
  "/_nuxt/entry-63f3c6e5.mjs": {
    "type": "application/javascript",
    "etag": "\"a7790-kuvCpN3OrJhfA3lLAfMR+5u9wCg\"",
    "mtime": "2022-05-24T12:35:53.355Z",
    "path": "../public/_nuxt/entry-63f3c6e5.mjs"
  },
  "/_nuxt/entry.a8f8b96d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"84bc-E/NDMT4RAtiF0tVB/imUQI9NgnA\"",
    "mtime": "2022-05-24T12:35:53.353Z",
    "path": "../public/_nuxt/entry.a8f8b96d.css"
  },
  "/_nuxt/index-112f8fb9.mjs": {
    "type": "application/javascript",
    "etag": "\"819-gtCrpZEc6Hc0i3DDOmEjzN/N/VE\"",
    "mtime": "2022-05-24T12:35:53.352Z",
    "path": "../public/_nuxt/index-112f8fb9.mjs"
  },
  "/_nuxt/index-43cde7da.mjs": {
    "type": "application/javascript",
    "etag": "\"930-+WEybWyCuHAgiZoAPaKeNes4WGI\"",
    "mtime": "2022-05-24T12:35:53.351Z",
    "path": "../public/_nuxt/index-43cde7da.mjs"
  },
  "/_nuxt/index-56789aa7.mjs": {
    "type": "application/javascript",
    "etag": "\"d0f-Mw1Nap7HI/o6sWG2O7MmB1o+SAI\"",
    "mtime": "2022-05-24T12:35:53.351Z",
    "path": "../public/_nuxt/index-56789aa7.mjs"
  },
  "/_nuxt/index-6c0fd05a.mjs": {
    "type": "application/javascript",
    "etag": "\"cbf-41N8kVrvEkm3xltDrSXepiaWmR8\"",
    "mtime": "2022-05-24T12:35:53.351Z",
    "path": "../public/_nuxt/index-6c0fd05a.mjs"
  },
  "/_nuxt/index-9ac6c904.mjs": {
    "type": "application/javascript",
    "etag": "\"ced-I+xPbhKe2+TGL8Nio782iYLbfVw\"",
    "mtime": "2022-05-24T12:35:53.351Z",
    "path": "../public/_nuxt/index-9ac6c904.mjs"
  },
  "/_nuxt/index-e443d17f.mjs": {
    "type": "application/javascript",
    "etag": "\"c01-1HRIOdtoeE5ETufDGVl14+f/SsI\"",
    "mtime": "2022-05-24T12:35:53.350Z",
    "path": "../public/_nuxt/index-e443d17f.mjs"
  },
  "/_nuxt/index-f11fffb1.mjs": {
    "type": "application/javascript",
    "etag": "\"193-hwluTT7DOz3N3QzntCMgDquVe/w\"",
    "mtime": "2022-05-24T12:35:53.350Z",
    "path": "../public/_nuxt/index-f11fffb1.mjs"
  },
  "/_nuxt/index-f45167c9.mjs": {
    "type": "application/javascript",
    "etag": "\"792-KoBDFjJFLzNsXZvDzWWk3zGs9YE\"",
    "mtime": "2022-05-24T12:35:53.349Z",
    "path": "../public/_nuxt/index-f45167c9.mjs"
  },
  "/_nuxt/is-admin-2ae1b30a.mjs": {
    "type": "application/javascript",
    "etag": "\"82-kOZNsnWqLtA03cRYKMbLZL7gwpc\"",
    "mtime": "2022-05-24T12:35:53.349Z",
    "path": "../public/_nuxt/is-admin-2ae1b30a.mjs"
  },
  "/_nuxt/login-39fda719.mjs": {
    "type": "application/javascript",
    "etag": "\"ce9-GZ3lsqpWcCeJ39XzQOdvKVU84U0\"",
    "mtime": "2022-05-24T12:35:53.349Z",
    "path": "../public/_nuxt/login-39fda719.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"3bb1-VVgW0WPfwCHEoPOa8HBr2B+dL3c\"",
    "mtime": "2022-05-24T12:35:53.348Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/media-40cfbf71.mjs": {
    "type": "application/javascript",
    "etag": "\"255-rzVZZ9kF8fCme2CkjJU0YacA1ss\"",
    "mtime": "2022-05-24T12:35:53.348Z",
    "path": "../public/_nuxt/media-40cfbf71.mjs"
  },
  "/_nuxt/mentions-legales-fba05e55.mjs": {
    "type": "application/javascript",
    "etag": "\"5bc-6zMXB0RY0MA/j9r0/Frt1UWyUKA\"",
    "mtime": "2022-05-24T12:35:53.347Z",
    "path": "../public/_nuxt/mentions-legales-fba05e55.mjs"
  },
  "/_nuxt/newsletter-28d89864.mjs": {
    "type": "application/javascript",
    "etag": "\"54a-QPG3i+QnLBb/wwx9gdsfC0ecESw\"",
    "mtime": "2022-05-24T12:35:53.347Z",
    "path": "../public/_nuxt/newsletter-28d89864.mjs"
  },
  "/_nuxt/nous-rejoindre-bce7e0ea.mjs": {
    "type": "application/javascript",
    "etag": "\"273f-YfvHFkutjp786hjSbUANrN4NjFY\"",
    "mtime": "2022-05-24T12:35:53.347Z",
    "path": "../public/_nuxt/nous-rejoindre-bce7e0ea.mjs"
  },
  "/_nuxt/transition-25b36fbb.mjs": {
    "type": "application/javascript",
    "etag": "\"1c00-+LM/t11u9i5Gck8DEsvQZLi3lTg\"",
    "mtime": "2022-05-24T12:35:53.346Z",
    "path": "../public/_nuxt/transition-25b36fbb.mjs"
  },
  "/_nuxt/use-outside-click-aa42c4c8.mjs": {
    "type": "application/javascript",
    "etag": "\"1996-hvTN7vFJZlgjJf8BWhwtJ1qYi7A\"",
    "mtime": "2022-05-24T12:35:53.346Z",
    "path": "../public/_nuxt/use-outside-click-aa42c4c8.mjs"
  },
  "/_nuxt/useDateHelper-c6a748de.mjs": {
    "type": "application/javascript",
    "etag": "\"88aa-hRwEh+Tq4zoxfvO73MXr7MDjz0o\"",
    "mtime": "2022-05-24T12:35:53.345Z",
    "path": "../public/_nuxt/useDateHelper-c6a748de.mjs"
  },
  "/_nuxt/useStringHelper-b0dd0f5e.mjs": {
    "type": "application/javascript",
    "etag": "\"6e-CNuUFbr2SegccFDH6tSLbFDCAvI\"",
    "mtime": "2022-05-24T12:35:53.345Z",
    "path": "../public/_nuxt/useStringHelper-b0dd0f5e.mjs"
  },
  "/files/questionnaire_transalpins_v1.pdf": {
    "type": "application/pdf",
    "etag": "\"10d73-UH8H3aqibf890qJvtuEXBj7O17U\"",
    "mtime": "2022-05-24T12:35:53.372Z",
    "path": "../public/files/questionnaire_transalpins_v1.pdf"
  },
  "/icons/remixicon.symbol.svg": {
    "type": "image/svg+xml",
    "etag": "\"db38b-RrC2wA7G8siCsKCvOFIoeK4Jk7g\"",
    "mtime": "2022-05-24T12:35:53.371Z",
    "path": "../public/icons/remixicon.symbol.svg"
  },
  "/images/vercors.jpg": {
    "type": "image/jpeg",
    "etag": "\"145b90-E6FmIM3F1w++JwhgRKS6rKTnLgI\"",
    "mtime": "2022-05-24T12:35:53.369Z",
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

const _270695 = defineEventHandler((event) => {
  {
    redirectSSL(event.req, event.res);
  }
});

const _lazy_273154 = () => import('../handlers/renderer.mjs').then(function (n) { return n.a; });

const handlers = [
  { route: '', handler: _152570, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _270695, lazy: false, middleware: true, method: undefined },
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
