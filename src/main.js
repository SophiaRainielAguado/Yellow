// Name: Sophia Rainiel Arevalo Aguado
// Hours:
// Refrences:
// Front:
    // https://phaser.io/examples/v3.85.0/game-objects/text/view/simple-text-button
    // https://phaser.discourse.group/t/random-spawning/3318
    // BigBodies In-Class Example
    // Dialouge Coding Practice
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
