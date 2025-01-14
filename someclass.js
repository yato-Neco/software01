class Money {
    constructor() {
        this.input_money = 500;
        if (localStorage.getItem("money") == null) {
            localStorage.setItem("money", `${0}`);
        }
    }

    check(id) {
        let money = localStorage.getItem("money");

        if (id != null || id != undefined) {
            document.getElementById(id).innerText = money;
        }

        return money;
    }

    pull(id) {
        console.log("お金を引き出しました");
        localStorage.setItem("money", `${0}`);
        if (id != null || id != undefined) {
            document.getElementById(id).innerText = localStorage.getItem(
                "money",
            );
        }
    }

    push(money) {
        console.log("お金を受け取りました");
        localStorage.setItem("money", `${money + this.input_money}`);
    }
}

class Gacha {
    designs = [
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;",
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; filter: hue-rotate(90deg);",
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; filter: hue-rotate(180deg);",
    ];
    items = []
    constructor(rotate_sound, discharge_sound) {
        this.money_class = new Money();
        this.rotate_sound = rotate_sound;
        this.discharge_sound = discharge_sound;

        let r0 = new Rarity(0, 0.1, "R");
        let r1 = new Rarity(1, 0.1, "R");
        let r2 = new Rarity(2, 0.2, "R");
        let r3 = new Rarity(3, 0.2, "N");
        let r4 = new Rarity(4, 0.2, "N");
        let r5 = new Rarity(5, 0.2, "N");
        let r6 = new Rarity(6, 0.2, "N");
        let r7 = new Rarity(7, 0.2, "N");
        let r8 = new Rarity(8, 0.2, "N");
        let r9 = new Rarity(9, 0.2, "N");

        const items = [
            new Item(r0, 0),
            new Item(r1, 1),
            new Item(r2, 2),
            new Item(r3, 3),
            new Item(r4, 4),
            new Item(r5, 5),
            new Item(r6, 6),
            new Item(r7, 7),
            new Item(r8, 8),
            new Item(r9, 9),
        ];

        this.items = items;

        const designIndex = localStorage.getItem("design");
        if (designIndex == null) {
            localStorage.setItem("design", `${0}`);
        }
        const gacha = document.getElementById("gachagacha");
        if (gacha != null) {
            gacha.setAttribute(
                "style",
                this.designs[localStorage.getItem("design")],
            );
        }



        var select = document.getElementById("mySelect");
        if (select != null) {

            var options = document.querySelectorAll("#mySelect option");
            const inputElement0 = document.getElementById("Itemname");
            const inputElement1 = document.getElementById("Itemimg_url");
            const inputElement = document.getElementById("Inputprobability");
            inputElement.value = items[0].rarity.get_read_probability()
            inputElement0.value = items[0].get_name()
            inputElement1.value = items[0].get_image()
            select.addEventListener('change', function(){
            
                    var index =  parseInt(this.selectedIndex);
                 
                    inputElement0.value = items[index].get_name()
                    inputElement1.value = items[index].get_image()
                    inputElement.value = items[index].rarity.get_read_probability()

            
            });
        }
       


    }

    start() {
        let money = parseInt(this.money_class.check());
        this.money_class.push(money);

        minigame.start();
        let isRight = minigame.check();
        console.log(`isRight: ${isRight}`);
        if (isRight) {
            this.up_rarity(12.0);
        }

        this.rotate();

        let item = document.getElementById("item");
        item.src = "./image/capsule_close1_red.png";
        let task;
        let i = 1;
        const dialog = document.querySelector("#myDialog");
        const okButton = document.querySelector("#myDialog .button.ok");
        const ItemName = document.getElementById("showItemName");
        const ItemImage = document.getElementById("showItemImage");
        const Rarity = document.getElementById("rarity");

        okButton.addEventListener("click", function () {
            dialog.close();
            item.width = "0";
        });

        const rand = Math.floor(Math.random() * 100);
        let result = "3";
        let rate = 0;
        for (const prop in this.items) {
            rate += this.items[prop].rarity.get_probability(parseInt(prop)) *
                100;
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
                item.width = "0";
                gacha.play_discharge_sound();

                dialog.show();

                const ditem = this.items[parseInt(result)];
                ItemName.innerText = ditem.get_name();
                ItemImage.src = ditem.get_image();
                Rarity.innerText = "レアリティ: " +
                    this.items[result].rarity.get_rarity();

                for (const prop in this.items) {
                    this.items[prop].rarity.rest_probability(
                        parseInt(prop),
                        1.0,
                    );
                }
                clearInterval(task);
            }

            i++;
        }, 1000);
    }

    change_design() {
        const select = document.getElementById("change_design");
        console.log(select.value);
        localStorage.setItem(`design`, `${select.value}`);
    }

    play_discharge_sound() {
        let sound = document.getElementById("discharge");
        sound.play();
    }

    rotate() {
        gacha.play_rotate_sound();

        const gachaImage = document.getElementById("gachagacha");

        gachaImage.classList.toggle("rotated");
    }

    play_rotate_sound() {
    }

    up_rarity(up_probability) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].get_rarity() != "N") {
                const up = this.items[i].rarity.get_probability(i) *
                    up_probability;
                this.items[i].rarity.set_probability(i, up);
            }
        }
    }

    change_rarity() {
        const selectElement = document.getElementById("mySelect");
        const selectedValue = selectElement.value;
        const inputElement = document.getElementById("Inputprobability");
        const inputValue = inputElement.value.trim();
        console.log(inputValue);

        if (
            inputValue.trim() !== "" && inputValue !== null &&
            inputValue !== undefined && !isNaN(inputValue)
        ) {
            this.items[selectedValue].rarity.set_read_probability(
                parseInt(selectedValue),
                parseFloat(inputValue),
            );

            console.log(this.items[selectedValue].rarity.get_probability(0));
        }
    }

    change_item() {
        const selectElement = document.getElementById("mySelect");
        const selectedValue = selectElement.value;
        const inputElement0 = document.getElementById("Itemname");
        const inputValue0 = inputElement0.value.trim();
        const inputElement1 = document.getElementById("Itemimg_url");
        const inputValue1 = inputElement1.value.trim();
        console.log(inputValue0)
        if (
            inputValue0 !== "" || inputValue0 !== null || inputValue0 !== undefined 
        ){
            this.items[selectedValue].set_name(inputValue0)
        }


        if (
            inputValue1 !== "" || inputValue1 !== null || inputValue1 !== undefined 
        ){
            this.items[selectedValue].set_image(inputValue1)
        }

    }
}

