import { SkillCoordinate, getAchievementValue, skillNameList } from "./getAchievementValue";
import { convertSkillCoordinate } from "./getCharacterData";
import { sendCcfoliaMessage } from "./sendCcfoliaMessage";

// 最適な特技でロールを行う関数
export function roleSkill(
    skillTable: boolean[][],
    targetSkill: SkillCoordinate,
    gaps: boolean[],
    fields: boolean[],
    makaiKogaku: boolean,
    mokuren: boolean, 
    yoriTable: boolean[][],
    tatsujinTable: boolean[][]
){
    const minAchievementValue: [number, SkillCoordinate] | null | null = getMinAchievementValue(
        skillTable,
        targetSkill,
        gaps,
        fields,
        makaiKogaku,
        mokuren,
        yoriTable,
        tatsujinTable
    );
    if(minAchievementValue !== null){
        const minValue: number = minAchievementValue[0]; // 最小の達成値
        const learnedSkill: SkillCoordinate = minAchievementValue[1]; // 達成値が最小の特技
        const learnedSkillName: string = skillNameList[learnedSkill.row][learnedSkill.column]; // 代用する特技名
        const targetSkillName: string = skillNameList[targetSkill.row][targetSkill.column]; // 指定特技名
        const roleText = `2d6>=${minValue} 【${targetSkillName}(判定: ${learnedSkillName})】`;
        sendCcfoliaMessage(roleText); // ココフォリア上でロールを行う
    }
}

// 指定特技の達成値が一番低い特技の達成値を取得する関数
function getMinAchievementValue(
    skillTable: boolean[][],
    targetSkill: SkillCoordinate,
    gaps: boolean[],
    fields: boolean[],
    makaiKogaku: boolean,
    mokuren: boolean, 
    yoriTable: boolean[][],
    tatsujinTable: boolean[][]
): [number, SkillCoordinate] | null{
    let result: [number, SkillCoordinate] | null = null;
    const skillCoordinates: SkillCoordinate[] = convertSkillCoordinate(skillTable); // 特技群の行と列
    const achievementValues: number[] = new Array; // 特技の達成値群
    const validSkills: SkillCoordinate[] = new Array; // 判定を行うことのできた特技群
    // 全ての特技の達成値を求める
    for(const skill of skillCoordinates){
        const yori: boolean = yoriTable[skill.row][skill.column];
        const tatsujin: boolean = tatsujinTable[skill.row][skill.column];
        if((tatsujin && !fields[skill.column]) || fields[skill.column]){
            // 代用特技の分野が削れていない、あるいは削れているが達人で無効化時、達成値を取得する
            const achievementValue: number = getAchievementValue(
                skill,
                targetSkill,
                gaps,
                makaiKogaku,
                mokuren,
                yori
            );
            achievementValues.push(achievementValue); // 達成値を取得する
            validSkills.push(skill); // 達成値の技能を取得する
        }
    }
    // 求めた全ての技能の達成値の中から最小のものを返す
    if(0 < achievementValues.length){
        // 最小値のセットを取得する
        let minValue: number | null = null;
        let minSkill: SkillCoordinate | null = null;
        for(let i: number = 0; i < achievementValues.length; i++){
            if(minValue === null){
                minValue = achievementValues[i];
                minSkill = validSkills[i];
            }else{
                if(minValue > achievementValues[i]){
                    minValue = achievementValues[i];
                    minSkill = validSkills[i];
                }
            }
        }
        if(minValue !== null && minSkill !== null){
            result = [minValue, minSkill];
        }
    }
    return result;
}