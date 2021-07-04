const categoryCodes = {
    'general knowledge': 10,
    music: 12,
    maths: 19,
    sports: 21,
    geography: 22,
    history: 23,
    celebrities: 26,
    animals: 27,
}

export function fetchQuestions (selectedCategory){
    const categoryCode = categoryCodes[selectedCategory];
    const categoryURL = `https://opentdb.com/api.php?amount=10&category=${categoryCode}&difficulty=easy`;
    return fetch(categoryURL)
        .then((response)=> response.json())
        .then(({results})=> {
            if(!results){
                throw new Error('lol')
            }
            return results;
        })
}

export function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

export function shuffle(array){
     var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
