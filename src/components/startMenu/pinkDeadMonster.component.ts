import { ImageConstants } from '../../constants/image.constants';

export default class PinkDeadMonsterSprite extends Phaser.GameObjects.Sprite {
    animHit:string= 'pink-hit';
    animCrawl: string= 'pink-crawl';

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, '')
        scene.add.existing(this)

        scene.anims.create({
            key: this.animHit,
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 6, prefix: 'pink-monster-hit-' }),
            frameRate: 6,
            repeat: -1,
            yoyo: true
        });

        scene.anims.create({
            key: this.animCrawl,
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 17, prefix: 'pink-monster-' }),
            frameRate: 17,
            yoyo: true,
            repeat: -1
        });

        this.setScale(1);
    }

    dead() {
        this.play(this.animHit);
    }

    alive() {
        this.play(this.animCrawl);
    }

    update() { }
}