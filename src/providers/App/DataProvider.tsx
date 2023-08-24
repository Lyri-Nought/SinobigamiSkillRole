import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { SkillCoordinate } from "../../data/getAchievementValue"
import { CharacterData } from '../../data/getCharacterData';

export const DataContext = createContext<{
    gaps: boolean[];
    setGaps: React.Dispatch<React.SetStateAction<boolean[]>>;
    skills: SkillCoordinate[];
    setSkills: React.Dispatch<React.SetStateAction<SkillCoordinate[]>>;
    makaiKogaku: boolean;
    setMakaiKogaku: React.Dispatch<React.SetStateAction<boolean>>;
    mokuren: boolean;
    setMokuren: React.Dispatch<React.SetStateAction<boolean>>;
    tatsujin: SkillCoordinate[];
    setTatsujin: React.Dispatch<React.SetStateAction<SkillCoordinate[]>>;
    yori: SkillCoordinate[];
    setYori: React.Dispatch<React.SetStateAction<SkillCoordinate[]>>;
} | null>(null)

export function DataProvider({children}: {children: ReactNode}){
    const [gaps, setGaps] = useState<boolean[]>([false, false, false, false, false]);
    const [skills, setSkills] = useState<SkillCoordinate[]>([]);
    const [makaiKogaku, setMakaiKogaku] = useState<boolean>(false);
    const [mokuren, setMokuren] = useState<boolean>(false);
    const [tatsujin, setTatsujin] = useState<SkillCoordinate[]>([]);
    const [yori, setYori] = useState<SkillCoordinate[]>([]);

    return (
        <DataContext.Provider value={{
            gaps,
            setGaps,
            skills,
            setSkills,
            makaiKogaku,
            setMakaiKogaku,
            mokuren,
            setMokuren,
            tatsujin,
            setTatsujin,
            yori,
            setYori
        }}>
            {children}
        </DataContext.Provider>
    );
}