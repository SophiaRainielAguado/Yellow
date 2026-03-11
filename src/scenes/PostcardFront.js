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

        this.trashcan = this.physics.add.image(50, game.config.height / 3 + 50, "trashcan")
            .setOrigin(0).setScale(0.5).setInteractive()

        this.input.on("dragstart", (pointer, gameObject) => {
            if (gameObject.floatTween) {
                gameObject.floatTween.pause()
            }
        })
        this.input.on("dragstart", (pointer, gameObject) => {
            if (gameObject.floatTween) {
                gameObject.floatTween.stop();
            }
        });

        this.input.on("dragend", (pointer, gameObject) => {

            // restart float animation
            gameObject.floatTween = this.tweens.add({
                targets: gameObject,
                y: gameObject.y + Phaser.Math.Between(3, 7),
                duration: Phaser.Math.Between(700, 1200),
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1
            });

        });
        // Running Minigame
        this.duo = this.add.image(game.config.width - 200, game.config.height / 2 + 100, "duoCutout")
            .setOrigin(0).setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start("dialougeScene");
            })


        this.trashGroup = this.physics.add.group()

        //SPAWN FUCTIONS
        for (var i = 0; i < 6; i++) {
            let trash = new Litter(this, Phaser.Math.Between(100, 725),
                Phaser.Math.Between(game.config.height / 2 - 50, game.config.height / 2 + 200),
                "trash", Phaser.Math.Between(0, 4)); // Random frame

            this.input.setDraggable(trash)
            this.trashGroup.add(trash)
        }

        // Running Minigame
        this.duo = this.add.image(game.config.width - 200, game.config.height / 2 + 100, "duoCutout").setOrigin(0).setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start("dialougeScene");
            })


        cursors = this.input.keyboard.createCursorKeys()

        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX
            gameObject.y = dragY
        })
        this.input.on("dragend", (pointer, gameObject) => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(
                gameObject.getBounds(),
                this.trashcan.getBounds()
            )) {
                this.sound.play("trash", { volume: 0.5 });
                gameObject.destroy()
            }

        })
    }
}