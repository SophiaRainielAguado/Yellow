// Name: Sophia Rainiel Arevalo Aguado
// Hours: 
// 20 hours of coding; 4 hours 39 for art
// Refrences:
// Front:
// https://phaser.io/examples/v3.85.0/game-objects/text/view/simple-text-button
// https://phaser.discourse.group/t/random-spawning/3318
// https://docs.phaser.io/api-documentation/class/gameobjects-group#getlength
// BigBodies In-Class Example
// Matter Example, can't remember what its called
// Yas Tween In-Class Example
// Dialouge:
// Dialouge Coding Practice
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/dialog-quest/
// https://codepen.io/rexrainbow/pen/wLyvxQ    
// Back:
// https://phaser.io/examples/v3.85.0/input/dragging/view/scrolling-text-box
// ART: The art style is meant to reflect childhood so I went with something similer and something that a child would make with crayons. I also used bright colors as
// children tend to have better eyes in recieving colors which tend to fade away with age. Thr background for the postcard scenes to simulate a feeling of
// digging up a time capsule. In this case, a postcard for my friend, depicting how we first met.
// In a similar fashion the song in the background is a mix of "Twinkle Twinkle Little Star" and "Hot Cross Buns", two songs me and my friends had to learn
// during music class when we had to play the recorder. The race music is another children's song but not one we learned, just one I liked called:
// "Pirates of the Aegea"
// TECHNICAL: Phaser Major components:
// In multiple scenes: Bitmap system, Animation Manager, Tween Manager, State Machine / Handling, Phaser Math Randomizer
// Front: Physics System - Physics Grouping & Matter System
// Dialouge: Dialouge? State Machine / Handling 
// Back: Graphics (GeomryMasking specifically)

const config = {
    type: Phaser.AUTO,
    width: 840,
    height: 680,
    backgroundColor: "#000000",
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Menu, Front, Dialouge, Race, Back]
}
let game = new Phaser.Game(config)
let cursors = null

let debugToggle = false

// Hide debug at start
setTimeout(() => {
    game.scene.getScenes(true).forEach(scene => {
        if (scene.physics && scene.physics.world && scene.physics.world.debugGraphic) {
            scene.physics.world.drawDebug = debugToggle
            scene.physics.world.debugGraphic.visible = debugToggle
        }
    })
}, 100)

// DEBUG TOGGLE
window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "d") {
        debugToggle = !debugToggle
        game.scene.getScenes(true).forEach(scene => {
            if (scene.physics && scene.physics.world) {
                scene.physics.world.drawDebug = debugToggle
                if (scene.physics.world.debugGraphic) {
                    scene.physics.world.debugGraphic.visible = debugToggle
                }
            }
        })
        console.log("Debug:", debugToggle)
    }
})

// hide debug at the start of every scene
game.events.on("step", () => {
    game.scene.getScenes(true).forEach(scene => {
        if (scene.physics && scene.physics.world) {
            scene.physics.world.drawDebug = debugToggle
            if (scene.physics.world.debugGraphic) {
                scene.physics.world.debugGraphic.visible = debugToggle
            }
        }
    })
})