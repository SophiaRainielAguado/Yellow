class Back extends Phaser.Scene {
    constructor() {
        super("backScene")
    }
    create() {
        console.log("Postcard Back")

        //background
        this.add.image(game.config.width / 2, game.config.height / 2, "postcardBack")
            .setScale(1.25)

        document.getElementById('info').innerHTML =
            '<strong>PostCardBack.js</strong><br>'

        const boxX = 100
        const boxY = game.config.height / 4
        const boxWidth = 400
        const boxHeight = 350

        const textBox = this.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0x000000)
            .setOrigin(0)

        const message =
            `Dear Michael,
        We have been friends for
        a while. Do you know we've 
        known each other for 10 
        years? Thats a decade!
            
        I don't have the best 
        memory but I do remember 
        how we first met. So here's
        to our everlasting friendship.

        To our shared love for map
        games, history, and dinos!
        To the silent rest we share,
        to the debate of the state
        of the world, and the
        meaningless chatter
        in-between that remind me
        I am alive and humanly so.

        Thank you for being my
        friend.

        P.S. Did you know the
        color of friendship is
        Yellow?
            
    Sincerely your friend, 
    Sophia Rainiel A. Aguado`

        const text = this.add.bitmapText(boxX + 10, boxY + 10,
            "crayon_font", message, 21)

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
    }
}