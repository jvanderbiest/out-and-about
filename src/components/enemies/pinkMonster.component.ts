import { ImageConstants } from '../../constants/image.constants';
import EnemyClass from './enemiesClass';

export default class PinkMonsterSprite extends EnemyClass {
    constructor(scene: Phaser.Scene, x: number, y: number, public killScore: number) {
        super(scene, x, y, '', killScore)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        scene.anims.create({
            key: 'pink-monster-hit',
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 6, prefix: 'pink-monster-hit-' }),
            frameRate: 6,
            repeat: -1
        });

        scene.anims.create({
            key: 'pink-monster-crawl',
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 17, prefix: 'pink-monster-' }),
            frameRate: 17,
            yoyo: true,
            repeat: -1
        });

        this.play('pink-monster-crawl')

        this.body.velocity.set(-60);
        this.setOrigin(0.5, 1)
        this.setScale(1)
        this.body.setSize(48, 36)
    }

    update() { }

    kill() {
        if (this.dead) return
        this.play('pink-monster-hit')
        this.removeEnemy()
    }
}