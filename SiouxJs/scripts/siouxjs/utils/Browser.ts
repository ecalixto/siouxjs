module siouxjs.util {
    "use strict";

    export class Browser {

        static Android(): boolean {
            return navigator.userAgent.match(/Android/i)!= null;
        }
        static iOS(): boolean {
            if (navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                ) {
                return true;
            }
            else {
                return false;
            }
        }
        static BlackBerry(): boolean {
            return navigator.userAgent.match(/BlackBerry/i) != null;
        }
        static Opera(): boolean {
            return navigator.userAgent.match(/Opera Mini/i) != null;
        }
        static Windows(): boolean {
            return navigator.userAgent.match(/IEMobile/i) != null;
        }
        static isMobile(): boolean {
            if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
                ) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}