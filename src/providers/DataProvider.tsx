import React, { createContext, useState, useEffect, ReactNode } from 'react';

export const DataContext = createContext<[ChatPalette[][], React.Dispatch<React.SetStateAction<ChatPalette[][]>>] | null>(null)

export function DataProvider({children}: {children: ReactNode}){
    const [chatPalettes, setChatPalettes] = useState<ChatPalette[][]>([]);

    useEffect(() => {
        (async() => {
            const response: ChatPalette[][] = await getChatPalettes()
            setChatPalettes(response)
        })()
    }, []);

    return (
        <DataContext.Provider value={[chatPalettes, setChatPalettes]}>
            {children}
        </DataContext.Provider>
    );
}