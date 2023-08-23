import React, { Key } from 'react';
import { useState, useEffect, useRef } from "react";

export default function Popup() {
    // キーコンフィグの設定データ
    type KeyType = "openKey" | "copyKey" | "pasteKey";
    const defaultOpenKey: string = "a";
    const defaultCopyKey: string = "c";
    const defaultPasteKey: string = "v";
    const [openKey, setOpenKey] = useState<string>(defaultOpenKey);
    const [copyKey, setCopyKey] = useState<string>(defaultCopyKey);
    const [pasteKey, setPasteKey] = useState<string>(defaultPasteKey);
    const [accept, setAccept] = useState<"" | KeyType>(""); // キーボード入力の受け付け
    const acceptRef = useRef<"" | KeyType>("");
    acceptRef.current = accept;

    function changeAccept(keyType: "" | KeyType): void{
        if(accept === ""){
            setAccept(keyType);
        }else{
            setAccept("");
        }
    }

    // chrome.storage.localからキーコンフィグの設定データを取得する関数
    async function getKeyConfigInStorage(keyType: KeyType): Promise<string>{
        return new Promise<string>((resolve, reject) => {
            chrome.storage.local.get(["keyConfig"], function(response){
                const key: string = response.keyConfig?.[keyType];
                if(key === undefined){
                    switch(keyType){
                        case "openKey":
                            resolve("a");
                            break;
                        case "copyKey":
                            resolve("c");
                            break;
                        case "pasteKey":
                            resolve("v");
                            break;
                    }
                }else{
                    resolve(key);
                }
            });
        });
    }

    // chrome.storage.localにキーコンフィグの設定データを保存する関数
    async function setKeyConfigInStorage(keyType: KeyType, key: string): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            chrome.storage.local.get(["keyConfig"], function(response){
                const newData = {
                    keyConfig: {
                        [keyType]: key
                    }
                }
                const mergedData: any = {
                    keyConfig: {
                        ...response.keyConfig,
                        ...newData.keyConfig
                    }
                };
                chrome.storage.local.set(mergedData, function() {
                    resolve();
                });
            });
        });
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
        setKeyConfigInStorage(acceptRef.current as KeyType, inputKey);
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

    function getAllData(): void{
        chrome.storage.local.get(function(result) {
            console.log(result);
        });
    }
    function clearData(): void{
        chrome.storage.local.clear();
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
            <button onClick={getAllData}>getAllData</button>
            <button onClick={clearData}>clearData</button>
        </div>
    );
}