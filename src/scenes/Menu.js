class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.path = "./assets/"

        // SFX
        this.load.audio("press", "sfx/press.wav")
        this.load.audio("throw1", "sfx/throwAway.wav")
        this.load.audio("throw2", "sfx/throwAway2.wav")
        this.load.audio("throw3", "sfx/throwAway3.wav")
        this.load.audio("pickUp", "sfx/pickUp.wav")
        // music
        this.load.audio("bgMusic", "sfx/backgroundMusic.wav")
        this.load.audio("raceMusic", "sfx/raceMusic.wav")


        // SPRITES
        // background
        this.load.image("menuBg", "background/menu_bg.png")
        this.load.image("bg", "background/background.png")
        this.load.image("postcardFront", "background/postcard_front.png")
        this.load.image("postcardBack", "background/postcard_back.png")
        this.load.image("grass", "background/grass.png")
        this.load.image("dialogBox", "background/dialog_box.png")
        this.load.image("dialogBg", "background/dialog_bg.png")
        this.load.image("raceBg", "background/race_bg.png")

        // characters  & animation spritesheets
        this.load.image("jamie", "sprites/jamie_cutout.png")
        this.load.image("jamieSmall", "sprites/jamie_chibi.png")
        this.load.spritesheet("jamie_Running", "sprites/jamie_running.png", {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image("mike", "sprites/mike_cutout.png")
        this.load.image("mikeSmall", "sprites/mike_chibi.png")
        this.load.spritesheet("mike_Running", "sprites/mike_running.png", {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image("me", "sprites/sofa_cutout.png")
        this.load.image("meSmall", "sprites/sofa_chibi.png")
        this.load.spritesheet("sofa_Running", "sprites/sofa_running.png", {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image("duoSilloutte", "sprites/duo_silloutte.png")
        this.load.image("duo", "sprites/duo_cutout.png")
        this.load.image("mochiSmall", "sprites/mackeral_chibi.png")

        // litter minigame sprites
        this.load.spritesheet("trash", "sprites/trash.png", {
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.image("trashcan", "sprites/trashcan.png")
        this.load.spritesheet("flowers", "sprites/flowers.png", {
            frameWidth: 64,
            frameHeight: 64
        })

        // FONT
        this.load.bitmapFont('crayon_font', 'pastelCrayon.png', 'pastelCrayon.xml')

        // DIALOUGE TREE
        this.load.json('dialog', 'dialouge.json')
    }

    create() {
        console.log("Menu Scene")

        // BACKGROUND
        this.add.image(game.config.width / 2, game.config.height / 2, "menuBg")

        // TEXT
        const title = this.add.bitmapText(game.config.width / 2 - 125, 150, "crayon_font", "Yellow", 90)
        title.setInteractive({ useHandCursor: true });
        this.add.bitmapText(game.config.width / 2 - 135, 300, "crayon_font", "from: Sophia Rainiel Arevalo Aguado", 20).setTint(0xdca6fd);

        const secret = this.add.bitmapText(game.config.width / 2 - 150, 180, "crayon_font", "The Color of Friendship", 30).setAlpha(0)
        title.on("pointerover", () => {
            title.setAlpha(0)
            secret.setAlpha(1)
        });
        title.on("pointerout", () => {
            this.time.delayedCall(1000, () => {
                title.setAlpha(1)
                secret.setAlpha(0)
            })
        });

        // MUSIC
        this.music = this.sound.add("bgMusic")
        var musicConfig = {
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            delay: 0
        }
        if (!game.bgMusic) {
            game.bgMusic = this.sound.add("bgMusic", {
                volume: 0.25,
                loop: true
            });
            game.bgMusic.play();
        }

        // START BUTTON
        const button = this.add.bitmapText(game.config.width / 2 + 25, 265, "crayon_font", "Play?", 32).setOrigin(0.5);

        // BUTTON BEHAVIOR
        button.setInteractive({ useHandCursor: true });

        // hover
        button.on("pointerover", () => { button.setTint(0xdca6fd); });

        // click
        button.on("pointerdown", () => {
            this.sound.play("press", { volume: 0.5 });
            this.scene.start("frontScene");
        });

        // leave
        button.on("pointerout", () => { button.clearTint(); }); // revert tint

        document.getElementById('info').innerHTML = '<strong>Menu.js</strong><br>'

        // ANIMATIONS
        this.anims.create({
            key: "mRun",
            frames: this.anims.generateFrameNumbers("mike_Running", { start: 0, end: 3 }), // 4 frames
            frameRate: 4,
            repeat: -1   // loop forever
        });
        this.anims.create({
            key: "jRun",
            frames: this.anims.generateFrameNumbers("jamie_Running", { start: 0, end: 3 }), // 4 frames
            frameRate: 4,
            repeat: -1   // loop forever
        });
        this.anims.create({
            key: "sRun",
            frames: this.anims.generateFrameNumbers("sofa_Running", { start: 0, end: 3 }), // 4 frames
            frameRate: 4,
            repeat: -1   // loop forever
        });
    }
}
