import Vue from "vue";
import { longClickDirective } from "vue-long-click";

const longClickInstance = longClickDirective({ delay: 300, interval: 6000 });
Vue.directive("longclick", longClickInstance);
