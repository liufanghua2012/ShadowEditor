import Control from './Control';

/**
 * 搜索框
 * @author tengge / https://github.com/tengge1
 * @param {*} options 搜索框
 */
function SearchField(options) {
    Control.call(this, options);
    options = options || {};

    this.showSearchButton = options.showSearchButton === undefined ? true : options.showSearchButton;
    this.showResetButton = options.showResetButton === undefined ? false : options.showResetButton;

    this.cls = options.cls || 'SearchField';
    this.style = options.style || {};

    this.onSearch = options.onSearch || null;
    this.onInput = options.onInput || null;
}

SearchField.prototype = Object.create(Control.prototype);
SearchField.prototype.constructor = SearchField;

SearchField.prototype.render = function () {
    this.children = [{
        xtype: 'div',
        parent: this.parent,
        cls: this.cls,
        style: this.style,
        children: [{
            xtype: 'input',
            id: `${this.id}-input`,
            scope: this.scope,
            placeholder: '搜索内容',
            onInput: this.onFieldInput.bind(this)
        }]
    }];

    if (this.showSearchButton) {
        this.children[0].children.push({
            xtype: 'iconbutton',
            icon: 'icon-search',
            onClick: this.onFieldSearch.bind(this)
        });
    }

    if (this.showResetButton) {
        this.children[0].children.push({
            xtype: 'iconbutton',
            icon: 'icon-close',
            onClick: (event) => {
                this.reset();
                this.onFieldInput();
                this.onFieldSearch();
            }
        });
    }

    var control = UI.create(this.children[0]);
    control.render();

    this.dom = control.dom;
};

SearchField.prototype.getValue = function () {
    return UI.get(`${this.id}-input`, this.scope).dom.value;
};

SearchField.prototype.setValue = function (value) {
    UI.get(`${this.id}-input`, this.scope).dom.value = value;
};

SearchField.prototype.reset = function () {
    this.setValue('');
};

SearchField.prototype.onFieldInput = function () {
    var value = this.getValue();

    if (this.onInput) {
        this.onInput(value);
    }
};

SearchField.prototype.onFieldSearch = function () {
    var value = this.getValue();

    if (this.onSearch) {
        this.onSearch(value);
    }
};

export default SearchField;