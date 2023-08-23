import { SkillCoordinate } from "./getAchievementValue"

type CharacterData = {
    gaps: boolean[]; // ギャップ
    skills: SkillCoordinate[]; // 特技の習得状況
    makaiKogaku: boolean; // 魔界工学
    mokuren: boolean; // 木蓮
    tatsujin: boolean; // 達人
}
// キャラシのデータをクリップボードにコピーする関数
function copyCharacterDataToClipboard(): void{
    if(document.querySelector("#skills\\.row0 > td:nth-child(2)")){
        const characterData: CharacterData = getCharacterData();
        const characterDataStr: string = JSON.stringify(characterData);
        if(navigator.clipboard){
            navigator.clipboard.writeText(characterDataStr);
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
        makaiKogaku: false,
        mokuren: false,
        tatsujin: false
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