import { mount } from '@vue/test-utils';

import Vue from 'vue';
import RangeSlider from '@/components/RangeSlider';
import Bar from '@/components/Bar';

describe('Bar Check', () => {
  it('should have default bar when no option props passed', ()=>{
    const wrapper = mount(RangeSlider);
    expect(wrapper.find('.range-slider__bar').exists()).toBe(true);
  });

  it('should change color when color option passed', ()=>{
    const wrapper = mount(RangeSlider, {
      propsData: {
        bar: {
          color: 'blue',
        },
      }
    });

    expect(wrapper.find('.range-slider__bar').element.style['backgroundColor']).toBe('blue');
  })
});

describe('Handle Check', ()=>{
  it('should have default handle when no option props passed', ()=>{
    const wrapper = mount(RangeSlider);
    expect(wrapper.find('.range-slider__handle').exists()).toBe(true);
  });

  it('should change color when color props passed', ()=>{
    const wrapper = mount(RangeSlider, {
      propsData: {
        handle: {
          color: 'red',
        },
      }
    });

    expect(wrapper.find('.range-slider__handle').element.style['backgroundColor']).toBe('red');
  })
})