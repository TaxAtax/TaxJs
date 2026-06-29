////////////////////////////////////////////////////////
/////////////    TaxJs.js from Tax    //////////////////
////////////////////////////////////////////////////////

const t = function (elem) {
    if (typeof elem === "string") {
        let element = document.querySelectorAll(elem);

        if (element.length === 1) {
            return element[0];
        } else if (element.length > 1) {
            return element;
        } else {
            console.error(`TaxJS: 获取元素 ${elem} 不存在`);
            return null;
        }
    } else {
        console.error(`TaxJS: 参数必须是字符串，实际是 ${typeof elem}`);
        return null;
    }
};

t.getByCls = function (elem) {
    const elements = document.getElementsByClassName(elem);

    const arr = Array.from(elements);

    if (arr.length === 0) {
        console.error(`TaxJS.cls: 未找到类名为 "${elem}" 的元素`);
        return [];
    } else if (arr.length === 1) {
        return arr[0];
    } else {
        return arr;
    }
}

t.getById = function (elem) {
    let element = document.getElementById(elem);
    return element;
}

Element.prototype.sty = function (style, value) {
    if (typeof style === 'string' && value !== undefined) {
        this.style[style] = value;
    } else if (typeof style === 'object') {
        for (let key in style) {
            this.style[key] = style[key];
        }
    }
    return this;
}

NodeList.prototype.sty = function (style, value) {
    for (let i = 0; i < this.length; i++) {
        if (typeof style === 'string' && value !== undefined) {
            this[i].style[style] = value;
        } else if (typeof style === 'object') {
            for (let key in style) {
                this[i].style[key] = style[key];
            }
        }
    }
    return this;
};

t.create = function (elem, where) {
    let doc = document.createElement(elem);
    if (where) {
        where.appendChild(doc);
    } else {
        document.body.appendChild(doc);
    }
    return doc;
}

Element.prototype.html = function (cont) {
    this.innerHTML = cont;
}

Element.prototype.text = function (cont) {
    this.innerText = cont;
}

Element.prototype.val = function (cont) {
    if (cont != null) {
        this.value = cont;
        return this;
    } else {
        return this.value
    }
}

Element.prototype.delCls = function (cls) {
    this.classList.remove(cls)
    return this;
}

Element.prototype.getClsList = function () {
    return this.className;
};

Element.prototype.getCls = function (cls) {
    return this.classList.contains(cls);
}

Element.prototype.attset = function (att, value) {
    this.setAttribute(att, value);
    return this;
}

Element.prototype.addCls = function (cls) {
    this.classList.add(cls)
    return this;
}

Element.prototype.attdel = function (att) {
    this.removeAttribute(att);
    return this;
}

Element.prototype.attget = function () {
    return this.getAttribute();
}

Element.prototype.parent = function () {
    return this.parentElement;
}

Element.prototype.child = function (index) {
    if (index !== undefined) {
        return this.children[index] || null;
    }
    return this.children;
};

Element.prototype.brother = function () {
    const parent = this.parentElement;
    if (!parent) return [];

    const brothers = [];
    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i] !== this) {
            brothers.push(parent.children[i]);
        }
    }

    return brothers;
};

Element.prototype.animate = function (anim, time = 400) {
    if (typeof anim !== 'string') {
        throw new Error('动画类型必须是字符串');
    }

    if (typeof time !== 'number' || time <= 0) {
        throw new Error('动画时间必须是正数');
    }

    const element = this;
    const duration = time;
    const animType = anim.toLowerCase();

    if (!element || !(element instanceof Element)) {
        console.warn('TaxJS: 无效的DOM元素');
        return element;
    }

    if (element._isAnimating) {
        console.warn('TaxJS: 元素正在执行动画中，跳过当前动画');
        return element;
    }

    element._isAnimating = true;
    switch (animType) {
        case "show":
        case "fadein":
            element.style.display = "";
            fade(element, 0, 1, duration);
            break;

        case "hide":
        case "fadeout":
            fade(element, 1, 0, duration);
            break;

        case "slideup":
            slide(element, "up", duration);
            break;

        case "slidedown":
            slide(element, "down", duration);
            break;

        case "toggle":
            const isHidden = element.style.opacity === "0" ||
                getComputedStyle(element).opacity === "0" ||
                element.style.display === "none";
            element.animate(isHidden ? "show" : "hide", duration);
            break;

        default:
            console.warn(`TaxJS: 未知动画类型 "${anim}"`);
            element._isAnimating = false;
            return element;
    }

    return element;

    /**
     * 淡入淡出动画
     * @param {Element} el - 目标元素
     * @param {number} from - 起始透明度
     * @param {number} to - 结束透明度
     * @param {number} duration - 动画时长
     */
    function fade(el, from, to, duration) {
        el.style.opacity = from;
        el.style.visibility = "visible";

        const steps = 20;
        const step = (to - from) / steps;
        const intervalTime = duration / steps;

        let opacity = from;
        const interval = setInterval(() => {
            opacity += step;
            el.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(2);

            if ((step > 0 && opacity >= 1) || (step < 0 && opacity <= 0)) {
                el.style.opacity = to;
                clearInterval(interval);
                el._isAnimating = false;
            }
        }, intervalTime);
    }

    /**
     * 滑动动画
     * @param {Element} el - 目标元素
     * @param {string} direction - 动画方向，'up' 或 'down'
     * @param {number} duration - 动画时长
     */
    function slide(el, direction, duration) {
        if (direction === "up") {
            const height = el.offsetHeight;
            el.style.height = height + "px";
            el.style.overflow = "hidden";
            el.style.visibility = "visible";

            const steps = 20;
            const step = height / steps;
            let currentHeight = height;

            const interval = setInterval(() => {
                currentHeight -= step;
                el.style.height = Math.max(0, currentHeight) + "px";

                if (currentHeight <= 0) {
                    el.style.display = "none";
                    el.style.height = "";
                    el._isAnimating = false;
                    clearInterval(interval);
                }
            }, duration / steps);
        } else if (direction === "down") {
            const originalDisplay = el.style.display;
            el.style.display = "";
            const scrollHeight = el.scrollHeight;
            el.style.height = "0px";
            el.style.overflow = "hidden";
            el.style.visibility = "visible";

            const steps = 20;
            const step = scrollHeight / steps;
            let currentHeight = 0;

            const interval = setInterval(() => {
                currentHeight += step;
                el.style.height = Math.min(scrollHeight, currentHeight) + "px";

                if (currentHeight >= scrollHeight) {
                    el.style.height = "";
                    el.style.display = originalDisplay;
                    el._isAnimating = false;
                    clearInterval(interval);
                }
            }, duration / steps);
        }
    }
};

