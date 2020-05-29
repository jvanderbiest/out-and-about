import { ImageConstants } from '../../constants/image.constants';
import EnemyClass from './enemiesClass';

export default class YellowMonsterSprite extends EnemyClass {
    constructor(scene: Phaser.Scene, x: number, y: number, public killScore: number) {
        super(scene, x, y, '', killScore)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        scene.anims.create({
            key: 'yellow-monster-hit',
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 2, prefix: 'yellow-monster-hit-' }),
            frameRate: 2,
            repeat: -1
        });

        scene.anims.create({
            key: 'yellow-monster-crawl',
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 8, prefix: 'yellow-monster-' }),
            frameRate: 8,
            yoyo: true,
            repeat: -1
        });

        // scene.anims.create({
        //     key: 'fly',

        //     frames: scene.anims.generateFrameNumbers('yellow-monster-', { start: 0, end: 1 }),
        //     frameRate: 8,
        //     repeat: -1
        // })
        this.play('yellow-monster-crawl')

        this.body.velocity.set(-60);
        this.setOrigin(0.5, 1)
        this.setScale(1)
        this.body.setSize(48, 36)
        // this.body.setOffset(20, 20)
    }

    update() { }

    kill() {
        if (this.dead) return
        this.play('yellow-monster-hit')
        this.removeEnemy()
    }
}