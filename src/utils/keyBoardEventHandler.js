function moveLeft(e) {
  if (e.keyCode === 37) {
    if(!this.clickedHandle) return;
    
    if (this.clickedHandle === this.$refs.handleMin) {
      this.minPosition = this.minPosition - (this.gap / this.max);
      if(this.checkFlowed('keyboard', this.minPosition)) return this.toggleTooltip(300);
      this.moveMinHandle();
    } 
    
    if (this.clickedHandle === this.$refs.handleMax) {
      this.maxPosition = this.maxPosition - (this.gap / this.max);
      if(this.checkFlowed('keyboard', this.maxPosition)) return this.toggleTooltip(300);
      this.moveMaxHandle();
    }

    this.toggleTooltip(300);
    this.returnHandleValues();
  }
}

function moveRight(e) {
  if(!this.clickedHandle) return;

  if (this.clickedHandle === this.$refs.handleMin) {
    this.minPosition = this.minPosition + (this.gap / this.max);
    if(this.checkFlowed('keyboard', this.minPosition)) return this.toggleTooltip(300);
    this.moveMinHandle();
  }
  
  if (this.clickedHandle === this.$refs.handleMax) {
    this.maxPosition = this.maxPosition + (this.gap / this.max);
    if(this.checkFlowed('keyboard', this.maxPosition)) return this.toggleTooltip(300);
    this.moveMaxHandle();
  }

  this.toggleTooltip(300);
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

export { moveLeft, moveRight, moveToNextHandle, moveToPrevHandle }
