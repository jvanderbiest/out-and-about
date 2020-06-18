import { ImageConstants } from "../constants/image.constants"
import Score from "./score.component";

export default class CoinSingle extends Phaser.Physics.Arcade.Sprite {
    private collecting: boolean = false
    private _sound: Phaser.Sound.BaseSound;
    private _score: Score;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, scale: number, sound: Phaser.Sound.BaseSound, score: Score ) {
        super(scene, x, y, ImageConstants.GameTexture, texture +"1")
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this._score = score;
        this._sound = sound;
        this.setImmovable()
        this.setScale(scale ?? 1);
        // @ts-ignore
        this.body.setAllowGravity(false)

        this.scene.anims.create({
            key: 'spin',
            frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 6, prefix: texture }),
            frameRate: 6,
            repeat: -1
        });
        this.play('spin')
    }

    collect() {
        if (this.collecting) return;
        this.collecting = true;
        this._score.add(Math.floor(10 * this.scale));
        this._sound.play();

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            y: '-=150',
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.destroy();
            }
        });
    };
}