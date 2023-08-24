import React, { useState } from 'react';
import { skillNameList } from "./../../data/getAchievementValue"

export default function SkillTable(){
    const gapWidth: string = "1rem";

    // テーブルの外側線を無くしたborderのスタイルを取得する関数
    type BorderStyle = {
        borderLeft: string;
        borderRight: string;
        borderTop: string;
        borderBottom: string;
    };
    function getBorderStyle(row: number, col: number): BorderStyle{
        const rowTopEdge: number = 0;
        const rowBottomEdge: number = 10;
        const colLeftEdge: number = 0;
        const colRightEdge: number = 5;
        const borderStyle: string = "solid 1px white";
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

    return (
        <table style={{borderCollapse: "collapse"}}>
            {skillNameList.map((skillRow, rowIndex) => 
                <tr>
                    {skillRow.map((skillName, colIndex) =>
                        <React.Fragment key={`${colIndex}-${rowIndex}`}>
                            <td style={Object.assign({width: gapWidth}, getBorderStyle(rowIndex, colIndex))}/>
                            <td style={getBorderStyle(rowIndex, colIndex)}>{skillName}</td>
                        </React.Fragment>
                    )}
                </tr>
            )} 
        </table>
    );
};