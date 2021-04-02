class Player {
	constructor(name, deck, canvas) {
		this.deck = deck;
		this.canvas = canvas;
		this.cardsInHand = this.getRandomCards();
		this.name = name;
		this.numCards = this.cardsInHand.length;
	}

	updateNumCards() {}
	getRandomCards() {
		const randomCards = [];
		for (let i = 0; i < 5; i++) {
			let card = null;
			//Avoid duplicated cards on hand
			do {
				card = new Card(this.deck, this.canvas);
				randomCards.push(card);
			} while (!randomCards.includes(card));
		}
		return randomCards;
	}
}
