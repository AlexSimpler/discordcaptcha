const fs = require('fs');
module.exports = {
    getEnv(envfile, envPath, call) {
        let content = envfile.parseFileSync(envPath, (err, obj) => {
            console.log("IM here");
            if (err) throw new Error(err);
            return obj;
        });
        return call(content);
    },
    writeEnv(envfile, path, obj, property) {
        obj[property] = `v${parseInt(obj[property].replace(/\w/, "")) + 1}`;
        let newObj = envfile.stringifySync(obj, (err, str) => {
            if (err) throw new Error(err);
            return str;
        });
        fs.writeFile(path, newObj, (err) => {
            if (err) throw new Error("Error:", err);
        });
    }
}