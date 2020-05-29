import { ImageConstants } from "../constants/image.constants";
import { TextConstants } from "../constants/text.constants";
import { SoundConstants } from "../constants/sound.constants";
import { FontConstants } from "../constants/font.constants";
import { SceneConstants } from "../constants/scene.constants";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneConstants.PreloadScene,
            pack: {
                //@ts-ignore
                files: [
                    {
                        type: 'rexWebFont',
                        key: 'webfont',
                        config: {
                            custom: {
                                families: [FontConstants.Fonarto, FontConstants.FonartoXT],
                                urls: ['/assets/fonts/fonts.css']
                            }
                        }
                    }
                ]
            }
        });
    }

    create() {
        this.scene.start(SceneConstants.StartScene);
        // this.scene.start(SceneConstants.GameScene);
        
    }

    preload() {
        this.loadAssets();
    }

    loadAssets() {
        const natureImages = [
            { key: ImageConstants.NatureBackground1, asset: 'backgrounds/nature/1.png' },
            { key: ImageConstants.NatureBackground2, asset: 'backgrounds/nature/2.png' },
            { key: ImageConstants.NatureBackground3, asset: 'backgrounds/nature/3.png' },
            { key: ImageConstants.NatureBackground4, asset: 'backgrounds/nature/4.png' },
            { key: ImageConstants.NatureBackground5, asset: 'backgrounds/nature/5.png' },
            { key: ImageConstants.NatureBackground6, asset: 'backgrounds/nature/6.png' },
            { key: ImageConstants.NatureBackground7, asset: 'backgrounds/nature/7.png' },
            { key: ImageConstants.NatureBackground8, asset: 'backgrounds/nature/8.png' }
        ];

        natureImages.forEach(image => {
            this.load.image(image.key, `assets/${image.asset}`);
        });

        this.load.audio(SoundConstants.Background, ['assets/sound/bg.mp3', 'assets/sound/bg.ogg']);
        this.load.audio(SoundConstants.CoinPickup, 'assets/sound/actions/coin-pickup.wav');

        this.load.text(TextConstants.Configuration, 'assets/game-config.json');
        this.load.atlas(ImageConstants.GameTexture, "assets/texture.png","assets/texture.json");
    }
}