import { Lightning, VideoPlayer } from '@lightningjs/sdk'
import { Button } from './Button'

export class Player extends Lightning.Component {
  static _template() {
    return {
      //   alpha: 0,
      w: 1920,
      h: 100,
      y: 980,
      rect: true,
      color: 0xdd808080,
      Buttons: {
        w: 1920,
        h: 100,
        flex: {
          alignItems: 'center',
        },
        Play: {
          type: Button,
          label: '>',
          name: 'Play',
        },
        Pause: {
          type: Button,
          label: '||',
          name: 'Pause',
        },
      },
    }
  }
  _init() {
    this.index = 0
    this.timeoutHandler()
    this._setState('Play')

    VideoPlayer.consumer(this)
    VideoPlayer.position(0, 0)
    // VideoPlayer.position(topINT, leftINT)
    VideoPlayer.size(1920, 1080)
    this.url = 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1081982-uvjZL4YmLG-high.mp4'
    VideoPlayer.open(this.url)
  }
  static _states() {
    return [
      class Play extends this {
        $enter() {
          this.setButtonColor('Play.Label', 0xfff78e30)
        }
        $exit() {
          this.setButtonColor('Play.Label', 0xffffffff)
        }
        _handleEnter() {
          VideoPlayer.play(this.url)
        }
      },
      class Pause extends this {
        $enter() {
          this.setButtonColor('Pause.Label', 0xfff78e30)
        }
        $exit() {
          this.setButtonColor('Pause.Label', 0xffffffff)
        }
        _handleEnter() {
          VideoPlayer.pause(this.url)
        }
      },
    ]
  }
  toggleInterface(visibleInterface) {
    // this.visibleInterface = !this.visibleInterface

    this.patch({
      smooth: {
        alpha: visibleInterface ? 1 : 0,
      },
    })
    if (visibleInterface) {
      this.timeoutHandler()
    }
  }
  timeoutHandler() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      this.toggleInterface(false)
    }, 3000)
  }
  setButtonColor(tag, color) {
    this.tag(tag).patch({
      text: { textColor: color },
    })
  }
  _handleEnter() {
    // if (!this.visibleInterface) return;
  }
  _handleLeft() {
    if (this.index == 0) return

    this.index--

    let stateName = this.tag('Buttons').children[this.index].name
    this._setState(stateName)
    this.toggleInterface(true)
  }

  _handleRight() {
    if (this.index == this.tag('Buttons').children.length - 1) return

    this.index++

    let stateName = this.tag('Buttons').children[this.index].name
    this._setState(stateName)
    this.toggleInterface(true)
  }
}
