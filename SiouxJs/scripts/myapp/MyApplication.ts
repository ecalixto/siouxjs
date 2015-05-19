/// <reference path="../siouxjs/Application.ts"/>
/// <reference path="backgroud.ts" />

module MyApp {
    export class MyApplication extends siouxjs.Application {

        public backgroud: Backgroud;
        private _resources: siouxjs.util.ResourceManager;

        get resources(): Resource {
            return this._resources.Resources<Resource>();
        }

        constructor() {
            super();

            this.setCanvas(new siouxjs.Canvas("background", 0));
            this.setCanvas(new siouxjs.Canvas("main"));
        }

        pause(): void {
        }

        resume(): void {
        }
        onBackKeyDown(): void {

            if (this._sceneManager.currentScene != null)
                this._sceneManager.currentScene.onBackKeyDown();

        }

        onBeforeLoad(): siouxjs.LoadingBase {
            var obj = new Loading();

            this.canvas["main"].stage.addChild(obj);
            return obj;
        }
        onAfterLoad(): void {
            this.canvas["main"].stage.removeAllChildren();
            return;
        }

        onReady(): void {

            // BackGroud
            this.backgroud = new Backgroud();
            this.canvas["background"].stage.addChild(this.backgroud);
            this.canvas["background"].update(true);

            // Controle de Telas
            this._sceneManager = new siouxjs.SceneManager();
            // Controle de Popup
            this._popups = new siouxjs.PopupManager();
            // Resources
            this._resources = new siouxjs.util.ResourceManager(enResource, ptResource);
            this._resources.setLanguage("pt");

            // Adiciona Layer no stage
            this.canvas['main'].stage.addChild(this._sceneManager, this.popups);

            // Muda a Tela
            this._sceneManager.changeScene(new Scenes.MainMenu());

        }
    }
}
console.log("myapp.MyApplication.ts");