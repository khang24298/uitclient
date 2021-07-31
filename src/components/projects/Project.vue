<template>
  <div class="content-wrapper overflow-auto">
    <div class="p-3 m-1 card-body"><h4><router-link to="/projects" class="text-primary">Dự án</router-link> / <span class="">{{project.project_name}}</span></h4></div>
    <div class="tasks-board">
      <div class="btn-create-task" v-if="user.role > 2">
          <b-button id="btn-modal" v-b-modal.modalCreate class="bg-primary shadow border-0 btn-add">
            <b-icon class="plus-icon" icon="plus-square"></b-icon>
          </b-button>
        </div>
      <div class="overflow-x-scroll py-12 d-inline-flex">
          <draggable :disabled="list.status.type_id == 4" v-for="list in tasksLists" :key="list.status.type_id" :id="list.status.type_id" @end="updateStatus" ghost-class="ghost-card" class="kanban-column bg-gray-100 rounded-lg px-1 py-3 column-width rounded" group="tasks" :animation="200">
              <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm text-center">{{ list.status.name | uppercase }}</p>
              <task-card 
              v-for="item in orderBy(list.tasks,'priority',1)"
              :key="item.id"
              :id="item.id"
              :task="item"
              @update="reload"
              :user="user"
              :manager="manager_list"
              :staff="staff_list"
              :status_list="status_list"
              >
              </task-card>
          </draggable>
        <TaskNew v-if="user.role > 2" :taskCriteria="taskCriteria" @update="reload" :manager="manager_list" :staff="staff_list"/>
      </div>
      
    </div>
    
  </div>
</template>
<script>
import draggable from "vuedraggable";
import TaskCard from "../tasks/TaskCard.vue";
import TaskNew from "../tasks/TaskNew.vue";
import {mapGetters} from 'vuex'
import Vue2Filters from 'vue2-filters'

export default {
  name: "Project",
  components: {
    TaskCard,
    TaskNew,
    draggable,
  },
  mixins: [Vue2Filters.mixin],
  data() {
    return {
      tasksLists: [Object],
      staff_list: [],
      manager_list:[],
      status_list: [],
      user: Object,
      taskCriteria: [],
      project:{}
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/user',
    })
  },
  mounted () {
    this.axios.get(`/projects/`+this.$route.params.id).then( res => this.project = res.data.data)
    this.user = (this.userInfo) ? this.userInfo : null
    this.axios.get('/status').then(res => this.status_list = res.data.data)
    this.axios.get(`/getTasksByProjectID/`+this.$route.params.id).then( res => this.tasksLists = res.data.data)
    this.axios.post('/getTaskCriteriaList').then(res=> this.taskCriteria = res.data.data)
    this.axios.get('/getUsersWithEmployeeRole').then( res => this.staff_list = res.data.data)
    this.axios.get('/getUsersWithManagerRole').then( res => this.manager_list = res.data.data)
  }, 
  methods: {
    reload(e){
        (e)
        this.axios.get(`/getTasksByProjectID/`+this.$route.params.id).then( res => this.tasksLists = res.data.data) 
    },
    updateStatus (e) {
      if(e.from.id != e.to.id){
          this.axios.post('/updateTaskStatus',{ 
            "task_id": e.item.id,
            "status_id": e.to.id 
          })
          .then(res=>{
            console.log(res)
          })
      }
    }
  },
}
</script>

<style scoped>
.kanban-column{
  min-height: 300px;
}
.task{
  cursor: pointer;
}
.tasks-board{
  margin-left:5vw;
}
.column-width {
  width: 18vw;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
.d-flex{
  display: flex;
}
.plus-icon{
  width: 1.5em;
  height: 1.5em;
  border: 1px solid #f2f2
}
.btn-add{
  width: 3.5em;
  height: 3.5em;
  border-radius:50%;
  position: absolute;
  margin-left: 16em;
}
.btn-create-task{
  margin-top: 1em;
  margin-left: -20em;
  position: absolute;
}
.border_left{
  border-right: 1px dashed #f2f2f2;
}
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
.blur-content{
  filter: blur(5px); 
}
</style>