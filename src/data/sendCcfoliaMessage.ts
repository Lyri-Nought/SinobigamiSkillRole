import { messageFormQuery, submitFormQuery } from "./documentQueries";

function clearFormValue(element: HTMLInputElement|HTMLTextAreaElement) :void{ // フォームのinput要素等の既存の入力内容を削除する関数
    const valueLength: number = element.value.length
    element.focus()
    document.execCommand("selectAll", false);
    document.execCommand("removeFormat", false);
}

function addFormValue(element: HTMLInputElement|HTMLTextAreaElement, value: string): void{ // フォームのinput要素等に内容を入力する関数
    element.focus()
    document.execCommand('insertText', false, value);
}

function overrideFormValue(element: HTMLInputElement|HTMLTextAreaElement, value: string): void{ // フォームのinput要素等の内容を上書きする関数
    clearFormValue(element)
    addFormValue(element, value)
}

function clickTheButton(element: HTMLButtonElement){ // 特定のbutton要素をプログラムで押下する関数
    element.click()
}

export function changeMessage(messageText: string, isDo: boolean = true): boolean { // メッセージを変更する関数
    const messageElm = document.querySelector<HTMLTextAreaElement>(messageFormQuery) as HTMLTextAreaElement;
    if (messageElm?.value !== messageText) {
        if(isDo) overrideFormValue(messageElm, messageText);
        return true;
    }else{
        return false;
    }
}

export function clickSubmitButton(){ // 送信ボタンを押下して送信する関数
    const submitButton: HTMLButtonElement = document.querySelector(submitFormQuery) as HTMLButtonElement
    clickTheButton(submitButton)
}

// ダブルクリックでココフォリアのメッセージを送信する関数
export function sendCcfoliaMessage(text: string){
    const isChangedMessage: boolean = changeMessage(text); // メッセージを変更する
    if(!isChangedMessage){
        // メッセージに変更なければ送信する
        clickSubmitButton();
    }
}
