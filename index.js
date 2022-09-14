import * as kotonoha from './lib/kotonoha.js';

// minMaxCount('./dictionary/kotonoha.txt', './dictionary/count.txt');

const step = 1

function dict(i) {
  return i ? `./work/${i}.txt` : './dictionary/kotonoha.txt';
}

kotonoha.outputCandidates(dict(step - 1), dict(step), (word) => (
  // word[0] !== 'ウ' && word.includes('ウ') &&
  // word[1] !== 'イ' && word.includes('イ') &&
  // word[2] !== 'ン' && word.includes('ン') &&
  // word[3] !== 'リ' && word.includes('リ') &&
  // word[4] !== 'ー' && word.includes('ー') &&
  word.match(/^[^ウインリー]*$/)
));

kotonoha.minMaxCount(dict(step), `./work/count${step}.txt`, 'ウ');
kotonoha.countCharPosition(dict(step), 'ウ');
