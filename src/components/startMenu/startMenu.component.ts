import TileComponent from "../tile.component";
import { ImageConstants } from "../../constants/image.constants";
import PlayerComponent from "../player.component";
import StartMenuTileGroupComponent from "./startMenuTileGroup.component";
import { FontConstants } from "../../constants/font.constants";
import { SceneConstants } from "../../constants/scene.constants";
import PinkDeadMonsterSprite from "./pinkDeadMonster.component";
import YellowDeadMonsterSprite from "./yellowDeadMonster.component";
import StartCoinSprite from "./startCoin.component";

export default class StartMenuComponent extends Phaser.GameObjects.Group {
    order: number;

    constructor(public scene: Phaser.Scene, private width: number, private height: number) {
        super(scene)
        // scene.add.existing(this)

        this.initialize();
    }

    resize() {
        var tileSize = 64;
        var xOffset = this.scene.cameras.main.displayWidth / 2 - (9 * tileSize);
        var yOffset = this.scene.cameras.main.displayHeight / 2 - (4 * tileSize);

        this._tilesGroup.children.each((item: TileComponent) => {
            item.setOffset(xOffset, yOffset)
            item.setDisplayOrigin(-xOffset, -yOffset)
        });


        this._plusText.setX(xOffset + 150);
        this._plusText.setY(yOffset - 60);

        this._startText.setX(xOffset + 455);
        this._startText.setY(yOffset + 350);




        this._objectiveText.setX(xOffset + 335);
        this._objectiveText.setY(yOffset + 155);

        this._logoText.setX(xOffset + 175);
        this._logoText.setY(yOffset + 30);

        this._key.setX(xOffset + 250);
        this._key.setY(yOffset - 35);

        this._door.setX(xOffset + 450);
        this._door.setY(yOffset - 35);

        this._pinkDeadMonster.setX(xOffset + 880);
        this._pinkDeadMonster.setY(yOffset + 294);

        this._pinkAliveMonster.setX(xOffset + 250);
        this._pinkAliveMonster.setY(yOffset + 298);

        this._yellowDeadMonster.setX(xOffset + 940);
        this._yellowDeadMonster.setY(yOffset + 298);

        this._yellowAliveMonster.setX(xOffset + 190);
        this._yellowAliveMonster.setY(yOffset + 299);


        this._startCoin.setX(xOffset + 570);
        this._startCoin.setY(yOffset + 245);
        
        this._beerButton.setX(xOffset + 1050);
        this._beerButton.setY(yOffset + 480);

        this._githubButton.setX(xOffset + 125);
        this._githubButton.setY(yOffset + 480);

        this._player.setX(xOffset + 100);
        this._player.setY(yOffset - 100);
    }

    _tilesGroup: StartMenuTileGroupComponent;
    _player: PlayerComponent;
    _collider: any;
    _plusText: Phaser.GameObjects.Text;
    _key: Phaser.GameObjects.Image;
    _door: Phaser.GameObjects.Image;
    _startText: Phaser.GameObjects.Text;
    _logoText: Phaser.GameObjects.Text;
    _objectiveText: Phaser.GameObjects.Text;
    _doubleSizeText: Phaser.GameObjects.Text;
    _pinkAliveMonster: PinkDeadMonsterSprite;
    _pinkDeadMonster: PinkDeadMonsterSprite;
    _yellowAliveMonster: YellowDeadMonsterSprite;
    _yellowDeadMonster: YellowDeadMonsterSprite;
    _startCoin: StartCoinSprite;
    _githubButton: Phaser.GameObjects.Image;
    _beerButton: Phaser.GameObjects.Image;
    
