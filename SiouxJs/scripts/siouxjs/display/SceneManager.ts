/// <reference path="./Scene.ts" />
module siouxjs {
    "use strict";

    export class SceneManager extends createjs.Container {

        private _currentScene: Scene;
        public get currentScene(): Scene {
            return this._currentScene;
        }
        private _outScene: Scene;

        private _isBusy: Boolean = false;
        private _inTransition: defines.Transition;
        private _outTransition: defines.Transition;
        private _timeTransition: number;

        constructor() {
            super();
        }

        /*
            Executa a Transição de uma Tela
        */
        public changeScene(toScene: Scene, inTransition: defines.Transition = defines.Transition.Cover,
            outTransition: defines.Transition = defines.Transition.None, timeTransition: number = 500): void {

            // if the scene doesnt really changes, there is nothing to do
            if (toScene === this._currentScene) {
                return;
            }

            // if busy then returns
            if (this._isBusy) {
                return;
            }

            this._isBusy = true;

            this._inTransition = inTransition;
            this._outTransition = outTransition;
            this._timeTransition = timeTransition;

            this._outScene = this._currentScene;
            this._currentScene = toScene;
            this._currentScene.manager = this;
            this._currentScene.visible = false;
            this._currentScene.onBeginEnterScene();

            this.addChild(this._currentScene);
            this.removeScene();
        }

        private onChangeSceneComplete = (): void => {

            if (this._outScene != null) {
                this._outScene.onEndLeaveScene();
                this.removeChild(this._outScene);
                this._outScene = null;
            }
            this._currentScene.onEndEnterScene();
            this._isBusy = false;
        }

        private includeScene = (): void => {

            this._currentScene.visible = true;

            // Tela Entra
            switch (this._inTransition) {
                case defines.Transition.Up:
                    this._currentScene.y = this._currentScene.y - (siouxjs.App.Settings.appSizeGuide.height + 50);
                    createjs.Tween.get(this._currentScene).to({ y: 0 }, this._timeTransition).call(this.onChangeSceneComplete);
                    break;
                case defines.Transition.Down:
                    this._currentScene.y = this._currentScene.y + (siouxjs.App.Settings.appSizeGuide.height + 50);
                    createjs.Tween.get(this._currentScene).to({ y: 0 }, this._timeTransition).call(this.onChangeSceneComplete);
                    break;
                case defines.Transition.Left:
                    this._currentScene.x = this._currentScene.x - (siouxjs.App.Settings.appSizeGuide.width + 50);
                    createjs.Tween.get(this._currentScene).to({ x: 0 }, this._timeTransition).call(this.onChangeSceneComplete);
                    break;
                case defines.Transition.Right:
                    this._currentScene.x = this._currentScene.x + (siouxjs.App.Settings.appSizeGuide.width + 50);
                    createjs.Tween.get(this._currentScene).to({ x: 0 }, this._timeTransition).call(this.onChangeSceneComplete);
                    break;
                case defines.Transition.Blank:
                    this.onChangeSceneComplete();
                    break;
                default:
                    this.onChangeSceneComplete();
            }
        }

        private removeScene(): void {

            // Elementos que Sai
            if (this._outScene) {
                this._outScene.visible = true;
                this._outScene.onBeginLeaveScene();

                // Tela Entra
                switch (this._outTransition) {
                    case defines.Transition.Up:
                        this._outScene.y = 0;
                        createjs.Tween.get(this._outScene).to({ y: (this._outScene.y - (siouxjs.App.Settings.appSizeGuide.height + 50)) }, this._timeTransition).call(this.includeScene);
                        break;
                    case defines.Transition.Down:
                        this._outScene.y = 0;
                        createjs.Tween.get(this._outScene).to({ y: (this._outScene.y + (siouxjs.App.Settings.appSizeGuide.height + 50)) }, this._timeTransition).call(this.includeScene);
                        break;
                    case defines.Transition.Left:
                        this._outScene.x = 0;
                        createjs.Tween.get(this._outScene).to({ x: (this._outScene.x - (siouxjs.App.Settings.appSizeGuide.width + 50)) }, this._timeTransition).call(this.includeScene);
                        break;
                    case defines.Transition.Right:
                        this._outScene.x = 0;
                        createjs.Tween.get(this._outScene).to({ x: (this._outScene.x + (siouxjs.App.Settings.appSizeGuide.width + 50)) }, this._timeTransition).call(this.includeScene);
                        break;
                    case defines.Transition.Blank:
                        this.includeScene();
                        break;
                    default:
                        this.includeScene();
                }
            } else {
                this.includeScene();
            }
        }
    }
}
console.log("siouxjs.SceneManager.ts");