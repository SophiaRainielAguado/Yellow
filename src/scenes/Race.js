class Race extends Phaser.Scene {
    constructor() {
        super("raceScene")
    }
    init(data) {
        // store which conversation to return to
        this.returnData = data;
    }

    create() {
        console.log("Race Minigame")


        document.getElementById('info').innerHTML =
            '<strong>Race.js</strong><br>CLICK!!!!<br>'

        this.add.image(game.config.width / 2, game.config.height / 2, "raceBg")

        this.raceStarted = false;
        this.startText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, "crayon_font", "CLICK!", 64)
            .setOrigin(0.5);
        this.tweens.add({
            targets: this.startText,
            scale: 1.3,
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });
        this.time.delayedCall(2000, () => {

            this.raceStarted = true;

            this.startText.destroy();

        });

        // GOAL distance! "win" variable in x-position
        this.x_finishLine = 675

        // TEMPORARY SCALE TILL ASSETS FOR RUNNING MADE
        this.jamie = this.add.sprite(100, game.config.height - 200, "jamie_Running").setOrigin(0).setScale(0.75)
        this.jamie.play("jRun");
        this.jamie.on('animationupdate', (anim, frame) => {
            if (frame.index % 2 === 0) {
                this.jamie.y += 3;
            } else { this.jamie.y -= 3; }
        });
        this.me = this.add.sprite(100, game.config.height / 2 - 50, "me").setOrigin(0).setScale(0.75)
        this.me.play("sRun");
        this.me.on('animationupdate', (anim, frame) => {
            if (frame.index % 2 === 0) {
                this.me.y += 3;
            } else { this.me.y -= 3; }
        });
        this.mike = this.add.sprite(100, 100, "mike_Running").setOrigin(0).setScale(0.75)
        this.mike.play("mRun");
        this.mike.on('animationupdate', (anim, frame) => {
            if (frame.index % 2 === 0) {
                this.mike.y += 3;
            } else { this.mike.y -= 3; }
        });


        // Speeds
        this.meSpeed = 0;
        this.jamieSpeed = Phaser.Math.Between(170, 270);
        this.mikeSpeed = Phaser.Math.Between(140, 240);

        // Click tracking
        this.clickCount = 0;

        this.input.on("pointerdown", () => {
            this.clickCount++;
        });

        // Recalculate player speed every 0.5s
        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                let clicksPerSecond = this.clickCount * 2;
                this.meSpeed = clicksPerSecond * 25;
                this.clickCount = 0;
            }
        });

        // NPC speed randomizer
        this.time.addEvent({
            delay: 800,
            loop: true,
            callback: () => {
                this.jamieSpeed = Phaser.Math.Between(60, 140);
                this.mikeSpeed = Phaser.Math.Between(60, 140);
            }
        });

        this.raceFinished = false;
    }

    update(time, delta) {

        if (!this.raceStarted || this.raceFinished) return;

        const dt = delta / 1000;

        this.me.x += this.meSpeed * dt;
        this.jamie.x += this.jamieSpeed * dt;
        this.mike.x += this.mikeSpeed * dt;

        this.checkWinner();
    }

    checkWinner() {
        if (this.me.x >= this.x_finishLine) {
            this.endRace("me");
        } else if (this.jamie.x >= this.x_finishLine) {
            this.endRace("Jamie");
        } else if (this.mike.x >= this.x_finishLine) {
            this.endRace("NPC 2");
        }
    }

    endRace(winner) {
        this.raceFinished = true;
        console.log(`${winner} wins!`);

        // wake dialogue scene
        this.scene.stop()
        this.scene.wake("dialougeScene", this.returnData)
    }
}
