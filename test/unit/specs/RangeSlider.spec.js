import { mount, shallowMount } from '@vue/test-utils';

import Vue from 'vue';
import RangeSlider from '@/components/RangeSlider';
import Bar from '@/components/Bar';
import Range from '@/components/Range';
import Handle from '@/components/Handle';

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

  it('has a beforeMount hook', ()=> {
    expect(typeof Bar.beforeMount).toBe('function');
  })

  it('should have dynamic slice percentage', ()=>{
    const wrapper = mount(RangeSlider, {
      propsData: {
        min: 0,
        max: 40,
        sliceNum: 4,
      }
    }).findComponent(Bar);

    expect(wrapper.vm.slicePercent).toBe(10);
  })
  
  it('should have slicePercent data', ()=> {
    const wrapper = mount(RangeSlider).findComponent(Bar);
    expect(wrapper.vm.$data.slicePercent).toBe(20);
  })

  it('should have mounted data', ()=>{
    const wrapper = mount(RangeSlider).findComponent(Bar);
    const expectedData = {
      width: '100%',
      height: '10px',
      backgroundColor: 'black'
    }
    expect(wrapper.vm.barStyles).toEqual(expectedData);
  })
});

describe('Handle Check', ()=>{
  it('should have default handle when no option props passed', ()=>{
    const wrapper = mount(RangeSlider);
    expect(wrapper.find('.range-slider__handle--min').exists()).toBe(true);
    expect(wrapper.find('.range-slider__handle--max').exists()).toBe(true);
  });

  it('should change color when color props passed', ()=>{
    const wrapper = mount(RangeSlider, {
      propsData: {
        handle: {
          color: 'red',
        },
      }
    }).findComponent(Handle);

    expect(wrapper.find('.range-slider__handle--min').element.style['backgroundColor']).toBe('red');
  })

  it('should be invisible when tooltip setting is invisible', ()=>{
    const wrapper = mount(RangeSlider, {
      propsData: {
        tooltip: {
          visibility: false,
        },
      }
    }).findComponent(Handle);
    expect(wrapper.find('div').element.style['display-none']);
  });

  it('should call handleHover function when mouse is entered', ()=>{
    let wrapper = mount(RangeSlider, {
      propsData: {
        tooltip: {
          visibility: false,
        },
      }
    }).findComponent(Handle);
    
    wrapper.trigger('mouseenter');
    expect(wrapper.vm.visibility).toBe(true);

    wrapper.trigger('mouseleave');    
    expect(wrapper.vm.visibility).toBe(false);
  })
})

describe('RangeSlider Check', ()=> {

  it('should have mousedown event listener', ()=> {
    const wrapper = mount(RangeSlider);    
    const mousedownEvent = document.dispatchEvent(new Event('mousedown'));
    expect(mousedownEvent).toBe(true);
  })

  it('should trigger keydown event', ()=> {
    const wrapper = mount(RangeSlider);
    wrapper.vm.clickedHandle = wrapper.find({ref: 'handleMin'}).element;
    expect(window.dispatchEvent(new Event('keydown', { key: 'left' }))).toBe(true);
  })

  it('should handle min-handle', ()=> {
    const wrapper = mount(RangeSlider);
    wrapper.vm.clickedHandle = wrapper.findComponent({ref: 'handleMin'}).element.__vue__;
    wrapper.vm.handleClicked();

    expect(document.dispatchEvent(new Event('mousemove'))).toBe(true);
    expect(document.dispatchEvent(new Event('mouseup'))).toBe(true);
  })

  it('should handle max-handle', ()=> {
    const wrapper = mount(RangeSlider);
    wrapper.vm.clickedHandle = wrapper.findComponent({ref: 'handleMax'}).element.__vue__;
    wrapper.vm.handleClicked();

    expect(document.dispatchEvent(new Event('mousemove'))).toBe(true);
    expect(document.dispatchEvent(new Event('mouseup'))).toBe(true);
  })

})

describe('Range test', ()=> {
  it('', ()=> {
  })
})