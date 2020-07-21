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
        options: {
          color: 'blue',
        },
      }
    });

    expect(wrapper.find('.range-slider__bar').element.style['backgroundColor']).toBe('blue');
  })
});
