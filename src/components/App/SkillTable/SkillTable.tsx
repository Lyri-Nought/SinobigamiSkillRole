import React, { useState } from 'react';
import { skillNameList, fieldNameList, SkillCoordinate } from "../../../data/getAchievementValue"
import FieldCell from "./FieldCell"
import GapCell from "./GapCell"
import MokurenCell from "./MokurenCell"
import SkillCell from "./SkillCell"

export type BorderStyle = {
    borderLeft: string;
    borderRight: string;
    borderTop: string;
    borderBottom: string;
};

type Props = {
    isDetailedView: boolean;
    selecting: number;
    setTargetSkill: React.Dispatch<React.SetStateAction<SkillCoordinate | null>>;
    skillTableRef: React.RefObject<HTMLTableElement>;
}

export default function SkillTable({isDetailedView, selecting, setTargetSkill, skillTableRef}: Props){
    const [mouseGapHover, setMouseGapHover] = useState<number | null>(null); // ギャップのhover処理用State
    const [mouseGapClick, setMouseGapClick] = useState<number | null>(null); // ギャップのclick処理用State

    // テーブルの外側線を無くしたborderのスタイルを取得する関数
    function getBorderStyle(row: number, col: number): BorderStyle{
        const rowTopEdge: number = 0;
        const rowBottomEdge: number = 10;
        const colLeftEdge: number = 0;
        const colRightEdge: number = 5;
        const borderStyle: string = "solid 1px rgb(152, 152, 152)";
        let result: BorderStyle = {
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
            borderBottom: "none"
        };
        if(row !== rowTopEdge){
            result.borderTop = borderStyle;
        }
        if(row !== rowBottomEdge){
            result.borderBottom = borderStyle;
        }
        if(col !== colLeftEdge){
            result.borderLeft = borderStyle;
        }
        if(col !== colRightEdge){
            result.borderRight = borderStyle;
        }
        return result;
    }

    // 適切な背景色を取得する関数
    function getBackgroundColor(isAble: boolean, isHovered: boolean, isClicked: boolean): string{
        const colors: string[] = ["", "rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.4)", "white"];
        if(isClicked){
            return colors[2];  
        }else{
            if(isAble){
                return colors[3];
            }else{
                if(isHovered){
                    return colors[1]
                }else{
                    return colors[0];
                }
            }
        }
    }

    return (
        <table
            ref={skillTableRef}
            className="draggable-disable"
            style={{
                borderCollapse: "collapse",
                textAlign: "center",
                cursor: "pointer"
            }}
        >
            <tr style={{borderBottom: "solid 1px rgb(152, 152, 152)"}}>
                {fieldNameList.map((fieldName, index) =>
                    <FieldCell fieldName={fieldName} index={index}/>
                )}
            </tr>
            {skillNameList.map((skillRow, rowIndex) => 
                <tr>
                    {skillRow.map((skillName, colIndex) =>
                        <React.Fragment key={`${colIndex}-${rowIndex}`}>
                            <GapCell
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                mouseGapHover={mouseGapHover}
                                setMouseGapHover={setMouseGapHover}
                                mouseGapClick={mouseGapClick}
                                setMouseGapClick={setMouseGapClick}
                                getBorderStyle={getBorderStyle}
                                getBackgroundColor={getBackgroundColor}
                            />
                            <SkillCell
                                skillName={skillName}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                getBorderStyle={getBorderStyle}
                                getBackgroundColor={getBackgroundColor}
                                isDetailedView={isDetailedView}
                                selecting={selecting}
                                setTargetSkill={setTargetSkill}
                            />
                        </React.Fragment>
                    )}
                </tr>
            )} 
            <MokurenCell
                getBackgroundColor={getBackgroundColor}
            />
        </table>
    );
};