console.log("hello");
let minigame = new MiniGame();
let gacha = new Gacha();

function MiniGameStart() {
    console.log("MiniGameStart");
    minigame.start();
    let isRight = minigame.check();
    console.log(`isRight: ${isRight}`);
    if (isRight) {
        gacha.up_rarity(12.0)
    }
    
    gacha.start();
    gacha.rotate();
    gacha.discharge();
}










