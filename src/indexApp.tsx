import { getKeyConfigInStorage } from "./data/fetchKeyConfig"
import { copyCharacterDataToClipboard } from "./data/getCharacterData"

if(location.hostname + location.pathname === "character-sheets.appspot.com/shinobigami/edit.html"){
    // シノビガミキャラクター登録サイト上の処理
    getKeyConfigInStorage("copyKey").then((response: string) => {
        const copyKey: string = response;
        document.addEventListener("keydown", copyWithKey);
        function copyWithKey(event: KeyboardEvent){
            console.log("done")
            if(event.altKey && event.key === copyKey){
                copyCharacterDataToClipboard();
            }
        }
        console.log("copy:", copyKey)
    })
}else{
    // ココフォリア上の処理
}