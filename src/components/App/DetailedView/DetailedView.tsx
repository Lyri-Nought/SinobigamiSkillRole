import React, { useContext } from 'react';
import { DataContext, DataProviderType } from '../../../providers/App/DataProvider';
import { convertSkillCoordinate } from '../../../data/getCharacterData';
import { roleDesignatedSkill } from "./../../../data/roleSkill";
import { SkillCoordinate } from '../../../data/getAchievementValue';

type Props = {
    isDetailedView: boolean;
    targetSkill: SkillCoordinate | null;
}

export default function Option({isDetailedView, targetSkill}: Props) {
    const infoColor: string = "#2196f3";
    const dangerColor: string = "red";
    const characterData = useContext<DataProviderType | null>(DataContext);

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
                        borderTop: (index !== 0) ? "solid 1px rgb(152, 152, 152)" : ""
                    }}
                    onClick={() => {
                        roleDesignatedSkill(skill, targetSkill)
                    }}
                >
                    <td>
                        <span>{[skill.row][skill.column]}</span>
                        {(characterData?.fields[skill.column] === false) && (
                            <span
                                style={{
                                    color: (characterData?.tatsujin[skill.row][skill.column] === true) ? infoColor : dangerColor
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