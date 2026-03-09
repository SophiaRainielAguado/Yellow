class Back extends Phaser.Scene {
    constructor() {
        super("backScene")
    }

        create() {
        console.log("Postcard Back")
        //background
        this.add.image(game.config.width / 2, game.config.height / 2, "postcardBack").setScale(1.25)
        }
}