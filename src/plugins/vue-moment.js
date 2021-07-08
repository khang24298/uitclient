import Vue from 'vue'
import moment from 'moment';

moment.locale('vn');

Vue.filter('filterDate', function(value) {
    let yearVal = new Date(value).getFullYear()
    let yearCur = new Date().getFullYear()
    if(yearCur == yearVal){
        return moment(String(value)).format('DD-MM');
    }
    else{
        return moment(String(value)).format('DD-MM-YYYY');
    }
});
Vue.filter('filterDateMonth', function(value) {
    if (value) {
        return moment(String(value)).format('DD-MM');
    }
});
Vue.filter('filterDateTime', function(value) {
    if (value) {
        return moment(String(value)).format('DD-MM-YYYY HH:mm:ss');
    }
});
Vue.filter('filterTime', function(value) {
    let yearVal = new Date(value).getFullYear()
    let monVal = new Date(value).getMonth() + 1
    let dateVal = new Date(value).getDate()
    let yearCur = new Date().getFullYear()
    let monCur = new Date().getMonth() + 1
    let dateCur = new Date().getDate()
    if(yearCur == yearVal){
        if(monCur == monVal){
            if(dateCur == dateVal){
                return moment(String(value)).format('HH:mm:ss');
            }
            
        }
        else{
            return moment(String(value)).format('DD-MM HH:mm:ss');
        }
    }
    else{
        return moment(String(value)).format('DD-MM-YYYY HH:mm:ss');
    }
});
