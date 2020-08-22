import Vue from 'vue';

createAppDiv();
function createAppDiv() {
 var app = document.createElement('div');
 app.setAttribute('id', 'app');
 document.body.appendChild(app);
}

Vue.config.productionTip = false;
