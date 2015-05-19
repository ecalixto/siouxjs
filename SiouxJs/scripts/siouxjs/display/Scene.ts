/// <reference path="../../typings/createjs/createjs.d.ts" />
/// <reference path="./SceneManager.ts" />
module siouxjs {
    "use strict";

    export class Scene extends createjs.Container {

        private _manager: SceneManager;

        get manager(): SceneManager {
            return this._manager;
        }
        set manager(value: SceneManager) {
            this._manager = value;
        }

        public onBeginEnterScene(): void {
        }
        public onEndEnterScene(): void {
        }

        public onBeginLeaveScene(): void {
        }
        public onEndLeaveScene(): void {
        }
        public onBackKeyDown(): void {
        }
    }
}
console.log("siouxjs.Scene.ts");