Element.prototype.on = function (act, f, op) {
    this.addEventListener(act, f, op);
    return this;
};

const tMa = {
    tu: function (val) {
        return Math.ceil(val);
    },
    td: function (val) {
        return Math.floor(val);
    },
    tr: function (val, precision = 0) {
        const multiplier = Math.pow(10, precision);
        return Math.round(val * multiplier) / multiplier;
    },

};

//数组类

Array.prototype.atg = function (...arrs) {
    for (let arr of arrs) {
        if (Array.isArray(arr)) {
            for (let item of arr) {
                this.push(item);
            }
        }
    }
    return this;
};

const atg = function (...arrs) {
    return arrs.flat();
};

Array.prototype.swap = function (i, j) {
    if (i >= 0 && i < this.length && j >= 0 && j < this.length) {
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

Array.prototype.clear = function () {
    this.length = 0;
    return this;
};

Array.prototype.uni = function () {
    return [...new Set(this)];
};

Array.prototype.fa = function (...arr) {
    this.unshift(...arr);
    return this;
};

Array.prototype.ba = function (...arr) {
    this.push(...arr);
    return this;
};

Array.prototype.fd = function (...arr) {
    this.shift(...arr);
    return this;
};

Array.prototype.bd = function (...arr) {
    this.pop(...arr);
    return this;
};

Array.prototype.din = function (index) {
    if (index >= 0 && index < this.length) {
        this.splice(index, 1);
    }
    return this;
};

Array.prototype.dval = function (value) {
    for (let i = this.length - 1; i >= 0; i--) {
        if (this[i] === value) {
            this.splice(i, 1);
        }
    }
    return this;
};

Array.prototype.find = function (value) {
    const firstIndex = this.indexOf(value);
    const allIndexes = [];
    let count = 0;

    for (let i = 0; i < this.length; i++) {
        if (this[i] === value) {
            allIndexes.push(i);
            count++;
        }
    }

    return {
        in: firstIndex !== -1,
        firstIndex: firstIndex,
        index: allIndexes,
        count: count,
        value: value
    };
};

Array.prototype.change = function (index, newValue) {
    if (index >= 0 && index < this.length) {
        this[index] = newValue;
    }
    return this;
};

//对象类

Object.prototype.get = function (val) {
    return this[val];
};

Object.prototype.set = function (val, nowval) {
    this[val] = nowval;
    return this;
};

const xmlhttprequest = new XMLHttpRequest;

if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

const ajax = {
    open: function (...args) {
        return this.xhr.open(...args);
    },
    get(...args) {
        const [url, callback] = args;
        this.xhr.open('GET', url, true);
        this.xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback(null, this.responseText);
            }
        };
        this.xhr.send();
    },
    post(...args) {
        const [url, data, callback] = args;
        this.xhr.open('POST', url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        this.xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    callback(null, this.responseText);
                } else {
                    callback(new Error('Request failed'), null);
                }
            }
        };
        this.xhr.send(JSON.stringify(data));
    },
    send(...args) {
        return this.xhr.send(...args);
    }
}

// 26.6.29 更新路由
t.router = {
    routes: {},
    
    register: function(path, handler) {
        this.routes[path] = handler;
        return this;
    },
    
    navigate: function(path) {
        const handler = this.routes[path] || this.routes['/404'] || function() {
            console.warn(`TaxJS Router: 未找到路径 "${path}" 对应的路由`);
        };
        handler();
        history.pushState(null, '', path);
        return this;
    },
    
    init: function() {
        window.addEventListener('popstate', this._onPopState.bind(this));
        this.navigate(window.location.pathname);
        return this;
    },
    
    _onPopState: function() {
        this.navigate(window.location.pathname);
    }
};
