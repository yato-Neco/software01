class Money {
    constructor() {
        this.input_money = 500;
        if (localStorage.getItem("money") == null) {
            localStorage.setItem("money", `${0}`);
        }
        
    }

    check(id) {
        let money = localStorage.getItem("money")
        
        if (id != null || id != undefined) {
            document.getElementById(id).innerText = money
        }
        
        return money
    }

    pull(id) {
        console.log("お金を引き出しました");
        localStorage.setItem("money", `${0}`);
        if (id != null || id != undefined) {
            document.getElementById(id).innerText = localStorage.getItem("money")
        }
    }

    

}

class Gacha {
   
    designs = [
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;",
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; filter: hue-rotate(90deg);",
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; filter: hue-rotate(180deg);"
    ]
    constructor(rotate_sound,discharge_sound) {
        this.money_class = new Money();
        this.rotate_sound = rotate_sound;
        this.discharge_sound = discharge_sound;

        let r0 = new Rarity(0,0.05,"SSR");
        let r1 = new Rarity(1,0.15,"SR");
        let r2 = new Rarity(2,0.2,"R");
        let r3 = new Rarity(3,0.2,"R");

        this.rarity_list = {
            "0": r0,
            "1": r1,
            "2": r2,
            "3": r3,
        };
        
        this.rarity_list = [r0,r1,r2,r3]
    
        this.items = [new Item(r0,0),new Item(r1,1),new Item(r2,2),new Item(r3,3)];

       
        
        const designIndex = localStorage.getItem("design")
        if (designIndex == null) {
            localStorage.setItem("design", `${0}`);
        }
        const gacha  = document.getElementById("gachagacha");
        if (gacha != null) {
            gacha.setAttribute("style", this.designs[localStorage.getItem("design")]);
        }
    }

    start() {
        let money = parseInt(this.money_class.check());
        localStorage.setItem("money", `${money + this.money_class.input_money}`);
        console.log(`ガチャ内金額 ${money + this.money_class.input_money}`);
    }
    
    change_design() {
       
        const select = document.getElementById('change_design');
        console.log(select.value)
        localStorage.setItem(`design`, `${select.value}`)

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
        const dialog = document.querySelector('#myDialog');
        const okButton = document.querySelector('#myDialog .button.ok');
        const ItemName = document.getElementById("showItemName");
        const ItemImage = document.getElementById("showItemImage");

        okButton.addEventListener('click', function () {
            dialog.close();
            item.width = "0"
        });
        
        
        const rand = Math.floor(Math.random() * 100);
        let result = "3";
        let rate = 0;
        for (const prop in this.rarity_list) {
            rate += this.rarity_list[prop].get_probability(parseInt(prop)) * 100;
            if (rand <= rate) {
                result = prop;
                break;
            }
        }

        console.log(`result: ${result}`);
        

        


        
        task = setInterval(() => {
            //console.log(`item zoom: ${i}`);

            item.width = "" + 100 * i;

            if (i > 3) {
                item.width = "0"
                gacha.play_discharge_sound();

                
                dialog.show();

                const ditem = this.items[parseInt(result)]
                ItemName.innerText = ditem.get_name()
                ItemImage.src = ditem.get_image()

               
                for (const prop in this.rarity_list) {
                    this.rarity_list[prop].rest_probability(parseInt(prop),1.0)
                }
                clearInterval(task);
            }

            i++;
        },1000);

        

        
    }


    up_rarity(up_probability) {

        for (let i = 0; i < this.rarity_list.length; i++) {
            if (this.rarity_list[i].rarity != "R") {
                const up = this.rarity_list[i].get_probability(i) * up_probability
                this.rarity_list[i].set_probability(i,up)
            }
        }
    }

    change_item() {
        const selectElement = document.getElementById("mySelect");
        const selectedValue = selectElement.value;
        const inputElement = document.getElementById("Inputprobability");
        const inputValue = inputElement.value.trim();
        console.log(inputValue)

        if (inputValue.trim() !== "" && inputValue !== null && inputValue !== undefined && !isNaN(inputValue)) {

            this.rarity_list[selectedValue].set_read_probability(parseInt(selectedValue),parseFloat(inputValue))
        
            console.log(this.rarity_list[selectedValue].get_probability(0))
        }

     
        
    }
}

class Item {
    rarity = null;
    index = 0
    constructor(rarity,index) {
        this.index = index
        this.rarity = rarity;
        

        localStorage.setItem(`item${index}_image`, "./image/onepiece01_luffy2.png");
        localStorage.setItem(`item${index}_name`, "item"+index);
    }

    

    get_name() {
        return localStorage.getItem(`item${this.index}_name`)
    }

    get_image() {
        return localStorage.getItem(`item${this.index}_image`)
    }
    
    get_rarity() {
        return this.rarity
    }
}

class MiniGame {
    quiz;
    response;
    awnsor;

    constructor() {
        this.quiz = "0 or 1";
        this.choices = ["0","1"]
        this.response = "";
        this.awnsor = "0";
    }

    start() {
        this.response = window.prompt(`${this.choices[0]} \n ${this.choices[0]} or ${this.choices[1]}`);
    }

    check() {
        return this.response == this.awnsor;
    }
}

class Rarity {
    index = 0
    constructor(index,probability,rarity) {
        this.rarity = rarity;
        this.probability = probability;
        this.up_probability = probability;
        this.index = index;
        
        

        if (localStorage.getItem(`rarity${index}_probability`) == null || localStorage.getItem(`rarity${index}_probability`) == NaN) {
            localStorage.setItem(`rarity${index}_probability`, `${probability}`);
        }

        if (localStorage.getItem(`rarity${index}_readonly_probability`) == null || localStorage.getItem(`rarity${index}_readonly_probability`) == NaN) {
            localStorage.setItem(`rarity${index}_readonly_probability`, `${probability}`);
        }
        if (false) {
            console.log("init")
            localStorage.setItem(`rarity${index}_readonly_probability`, `${probability}`);
            localStorage.setItem(`rarity${index}_probability`, `${probability}`);
        }
    }

    rest_probability(index,probability) {
        localStorage.setItem(`rarity${index}_probability`, `${parseFloat(localStorage.getItem(`rarity${index}_readonly_probability`))}`);
       
    }

    set_read_probability(index,probability) {
        localStorage.setItem(`rarity${index}_readonly_probability`, `${probability}`);
        localStorage.setItem(`rarity${index}_probability`, `${probability}`);
    }


    get_probability(index) {
        //console.log(parseFloat(localStorage.getItem(`rarity${index}_probability`)))
        return parseFloat(localStorage.getItem(`rarity${index}_probability`))
    }

    set_probability(index,probability) {
        localStorage.setItem(`rarity${index}_probability`, `${probability}`);        
        //console.log(parseFloat(localStorage.getItem(`rarity${index}_probability`)))
    }

   
}

