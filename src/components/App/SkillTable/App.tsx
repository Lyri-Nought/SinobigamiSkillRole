import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import Header from "../Header"
import Option from "../Option"
import SkillTable from "./SkillTable"
import { getKeyConfigInStorage } from "../../../data/fetchKeyConfig"

// TODO Helpボタン
// TODO 詳細表示

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff" // プライマリーカラーを白色に設定
        },
        secondary: {
            main: "rgba(0,0,0,0)" // セカンダリーカラーを無色に設定
        },
        info: {
            main: "#2196f3"
        }
    },
    typography: {
        button: {
            textTransform: "none",
            fontWeight: 'bold'
        },
    },
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'white', // 非アクティブ時のカラーを白に設定
                },
            },
        },
    },
});

export default function App(){
    const [isVisible, setIsVisible] = useState<boolean>(false); // 表示中かどうか
    const [selecting, setSelecting] = useState<number>(0); // 選択中のモード 0が特技設定, 1が妖理設定, 2が達人設定
    const [isDetailedView , setIsDetailedView] = useState<boolean>(false); // 詳細表示モードがonになっているかどうか
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
    const [width, setWidth] = useState<number>(580.250);
    const [height, setHeight] = useState<number>(425);

    function handleKeyDown(event: KeyboardEvent){
        getKeyConfigInStorage("openKey").then((openKey) => {
            if (event.altKey && event.key === openKey) {
                setIsVisible((prev) => !prev);
            }
        })
    };

    function handleWindowResize(){
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleWindowResize);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <ThemeProvider theme={theme}>
                    <Draggable
                        defaultPosition={{
                            x: (windowWidth - width) / 2,
                            y: -(windowHeight + height) / 2
                        }}
                        bounds={{
                            top: -windowHeight,
                            right: (windowWidth - width),
                            bottom: -height,
                            left: 0
                        }}
                        cancel=".draggable-disable"
                    >
                        <Paper
                            style={{
                                position: "absolute",
                                color: "#fff",
                                backgroundColor: 'rgba(44, 44, 44, 0.87)',
                                borderRadius: "0",
                                minWidth: `${width}px`,
                                minHeight: `${height}px`,
                                userSelect: "none"
                            }}
                            elevation={10}
                        >
                            <Header setIsVisible={setIsVisible}/>
                            <div>
                                <Option
                                    isDetailedView={isDetailedView}
                                    setIsDetailedView={setIsDetailedView}
                                    selecting={selecting}
                                    setSelecting={setSelecting}
                                />
                                <SkillTable
                                    isDetailedView={isDetailedView}
                                    selecting={selecting}
                                    setSelecting={setSelecting}
                                />
                            </div>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </div>
    );
};