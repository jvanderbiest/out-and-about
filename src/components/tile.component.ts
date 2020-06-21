export default class TileComponent extends Phaser.Physics.Arcade.Sprite {
  tileName: string;
  tileColliders: Array<string>;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string, tilePosition?: TilePosition) {
    super(scene, x, y, texture, frame)
    this.setOrigin(0, 0)
    this.tileName = tilePosition?.name;
    this.tileColliders = tilePosition?.colliders;

    scene.add.existing(this)

    var isStatic = true;
    if (tilePosition?.xSlide) {
      isStatic = false;
    }
    scene.physics.add.existing(this, isStatic)

    if (this.frame.name.startsWith('water')) {
      this.body.immovable = true;
    }

    if (tilePosition?.xSlide) {
      //@ts-ignore
      this.body.allowGravity = false;
      this.body.immovable = true;
      //@ts-ignore
      this.setVelocityX(200);
    }
  }
}