/// <reference path="../../../typings/createjs/createjs.d.ts" />
/// <reference path="./PopupManager.ts" />
module siouxjs {
    "use strict";

    export class Popup extends createjs.Container {

        private _manager: PopupManager;

        get manager(): PopupManager {
            return this._manager;
        }
        set manager(value: PopupManager) {
            this._manager = value;
        }
        public onOpen(): void {
        }

        public onClose(): void {
        }

    }
}
console.log("siouxjs.Popup.ts");