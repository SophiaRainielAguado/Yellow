class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload(){
        this.load.path = "./assets/"

        // SFX
        this.load.audio("press", "sfx/press.wav")
        this.load.audio("trash", "sfx/trash.wav")

        // SPRITES
        this.load.image("duoCutout", "sprites/temp_duoCutout.png")
        this.load.image("meCutout", "sprites/temp_meCutout.png")
        this.load.image("postcardBack", "sprites/temp_postcardBack.png")
        this.load.image("trash", "sprites/temp_trash.png")
        this.load.image("trashcan", "sprites/temp_trashcan.png")

        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
    }

    create(){
        console.log("Menu Scene")

        let menuConfig = { fontFamily: "Fantasy", fontSize: "45px", color: "#ffffff", align: "center" }
        this.add.text(game.config.width/2 - 45, 85, "Yellow", menuConfig).setOrigin(0, 0)
        
        // START BUTTON
        const button = this.add.text(game.config.width/4, 300, 'Play?', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 260,
            backgroundColor: '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);    

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
        
    }
}