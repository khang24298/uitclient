import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://ec2-13-59-14-237.us-east-2.compute.amazonaws.com/api';

Vue.use(VueAxios, axios)