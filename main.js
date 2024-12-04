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
    constructor() {
        this.money_class = Money();
        this.rotate_sound = null;
        this.exhaust_sound = null;
        this.rarity_list = null;
        this.design = null;
        this.items = [Item(),Item(),Item(),Item()];
    }
}

class Item {
    constructor() {
        this.image = null;
        this.name = null;
        this.rarity = Rarity();
    }

    get() {
        return this
    }

}

class MiniGame {
    constructor() {
        this.quiz = ["",""];
        this.awnsor = "";
    }

    start(params) {
        
    }

    check(index) {
        return this.quiz[index] == this.awnsor;

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

    set(_this) {
        this = _this
        return true
    }
    
}

