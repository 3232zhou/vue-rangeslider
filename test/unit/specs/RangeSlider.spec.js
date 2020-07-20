import Vue from 'vue';
import RangeSlider from '@/components/RangeSlider';

describe('RangeSlider.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(RangeSlider);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App');
  });
});
