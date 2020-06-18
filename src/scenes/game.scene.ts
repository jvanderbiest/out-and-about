import * as Phaser from 'phaser';
import BackgroundComponent from '../components/background.component';
import { BackgroundService } from '../services/background.service';
import Player from '../components/player.component';
import { TextConstants } from '../constants/text.constants';
import CoinGroupComponent from '../components/coinGroup.component';
import { SoundConstants } from '../constants/sound.constants';
import Controls from '../components/controls.component';
import Score from '../components/score.component';
import EnemiesGroup from '../components/enemies/enemiesGroup.component';
import YellowMonsterSprite from '../components/enemies/yellowMonster.component';
import DoorGoalSprite from '../components/doorGoal.component';
import DoorKeySprite from '../components/doorKey.component';
import Inventory from '../components/inventory.component';
import { SceneConstants } from '../constants/scene.constants';
import TileGroupDebugComponent from '../components/tileGroupDebug.component';
import TileComponent from '../components/tile.component';
import PlayerComponent from '../components/player.component';

export default class GameScene extends Phaser.Scene {
	player: Player;
	cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	platforms: Phaser.Physics.Arcade.StaticGroup;
	background: BackgroundComponent;
	first: Phaser.GameObjects.TileSprite;
	second: Phaser.GameObjects.TileSprite;
	private _backgroundService: BackgroundService;
	level: number;
	_backgrounds = new Array<Phaser.GameObjects.TileSprite>();
	controls: Controls;
	score: Score;
	enemiesGroup: EnemiesGroup;

	constructor() {
		super(SceneConstants.GameScene)
		this._backgroundService = new BackgroundService(this);

	}

	create() {
		var bgmusic = this.sound.add(SoundConstants.Background);
		bgmusic.play({
			volume: 1,
			loop: true
		});

		var configuration: Configuration = JSON.parse(this.game.cache.text.get(TextConstants.Configuration));

		var level = configuration.levels[0];

		this.cameras.main.fadeIn();

		this._backgroundService.initialize(level.background);

		this.cameras.main.setBounds(0, 0, level.platform.meta.levelWidth, level.platform.meta.levelHeight);
		this.physics.world.setBounds(0, 0, level.platform.meta.levelWidth, level.platform.meta.levelHeight);

		this.input.addPointer(1);
		this.cursors = this.input.keyboard.createCursorKeys();

		var gameHeight = this.sys.game.config.height as number;
		var totalGameHeight = gameHeight * 1.5;

		var gameWidth = this.sys.game.config.width as number;
		var totalGameWidth = gameWidth * 1.5;

		var avoidCollisionTiles = level.platform.tiles.filter((tile) =>
			tile.positions.every(position => position.noCollide));
		var avoidCollisionTilesGroup = new TileGroupDebugComponent(this, totalGameHeight, totalGameWidth, avoidCollisionTiles);


		var collisionTilesDebug = level.platform.tiles.filter((tile) =>
			tile.positions.every(position => !position.noCollide));
		var collisionTilesGroup = new TileGroupDebugComponent(this, totalGameHeight, totalGameWidth, collisionTilesDebug);



		var goal = new DoorGoalSprite(this)
		var key = new DoorKeySprite(this)

		this.score = new Score(this);

		const coinGroup = new CoinGroupComponent(this, totalGameHeight, totalGameWidth, level.platform.coins, this.score);
		this.controls = new Controls(this);
		var inventory = new Inventory(this);

		this.player = new Player(this, configuration.player);
		this.enemiesGroup = new EnemiesGroup(this)

		this.cameras.main.startFollow(this.player);

		// filter out colliders and collide them later for jumping hack on dynamic objects.
		this.physics.add.collider(collisionTilesGroup.getChildren().filter((x: TileComponent) => !x.tileColliders), this.player);
		this.physics.add.collider(collisionTilesGroup, this.enemiesGroup);

		this.physics.add.collider(collisionTilesGroup, this.enemiesGroup);

		collisionTilesGroup.getChildren().forEach((tileComponent: TileComponent) => {
			if (tileComponent.tileColliders && tileComponent.tileColliders.length > 0) {
				tileComponent.tileColliders.forEach(tileColliderName => {
					// get the tile object by name
					var matchedColliders = collisionTilesGroup.getChildren().filter((tileCollider: TileComponent) => {
						if (tileCollider.tileName == tileColliderName) {
							return true;
						}
						return false;
					});

					if (!matchedColliders || matchedColliders.length == 0) {
						console.error(`Trying to match a collider for tile with name '${tileColliderName}' but it could not be found.`)
					}

					if (matchedColliders.length > 1) {
						console.error(`Trying to match a collider for tile with name '${tileColliderName}' but multiple tiles by name were matched. Name should be unique.`)
					}

					if (matchedColliders.length == 1) {
						this.physics.add.collider(matchedColliders[0], tileComponent, (st, mover: TileComponent) => {
							//@ts-ignore
							mover.setVelocityX(-(mover.body.velocity.x));
						});
					}

					// hack to detect blocked body on dynamic gameobject
					this.physics.add.collider(tileComponent, this.player, (mover, player: PlayerComponent) => {
						if (player.body.touching.down) {
							player.body.blocked.down = true;
						}
					});
				})
			}
		});
		// tileComponent.slide(originalPosition.xSlide);


		this.physics.add.overlap(this.player, goal, (player: Player, goal: DoorGoalSprite) => {
			if (player.hasKey) {
				goal.unlockDoor();
			}
			// todo show bubble
		})

		this.physics.add.overlap(this.player, key, (player: Player, key: DoorKeySprite) => {
			key.pickup();
			player.hasKey = true;
			inventory.toggleKey(true);
		})

		// @ts-ignore
		this.physics.add.overlap(this.player, this.enemiesGroup, (player: Player, enemy: YellowMonsterSprite) => {
			if (enemy.dead) return;

			if (enemy.body.touching.up && player.body.touching.down) {
				player.killEnemy();
				enemy.kill();
				this.score.add(enemy.killScore);
			} else {

				var gotHurt = player.hurt();
				if (gotHurt) {
					this.score.add(-enemy.killScore)
				}
			}
		});

		this.physics.add.overlap(this.player, coinGroup, (player, coin) => {
			// @ts-ignore
			coin.collect();
		}, null, this)

		// todo, remove here
		let loadingScreen = document.getElementById('loading-screen')
		if (loadingScreen) {
			loadingScreen.classList.add('transparent')
			this.time.addEvent({
				delay: 1000,
				callback: () => {
					// @ts-ignore
					loadingScreen.remove();
					// @ts-ignore
					window.stopInterval();
				}
			})
		}

		const resize = () => {
			this.score.adjustPosition();
			this.controls.adjustPositions();
		}

		this.scale.on('resize', (gameSize: any) => {
			this.cameras.main.width = gameSize.width
			this.cameras.main.height = gameSize.height
			resize()
		})
		resize()
	}

	update() {
		this.controls.update();
		this.enemiesGroup.update();
		this.player.update(this.cursors, this.controls);
		this.score.adjustPosition();

		this._backgroundService.update();
	}

	_isGameOver: boolean;
	gameOver() {
		this.scene.pause();
		this._isGameOver = true;
		console.log("Game is over");
		this.scene.restart();
	}

	preload() {

	}
}