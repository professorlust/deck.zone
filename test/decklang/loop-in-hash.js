import test from 'ava';
import { testPassFailCases, parseAndFirst, run } from '../_helpers';

const passCases = [
  `
  loop = <x> in { "Test": 1, "Test2": 2 }
    text = <x_index>, "<x> <x_value>", 0, 0, 1, 1
  endloop`
];

const failCases = [
  `loop`,
  `loop = `,
  `loop = <x> in {}`,
  `loop = <x = 0> in { 1 }`
];

const loopTest = ['loop = <x> in { "Test": 1, "Test2": 2 }', 'text = <x_index>, "<x>", 0, <x_value>, 1, 1', 'endloop'].join('\n');

test(`loopIn construct is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`loopIn construct data is pulled correctly`, t => {
  const ran = parseAndFirst(loopTest);

  t.true(ran.loopStart.start.varName === 'x');
  t.true(ran.loopStart.iterations.length === 2);
  t.true(ran.loopStart.iterations[0].key === 'Test');
  t.true(ran.loopStart.iterations[0].val === 1);
  t.true(ran.loopStart.iterations[1].key === 'Test2');
  t.true(ran.loopStart.iterations[1].val === 2);

  t.true(ran.ops.length === 1);
});

test(`loopIn construct data is parsed correctly`, t => {
  const ran = run(loopTest);

  const { texts } = ran.cards.front[0];
  const { string, top, left, width, height } = texts[0];

  t.true(string === 'Test');
  t.true(top === '1cm');
  t.true(left === '0cm');
  t.true(width === '1cm');
  t.true(height === '1cm');
});