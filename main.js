let Q = 0;

let flag = true;
//プレイヤーステータス
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = 6;
let plyExpAmari = 0;

let plyImg = document.getElementById("plyImg");
let plySt = new Array(7);
for(let i=0; i<7; i++){
    plySt[i] = document.getElementById("plySt"+i);
}

let name = prompt("プレイヤー名");
plySt0.textContent = name;
let stT = new Date();

//プレイヤーイベント
plyImg.addEventListener("mousedown", () => {
    if(flag == true){
        plyImg.src = "img/playerC.png";
        plyHp = plyHp + plyHeal;
        if(plyHp > plyHpMax){
            plyHp = plyHpMax;
        }
        plySt2.textContent = "HP:" + plyHp;
    }
});
plyImg.addEventListener("mouseup", () => {
    if(flag == true){
        plyImg.src = "img/playerA.png";
    }
});

//敵ステータス
let eneName = ["スライム","コウモリ","ネズミ","ヘビ","オオカミ","ゴブリン","ゴースト","ゾンビ","ヒノタマ","クマ(ボス)"];
let eneLv = [1,3,5,7,9,11,13,15,18,20];
let eneHp = [10,30,60,100,150,200,250,300,400,500];
let eneHpMax = [10,30,60,100,150,200,250,300,400,500];
let eneAtt = [2,6,8,10,12,15,18,21,25,30];
let eneKill = [0,0,0,0,0,0,0,0,0,0];
let eneCnt = 5;
let eneCntMax = 5;
let eneExp = [1,5,8,12,16,20,24,28,33,38];

let eneImg = document.getElementById("eneImg");
let eneSt = new Array(5);
for(let j = 0; j<5; j++){
    eneSt[j] = document.getElementById("eneSt"+j);
}

//敵イベント
eneImg.addEventListener("mousedown", () => {
    if(flag == true){
        eneImg.src = "img/enemyB" +Q+ ".png";
    }
});
eneImg.addEventListener("mouseup", () => {
    if(flag == true){
        eneImg.src = "img/enemyA"+Q+".png";
        if(eneHp[Q] > 0) {
            eneHp[Q] = eneHp[Q] - plyAtt;
        } else {
            if(eneHp[Q] <= 0 && Q == 9){
                flag = false;
                etT = new Date();
                eneSec.textContent = "ゲームクリア！" + "クリアタイム:"+(etT-stT)/1000+"秒";
            } else {
                if(flag == true){
                    eneHp[Q] = eneHpMax[Q];
                    //経験値
                    plyExp = plyExp + eneExp[Q];
                    plySt5.textContent = "経験値:"+plyExp;
                    plyExpNext = plyExpNext - eneExp[Q];
                }
                //レベルアップ
                if(plyExpNext <= 0 && flag == true){
                    plyLv++;
                    plySt1.textContent = "レベル:" + plyLv;
                    plyHpMax = plyLv *2 +6;
                    plyExpAmari = plyExpNext;
                    plyExpNeed = plyExpNeed*2;
                    plyExpNext = plyExpNeed + plyExpAmari;
                    plyHp = plyHpMax;
                    plySt2.textContent = "HP:" + plyHpMax;
                    plyAtt++;
                    plySt3.textContent = "攻撃力:" + plyAtt;
                    plyHeal++;
                    plySt4.textContent = "回復魔法:" + plyHeal;
                }
            }
            plySt6.textContent = "次のレベルまでの経験値" +plyExpNext + "ポイント";
        }
        if(eneHp[Q] > 0 && flag == true){
            eneSt2.textContent = "HP:" + eneHp[Q];
        } else {
            eneSt2.textContent = "HP:" + 0;
        }
    }
});

//敵が攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
    if(eneCnt > 0 && flag == true) {
        eneCnt--;
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt +"秒";
    } else {
        if(flag == true){
            plyImg.src = "img/playerB.png";
            plyHp = plyHp - eneAtt[Q];
        }
        if(plyHp > 0 && flag == true) {
            plySt2.textContent = "HP:" + plyHp;
            eneSec.textContent = "モンスターの攻撃まで" + eneCnt +"秒";
        } else {
            if(flag == true){
                plyHp = 0;
                plySt2.textContent = "HP:" + plyHp;
                clearInterval(loop);
                flag = false;
                eneSec.textContent = "ゲームオーバー";
            }
        }
        setTimeout(() => {
            if(flag == true){
                eneCnt = eneCntMax;
                plyImg.src = "img/playerA.png";
                eneSec.textContent = "モンスターの攻撃まで" + eneCnt +"秒";
            }
        },500);
    }
},1000);

//次のモンスターへ
let right = document.getElementById("right");
right.addEventListener("mouseup", () => {
    if(Q<9 && flag == true){
        Q++;
    }
    if(Q < 10 && flag == true){
        eneImg.src = "img/enemyA" +Q+ ".png";
        eneSt0.textContent = eneName[Q];
        eneSt1.textContent = "レベル:"+eneLv[Q];
        eneSt2.textContent = "HP:"+eneHpMax[Q];
        eneSt3.textContent = "攻撃力:"+eneAtt[Q];
        eneSt4.textContent = "獲得経験値:"+eneExp[Q];
        eneCnt = eneCntMax;
    }
})

//前のモンスターへ
let left = document.getElementById("left");
left.addEventListener("mouseup", () => {
    if(Q>0 && flag == true){
        Q--;
    }
    if(Q >= 0 && flag == true){
        eneImg.src = "img/enemyA" +Q+ ".png";
        eneSt0.textContent = eneName[Q];
        eneSt1.textContent = "レベル:"+eneLv[Q];
        eneSt2.textContent = "HP:"+eneHpMax[Q];
        eneSt3.textContent = "攻撃力:"+eneAtt[Q];
        eneSt4.textContent = "獲得経験値:"+eneExp[Q];
        eneCnt = eneCntMax;
    }
})