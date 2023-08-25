import React, { useState, useContext } from 'react';
import { DataContext, DataProviderType } from '../../../providers/App/DataProvider';
import { BorderStyle } from "./SkillTable";

type Props = {
    getBackgroundColor: (isAble: boolean, isHovered: boolean, isClicked: boolean) => string;
}

export default function SkillTable({getBackgroundColor}: Props){
    const [isHovered, setIsHovered] = useState<boolean>(false); // 木蓮ギャップ欄のhover処理用State
    const [isClicked, setIsClicked] = useState<boolean>(false); // 木蓮ギャップ欄のclick処理用State
    const characterData = useContext<DataProviderType | null>(DataContext);

    return (
        <tr>
            <td
                style={{
                    backgroundColor: getBackgroundColor((characterData?.mokuren || false), isHovered, isClicked),
                    borderTop: "solid 1px rgb(152, 152, 152)",
                    height: "1rem"
                }}
                colSpan={12}
                onMouseEnter={() => setIsHovered(true)}
                onMouseDown={() => {
                    setIsClicked(true)
                }}
                onMouseUp={() => setIsClicked(false)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsClicked(false);
                }}
                onClick={() => {
                    if(characterData) characterData.setMokuren((prev) => !prev);
                }}
            />
        </tr>
    );
};