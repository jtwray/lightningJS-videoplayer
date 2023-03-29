import { Lightning, VideoPlayer } from '@lightningjs/sdk'

export class Player extends Lightning.Component {
  static _template() {
    return {
      color: 0x00000000,
      alpha: 0,
    }
  }
  _init() {
    VideoPlayer.consumer(this)
    VideoPlayer.position(0, 0)
    // VideoPlayer.position(topINT, leftINT)
    VideoPlayer.size(1920, 1080)
    this.url = 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1081982-uvjZL4YmLG-high.mp4'
    VideoPlayer.open(this.url)
  }
}
