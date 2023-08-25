import React, { useState, useContext } from 'react';
import { DataContext, DataProviderType } from '../../../providers/App/DataProvider';
import { SkillCoordinate, getAchievementValue } from "./../../../data/getAchievementValue";

export type BorderStyle = {
    borderLeft: string;
    borderRight: string;
    borderTop: string;
    borderBottom: string;
};

type Props = {
    skillName: string;
    rowIndex: number;
    colIndex: number;
    getBorderStyle: (row: number, col: number) => BorderStyle;
    getBackgroundColor: (isAble: boolean, isHovered: boolean, isClicked: boolean) => string;
    isDetailedView: boolean;
}

export default function SkillTable({
    skillName,
    rowIndex, colIndex,
    getBorderStyle,
    getBackgroundColor,
    isDetailedView
}: Props){
    const [mouseSkillHover, setMouseSkillHover] = useState<boolean>(false); // 特技欄のhover処理用State
    const [mouseSkillClick, setMouseSkillClick] = useState<boolean>(false); // 特技欄のclick処理用State
    const characterData = useContext<DataProviderType | null>(DataContext);

    // 特技欄の背景色を取得する処理
    function getSkillBackgroundColor(): string{
        let isAble: boolean = false;
        if(characterData){
            if(characterData.skills[rowIndex][colIndex]){
                isAble = true;
            }
        }
        return getBackgroundColor(isAble, mouseSkillHover, mouseSkillClick);
    }

    // 特技欄を左クリックしたときの処理
    function handleMouseLeftClick(){
        if(characterData){
            // console.log(`2d6<=${getAchievementValue(hoge, fuga)} 【${fugaName}(判定: ${hogeName})】`)
        }
    }

    // 特技欄を右クリックしたときの処理
    function toggleSkillAble(){
        if(characterData){
            characterData.setSkills((prev) => {
                const newArray: boolean[][] = prev.concat();
                newArray[rowIndex][colIndex] = !prev[rowIndex][colIndex];
                return newArray;
            });
        }
    }

    return (
        <td
        style={
                Object.assign(
                    {
                        backgroundColor: getSkillBackgroundColor(),
                        color: (characterData?.skills[rowIndex][colIndex]) ? "rgba(44, 44, 44, 0.87)" : ""
                    },
                    getBorderStyle(rowIndex, colIndex)
                )
            }
            onContextMenu={(event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
                event.preventDefault();
                toggleSkillAble();
                return false;
            }}
            onMouseEnter={() => setMouseSkillHover(true)}
            onMouseDown={() => {
                setMouseSkillClick(true)
            }}
            onMouseUp={() => setMouseSkillClick(false)}
            onMouseLeave={() => {
                setMouseSkillHover(false);
                setMouseSkillClick(false);
            }}
            onClick={handleMouseLeftClick}
        >
            {skillName}
        </td>
    );
};