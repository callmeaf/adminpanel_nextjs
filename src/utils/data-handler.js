import { arrayArtisan } from "@/helpers";

const dataHandler = (data = {}) => {
  const isFormData = data instanceof FormData;

  const get = (key, defaultValue, { getAsAll = false } = {}) => {
    if (isFormData) {
      if (data.has(key)) {
        return getAsAll ? data.getAll(key) : data.get(key);
      } else {
        return defaultValue ?? "";
      }
    } else {
      return data[key] ?? defaultValue;
    }
  };

  const getAll = (key, defaultValue) =>
    get(key, defaultValue, {
      getAsAll: true,
    });

  const set = (key, value) => {
    if (isFormData) {
      data.append(key, value);
    } else {
      data[key] = value;
    }
  };

  const keyReplacesHandler = (key, replaces = {}) => {
    for (const [keyReplace, valueReplace] of Object.entries(replaces)) {
      key = key.replaceAll(keyReplace, valueReplace);
    }

    return key;
  };

  const getAllAsObject = (keys = [], { keyReplaces = {} } = {}) => {
    const updatedData = {};
    const { unique } = arrayArtisan();
    if (isFormData) {
      for (let [key, value] of data) {
        if (
          keys.length !== 0 &&
          !keys.includes(keyReplacesHandler(key, keyReplaces))
        ) {
          continue;
        }
        if (key.includes("[]")) {
          key = keyReplacesHandler(key, keyReplaces);
          const oldValueUpdatedData = updatedData[key] ?? [];
          updatedData[key] = unique([...oldValueUpdatedData, value]);
        } else {
          updatedData[key] = value;
        }
      }
    } else {
      for (let [key, value] of Object.entries(data)) {
        key = keyReplacesHandler(key, keyReplaces);
        if (
          keys.length !== 0 &&
          !keys.includes(keyReplacesHandler(key, keyReplaces))
        ) {
          continue;
        }
        if (key.includes("[]")) {
          key = keyReplacesHandler(key, keyReplaces);
          const oldValueUpdatedData = updatedData[key] ?? [];
          updatedData[key] = unique([...oldValueUpdatedData, value]);
        } else {
          updatedData[key] = value;
        }
      }
    }

    return updatedData;
  };

  const remove = (key) => {
    if (isFormData) {
      data.delete(key);
    } else {
      delete data[key];
    }
  };

  const removeEmptyValues = (keys = []) => {
    if (isFormData) {
      for (const [key, value] of data) {
        if (keys.length !== 0 && !keys.includes(key)) {
          continue;
        }

        if (!!value) {
          continue;
        }
        remove(key);
      }
    } else {
      for (const [key, value] of Object.entries(data)) {
        if (keys.length !== 0 && !keys.includes(key)) {
          continue;
        }
        if (!!value) {
          continue;
        }
        remove(key);
      }
    }
  };

  const reset = (key) => {
    if (isFormData) {
      if (data.has(key)) {
        data.set(key, "");
      }
    } else {
      if (data.hasOwnProperty(key)) {
        data[key] = undefined;
      }
    }
  };

  const resetAll = (keys = []) => {
    if (isFormData) {
      for (const [key] of data) {
        if (keys.length !== 0 && !keys.includes(key)) {
          continue;
        }
        reset(key);
      }
    } else {
      for (const [key] of Object.entries(data)) {
        if (keys.length !== 0 && !keys.includes(key)) {
          continue;
        }
        reset(key);
      }
    }
  };

  return {
    get,
    set,
    remove,
    reset,
    getAllAsObject,
    removeEmptyValues,
    resetAll,
    getAll,
  };
};

export default dataHandler;
