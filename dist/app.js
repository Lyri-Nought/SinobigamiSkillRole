(()=>{"use strict";function e(){for(var e=new Array,n=0;n<11;n++)for(var t=0;t<6;t++){var o=document.querySelector("#skills\\.row".concat(n," > td:nth-child(").concat(2*t+2,")"));if(null==o?void 0:o.classList.contains("selected")){var r={row:n,column:t};e.push(r)}}return e}function n(e){var n=!1,t=document.querySelector("#ninpou > tbody"),o=null==t?void 0:t.querySelectorAll("tr");if(null==o?void 0:o.length)for(var r=0;r<(null==o?void 0:o.length);r++)o[r].querySelectorAll("input")[2].value===e&&(n=!0);return n}function t(e){var n=!1,t=document.querySelector(e);return(null==t?void 0:t.checked)&&(n=!0),n}location.hostname+location.pathname==="character-sheets.appspot.com/shinobigami/edit.html"&&function(e){return n=this,t=void 0,r=function(){return function(e,n){var t,o,r,i,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(c){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(l=0)),l;)try{if(t=1,o&&(r=2&a[0]?o.return:a[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return l.label++,{value:a[1],done:!1};case 5:l.label++,o=a[1],a=[0];continue;case 7:a=l.ops.pop(),l.trys.pop();continue;default:if(!((r=(r=l.trys).length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){l=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){l.label=a[1];break}if(6===a[0]&&l.label<r[1]){l.label=r[1],r=a;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(a);break}r[2]&&l.ops.pop(),l.trys.pop();continue}a=n.call(e,l)}catch(e){a=[6,e],o=0}finally{t=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}}(this,(function(n){return[2,new Promise((function(n,t){chrome.storage.local.get(["keyConfig"],(function(t){var o,r=null===(o=t.keyConfig)||void 0===o?void 0:o[e];if(void 0===r)switch(e){case"openKey":n("a");break;case"copyKey":n("c");break;case"pasteKey":n("v")}else n(r)}))}))]}))},new((o=void 0)||(o=Promise))((function(e,i){function l(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(n){var t;n.done?e(n.value):(t=n.value,t instanceof o?t:new o((function(e){e(t)}))).then(l,a)}c((r=r.apply(n,t||[])).next())}));var n,t,o,r}("copyKey").then((function(o){var r=o;document.addEventListener("keydown",(function(o){console.log("done"),o.altKey&&o.key===r&&function(){if(document.querySelector("#skills\\.row0 > td:nth-child(2)")){var o={gaps:[],skills:e(),makaiKogaku:t("#skills\\.f"),mokuren:t("#skills\\.outRow"),tatsujin:n("達人")},r=JSON.stringify(o);navigator.clipboard&&(navigator.clipboard.writeText(r),window.alert("キャラクターの習得特技をクリップボードにコピーしました。"))}else window.alert("キャラクターの習得特技を取得できませんでした。\nキャラクターシート上で実行してください。")}()})),console.log("copy:",r)}))})();