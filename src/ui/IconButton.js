import Button from './Button';
import XType from './XType';

/**
 * 图标按钮
 * @param {*} options 
 */
function IconButton(options) {
    Button.call(this, options);

    this.cls = options.cls || 'Button IconButton';
    this.icon = options.icon || null; // 对应assets/css/icon/iconfont.css中的css
}

IconButton.prototype = Object.create(Button.prototype);
IconButton.prototype.constructor = IconButton;

IconButton.prototype.render = function () {
    Button.prototype.render.call(this);
    if (this.icon) {
        this.dom.innerHTML = `<i class="iconfont ${this.icon}"></i>`;
    }
};

XType.add('iconbutton', IconButton);

export default IconButton;