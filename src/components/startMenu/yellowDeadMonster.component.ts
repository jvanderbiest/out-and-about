import { ImageConstants } from '../../constants/image.constants';

export default class YellowDeadMonsterSprite extends Phaser.GameObjects.Sprite {
    animHit:string= 'yellow-hit';
    animCrawl: string= 'yellow-crawl';

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, '')
        scene.add.existing(this)

        scene.anims.create({
            key: this.animHit,
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 2, prefix: 'yellow-monster-hit-' }),
            frameRate: 2,
            yoyo: true,
            repeat: -1
        });

        scene.anims.create({
            key: this.animCrawl,
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 8, prefix: 'yellow-monster-' }),
            frameRate: 8,
            yoyo: true,
            repeat: -1
        });
    }

    dead() {
        this.play(this.animHit);
    }

    alive() {
        this.play(this.animCrawl);
    }

    update() { }
}