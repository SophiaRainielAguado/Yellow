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
            x: this.x + Phaser.Math.Between(-8, 8), // wind drift
            duration: Phaser.Math.Between(1200, 2000),
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1
        });

        this.rotateTween = this.scene.tweens.add({
            targets: this,
            angle: Phaser.Math.Between(-5, 5),
            duration: Phaser.Math.Between(800, 1400),
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1
        });
    }
}