class Litter extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setInteractive({draggable: true})
        this.body.onCollide = true
        this.body.onOverlap = true
    }
}