    initialize() {


        // this.setScrollFactor(0);
        this._tilesGroup = new StartMenuTileGroupComponent(this.scene, 0, 0);
        // this.scene.add.existing(this._tilesGroup)

        var tileSize = 64;
        var xOffset = this.scene.cameras.main.displayWidth / 2 - (4 * tileSize);
        var yOffset = this.scene.cameras.main.displayHeight / 2 - (3 * tileSize);


        this._player = new PlayerComponent(this.scene, {
            width: 21,
            height: 35,
            texture: "player"
        });
        this._player.setX(xOffset + 100);
        this._player.setY(yOffset - 100);
        this._collider = this.scene.physics.add.collider(this._tilesGroup, this._player);

        this._plusText = new Phaser.GameObjects.Text(this.scene, 0, 0, "+", {
            color: '#000',
            fontFamily: FontConstants.Fonarto,
            //@ts-ignore
            fontSize: 46,
            fontStyle: 'bold'
        });
        // this.scene.add.existing(this._plusText);

        this._startText = new Phaser.GameObjects.Text(this.scene, 0, 0, "play", {
            color: '#fff',
            fontFamily: FontConstants.Fonarto,
            //@ts-ignore
            fontSize: 112,
        });
        this.scene.add.existing(this._startText);

        this.scene.tweens.add({
            targets: this._startText,
            alpha: 0.3,
            ease: 'Cubic.easeOut',
            duration: 750,
            repeat: -1,
            yoyo: true
        });

        this._startText.setInteractive({ useHandCursor: true }).on('pointerdown', (pointer, localX, localY, event) => {
            this.scene.scene.start(SceneConstants.GameScene);
            this.scene.scene.remove(SceneConstants.StartScene);
        });

        this._objectiveText = new Phaser.GameObjects.Text(this.scene, 0, 0, "play fast... and play smart!", {
            color: '#FFCC00',
            fontFamily: FontConstants.Fonarto,
            //@ts-ignore
            fontSize: 36
        });
        this.scene.add.existing(this._objectiveText);


        this._logoText = new Phaser.GameObjects.Text(this.scene, 0, 0, "out and about", {
            color: '#fff',
            fontFamily: FontConstants.Fonarto,
            //@ts-ignore
            fontSize: 114,
        });
        this.scene.add.existing(this._logoText);



        this._key = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageConstants.GameTexture, "key");
        // this.scene.add.existing(this._key);

        this._door = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageConstants.GameTexture, "door");
        this._door.setScale(0.4);
        // this.scene.add.existing(this._door);

        this._pinkDeadMonster = new PinkDeadMonsterSprite(this.scene, 0, 0);
        this._pinkDeadMonster.dead();
        this.scene.add.existing(this._pinkDeadMonster);

        this._pinkAliveMonster = new PinkDeadMonsterSprite(this.scene, 0, 0);
        this._pinkAliveMonster.alive();
        this._pinkAliveMonster.setScale(0.85);
        this._pinkAliveMonster.setFlipX(true);
        this.scene.add.existing(this._pinkAliveMonster);

        this._yellowDeadMonster = new YellowDeadMonsterSprite(this.scene, 0, 0);
        this._yellowDeadMonster.dead();
        this._yellowDeadMonster.setScale(0.9);
        this.scene.add.existing(this._yellowDeadMonster);

        this._yellowAliveMonster = new YellowDeadMonsterSprite(this.scene, 0, 0);
        this._yellowAliveMonster.alive();
        this._yellowAliveMonster.setScale(0.95);
        this._yellowAliveMonster.setFlipX(true);
        this.scene.add.existing(this._yellowAliveMonster);

        this._startCoin = new StartCoinSprite(this.scene, 0, 0);
        this.scene.add.existing(this._startCoin);

        this._beerButton = this.scene.add.image(0, 0, ImageConstants.GameTexture, 'buy-me-beer').setInteractive({ useHandCursor: true });
        this._beerButton.on('pointerup', this.openBuyMeABeer, this);

        this._githubButton = this.scene.add.image(0, 0, ImageConstants.GameTexture, 'GitHub_Logo').setInteractive({ useHandCursor: true });
        this._githubButton.on('pointerup', this.openGithub, this);
    }

    openGithub() {
        this.openExternalLink("https://github.com/jvanderbiest/out-and-about");
    }

    openBuyMeABeer() {
        this.openExternalLink("https://www.buymeacoffee.com/wdn0Zl9mz");
    }

    openExternalLink(url: string) {

        var s = window.open(url, '_blank');

        if (s && s.focus) {
            s.focus();
        }
        else if (!s) {
            window.location.href = url;
        }
    }
}