const Fs = require("fs");
const JaroWinkler = require("./jarowinkler.js");

module.exports = {
    addUser: function (id) {
        Fs.writeFileSync(`data/${id}.json`, JSON.stringify({}))
    },
    removeUser: function (id) {
        Fs.unlinkSync(`data/${id}.json`);
    },
    userExists: function (id) {
        return Fs.existsSync(`data/${id}.json`);
    },
    getUser: function (id) {
        return JSON.parse(Fs.readFileSync(`data/${id}.json`));
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
    },
    nextWord: function (id, word) {
        var data = JSON.parse(Fs.readFileSync(`data/${id}.json`));

        if (!data[word]) {
            var highest = 0;
            var newWord = "";

            for (let key of Object.keys(data)) {
                var weight = JaroWinkler(key, word);
                if (weight > highest) {
                    highest = weight;
                    newWord = key;
                }
            }

            word = newWord;
        }

        var total = data[word]["total"];
        delete data[word]["total"];

        var random = Math.random();
        var previous = undefined;
        var chosen = ""
        for (let [key, value] of Object.entries(data[word])) {
            if (!previous) {
                previous = value / total;
                if (random < previous) {
                    chosen = key;
                    break;
                }
            } else {
                previous = previous + value / total;
                if (random < previous) {
                    chosen = key;
                    break;
                }
            }
        }

        return chosen;
    }
}