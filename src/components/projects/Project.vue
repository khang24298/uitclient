<template>
  <div class="content-wrapper">
    <div class="tasks-board">
      <div class=" overflow-x-scroll py-12 d-flex">
        <div class="btn-create-task" v-if="user.role > 2">
          <b-button id="btn-modal" v-b-modal.modalCreate class="bg-danger shadow border-0 btn-add">
            <b-icon class="plus-icon" icon="plus-square"></b-icon>
          </b-button>
        </div>

          <draggable v-for="list in tasksLists" :key="list.status.id" ghost-class="ghost-card" class="kanban-column bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4" group="tasks" :animation="200">
            <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm text-center">{{ list.status.name | uppercase }}</p>
              <task-card 
              v-for="item in list.tasks"
              :key="item.id"
              :task="item"
              @updatedList="reload = $event"
              :user="user"
              :taskCriteria="taskCriteria"
              :manager="manager_list"
              :staff="staff_list"
              :status_list="status_list"
              class="mt-3 cursor-move task"
              >
              </task-card>
          </draggable>
        <TaskNew v-if="user.role > 2" :listTask="tasksLists[0].tasks" :manager="manager_list" :staff="staff_list"/>
      </div>
      
    </div>
    
  </div>
</template>
<script>
import draggable from "vuedraggable";
import TaskCard from "../tasks/TaskCard.vue";
import TaskNew from "../tasks/TaskNew.vue";
import {mapGetters} from 'vuex'

export default {
  name: "Project",
  components: {
    TaskCard,
    TaskNew,
    draggable,
  },
  data() {
    return {
      tasksLists: [Object],
      staff_list: [],
      manager_list:[],
      status_list: [],
      user: Object,
      taskCriteria: [],
      reload: 0
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/user',
    })
  },
  mounted () {
    this.user = (this.userInfo) ? this.userInfo : null
    this.axios.get('/status').then(res => this.status_list = res.data.data)
    this.axios.get(`/getTasksByProjectID/`+this.$route.params.id).then( res => this.tasksLists = res.data.data)
    this.axios.get('/criteria').then(res=> this.taskCriteria = res.data.data)
    this.axios.get('/getUsersWithEmployeeRole').then( res => this.staff_list = res.data.data)
    this.axios.get('/getUsersWithManagerRole').then( res => this.manager_list = res.data.data)
  },
  watch: {
    reload: function(newVal,oldVal){
      console.log(newVal)
      console.log(oldVal)
      if(newVal != oldVal){
        this.axios.get(`/getTasksByProjectID/`+this.$route.params.id).then( res => this.tasksLists = res.data.data) 
        console.log(this.tasksLists)
      }
    }
  },
  methods: {
    updateStatus (e) {
      console.log(e.task)
      console.log(e.to.id)
      this.axios.put(`/tasks/`+this.task,{ "status_id": e.to.id })
      .then(res=>{
        if(res.data.data){
          console.log(res.data.data)
        }
        else{
          console.log(res.data.message)
        }
      })
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
  width: 16vw;
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
}
.btn-create-task{
  margin-top:3em;
  margin-left: -3em;
}
.border_left{
  border-right: 1px dashed #f2f2f2;
}
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>