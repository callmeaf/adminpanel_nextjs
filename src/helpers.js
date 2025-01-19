import dataHandler from "./utils/data-handler";

export const actionState = (inputs) => {
  return {
    inputs,
  };
};

export const callIfFunction = (func, defaultValue) => {
  const { isFunction } = typeOf(func);

  if (isFunction) {
    func = func();
  }

  return func ?? defaultValue;
};

export const typeOf = (value) => {
  return {
    isFunction: typeof value === "function" || value instanceof Function,
    isString: typeof value === "string" || value instanceof String,
    isArray: Array.isArray(value) || value instanceof Array,
    isObject:
      typeof value === "object" && !Array.isArray(value) && value !== null,
  };
};

export function jsonArtisan() {
  const isJson = (value) => {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }

    return true;
  };

  const toJson = (value) => {
    if (!isJson(value)) {
      value = JSON.stringify(value);
    }
    return value;
  };

  const parseJson = (value) => {
    if (isJson(value)) {
      value = JSON.parse(value);
    }
    return value;
  };
  return {
    isJson,
    toJson,
    parseJson,
  };
}

export function localStorageArtisan() {
  const { parseJson, toJson } = jsonArtisan();

  const get = (key, defaultValue) => {
    let value = localStorage.getItem(key) ?? defaultValue;
    return parseJson(value);
  };

  const has = (key) => !!get(key);

  const set = (key, value) => {
    const { isObject, isArray } = typeOf(value);
    if (isObject || isArray) {
      value = toJson(value);
    }
    localStorage.setItem(key, value);
  };

  const replace = (
    key,
    value,
    options = {
      deleteEmptyValues: false,
    }
  ) => {
    let oldValue = get(key) ?? {};
    const { isObject, isArray } = typeOf(oldValue);

    if (isObject || isArray) {
      oldValue = parseJson(oldValue);
    }

    value = {
      ...oldValue,
      ...value,
    };

    if (options.deleteEmptyValues) {
      const { removeEmptyValues } = dataHandler(value);
      removeEmptyValues();
    }

    set(key, toJson(value));
  };

  return {
    get,
    has,
    set,
    replace,
  };
}
