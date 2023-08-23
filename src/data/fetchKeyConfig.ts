export type KeyKind = "openKey" | "copyKey" | "pasteKey";

export const defaultOpenKey: string = "a";
export const defaultCopyKey: string = "c";
export const defaultPasteKey: string = "v";

// chrome.storage.localからキーコンフィグの設定データを取得する関数
export async function getKeyConfigInStorage(keyKind: KeyKind): Promise<string>{
    return new Promise<string>((resolve, reject) => {
        chrome.storage.local.get(["keyConfig"], function(response){
            const key: string = response.keyConfig?.[keyKind];
            if(key === undefined){
                switch(keyKind){
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
export async function setKeyConfigInStorage(keyKind: KeyKind, key: string): Promise<void>{
    return new Promise<void>((resolve, reject) => {
        chrome.storage.local.get(["keyConfig"], function(response){
            const newData = {
                keyConfig: {
                    [keyKind]: key
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

export function getAllData(): void{
    chrome.storage.local.get(function(result) {
        console.log(result);
    });
}

export function clearData(): void{
    chrome.storage.local.clear();
}