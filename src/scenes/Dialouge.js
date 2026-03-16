class Dialouge extends Phaser.Scene {
    constructor() {
        super("dialougeScene")
    }

    init() {
        // dialog constants
        this.DBOX_X = 0			        // dialog box x-position
        this.DBOX_Y = 500			    // dialog box y-position
        this.DBOX_FONT = 'crayon_font'	// dialog box font key 

        this.TEXT_X = 50			    // text w/in dialog box x-position
        this.TEXT_Y = 525			    // text w/in dialog box y-position
        this.TEXT_SIZE = 28		        // text font size (in pixels)
        this.TEXT_MAX_WIDTH = 715	    // max width of text within box

        this.NEXT_TEXT = '[SPACE]'	    // text to display for next prompt
        this.NEXT_X = 775			    // next text prompt x-position
        this.NEXT_Y = 625			    // next text prompt y-position

        this.LETTER_TIMER = 10		    // # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0			// current "conversation"
        this.dialogLine = 0			    // current line of conversation
        this.dialogSpeaker = null		// current speaker
        this.dialogLastSpeaker = null	// last speaker
        this.dialogTyping = false		// flag to lock player input while text is "typing"
        this.dialogText = null			// the actual dialog text
        this.nextText = null			// player prompt text to continue typing

        // flags
        this.dialogChoice = false

        // character variables
        this.tweenDuration = 500        // character in/out tween duration

        this.OFFSCREEN_X = -500         // x,y coordinates used to place characters offscreen
        this.OFFSCREEN_Y = 1000
    }

    create() {
        console.log("Dialouge Screen")

        // parse dialog from JSON file
        this.dialog = this.cache.json.get('dialog')
        //console.log(this.dialog)

        this.add.image(game.config.width / 2, game.config.height / 2, "dialogBg")

        // ready the character dialog images offscreen
        this.me = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y - 125, 'me').setScale(1.5)
        this.me.speakerXOffset = 200
        this.jamie = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y - 125, 'jamie').setScale(1.65)
        this.jamie.speakerXOffset = 200
        this.mike = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y - 125, 'mike').setScale(1.60)
        this.mike.speakerXOffset = 200

        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogBox').setOrigin(0)

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE)
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE)

        // input
        cursors = this.input.keyboard.createCursorKeys()

        // start first dialog conversation
        this.typeText()

        document.getElementById('info').innerHTML =
            '<strong>Dialouge.js</strong><br>↑: Yes. Go to Race Minigame <br>↓: No. Go to Postcard Back<br>'

        this.events.on("wake", (sys, data) => {

            if (data && data.next !== undefined) {
                this.dialogConvo = data.next
                this.dialogLine = 0
            }

            this.typeText()
        })

    }

    update() {

        // SPACE → continue dialogue
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping && !this.dialogChoice) {
            this.typeText()
        }

        // choices
        if (this.dialogChoice && !this.dialogTyping) {

            if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
                this.handleChoice(this.dialogChoice.up)
                this.dialogChoice = null
            }

            if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
                this.handleChoice(this.dialogChoice.down)
                this.dialogChoice = null
            }

        }
    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true
        this.dialogChoice = false

        // clear text
        this.dialogText.text = ''
        this.nextText.text = ''

        /* JSON dialog structure: 
            - each array within the main JSON array is a "conversation"
            - each object within a "conversation" is a "line"
            - each "line" can have 3 properties: 
                1. a speaker (required)
                2. the dialog text (required)
                3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this conversation, otherwise jump to next conversation
        if (!this.dialog[this.dialogConvo]) {
            console.error("Conversation does not exist:", this.dialogConvo)
            return
        }

        // make sure there are lines left to read in this conversation
        if (!this.dialog[this.dialogConvo]) {
            console.error("Conversation does not exist:", this.dialogConvo)
            return
        }

        if (this.dialogLine > this.dialog[this.dialogConvo].length - 1) {

            let lastLine = this.dialog[this.dialogConvo][this.dialog[this.dialogConvo].length - 1]

            // stop dialogue if this branch ends
            if (lastLine.end) {

                console.log("Dialogue branch finished")

                if (this.dialogLastSpeaker) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'Linear',
                        onComplete: () => {
                            this.dialogbox.visible = false
                            this.scene.start("backScene")
                        }
                    })
                }

                return
            }

            this.dialogLine = 0
            this.dialogConvo++
        }

        // make sure we haven't run out of conversations...
        if (this.dialogConvo >= this.dialog.length) {
            // here I'm exiting the final conversation to return to the title...
            // ...but you could add alternate logic if needed
            console.log('End of Conversations')

            // tween out prior speaker's image and return to title screen
            if (this.dialogLastSpeaker) {
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'Linear',
                    onComplete: () => {
                        this.dialogbox.visible = false
                        this.scene.start('backScene')
                    }
                })
            }
        } else {
            // ...if we still have conversations left, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker']

            // check if this line is a choice
            let currentLine = this.dialog[this.dialogConvo][this.dialogLine]
            this.dialogChoice = currentLine.choice || null

            // check if there's a new speaker (for exit/enter animations)
            if (this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                // tween out prior speaker's image
                if (this.dialogLastSpeaker) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'Linear'
                    })
                }
                // tween in new speaker's image
                this.tweens.add({
                    targets: this[this.dialogSpeaker],
                    x: this.DBOX_X + this[this.dialogSpeaker].speakerXOffset,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                })
            }

            // build dialog (concatenate speaker + colon + line of text)
            this.combinedDialog =
                this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase()
                + ': '
                + this.dialog[this.dialogConvo][this.dialogLine]['dialog']

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.combinedDialog.length - 1,
                callback: () => {
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.combinedDialog[currentChar]
                    // advance character position
                    currentChar++
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if (this.textTimer.getRepeatCount() == 0) {

                        let currentLine = this.dialog[this.dialogConvo][this.dialogLine - 1]

                        if (currentLine.choice) {
                            this.dialogChoice = currentLine.choice
                            this.nextText = this.add.bitmapText(
                                this.NEXT_X,
                                this.NEXT_Y,
                                this.DBOX_FONT,
                                "[up] Race   [down] Stay",
                                this.TEXT_SIZE
                            ).setOrigin(1)
                        } else {
                            this.nextText = this.add.bitmapText(
                                this.NEXT_X,
                                this.NEXT_Y,
                                this.DBOX_FONT,
                                this.NEXT_TEXT,
                                this.TEXT_SIZE
                            ).setOrigin(1)
                        }

                        this.dialogTyping = false
                        this.textTimer.destroy()
                    }

                },
                callbackScope: this // keep Scene context
            })

            // final cleanup before next iteration
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH  // set bounds on dialog
            this.dialogLine++                               // increment dialog line
            this.dialogLastSpeaker = this.dialogSpeaker     // set past speaker
        }
    }

    handleChoice(result) {

        // go to another scene
        if (typeof result === "string") {

            this.scene.sleep()
            this.scene.launch(result)
            return
        }

        // jump to another conversation
        if (typeof result === "number") {

            this.dialogConvo = result
            this.dialogLine = 0
            this.typeText()
            return
        }

        // object result (scene + return conversation)
        if (typeof result === "object") {

            this.scene.sleep()
            this.scene.launch(result.scene, { next: result.next })
            return
        }
    }
}