(function() {
const renew = (elements) => Object.create(vjQuery)._init(elements);
const vjQuery = {
    elements: [],    
    length: 0,
    _init: function(elements) {
        if (elements && elements.length !== undefined) {
            elements = [].slice.call(elements);
        }
        this.elements = [].concat(elements);
        this.length = this.elements.length;

        return this;
    },
    query: function(query) {
        var element;
        if (query instanceof HTMLElement || query === window
        ) {
            this.elements = [query];
        } else if (typeof query === 'string') {
            this.elements = [].slice.call(document.querySelectorAll(query));
        }
        this.length = this.elements.length;
        return this;
    },
    addClass: function(classNamesString) {
        const classNamesArr = classNamesString.split(' ');
        this.elements.forEach((el) => classNamesArr.forEach((className) => el.classList.add(className)));

        return this;
    },
    removeClass: function(classNamesString) {
        const classNamesArr = classNamesString.split(' ');
        this.elements.forEach((el) => classNamesArr.forEach((className) => el.classList.remove(className)));

        return this;
    },
    toggleClass: function(classNamesString) {
        const classNamesArr = classNamesString.split(' ');
        this.elements.forEach((el) => classNamesArr.forEach((className) => el.classList.toggle(className)));

        return this;
    },
    eq: function(index) {
        return renew(this.elements[index]);
    },
    first: function() {
        return this.eq(0);
    },
    last: function() {
        return this.eq(this.length - 1);
    },
    each: function(cb) {
        this.elements.forEach(cb);

        return this;
    },
    filter: function(cb) {
        return renew(this.elements.filter(cb));
    },
    map: function(cb) {
        return renew(this.elements.map(cb));
    },
    toArray: function() {
        return this.elements;
    },
    _on: function() {
        const removeAfterFire = arguments[0]
        const events = arguments[1];
        const filterSelector = typeof arguments[2] === 'string' ? arguments[2] : null;
        const cb = typeof arguments[2] === 'string' ? arguments[3] : arguments[2];
        const eventsList = events.split(' ');
        this.elements.forEach((el) => eventsList.forEach((eventName) => {
            el.addEventListener(eventName, (e) => {
                if (!filterSelector) {
                    if (removeAfterFire) {
                        el.removeEventListener(eventName);
                    }
                    cb(e);
                    return;
                }

                const filterElements = [].slice.call(document.querySelectorAll(filterSelector));
                if (filterElements.some((element) => element === e.orignalTarget)) {
                    if (removeAfterFire) {
                        el.removeEventListener(eventName);
                    }
                    cb(e);
                }
            });
        }));
    },
    on: function() {
        this._on(false, ...arguments);

        return this;
    },
    one: function() {
        this._on(true, ...arguments);
        
        return this;
    },
    off: function(events) {
        //TODO: add events namespace
        const eventsList = events.split(' ');
        this.elements.forEach((el) => eventsList.forEach((event) => {
            el.removeEventListener(eventName, cb);
        }));

        return this;
    },
    trigger: function(event) {
        var e = new Event(event);
        
        this.elements.forEach((element) => elememt.dispatchEvent(e));
    },
    click: function(cb) {
        if (cb) {
            this.on('click', cb);
            return;
        }

        this.elements.forEach((element) => element.click());
    },
    focus: function() {
        if (this.elements[0]) {
            this.elements[0].focus();
        } 
        
        return this;
    },
    prev: function(selector) {
        if (!this.elements[0] || !this.elements[0].previousElementSibling) {
            this.elements = [];
            this.length = 0;
            return this;
        }

        if (selector) {
            return this.prevAll(selector).last();
        }

        return renew(this.elements[0].previousElementSibling);
    },
    _getSiblings: function(selector) {
        return selector ? this.elements[0].parentElement.querySelectorAll(':scope > ' + selector) : this.elements[0].parentElement.children;
    },
    siblings: function(selector) {
        if (!this.elements[0]) {
            return this;
        }
        var siblings = this._getSiblings(selector);

        return renew([].filer.call(siblings, (el) => el != this.elements[0]));
    },
    _getSiblingsAndCurrentElPos: function(selector) {
        var siblings = this._getSiblings(selector);
        var currentElHit = false;
        var i=0;
        while (siblings.length && !currentElHit) {
            if (i === siblings.length || siblings[i].compareDocumentPosition(this.elements[0]) === 2) {
                currentElHit = true;
            } else if (siblings[i] === this.elements[0]) {            
                currentElHit = true;                
                i++;
            } else {
            i++;
            }
        }
        return {
            siblings,
            currentElPos: i
        }
    },
    prevAll: function(selector) {
        if (!this.elements[0]) {
            return this;
        }
        
        const {siblings, currentElPos} = this._getSiblingsAndCurrentElPos(selector);
        var prevAll = [].slice.call(siblings, 0, currentElPos);
        
        return renew(prevAll);
    },
    nextAll: function(selector) {
        if (!this.elements[0]) {
            return this;
        }
        const {siblings, currentElPos} = this._getSiblingsAndCurrentElPos(selector);        
        var nextAll = [].slice.call(siblings, currentElPos);
        
        return renew(nextAll);
    },
    next: function(selector) {
        if (!this.elements[0] || !this.elements[0].nextElementSibling) {
            this.elements = [];
            this.length = 0;
            return this;
        }

        if (selector) {
            return this.nextAll(selector).first();
        }

        return renew(this.elements[0].nextElementSibling);
    },
    find: function(selector) {
        if (!this.elements[0]) {
            return this;
        }

        return renew(this.elements[0].querySelectorAll(selector));
    },
    get: function(index) {
        return this.elements[index];
    }
}
window.$ = (selector) => Object.create(vjQuery).query(selector);
})()
