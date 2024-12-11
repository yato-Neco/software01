class Money {
    constructor() {
        this.money = 0;
        this.input_money = 500;
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

        let r0 = new Rarity();
        let r1 = new Rarity();
        let r2 = new Rarity();
        let r3 = new Rarity();

        
        this.design = design;
        this.items = [new Item(r0),new Item(r1),new Item(r2),new Item(r3)];
    }

    start() {
        this.money_class.money += this.money_class.input_money;
        localStorage.setItem("money", `${this.money_class.money}`);
        console.log(`ガチャ内金額 ${this.money_class.money}`)
    }
    
    change_design() {
        
    }

    play_rotate_sound() {
        
    }

    play_discharge_sound() {
        let sound = document.getElementById("discharge");
        sound.play();
    }

    rotate() {
        gacha.play_rotate_sound();

        const gachaImage = document.getElementById('gachagacha');

        gachaImage.classList.toggle('rotated');
    }

    discharge() {

        let item = document.getElementById("item");
        item.src = "./image/capsule_close1_red.png";
        let task;
        let i = 1;

        
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

        console.log(result);


        
        task = setInterval(() => {
            console.log(`item zoom: ${i}`);

            item.width = "" + 100 * i;

            if (i > 3) {
                
                document.getElementById("");
                
                gacha.play_discharge_sound();


                clearInterval(task);
            }

            i++;
        },1000);
    }


    up_rarity() {
        
    }
}

class Item {
    image = "";
    _name = "";
    rarity = null;
    
    constructor(rarity) {
        this.image = null;
        this._name = null;
        this.rarity = rarity;
        
    }

    set_image(image) {
        this.image = image;
    }

    set_rarity(index) {
        this.rarity = rarity_list[index];
    }

    set_name(_name) {
        this._name = _name;
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

    up_rarity() {

    }

    get() {
        return this
    }

   
}

