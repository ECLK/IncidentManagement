/**
 * Local Storage helper functions
 */
/**
 * Write into Local Storage as key value pairs
 *
 * @param {String} key Local storage key
 * @param {Any} value Value to be saved in localstorage
 */
const write = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
};

/**
 * Get stored values by key
 *
 * @param {String} key Local storage stored key
 */
const read = (key) => {
    const item = localStorage.getItem(key);

    if (item == null) {
        return null;
    }

    return JSON.parse(item);
};

/**
 * Remove a record from local storage
 *
 * @param {String} key Local storage stored key
 */
const remove = (key) => {
    localStorage.removeItem(key);
    return true;
};

/**
 * Store many objects once into local storage
 *
 * @param {Object} data Data object to write to local storage
 */
const writeMany = (data) => {
    for (var propName in data) {
        if (data.hasOwnProperty(propName)) {
            write(propName, data[propName]);
        }
    }
};

/**
 * Retrieve bulk data from local storage
 *
 * @param {Array} keys List of keys
 */
const readMany = (keys) => {
    let readData = {};

    keys.forEach(key => {
        readData[key] = read(key);
    });

    return readData;
};

export { write, writeMany, read, readMany, remove };