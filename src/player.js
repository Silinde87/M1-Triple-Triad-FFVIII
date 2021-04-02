class Player {
	constructor(name, deck) {
		this.deck = deck;
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
				card = new Card(this.deck);
				randomCards.push(card);
			} while (!randomCards.includes(card));
		}
		return randomCards;
	}
}
