/**
 * splash-screen is very simple to use to setup a splash-screen for your
 * application
 *
 * @author Howard.Zuo
 * @date   May 11th, 2016
 *
 **/

export interface SplashStatic {
    enable(theme: string, element?: any): void;
    isRunning(element?: any): boolean;
    destroy(element?: any): void;
    version: string;
}

let Splash: SplashStatic = {
    version: '2.4.0',
    enable: function (theme, element) {
        loadBody(element, function ($body) {
            if (Splash.isRunning($body)) {
                Splash.destroy($body);
            }
            addClass($body, 'splashing');
            const $splash = splashDiv();
            $body.appendChild($splash);

            if (!theme || !themes[theme]) {
                theme = 'tailing';
            }
            themes[theme]($splash);
            addClass($splash, theme);
        });
    },

    isRunning: function (element?: any) {
        if (element) return hasClass(element, 'splashing');
        if (!document || !document.body) {
            return;
        }
        return hasClass(document.body, 'splashing');
    },

    destroy: function (element?: any) {
        loadBody(element, function ($body) {
            removeClass($body, 'splashing');
            const $splash = getSplash($body);
            if ($splash) {
                $body.removeChild($splash);
            }
        });
    }
};

const elementClass = function (tag, className) {
    const ele = document.createElement(tag);
    ele.setAttribute('class', className);
    return ele;
};

const elementTxt = function (tag, text) {
    const ele = document.createElement(tag);
    ele.innerText = text;
    return ele;
};

const splashDiv = function () {
    return elementClass('div', 'splash');
};

const tailingHandler = function ($splash) {
    $splash.appendChild(elementTxt('span', 'Loading'));
};

const windcatcherHandler = function ($splash) {
    for (let i = 0; i < 8; i++) {
        $splash.appendChild(elementClass('div', 'blade'));
    }
};

const circularHandler = function ($splash) {

    const arr = [
        'spinner-blue',
        'spinner-red',
        'spinner-yellow',
        'spinner-green'
    ];

    for (let i = 0; i < arr.length; i++) {
        const layer = elementClass('div', 'spinner-layer ' + arr[i]);

        const circleLeft = elementClass('div', 'circle-clipper left');
        const circle01 = elementClass('div', 'circle');

        circleLeft.appendChild(circle01);
        layer.appendChild(circleLeft);

        const gapPatch = elementClass('div', 'gap-patch');
        const circle02 = elementClass('div', 'circle');

        gapPatch.appendChild(circle02);
        layer.appendChild(gapPatch);

        const circleRight = elementClass('div', 'circle-clipper right');
        const circle03 = elementClass('div', 'circle');
        circleRight.appendChild(circle03);

        layer.appendChild(circleRight);

        $splash.appendChild(layer);
    }

};

const emptyHandler = function () {
};

const themes = {
    tailing: tailingHandler,
    windcatcher: windcatcherHandler,
    'audio-wave': emptyHandler,
    'spinner-section': emptyHandler,
    'spinner-section-far': emptyHandler,
    circular: circularHandler
};

const hasClass = function (ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

const addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
};

const removeClass = function (ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
};

const loadBody = function (ele, callback) {
    if (ele)return callback(ele);
    let $body = document.body;
    if ($body) {
        callback($body);
        return;
    }
    setTimeout(function () {
        $body = document.body;
        if (!$body) {
            loadBody(ele, callback);
            return;
        }
        callback($body);
    }, 100);
};

const getSplash = function ($body) {
    const children = $body.children;
    for (let i = 0; i < children.length; i++) {
        if (hasClass(children[i], 'splash')) {
            return children[i];
        }
    }
};

export {Splash};
