class Front extends Phaser.Scene{
    constructor(){
        super("frontScene")
    }

    create(){
        console.log("Postcard Front")
    
        //background
        this.add.image(game.config.width/2, game.config.height/2, "postcardBack").setScale(1.25)
        
        // Litter Minigame Area
        this.add.rectangle(100, game.config.height/2 - 50, 250, 250, 0x00ff00).setOrigin(0)
        var randomCoords = Phaser.Math.Between(100, 100+250)
        
    }
}