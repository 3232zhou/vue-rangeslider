const TOOLTIP_DURATION = 300;

function move(direction) {
  if (!this.clickedHandle) return;

  if (this.clickedHandle === this.$refs.handleMin) {
    this.calculateMinHandlePosition(direction);
    if (this.checkFlowed('keyboard', this.minPosition)) return this.toggleTooltip(TOOLTIP_DURATION);
    this.moveMinHandle();
  }

  if (this.clickedHandle === this.$refs.handleMax) {
    this.calculateMaxHandlePosition(direction);
    if (this.checkFlowed('keyboard', this.maxPosition)) return this.toggleTooltip(TOOLTIP_DURATION);
    this.moveMaxHandle();
  }

  this.toggleTooltip(TOOLTIP_DURATION);
  this.returnHandleValues();
}

function moveToNextHandle() { 
  if (!this.clickedHandle) {
    this.clickedHandle = this.$refs.handleMin;
    return this.clickedHandle.$el.classList.add('focused');
  }

  if (this.clickedHandle === this.$refs.handleMin) {
    this.clickedHandle = this.$refs.handleMax;
    this.$refs.handleMin.$el.classList.remove('focused');
    return this.clickedHandle.$el.classList.add('focused');
  }

  if (this.clickedHandle === this.$refs.handleMax) {
    this.clickedHandle.$el.classList.remove('focused');
    this.clickedHandle = null;
  }
}

function moveToPrevHandle() {
  if (!this.clickedHandle) return;

  if (this.clickedHandle === this.$refs.handleMin) {
    this.clickedHandle.$el.classList.remove('focused');
    this.clickedHandle = null;
  }

  if (this.clickedHandle === this.$refs.handleMax) {
    this.clickedHandle = this.$refs.handleMin;
    this.clickedHandle.$el.classList.add('focused');
    this.$refs.handleMax.$el.classList.remove('focused');
  }
}

export { move, moveToNextHandle, moveToPrevHandle };
