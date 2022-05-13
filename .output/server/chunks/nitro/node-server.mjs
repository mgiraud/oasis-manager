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
  "/_nuxt/Carrousel-a539fecb.mjs": {
    "type": "application/javascript",
    "etag": "\"6e6-26l61bH8PoeE7svaOKTSimzgb+Q\"",
    "mtime": "2022-05-13T12:09:10.700Z",
    "path": "../public/_nuxt/Carrousel-a539fecb.mjs"
  },
  "/_nuxt/CheckboxField-d03e3edb.mjs": {
    "type": "application/javascript",
    "etag": "\"34d-e934DT+wlOYxf2NHny+uoj+WjF4\"",
    "mtime": "2022-05-13T12:09:10.699Z",
    "path": "../public/_nuxt/CheckboxField-d03e3edb.mjs"
  },
  "/_nuxt/ConfirmationDeleteModal-c456cfb9.mjs": {
    "type": "application/javascript",
    "etag": "\"6ac-/oIIBvX6ITm/e8y/PYHrRAsQJcU\"",
    "mtime": "2022-05-13T12:09:10.699Z",
    "path": "../public/_nuxt/ConfirmationDeleteModal-c456cfb9.mjs"
  },
  "/_nuxt/Editor-bac1da7c.mjs": {
    "type": "application/javascript",
    "etag": "\"a206-Kc9FTTyX6bKTcD/WAis5ThoBPBM\"",
    "mtime": "2022-05-13T12:09:10.699Z",
    "path": "../public/_nuxt/Editor-bac1da7c.mjs"
  },
  "/_nuxt/FileManager-1911a0cd.mjs": {
    "type": "application/javascript",
    "etag": "\"4385-q4+dAsB083KFf4tvZhueZ0dnG1Q\"",
    "mtime": "2022-05-13T12:09:10.698Z",
    "path": "../public/_nuxt/FileManager-1911a0cd.mjs"
  },
  "/_nuxt/FormComponent-2f0f58f8.mjs": {
    "type": "application/javascript",
    "etag": "\"1091-v7RsoN5hS4Sc4gxuzZuUZ+ZVNbY\"",
    "mtime": "2022-05-13T12:09:10.698Z",
    "path": "../public/_nuxt/FormComponent-2f0f58f8.mjs"
  },
  "/_nuxt/FormComponent-97a7514f.mjs": {
    "type": "application/javascript",
    "etag": "\"772-oikCrSkM13kxdG88GTLbqO+1TVc\"",
    "mtime": "2022-05-13T12:09:10.697Z",
    "path": "../public/_nuxt/FormComponent-97a7514f.mjs"
  },
  "/_nuxt/FormComponent-a5bf4060.mjs": {
    "type": "application/javascript",
    "etag": "\"17d0-HR1P8dDJLfT5QHAE87mS15TwHUc\"",
    "mtime": "2022-05-13T12:09:10.697Z",
    "path": "../public/_nuxt/FormComponent-a5bf4060.mjs"
  },
  "/_nuxt/Icon-fefadd4a.mjs": {
    "type": "application/javascript",
    "etag": "\"18d-nwpcQZsbYOpasfzPhXDkiC4VzGQ\"",
    "mtime": "2022-05-13T12:09:10.697Z",
    "path": "../public/_nuxt/Icon-fefadd4a.mjs"
  },
  "/_nuxt/Notification-ee092fa7.mjs": {
    "type": "application/javascript",
    "etag": "\"22cb-td22z/q3uzvU4hjOYKzRcxzHTxM\"",
    "mtime": "2022-05-13T12:09:10.696Z",
    "path": "../public/_nuxt/Notification-ee092fa7.mjs"
  },
  "/_nuxt/PageComponent-91c3b090.mjs": {
    "type": "application/javascript",
    "etag": "\"269-dJtXKMhO+FDG/kk18b5JjDtte+o\"",
    "mtime": "2022-05-13T12:09:10.696Z",
    "path": "../public/_nuxt/PageComponent-91c3b090.mjs"
  },
  "/_nuxt/PreviewImage-41681f28.mjs": {
    "type": "application/javascript",
    "etag": "\"320-jB8z0kNJgZIzJM4Eg+Sn50aja7c\"",
    "mtime": "2022-05-13T12:09:10.695Z",
    "path": "../public/_nuxt/PreviewImage-41681f28.mjs"
  },
  "/_nuxt/TextField-1d5b5a19.mjs": {
    "type": "application/javascript",
    "etag": "\"73e-0z3IUDRFIJIlSEHtpzIXdX3ZSmw\"",
    "mtime": "2022-05-13T12:09:10.695Z",
    "path": "../public/_nuxt/TextField-1d5b5a19.mjs"
  },
  "/_nuxt/Tooltip-52fdeb63.mjs": {
    "type": "application/javascript",
    "etag": "\"377-f49k9WT0pIBHDZoGZMrEbdhE9HE\"",
    "mtime": "2022-05-13T12:09:10.695Z",
    "path": "../public/_nuxt/Tooltip-52fdeb63.mjs"
  },
  "/_nuxt/_...slug_-11c5a3c5.mjs": {
    "type": "application/javascript",
    "etag": "\"3cd-v5UXsf/6tKAYKzw8/BKMD9kw/z0\"",
    "mtime": "2022-05-13T12:09:10.694Z",
    "path": "../public/_nuxt/_...slug_-11c5a3c5.mjs"
  },
  "/_nuxt/_id_-00c25b09.mjs": {
    "type": "application/javascript",
    "etag": "\"9a5-n903Ca4j13Wd9+llylQpBiaOpro\"",
    "mtime": "2022-05-13T12:09:10.694Z",
    "path": "../public/_nuxt/_id_-00c25b09.mjs"
  },
  "/_nuxt/_id_-505abc50.mjs": {
    "type": "application/javascript",
    "etag": "\"6de-Jb3IgPWE/mM4H1UPzu6jLE6mSAA\"",
    "mtime": "2022-05-13T12:09:10.694Z",
    "path": "../public/_nuxt/_id_-505abc50.mjs"
  },
  "/_nuxt/_id_-a10a473e.mjs": {
    "type": "application/javascript",
    "etag": "\"132f-sn5CD/tIgIXKBkVfu9o/gSjMono\"",
    "mtime": "2022-05-13T12:09:10.693Z",
    "path": "../public/_nuxt/_id_-a10a473e.mjs"
  },
  "/_nuxt/_id_-d2536f96.mjs": {
    "type": "application/javascript",
    "etag": "\"4cc-727TG4uMRJm9uksKh6t/t6ruHcg\"",
    "mtime": "2022-05-13T12:09:10.693Z",
    "path": "../public/_nuxt/_id_-d2536f96.mjs"
  },
  "/_nuxt/_slug_-2495f4a9.mjs": {
    "type": "application/javascript",
    "etag": "\"817-sxi+H/fTux2SNT7Fyc4NcOyh+Ig\"",
    "mtime": "2022-05-13T12:09:10.693Z",
    "path": "../public/_nuxt/_slug_-2495f4a9.mjs"
  },
  "/_nuxt/_slug_-4f316f46.mjs": {
    "type": "application/javascript",
    "etag": "\"5f6-tWTdamfca5WEdYkaQXch/ajHVsA\"",
    "mtime": "2022-05-13T12:09:10.692Z",
    "path": "../public/_nuxt/_slug_-4f316f46.mjs"
  },
  "/_nuxt/add-085dc4de.mjs": {
    "type": "application/javascript",
    "etag": "\"633-k7lHhFsHW5DC+Jqe1aHBF5bGK84\"",
    "mtime": "2022-05-13T12:09:10.692Z",
    "path": "../public/_nuxt/add-085dc4de.mjs"
  },
  "/_nuxt/add-7de46cdb.mjs": {
    "type": "application/javascript",
    "etag": "\"5a0-wz2ba1aVMc7jCCgrlb014DinJ6o\"",
    "mtime": "2022-05-13T12:09:10.692Z",
    "path": "../public/_nuxt/add-7de46cdb.mjs"
  },
  "/_nuxt/add-bb7c75fc.mjs": {
    "type": "application/javascript",
    "etag": "\"687-0ofGX3Xk/9QGl1Kgcf9gRZBRn5g\"",
    "mtime": "2022-05-13T12:09:10.691Z",
    "path": "../public/_nuxt/add-bb7c75fc.mjs"
  },
  "/_nuxt/admin-29479d11.mjs": {
    "type": "application/javascript",
    "etag": "\"e4d-ehFHH42dP5JzXSan140IqoH4NkA\"",
    "mtime": "2022-05-13T12:09:10.691Z",
    "path": "../public/_nuxt/admin-29479d11.mjs"
  },
  "/_nuxt/asyncData-43007f1d.mjs": {
    "type": "application/javascript",
    "etag": "\"8c9-WtnC2LpxThGqO5YFPKuVU/HM2FU\"",
    "mtime": "2022-05-13T12:09:10.691Z",
    "path": "../public/_nuxt/asyncData-43007f1d.mjs"
  },
  "/_nuxt/contact-c43a19bd.mjs": {
    "type": "application/javascript",
    "etag": "\"1c2c-P3nAOdl+/+PnSxZij65flQbjeX0\"",
    "mtime": "2022-05-13T12:09:10.690Z",
    "path": "../public/_nuxt/contact-c43a19bd.mjs"
  },
  "/_nuxt/default-519204ca.mjs": {
    "type": "application/javascript",
    "etag": "\"1d53-Ij13nt8xOb92n1eRZHRl/JlvzJg\"",
    "mtime": "2022-05-13T12:09:10.690Z",
    "path": "../public/_nuxt/default-519204ca.mjs"
  },
  "/_nuxt/default.a00e5f3c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6416-6OwFqQDUnmpIKd3xNiv7Vd3JvBA\"",
    "mtime": "2022-05-13T12:09:10.689Z",
    "path": "../public/_nuxt/default.a00e5f3c.css"
  },
  "/_nuxt/dialog-f5e7a3df.mjs": {
    "type": "application/javascript",
    "etag": "\"2bb3-RhXpPozvW6dWh9YzJZ8073WFcOI\"",
    "mtime": "2022-05-13T12:09:10.689Z",
    "path": "../public/_nuxt/dialog-f5e7a3df.mjs"
  },
  "/_nuxt/entry-87b30bf9.mjs": {
    "type": "application/javascript",
    "etag": "\"a7557-GQ3oNbdCt1yDKj0ODwMYV4JLXdI\"",
    "mtime": "2022-05-13T12:09:10.689Z",
    "path": "../public/_nuxt/entry-87b30bf9.mjs"
  },
  "/_nuxt/entry.8d316285.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"82ae-mJ0QrLJ4JGv6S0Yi/DfGZxCONYE\"",
    "mtime": "2022-05-13T12:09:10.687Z",
    "path": "../public/_nuxt/entry.8d316285.css"
  },
  "/_nuxt/index-5733b39c.mjs": {
    "type": "application/javascript",
    "etag": "\"ab3-KibUezRH7Jp9+Zrh4uAQ9rb5WL4\"",
    "mtime": "2022-05-13T12:09:10.685Z",
    "path": "../public/_nuxt/index-5733b39c.mjs"
  },
  "/_nuxt/index-69f70783.mjs": {
    "type": "application/javascript",
    "etag": "\"a74-VTG+E02Hv1tlEFNRgJU/4w3tv94\"",
    "mtime": "2022-05-13T12:09:10.685Z",
    "path": "../public/_nuxt/index-69f70783.mjs"
  },
  "/_nuxt/index-79284dbf.mjs": {
    "type": "application/javascript",
    "etag": "\"a9c-aWxI4rJQ4aO4JuyvCveZcvEtEAY\"",
    "mtime": "2022-05-13T12:09:10.684Z",
    "path": "../public/_nuxt/index-79284dbf.mjs"
  },
  "/_nuxt/index-98594ff0.mjs": {
    "type": "application/javascript",
    "etag": "\"793-Aa3aqwaDTZUN9IdofRLSts1Xu0Y\"",
    "mtime": "2022-05-13T12:09:10.684Z",
    "path": "../public/_nuxt/index-98594ff0.mjs"
  },
  "/_nuxt/index-a8e75fb5.mjs": {
    "type": "application/javascript",
    "etag": "\"d05-5UOUzJU+vUNMZGbk6i/wA+l1+Vg\"",
    "mtime": "2022-05-13T12:09:10.684Z",
    "path": "../public/_nuxt/index-a8e75fb5.mjs"
  },
  "/_nuxt/index-b6a81593.mjs": {
    "type": "application/javascript",
    "etag": "\"82e-9CsA4fAOyYm7XsCzrrsr0/NV3Pw\"",
    "mtime": "2022-05-13T12:09:10.683Z",
    "path": "../public/_nuxt/index-b6a81593.mjs"
  },
  "/_nuxt/index-d8576f6f.mjs": {
    "type": "application/javascript",
    "etag": "\"193-WSTyjd1PfhUEDtJZhtTc6DqN5jU\"",
    "mtime": "2022-05-13T12:09:10.683Z",
    "path": "../public/_nuxt/index-d8576f6f.mjs"
  },
  "/_nuxt/index-e1905ec1.mjs": {
    "type": "application/javascript",
    "etag": "\"7a2-QT8IcJInxf2I+18rKqabc8S9PgE\"",
    "mtime": "2022-05-13T12:09:10.682Z",
    "path": "../public/_nuxt/index-e1905ec1.mjs"
  },
  "/_nuxt/is-admin-7693058f.mjs": {
    "type": "application/javascript",
    "etag": "\"82-nTqN4yqhk5G4iwYD6Jk2bWC9VTE\"",
    "mtime": "2022-05-13T12:09:10.682Z",
    "path": "../public/_nuxt/is-admin-7693058f.mjs"
  },
  "/_nuxt/login-25614101.mjs": {
    "type": "application/javascript",
    "etag": "\"cda-nz1YmL+7J8XOMJqWdq4iOYbCZjM\"",
    "mtime": "2022-05-13T12:09:10.682Z",
    "path": "../public/_nuxt/login-25614101.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"3dbf-tIz2LCbF4dkBHJZGNc19GmCG3L8\"",
    "mtime": "2022-05-13T12:09:10.681Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/media-322a141c.mjs": {
    "type": "application/javascript",
    "etag": "\"274-AvN22Xeg0t00ocKCKqWiuA3OEQI\"",
    "mtime": "2022-05-13T12:09:10.681Z",
    "path": "../public/_nuxt/media-322a141c.mjs"
  },
  "/_nuxt/mentions-legales-15a78c29.mjs": {
    "type": "application/javascript",
    "etag": "\"5bf-19YP7/I8tR4DZEA+pPoSXUCp1Vc\"",
    "mtime": "2022-05-13T12:09:10.680Z",
    "path": "../public/_nuxt/mentions-legales-15a78c29.mjs"
  },
  "/_nuxt/newsletter-124f2893.mjs": {
    "type": "application/javascript",
    "etag": "\"55f-YEAsBKSBGAWeTz3gtIziG3ggnCw\"",
    "mtime": "2022-05-13T12:09:10.680Z",
    "path": "../public/_nuxt/newsletter-124f2893.mjs"
  },
  "/_nuxt/nous-rejoindre-7f5524b0.mjs": {
    "type": "application/javascript",
    "etag": "\"27c8-ExZg+X5f7YdHkWnhsYoWrkGtSes\"",
    "mtime": "2022-05-13T12:09:10.679Z",
    "path": "../public/_nuxt/nous-rejoindre-7f5524b0.mjs"
  },
  "/_nuxt/transition-3b170868.mjs": {
    "type": "application/javascript",
    "etag": "\"1a99-5QkQ00+H/C01koaO3nXhwW+eByQ\"",
    "mtime": "2022-05-13T12:09:10.678Z",
    "path": "../public/_nuxt/transition-3b170868.mjs"
  },
  "/_nuxt/use-outside-click-8678eb71.mjs": {
    "type": "application/javascript",
    "etag": "\"1996-NEoMKBYcwcW1vUrP0G/UoP8Dp3g\"",
    "mtime": "2022-05-13T12:09:10.678Z",
    "path": "../public/_nuxt/use-outside-click-8678eb71.mjs"
  },
  "/_nuxt/use-resolve-button-type-a71a440e.mjs": {
    "type": "application/javascript",
    "etag": "\"50d-VHwNKLZw7G/nL7rMqv7DomkUgr4\"",
    "mtime": "2022-05-13T12:09:10.677Z",
    "path": "../public/_nuxt/use-resolve-button-type-a71a440e.mjs"
  },
  "/_nuxt/useDateHelper-e4869b7b.mjs": {
    "type": "application/javascript",
    "etag": "\"88aa-fYk7/OU2r2T3TPLY0AnQkZC3PPQ\"",
    "mtime": "2022-05-13T12:09:10.676Z",
    "path": "../public/_nuxt/useDateHelper-e4869b7b.mjs"
  },
  "/_nuxt/useStringHelper-b0dd0f5e.mjs": {
    "type": "application/javascript",
    "etag": "\"6e-CNuUFbr2SegccFDH6tSLbFDCAvI\"",
    "mtime": "2022-05-13T12:09:10.675Z",
    "path": "../public/_nuxt/useStringHelper-b0dd0f5e.mjs"
  },
  "/files/questionnaire_transalpins_v1.pdf": {
    "type": "application/pdf",
    "etag": "\"10d73-UH8H3aqibf890qJvtuEXBj7O17U\"",
    "mtime": "2022-05-13T12:09:10.707Z",
    "path": "../public/files/questionnaire_transalpins_v1.pdf"
  },
  "/icons/remixicon.symbol.svg": {
    "type": "image/svg+xml",
    "etag": "\"db38b-RrC2wA7G8siCsKCvOFIoeK4Jk7g\"",
    "mtime": "2022-05-13T12:09:10.706Z",
    "path": "../public/icons/remixicon.symbol.svg"
  },
  "/images/vercors.jpg": {
    "type": "image/jpeg",
    "etag": "\"145b90-E6FmIM3F1w++JwhgRKS6rKTnLgI\"",
    "mtime": "2022-05-13T12:09:10.703Z",
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
