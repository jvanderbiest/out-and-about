import { ImageConstants } from "../constants/image.constants";
import BackgroundComponent from "../components/background.component";
import { BackgroundType } from "../domain/backgroundType";

export class BackgroundService {


    constructor(private _scene: Phaser.Scene) { }

    _backgrounds = new Array<BackgroundComponent>();

    initialize(background: BackgroundType) {
        var bgCount = 1;
        switch (background) {
            case BackgroundType.NatureBackground:
                bgCount = 8;
                break;
        }

        for (var i = bgCount; i >= 1; i--) {
            var backgroundComponent = new BackgroundComponent(this._scene, ImageConstants[`${BackgroundType[background]}${i}`], i);

            this._backgrounds.push(backgroundComponent);
        }
    }

    update() {
        if (this._scene) {
            this._backgrounds.forEach((background, i) => {
                // scroll parallex backgrounds except for the sun and background
                // if (i != 5 && i != 10) {
                background.updateParallax();
                // }
            });
        }
    }
}