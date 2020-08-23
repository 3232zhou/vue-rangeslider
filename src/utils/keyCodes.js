
const keyCodes = {
  keyMap: {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    BACK: 8,
  },

  getKeyByValue: function (keyCode) {
    return Object.keys(this.keyMap).find(key => this.keyMap[key] === keyCode);
  },
};

export { keyCodes };
