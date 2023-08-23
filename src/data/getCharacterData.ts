import { SkillCoordinate } from "./getAchievementValue"

type CharacterData = {
    gaps: boolean[]; // ギャップ
    skills: SkillCoordinate[]; // 特技の習得状況
    makaiKogaku: boolean; // 魔界工学
    mokuren: boolean; // 木蓮
    tatsujin: boolean; // 達人
}
// キャラシのデータをクリップボードにコピーする関数
export function copyCharacterDataToClipboard(): void{
    if(document.querySelector("#skills\\.row0 > td:nth-child(2)")){
        const characterData: CharacterData = getCharacterData();
        const characterDataStr: string = JSON.stringify(characterData);
        if(navigator.clipboard){
            navigator.clipboard.writeText(characterDataStr);
            window.alert("キャラクターの習得特技をクリップボードにコピーしました。")
        }
    }else{
        window.alert("キャラクターの習得特技を取得できませんでした。\nキャラクターシート上で実行してください。")
    }
}

// キャラシのデータを取得する関数
function getCharacterData(): CharacterData{
    const result: CharacterData = {
        gaps: [],
        skills: getLearnedSkills(),
        makaiKogaku: getIsChecked("#skills\\.f"),
        mokuren: getIsChecked("#skills\\.outRow"),
        tatsujin: getNinpoName("達人")
    };
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

function getIsChecked(query: string): boolean{
    let result: boolean = false;
    const inputElement: HTMLInputElement | null = document.querySelector(query);
    if(inputElement?.checked) result = true;
    return result;
}