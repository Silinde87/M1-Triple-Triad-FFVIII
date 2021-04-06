class Sounds {
	constructor() {
		this.flip = new Audio("assets/sounds/sound-turn.wav");
		this.card = new Audio("assets/sounds/sound-back.wav");
		this.invalid = new Audio("assets/sounds/sound-invalid.wav");
		this.select = new Audio("assets/sounds/sound-select.wav");
	}

	playFlip() {
		this.flip.play();
	}
	playCard() {
		this.card.play();
	}
	playInvalid() {
		this.invalid.play();
	}
	playSelect() {
		this.select.play();
	}
}
