class Race extends Phaser.Scene {
    constructor() {
        super("raceScene")
    }
    create() {
        console.log("Race Minigame")

        document.getElementById('info').innerHTML =
            '<strong>Race.js</strong><br>CLICK!!!!<br>'

        this.add.bitmapText(game.config.width / 2 - 150, 85, "crayon_font", "CLICK 4 SPEED", 45)
        // GOAL distance! "win" variable in x-position
        this.x_finishLine = 725

        // TEMPORARY SCALE TILL ASSETS FOR RUNNING MADE
        this.jamie = this.add.sprite(100, game.config.height / 2, "jamie").setOrigin(0).setScale(0.5)
        this.me = this.add.sprite(100, game.config.height / 3, "me").setOrigin(0).setScale(0.5)
        this.mike = this.add.sprite(100, game.config.height / 4 - 55, "mike").setOrigin(0).setScale(0.5)
        // Speeds
        this.meSpeed = 0;
        this.jamieSpeed = Phaser.Math.Between(100, 170);
        this.mikeSpeed = Phaser.Math.Between(100, 140);

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
                this.meSpeed = clicksPerSecond * 40;
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
        if (this.raceFinished) return;

        const dt = delta / 1000;

        // Move racers
        this.me.x += this.meSpeed * dt;
        this.jamie.x += this.jamieSpeed * dt;
        this.mike.x += this.mikeSpeed * dt;

        // Check finish
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
        this.scene.stop();                 // close race scene
        this.scene.wake("dialougeScene");  // resume dialogue
    }

}
