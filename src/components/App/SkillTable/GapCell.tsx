import React, { useContext } from 'react';
import { BorderStyle } from "./SkillTable"
import { DataContext, DataProviderType } from '../../../providers/App/DataProvider';

export default function GapCell(
    {
        rowIndex, colIndex,
        mouseGapHover, setMouseGapHover,
        mouseGapClick, setMouseGapClick,
        getBorderStyle,
        getBackgroundColor
    }: {
        rowIndex: number;
        colIndex: number;
        mouseGapHover: number | null;
        setMouseGapHover: React.Dispatch<React.SetStateAction<number | null>>;
        mouseGapClick: number | null;
        setMouseGapClick: React.Dispatch<React.SetStateAction<number | null>>;
        getBorderStyle: (row: number, col: number) => BorderStyle;
        getBackgroundColor: (isAble: boolean, isHovered: boolean, isClicked: boolean) => string;
    }
){
    const gapWidth: string = "1rem";
    const characterData = useContext<DataProviderType | null>(DataContext);

    // ギャップ欄の背景色を取得する処理
    function getGapBackgroundColor(): string{
        let isAble: boolean = false;
        if(characterData){
            if(0 < colIndex){
                const gapIndex: number = colIndex - 1;
                isAble = characterData.gaps[gapIndex];
            }else{
                isAble = characterData.makaiKogaku;
            }
        }
        return getBackgroundColor(
            isAble,
            (mouseGapHover === colIndex),
            (mouseGapClick === colIndex)
        )
    }

    // ギャップ欄をクリックしたときの処理
    function handleMouseClick(event: React.MouseEvent<HTMLTableCellElement, MouseEvent>){
        if(characterData){
            const gapIndex: number = colIndex - 1;
            if(0 <= gapIndex){
                    characterData.setGaps((prev) => {
                        const newGaps = [...prev];
                        newGaps[gapIndex] = !prev[gapIndex];
                        return newGaps;
                    })
            }else{
                characterData.setMakaiKogaku((prev) => !prev);
            }
        }
    }

    return (
        <td
            style={
                Object.assign(
                    {
                        width: gapWidth,
                        backgroundColor: getGapBackgroundColor()
                    },
                    getBorderStyle(rowIndex, colIndex)
                )
            }
            onContextMenu={(event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
                event.preventDefault();
                handleMouseClick(event);
                return false;
            }}
            onMouseEnter={() => setMouseGapHover(colIndex)}
            onMouseDown={() => {
                setMouseGapClick(colIndex)
            }}
            onMouseUp={() => setMouseGapClick(null)}
            onMouseLeave={() => {
                setMouseGapHover(null);
                setMouseGapClick(null);
            }}
            onClick={handleMouseClick}
        />
    );
};