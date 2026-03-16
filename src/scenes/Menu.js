class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.path = "./assets/"

        // SFX
        this.load.audio("press", "sfx/press.wav")
        this.load.audio("throw", "sfx/throwAway.wav")

        this.load.json('dialog', 'dialouge.json')


        // SPRITES
        // background
        this.load.image("menuBg", "sprites/menu_bg.png")
        this.load.image("bg", "sprites/background.png")
        this.load.image("postcardFront", "sprites/postcard_front.png")
        this.load.image("postcardBack", "sprites/postcard_Back.png")
        this.load.image("grass", "sprites/grass.png")
        this.load.image("dialogBox", "sprites/dialog_box.png")
        this.load.image("dialogBg", "sprites/dialog_bg.png")
        this.load.image("raceBg", "sprites/race_bg.png")

        // characters  & animation spritesheets
        this.load.image("jamie", "sprites/jamie_cutout.png")
        this.load.spritesheet("jamie_Running", "sprites/jamie_running.png", {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image("mike", "sprites/mike_cutout.png")
        this.load.spritesheet("mike_Running", "sprites/mike_running.png", {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image("me", "sprites/sofa_cutout.png")
        this.load.spritesheet("sofa_Running", "sprites/sofa_running.png", {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image("duoSilloutte", "sprites/duo_silloutte.png")
        this.load.image("duo", "sprites/duo_cutout.png")

        // litter minigame sprites
        this.load.spritesheet("trash", "sprites/trash.png", {
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.image("trashcan", "sprites/trashcan.png")

        // FONT
        this.load.bitmapFont('crayon_font', 'pastelCrayon.png', 'pastelCrayon.xml')
    }

    create() {
        console.log("Menu Scene")

        this.add.image(game.config.width / 2, game.config.height / 2, "menuBg")
        // TITLE
        this.add.bitmapText(game.config.width / 2 - 125, 150, "crayon_font", "Yellow", 90)
        this.add.bitmapText(game.config.width / 2 - 125, 300, "crayon_font", "by: Sophia Rainiel Arevalo Aguado", 20).setTint(0xdca6fd);

        // START BUTTON
        const button = this.add.bitmapText(game.config.width / 2 + 25, 265,
            "crayon_font", "Play?", 32).setOrigin(0.5);

        // BUTTON BEHAVIOR
        button.setInteractive({ useHandCursor: true });

        // hover
        button.on("pointerover", () => {
            button.setTint(0xdca6fd);
        });

        // click
        button.on("pointerdown", () => {
            this.sound.play("press", { volume: 0.5 });
            this.scene.start("frontScene");
        });

        // leave
        button.on("pointerout", () => {
            button.clearTint(); // return to original color
        });

        document.getElementById('info').innerHTML =
            '<strong>Menu.js</strong><br>'

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