module siouxjs {
    export class GameObject extends createjs.Sprite {

        private _isDrag: boolean = false;
        public get isDrag(): boolean { return this._isDrag; }

        private _dragPoint: createjs.Point;


        constructor(spriteSheet: createjs.SpriteSheet, frameOrAnimation: string) {
            super(spriteSheet, frameOrAnimation);
        }

        public centerReg(): void {
            this.regX = this.getBounds().width / 2;
            this.regY = this.getBounds().height / 2;
        }

        // itpoCentralizacao, defini como será a centralização do Drag em relacao ao mouse:
        // zero = centraliza na coordenada zero do elemento
        // centro = centraliza objeto
        // livre = mantem a distacia entre o mouse e o elemento
        public startDrag(tipoCentralizacao: string = 'zero'): void {

            if (!this._isDrag) {
                this.stage.addEventListener("stagemousemove", this.dragMove.bind(this));
                this._isDrag = true;

                // Centralização
                switch (tipoCentralizacao) {
                    case 'centro':
                        this._dragPoint = new createjs.Point(this.getBounds().width / 2, this.getBounds().height / 2);
                        break;
                    case 'livre':
                        this._dragPoint = new createjs.Point(siouxjs.mouseX(this.stage) - this.x, siouxjs.mouseY(this.stage) - this.y);
                        break;
                    default:
                        this._dragPoint = new createjs.Point(0, 0);
                        break;
                }

            }
        }

        private dragMove(): void {
            this.x = siouxjs.mouseX(this.stage) - this._dragPoint.x;
            this.y = siouxjs.mouseY(this.stage) - this._dragPoint.y;
        }

        public stopDrag(): void {
            if (this._isDrag) {
                this.stage.removeEventListener("stagemousemove", this.dragMove.bind(this));
                this._isDrag = false;
            }
        }
    }
}