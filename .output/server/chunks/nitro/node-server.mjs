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
  "/_nuxt/Carrousel-2ee8eb9f.mjs": {
    "type": "application/javascript",
    "etag": "\"6e7-n9WcLEvvlL6mG+I74vk6knqF1Kg\"",
    "mtime": "2022-05-18T18:28:57.226Z",
    "path": "../public/_nuxt/Carrousel-2ee8eb9f.mjs"
  },
  "/_nuxt/CheckboxField-48f65d1d.mjs": {
    "type": "application/javascript",
    "etag": "\"34f-IcanByqiRvTmrGmFb5bgc2O8b44\"",
    "mtime": "2022-05-18T18:28:57.225Z",
    "path": "../public/_nuxt/CheckboxField-48f65d1d.mjs"
  },
  "/_nuxt/ConfirmationDeleteModal-9c978881.mjs": {
    "type": "application/javascript",
    "etag": "\"6ac-xM5mnxpnFKzph+CZhPF1oTkSp0g\"",
    "mtime": "2022-05-18T18:28:57.225Z",
    "path": "../public/_nuxt/ConfirmationDeleteModal-9c978881.mjs"
  },
  "/_nuxt/Editor-dc6b4d69.mjs": {
    "type": "application/javascript",
    "etag": "\"8427-c8MTcO3Ah/delkraxGehiK4oOLk\"",
    "mtime": "2022-05-18T18:28:57.225Z",
    "path": "../public/_nuxt/Editor-dc6b4d69.mjs"
  },
  "/_nuxt/FileManager-1a196688.mjs": {
    "type": "application/javascript",
    "etag": "\"6e18-fjgBbxuwz/zcxOy9/S1oS8S/Wfs\"",
    "mtime": "2022-05-18T18:28:57.224Z",
    "path": "../public/_nuxt/FileManager-1a196688.mjs"
  },
  "/_nuxt/FormComponent-7fed1271.mjs": {
    "type": "application/javascript",
    "etag": "\"772-yFKKHK2WlADVYrb+jOugQoPT6/Q\"",
    "mtime": "2022-05-18T18:28:57.224Z",
    "path": "../public/_nuxt/FormComponent-7fed1271.mjs"
  },
  "/_nuxt/FormComponent-d84c08c8.mjs": {
    "type": "application/javascript",
    "etag": "\"1098-Mf2IwDvasVrVxhKkMnhVUPaJCxQ\"",
    "mtime": "2022-05-18T18:28:57.223Z",
    "path": "../public/_nuxt/FormComponent-d84c08c8.mjs"
  },
  "/_nuxt/FormComponent-db62320b.mjs": {
    "type": "application/javascript",
    "etag": "\"17f4-n0S2oGWW4uHTRT0tcRQ8/wg/qnY\"",
    "mtime": "2022-05-18T18:28:57.223Z",
    "path": "../public/_nuxt/FormComponent-db62320b.mjs"
  },
  "/_nuxt/Icon-f078fbba.mjs": {
    "type": "application/javascript",
    "etag": "\"18d-Bav1OV6q+DriDrf/ofYWFqElinw\"",
    "mtime": "2022-05-18T18:28:57.223Z",
    "path": "../public/_nuxt/Icon-f078fbba.mjs"
  },
  "/_nuxt/Notification-d1927b21.mjs": {
    "type": "application/javascript",
    "etag": "\"22ca-Y5qkOyP59sRYnciPP9wVubwxO2I\"",
    "mtime": "2022-05-18T18:28:57.222Z",
    "path": "../public/_nuxt/Notification-d1927b21.mjs"
  },
  "/_nuxt/PageComponent-a5cb3baf.mjs": {
    "type": "application/javascript",
    "etag": "\"269-+jddz76n31pucFCb+Ws+xIU86CU\"",
    "mtime": "2022-05-18T18:28:57.222Z",
    "path": "../public/_nuxt/PageComponent-a5cb3baf.mjs"
  },
  "/_nuxt/PreviewImage-344dccae.mjs": {
    "type": "application/javascript",
    "etag": "\"34e-ACZFCRJpSaSlKt7wv+J3asmCtIE\"",
    "mtime": "2022-05-18T18:28:57.222Z",
    "path": "../public/_nuxt/PreviewImage-344dccae.mjs"
  },
  "/_nuxt/TextField-5fde64fb.mjs": {
    "type": "application/javascript",
    "etag": "\"a92-htfB/xzQJxAPKQyFG7stWgehcts\"",
    "mtime": "2022-05-18T18:28:57.221Z",
    "path": "../public/_nuxt/TextField-5fde64fb.mjs"
  },
  "/_nuxt/_...slug_-0e9a7a2b.mjs": {
    "type": "application/javascript",
    "etag": "\"3cd-eVrjOcVThAa/Xjoyxx2FAYZUUVY\"",
    "mtime": "2022-05-18T18:28:57.221Z",
    "path": "../public/_nuxt/_...slug_-0e9a7a2b.mjs"
  },
  "/_nuxt/_id_-11742880.mjs": {
    "type": "application/javascript",
    "etag": "\"4cc-tkSOaFSQzXgbxmBpRWp+70hRJro\"",
    "mtime": "2022-05-18T18:28:57.221Z",
    "path": "../public/_nuxt/_id_-11742880.mjs"
  },
  "/_nuxt/_id_-58069194.mjs": {
    "type": "application/javascript",
    "etag": "\"12db-DDYDZtcTx5DpLk+ev60hqf4UprU\"",
    "mtime": "2022-05-18T18:28:57.220Z",
    "path": "../public/_nuxt/_id_-58069194.mjs"
  },
  "/_nuxt/_id_-98d030a7.mjs": {
    "type": "application/javascript",
    "etag": "\"9a5-1MX+HN1PQL4IN66qm45XF/4UaF0\"",
    "mtime": "2022-05-18T18:28:57.220Z",
    "path": "../public/_nuxt/_id_-98d030a7.mjs"
  },
  "/_nuxt/_id_-a24517dc.mjs": {
    "type": "application/javascript",
    "etag": "\"6be-8PPwER2uEFOOi6Z/eiV9iV3t6Yk\"",
    "mtime": "2022-05-18T18:28:57.220Z",
    "path": "../public/_nuxt/_id_-a24517dc.mjs"
  },
  "/_nuxt/_slug_-c45cb140.mjs": {
    "type": "application/javascript",
    "etag": "\"7f5-g82R1KmKD6wBofVVBe/jnLbIzmg\"",
    "mtime": "2022-05-18T18:28:57.220Z",
    "path": "../public/_nuxt/_slug_-c45cb140.mjs"
  },
  "/_nuxt/_slug_-f2741672.mjs": {
    "type": "application/javascript",
    "etag": "\"5d7-q8rq7oCcsgmN9yfll6SVMUl7ZEw\"",
    "mtime": "2022-05-18T18:28:57.219Z",
    "path": "../public/_nuxt/_slug_-f2741672.mjs"
  },
  "/_nuxt/add-45d82466.mjs": {
    "type": "application/javascript",
    "etag": "\"581-wfw0PXNoGYYLbfFQCz9xJZ9stbQ\"",
    "mtime": "2022-05-18T18:28:57.219Z",
    "path": "../public/_nuxt/add-45d82466.mjs"
  },
  "/_nuxt/add-814dc52b.mjs": {
    "type": "application/javascript",
    "etag": "\"667-yTmab6JzBNFg3/8JKeWSK9zELyM\"",
    "mtime": "2022-05-18T18:28:57.218Z",
    "path": "../public/_nuxt/add-814dc52b.mjs"
  },
  "/_nuxt/add-e502690f.mjs": {
    "type": "application/javascript",
    "etag": "\"613-tVWeJboihi6icGmpRD0gipjDZxw\"",
    "mtime": "2022-05-18T18:28:57.218Z",
    "path": "../public/_nuxt/add-e502690f.mjs"
  },
  "/_nuxt/admin-06886841.mjs": {
    "type": "application/javascript",
    "etag": "\"e55-4m7bwRrp8xkIg+SD7ieFYKqPBN0\"",
    "mtime": "2022-05-18T18:28:57.218Z",
    "path": "../public/_nuxt/admin-06886841.mjs"
  },
  "/_nuxt/admin.10864a00.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6595-MLw6tHevlJfEaKyQ++W8sDzBCjg\"",
    "mtime": "2022-05-18T18:28:57.217Z",
    "path": "../public/_nuxt/admin.10864a00.css"
  },
  "/_nuxt/asyncData-bc25d67a.mjs": {
    "type": "application/javascript",
    "etag": "\"8c9-dCscQt2m5NcfpR1STd/8tj6h3Wo\"",
    "mtime": "2022-05-18T18:28:57.217Z",
    "path": "../public/_nuxt/asyncData-bc25d67a.mjs"
  },
  "/_nuxt/calculate-active-index-130b59fd.mjs": {
    "type": "application/javascript",
    "etag": "\"335-M4Ep5FtT23eljsgA7eXLYV8lv1U\"",
    "mtime": "2022-05-18T18:28:57.217Z",
    "path": "../public/_nuxt/calculate-active-index-130b59fd.mjs"
  },
  "/_nuxt/contact-f2ea50df.mjs": {
    "type": "application/javascript",
    "etag": "\"1051-lmttBx58dBZDj7SRQaFLNFM5pL8\"",
    "mtime": "2022-05-18T18:28:57.216Z",
    "path": "../public/_nuxt/contact-f2ea50df.mjs"
  },
  "/_nuxt/default-5cc55822.mjs": {
    "type": "application/javascript",
    "etag": "\"1aef-0wpsZJNcCvYPhUN8G7G00bycROE\"",
    "mtime": "2022-05-18T18:28:57.216Z",
    "path": "../public/_nuxt/default-5cc55822.mjs"
  },
  "/_nuxt/default.84a120f6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"65be-Xjv7LvoWbUed04htrVZVptgtviw\"",
    "mtime": "2022-05-18T18:28:57.215Z",
    "path": "../public/_nuxt/default.84a120f6.css"
  },
  "/_nuxt/dialog-f417b9ae.mjs": {
    "type": "application/javascript",
    "etag": "\"2bae-JqN3jaEZ53On+L2HR1nVYrNoyrY\"",
    "mtime": "2022-05-18T18:28:57.215Z",
    "path": "../public/_nuxt/dialog-f417b9ae.mjs"
  },
  "/_nuxt/entry-2e347780.mjs": {
    "type": "application/javascript",
    "etag": "\"a752f-J2s3emD6cDuUxUdmvbsmbnEQ0x0\"",
    "mtime": "2022-05-18T18:28:57.214Z",
    "path": "../public/_nuxt/entry-2e347780.mjs"
  },
  "/_nuxt/entry.2f90ff7f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"842d-Y/GyHtA96Wp0HTz7lsSru3j6m8I\"",
    "mtime": "2022-05-18T18:28:57.213Z",
    "path": "../public/_nuxt/entry.2f90ff7f.css"
  },
  "/_nuxt/index-27359ece.mjs": {
    "type": "application/javascript",
    "etag": "\"930-E+U6qDdZxRf8x6RoYEx8/KrzO4k\"",
    "mtime": "2022-05-18T18:28:57.211Z",
    "path": "../public/_nuxt/index-27359ece.mjs"
  },
  "/_nuxt/index-2f619b0d.mjs": {
    "type": "application/javascript",
    "etag": "\"cbf-6gMF7Blu/9H7tsOGzwpnGsNuEYg\"",
    "mtime": "2022-05-18T18:28:57.211Z",
    "path": "../public/_nuxt/index-2f619b0d.mjs"
  },
  "/_nuxt/index-3878b25f.mjs": {
    "type": "application/javascript",
    "etag": "\"193-lfIALidJaz7okOXMbP4htQbHq7M\"",
    "mtime": "2022-05-18T18:28:57.211Z",
    "path": "../public/_nuxt/index-3878b25f.mjs"
  },
  "/_nuxt/index-58805160.mjs": {
    "type": "application/javascript",
    "etag": "\"ced-MirZfCzSdr2Kd1o/HNdSNNUFgfc\"",
    "mtime": "2022-05-18T18:28:57.210Z",
    "path": "../public/_nuxt/index-58805160.mjs"
  },
  "/_nuxt/index-64fdaf94.mjs": {
    "type": "application/javascript",
    "etag": "\"c01-17e9xftm0v5libL2qU1vSFlH2v4\"",
    "mtime": "2022-05-18T18:28:57.210Z",
    "path": "../public/_nuxt/index-64fdaf94.mjs"
  },
  "/_nuxt/index-a8d6dbf6.mjs": {
    "type": "application/javascript",
    "etag": "\"819-2bWzHJPbtxB4JS2scbPqZPQlNxU\"",
    "mtime": "2022-05-18T18:28:57.209Z",
    "path": "../public/_nuxt/index-a8d6dbf6.mjs"
  },
  "/_nuxt/index-eafd1c95.mjs": {
    "type": "application/javascript",
    "etag": "\"792-U0vTblS83IV009ULxQ2dVUnjZ+A\"",
    "mtime": "2022-05-18T18:28:57.209Z",
    "path": "../public/_nuxt/index-eafd1c95.mjs"
  },
  "/_nuxt/index-edc064b0.mjs": {
    "type": "application/javascript",
    "etag": "\"d0f-WVVQSuzWGuq8xXHBAWSqorg3dog\"",
    "mtime": "2022-05-18T18:28:57.209Z",
    "path": "../public/_nuxt/index-edc064b0.mjs"
  },
  "/_nuxt/is-admin-7aeaca68.mjs": {
    "type": "application/javascript",
    "etag": "\"82-OwuQBoyjmRBVSIQgXmRsDR0Bjg0\"",
    "mtime": "2022-05-18T18:28:57.209Z",
    "path": "../public/_nuxt/is-admin-7aeaca68.mjs"
  },
  "/_nuxt/login-050bdb1b.mjs": {
    "type": "application/javascript",
    "etag": "\"ce9-JLM4qaQAk+LXw1zdr7U8eB1Afqw\"",
    "mtime": "2022-05-18T18:28:57.208Z",
    "path": "../public/_nuxt/login-050bdb1b.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"3bb1-ZTeNUmkJObwgd2Nqpc9YxuhAZyQ\"",
    "mtime": "2022-05-18T18:28:57.208Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/media-4db781a0.mjs": {
    "type": "application/javascript",
    "etag": "\"255-7EZ46hr2FtQD/yhxZ/TRorn5tjA\"",
    "mtime": "2022-05-18T18:28:57.207Z",
    "path": "../public/_nuxt/media-4db781a0.mjs"
  },
  "/_nuxt/mentions-legales-7f0e0afb.mjs": {
    "type": "application/javascript",
    "etag": "\"5bc-fGZ1HND7iLTkMp/V+Y9nkVwTE2E\"",
    "mtime": "2022-05-18T18:28:57.207Z",
    "path": "../public/_nuxt/mentions-legales-7f0e0afb.mjs"
  },
  "/_nuxt/newsletter-7bce47b8.mjs": {
    "type": "application/javascript",
    "etag": "\"54a-VEPk4Ys+Sq5O0yfyTLYP7CvJsJ4\"",
    "mtime": "2022-05-18T18:28:57.207Z",
    "path": "../public/_nuxt/newsletter-7bce47b8.mjs"
  },
  "/_nuxt/nous-rejoindre-eb8bca83.mjs": {
    "type": "application/javascript",
    "etag": "\"273f-pfS+PlFNorBftyj9PpaYf619Oro\"",
    "mtime": "2022-05-18T18:28:57.206Z",
    "path": "../public/_nuxt/nous-rejoindre-eb8bca83.mjs"
  },
  "/_nuxt/transition-2ed963cb.mjs": {
    "type": "application/javascript",
    "etag": "\"1c00-Ymwqm1BH1m6NhrQX6vXpB21SzXQ\"",
    "mtime": "2022-05-18T18:28:57.205Z",
    "path": "../public/_nuxt/transition-2ed963cb.mjs"
  },
  "/_nuxt/use-outside-click-ea4f1ee7.mjs": {
    "type": "application/javascript",
    "etag": "\"1996-S2MAWuK3YzZLcdiYTpSQIg2Nv2k\"",
    "mtime": "2022-05-18T18:28:57.205Z",
    "path": "../public/_nuxt/use-outside-click-ea4f1ee7.mjs"
  },
  "/_nuxt/useDateHelper-e4869b7b.mjs": {
    "type": "application/javascript",
    "etag": "\"88aa-fYk7/OU2r2T3TPLY0AnQkZC3PPQ\"",
    "mtime": "2022-05-18T18:28:57.204Z",
    "path": "../public/_nuxt/useDateHelper-e4869b7b.mjs"
  },
  "/_nuxt/useStringHelper-b0dd0f5e.mjs": {
    "type": "application/javascript",
    "etag": "\"6e-CNuUFbr2SegccFDH6tSLbFDCAvI\"",
    "mtime": "2022-05-18T18:28:57.204Z",
    "path": "../public/_nuxt/useStringHelper-b0dd0f5e.mjs"
  },
  "/files/questionnaire_transalpins_v1.pdf": {
    "type": "application/pdf",
    "etag": "\"10d73-UH8H3aqibf890qJvtuEXBj7O17U\"",
    "mtime": "2022-05-18T18:28:57.232Z",
    "path": "../public/files/questionnaire_transalpins_v1.pdf"
  },
  "/icons/remixicon.symbol.svg": {
    "type": "image/svg+xml",
    "etag": "\"db38b-RrC2wA7G8siCsKCvOFIoeK4Jk7g\"",
    "mtime": "2022-05-18T18:28:57.231Z",
    "path": "../public/icons/remixicon.symbol.svg"
  },
  "/images/vercors.jpg": {
    "type": "image/jpeg",
    "etag": "\"145b90-E6FmIM3F1w++JwhgRKS6rKTnLgI\"",
    "mtime": "2022-05-18T18:28:57.229Z",
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
