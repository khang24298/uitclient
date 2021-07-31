import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://ec2-3-144-23-245.us-east-2.compute.amazonaws.com/api';

Vue.use(VueAxios, axios)