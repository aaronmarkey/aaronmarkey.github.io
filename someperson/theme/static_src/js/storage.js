export default class {
    setItem(key, value) {
        let item = value;
        if (value.constructor.name === "Object") {
            item = JSON.stringify(value);
        }
        localStorage.setItem(key, item);
    }

    getItem(key) {
        let item = localStorage.getItem(key);
        try {
            const value = JSON.parse(item);
            item = value;
        } catch(e) {
            // skip json parse issue, we'll return null.
        }
        return item || null;
    }
}
