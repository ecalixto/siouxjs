module siouxjs.ui {
    "use strict";

    export class Button extends createjs.Container {

        private _onClick: (eventObj: Object) => void;
        private _isSelected: boolean;

        public nState: number;

        constructor() {
            super();
            this.nState = 0;
            this.mouseChildren = false;

            this.on("mousedown",(e: MouseEvent) => { this.mousedown(e); });
            this.on("pressup",(e: MouseEvent) => { this.pressup(e); });
            this.on("click",(e: MouseEvent) => { this.click(e); });
        }

        private mousedown(event:MouseEvent): void {
            if (this._isSelected) {
                return;
            }

            this.nState = 1;
            this.state();
        }
        private pressup(event: MouseEvent): void {
            if (this._isSelected) {
                return;
            }

            this.nState = 0;
            this.state();
        }
        private click(event: MouseEvent): void {
            if (this._onClick) {
                this._onClick(event);
            }
        }

        public set isSelected(value: boolean) {
            this._isSelected = value;

            if (this._isSelected) {
                this.nState = 1;
            } else {
                this.nState = 0;
            }
            this.state();
        }

        public get isSelected() {
            return this._isSelected;
        }

        public onClick(listener: (eventObj: Object) => void) {
            this._onClick = listener;
        }

        public state(): void {

        }

    }
}