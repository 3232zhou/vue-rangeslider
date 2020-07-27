import RangeSlider from './components/RangeSlider.vue';

const install = (Vue) => {
  Vue.component(RangeSlider);
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  RangeSlider
}

export default install
