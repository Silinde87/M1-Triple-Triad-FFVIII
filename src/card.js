class Card {
	constructor(deck) {
		this.card = this.drawCard(deck);
		this.id = this.card.id;
		this.cardName = this.card.name;
		this.ranks = this.loadCardRanks(this.card);
		this.backgroundColor;
		this.imgSrc;
		this.positionOnBoard;
		this.playerOwner;
	}
	loadImage() {}

	getFileName() {}

	loadCardRanks(card) {
		const ranks = [];
		for (let i = 0; i < card.ranks.length; i++) {
			ranks.push(card.ranks[i]);
		}
        return ranks;
	}
	drawCard(deck) {        
		const index = Math.floor(Math.random() * deck.length);
		return deck[index];
	}
	fillCardBackground() {}
	flipCard() {}
	compareRank(rankToCompare) {}
}
