const Fs = require("fs");
const JaroWinkler = require("./jarowinkler.js");

module.exports = {
    addUser: function (id) {
        Fs.writeFileSync(`data/${id}.json`, JSON.stringify({ FIRST: { TOTAL: 0 }, SECOND: {}, REGULAR: {} }));
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
        // var text = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        // removes anything other than a letter
        var text = sentence.replace(/[^\w\d]/gi, "")
            .replace(/\s+/g, " ")
            .toLowerCase()
            .split(" ");

        if (!text) return false;

        for (let i = 0; i < text.length; ++i) {
            /* CASES */
            if (i == 0) {
                if (!data.FIRST[text[i]]) data.FIRST[text[i]] = 0;
                data.FIRST[text[i]]++;
                data.FIRST.TOTAL++;
            } else if (i == 1) {
                if (!data.SECOND[text[i - 1]]) data.SECOND[text[i - 1]] = { TOTAL: 0 };
                if (!data.SECOND[text[i - 1]][text[i]]) data.SECOND[text[i - 1]][text[i]] = 0;
                data.SECOND[text[i - 1]][text[i]]++;
                data.SECOND[text[i - 1]].TOTAL++;
            } else {
                var phrase = text[i - 2] + "_" + text[i - 1];
                if (!data.REGULAR[phrase]) data.REGULAR[phrase] = { TOTAL: 0 };
                if (!data.REGULAR[phrase][text[i]]) data.REGULAR[phrase][text[i]] = 0;
                data.REGULAR[phrase].TOTAL++;
                data.REGULAR[phrase][text[i]]++;
            }
        }

        if (text.length == 1) {
            if (!data.SECOND[text[0]]) data.SECOND[text[0]] = { TOTAL: 0 }
            if (!data.SECOND[text[0]].END) data.SECOND[text[0]].END = 0;
            data.SECOND[text[0]].TOTAL++;
            data.SECOND[text[0]].END++;
        } else if (text.length >= 2) {
            var lastphrase = text[text.length - 2] + "_" + text[text.length - 1];
            if (!data.REGULAR[lastphrase]) data.REGULAR[lastphrase] = { TOTAL: 0 };
            if (!data.REGULAR[lastphrase].END) data.REGULAR[lastphrase].END = 0;
            data.REGULAR[lastphrase].TOTAL++;
            data.REGULAR[lastphrase].END++;
        }

        Fs.writeFileSync(`data/${id}.json`, JSON.stringify(data));
    },
    nextWord: function (id, phrase) {
        var data = JSON.parse(Fs.readFileSync(`data/${id}.json`));

        if (!data.REGULAR[phrase]) {
            var highest = -1;
            var newWord = "";

            for (let key of Object.keys(data)) {
                var weight = JaroWinkler(key, phrase);
                if (weight > highest) {
                    highest = weight;
                    newWord = key;
                }
            }

            phrase = newWord;
        }
        if (!phrase) return "cannot create sentence";
        var total = data.REGULAR[phrase].TOTAL;
        delete data.REGULAR[phrase].TOTAL;

        var random = Math.random();
        var previous = undefined;
        var chosen = ""
        for (let [key, value] of Object.entries(data.REGULAR[phrase])) {
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
    },
    generatePhrase: function (id) {
        var data = JSON.parse(Fs.readFileSync(`data/${id}.json`));

        // Choose First Word
        var random = Math.random();
        var firstPrevious = undefined;
        var firstChosen = "";

        for (let [key, value] of Object.entries(data.FIRST)) {
            if (key == "TOTAL") continue;
            if (!firstPrevious) {
                firstPrevious = value / data.FIRST.TOTAL;
                if (random < firstPrevious) {
                    firstChosen = key;
                    break;
                }
            } else {
                firstPrevious = firstPrevious + (value / data.FIRST.TOTAL);
                if (random < firstPrevious) {
                    firstChosen = key;
                    break;
                }
            }
        }

        // Choose Second Word
        random = Math.random();
        var secondPrevious = undefined;
        var secondChosen = "";

        for (let [key, value] of Object.entries(data.SECOND[firstChosen])) {
            if (key == "TOTAL") continue;
            if (!secondPrevious) {
                secondPrevious = value / data.SECOND[firstChosen].TOTAL;
                if (random < secondPrevious) {
                    secondChosen = key;
                    break;
                }
            } else {
                secondPrevious = secondPrevious + (value / data.SECOND[firstChosen].TOTAL);
                if (random < secondPrevious) {
                    secondChosen = key;
                    break;
                }
            }
        }

        if (secondChosen == "END") return firstChosen;

        var sentence = [firstChosen, secondChosen];
        while (sentence[sentence.length - 1] !== "END") {
            var nextWord = this.nextWord(id, sentence[sentence.length - 2] + "_" + sentence[sentence.length - 1]);
            sentence.push(nextWord);
        }

        return sentence.slice(0, sentence.length - 1).join(" ");
    }
}