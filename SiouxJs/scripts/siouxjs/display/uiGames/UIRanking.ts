module siouxjs {
    "use strict";

    export class RankingItem {

        public sNome: string;
        public nPonto: number;

        constructor(sNome: string, nPonto: number) {
            this.sNome = sNome;
            this.nPonto = nPonto;
        }
    }

    export class UIRanking extends createjs.Container {

        private _img9bg: ui.Scale9Bitmap;

        private _objList: UIList;

        constructor() {
            super();

            // Imagem de Fundo
            var bg = <HTMLImageElement> siouxjs.Assets[Theme.Ranking.img9bg];
            this._img9bg = new ui.Scale9Bitmap(new createjs.Bitmap(bg).image, Theme.Ranking.size9bg);
            this._img9bg.setDrawSize(Theme.Ranking.largura, Theme.Ranking.altura);
            this.addChild(this._img9bg);


            // List
            var ranking: Array<RankingItem> = new Array();
            ranking.push(new RankingItem('Philippe', 100));
            ranking.push(new RankingItem('A', 100));
            ranking.push(new RankingItem('B', 100));
            ranking.push(new RankingItem('C', 100));
            ranking.push(new RankingItem('D', 100));
            ranking.push(new RankingItem('E', 100));
            ranking.push(new RankingItem('F', 100));
            ranking.push(new RankingItem('G', 100));
            ranking.push(new RankingItem('H', 100));
            ranking.push(new RankingItem('I', 100));
            ranking.push(new RankingItem('J', 100));
            ranking.push(new RankingItem('K', 100));
            ranking.push(new RankingItem('L', 100));

            this._objList = new UIList(this.itemRenderer, ranking);
            this._objList.x = Theme.Ranking.listX;
            this._objList.y = Theme.Ranking.listY;
            this._objList.width = Theme.Ranking.listLargura;
            this._objList.height = Theme.Ranking.listAltura;
            this.addChild(this._objList);

        }

        public itemRenderer(): any {
            return new UIRankingItem();
        }

    }
}