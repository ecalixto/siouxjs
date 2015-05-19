module siouxjs {

    export class UIRankingItem extends createjs.Container {

        private _label: createjs.Text;

        constructor() {
            super();

            var mask = new createjs.Shape();
            mask.graphics.beginFill("#f00").drawRect(0, 0, 200, 50);
            this.addChild(mask);

            this.setBounds(0, 0, 200, 50);

            this._label = new createjs.Text('', Theme.General.titulo, Theme.General.textoCor1);
            this.addChild(this._label);

        }

        public update(nItem: number, obj: RankingItem = null): void {
            if (obj != null) {
                this._label.text = nItem.toString() + ' ' + obj.sNome;
            } else {
                this._label.text = nItem.toString();
            }
        }
    }
}