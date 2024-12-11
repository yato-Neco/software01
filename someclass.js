class Money {
    constructor() {
        this.money = 0;
        this.input_money = 0;
    }

    check() {
        return this.money
    }
}

class Gacha {
    constructor(rotate_sound,discharge_sound,design) {
        this.money_class = new Money();
        this.rotate_sound = rotate_sound;
        this.discharge_sound = discharge_sound;
        this.rarity_list = null;
        this.design = design;
        this.items = [new Item(),new Item(),new Item(),new Item()];
    }

    
    
    change_design() {
        
    }

    play_rotate_sound() {

    }

    play_discharge_sound() {

    }

    rotate() {
        gacha.play_rotate_sound();

        const gachaImage = document.getElementById('gachagacha');

        gachaImage.classList.toggle('rotated');
    }

    discharge() {
        gacha.play_discharge_sound();

        let item = document.getElementById("item");
        item.src = "./image/capsule_close1_red.png";
        let task;
        let i = 1;

        task = setInterval(() => {
            console.log(`item zoom: ${i}`);

            item.width = "" + 100 * i;
            if (i > 3) {

                
                clearInterval(task);
            }

            i++;
        },1000);



    }
}

class Item {
    image = "";
    name = "";
    rarity = null;
    
    constructor() {
        this.image = null;
        this.name = null;
        this.rarity = new Rarity();
    }

    get() {
        return this
    }
}

class MiniGame {
    quiz;
    response;
    awnsor;

    constructor() {
        this.quiz = "";
        this.choices = ["",""]
        this.response = "";
        this.awnsor = "";
    }

    start() {
        this.response = window.prompt(`${this.choices[0]} \n ${this.choices[0]} or ${this.choices[1]}`);
    }

    check() {
        return this.response == this.awnsor;
    }
}

class Rarity {
    constructor() {
        this.rarity = 0;
        this.probability = 0.0;
        this.up_probability = 0.0;
    }

    get() {
        return this
    }

   
}

