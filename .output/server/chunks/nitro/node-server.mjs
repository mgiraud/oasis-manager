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
  "/_nuxt/Carrousel-309543ab.mjs": {
    "type": "application/javascript",
    "etag": "\"6e7-uw+1Ja1jxKxOhU3gy0aZQoDzsS0\"",
    "mtime": "2022-05-25T07:23:31.977Z",
    "path": "../public/_nuxt/Carrousel-309543ab.mjs"
  },
  "/_nuxt/CheckboxField-6dd604a6.mjs": {
    "type": "application/javascript",
    "etag": "\"34f-pNKJUQQcEjGKWRVapKoON8eFLUk\"",
    "mtime": "2022-05-25T07:23:31.976Z",
    "path": "../public/_nuxt/CheckboxField-6dd604a6.mjs"
  },
  "/_nuxt/ConfirmationDeleteModal-5747b9be.mjs": {
    "type": "application/javascript",
    "etag": "\"6ac-afxUaDjClTEhmxJvEergbmldw/s\"",
    "mtime": "2022-05-25T07:23:31.976Z",
    "path": "../public/_nuxt/ConfirmationDeleteModal-5747b9be.mjs"
  },
  "/_nuxt/Editor-e4ccd61e.mjs": {
    "type": "application/javascript",
    "etag": "\"859f-JprXMSDJf1hAKvBhKQ2XMlDpJE4\"",
    "mtime": "2022-05-25T07:23:31.975Z",
    "path": "../public/_nuxt/Editor-e4ccd61e.mjs"
  },
  "/_nuxt/FileManager-c1dc257e.mjs": {
    "type": "application/javascript",
    "etag": "\"745b-hTldQFRaD+PVTFPRsg0Jim82I/U\"",
    "mtime": "2022-05-25T07:23:31.975Z",
    "path": "../public/_nuxt/FileManager-c1dc257e.mjs"
  },
  "/_nuxt/FormComponent-0cada11f.mjs": {
    "type": "application/javascript",
    "etag": "\"17f4-7S+Nhi6pKMRKXMYdSooJrB0Wmfg\"",
    "mtime": "2022-05-25T07:23:31.974Z",
    "path": "../public/_nuxt/FormComponent-0cada11f.mjs"
  },
  "/_nuxt/FormComponent-d35e75f4.mjs": {
    "type": "application/javascript",
    "etag": "\"772-MJSP+XpMLiqZh9EeFt7TiEGpkEw\"",
    "mtime": "2022-05-25T07:23:31.974Z",
    "path": "../public/_nuxt/FormComponent-d35e75f4.mjs"
  },
  "/_nuxt/FormComponent-e366fe50.mjs": {
    "type": "application/javascript",
    "etag": "\"1098-sk3VqnY7Z9E4gApPB3rUC5Mg5c8\"",
    "mtime": "2022-05-25T07:23:31.974Z",
    "path": "../public/_nuxt/FormComponent-e366fe50.mjs"
  },
  "/_nuxt/Icon-ca36084c.mjs": {
    "type": "application/javascript",
    "etag": "\"18d-/ygQToEz9YhQNVCvTRm1IwpTYpY\"",
    "mtime": "2022-05-25T07:23:31.973Z",
    "path": "../public/_nuxt/Icon-ca36084c.mjs"
  },
  "/_nuxt/Notification-cae11ef6.mjs": {
    "type": "application/javascript",
    "etag": "\"22ca-6cBbxnH8g6ArX7EtVjlusS9n78o\"",
    "mtime": "2022-05-25T07:23:31.973Z",
    "path": "../public/_nuxt/Notification-cae11ef6.mjs"
  },
  "/_nuxt/PageComponent-4e97cdd6.mjs": {
    "type": "application/javascript",
    "etag": "\"269-581Jl6B/P8n0UsJpTkJMvKIxe2c\"",
    "mtime": "2022-05-25T07:23:31.973Z",
    "path": "../public/_nuxt/PageComponent-4e97cdd6.mjs"
  },
  "/_nuxt/PreviewImage-417f085c.mjs": {
    "type": "application/javascript",
    "etag": "\"34e-ZlZ7kzpcftk6OCHrWZJuboAjrHo\"",
    "mtime": "2022-05-25T07:23:31.973Z",
    "path": "../public/_nuxt/PreviewImage-417f085c.mjs"
  },
  "/_nuxt/TextField-52f43e27.mjs": {
    "type": "application/javascript",
    "etag": "\"a92-TVwsiAnRVQ9Qia+xA56AuQz5C8Y\"",
    "mtime": "2022-05-25T07:23:31.972Z",
    "path": "../public/_nuxt/TextField-52f43e27.mjs"
  },
  "/_nuxt/_...slug_-de2c190e.mjs": {
    "type": "application/javascript",
    "etag": "\"3cd-wi4bKWq9rUgnJW8JBFHwfhIiZNg\"",
    "mtime": "2022-05-25T07:23:31.972Z",
    "path": "../public/_nuxt/_...slug_-de2c190e.mjs"
  },
  "/_nuxt/_id_-0888b310.mjs": {
    "type": "application/javascript",
    "etag": "\"9a5-3pEnF7J3MEfo/G9ZVVxfBr2huhI\"",
    "mtime": "2022-05-25T07:23:31.971Z",
    "path": "../public/_nuxt/_id_-0888b310.mjs"
  },
  "/_nuxt/_id_-3c93ed12.mjs": {
    "type": "application/javascript",
    "etag": "\"4cc-wGdFw1zIBOfuxuqUPw6rTlxRtxE\"",
    "mtime": "2022-05-25T07:23:31.971Z",
    "path": "../public/_nuxt/_id_-3c93ed12.mjs"
  },
  "/_nuxt/_id_-5597c6ad.mjs": {
    "type": "application/javascript",
    "etag": "\"6be-lMwWHiX7WtPzU8K3qLvagq/aVFg\"",
    "mtime": "2022-05-25T07:23:31.971Z",
    "path": "../public/_nuxt/_id_-5597c6ad.mjs"
  },
  "/_nuxt/_id_-ed23e792.mjs": {
    "type": "application/javascript",
    "etag": "\"12db-nxtfu5sYTBmFuNBiBvkO1jfRma8\"",
    "mtime": "2022-05-25T07:23:31.970Z",
    "path": "../public/_nuxt/_id_-ed23e792.mjs"
  },
  "/_nuxt/_slug_-45e86ae1.mjs": {
    "type": "application/javascript",
    "etag": "\"5d7-9X3/7CbybJmonqVPO6rw6tHxBK8\"",
    "mtime": "2022-05-25T07:23:31.970Z",
    "path": "../public/_nuxt/_slug_-45e86ae1.mjs"
  },
  "/_nuxt/_slug_-819a4190.mjs": {
    "type": "application/javascript",
    "etag": "\"7f5-PdV56PdMNHkGfcizlE4LKXswGWI\"",
    "mtime": "2022-05-25T07:23:31.970Z",
    "path": "../public/_nuxt/_slug_-819a4190.mjs"
  },
  "/_nuxt/add-3e53fa55.mjs": {
    "type": "application/javascript",
    "etag": "\"667-drKg3rW+JqNDzHQ8V2Ce9zz/cp0\"",
    "mtime": "2022-05-25T07:23:31.969Z",
    "path": "../public/_nuxt/add-3e53fa55.mjs"
  },
  "/_nuxt/add-5e7834a7.mjs": {
    "type": "application/javascript",
    "etag": "\"613-56ajDJ0AQzoX09rF2AUsGapk4/4\"",
    "mtime": "2022-05-25T07:23:31.969Z",
    "path": "../public/_nuxt/add-5e7834a7.mjs"
  },
  "/_nuxt/add-5ed2bc58.mjs": {
    "type": "application/javascript",
    "etag": "\"581-rd1MovYvpHiFRDcIWWT7BI1vLVw\"",
    "mtime": "2022-05-25T07:23:31.969Z",
    "path": "../public/_nuxt/add-5ed2bc58.mjs"
  },
  "/_nuxt/admin-ed6c4022.mjs": {
    "type": "application/javascript",
    "etag": "\"e55-WcRpO4Kojc8FRsPaOnMBo5ZOCs8\"",
    "mtime": "2022-05-25T07:23:31.968Z",
    "path": "../public/_nuxt/admin-ed6c4022.mjs"
  },
  "/_nuxt/admin.1ceb919f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6684-iLxwjoQWBn6NdGcMj480yUjpvyM\"",
    "mtime": "2022-05-25T07:23:31.968Z",
    "path": "../public/_nuxt/admin.1ceb919f.css"
  },
  "/_nuxt/asyncData-ab30f611.mjs": {
    "type": "application/javascript",
    "etag": "\"8c9-7Px3HymNJQJJ+6f0NGvqRPmf0Qo\"",
    "mtime": "2022-05-25T07:23:31.967Z",
    "path": "../public/_nuxt/asyncData-ab30f611.mjs"
  },
  "/_nuxt/calculate-active-index-130b59fd.mjs": {
    "type": "application/javascript",
    "etag": "\"335-M4Ep5FtT23eljsgA7eXLYV8lv1U\"",
    "mtime": "2022-05-25T07:23:31.967Z",
    "path": "../public/_nuxt/calculate-active-index-130b59fd.mjs"
  },
  "/_nuxt/contact-2d30c5c8.mjs": {
    "type": "application/javascript",
    "etag": "\"1051-eiynAwMz1XdBvd92KFUW5QNB89Y\"",
    "mtime": "2022-05-25T07:23:31.966Z",
    "path": "../public/_nuxt/contact-2d30c5c8.mjs"
  },
  "/_nuxt/default-30565eab.mjs": {
    "type": "application/javascript",
    "etag": "\"1aef-/AGjKoUj1WrqWrveZyWBlFlmnxc\"",
    "mtime": "2022-05-25T07:23:31.966Z",
    "path": "../public/_nuxt/default-30565eab.mjs"
  },
  "/_nuxt/default.c6aa8202.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"66ab-TkKiXN/yTK+BGNVzL7NcHTnjL8o\"",
    "mtime": "2022-05-25T07:23:31.966Z",
    "path": "../public/_nuxt/default.c6aa8202.css"
  },
  "/_nuxt/dialog-082ab9cf.mjs": {
    "type": "application/javascript",
    "etag": "\"2bae-sRsJ697IKgUdKk2QSQDM+i3LjuQ\"",
    "mtime": "2022-05-25T07:23:31.965Z",
    "path": "../public/_nuxt/dialog-082ab9cf.mjs"
  },
  "/_nuxt/entry-bbf0cde0.mjs": {
    "type": "application/javascript",
    "etag": "\"a7790-R5syjTMkb2VCoNLiMp+Hd5RAoLA\"",
    "mtime": "2022-05-25T07:23:31.964Z",
    "path": "../public/_nuxt/entry-bbf0cde0.mjs"
  },
  "/_nuxt/entry.bc86936c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"851c-6sjkCC5oP4yTdyId/ITd031HJMQ\"",
    "mtime": "2022-05-25T07:23:31.963Z",
    "path": "../public/_nuxt/entry.bc86936c.css"
  },
  "/_nuxt/index-286eb539.mjs": {
    "type": "application/javascript",
    "etag": "\"c01-lUdYXgpg4vCHz3vYf24J853poa0\"",
    "mtime": "2022-05-25T07:23:31.961Z",
    "path": "../public/_nuxt/index-286eb539.mjs"
  },
  "/_nuxt/index-3fd56f7b.mjs": {
    "type": "application/javascript",
    "etag": "\"819-NC/2TdrUJWgJVYd8on6toDWg+YA\"",
    "mtime": "2022-05-25T07:23:31.960Z",
    "path": "../public/_nuxt/index-3fd56f7b.mjs"
  },
  "/_nuxt/index-50c188f0.mjs": {
    "type": "application/javascript",
    "etag": "\"d0f-GPXSnXz3ZMwKdHwt8fiFMQpezrY\"",
    "mtime": "2022-05-25T07:23:31.960Z",
    "path": "../public/_nuxt/index-50c188f0.mjs"
  },
  "/_nuxt/index-77dec0a7.mjs": {
    "type": "application/javascript",
    "etag": "\"ced-rzGT7h/SsbwNwqh83jaiHwMniBM\"",
    "mtime": "2022-05-25T07:23:31.960Z",
    "path": "../public/_nuxt/index-77dec0a7.mjs"
  },
  "/_nuxt/index-7d88ef4f.mjs": {
    "type": "application/javascript",
    "etag": "\"792-W3MmHAfzymC4/1UauM0kFmNYFYM\"",
    "mtime": "2022-05-25T07:23:31.959Z",
    "path": "../public/_nuxt/index-7d88ef4f.mjs"
  },
  "/_nuxt/index-a2408624.mjs": {
    "type": "application/javascript",
    "etag": "\"cbf-7lltiwi7fkGXGHbxrA6lO2bXjN0\"",
    "mtime": "2022-05-25T07:23:31.959Z",
    "path": "../public/_nuxt/index-a2408624.mjs"
  },
  "/_nuxt/index-e6c44643.mjs": {
    "type": "application/javascript",
    "etag": "\"930-DDIdBdqso1s8kHhal8zW4aZUMnY\"",
    "mtime": "2022-05-25T07:23:31.959Z",
    "path": "../public/_nuxt/index-e6c44643.mjs"
  },
  "/_nuxt/index-ea08bc75.mjs": {
    "type": "application/javascript",
    "etag": "\"193-s3DEhhYllOc4IpJeMRbXssv8Ej0\"",
    "mtime": "2022-05-25T07:23:31.958Z",
    "path": "../public/_nuxt/index-ea08bc75.mjs"
  },
  "/_nuxt/is-admin-4f1a584c.mjs": {
    "type": "application/javascript",
    "etag": "\"82-ma79YrYfhLPu+1Grp27qPUz8Zvg\"",
    "mtime": "2022-05-25T07:23:31.958Z",
    "path": "../public/_nuxt/is-admin-4f1a584c.mjs"
  },
  "/_nuxt/login-266bef4f.mjs": {
    "type": "application/javascript",
    "etag": "\"ce9-/5fT0YWZvnuG8gz7N3goruIhRr8\"",
    "mtime": "2022-05-25T07:23:31.957Z",
    "path": "../public/_nuxt/login-266bef4f.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"3bb1-anIlDU0KUrcPmIAPdrmbOkhAXc4\"",
    "mtime": "2022-05-25T07:23:31.957Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/media-bcb4ecaa.mjs": {
    "type": "application/javascript",
    "etag": "\"255-ayyJnTi/EW8UNgzCxHQgHnAqZuk\"",
    "mtime": "2022-05-25T07:23:31.956Z",
    "path": "../public/_nuxt/media-bcb4ecaa.mjs"
  },
  "/_nuxt/mentions-legales-bdc506d5.mjs": {
    "type": "application/javascript",
    "etag": "\"5bc-XvCZLh/pnnjZRtok0kSI3cM2K14\"",
    "mtime": "2022-05-25T07:23:31.956Z",
    "path": "../public/_nuxt/mentions-legales-bdc506d5.mjs"
  },
  "/_nuxt/newsletter-8dc19302.mjs": {
    "type": "application/javascript",
    "etag": "\"54a-MW2JfBZYoby63fvQiRYJ5MKyJlI\"",
    "mtime": "2022-05-25T07:23:31.956Z",
    "path": "../public/_nuxt/newsletter-8dc19302.mjs"
  },
  "/_nuxt/nous-rejoindre-b5dde035.mjs": {
    "type": "application/javascript",
    "etag": "\"273f-/hwiHQPRZgAvXz/b4cjnrmcN19s\"",
    "mtime": "2022-05-25T07:23:31.955Z",
    "path": "../public/_nuxt/nous-rejoindre-b5dde035.mjs"
  },
  "/_nuxt/transition-b8498542.mjs": {
    "type": "application/javascript",
    "etag": "\"1c00-9biCfYg4K48+x2p46dqujVQIe0g\"",
    "mtime": "2022-05-25T07:23:31.955Z",
    "path": "../public/_nuxt/transition-b8498542.mjs"
  },
  "/_nuxt/use-outside-click-545a1624.mjs": {
    "type": "application/javascript",
    "etag": "\"1996-MzCkrsVdWeNsy3tXnmbPf6paQzU\"",
    "mtime": "2022-05-25T07:23:31.954Z",
    "path": "../public/_nuxt/use-outside-click-545a1624.mjs"
  },
  "/_nuxt/useDateHelper-c6a748de.mjs": {
    "type": "application/javascript",
    "etag": "\"88aa-hRwEh+Tq4zoxfvO73MXr7MDjz0o\"",
    "mtime": "2022-05-25T07:23:31.954Z",
    "path": "../public/_nuxt/useDateHelper-c6a748de.mjs"
  },
  "/_nuxt/useStringHelper-b0dd0f5e.mjs": {
    "type": "application/javascript",
    "etag": "\"6e-CNuUFbr2SegccFDH6tSLbFDCAvI\"",
    "mtime": "2022-05-25T07:23:31.953Z",
    "path": "../public/_nuxt/useStringHelper-b0dd0f5e.mjs"
  },
  "/files/questionnaire_transalpins_v1.pdf": {
    "type": "application/pdf",
    "etag": "\"10d73-UH8H3aqibf890qJvtuEXBj7O17U\"",
    "mtime": "2022-05-25T07:23:31.983Z",
    "path": "../public/files/questionnaire_transalpins_v1.pdf"
  },
  "/icons/remixicon.symbol.svg": {
    "type": "image/svg+xml",
    "etag": "\"db38b-RrC2wA7G8siCsKCvOFIoeK4Jk7g\"",
    "mtime": "2022-05-25T07:23:31.982Z",
    "path": "../public/icons/remixicon.symbol.svg"
  },
  "/images/vercors.jpg": {
    "type": "image/jpeg",
    "etag": "\"145b90-E6FmIM3F1w++JwhgRKS6rKTnLgI\"",
    "mtime": "2022-05-25T07:23:31.980Z",
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
