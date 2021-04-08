/** Class representing Sounds */
class Sounds {
	constructor() {
		this.flip = new Audio("assets/sounds/sound-turn.wav");
		this.card = new Audio("assets/sounds/sound-back.wav");
		this.invalid = new Audio("assets/sounds/sound-invalid.wav");
		this.select = new Audio("assets/sounds/sound-select.wav");
		this.special = new Audio("assets/sounds/sound-special.wav");
		this.bgm = new Audio("assets/sounds/bgm.mp3");
		this.fanfare = new Audio("assets/sounds/victory-fanfare.mp3");
	}

	playFlip() {
		this.flip.play();
	}
	playCard() {
		this.card.play();
	}
	playInvalid() {
		this.invalid.currentTime = 0;
		this.invalid.play();
	}
	playSelect() {
		this.select.currentTime = 0;
		this.select.play();
	}
	playSpecial() {
		this.special.play();
	}
	playBGM() {
		this.bgm.currentTime = 0;
		this.bgm.loop = true;
		this.bgm.volume = 0.5;
		this.bgm.play();
	}
	stopBGM() {
		this.bgm.pause();
	}
	playFanfare() {
		this.fanfare.currentTime = 0;
		this.fanfare.loop = true;
		this.fanfare.volume = 0.5;
		this.fanfare.play();
	}
	stopFanfare() {
		this.fanfare.pause();
	}
}
