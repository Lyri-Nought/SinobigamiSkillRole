import React from 'react';
import { useState, useEffect, useRef } from "react";
import {
    KeyKind,
    defaultOpenKey,
    defaultCopyKey,
    defaultPasteKey,
    getKeyConfigInStorage,
    setKeyConfigInStorage
} from "./../../data/fetchKeyConfig"

export default function Popup() {
    // キーコンフィグの設定データ
    const [openKey, setOpenKey] = useState<string>(defaultOpenKey);
    const [copyKey, setCopyKey] = useState<string>(defaultCopyKey);
    const [pasteKey, setPasteKey] = useState<string>(defaultPasteKey);
    const [accept, setAccept] = useState<"" | KeyKind>(""); // キーボード入力の受け付け
    const acceptRef = useRef<"" | KeyKind>("");
    acceptRef.current = accept;

    function changeAccept(keyKind: "" | KeyKind): void{
        if(accept === ""){
            setAccept(keyKind);
        }else{
            setAccept("");
        }
    }

    // Stateをchrome.storage.localのデータで初期化する
    useEffect(() => {
        getKeyConfigInStorage("openKey").then((response) => {
            setOpenKey(response)
        })
        getKeyConfigInStorage("copyKey").then((response) => {
            setCopyKey(response)
        })
        getKeyConfigInStorage("pasteKey").then((response) => {
            setPasteKey(response)
        })
    }, []);

    useEffect(() => {
        // イベントリスナーを登録
        window.addEventListener("keydown", getKeyboardInput);
    }, []);

    // // キーボード入力を取得し、キーコンフィグとして保存する関数
    function getKeyboardInput(event: KeyboardEvent): void{
        if(acceptRef.current === "") return;
        const inputKey: string = event.key;
        switch(acceptRef.current){
            case "openKey":
                setOpenKey(inputKey);
                break;
            case "copyKey":
                setCopyKey(inputKey);
                break;
            case "pasteKey":
                setPasteKey(inputKey);
                break;
        }
        setKeyConfigInStorage(acceptRef.current as KeyKind, inputKey);
        setAccept("");
    }

    // キーコンフィグを初期化する関数
    function initializeKeyConfig(): void{
        setAccept("");
        setOpenKey("a");
        setKeyConfigInStorage("openKey", "a");
        setCopyKey("c");
        setKeyConfigInStorage("copyKey", "c");
        setPasteKey("v");
        setKeyConfigInStorage("pasteKey", "v");
    }

    return (
        <div className="App" >
            <h3>シノビガミ特技判定ツール&nbsp;キーコンフィグ</h3>
            <table>
                <tr>
                    <td>特技判定ツールを開く/閉じる(ココフォリア)</td>
                    <td>Alt&nbsp;+&nbsp;"{openKey}"</td>
                    <td>
                        <button onClick={() => changeAccept("openKey")}>
                            {(accept === "openKey") ? "変更中…" : "変更する"}
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>特技設定をコピーする(シノビガミ&nbsp;キャラクター登録サイト)</td>
                    <td>Alt&nbsp;+&nbsp;"{copyKey}"</td>
                    <td>
                        <button onClick={() => changeAccept("copyKey")}>
                            {(accept === "copyKey") ? "変更中…" : "変更する"}
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>特技設定を貼り付ける(ココフォリア)</td>
                    <td>Alt&nbsp;+&nbsp;"{pasteKey}"</td>
                    <td>
                        <button onClick={() => changeAccept("pasteKey")}>
                            {(accept === "pasteKey") ? "変更中…" : "変更する"}
                        </button>
                    </td>
                </tr>
            </table>
            <button style={{textAlign: "right"}} onClick={initializeKeyConfig}>初期設定に戻す</button>
        </div>
    );
}