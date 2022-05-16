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
  "/_nuxt/Carrousel-8fa4093a.mjs": {
    "type": "application/javascript",
    "etag": "\"6e6-QNpAaF8GqGQVyJYfJ4OZRleoCdc\"",
    "mtime": "2022-05-16T10:55:56.785Z",
    "path": "../public/_nuxt/Carrousel-8fa4093a.mjs"
  },
  "/_nuxt/CheckboxField-311f7d08.mjs": {
    "type": "application/javascript",
    "etag": "\"34f-K2RSK9KKgyf5fzUTMuTX13N64hI\"",
    "mtime": "2022-05-16T10:55:56.784Z",
    "path": "../public/_nuxt/CheckboxField-311f7d08.mjs"
  },
  "/_nuxt/ConfirmationDeleteModal-82351f71.mjs": {
    "type": "application/javascript",
    "etag": "\"6ac-JBCV7sIK9/WV7udZQGpUQsZaFk4\"",
    "mtime": "2022-05-16T10:55:56.784Z",
    "path": "../public/_nuxt/ConfirmationDeleteModal-82351f71.mjs"
  },
  "/_nuxt/Editor-8b654467.mjs": {
    "type": "application/javascript",
    "etag": "\"a208-jTAsQsgjK2eeXuam9Tdm8fo0jYY\"",
    "mtime": "2022-05-16T10:55:56.784Z",
    "path": "../public/_nuxt/Editor-8b654467.mjs"
  },
  "/_nuxt/FileManager-9e64d3c6.mjs": {
    "type": "application/javascript",
    "etag": "\"47e5-O0dImZWXQWIqsNkeRihTbEmnG1M\"",
    "mtime": "2022-05-16T10:55:56.783Z",
    "path": "../public/_nuxt/FileManager-9e64d3c6.mjs"
  },
  "/_nuxt/FormComponent-0a626e27.mjs": {
    "type": "application/javascript",
    "etag": "\"17d0-EpOJ5rEqcWIONAQNJFl1AT1zdNQ\"",
    "mtime": "2022-05-16T10:55:56.783Z",
    "path": "../public/_nuxt/FormComponent-0a626e27.mjs"
  },
  "/_nuxt/FormComponent-2531086d.mjs": {
    "type": "application/javascript",
    "etag": "\"772-50NFaEQXmkx+0QGfR0ic9P9FXCI\"",
    "mtime": "2022-05-16T10:55:56.782Z",
    "path": "../public/_nuxt/FormComponent-2531086d.mjs"
  },
  "/_nuxt/FormComponent-68fa49f0.mjs": {
    "type": "application/javascript",
    "etag": "\"1098-u3SWg55iPHDFPf47grXcAL+jPbM\"",
    "mtime": "2022-05-16T10:55:56.782Z",
    "path": "../public/_nuxt/FormComponent-68fa49f0.mjs"
  },
  "/_nuxt/Icon-8316deac.mjs": {
    "type": "application/javascript",
    "etag": "\"18d-HJU4QDhXfJGeUAtnVvRQ8pHG3/g\"",
    "mtime": "2022-05-16T10:55:56.782Z",
    "path": "../public/_nuxt/Icon-8316deac.mjs"
  },
  "/_nuxt/Notification-1138403f.mjs": {
    "type": "application/javascript",
    "etag": "\"22cb-8GXrfiQC2pNZOZtGgx2Z5UYIR8s\"",
    "mtime": "2022-05-16T10:55:56.781Z",
    "path": "../public/_nuxt/Notification-1138403f.mjs"
  },
  "/_nuxt/PageComponent-2686b6fe.mjs": {
    "type": "application/javascript",
    "etag": "\"269-cvJb6JsuhApIzaVV/CPXzo3WI40\"",
    "mtime": "2022-05-16T10:55:56.781Z",
    "path": "../public/_nuxt/PageComponent-2686b6fe.mjs"
  },
  "/_nuxt/PreviewImage-cc46b1f7.mjs": {
    "type": "application/javascript",
    "etag": "\"320-EObdJph8u9ir4BW7axAgg3jpD4I\"",
    "mtime": "2022-05-16T10:55:56.781Z",
    "path": "../public/_nuxt/PreviewImage-cc46b1f7.mjs"
  },
  "/_nuxt/TextField-8fccfdb3.mjs": {
    "type": "application/javascript",
    "etag": "\"a92-B4dSoVa+uEBF52kb7x7fnv0hmmw\"",
    "mtime": "2022-05-16T10:55:56.780Z",
    "path": "../public/_nuxt/TextField-8fccfdb3.mjs"
  },
  "/_nuxt/_...slug_-3e48cc72.mjs": {
    "type": "application/javascript",
    "etag": "\"3cd-R5g6w2eNz1aVc5zV4U/zvFZdrUg\"",
    "mtime": "2022-05-16T10:55:56.780Z",
    "path": "../public/_nuxt/_...slug_-3e48cc72.mjs"
  },
  "/_nuxt/_id_-0a154ee2.mjs": {
    "type": "application/javascript",
    "etag": "\"12db-jeZlPx6cSxewA74tb/BdWmnEJs8\"",
    "mtime": "2022-05-16T10:55:56.780Z",
    "path": "../public/_nuxt/_id_-0a154ee2.mjs"
  },
  "/_nuxt/_id_-286be88c.mjs": {
    "type": "application/javascript",
    "etag": "\"6bf-Hw6rbAiwikD3ufW5fqcrV1FMQe0\"",
    "mtime": "2022-05-16T10:55:56.779Z",
    "path": "../public/_nuxt/_id_-286be88c.mjs"
  },
  "/_nuxt/_id_-89778b72.mjs": {
    "type": "application/javascript",
    "etag": "\"4cc-CpSsbKAQahfUsDSKtLXd/04r+VM\"",
    "mtime": "2022-05-16T10:55:56.779Z",
    "path": "../public/_nuxt/_id_-89778b72.mjs"
  },
  "/_nuxt/_id_-c6220890.mjs": {
    "type": "application/javascript",
    "etag": "\"9a5-FDyv4K20y7K4s2nljjSVm8biApc\"",
    "mtime": "2022-05-16T10:55:56.779Z",
    "path": "../public/_nuxt/_id_-c6220890.mjs"
  },
  "/_nuxt/_slug_-666d8260.mjs": {
    "type": "application/javascript",
    "etag": "\"5d7-MniyK37AFu+oGFoB249/VfAMLFQ\"",
    "mtime": "2022-05-16T10:55:56.778Z",
    "path": "../public/_nuxt/_slug_-666d8260.mjs"
  },
  "/_nuxt/_slug_-67f82388.mjs": {
    "type": "application/javascript",
    "etag": "\"7f6-kTSuiyuHbtVVobSZkMeorhHpvJg\"",
    "mtime": "2022-05-16T10:55:56.778Z",
    "path": "../public/_nuxt/_slug_-67f82388.mjs"
  },
  "/_nuxt/add-07c9dceb.mjs": {
    "type": "application/javascript",
    "etag": "\"668-mXBMeljHPehWOeJNOvIxgkrjJVs\"",
    "mtime": "2022-05-16T10:55:56.778Z",
    "path": "../public/_nuxt/add-07c9dceb.mjs"
  },
  "/_nuxt/add-2db3ec02.mjs": {
    "type": "application/javascript",
    "etag": "\"614-drdNTA08bAjGWarfavs1QHcFeXE\"",
    "mtime": "2022-05-16T10:55:56.777Z",
    "path": "../public/_nuxt/add-2db3ec02.mjs"
  },
  "/_nuxt/add-b1ecca20.mjs": {
    "type": "application/javascript",
    "etag": "\"581-XHGmpIIro4pToCcQ7ZiYrgr9OAw\"",
    "mtime": "2022-05-16T10:55:56.777Z",
    "path": "../public/_nuxt/add-b1ecca20.mjs"
  },
  "/_nuxt/admin-255c175e.mjs": {
    "type": "application/javascript",
    "etag": "\"e56-Pz3GexwyAQVcbwo95igra8MneEU\"",
    "mtime": "2022-05-16T10:55:56.777Z",
    "path": "../public/_nuxt/admin-255c175e.mjs"
  },
  "/_nuxt/admin.4229eeb4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"64c9-nEmHauNvwIqqZJELpSE+RGSC7No\"",
    "mtime": "2022-05-16T10:55:56.776Z",
    "path": "../public/_nuxt/admin.4229eeb4.css"
  },
  "/_nuxt/asyncData-d8550ba9.mjs": {
    "type": "application/javascript",
    "etag": "\"8c9-65olfMVVLXlgxxVdtX1LbY2Vifg\"",
    "mtime": "2022-05-16T10:55:56.776Z",
    "path": "../public/_nuxt/asyncData-d8550ba9.mjs"
  },
  "/_nuxt/contact-db395b13.mjs": {
    "type": "application/javascript",
    "etag": "\"1051-3dfbbc0D/gWd0NinLv+nx7iGzok\"",
    "mtime": "2022-05-16T10:55:56.775Z",
    "path": "../public/_nuxt/contact-db395b13.mjs"
  },
  "/_nuxt/default-d91fec95.mjs": {
    "type": "application/javascript",
    "etag": "\"1af5-dgq/LOERW/mefl4TXHn8qugZfUQ\"",
    "mtime": "2022-05-16T10:55:56.775Z",
    "path": "../public/_nuxt/default-d91fec95.mjs"
  },
  "/_nuxt/dialog-d2f33145.mjs": {
    "type": "application/javascript",
    "etag": "\"2bb3-4vVadVjgVrScTYrntFPjaB4dNS4\"",
    "mtime": "2022-05-16T10:55:56.775Z",
    "path": "../public/_nuxt/dialog-d2f33145.mjs"
  },
  "/_nuxt/entry-a96e082f.mjs": {
    "type": "application/javascript",
    "etag": "\"a747a-/irlg8UQBk59ojsXeD6p+/GrWfw\"",
    "mtime": "2022-05-16T10:55:56.774Z",
    "path": "../public/_nuxt/entry-a96e082f.mjs"
  },
  "/_nuxt/entry.4cd9de94.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8361-o8AvaseRlUQXbN5x/majOTzxFMs\"",
    "mtime": "2022-05-16T10:55:56.773Z",
    "path": "../public/_nuxt/entry.4cd9de94.css"
  },
  "/_nuxt/index-62c8743c.mjs": {
    "type": "application/javascript",
    "etag": "\"ced-2mDqxxXEzrkQcpFx42DUAPWdlaw\"",
    "mtime": "2022-05-16T10:55:56.772Z",
    "path": "../public/_nuxt/index-62c8743c.mjs"
  },
  "/_nuxt/index-7c6f7cdc.mjs": {
    "type": "application/javascript",
    "etag": "\"930-/XaJYkqWuh95VuxaG1LejSHFuQ4\"",
    "mtime": "2022-05-16T10:55:56.771Z",
    "path": "../public/_nuxt/index-7c6f7cdc.mjs"
  },
  "/_nuxt/index-7d4042fb.mjs": {
    "type": "application/javascript",
    "etag": "\"193-uAt6H8H5kicQInvSeaWRTzUCVcs\"",
    "mtime": "2022-05-16T10:55:56.771Z",
    "path": "../public/_nuxt/index-7d4042fb.mjs"
  },
  "/_nuxt/index-a30cca39.mjs": {
    "type": "application/javascript",
    "etag": "\"819-XQkbOA8Op0GC1USWjbDswrzaZuY\"",
    "mtime": "2022-05-16T10:55:56.771Z",
    "path": "../public/_nuxt/index-a30cca39.mjs"
  },
  "/_nuxt/index-a9505006.mjs": {
    "type": "application/javascript",
    "etag": "\"792-UGCOh7eO4vaZwlOjJe66HQCHJPM\"",
    "mtime": "2022-05-16T10:55:56.770Z",
    "path": "../public/_nuxt/index-a9505006.mjs"
  },
  "/_nuxt/index-bf154bf6.mjs": {
    "type": "application/javascript",
    "etag": "\"b3e-H81V8B05XeL1t02uFp6JLOw8jtc\"",
    "mtime": "2022-05-16T10:55:56.770Z",
    "path": "../public/_nuxt/index-bf154bf6.mjs"
  },
  "/_nuxt/index-efac6e60.mjs": {
    "type": "application/javascript",
    "etag": "\"d05-83b6FaJ4CTwgKOhCvxscQDz2VCI\"",
    "mtime": "2022-05-16T10:55:56.770Z",
    "path": "../public/_nuxt/index-efac6e60.mjs"
  },
  "/_nuxt/index-f7a51603.mjs": {
    "type": "application/javascript",
    "etag": "\"c06-HW1BwpG9L06Bqds9yniFy91iBNU\"",
    "mtime": "2022-05-16T10:55:56.769Z",
    "path": "../public/_nuxt/index-f7a51603.mjs"
  },
  "/_nuxt/is-admin-8db344d8.mjs": {
    "type": "application/javascript",
    "etag": "\"82-c8gAjEkXt8FhH7IymPnimiKF188\"",
    "mtime": "2022-05-16T10:55:56.769Z",
    "path": "../public/_nuxt/is-admin-8db344d8.mjs"
  },
  "/_nuxt/login-cc5fc118.mjs": {
    "type": "application/javascript",
    "etag": "\"ce4-TA8aUZu2tzwgmy7IDfOFk14xw3s\"",
    "mtime": "2022-05-16T10:55:56.769Z",
    "path": "../public/_nuxt/login-cc5fc118.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"3bde-c95I90/g6jD66YCfkihdevhM10U\"",
    "mtime": "2022-05-16T10:55:56.768Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/media-16213d6d.mjs": {
    "type": "application/javascript",
    "etag": "\"255-S68JB8nzZt405DUTPnb3YV4jAGM\"",
    "mtime": "2022-05-16T10:55:56.768Z",
    "path": "../public/_nuxt/media-16213d6d.mjs"
  },
  "/_nuxt/mentions-legales-36791afc.mjs": {
    "type": "application/javascript",
    "etag": "\"5bc-Cm+ENgIePgUuMdntz9nI3yS/gWI\"",
    "mtime": "2022-05-16T10:55:56.767Z",
    "path": "../public/_nuxt/mentions-legales-36791afc.mjs"
  },
  "/_nuxt/newsletter-418e565d.mjs": {
    "type": "application/javascript",
    "etag": "\"54a-pRQ2Dk2r174LDiG8+atb28XbZIU\"",
    "mtime": "2022-05-16T10:55:56.767Z",
    "path": "../public/_nuxt/newsletter-418e565d.mjs"
  },
  "/_nuxt/nous-rejoindre-71acfe8f.mjs": {
    "type": "application/javascript",
    "etag": "\"273f-FAmr1MYZoUfwzrkqu2wr7otUexA\"",
    "mtime": "2022-05-16T10:55:56.766Z",
    "path": "../public/_nuxt/nous-rejoindre-71acfe8f.mjs"
  },
  "/_nuxt/transition-301b7402.mjs": {
    "type": "application/javascript",
    "etag": "\"1a99-iSkCfC9GV+kT8v9M878KxlDdr2w\"",
    "mtime": "2022-05-16T10:55:56.766Z",
    "path": "../public/_nuxt/transition-301b7402.mjs"
  },
  "/_nuxt/use-outside-click-45283c30.mjs": {
    "type": "application/javascript",
    "etag": "\"1996-d3tIFMCmhd7YuVYMDHUmexsshYI\"",
    "mtime": "2022-05-16T10:55:56.765Z",
    "path": "../public/_nuxt/use-outside-click-45283c30.mjs"
  },
  "/_nuxt/use-resolve-button-type-ad4452fd.mjs": {
    "type": "application/javascript",
    "etag": "\"50d-B9lvj9q2ULJyXeo2EXhJ3xr92I4\"",
    "mtime": "2022-05-16T10:55:56.765Z",
    "path": "../public/_nuxt/use-resolve-button-type-ad4452fd.mjs"
  },
  "/_nuxt/useDateHelper-e4869b7b.mjs": {
    "type": "application/javascript",
    "etag": "\"88aa-fYk7/OU2r2T3TPLY0AnQkZC3PPQ\"",
    "mtime": "2022-05-16T10:55:56.764Z",
    "path": "../public/_nuxt/useDateHelper-e4869b7b.mjs"
  },
  "/_nuxt/useStringHelper-b0dd0f5e.mjs": {
    "type": "application/javascript",
    "etag": "\"6e-CNuUFbr2SegccFDH6tSLbFDCAvI\"",
    "mtime": "2022-05-16T10:55:56.763Z",
    "path": "../public/_nuxt/useStringHelper-b0dd0f5e.mjs"
  },
  "/files/questionnaire_transalpins_v1.pdf": {
    "type": "application/pdf",
    "etag": "\"10d73-UH8H3aqibf890qJvtuEXBj7O17U\"",
    "mtime": "2022-05-16T10:55:56.791Z",
    "path": "../public/files/questionnaire_transalpins_v1.pdf"
  },
  "/icons/remixicon.symbol.svg": {
    "type": "image/svg+xml",
    "etag": "\"db38b-RrC2wA7G8siCsKCvOFIoeK4Jk7g\"",
    "mtime": "2022-05-16T10:55:56.790Z",
    "path": "../public/icons/remixicon.symbol.svg"
  },
  "/images/vercors.jpg": {
    "type": "image/jpeg",
    "etag": "\"145b90-E6FmIM3F1w++JwhgRKS6rKTnLgI\"",
    "mtime": "2022-05-16T10:55:56.788Z",
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
