/**
 * Get a random card from hand.
 * @param {array} hand - The list of cards of a hand
 * @return {Card} - The Random Card
 */
getRandomCard = (hand) => {
    let index = Math.floor(Math.random() * hand.length)
    return hand[index];
}

/**
 * Get a random available (null) cell from the gameboard
 * @param {array} gameboard - The list of cells from the gameboard
 * @return {integer} - The random index
 */
getAvailableCell = (gameboard) => {
    let index;
    do{
        index = Math.floor(Math.random() * gameboard.length);
    } while (gameboard[index]);
    return index;
}
