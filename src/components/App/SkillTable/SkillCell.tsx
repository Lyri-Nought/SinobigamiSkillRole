import React, { useState, useContext } from 'react';
import { DataContext, DataProviderType, toggleSkillTable, skillTable } from '../../../providers/App/DataProvider';
import { BorderStyle } from "./SkillTable";
import { getAchievementValue, skillNameList } from "./../../../data/getAchievementValue";

type Props = {
    skillName: string;
    rowIndex: number;
    colIndex: number;
    getBorderStyle: (row: number, col: number) => BorderStyle;
    getBackgroundColor: (isAble: boolean, isHovered: boolean, isClicked: boolean) => string;
    isDetailedView: boolean;
    selecting: number;
}

export default function SkillTable({
    skillName,
    rowIndex, colIndex,
    getBorderStyle,
    getBackgroundColor,
    isDetailedView,
    selecting
}: Props){
    const [isHovered, setIsHovered] = useState<boolean>(false); // 特技欄のhover処理用State
    const [isClicked, setIsClicked] = useState<boolean>(false); // 特技欄のclick処理用State
    const characterData = useContext<DataProviderType | null>(DataContext);

    // 特技欄の文字色を取得する処理
    function getSkillTextColor(): string{
        let isSkillAble: boolean = characterData?.skills[rowIndex][colIndex] || false;
        let isYoriAble: boolean = characterData?.yori[rowIndex][colIndex] || false;
        if(isYoriAble){
            return "#2196f3";
        }else if(isSkillAble){
            return "rgba(44, 44, 44, 0.87)";
        }else{
            return "";
        }
    }

    // 特技欄の背景色を取得する処理
    function getSkillBackgroundColor(): string{
        let isAble: boolean = characterData?.skills[rowIndex][colIndex] || false;
        return getBackgroundColor(isAble, isHovered, isClicked);
    }

    // 特技欄を左/右クリックしたときの処理
    function handleMouseClick(mouseButton: 0 | 2){
        if(!characterData) return;
        console.log(`妖理: ${characterData.yori[rowIndex][colIndex]}/n達人: ${characterData.tatsujin[rowIndex][colIndex]}\n特技: ${characterData.skills[rowIndex][colIndex]}\n${skillTable[rowIndex][colIndex]}`)
        if(selecting === 1){
            // 妖理設定モードのとき
            toggleSkillTable(characterData.setYori, rowIndex, colIndex);
        }else if(selecting === 2){
            // 達人設定モードのとき
            toggleSkillTable(characterData.setTatsujin, rowIndex, colIndex);
        }else{
            // 特技設定モードのとき
            if(mouseButton === 0){
                // 左クリックされたとき
                handleSkillClick();
            }else{
                // 右クリックされたとき
                toggleSkillTable(characterData.setSkills, rowIndex, colIndex);
            }
        }
    }

    // 特技欄を特技設定モードで左クリックしたときの処理
    function handleSkillClick(){
        if(characterData){
            console.log(skillNameList[rowIndex][colIndex])
            // console.log(`2d6<=${getAchievementValue(hoge, fuga)} 【${fugaName}(判定: ${hogeName})】`)
        }
    }

    return (
        <td
        style={
                Object.assign(
                    {
                        backgroundColor: getSkillBackgroundColor(),
                        color: getSkillTextColor()
                    },
                    getBorderStyle(rowIndex, colIndex)
                )
            }
            onContextMenu={(event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
                event.preventDefault();
                handleMouseClick(2);
                return false;
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseDown={() => {
                setIsClicked(true)
            }}
            onMouseUp={() => setIsClicked(false)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsClicked(false);
            }}
            onClick={() => handleMouseClick(0)}
        >
            {skillName}
        </td>
    );
};