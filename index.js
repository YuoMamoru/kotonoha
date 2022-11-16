const kotonoha = require('./lib/kotonoha');

// minMaxCount('./dictionary/kotonoha.txt', './dictionary/count.txt');

function dict(i) {
  return i ? `./work/${i}.txt` : './dictionary/kotonoha.txt';
}

const step = 1

const re = '[^ウインリー]';
kotonoha.outputCandidates(dict(step - 1), dict(step), (word) => (
  // word[0] !== 'ウ' && word.includes('ウ') &&
  // word[1] !== 'イ' && word.includes('イ') &&
  // word[2] !== 'ン' && word.includes('ン') &&
  // word[3] !== 'リ' && word.includes('リ') &&
  // word[4] !== 'ー' && word.includes('ー') &&
  word.match(new RegExp(`^${re}*$`))
));

kotonoha.minMaxCount(dict(step), `./work/count${step}.txt`, 'ウ');
kotonoha.countCharPosition(dict(step), 'ウ');
