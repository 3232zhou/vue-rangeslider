function onDrag(e) {
  e.preventDefault();

  if (this.checkFlowed('mouse', e.clientX)) return;

  if (this.clickedHandle === this.$refs.handleMin) {
    this.minPosition = e.clientX / this.barWidth;
    this.moveMinHandle();
  }

  if (this.clickedHandle === this.$refs.handleMax) {
    this.maxPosition = e.clientX / this.barWidth;
    this.moveMaxHandle();
  }
  
  this.returnHandleValues();
};

function onDragEnd(e) {
  e.preventDefault();

  document.removeEventListener('mousemove', this.onDrag);
  document.removeEventListener('mouseup', this.onDragEnd);

  this.hideTooltip();
  this.returnHandleValues();
};

function whichHandleClicked(e) {
  e.preventDefault();
  if (e.target === this.$refs.handleMin.$el) {
    this.clickedHandle = this.$refs.handleMin;
  } else if (e.target === this.$refs.handleMax.$el) {
    this.clickedHandle = this.$refs.handleMax;
  } else return;

  this.handleClicked();
};

function handleClicked() {
  if (!this.clickedHandle) return;

  this.showTooltip();
  document.addEventListener('mousemove', this.onDrag);
  document.addEventListener('mouseup', this.onDragEnd);
};

export { onDrag, onDragEnd, whichHandleClicked, handleClicked };