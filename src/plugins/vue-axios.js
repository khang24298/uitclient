import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://52.14.146.87/api';

Vue.use(VueAxios, axios)