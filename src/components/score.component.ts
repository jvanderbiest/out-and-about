import { ImageConstants } from "../constants/image.constants";
import ScoreText from "./scoreText.component";

export default class Score extends Phaser.GameObjects.Sprite {
  private _scoreText: ScoreText;

  private _scene;
  constructor(scene: Phaser.Scene) {
    super(scene, scene.cameras.main.width - 200, 20, ImageConstants.GameTexture, "score-1")
    this.setOrigin(0, 0).setScrollFactor(0)
    // this._currentScore = score;
    this._scene = scene;
    scene.add.existing(this);

    this._scoreText = new ScoreText(this.scene, this, 0);
  }

  add(score: number) {
    this._scoreText.add(score);
  }

  tick(seconds: number) {
    if (seconds >= 30) {
      this.setFrame("score-1");
    }
    else if (seconds < 30) {
      this.setFrame("score-2");
    }
    else if (seconds < 15) {
      this.setFrame("score-3");
    }
  }

  adjustPosition() {
    this.x = this._scene.cameras.main.width - 200;
    this.y = 20;

    this._scoreText.adjustPosition();
  }
}