class Item {
    rarity = null;
    index = 0;
    constructor(rarity, index) {
        this.index = index;
        this.rarity = rarity;
        if (localStorage.getItem(`item${this.index}_name`) == null || localStorage.getItem(`item${this.index}_image`) == null) {
            localStorage.setItem(
                `item${index}_image`,
                "./image/onepiece01_luffy2.png",
            );
            localStorage.setItem(`item${index}_name`, "item" + index);
        }
    
    }

    get_name() {
        return localStorage.getItem(`item${this.index}_name`);
    }

    get_image() {
        return localStorage.getItem(`item${this.index}_image`);
    }

    get_rarity() {
        return this.rarity.get_rarity();
    }

    set_image(img_url) {
        localStorage.setItem(`item${this.index}_image`, `${img_url}`);
    }

    set_name(name) {
        localStorage.setItem(`item${this.index}_name`, `${name}`);
    }
}

class MiniGame {
    quiz;
    response;
    awnsor;

    constructor() {
        this.quiz = "糸山英太郎の座右の銘は何ですか？";
        this.choices = ["石の上にも三年", "金こそ力"];
        this.response = "";
        this.awnsor = "金こそ力";
    }

    start() {
        this.response = window.prompt(
            `${this.quiz} \n ${this.choices[0]} or ${this.choices[1]}`,
        );
    }

    check() {
        return this.response == this.awnsor;
    }
}

class Rarity {
    index = 0;
    constructor(index, probability, rarity) {
        this.rarity = rarity;
        this.probability = probability;
        this.up_probability = probability;
        this.index = index;

        if (
            localStorage.getItem(`rarity${index}_probability`) == null ||
            localStorage.getItem(`rarity${index}_probability`) == NaN
        ) {
            localStorage.setItem(
                `rarity${index}_probability`,
                `${probability}`,
            );
        }

        if (
            localStorage.getItem(`rarity${index}_readonly_probability`) ==
                null ||
            localStorage.getItem(`rarity${index}_readonly_probability`) == NaN
        ) {
            localStorage.setItem(
                `rarity${index}_readonly_probability`,
                `${probability}`,
            );
        }
        if (false) {
            console.log("init");
            localStorage.setItem(
                `rarity${index}_readonly_probability`,
                `${probability}`,
            );
            localStorage.setItem(
                `rarity${index}_probability`,
                `${probability}`,
            );
        }
    }

    get_rarity() {
        return this.rarity;
    }


    get_probability(index) {
        //console.log(parseFloat(localStorage.getItem(`rarity${index}_probability`)))
        return parseFloat(localStorage.getItem(`rarity${index}_probability`));
    }

    set_probability(index, probability) {
        localStorage.setItem(`rarity${index}_probability`, `${probability}`);
        //console.log(parseFloat(localStorage.getItem(`rarity${index}_probability`)))
    }











    
    rest_probability(index, probability) {
        localStorage.setItem(
            `rarity${index}_probability`,
            `${
                parseFloat(
                    localStorage.getItem(`rarity${index}_readonly_probability`),
                )
            }`,
        );
    }

    set_read_probability(index, probability) {
        localStorage.setItem(
            `rarity${index}_readonly_probability`,
            `${probability}`,
        );
        localStorage.setItem(`rarity${index}_probability`, `${probability}`);
    }

    get_read_probability() {
        return parseFloat(localStorage.getItem(`rarity${this.index}_readonly_probability`));
    }
 
}
