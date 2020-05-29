import { ImageConstants } from '../../constants/image.constants';

export default class StartCoinSprite extends Phaser.GameObjects.Sprite {
    animSpin: string = 'spin';

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, '')
        scene.add.existing(this)

        this.scene.anims.create({
            key: this.animSpin,
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 6, prefix: 'gold-star-' }),
            frameRate: 4,
            repeat: -1,
        });

        this.play(this.animSpin)
    }

    update() { }
}