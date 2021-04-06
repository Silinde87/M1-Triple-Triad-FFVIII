class Player {
	constructor(name, deck, canvas) {
		this.name = name;
		this.deck = deck;
		this.canvas = canvas;
		this.cardsInHand = this.getRandomCards();
		this.numCards = this.cardsInHand.length;
	}

	// Updates the quantity of cards.
	updateNumCards() {
		this.numCards = this.cardsInHand.length;
		return this.numCards;
	}
	// Get 5 unique random cards from Deck
	getRandomCards() {
		const randomCards = [];
		for (let i = 0; i < 5; i++) {
			let card = null;
			do {
				card = new Card(this.deck, this.canvas, this.name);
			} while(this.isDuplicated(randomCards, card));
			randomCards.push(card);
		}
		return randomCards;
	}

	// Assist function, checks for duplicated cards in an array. Looking for name.
	isDuplicated(arr, card){
		let output = false;
		arr.forEach(el => {
			if(el.cardName === card.card.name) output = true;
		});
		return output;
	}

	// Removes the card passed as parameter in cardsInHandArray
	removeCardFromHand(card){
		const indexFromCard = this.cardsInHand.indexOf(card);
		return this.cardsInHand.splice(indexFromCard, 1)[0];
	}
}
