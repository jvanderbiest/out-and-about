import { FontConstants } from "../constants/font.constants";
import Score from "./score.component";

export default class ScoreText extends Phaser.GameObjects.Text {
  private _currentScore: number = 0;
  private _initialTime: number;
  private _timedEvent: Phaser.Time.TimerEvent;

  constructor(public _scene: Phaser.Scene, private _scoreGroup: Score, score: number) {
    super(_scene, _scene.cameras.main.width - 94, 35, "", {
      color: '#fff',
      fontFamily: FontConstants.Fonarto,
      //@ts-ignore
      fontSize: 20,
      fontStyle: 'bold'
    })
    this.setOrigin(1, 0).setScrollFactor(0)
    this._currentScore = score;
    _scene.add.existing(this)

    this._initialTime = 60;

    this._timedEvent = this.scene.time.addEvent({ delay: 1000, callback: this.onTimeEvent, callbackScope: this, loop: true });
  }

  add(score: number) {
    this._initialTime += score;
    this.setText(this.formatTime(this._initialTime));

    var style = {
      color: '#FF0000',
      fontFamily: FontConstants.Fonarto,
      //@ts-ignore
      fontSize: 20,
      fontStyle: 'bold'
    };

    console.log("width " + this._scene.cameras.main.width);

    var text = this._scene.add.text(this._scene.cameras.main.width - 240, 80, `+${score}`, style);
    text.alpha = 0.8;
    text.setScrollFactor(0);

    this.scene.tweens.add({
      targets: text,
      alpha: 0,
      y: '+=50',
      duration: 2000,
      ease: 'Power2',
      onComplete: () => {
        text.destroy();
      }
    });
  };

  adjustPosition() {
    this.x = this._scene.cameras.main.width - 94
    this.y = 35
  }

  formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var partInSeconds = (seconds % 60).toString();
    partInSeconds = partInSeconds.padStart(2, '0');
    return `${minutes}:${partInSeconds}`;
  }

  onTimeEvent() {
    this._initialTime -= 1; // One second

    if (this._initialTime <= 0) {
      //@ts-ignore
      this.scene.gameOver();
      this.setText(this.formatTime(0));
      this._timedEvent.destroy();
    }
    else {
      this.setText(this.formatTime(this._initialTime));
      this._scoreGroup.tick(this._initialTime);
    }


  }
}