import { SkillCoordinate } from "./getAchievementValue"

type CharacterData = {
    gaps: boolean[]; // ギャップ
    skills: SkillCoordinate[]; // 特技の習得状況
    makaiKogaku: boolean; // 魔界工学
    mokuren: boolean; // 木蓮
    tatsujin: boolean; // 達人
}

// クリップボードからキャラシデータを取得する関数
export function getCharacterDataFromClipboard(): CharacterData | null{
    const clipText: string = readClipboard();
    const characterData: CharacterData | null = convertTextCharacterData(clipText);
    return characterData;
}

// クリップボードにコピーしたテキスト形式のキャラシデータをオブジェクトに変換する関数
function convertTextCharacterData(text: string): CharacterData | null{
    const result: CharacterData = {
        gaps: [],
        skills: [],
        makaiKogaku: false,
        mokuren:false,
        tatsujin: false
    };
    try{
        // テキストをキャラシデータのオブジェクトに変換する
        const convertedData: CharacterData = JSON.parse(text);
        // gapsのチェックを行う
        for(let i: number = 0; i < 6; i++){
            if(typeof convertedData.gaps[i] !== "boolean"){
                throw new Error("gapsが不正です");
            }
        }
        // skillsのチェックを行う
        for(const elm of convertedData.skills){
            if(!((0 <= elm.row && elm.row < 11) && (0 <= elm.column && elm.column < 6))){
                throw new Error("skillsが不正です");
            }
        }
        // makaiKogakuのチェックを行う
        if(typeof convertedData.makaiKogaku !== "boolean"){
            throw new Error("makaiKogakuが不正です");
        }
        // mokurenのチェックを行う
        if(typeof convertedData.mokuren !== "boolean"){
            throw new Error("mokurenが不正です");
        }
        // tatsujinのチェックを行う
        if(typeof convertedData.tatsujin !== "boolean"){
            throw new Error("tatsujinが不正です");
        }
        // 必要なデータをコピーする
        result.gaps = convertedData.gaps;
        result.skills = convertedData.skills;
        result.makaiKogaku = convertedData.makaiKogaku;
        result.mokuren = convertedData.mokuren;
        result.tatsujin = convertedData.tatsujin;
        return result;
    }catch(error: any){
        return null;
    }
}

// クリップボードからテキストを取得する関数
function readClipboard(): string{
    navigator.clipboard.readText().then((clipText) => {
        return clipText;
    });
    return "";
}

// キャラシのデータをクリップボードにコピーする関数
export function copyCharacterDataToClipboard(): void{
    if(document.querySelector("#skills\\.row0 > td:nth-child(2)")){
        const characterData: CharacterData = getCharacterData();
        const characterDataStr: string = JSON.stringify(characterData);
        pasteClipboard(characterDataStr);
        window.alert("キャラクターの習得特技をクリップボードにコピーしました。")
    }else{
        window.alert("キャラクターの習得特技を取得できませんでした。\nキャラクターシート上で実行してください。")
    }
}

// クリップボードにテキストをコピーする関数
function pasteClipboard(text: string): void{
    if(navigator.clipboard){
        navigator.clipboard.writeText(text);
    }else{
        // httpではclipboardAPIが使えないので、非推奨ではあるがexecCommandを使う必要がある
        const tempElm: HTMLInputElement = document.createElement("input");
        tempElm.value = text;
        document.body.appendChild(tempElm);
        tempElm.select();
        document.execCommand("copy");
        document.body.removeChild(tempElm);
    }
}

// キャラシのデータを取得する関数
function getCharacterData(): CharacterData{
    const result: CharacterData = {
        gaps: getGaps(),
        skills: getLearnedSkills(),
        makaiKogaku: getIsChecked("#skills\\.f"),
        mokuren: getIsChecked("#skills\\.outRow"),
        tatsujin: getNinpoName("達人")
    };
    return result;
}

// キャラシから塗りつぶされたギャップ列を取得する関数
function getGaps(): boolean[]{
    const result: boolean[] = [false, false, false, false, false];
    result[0] = getIsChecked("#skills\\.a");
    result[1] = getIsChecked("#skills\\.b");
    result[2] = getIsChecked("#skills\\.c");
    result[3] = getIsChecked("#skills\\.d");
    result[4] = getIsChecked("#skills\\.e");
    return result;
}

// キャラシから習得特技を取得する関数
function getLearnedSkills(): SkillCoordinate[]{
    const result: SkillCoordinate[] = new Array;
    for(let r: number = 0; r < 11; r++){
        for(let c: number = 0; c < 6; c++){
            const elm: HTMLTableCellElement | null = document.querySelector(`#skills\\.row${r} > td:nth-child(${c*2+2})`);
            const isLearned: boolean = elm?.classList.contains("selected") || false;
            if(isLearned){
                const skillCoordinate: SkillCoordinate = {
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
function getNinpoName(name: string): boolean{
    let result: boolean = false;
    const ninpoList: HTMLTableSectionElement | null =document.querySelector("#ninpou > tbody");
    const trElements: NodeListOf<HTMLTableRowElement> | undefined = ninpoList?.querySelectorAll("tr");
    if(trElements?.length){
        for(let i: number = 0; i < trElements?.length; i++){
            const inputElement: HTMLInputElement | null = trElements[i].querySelectorAll("input")[2];
            const ninpoName: string = inputElement.value;
            if(ninpoName === name){
                result = true;
            }
        }
    }
    return result;
}

// チェックボックスにチェックが入っているかどうかを取得する関数
function getIsChecked(query: string): boolean{
    let result: boolean = false;
    const inputElement: HTMLInputElement | null = document.querySelector(query);
    if(inputElement?.checked) result = true;
    return result;
}