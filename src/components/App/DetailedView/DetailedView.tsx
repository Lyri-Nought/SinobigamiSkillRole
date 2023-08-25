import React, { useContext } from 'react';
import { DataContext, DataProviderType } from '../../../providers/App/DataProvider';
import { convertSkillCoordinate } from '../../../data/getCharacterData';
import { roleDesignatedSkill, getMinAchievementValue } from "./../../../data/roleSkill";
import { getAchievementValue, SkillCoordinate, skillNameList } from '../../../data/getAchievementValue';

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
                const achievementValue: number = getAchievementValueWithSkill(learnedSkill, targetSkill);
                if(minAchievementValue[0] === achievementValue){
                    result = true;
                }
            }
        }
        return result;
    }

    // 指定特技の達成値を取得する関数
    function getAchievementValueWithSkill(learnedSkill: SkillCoordinate, targetSkill: SkillCoordinate): number{
        if(characterData){
            return getAchievementValue(
                learnedSkill,
                targetSkill,
                characterData.gaps,
                characterData.makaiKogaku,
                characterData.mokuren,
                characterData.yori[learnedSkill.row][learnedSkill.column]
            );
        }else{
            return 5;
        }
    }

    // 達人を含めて特技が削れていないかどうかを取得する関数
    function getSkillExistence(skill: SkillCoordinate): boolean{
        let result: boolean = false;
        if(characterData){
            if(characterData.fields[skill.column] === false){
                if(characterData.tatsujin[skill.row][skill.column] === true){
                    // 削れているが達人で無効化しているとき
                    result = true;
                }
            }else{
                // 削れていないとき
                result = true;
            }
        }
        return result;
    }

    return (
        <div
            style={{
                borderLeft: "solid 1px rgb(152, 152, 152)",
                textAlign: "left",
                overflowY: "auto",
                overflowX: "hidden",
                minWidth: "7rem",
                height: "auto"
            }}
            hidden={!isDetailedView}
        >
            <div
                style={{
                    height: "fit-content",
                    borderBottom: "solid 1px rgb(152, 152, 152)"
                }}
            >
                <table
                    style={{
                        borderCollapse: "collapse",
                        cursor: "pointer"
                    }}
                >
                    {(targetSkill) && (
                        <tr
                            style={{
                                borderBottom: "solid 1px rgb(152, 152, 152)"
                            }}
                        >
                            <td
                                style={{
                                    textAlign: "center"
                                }}
                                colSpan={2}
                            >
                                {`【${skillNameList[targetSkill.row][targetSkill.column]}】`}
                            </td>
                        </tr>
                    )}
                    {convertSkillCoordinate(characterData?.skills || []).map((skill: SkillCoordinate, index: number) => (
                        <tr
                            style={{
                                borderTop: (index !== 0) ? "solid 1px rgb(152, 152, 152)" : "",
                                paddingLeft: "1px",
                                paddingRight: "1px"
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
                            <td
                                style={{
                                    borderRight: "solid 1px rgb(152, 152, 152)",
                                    color: (targetSkill && getIsValueMin(skill, targetSkill) && getSkillExistence(skill)) ? infoColor : "",
                                    paddingLeft: "3px",
                                    paddingRight: "3px"
                                }}
                            >
                                {skillNameList[skill.row][skill.column]}
                            </td>
                            <td>
                                {(targetSkill) && (
                                    <span
                                        style={{
                                            paddingLeft: "3px",
                                            paddingRight: "3px"
                                        }}
                                    >
                                        <span>{`2d6>=${getAchievementValueWithSkill(skill, targetSkill)}`}</span>
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
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}