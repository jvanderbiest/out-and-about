import CoinComponent from "./coin.component"
import { SoundConstants } from "../constants/sound.constants";
import Score from "./score.component";
import { PositionCalculator } from "../helpers/positionCalculator";

export default class CoinGroupComponent extends Phaser.GameObjects.Group {
  private _pickup : Phaser.Sound.BaseSound;

   constructor(scene: Phaser.Scene, gameHeight: number, gameWidth: number, coins: CoinDetail[], private score: Score) {
    super(scene)

    this._pickup = this.scene.sound.add(SoundConstants.CoinPickup);

    coins.forEach(coin => {
      PositionCalculator.handle(gameHeight, gameWidth, coin.positions, coin.frame, this.addCoin)
    })
  }

  addCoin = (x: number, y: number, frame: string, scale: number) => {
    this.add(new CoinComponent(this.scene, x, y, frame, scale, this._pickup, this.score));
  }
}