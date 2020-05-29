export default class EnemyClass extends Phaser.Physics.Arcade.Sprite {
  protected _dead: boolean = false

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, protected _killScore: number) {
    super(scene, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
  }

  get dead() {
    return this._dead;
  }

  set dead(dead: boolean) {
    this._dead = dead;
  }

  protected removeEnemy() {
    this.dead = true;

    this.anims.stop()
    //@ts-ignore
    this.body.setVelocityX(0);

    this.scene.tweens.add({
      targets: this,
      delay: 500,
      duration: 200,
      alpha: 0,
      onComplete: () => {
        this.destroy()
      }
    });
  }
}