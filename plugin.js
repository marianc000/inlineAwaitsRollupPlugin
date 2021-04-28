const path = require('path');
const { readFileSync } = require('fs');
 
function ImportmapPlugin() {
    const re = /await +loadHTML\('([^,]+)',/g;

    return {
        transform(code, id) {
            function replacer(match, relativeUrl) {
                const filePath = path.resolve(path.dirname(id), relativeUrl);
                const html = readFileSync(filePath,{encoding  : 'utf8'});
                return JSON.stringify(html) + "; //";
            }
            
            return code.replace(re, replacer);
        }
    };
}

module.exports = ImportmapPlugin;
