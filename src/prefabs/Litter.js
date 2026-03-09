class Litter extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setScale(0.25)
        this.setInteractive({draggable: true})
        this.body.onCollide = true
        this.body.onOverlap = true
    }
}