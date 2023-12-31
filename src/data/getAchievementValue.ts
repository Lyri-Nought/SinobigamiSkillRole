export const skillNameList: string[][] = [
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

export const fieldNameList: string[] = ["器術", "体術", "忍術", "謀術", "戦術", "妖術"]

export type SkillCoordinate = {
    row: number; // 0~10
    column: number; // 0~5
}

// 達成値を求める関数
export function getAchievementValue(learnedSkill: SkillCoordinate, targetSkill: SkillCoordinate, gaps: boolean[], makaiKogaku: boolean, mokuren: boolean, yori: boolean): number{
    const initialValue = 5;
    let result: number = 0;
    function getColDistance(): number{
        // 横の距離(列間の距離)を求める
        let colDistance: number = 0;
        colDistance = Math.abs(learnedSkill.column - targetSkill.column);
        // ギャップの数を求める
        const left: number = (learnedSkill.column > targetSkill.column) ? targetSkill.column : learnedSkill.column;
        const right: number = (left === learnedSkill.column) ? targetSkill.column : learnedSkill.column;
        for(let i: number = left; i < right; i++){
            if(!gaps[i]) colDistance++;
        }
        if(makaiKogaku){
            // 魔界工学習得時、反対方向も確認する
            let tempColDistance = 1;
            for (let j = 0; j < left; j++){
                // 習得特技から左端までの距離を計算する
                tempColDistance++;
                if (!gaps[j]) {
                    tempColDistance++;
                }
            }
            for (let j = right; j < 5; j++) {
                // 右端から判定特技までの距離を計算する
                tempColDistance++;
                if (!gaps[j]) {
                    tempColDistance++;
                }
            }

            // 小さい方を距離とする。
            if (tempColDistance < colDistance) {
                colDistance = tempColDistance;
            }
        }
        return colDistance;
    }
    function getRowDistance(): number{
        // 縦の距離(行間の距離)を求める
        let rowDistance: number = 0;
        rowDistance = Math.abs(learnedSkill.row - targetSkill.row);
        if(mokuren){
		    // 木蓮習得時、反対方法も確認する
            let tempRowDistance: number = 0;
            if (learnedSkill.row > targetSkill.row) {
                tempRowDistance = targetSkill.row + (11 - learnedSkill.row);
            } else {
                tempRowDistance = learnedSkill.row + (11 - targetSkill.row);
            }
            // 小さい方を距離とする
            if (tempRowDistance < rowDistance) {
                rowDistance = tempRowDistance;
            }
        }
        return rowDistance;
    }
    result = initialValue + getRowDistance() + getColDistance();
    if(yori){
        if((learnedSkill.row !== targetSkill.row) && (learnedSkill.column !== targetSkill.column)){
            // 妖理時、指定特技と判定特技が斜めの関係なら達成値-1
            result -= 1;
        }
    }
    return result;
}