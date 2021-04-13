const Fs = require("fs");

module.exports = {
    addUser: function (id) {
        Fs.writeFileSync(`data/${id}.json`, JSON.stringify({}))
    },
    userExists: function (id) {
        return Fs.existsSync(`data/${id}.json`);
    },
    addSentence: function (id, sentence) {
        var data = JSON.parse(Fs.readFileSync(`data/${id}.json`));
        // tokenize
        var text = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s+/g, " ")
            .toLowerCase()
            .split(" ");

        for (let i = 0; i < text.length; ++i) {
            if (i == text.length - 1) break;
            if (!data[text[i]]) data[text[i]] = { total: 0 };
            data[text[i]].total++;
            if (!data[text[i]][text[i + 1]]) data[text[i]][text[i + 1]] = 0;
            data[text[i]][text[i + 1]]++;
        }

        Fs.writeFileSync(`data/${id}.json`, JSON.stringify(data));
    }
}