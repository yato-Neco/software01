console.log("hello")
let minigame = new MiniGame();
let gacha = new Gacha();

function MiniGameStart() {
    console.log("MiniGameStart");
    minigame.start();
    let isRight = minigame.check();
    console.log(`isRight: ${isRight}`);
    if (isRight) {
        
    }
    
    gacha.rotate();

    gacha.discharge();


}

