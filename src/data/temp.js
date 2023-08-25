document.addEventListener("keydown", getCharacterDataFromClipboard)

// クリップボードからキャラシデータを取得する関数
function getCharacterDataFromClipboard() {
    readClipboard().then((clipText) => {
        console.log(clipText)
        var clipText2 = `{"gaps":[true,true,false,false,false],"skills":[{"row":0,"column":5},{"row":2,"column":1},{"row":3,"column":4},{"row":5,"column":1},{"row":8,"column":4},{"row":9,"column":1}],"makaiKogaku":true,"mokuren":true,"tatsujin":[{"row":6,"column":1},{"row":10,"column":4}],"yori":[{"row":9,"column":1},{"row":9,"column":1}]}`
        console.log(clipText === clipText2)
        return;
        var characterData = convertTextCharacterData(clipText);
        return characterData;
    });
}
// クリップボードにコピーしたテキスト形式のキャラシデータをオブジェクトに変換する関数
function convertTextCharacterData(text) {
    var result = {
        gaps: [],
        skills: [],
        makaiKogaku: false,
        mokuren: false,
        tatsujin: [],
        yori: []
    };
    try {
        // テキストをキャラシデータのオブジェクトに変換する
        var convertedData = JSON.parse(text);
        //console.log("obj", convertedData)
        // gapsのチェックを行う
        for (var i = 0; i < 5; i++) {
            if (typeof convertedData.gaps[i] !== "boolean") {
                throw new Error("gapsが不正です");
            }
        }
        // skillsのチェックを行う
        for (var _i = 0, _a = convertedData.skills; _i < _a.length; _i++) {
            var elm = _a[_i];
            if (!((0 <= elm.row && elm.row < 11) && (0 <= elm.column && elm.column < 6))) {
                throw new Error("skillsが不正です");
            }
        }
        // makaiKogakuのチェックを行う
        if (typeof convertedData.makaiKogaku !== "boolean") {
            throw new Error("makaiKogakuが不正です");
        }
        // mokurenのチェックを行う
        if (typeof convertedData.mokuren !== "boolean") {
            throw new Error("mokurenが不正です");
        }
        // tatsujinのチェックを行う
        for (var _i = 0, _a = convertedData.tatsujin; _i < _a.length; _i++) {
            var elm = _a[_i];
            if (!((0 <= elm.row && elm.row < 11) && (0 <= elm.column && elm.column < 6))) {
                throw new Error("tatsujinが不正です");
            }
        }
        // yoriのチェックを行う
        for (var _i = 0, _a = convertedData.yori; _i < _a.length; _i++) {
            var elm = _a[_i];
            if (!((0 <= elm.row && elm.row < 11) && (0 <= elm.column && elm.column < 6))) {
                throw new Error("yoriが不正です");
            }
        }
        // 必要なデータをコピーする
        result.gaps = convertedData.gaps;
        result.skills = convertedData.skills;
        result.makaiKogaku = convertedData.makaiKogaku;
        result.mokuren = convertedData.mokuren;
        result.tatsujin = convertedData.tatsujin;
        return result;
    }
    catch (error) {
        throw new Error(error)
    }
}
// クリップボードからテキストを取得する関数
async function readClipboard() {
    return navigator.clipboard.readText()
}
// キャラシのデータをクリップボードにコピーする関数
function copyCharacterDataToClipboard() {
    if (document.querySelector("#skills\\.row0 > td:nth-child(2)")) {
        var characterData = getCharacterData();
        var characterDataStr = JSON.stringify(characterData);
        pasteClipboard(characterDataStr);
        window.alert("キャラクターの習得特技をクリップボードにコピーしました。");
    }
    else {
        window.alert("キャラクターの習得特技を取得できませんでした。\nキャラクターシート上で実行してください。");
    }
}
// クリップボードにテキストをコピーする関数
function pasteClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    }
    else {
        // httpではclipboardAPIが使えないので、非推奨ではあるがexecCommandを使う必要がある
        var tempElm = document.createElement("input");
        tempElm.value = text;
        document.body.appendChild(tempElm);
        tempElm.select();
        document.execCommand("copy");
        document.body.removeChild(tempElm);
    }
}
// キャラシのデータを取得する関数
function getCharacterData() {
    var result = {
        gaps: getGaps(),
        skills: getLearnedSkills(),
        makaiKogaku: getIsChecked("#skills\\.f"),
        mokuren: getIsChecked("#skills\\.outRow"),
        tatsujin: getNinpoName("達人")
    };
    return result;
}
// キャラシから塗りつぶされたギャップ列を取得する関数
function getGaps() {
    var result = [false, false, false, false, false];
    result[0] = getIsChecked("#skills\\.a");
    result[1] = getIsChecked("#skills\\.b");
    result[2] = getIsChecked("#skills\\.c");
    result[3] = getIsChecked("#skills\\.d");
    result[4] = getIsChecked("#skills\\.e");
    return result;
}
// キャラシから習得特技を取得する関数
function getLearnedSkills() {
    var result = new Array;
    for (var r = 0; r < 11; r++) {
        for (var c = 0; c < 6; c++) {
            var elm = document.querySelector("#skills\\.row".concat(r, " > td:nth-child(").concat(c * 2 + 2, ")"));
            var isLearned = (elm === null || elm === void 0 ? void 0 : elm.classList.contains("selected")) || false;
            if (isLearned) {
                var skillCoordinate = {
                    row: r,
                    column: c
                };
                result.push(skillCoordinate);
            }
        }
    }
    return result;
}
// 特定の忍法を習得しているかどうかを取得する関数
function getNinpoName(name) {
    var result = false;
    var ninpoList = document.querySelector("#ninpou > tbody");
    var trElements = ninpoList === null || ninpoList === void 0 ? void 0 : ninpoList.querySelectorAll("tr");
    if (trElements === null || trElements === void 0 ? void 0 : trElements.length) {
        for (var i = 0; i < (trElements === null || trElements === void 0 ? void 0 : trElements.length); i++) {
            var inputElement = trElements[i].querySelectorAll("input")[2];
            var ninpoName = inputElement.value;
            if (ninpoName === name) {
                result = true;
            }
        }
    }
    return result;
}
// チェックボックスにチェックが入っているかどうかを取得する関数
function getIsChecked(query) {
    var result = false;
    var inputElement = document.querySelector(query);
    if (inputElement === null || inputElement === void 0 ? void 0 : inputElement.checked)
        result = true;
    return result;
}