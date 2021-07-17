<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2 create-criteria text-center">
          <b-button hide-backdrop id="btn-modal" v-b-modal.modalCriteria class="bg-primary shadow border-0 btn-add">
            <b-icon class="plus-icon" icon="plus-square"></b-icon>
          </b-button>
        </div>
        <div class="col-lg-4 text-center">
          <div class="header">
            <h1>Tiêu chí công việc</h1>
          </div>
        </div>
        <div class="col-lg-4 text-center">
          <div class="header">
            <h1>Tiêu chí nhân sự</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="row ml-5 mt-1">
      <div class="col-lg-1">

      </div>
      <div class="col-lg-5 rounded px-3 pt-2 pb-2">
        <Criterion class="criterion1 bg-white shadow text-center mb-3 h-5" 
        v-for="taskCriterion in taskCriteriaList.data" :key="taskCriterion.id" 
        :criterion="taskCriterion"/>
        <b-pagination
          v-model="curPageTask"
          :total-rows="taskCriteriaList.count"
          :per-page="perPage"
        ></b-pagination>
      </div>
      <div class="col-lg-5 rounded px-3 pt-2 pb-2 ">
        <Criterion class="criterion1 bg-white shadow text-center mb-3 h-5" 
        v-for="userCriterion in userCriteriaList.data" :key="userCriterion.id" 
        :criterion="userCriterion"/>
         <b-pagination
          v-model="curPageUser"
          :total-rows="userCriteriaList.count"
          :per-page="perPage"
        ></b-pagination>

      </div>
    </div>
    <!-- Modal Create Criterion -->
    <CriterionNew :criteria_types="criteria_types"/>  
    
  </div>
</template>
<script>
import Criterion from './Criterion.vue';
import CriterionNew from './CriterionNew.vue';
export default {
  name: "Criteria",
  components: {
    Criterion,
    CriterionNew
  },
  data() {
    return {
      curPageTask:1,
      curPageUser:1,
      perPage:10,
      criteria_types:[
        {
          id:1,
          name:"Công việc"
        },
        {
          id:2,
          name:"Nhân sự"
        }
      ],
      taskCriteriaList: [],
      userCriteriaList: [],
    }
  },
  mounted () {
    this.axios.post("/getTaskCriteriaList",{
      "offset":0,
      "limit":10
    }).then( res=>{
      this.taskCriteriaList = res.data.data
    })

    this.axios.post("/getUserCriteriaList",{
      "offset":0,
      "limit":10
    }).then( res =>{
      this.userCriteriaList = res.data.data
    })
  },
  watch:{
    curPageTask: function(){
      this.axios.post('/getTaskCriteriaList',{
        "offset": this.curPageTask*this.perPage - this.perPage,
        "limit": this.perPage
      })
      .then(res=>{
        this.taskCriteriaList = res.data.data
      })
    },
    curPageUser: function(){
      this.axios.post('/getUserCriteriaList',{
      "offset": this.curPageUser*this.perPage - this.perPage,
      "limit": this.perPage
      })
      .then(res=>{
        this.userCriteriaList = res.data.data
      })
    }
  }
  ,
  methods: {
   
  },

}
</script>

<style scoped>
.btn-add{
  width: 3.5em;
  height: 3.5em;
  border-radius:50%;
  margin-top: 5px;
}
.plus-icon{
  width: 1.5em;
  height: 1.5em;
  border: 1px solid #f2f2
}
</style>