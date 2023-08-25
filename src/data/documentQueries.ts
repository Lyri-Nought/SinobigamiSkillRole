/* ココフォリアページの要素のクエリの文字列 */

// 入力フォーム
const formQuery: string = "#root > div > div.MuiDrawer-root > div > div > div > form";

// メッセージ入力フォームの送信ボタン
export const submitFormQuery: string = `${formQuery} > div:nth-child(2) > button:nth-of-type(3)`;

// メッセージ入力フォームのメッセージ欄
export const messageFormQuery: string = `${formQuery} > div:nth-child(3) textarea`;