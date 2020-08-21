const TOOLTIP_DURATION = 300;

function calculateMinHandlePosition(direction) {
  if(direction === 'LEFT') this.minPosition = this.minPosition - (this.gap / this.max);
  if(direction === 'RIGHT') this.minPosition = this.minPosition + (this.gap / this.max);
}

function calculateMaxHandlePosition(direction) {
  if(direction === 'LEFT') this.maxPosition = this.maxPosition - (this.gap / this.max);
  if(direction === 'RIGHT') this.maxPosition = this.maxPosition + (this.gap / this.max);
}

function move(direction) {
  if (!this.clickedHandle) return;

  if (this.clickedHandle === this.$refs.handleMin) {
    calculateMinHandlePosition(direction);
    if(this.checkFlowed('keyboard', this.minPosition)) return this.toggleTooltip(TOOLTIP_DURATION);
    this.moveMinHandle();
  }

  if (this.clickedHandle === this.$refs.handleMax) {
    calculateMaxHandlePosition(direction);
    if(this.checkFlowed('keyboard', this.maxPosition)) return this.toggleTooltip(TOOLTIP_DURATION);
    this.moveMaxHandle();
  }

  this.toggleTooltip(this.TOOLTIP_DURATION);
  this.returnHandleValues();
}

function moveLeft() {
  if(!this.clickedHandle) return;
  
  if (this.clickedHandle === this.$refs.handleMin) {
    this.minPosition = this.minPosition - (this.gap / this.max);
    if(this.checkFlowed('keyboard', this.minPosition)) return this.toggleTooltip(TOOLTIP_DURATION);
    this.moveMinHandle();
  } 
  
  if (this.clickedHandle === this.$refs.handleMax) {
    this.maxPosition = this.maxPosition - (this.gap / this.max);
    if(this.checkFlowed('keyboard', this.maxPosition)) return this.toggleTooltip(TOOLTIP_DURATION);
    this.moveMaxHandle();
  }

  this.toggleTooltip(TOOLTIP_DURATION);
  this.returnHandleValues();
}

function moveRight() {
  if(!this.clickedHandle) return;

  if (this.clickedHandle === this.$refs.handleMin) {
    this.minPosition = this.minPosition + (this.gap / this.max);
    if(this.checkFlowed('keyboard', this.minPosition)) return this.toggleTooltip(this.TOOLTIP_DURATION);
    this.moveMinHandle();
  }
  
  if (this.clickedHandle === this.$refs.handleMax) {
    this.maxPosition = this.maxPosition + (this.gap / this.max);
    if(this.checkFlowed('keyboard', this.maxPosition)) return this.toggleTooltip(this.TOOLTIP_DURATION);
    this.moveMaxHandle();
  }

  this.toggleTooltip(this.TOOLTIP_DURATION);
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
  if(!this.clickedHandle) return;

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

export { move, moveLeft, moveRight, moveToNextHandle, moveToPrevHandle }
