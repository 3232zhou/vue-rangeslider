import Vue from 'vue';
import Router from 'vue-router';
import RangeSlider from '@/components/RangeSlider';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RangeSlider',
      component: RangeSlider,
    },
  ],
});
