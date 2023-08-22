const gaps: boolean[] = [false, false, false, false, false]; // ギャップ(0番目が器術右)
const existField: boolean[] = [true, true, true, true, true, true]; // 分野の生命点が存在するかどうか
const skills: boolean[][] = new Array; // 特技の習得状況表
for(let i: number = 0; i<11; i++){ // 特技の習得状況を初期化
    const newRow: boolean[] = new Array;
    for(let j: number = 0; j<6; j++){
        newRow.push(false);
    }
    skills.push(newRow);
}
let makaiKogaku: boolean = false; // 魔界工学(左右を繋げる)
let mokuren: boolean = false; // 木蓮(上下を繋げる)
let tatsujin: boolean = false; // 達人(生命力が失われた分野でも判定できる)

const skillNameList: string[][] = [
    ["絡繰術", "騎乗術", "生存術", "医術", "兵糧術", "異形化"],
    ["火術", "砲術", "潜伏術", "毒術", "鳥獣術", "召喚術"],
    ["水術", "手裏剣術", "遁走術", "罠術", "野戦術", "死霊術"],
    ["針術", "手練", "盗聴術", "調査術", "地の利", "結界術"],
    ["仕込み", "身体操術", "腹話術", "詐術", "意気", "封術"],
    ["衣装術", "歩法", "隠形術", "対人術", "用兵術", "言霊術"],
    ["縄術", "走法", "変装術", "遊芸", "記憶術", "幻術"],
    ["登術", "飛術", "香術", "九ノ一の術", "見敵術", "瞳術"],
    ["拷問術", "骨法術", "分身の術", "傀儡の術", "暗号術", "千里眼の術"],
    ["壊器術", "刀術", "隠蔽術", "流言の術", "伝達術", "憑依術"],
    ["掘削術", "怪力", "第六感", "経済力", "人脈", "呪術"]
]