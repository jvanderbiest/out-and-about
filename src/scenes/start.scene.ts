import * as Phaser from 'phaser';
import { SceneConstants } from '../constants/scene.constants';
import { BackgroundService } from '../services/background.service';
import { BackgroundType } from '../domain/backgroundType';
import StartMenu from '../components/startMenu/startMenu.component';


export default class StartScene extends Phaser.Scene {

	constructor() {
		super(SceneConstants.StartScene)
	}

	startMenu: StartMenu;

	create() {
		this.cameras.main.fadeIn();
		this.cameras.main.setBackgroundColor("#77593c");
		new BackgroundService(this).initialize(BackgroundType.NatureBackground);
		console.log("here");

		var gameHeight = this.sys.game.config.height as number;
		var totalGameHeight = gameHeight * 1.5;

		var gameWidth = this.sys.game.config.width as number;
		var totalGameWidth = gameWidth * 1.5;

		this.startMenu = new StartMenu(this, totalGameWidth, totalGameHeight);

		const resize = () => {
			this.startMenu.resize();
		}

		this.scale.on('resize', (gameSize: any) => {
			if (this.cameras && this.cameras.main) {
				this.cameras.main.width = gameSize.width
				this.cameras.main.height = gameSize.height
				resize()
			}
		})
		resize()

		// remove the loading screen
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
	}



	update() {

	}

	preload() {

	}
}