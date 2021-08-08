<template>
  <div class="content-wrapper">
    <!-- For manager -->
    <div class="row" v-if="userInfo.role > 2">
      <div class="col-lg-12 d-flex bg-white border m-1 pt-1 text-center">
        <h3 class="col-lg-6 text-left"><strong class="text-left">Đánh giá tác phong</strong></h3>
        <input class="border border-light" type="date" name="date" v-model="date" id="date" @change="changeDate($event)"/>
      </div>
      <div class="col-lg-4">
        <!-- USERS LIST IS NOT EVALUATED -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Nhân sự chưa đánh giá</h3>

            <div class="card-tools">
              <span class="badge badge-danger">{{ (usersList['listUserNotEvaluated']) ? usersList['listUserNotEvaluated'].length : "0"}} người</span>

            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body p-0">
            <p v-if="!usersList['listUserNotEvaluated']" class="p-3">Tất cả nhân sự đã được đánh giá</p>
            <ul v-else class="users-list clearfix latest">
              
              <evaluation-detail v-for="item in orderBy(usersList['listUserNotEvaluated'], 'id', -1)" 
              :key="item.id"
              :user="item"
              :userCriteria="userCriteria"
              :month="month"
              :year="year"
              >
              </evaluation-detail>
              
            </ul>
            
            <!-- /.users-list -->
          </div>
          <!-- /.card-body -->
          <!-- /.card-footer -->
        </div>

        <Ranking :month="month" :year="year"/>
        <!--/.card -->
      </div>
      <Members :usersList="usersList['listUserEvaluated']" :userCriteria="userCriteria" :month="month" :year="year"/>
    </div>

    <!-- For Staff -->
    <div v-else>
      <div class="row">
        <h3 class="col-lg-12 bg-white border m-1 pt-1 text-center">
          <input class="border border-light" type="date" name="date" v-model="date" id="date" @change="changeDate($event)"/>
        </h3>
      </div>
      
      <div class="row">
        <div class="col-6">
          <div class="card p-2 user-info col-12">
            <h4 class="text-center border-bottom">{{ userInfo.name}}</h4>
            <div class="d-flex col-lg-12">
              <div class="circle " >
                <span class="initials">{{ formatName(userInfo.name) }}</span>  
              </div>
              <p class="phone col-lg-4">
                <b>Phone:</b> <br>
                {{ userInfo.phone}}
                <br>
                <br>
                <br>

                <b>Cấp bậc:</b>
                <br>
                Cán bộ giảng dạy
              </p>
               <p class="col-lg-4 email">
                <b>Email:</b> <br>
                {{ userInfo.email}}
                <br>
                <br>
                <b>Phòng/Khoa:</b> <br>
                Phòng Tổ Chức - Hành Chính
              </p>
            </div>
          </div>
          <div class="user-evaluation">
            <div class="card-body bg-white border mb-1 text-center"><span class="text-center">Điểm đánh giá tác phong</span></div>
            <div class="item d-flex" v-for="item in staffCriteria" :key="item.id">
              <b-button @mouseover="openHover(item.id)" @mouseleave="closeHover()" class="bg-white borderd shadow col-lg-8 mt-1">
                <div class="popup" v-if="idHover == item.id && item.description !== ''"><p class="inner">{{ item.description }}</p></div>
                <span class="float-left" >{{ item.criteria_name }}</span>
                <strong class="float-right" >Tối đa: {{ item.max_score }}</strong>
              </b-button>
              <div class="col-lg-4 border shadow m-1 bg-white" v-if="item.score">
                <div class="evaluation-range">
                  <div class=""><b>Điểm đánh giá:</b><span class="float-right text-bold">{{ item.score }}</span></div>
                </div>
                <div style="overflow-x:auto" >
                  <span><b> Nhận xét:</b> {{ item.note }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-body bg-white border mb-1 text-center"><span>Điểm đánh giá công việc</span></div>
            <div class="">
              <div class="bg-gray border-bottom d-flex text-center ">
                <span class="col-5 text-bold">Tên công việc</span>
                <span class="col-5 text-bold">Tiêu chí</span>
                <span class="col-2 text-bold">Số điểm</span>

              </div>
              <div class="btn bg-white borderd shadow col-12 mt-1" v-for="task in taskUserEvaluation" :key="task.id">
                <router-link class="float-left col-5 " :to="'/project/'+task.project_id+'?task='+task.task_id"><span style="color:blue!important; text-decoration:underline;">{{ task.task_name }}</span></router-link>
                <span class="border-left float-left col-5 ">{{ task.criteria_name }}</span>
                <span class="border-left float-right col-2 ">{{ task.score }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ranking from '@/components/evaluation/ShortRanking'
import Members from '@/components/evaluation/Members'
import EvaluationDetail from './EvaluationDetail.vue'

import {mapGetters} from 'vuex'
import Vue2Filters from 'vue2-filters'
var today = new Date();

export default {
  name:"Evaluation",
  components:{
    Ranking, 
    Members,
    EvaluationDetail
  },
  mixins: [Vue2Filters.mixin],
  data(){
    return{
      usersList:[],
      userCriteria:[],
      date: today.toISOString().slice(0,10),
      month: today.getMonth()+1,
      year: today.getFullYear(),
      staffEvaluation:[],
      staffCriteria:[],
      idHover:null,
      taskUserEvaluation:[],
      hasBeenEvalued: false,
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/user',
    }),
  },
  mounted(){
    if(this.userInfo.role > 2){

      this.axios.get(`/getListUserEvaluationByMonth/`+this.month+'/'+this.year)
      .then(res=>{
        this.usersList = res.data.data 
      })

      this.axios.post("/getUserCriteriaList")
      .then( res => this.userCriteria = res.data.data)
    }
    else{

      this.axios.get(`/getUserCriteriaByUserID/`+this.userInfo.id+'/'+this.month+'/'+this.year)
      .then(res => this.staffCriteria = res.data.data)
      this.axios.get(`/getUserEvaluationByUserID/`+this.userInfo.id+'/'+this.month+'/'+this.year)
      .then(res=>{
        if(res.data.data.length > 0){
          this.staffEvaluation = res.data.data
          this.hasBeenEvalued = true
        }
      })
      this.axios.get(`/getTaskEvaluationListByUserId/`+this.userInfo.id+'/'+this.month +'/'+this.year)
      .then(res => this.taskUserEvaluation = res.data.data)
    }
  },
  methods:{
    formatName(name){
        let fullname = name.split(' ')
        let initials = fullname.shift().charAt(0) + fullname.pop().charAt(0);
        return initials.toUpperCase();
    },
    openHover(e){
      this.idHover = e
    },
    closeHover(){
      this.idHover = null;
    },
    changeDate(e){
      this.hasBeenEvalued = false;
      let choosenDate = e.target.value;
      this.year = new Date(choosenDate).getFullYear();
      this.month = new Date(choosenDate).getMonth()+1;
    }
  },
  watch: {
      month:function(){
        if(this.userInfo.role <= 2){
          this.axios.get(`/getUserCriteriaByUserID/`+this.userInfo.id+'/'+this.month+'/'+this.year)
          .then(res => this.staffCriteria = res.data.data)

          this.axios.get(`/getUserEvaluationByUserID/`+this.userInfo.id+'/'+this.month+'/'+this.year)
          .then(res=>{
            if(res.data.data.length > 0){
              this.staffEvaluation = res.data.data
              this.hasBeenEvalued = true
            }
          })

          this.axios.get(`/getTaskEvaluationListByUserId/`+this.userInfo.id+'/'+this.month +'/'+this.year)
          .then(res => this.taskUserEvaluation = res.data.data)
        }
        else{
          this.axios.get(`/getListUserEvaluationByMonth/`+this.month+'/'+this.year)
            .then(res=>{
              this.usersList = res.data.data 
            })
        }
       
      },
      year:function(){
        if(this.userInfo.role <= 2){
          this.axios.get(`/getUserCriteriaByUserID/`+this.userInfo.id+'/'+this.month+'/'+this.year)
          .then(res => this.staffCriteria = res.data.data)

          this.axios.get(`/getUserEvaluationByUserID/`+this.userInfo.id+'/'+this.month+'/'+this.year)
          .then(res=>{
            if(res.data.data.length > 0){
              this.staffEvaluation = res.data.data
              this.hasBeenEvalued = true
            }
          })

          this.axios.get(`/getTaskEvaluationListByUserId/`+this.userInfo.id+'/'+this.month +'/'+this.year)
          .then(res => this.taskUserEvaluation = res.data.data)
        }
        else{
          this.axios.get(`/getListUserEvaluationByMonth/`+this.month+'/'+this.year)
            .then(res=>{
              this.usersList = res.data.data 
            })
        }
      }
      
  },
  
}
</script>

<style scoped>
li .user-logo{
  width:80%;
}
.latest>li img{
  border: 3px solid #03fc1c
}
.user{
  border: none;
  background: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
}
.latest li{
  width:32%;
}
.user-logo{
  width: 6em;
}
.popup {
  position: absolute;
  left: 18%;
  top: -25px;
  transform: translate3d(0, -50%, 0);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  background: white;
  border-radius: 100px;
  width: 60%;
}

.popup:after {
   content: "";
  width: 15px;
  height: 15px;
  transform: rotate(-45deg);
  background: #fff;
  position: absolute;
  border-radius: 10px;
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.5);
  bottom: -7px;
  left: calc(50% - 10px);
}
.inner {
  padding: 10px 0;
  background: #fff;
  border-radius: 100px;
}
.circle {
  height: 10rem;
  text-align: center;
  width: 10rem;
  background-color: #ccc;
  position: relative;
}

.initials {
  font-size: calc(10rem / 2); /* 50% of parent */
  line-height: 1;
  position: relative;
  top: calc(10rem / 5); /* 25% of parent */
}
</style>