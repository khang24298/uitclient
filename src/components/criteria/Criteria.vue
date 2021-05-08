<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2 create-criteria text-center">
          <b-button id="btn-modal" v-b-modal.modalCriteria class="bg-danger shadow border-0 btn-add">
            <b-icon class="plus-icon" icon="plus-square"></b-icon>
          </b-button>
        </div>
        <div class="col-lg-4 text-center">
          <div class="header">
            <h1>Task Criteria</h1>
          </div>
        </div>
        <div class="col-lg-4 text-center">
          <div class="header">
            <h1>User Criteria</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="row ml-5 mt-1">
      <div class="col-lg-1">

      </div>
      <div class="col-lg-5 rounded px-3 pt-2 pb-2">
        <Criterion class="criterion1 bg-white shadow text-center mb-3 h-5" 
        v-for="taskCriterion in taskCriteriaList" :key="taskCriterion.id" 
        :criterion="taskCriterion"/>
      </div>
      <div class="col-lg-5 rounded px-3 pt-2 pb-2 ">
        <Criterion class="criterion1 bg-white shadow text-center mb-3 h-5" 
        v-for="userCriterion in userCriteriaList" :key="userCriterion.id" 
        :criterion="userCriterion"/>
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
      criteria_types:[
        {
          id:1,
          name:"Task"
        },
        {
          id:2,
          name:"User"
        }
      ],
      taskCriteriaList: [],
      userCriteriaList: [],
    }
  },
  mounted () {
    this.axios.get("/getTaskCriteriaList").then( res => this.taskCriteriaList = res.data.data)
    this.axios.get("/getUserCriteriaList").then( res => this.userCriteriaList = res.data.data)
  },
  methods: {
    
  },
  watch : {
  }
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