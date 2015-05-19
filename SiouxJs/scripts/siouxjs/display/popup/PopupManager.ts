/// <reference path="./PopupData.ts" />
/// <reference path="./Popup.ts" />
module siouxjs {
    "use strict";

    export class PopupManager extends createjs.Container {

        private _popupQueue: Array<PopupData>;
        private _currentPopups: Array<Popup>;
        private _box: createjs.Shape = new createjs.Shape();

        constructor() {
            super();

            this._currentPopups = new Array<Popup>();
            this._popupQueue = new Array<PopupData>();

            this._box.graphics.beginFill(Theme.Popup.boxCor).drawRect(siouxjs.App.Settings.areaUtil.x, siouxjs.App.Settings.areaUtil.y, siouxjs.App.Settings.areaUtil.width - siouxjs.App.Settings.areaUtil.x, siouxjs.App.Settings.areaUtil.height - siouxjs.App.Settings.areaUtil.y);
            this._box.alpha = Theme.Popup.boxAlpha;

            this._box.on("mousedown", this.blockMouse.bind(this));
            this._box.on("pressup", this.blockMouse.bind(this));
            this._box.visible = false;
            this.addChild(this._box);

        }

        private blockMouse(e: MouseEvent): void {
            e.stopImmediatePropagation();
        }

        /*
            Executa a Transição de uma Tela
        */
        public addPopup(popup: Popup, queue: boolean = false, transicao: defines.Transition = defines.Transition.Cover, duracao: number = 500, center: boolean = true, positionX: number = 0, positionY: number = 0): void {

            var popupData: PopupData = new PopupData(popup, transicao, duracao, center, positionX, positionY);

            popup.manager = this;

            if (queue && (this._popupQueue.length > 0 || this._currentPopups.length > 0)) {
                this._popupQueue.push(popupData);
            } else {
                this.openPopup(popupData);
            }
        }

        private openPopup(popupData: PopupData): void {

            this._box.visible = true;

            this.removePopupFromQueue(popupData);

            this._currentPopups.push(popupData.popup);

            this.addChild(popupData.popup);
            popupData.popup.onOpen();

            this.popupAlign(popupData);

            this.popupTransition(popupData);
        }

        private openNextPopup(): void {
            if (this._popupQueue.length === 0 || this._currentPopups.length !== 0) {
                return;
            }
            this.openPopup(this._popupQueue[0]);
        }

        /**
         * Remove and destroy a popup created by the PopupManager
         * @param	popup
         */
        public removePopup(popup: Popup = this._currentPopups[0], bOpenNext: boolean = true): void {

            this._box.visible = false;

            popup.onClose();

            var indexPopup: number = this._currentPopups.indexOf(popup);

            if (indexPopup !== -1) {
                this._currentPopups.splice(indexPopup, 1);
            }

            this.removeChild(popup);

            if (bOpenNext) {
                this.openNextPopup();
            }
        }

        /**
         * Remove all popups, even the popups on queue
         */
        public removeAll(): void {

            if (this._popupQueue.length > 0) {
                this._popupQueue.splice(0, this._popupQueue.length);
            }

            var i: number = 0;
            var length: number = this._currentPopups.length;

            for (; i < length; i++) {
                this.removePopup(this._currentPopups[0], false);
            }
        }

        private removePopupFromQueue(popupData: PopupData): void {
            var indexPopup: number = this._popupQueue.indexOf(popupData);

            if (indexPopup !== -1) {
                this._popupQueue.splice(indexPopup, 1);
            }
        }

        private popupAlign(popupData: PopupData): void {

            if (popupData.center) {
                popupData.popup.x = (siouxjs.App.Settings.appSizeGuide.width - popupData.popup.getBounds().width) * 0.5;
                popupData.popup.y = (siouxjs.App.Settings.appSizeGuide.height - popupData.popup.getBounds().height) * 0.5;
            } else {
                popupData.popup.x = popupData.positionX;
                popupData.popup.y = popupData.positionY;
            }
        }


        private onOpenComplete = (): void => {

        }

        private popupTransition(popupData: PopupData): void {

            if (popupData.transicao !== defines.Transition.Blank) {

                var popup: Popup = popupData.popup;

                var toX: number = popup.x;
                var toY: number = popup.y;

                switch (popupData.transicao) {
                    case defines.Transition.Up:
                        popup.y = -popup.getBounds().height;
                        break;

                    case defines.Transition.Down:
                        popup.y = siouxjs.App.Settings.appSizeGuide.height;
                        break;

                    case defines.Transition.Left:
                        popup.x = -popup.getBounds().width;
                        break;

                    case defines.Transition.Right:
                        popup.x = siouxjs.App.Settings.appSizeGuide.width;
                        break;
                }

                createjs.Tween.get(popup).to({ y: toY, x: toX }, popupData.duracao).call(this.onOpenComplete);
            }
        }
    }
}
console.log("siouxjs.PopupManager.ts");