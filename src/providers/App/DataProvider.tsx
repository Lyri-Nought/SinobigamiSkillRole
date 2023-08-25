import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { SkillCoordinate } from "../../data/getAchievementValue"
import { CharacterData } from '../../data/getCharacterData';

export type DataProviderType = {
    gaps: boolean[];
    setGaps: React.Dispatch<React.SetStateAction<boolean[]>>;
    fields: boolean[];
    setFields: React.Dispatch<React.SetStateAction<boolean[]>>;
    skills: boolean[][];
    setSkills: React.Dispatch<React.SetStateAction<boolean[][]>>;
    makaiKogaku: boolean;
    setMakaiKogaku: React.Dispatch<React.SetStateAction<boolean>>;
    mokuren: boolean;
    setMokuren: React.Dispatch<React.SetStateAction<boolean>>;
    tatsujin: boolean[][];
    setTatsujin: React.Dispatch<React.SetStateAction<boolean[][]>>;
    yori: boolean[][];
    setYori: React.Dispatch<React.SetStateAction<boolean[][]>>;
}

export const DataContext = createContext<DataProviderType | null>(null)

const skillTable: boolean[][] = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false]
]

// boolean型の二次元配列をトグルで切り替える関数
export function toggleSkillTable(setFunc: React.Dispatch<React.SetStateAction<boolean[][]>>, rowIndex: number, colIndex: number): void{
    setFunc((prev) => {
        const newArray: boolean[][] = prev.concat();
        newArray[rowIndex][colIndex] = !prev[rowIndex][colIndex];
        return newArray;
    });
}

export function DataProvider({children}: {children: ReactNode}){
    const [gaps, setGaps] = useState<boolean[]>([false, false, false, false, false]);
    const [fields, setFields] = useState<boolean[]>([true, true, true, true, true, true]);
    const [skills, setSkills] = useState<boolean[][]>(skillTable.concat());
    const [makaiKogaku, setMakaiKogaku] = useState<boolean>(false);
    const [mokuren, setMokuren] = useState<boolean>(false);
    const [tatsujin, setTatsujin] = useState<boolean[][]>(skillTable.concat());
    const [yori, setYori] = useState<boolean[][]>(skillTable.concat());

    return (
        <DataContext.Provider value={{
            gaps, setGaps,
            fields, setFields,
            skills, setSkills,
            makaiKogaku, setMakaiKogaku,
            mokuren, setMokuren,
            tatsujin, setTatsujin,
            yori, setYori
        }}>
            {children}
        </DataContext.Provider>
    );
}