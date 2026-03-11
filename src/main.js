// Name: Sophia Rainiel Arevalo Aguado
// Hours:
// Refrences:
// Front:
    // https://phaser.io/examples/v3.85.0/game-objects/text/view/simple-text-button
    // https://phaser.discourse.group/t/random-spawning/3318
    // https://docs.phaser.io/api-documentation/class/gameobjects-group#getlength
    // BigBodies In-Class Example
    // Dialouge Coding Practice
    // Yas Tween In-Class Example
// Back:
    // https://phaser.io/examples/v3.85.0/input/dragging/view/scrolling-text-box

const config = {
    type: Phaser.AUTO,
    width: 840,
    height: 680,
    backgroundColor: "#000000",
    physics:{
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Menu, Front, Dialouge, Race, Back]
}
let game = new Phaser.Game(config)
let cursors = null

// DEBUG TOGGLE
let debugToggle = true
window.addEventListener("keydown", (event) => {
    if(event.key.toLowerCase() === "d") {
        debugToggle = !debugToggle

        game.scene.getScenes(true).forEach(scene => {
            if(scene.physics && scene.physics.world.debugGraphic){
                scene.physics.world.debugGraphic.setVisible(debugToggle)
            }
        })
    }
})