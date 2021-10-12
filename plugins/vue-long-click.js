import Vue from "vue";
import { longClickDirective } from "vue-long-click";

const longClickInstance = longClickDirective({ delay: 150, interval: 6000 });
Vue.directive("longclick", longClickInstance);
