const dataHandler = (data = {}) => {
  const isFormData = data instanceof FormData;

  const get = (key, defaultValue) => {
    if (isFormData) {
      if (data.has(key)) {
        return data.get(key);
      } else {
        return defaultValue;
      }
    } else {
      return data[key] ?? defaultValue;
    }
  };

  const set = (key, value) => {
    if (isFormData) {
      data.append(key, value);
    } else {
      data[key] = value;
    }
  };

  const getAllAsObject = (keys = []) => {
    const updatedData = {};

    if (isFormData) {
      for (const [key, value] of data) {
        if (keys.length !== 0 && !keys.includes(key)) {
          continue;
        }
        updatedData[key] = value;
      }
    } else {
      for (const [key, value] of Object.entries(data)) {
        if (keys.length !== 0 && !keys.includes(key)) {
          continue;
        }
        updatedData[key] = value;
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

  return {
    get,
    set,
    remove,
    getAllAsObject,
    removeEmptyValues,
  };
};

export default dataHandler;
