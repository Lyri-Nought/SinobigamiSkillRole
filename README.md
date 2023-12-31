# シノビガミ特技判定ツール
## 概要
「シノビガミ特技判定ツール」では、ココフォリア上でのシノビガミの特技判定を行うことができます。  
習得特技情報を入力すると、自動で達成値を計算して、判定をメッセージとして送信できます。
## できること
### ココフォリア上での特技判定
#### 特技判定ツールを開く
「特技判定ツールを開く」キー(デフォルトではAlt+A)を押して、特技判定ツールを開きます。  
すると、以下のようなメニューが開きます。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/363e25de-7fbf-4d07-be3d-75624d986fbe)
#### 特技習得情報を設定する
特技判定ツールを開いたら、特技リストからキャラクターが習得している特技を右クリックします。  
すると、以下のように右クリックした特技の背景色が白くなります。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/ba4df68c-7a64-4e1f-b06d-cf0fa0b7bc38)  
これで特技は設定完了です。  
#### ギャップを有効化する
ギャップを塗りつぶすには、ギャップ部分にカーソルを合わせてクリックします。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/e5656272-ae5e-4ea0-b632-e7982440c813)  
【魔界工学】で「器術」の分野と「妖術」の分野を繋がっているものとして扱いたい場合は、器術左のギャップをクリックして塗りつぶします。  
画面上部の「魔界工学」のチェックボックスをクリックしてチェックを入れることでも塗りつぶすことができます。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/7b2b67d8-1423-41ee-bc17-8f9754523938)  
【木蓮】で特技リストの2の欄(最上段)と12の欄(最下段)を繋がっているものとして扱いたい場合は、13の欄(最下段の更に下)をクリックして塗りつぶします。  
画面上部の「木蓮」のチェックボックスをクリックしてチェックを入れることでも塗りつぶすことができます。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/a4b9322f-51b6-4cf7-ba92-f81282c900cf)  
#### 判定を行う
達成値を計算して判定ロールを行うには、特技リストから指定特技を左クリックします。  
すると、習得状態に設定された特技の中から、指定特技の達成値が一番低いものを代用特技として判定を行います。  
一度左クリックすると、ココフォリア画面右下のメッセージ欄に判定ロール用のテキストが入力されます。もう一度同じ特技を左クリックすると、入力されたテキストが送信されます。  
(チャットパレットと同じ仕様です)  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/20ab8009-d59b-456d-9c64-6d3db00f1681)  
ただし、【生命力】に対応した分野が削れている場合、その分野の【達人】が適用されていない特技は判定対象として指定されません。  
#### 【生命力】と【達人】の設定
「器術」や「妖術」などのチェックボックスのチェックを外すことで、【生命力】に対応した分野が削れた状態にすることができます。  
【生命力】が削れた分野の特技は習得していないものとして扱うため、特技として使用できません。  
そのため、【生命力】が削れた分野の特技は、左クリックで指定特技を左クリックした際の判定特技として使用されません。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/8caab812-b9b3-4632-9d83-d34ad0718e76)  
【達人】で特技を指定して、【生命力】を失ってその分野の特技が使用不可になっても特技を使用可能にしたい場合は、「達人」ボタンをクリックします。  
「達人」ボタンをクリックして「【達人】設定モード」を有効にし、"達人"の文字が青色になったら、特技リストから特技をクリックします。  
クリックした特技に青枠がついたら、達人の設定は完了です。「達人」ボタンをもう一度クリックして「【達人】設定モード」を無効にし、"達人"の文字を白色に戻しておきます。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/28fe927e-fa7a-41aa-b967-512a32ab1897)
#### 【妖理】の設定
【妖理】で特技を指定して、指定した特技から最初の1マスだけ斜めに移動して「特技の代用」を行えるようにするには、「妖理」ボタンをクリックします。  
「妖理」ボタンをクリックして「【妖理】設定モード」を有効にし、"妖理"の文字が青色になったら、特技リストから特技をクリックします。  
クリックした特技が青文字になったら、妖理の設定は完了です。「妖理」ボタンをもう一度クリックして「【妖理】設定モード」を無効にし、"妖理"の文字を白色に戻しておきます。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/94fd6479-4fbd-4a36-84d6-f4bb971ee2c1)
#### 詳細表示
「▶」ボタンを押して、詳細表示メニューを開きます。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/361c949a-e029-40c2-9ee7-8cfea91239e9)  
詳細表示メニューを開いた状態で指定特技を左クリックすると、習得状態に設定している特技の達成値を一覧表示できます。  
習得特技名が青文字になっているものが、達成値が一番低い特技です。  
詳細表示メニュー内の特技一覧から特技欄をクリックすることで、その特技で判定ロールを行うことができます。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/a0d01efe-7e0b-4bf2-9647-e362a886aa22)
### キャラクターシートから習得特技情報を取得する
#### キャラクターシートから習得特技情報をコピーする
[シノビガミ キャラクター登録サイト](https://character-sheets.appspot.com/shinobigami/)から習得特技情報をコピーすることができます。  
まずは、キャラクター登録サイトからキャラクターシートを開きます。  
そして、「特技設定をコピーする」キー(デフォルトではAlt+C)を押すと、クリップボードにキャラクターデータがコピーされます。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/94cbf258-e9cc-4868-b49e-a3b52e8ce778)  
また、【達人】や【妖理】については、「忍法名(対象特技名)」のような形式で忍法欄に記入しておくと、設定情報をコピーできます。(例えば、「達人(掘削術)」や「妖理(身体操術)」など)  
#### コピーした習得特技情報を貼り付ける
クリップボードにキャラクターデータをコピーしたら、コピーしたデータをココフォリア上で特技判定ツールに貼り付けます。  
「特技設定を貼り付ける」キー(デフォルトではAlt+V)を押すと、クリップボードにコピーした習得特技の設定を、特技判定ツールに反映することができます。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/a5a0447f-cbaf-406b-a05d-79d3b154b68d)
### キーコンフィグを変更する
拡張機能のポップアップからキーコンフィグを変更することができます。  
まず、Chrome画面右上(アドレスバーの右隣)から「拡張機能![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/6fa72800-168a-4dde-8651-445bd8b900bd)」ボタンをクリックします。  
次に、「シノビガミ特技判定ツール」をクリックします。  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/5521e7e5-52b5-4b5d-9b51-f1c0cb0a6a87)  
変更したい操作(「特技判定ツールを開く/閉じる」など)の右側の「変更する」ボタンを押します。「変更する」ボタンを押したら、設定したいキーを押して設定完了です。  
(「特技判定ツールを開く/閉じる」にQキーを設定したい場合、「変更する」ボタンを押してQキーを押した後、「変更する」ボタン左側に「Alt + "Q"」と表示されていたら設定できています)  
![image](https://github.com/Lyri-Nought/SinobigamiSkillRole/assets/107534447/d7595e64-3915-43e5-b01c-e52dc6e4a036)  
ただし、各操作に割り当てられるコンフィグは、必ず「"Altキー"と"何かしらのキー"の組み合わせ」になります。ご了承ください。
