class Player {
	constructor(name, deck, canvas) {
		this.name = name;
		this.deck = deck;
		this.canvas = canvas;
		this.cardsInHand = this.getRandomCards();
		this.numCards = this.cardsInHand.length;
	}

	updateNumCards() {
		this.numCards = this.cardsInHand.length;
	}
	getRandomCards() {
		const randomCards = [];
		for (let i = 0; i < 5; i++) {
			let card = null;
			//Avoid duplicated cards on hand
			do {
				card = new Card(this.deck, this.canvas, this.name);
				randomCards.push(card);
			} while (!randomCards.includes(card));
		}
		return randomCards;
	}
}
