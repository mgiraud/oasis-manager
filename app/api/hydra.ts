import get from 'lodash/get'
import has from 'lodash/has'
import mapValues from 'lodash/mapValues'

export interface HydraView {
  '@id': string;
  '@type': string;
  'hydra:first': string;
  'hydra:last': string;
  'hydra:next': string;
}

export interface HydraMapping {
  '@type': string;
  'variable': string;
  'property': string;
  'required': true
}

export interface HydraSearch {
  '@type': string;
  'hydra:template': string;
  'hydra:variableRepresentation': string;
  'hydra:mapping': HydraMapping[]
}

export interface HydraMemberObject {
  '@id': 'string';
  '@type': 'string';
}

export interface HydraObject extends HydraMemberObject {
  '@context': string;
}

export interface HydraGetAllResponse extends HydraObject {
  'hydra:member': HydraMemberObject[];
  'hydra:totalItems': number;
  'hydra:search': HydraSearch,
  'hydra:view': HydraView
}

export function normalize (data: any) {
  if (has(data, 'hydra:member')) {
    // Normalize items in collections
    data['hydra:member'] = (data['hydra:member'] as HydraMemberObject[]).map(item => normalize(item))

    return data
  }

  // Flatten nested documents
  return mapValues(data, (value: any) =>
    Array.isArray(value)
      ? value.map(v => get(v, '@id', v))
      : get(value, '@id', value)
  )
}
