import React, { useState, useContext } from 'react';
import { skillNameList, fieldNameList } from "../../../data/getAchievementValue"
import { FormControlLabel, Checkbox } from '@mui/material';
import { DataContext, DataProviderType } from '../../../providers/App/DataProvider';
import GapCell from "./GapCell"
import FieldCell from "./FieldCell"

export type BorderStyle = {
    borderLeft: string;
    borderRight: string;
    borderTop: string;
    borderBottom: string;
};

export default function SkillTable(){
    const [mouseGapHover, setMouseGapHover] = useState<number | null>(null); // ギャップのhover処理用State
    const [mouseGapClick, setMouseGapClick] = useState<number | null>(null); // ギャップのclick処理用State
    const characterData = useContext<DataProviderType | null>(DataContext);

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
                            <td style={getBorderStyle(rowIndex, colIndex)}>{skillName}</td>
                        </React.Fragment>
                    )}
                </tr>
            )} 
            <tr>
                <td
                    style={{
                        borderTop: "solid 1px rgb(152, 152, 152)",
                        height: "1rem"
                    }}
                    colSpan={12}
                />
            </tr>
        </table>
    );
};