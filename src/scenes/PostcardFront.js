class Front extends Phaser.Scene {
    constructor() {
        super("frontScene")
    }

    create() {
        console.log("Postcard Front")

        //background
        this.add.image(game.config.width / 2, game.config.height / 2, "postcardBack").setScale(1.25)

        // Litter Minigame Area
        this.add.rectangle(100, game.config.height / 2 - 50, 625, 250, 0x00ff00).setOrigin(0)

        this.trashcan = this.add.image(50, game.config.height / 3 + 50, "trashcan").setOrigin(0).setScale(0.5)

        // Running Minigame
        this.duo = this.add.image(game.config.width - 200, game.config.height / 2 + 100, "duoCutout").setOrigin(0).setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start("dialougeScene");
            })

        for (var i = 0; i < 6; i++) {
            let trash = new Litter(this, Phaser.Math.Between(100, 725), 
                                    Phaser.Math.Between(game.config.height/2 - 50, game.config.height/2 + 200), "trash");
            this.physics.add.existing(trash);
        }
    }

    update(){
        //Add litter inteaction with trashcan, delete object
    }
}