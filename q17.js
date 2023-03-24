function capitalizeWords(text) {
    const regex = /[ \t\n\r,:;.]+/;
    const words = text.split(regex);
    const done = words.map(word => {
      // Remove special characters
      const trimmed = word.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
      // Capitalize the first letter of the word
      const firstLetter = trimmed.charAt(0).toUpperCase();
      // append the remaining 
      const remain = trimmed.slice(1);
      //return capitalized letters
      return firstLetter + remain;
      
    });
    return done.join(' ');
  }
// test
const text = 'lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor: incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis.  suscipit laboriosam, nisi ut  aliquid ex ea commodi  consequatur. Quis aute iure reprehenderit in voluptate; velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non.  proident, sunt in culpa qui officia; deserunt mollit anim id est laborum.';
console.log(capitalizeWords(text)); 