
import { Plugin } from '../_base/_plugin';

export class CardSize extends Plugin {

  static get help() { return 'cardsize = width, height'; }

  static get docs() { return 'The cardsize directive is used to determine thee width and height of each card.'; }

  static get examples() {
    return [
      'cardsize = poker',
      'cardsize = 2.5in, 3.5in'
    ];
  }

  static get snippets() {
    return [`
snippet cardsize
\tcardsize = \${1:width}, \${2:height}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { width, height } = args;

    state.options.card.width = super.combineForUnit(width, state);
    state.options.card.height = super.combineForUnit(height, state);
  }

}