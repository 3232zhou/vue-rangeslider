
function showTooltip() {
  this.clickedHandle.handleHover();
  this.clickedHandle.clicked = true;
  this.clickedHandle.visibility = true;
};

function hideTooltip() {
  this.clickedHandle.clicked = false;
  this.clickedHandle.handleLeave();
};

function toggleTooltip(time) {
  this.showTooltip();
  setTimeout(() => this.hideTooltip(), time);
};

export { toggleTooltip, hideTooltip, showTooltip };