import { Lightning } from '@lightningjs/sdk'

export class Button extends Lightning.Component {
  static _template() {
    return {
      w: 100,
      h: 100,
      Label: {
        x: 50,
        y: 50,
        mount: 0.5,
        text: {
          text: this.bindProp('label'),
        },
      },
    }
  }
}
