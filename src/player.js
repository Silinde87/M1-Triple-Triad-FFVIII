class Player {
	constructor(name) {
		this.cardsInHand = this.getRandomCards();
		this.name = name;
		this.numCards = this.cardsInHand.length;
	}

	updateNumCards() {}
    getRandomCards() {
        const randomCards = []
        for(let i=0 ; i < 5 ; i++){
            const card = new Card();
            randomCards.push(card.drawCard());
        }
        return randomCards;
    }
}
