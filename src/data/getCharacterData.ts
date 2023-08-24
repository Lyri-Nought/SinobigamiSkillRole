import { SkillCoordinate } from "./getAchievementValue"

type CharacterData = {
    gaps: boolean[]; // ギャップ
    skills: SkillCoordinate[]; // 特技の習得状況
    makaiKogaku: boolean; // 魔界工学
    mokuren: boolean; // 木蓮
    tatsujin: boolean; // 達人
    yori: SkillCoordinate | null; // 妖理
}

// クリップボードにコピーしたテキスト形式のキャラシデータをオブジェクトに変換する関数
export function convertTextCharacterData(text: string): CharacterData{
    // TODO フォーマットチェック
    const result: CharacterData = {
        gaps: [],
        skills: [],
        makaiKogaku: false,
        mokuren:false,
        tatsujin: false,
        yori: null
    };
    return result;
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
        tatsujin: getNinpoName("達人"),
        yori: null
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