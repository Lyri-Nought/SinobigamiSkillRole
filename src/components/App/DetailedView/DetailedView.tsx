import React, { useContext, useRef } from 'react';
import { DataContext, DataProviderType } from '../../../providers/App/DataProvider';
import { convertSkillCoordinate } from '../../../data/getCharacterData';
import { SkillCoordinate, skillNameList } from '../../../data/getAchievementValue';
import DetailedSkillRole from "./DetailedSkillRole";

type Props = {
    isDetailedView: boolean;
    targetSkill: SkillCoordinate | null;
}

export default function DetailedView({isDetailedView, targetSkill}: Props) {
    const characterData = useContext<DataProviderType | null>(DataContext);
    const detailedViewRef = useRef<HTMLDivElement>(null);
    const maxHeight: number = 377;

    return (
        <div
            style={{
                borderLeft: "solid 1px rgb(152, 152, 152)",
                textAlign: "left",
                minWidth: "7rem",
                maxHeight: `${maxHeight}px`,
                overflowY: "auto"
            }}
            hidden={!isDetailedView}
        >
            <div
                ref={detailedViewRef}
                style={{
                    height: "fit-content",
                    borderBottom: ((convertSkillCoordinate(characterData?.skills || []).length > 0) && (detailedViewRef.current && detailedViewRef.current.offsetHeight <= maxHeight)) ? "solid 1px rgb(152, 152, 152)" : "",
                    minWidth: "7rem"
                }}
            >
                <table
                    style={{
                        borderCollapse: "collapse"
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
                        <DetailedSkillRole skill={skill} index={index} targetSkill={targetSkill}/>
                    ))}
                </table>
            </div>
        </div>
    );
}