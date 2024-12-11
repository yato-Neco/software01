console.log("hello");
let minigame = new MiniGame();
let gacha = new Gacha();
localStorage.setItem("name", "あ");

function MiniGameStart() {
    console.log("MiniGameStart");
    minigame.start();
    let isRight = minigame.check();
    console.log(`isRight: ${isRight}`);
    if (isRight) {
    }

    gacha.start();
    gacha.rotate();
    gacha.discharge();
}

function Test0() {
    console.log(localStorage.getItem("name"));
}

function Test1() {
    localStorage.setItem("name", "a");
    console.log(localStorage.getItem("name"));
}
function lot() {
    const data = {
        "SSR": 30,
        "SR": 40,
    };
    const rand = Math.floor(Math.random() * 100);
    let result = "ノーマル";
    let rate = 0;
    for (const prop in data) {
        rate += data[prop];
        if (rand <= rate) {
            result = prop;
            break;
        }
    }
    return result;
   
}

console.log(lot());
