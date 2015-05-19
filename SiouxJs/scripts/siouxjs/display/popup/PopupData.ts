module siouxjs {
    "use strict";

    export class PopupData {

        public popup: Popup;
        public center: boolean;
        public transicao: number;
        public duracao: number;
        public positionX: number;
        public positionY: number;

        constructor(popup: Popup, transicao: number, duracao: number, center: boolean, positionX: number, positionY: number) {
            this.popup = popup;
            this.center = center;
            this.transicao = transicao;
            this.duracao = duracao;
            this.positionX = positionX;
            this.positionY = positionY;
        }
    }
}