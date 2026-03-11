class Front extends Phaser.Scene {
    constructor() {
        super("frontScene")
    }

    create() {
        console.log("Postcard Front")

        //background
        this.add.image(game.config.width / 2, game.config.height / 2, "postcardBack").setScale(1.25)

        // Litter Minigame Area
        this.add.image(100, game.config.height /4, "grass").setOrigin(0)

        this.trashcan = this.physics.add.image(50, game.config.height/4 - 25, "trashcan")
            .setOrigin(0).setScale(1.5).setInteractive()

        this.input.on("dragstart", (pointer, gameObject) => {

            if (gameObject.floatTween) gameObject.floatTween.stop();
            if (gameObject.rotateTween) gameObject.rotateTween.stop();

            gameObject.dragOffsetX = pointer.x - gameObject.x;
            gameObject.dragOffsetY = pointer.y - gameObject.y;

        });

        this.input.on("drag", (pointer, gameObject) => {

            let targetX = pointer.x - gameObject.dragOffsetX
            let targetY = pointer.y - gameObject.dragOffsetY

            gameObject.x = Phaser.Math.Linear(gameObject.x, targetX, 0.08)
            gameObject.y = Phaser.Math.Linear(gameObject.y, targetY, 0.08)

        })

        this.input.on("dragend", (pointer, gameObject) => {

            gameObject.floatTween = this.tweens.add({
                targets: gameObject,
                y: gameObject.y + Phaser.Math.Between(3, 7),
                x: gameObject.x + Phaser.Math.Between(-8, 8),
                duration: Phaser.Math.Between(1200, 2000),
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1
            });

            gameObject.rotateTween = this.tweens.add({
                targets: gameObject,
                angle: Phaser.Math.Between(-5, 5),
                duration: Phaser.Math.Between(800, 1400),
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1
            });

        });


        //SPAWN FUCTIONS
        this.trashGroup = this.physics.add.group()
        for (var i = 0; i < 6; i++) {
            let trash = new Litter(this, Phaser.Math.Between(100, 725),
                Phaser.Math.Between(game.config.height/4, game.config.height/4 + 394),
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