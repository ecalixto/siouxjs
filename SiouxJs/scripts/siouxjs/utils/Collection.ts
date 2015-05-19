module siouxjs {
    "use strict";

    module util {
        export module Collection {

            export function ShuffleList(o: Array<any>): Array<any> {
                if (o != null && o.length > 0) {
                    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                }
                return o;
            }

            export function RemoveFromList(obj: any, list: Array<any>): void {
                var index: number;
                while ((index = list.indexOf(obj)) !== -1) {
                    list.splice(index, 1);
                }
            }


            export function RemoveAll(list: Array<any>): void {
                while (list.length > 0) {
                    list.pop();
                }
            }
        }
    }
}