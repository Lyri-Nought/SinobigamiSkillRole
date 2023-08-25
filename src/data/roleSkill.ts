import { SkillCoordinate, getAchievementValue } from "./getAchievementValue"

// 最適な特技でロールを行う関数
function roleSkill(){

}

// 指定特技の達成値が一番低い特技を取得する関数
function getAppropriateSkill(
    skillTable: boolean[][],
    targetSkill: SkillCoordinate,
    gaps: boolean[],
    fields: boolean[],
    makaiKogaku: boolean,
    mokuren: boolean, 
    yoriTable: boolean[][],
    tatsujinTable: boolean[][]
): number | null{
    let result: number | null = null;
    const skillCoordinates: SkillCoordinate[] = convertSkillCoordinate(skillTable);
    const achievementValues: number[] = new Array;
    // 全ての特技の達成値を求める
    for(const skill of skillCoordinates){
        const yori: boolean = yoriTable[skill.row][skill.column];
        const tatsujin: boolean = tatsujinTable[skill.row][skill.column];
        if((tatsujin && !fields[skill.column]) || fields[skill.column]){
            // 代用特技の分野が削れていない、あるいは削れているが達人習得時、達成値を取得する
            const achievementValue: number = getAchievementValue(
                skill,
                targetSkill,
                gaps,
                makaiKogaku,
                mokuren,
                yori
            );
            achievementValues.push(achievementValue);
        }
    }
    // 求めた全ての技能の達成値の中から最小のものを返す
    if(0 < achievementValues.length){
        const minValue: number = Math.min(...achievementValues);
        result = minValue;
    }
    return result;
}

// 論理型の二次元配列を、特技配置のオブジェクトに変換する関数
function convertSkillCoordinate(skillTable: boolean[][]): SkillCoordinate[]{
    let result: SkillCoordinate[] = new Array;
    for(let row: number = 0; row < 11; row++){
        for(let column: number = 0; column < 6; column++){
            if(skillTable[row][column]){
                const skill: SkillCoordinate = {row, column};
                result.push(skill);
            }
        }
    }
    return result;
}