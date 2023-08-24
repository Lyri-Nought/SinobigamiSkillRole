import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App/App"
import { getKeyConfigInStorage } from "./data/fetchKeyConfig"
import { copyCharacterDataToClipboard } from "./data/getCharacterData"

function addPortalRoot(): HTMLDivElement{ // ポータルを追加するためのルート要素を作成する関数
    // ポータルを追加するためのルート要素を作成
    const portalRoot = document.createElement('div');
    portalRoot.id = 'portal-root-ShinobigamiSkillRole';
    portalRoot.style.position = "relative";
    portalRoot.style.zIndex = "1204";
    document.body.appendChild(portalRoot);
    return portalRoot;
}

async function renderApp(portal: HTMLDivElement): Promise<void>{ // ポータルにAppコンポーネントを追加する関数
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        portal
    );
}


// 実際の処理
if(location.hostname + location.pathname === "character-sheets.appspot.com/shinobigami/edit.html"){
    // シノビガミキャラクター登録サイト上の処理
    getKeyConfigInStorage("copyKey").then((response: string) => {
        const copyKey: string = response;
        document.addEventListener("keydown", copyWithKey);
        function copyWithKey(event: KeyboardEvent){
            if(event.altKey && event.key === copyKey){
                copyCharacterDataToClipboard();
            }
        }
    })
}else{
    // ココフォリア上の処理
    window.onload = async function(){
        const portal: HTMLDivElement = addPortalRoot();
        renderApp(portal);
    };
}