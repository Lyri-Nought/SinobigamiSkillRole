/* ココフォリアページの要素のクエリの文字列 */

// 入力フォーム
const formQuery: string = "#root > div > div.MuiDrawer-root > div > div form";

// メッセージ入力フォームの送信ボタン
export const submitFormQuery: string = `${formQuery} button[type='submit']`;

// メッセージ入力フォームのメッセージ欄
export const messageFormQuery: string = `${formQuery} > div:nth-child(4) textarea`;