import InventoryKey from "./inventoryKey.component";

export default class Inventory extends Phaser.GameObjects.Container {
  private _inventoryKey: InventoryKey;

  private _scene;
  constructor(scene: Phaser.Scene) {
    super(scene, scene.cameras.main.width - 400, 80)
    this._scene = scene;
    scene.add.existing(this);

    this._inventoryKey = new InventoryKey(this.scene);
  }

  toggleKey(show: boolean) {
    this._inventoryKey.show(show);
  }

  adjustPosition() {
    this.x = this._scene.cameras.main.width - 400;
    this.y = 80;

    this._inventoryKey.adjustPosition();
  }
}