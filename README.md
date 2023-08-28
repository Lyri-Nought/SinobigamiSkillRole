# シノビガミ特技判定ツール
## 概要
「シノビガミ特技判定ツール」では、ココフォリア上でのシノビガミの特技判定を行うことができます。  
習得特技情報を入力すると、自動で達成値を計算して、判定をメッセージとして送信できます。
## できること
### ココフォリア上での特技判定
#### 特技判定ツールを開く
「特技判定ツールを開く」キー(デフォルトではAlt+A)を押して、特技判定ツールを開きます。  
すると、以下のようなメニューが開きます。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/e2fff400-e5fa-48a2-a3e0-44a661a6e3d3)
#### 特技習得情報を設定する
特技判定ツールを開いたら、特技リストからキャラクターが習得している特技を右クリックします。  
すると、以下のように右クリックした特技の背景色が白くなります。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/ddfc847f-d68a-4d6b-9667-52dbdd1309cb)  
これで特技は設定完了です。  
#### ギャップを有効化する
ギャップを塗りつぶすには、ギャップ部分にカーソルを合わせてクリックします。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/52880cb1-d2c6-4236-8cb7-1e6c7dd528af)  
【魔界工学】で「器術」の分野と「妖術」の分野を繋がっているものとして扱いたい場合は、器術左のギャップをクリックして塗りつぶします。  
画面上部の「魔界工学」のチェックボックスにチェックを入れることでも塗りつぶすことができます。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/9ab3727f-dffb-43e0-bcd1-54fac9584b14)  
【木蓮】で特技リストの2の欄(最上段)と12の欄(最下段)を繋がっているものとして扱いたい場合は、13の欄(最下段の更に下)をクリックして塗りつぶします。  
画面上部の「木蓮」のチェックボックスにチェックを入れることでも塗りつぶすことができます。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/6f3b1fe2-5568-4f2e-832f-36f3b48b1ad1)  
#### 判定を行う
達成値を計算して判定ロールを行うには、特技リストから指定特技を左クリックします。  
すると、習得状態に設定された特技の中から、指定特技の達成値が一番低いものを代用特技として判定を行います。  
一度左クリックすると、ココフォリア画面右下のメッセージ欄に判定ロール用のテキストが入力されます。もう一度同じ特技を左クリックすると、入力されたテキストが送信されます。  
(チャットパレットと同じ仕様です)  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/0305fe5d-99c8-4eac-829b-9bb92e2668a6)  
ただし、【生命力】に対応した分野が削れている場合、【達人】が適用されていない特技は代用特技として指定されません。  
#### 【生命力】と【達人】の設定
「器術」や「妖術」などのチェックボックスのチェックを外すことで、【生命力】に対応した分野が削れた状態にすることができます。  
【生命力】が削れた分野の特技は習得していないものとして扱うため、代用特技として使用できません。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/15c5b659-273a-4e81-b1d9-30d4baca2506)  
【達人】で特技を指定して、【生命力】を失ってその分野の特技が使用不可になっても特技を使用可能にしたい場合は、「達人」ボタンを押します。  
「達人」ボタンを押して「【達人】設定モード」を有効にし、"達人"の文字が青色になったら、特技リストから特技をクリックします。  
クリックした特技に青枠がついたら、達人の設定は完了です。「達人」ボタンをもう一度押して「【達人】設定モード」を無効にし、"達人"の文字を白色に戻しておきます。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/7bebca21-6cd5-438b-96ff-dc1dacdf4064)
#### 【妖理】の設定
【妖理】で特技を指定して、指定した特技から最初の1マスだけ斜めに移動して「特技の代用」を行えるようにするには、「妖理」ボタンを押します。  
「妖理」ボタンを押して「【妖理】設定モード」を有効にし、"妖理"の文字が青色になったら、特技リストから特技をクリックします。  
クリックした特技が青文字になったら、妖理の設定は完了です。「妖理」ボタンをもう一度押して「【妖理】設定モード」を無効にし、"妖理"の文字を白色に戻しておきます。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/d177bfc5-2c6b-4bac-bb52-c00222319cdf)
#### 詳細表示
「▶」ボタンを押して、詳細表示メニューを開きます。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/91fcfaae-f96c-45e1-8b3f-5f0da0a9e068)  
詳細表示メニューを開いた状態で指定特技を左クリックすると、習得状態に設定している特技の達成値を一覧表示できます。  
習得特技名が青文字になっているものが、達成値が一番低い特技です。  
詳細表示メニュー内の特技一覧から特技欄をクリックすることで、その特技で判定ロールを行うことができます。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/115fa290-231e-4e1c-95d0-a589269f258c)
### キャラクターシートから習得特技情報を取得する
#### キャラクターシートから習得特技情報をコピーする
[シノビガミ キャラクター登録サイト](http://character-sheets.appspot.com/shinobigami/)から習得特技情報をコピーすることができます。  
まずは、キャラクター登録サイトからキャラクターシートを開きます。  
そして、「特技設定をコピーする」キー(デフォルトではAlt+C)を押すと、クリップボードにキャラクターデータがコピーされます。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/7c6de5d6-bd5f-4a40-980b-5449fcea1b89)  
#### コピーした習得特技情報を貼り付ける
クリップボードにキャラクターデータをコピーしたら、コピーしたデータをココフォリア上で特技判定ツールに貼り付けます。  
「特技設定を貼り付ける」キー(デフォルトではAlt+V)を押すと、クリップボードにコピーした習得特技の設定を、特技判定ツールに反映することができます。  
![image](https://github.com/CA01971172/SinobigamiSkillRole/assets/107534447/a33eb811-72c6-410f-a21d-2d6d6a06100b)  

