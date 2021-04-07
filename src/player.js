/** Class representing a Player */
class Player {
	/**
	 * Create a player.
	 * @param {string} name - The name value.
	 * @param {array} deck - The list of cards.
	 * @param {HTMLElement} canvas - The canvas HTML Element.
	 */
	constructor(name, deck, canvas) {
		this.name = name;
		this.deck = deck;
		this.canvas = canvas;
		this.cardsInHand = this.getRandomCards();
		this.numCards = this.cardsInHand.length;
	}

	/**
	 * Updates the quantity of cards.
	 * @return {integer} - The quantity of cards in hand.
	 */
	updateNumCards() {
		this.numCards = this.cardsInHand.length;
		return this.numCards;
	}

	/**
	 * Get 5 unique random cards from Deck
	 * @return {array} - List of five cards.
	 */
	getRandomCards() {
		const randomCards = [];
		for (let i = 0; i < 5; i++) {
			let card = null;
			do {
				card = new Card(this.deck, this.canvas, this.name);
			} while (this.isDuplicated(randomCards, card));
			randomCards.push(card);
		}
		return randomCards;
	}

	/**
	 * Assist function, checks for duplicated cards in an array. Looking for name.
	 * @param {array} arr - The array to seek for cards.
	 * @param {Card} card - The Card to check for duplicity.
	 * @return {boolean} - True if card is duplicated.
	 */
	isDuplicated(arr, card) {
		let output = false;
		arr.forEach((el) => {
			if (el.cardName === card.card.name) output = true;
		});
		return output;
	}

	/**
	 * Removes the card passed as parameter from cardsInHandArray.
	 * @param {Card} card - The Card to remove.
	 * @return {Card} - The Card removed
	 */
	removeCardFromHand(card) {
		const indexFromCard = this.cardsInHand.indexOf(card);
		return this.cardsInHand.splice(indexFromCard, 1)[0];
	}
}
