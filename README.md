# vue-rangeslider
![version](https://img.shields.io/npm/v/@domak/vue-rangeslider) ![build](https://travis-ci.org/forbid403/vue-rangeslider.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/forbid403/vue-rangeslider/badge.svg?branch=coveralls)](https://coveralls.io/github/forbid403/vue-rangeslider?branch=coveralls)
![MIT](https://img.shields.io/npm/l/@domak/vue-rangeslider?color=blue) ![downloads](https://img.shields.io/npm/dt/@domak/vue-rangeslider) ![stars](https://img.shields.io/github/stars/forbid403/vue-rangeslider?color=9cf) <br>
Your **⭐star⭐** is very helpful!!!<br>
Slider component for Vue.js
<br>
[npm](https://www.npmjs.com/package/@domak/vue-rangeslider)
<br>
[Demo](https://forbid403.github.io/vue-rangeslider-example/)
# Install
```
npm i @domak/vue-ragneslider@latest
```

# Usage
```js
// default
<template>
  <RangeSlider></RangeSlider>
</template>

// with props
<template>
  <RangeSlider 
    :handle="{
      color: 'aquamarine',
      width: '20px',
      height: '20px',
    }"
    :min="10"
    :max="90"
  </RangeSlider>
</template>

<script>
import RangeSlider from "@domak/vue-rangeslider";

export default {
  components: {
    RangeSlider
  }
}
</script>
```
# Props
|Name|Type|Default Value|Description|
|---|---|---|---|
|min|Number|0|Minimum value of slider|
|max|Number|100|Maximum value of slider|
|sliceNum|Number|5|Number of slices|
|width|string|100%|Width of rangeslider|
|height|string|none|Height of rangeslider|
|defaultMin|Number|50|Default value of min handle|
|defaultMax|Number|70|Default value of max handle|
|gap|Number|5|How much gap when moving handle with keyboard|
|isKeyAllowed|boolean|false|Move handle with keyboard [Descriptions](#keyboard-movement)|
|bar|Object|-|[Bar Option](#bar-option)
|handle|Object|-|[Handle Option](#handle-option)|
|tooltip|Object|-|[Tooltip Option](#tooltip-option)|
|range|Object|-|[Range Option](#range-option)|
<br>

## Keyboard Movement
|Type|Key Code|Description|
|---|---|---|
|left|`37`|Move selected handle to left|
|right|`39`|Move selected handle to right|
|up, backspace|`38`, `8`|Move to next handle|
|down, enter|`40`, `13`|Move to prev handle|


## Bar option
|Name|Type|Default Value|Description|
|---|---|---|---|
|width|string|100%|Width of bar|
|height|string|10px|Height of bar|
|color|string|![#000000](https://via.placeholder.com/15/000000/000000?text=+) black|Color of bar|
|sliceColor|string|![#049DBF](https://via.placeholder.com/15/049dbf/000000?text=+) #049DBF|Color of slice inside the bar|
|sliceType|string|bar|`dot` Change slice to dot|
<br>


## Handle Option
|Name|Type|Default Value|Description|
|---|---|---|---|
|width|string|12px|Width of handle|
|height|string|12px|Height of handle|
|color|string|![#D93D4A](https://via.placeholder.com/15/d93d4a/000000?text=+) #D93D4A|Color of handle
|border|string|none|Border of handle|
|borderRadius|string|50%|Border radius of handle|
<br>

## Tooltip Option
|Name|Type|Default Value|Description|
|---|---|---|---|
|width|string|20px|Width of tooltip|
|height|string|20px|Height of tooltip|
|color|string|![#f2c84b](https://via.placeholder.com/15/f2c84b/000000?text=+) #F2C84B|Color of tooltip|
|visibility|boolean|false|`true` Always shows tooltip<br>`false` Only shows while dragging
|border|string|none|Border of tooltip|
|borderRadius|string|30%|Border radius of tooltip|
|textColor|string|white|Text color of tooltip|
|top|string|tooltip.height|Distance between handle and tooltip|
<br>

## Range option
Name|Type|Default Value|Description|
|---|---|---|---|
|textColor|string|black|Text color of range|
|color|string|none|Background color of range|
<br>

# Methods
|Name|Description|
|---|---|
|getMinValue|Get value of min handle|
|getMaxValue|Get value of max handle|

<br>

---
Feel free make a issue for this project  

Contact `forbid403@naver.com`
