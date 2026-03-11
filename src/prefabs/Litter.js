class Litter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setInteractive({ draggable: true })
        this.body.onCollide = true
        this.body.onOverlap = true

        this.floatTween = this.scene.tweens.add({
            targets: this,
            y: this.y + Phaser.Math.Between(3, 7),
            duration: Phaser.Math.Between(700, 1200),
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1
        });
    }
}