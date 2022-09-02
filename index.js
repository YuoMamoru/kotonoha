import * as kotonoha from './lib/kotonoha.js';

// minMaxCount('./dictionary/kotonoha.txt', './dictionary/count.txt');

kotonoha.outputCandidates('./dictionary/kotonoha.txt', './work/1.txt', (word) => (
  word[0] !== 'ウ' && word.includes('ウ') &&
  word.match(/^[^インリー]*$/)
));

kotonoha.minMaxCount('./work/1.txt', './work/count1.txt', 'ウ');
kotonoha.countCharPosition('./work/1.txt', 'ウ');
