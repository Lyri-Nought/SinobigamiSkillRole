import React, { useContext } from 'react';
import { DataContext, DataProviderType } from '../../../providers/App/DataProvider';
import { convertSkillCoordinate } from '../../../data/getCharacterData';
import { roleDesignatedSkill, getMinAchievementValue } from "./../../../data/roleSkill";
import { getAchievementValue, SkillCoordinate } from '../../../data/getAchievementValue';

type Props = {
    isDetailedView: boolean;
    targetSkill: SkillCoordinate | null;
}

export default function DetailedView({isDetailedView, targetSkill}: Props) {
    const infoColor: string = "#2196f3";
    const dangerColor: string = "red";
    const characterData = useContext<DataProviderType | null>(DataContext);

    function getIsValueMin(learnedSkill: SkillCoordinate, targetSkill: SkillCoordinate): boolean{
        let result: boolean = false;
        if(characterData){
            // 習得特技の中から一番達成値が低いものを取得する
            const minAchievementValue: [number, SkillCoordinate] | null = getMinAchievementValue(
                characterData.skills,
                targetSkill,
                characterData.gaps,
                characterData.fields,
                characterData.makaiKogaku,
                characterData.mokuren,
                characterData.yori,
                characterData.tatsujin
            );
            if(minAchievementValue){
                // 指定特技の達成値を取得する
                const achievementValue: number = getAchievementValue(
                    learnedSkill,
                    targetSkill,
                    characterData.gaps,
                    characterData.makaiKogaku,
                    characterData.mokuren,
                    characterData.yori[learnedSkill.row][learnedSkill.column]
                );
                if(minAchievementValue[0] === achievementValue){
                    result = true;
                }
            }
        }
        return result;
    }

    return (
        <table
            style={{
                borderLeft: "solid 1px rgb(152, 152, 152)",
                borderCollapse: "collapse",
                textAlign: "left",
                cursor: "pointer",
                overflowY: "auto"
            }}
            hidden={isDetailedView}
        >
            {convertSkillCoordinate(characterData?.skills || []).map((skill: SkillCoordinate, index: number) => (
                <tr
                    style={{
                        borderTop: (index !== 0) ? "solid 1px rgb(152, 152, 152)" : "",
                        boxShadow: (targetSkill && getIsValueMin(skill, targetSkill)) ? `inset 0 0 0 2px ${infoColor}` : ""
                    }}
                    onClick={() => {
                        if(targetSkill && characterData){
                            roleDesignatedSkill(
                                skill,
                                targetSkill,
                                characterData.gaps,
                                characterData.makaiKogaku,
                                characterData.mokuren,
                                characterData.yori,
                            )
                        }
                    }}
                >
                    <td>
                        <span>{[skill.row][skill.column]}</span>
                        {(characterData?.fields[skill.column] === false) && (
                            <span
                                style={{
                                    color: (characterData?.tatsujin[skill.row][skill.column] === true) ? infoColor : dangerColor,
                                    marginLeft: "1rem"
                                }}
                            >
                                ※要: 達人
                            </span>
                        )}
                        
                    </td>
                </tr>
            ))}
        </table>
    );
}