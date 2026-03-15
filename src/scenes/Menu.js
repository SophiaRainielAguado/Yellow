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
        this.load.image("grass", "sprites/grass.png")
        this.load.image("jamie", "sprites/jamieCutout.png")
        this.load.spritesheet("jamie_Running", "sprites/jamie_running.png", {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image("mike", "sprites/mikeCutout.png")
        this.load.spritesheet("mike_Running", "sprites/mike_running.png", {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image("me", "sprites/meCutout.png")
        this.load.spritesheet("sofa_Running", "sprites/sofa_running.png", {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image("postcardBack", "sprites/temp_postcardBack.png")
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
        // TITLE
        this.add.bitmapText(game.config.width / 2 - 125, 85, "crayon_font", "Yellow", 90)

        // START BUTTON
        const button = this.add.text(game.config.width / 4, 300, 'Play?', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 260,
            backgroundColor: '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        // BUTTON BEHAVIOR
        button.setInteractive({ useHandCursor: true });
        button.on('pointerover', () => {
            button.setBackgroundColor('#8d8d8d');
        });
        button.on('pointerdown', () => {
            this.sound.play("press", { volume: 0.5 });
            this.scene.start("frontScene");

        });
        button.on('pointerout', () => {
            button.setBackgroundColor('#2d2d2d');
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