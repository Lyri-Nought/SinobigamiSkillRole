import React, { useState, useEffect, useContext, useRef } from 'react';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import Header from "./Header"
import Option from "./Option"
import SkillTable from "./SkillTable/SkillTable"
import DetailedView from "./DetailedView/DetailedView"
import { getKeyConfigInStorage } from "../../data/fetchKeyConfig"
import { DataContext, DataProviderType } from '../../providers/App/DataProvider';
import { SkillCoordinate } from '../../data/getAchievementValue';

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
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'black', // 背景色を黒に設定
                    color: 'white', // テキスト色を白に設定（任意の色）
                },
            },
        },
    },
});

export default function App(){
    const characterData = useContext<DataProviderType | null>(DataContext);

    const [isVisible, setIsVisible] = useState<boolean>(false); // 表示中かどうか
    const [selecting, setSelecting] = useState<number>(0); // 選択中のモード 0が特技設定, 1が妖理設定, 2が達人設定
    const [isDetailedView , setIsDetailedView] = useState<boolean>(false); // 詳細表示モードがonになっているかどうか
    const [targetSkill , setTargetSkill] = useState<SkillCoordinate | null>(null); // 左クリックでロール用に選択している特技

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
    const [width, setWidth] = useState<number>(580.250);
    const [height, setHeight] = useState<number>(425);
    const skillTableRef = useRef<HTMLTableElement>(null);

    // キーボード入力を受け取った際の処理
    function handleKeyDown(event: KeyboardEvent){
        // 開く/閉じるキーが押された際の処理
        getKeyConfigInStorage("openKey").then((openKey) => {
            if (event.altKey && event.key === openKey) {
                setIsVisible((prev) => !prev);
            }else{
                // キャラシ貼り付けキーが押された際の処理
                getKeyConfigInStorage("pasteKey").then((pasteKey) => {
                    if (event.altKey && event.key === pasteKey) {
                        if(characterData){
                            characterData.readDataFromClipBoard().then((readSuccess: boolean) => {
                                if(!readSuccess){
                                    window.alert("クリップボードからの特技データ読み込みに失敗しました");
                                }
                            });
                        }
                    }
                })
            }
        });
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
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <Option
                                        isDetailedView={isDetailedView}
                                        setIsDetailedView={setIsDetailedView}
                                        selecting={selecting}
                                        setSelecting={setSelecting}
                                    />
                                    <SkillTable
                                        skillTableRef={skillTableRef}
                                        isDetailedView={isDetailedView}
                                        selecting={selecting}
                                        setTargetSkill={setTargetSkill}
                                    />
                                </div>
                                <DetailedView
                                    isDetailedView={isDetailedView}
                                    targetSkill={targetSkill}
                                />
                            </div>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </div>
    );
};