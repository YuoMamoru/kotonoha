const { readFileSync, writeFileSync } = require('fs');

const fileOption = { encoding: 'utf8' };

/**
 * Extract candidate words for the correct answer.
 * @param {string} inputFile Path to the file containing input words
 * @param {string} outputFile Path to the output file
 * @param {filterCallback} filter Callback function for filtering words
 */
function outputCandidates(inputFile, outputFile, filter) {
  const words = readFileSync(inputFile, fileOption).trim().split('\n');
  const candidates = words.filter((word) => filter(word));
  console.log(`Found ${candidates.length} word${candidates.length > 1 ? 's' : ''}.`)
  writeFileSync(outputFile, candidates.join('\n'), fileOption);
}

/**
 * Calculates the score of the next word to be specified based on the min-max strategy.
 * @param {string} inputFile Path to the file containing input words
 * @param {string} outputFile Path to the output file
 * @param {string} hitChars Option. Characters known to be included in the correct word
 * @param {boolean} useBaseDictionary Option. Whether to extend the range of words specified next to
 * the original hotonoha dictionary. Default to `false`.
 * @param {filterCallback} filter Option. Callback function for filtering the range of words
 * specified next. Default to no filtering.
 */
function minMaxCount(inputFile, outputFile, hitChars = '', useBaseDictionary = false, filter = undefined) {
  const words = readFileSync(inputFile, fileOption).trim().split('\n');
  const baseWords = useBaseDictionary ? readFileSync('./dictionary/kotonoha.txt', fileOption).trim().split('\n') : words;
  const counts = (filter ? baseWords.filter(filter) : baseWords).map((word, i) => {
    const regex = new RegExp(`^[^${word.replace(new RegExp(`[${hitChars}]`, 'g'), '')}]*$`);
    return [i + 1, word, words.reduce((count, w) => w.match(regex) ? count + 1 : count, 0)];
  });
  counts.sort(([,, count1], [,, count2]) => count1 - count2)
  console.log('Top words:');
  counts.slice(0, 5).forEach(([, word, count]) => {
    console.log(`    ${word}: ${count.toString().padStart(6, ' ')}`);
  })
  writeFileSync(outputFile, counts.map((c) => c.join('\t')).join('\n'), fileOption);
}

/**
 * Displays the frequency of locations with a given letter in candidate words
 * @param {string} inputFile Path to file containing input words
 * @param {string} char Target charactor
 */
function countCharPosition(inputFile, char) {
  const words = readFileSync(inputFile, fileOption).trim().split('\n');
  const counts = words.reduce((c, word) => {
    for (let i = 0; i < 5; i += 1) {
      if (word[i] === char) c[i] += 1;
    }
    return c;
  }, [0, 0, 0, 0, 0])
  for (let i = 0; i < 5; i += 1) {
    console.log(`${'＿'.repeat(i)}${char}${'＿'.repeat(4 - i)}: ${counts[i].toString().padStart(3, ' ')}`);
  }
}

module.exports = {
  outputCandidates,
  minMaxCount,
  countCharPosition,
}

/**
 * This callback filter words.
 * @callback filterCallback
 * @param {string} word a word
 * @returns {boolean} `true` if a given word is a candidate, otherwise `false`.
 */
