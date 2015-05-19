module siouxjs.util {

    export interface IResource {
        language: string;
    }

    interface IResourceMap {
        [id: string]: IResource;
    }


    export class ResourceManager {

        private _res: IResourceMap = {};
        private _lang: string;

        constructor(...args: IResource[]) {
            for (var i = 0; i < args.length; i++ ) {
                this._res[args[i].language] = args[i];
            }
        }

        public setLanguage(lang: string): void {
            this._lang = lang;
        }

        public Resources<T extends IResource>(): T {
            return <T>this._res[this._lang];
        }
    }

}