class Front extends Phaser.Scene {
    constructor() {
        super("frontScene")
    }

    create() {
        console.log("Postcard Front")

        // Background
        this.add.image(game.config.width / 2, game.config.height / 2, "bg")
        this.add.image(game.config.width / 2, game.config.height / 2, "postcardFront").setScale(1.25)
        this.add.image(game.config.width / 2, game.config.height / 2, "grass").setScale(1.25)    // litter Spawn Area

        this.instructionText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'crayon_font', '', 12).setOrigin(0.5)

        // RUNNING MINIGAME
        this.duo = this.add.image(game.config.width - 250, game.config.height / 2 + 100, "duoSilloutte").setOrigin(0).setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start("dialougeScene");
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => this.duo.setTexture("duo"))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => this.duo.setTexture("duoSilloutte"))

        // LITTER MINIGAME
        this.trashcan = this.physics.add.image(50, game.config.height / 4 - 25, "trashcan")
            .setOrigin(0).setScale(1.5).setInteractive()

        this.input.on("dragstart", (pointer, gameObject) => {       // cursor initial click
            if (gameObject.floatTween) gameObject.floatTween.stop();
            if (gameObject.rotateTween) gameObject.rotateTween.stop();

            gameObject.dragOffsetX = pointer.x - gameObject.x;
            gameObject.dragOffsetY = pointer.y - gameObject.y;

        });

        this.input.on("drag", (pointer, gameObject) => {        // litter follows mouse
            let targetX = pointer.x - gameObject.dragOffsetX
            let targetY = pointer.y - gameObject.dragOffsetY

            gameObject.x = Phaser.Math.Linear(gameObject.x, targetX, 0.08)
            gameObject.y = Phaser.Math.Linear(gameObject.y, targetY, 0.08)

        })

        this.input.on("dragend", (pointer, gameObject) => {
            gameObject.floatTween = this.tweens.add({       // restart "floating" animation
                targets: gameObject,
                y: gameObject.y + Phaser.Math.Between(3, 7),
                x: gameObject.x + Phaser.Math.Between(-8, 8),
                duration: Phaser.Math.Between(1200, 2000),
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1
            });

            gameObject.rotateTween = this.tweens.add({      // restart "wiggle" animation
                targets: gameObject,
                angle: Phaser.Math.Between(-5, 5),
                duration: Phaser.Math.Between(800, 1400),
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1
            });

        });

        //SPAWN FUCTION
        this.trashGroup = this.physics.add.group()
        for (var i = 0; i < 6; i++) {
            let trash = new Litter(this, Phaser.Math.Between(112, 727),
                Phaser.Math.Between(165, 514),
                "trash", Phaser.Math.Between(0, 4)); // Random frame

            this.input.setDraggable(trash)
            this.trashGroup.add(trash)
        }

        cursors = this.input.keyboard.createCursorKeys()
        this.reload = this.input.keyboard.addKey('R')

        // Litter & Trashcan Interaction
        this.input.on("dragend", (pointer, gameObject) => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(
                gameObject.getBounds(),
                this.trashcan.getBounds()
            )) {
                this.sound.play("throw", { volume: 0.5 });
                gameObject.destroy()
            }

        })

        document.getElementById('info').innerHTML =
            '<strong>PostcardFront.js</strong><br>R: Restart current scene<br>D: Debug Toggle<br>'

    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }

        if (this.trashGroup.getLength() == 0) {
            // let trashcanWiggle = this.tweens.add({
            //     targets: this.trashcan,
            //     alpha: { from: 0, to: 1 },
            //     scale: { from: 1.5, to: 0 },
            //     angle: { from: 0, to: 360 },
            //     ease: 'Sine.easeInOut',
            //     duration: 4000,
            //     repeat: 1,
            //     yoyo: false,
            //     onComplete: () => {

            //     }
            // })
            this.trashcan.destroy()
        }
    }
}