class Back extends Phaser.Scene {
    constructor() {
        super("backScene")
    }
    create() {
        console.log("Postcard Back")

        //background
        this.add.image(game.config.width / 2, game.config.height / 2, "bg")
        this.add.image(game.config.width / 2, game.config.height / 2, "postcardBack").setScale(1.25)

        document.getElementById('info').innerHTML ='<strong>PostCardBack.js</strong><br>'

        // POSTCARD MESSAGE
        const boxX = 100
        const boxY = 150
        const boxWidth = 300
        const boxHeight = 350

        const textBox = this.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0xFDF3C0).setOrigin(0)

        const message =
            `Dear Michael,
    We have been friends 
    for a while. Do you 
    know we've known each 
    other for 10 years? 
    Thats a decade!
            
    I don't have the best 
    memory but I do 
    remember how we first 
    met. So here's to our 
    everlasting friendship.

    To our shared love for 
    map games, history, 
    and dinos! To the 
    silent rest we share,
    to the debate of the 
    state of the world, 
    and the meaningless 
    chatter in-between 
    that remind me I am 
    alive and humanly so.

    Thank you for being 
    my friend.

    P.S. Did you know the
    color of friendship is
    Yellow?
            
Sincerely your friend, 
Sophia Rainiel A. Aguado`

        const text = this.add.bitmapText(boxX + 10, boxY + 10, "crayon_font", message, 21)

        // create mask
        const maskShape = this.make.graphics()
        maskShape.fillRect(boxX, boxY, boxWidth, boxHeight)

        const mask = maskShape.createGeometryMask()
        text.setMask(mask)

        // scroll limits
        const minY = boxY + 10
        const maxY = boxY + boxHeight - text.height - 10

        // mouse wheel scrolling
        this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY) => {
            text.y -= deltaY * 0.3
            text.y = Phaser.Math.Clamp(text.y, maxY, minY)
        })

        // Small Sprite interaction
        this.jamie = this.add.image(game.config.width - 350, 150, "jamieSmall").setOrigin(0).setScale(2)
        .setInteractive({ useHandCursor: true })
        this.jamie.on("pointerover", () => {
            this.jamie.setTint(0x61bdc4);
        });
        this.jamie.on("pointerout", () => {
            this.jamie.clearTint(); // return to original color
        });
        this.jamie.on("pointerdown", () => {
            this.sound.play("press", { volume: 0.5 });
            this.scene.start("menuScene");
        });

        this.sofa = this.add.image(game.config.width - 230, 240, "meSmall").setOrigin(0).setScale(2)
        .setInteractive({ useHandCursor: true })
        this.sofa.on("pointerover", () => {
            this.sofa.setTint(0xFeaa2a);
        });
        this.sofa.on("pointerout", () => {
            this.sofa.clearTint(); // return to original color
        });
        this.sofa.on("pointerdown", () => {
            this.sound.play("press", { volume: 0.5 });
            this.scene.start("menuScene");
        });

        this.mike = this.add.image(game.config.width - 350, 330, "mikeSmall").setOrigin(0).setScale(2)
        .setInteractive({ useHandCursor: true })
        this.mike.on("pointerover", () => {
            this.mike.setTint(0x63d0ac);
        });
        this.mike.on("pointerout", () => {
            this.mike.clearTint(); // return to original color
        });
        this.mike.on("pointerdown", () => {
            this.sound.play("press", { volume: 0.5 });
            this.scene.start("menuScene");
        });

        this.mal = this.add.image(game.config.width - 230, 420, "mochiSmall").setOrigin(0).setScale(2)
        .setInteractive({ useHandCursor: true })
        this.mal.on("pointerover", () => {
            this.mal.setTint(0xff55cc);
        });
        this.mal.on("pointerout", () => {
            this.mal.clearTint(); // return to original color
        });
        this.mal.on("pointerdown", () => {
            this.sound.play("press", { volume: 0.5 });
            this.scene.start("menuScene");
        });
    }
}