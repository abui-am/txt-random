import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VueConfetti from 'vue-confetti';

createApp(App).use(VueConfetti).mount('#app');
