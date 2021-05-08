<template>
  <div class="bg-white shadow rounded px-3 pt-2 pb-2 border border-white ">
    <div class="d-flex confirm-top" v-if="task.status_id == 0 && user.role <= 2">
      <b-button variant="outline-none" v-b-modal="'reject_'+task.id">
        <i class="fa-lg fas fa-times-circle" style="color:red"></i>
      </b-button>
      <b-button class="ml-5" variant="outline-none" @click.prevent="updateStatus(task)">
        <i class="fa-lg fas fa-check-square" style="color:green"></i>
      </b-button>
    </div>
    <div class="">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm text-center">{{task.task_name}}</p>
    </div>
    <div class="flex pb-1 ">
      <span class="text-sm date-left" v-html="daysLeft(task.end_date)"></span>
      <span class="text-sm text-gray-600 end-date">{{task.end_date | formatDate}}</span>
    </div>
    <div class="btn-open-area d-flex">
      <b-button class="text-sm task-card" id="toggle-btn-task" v-b-modal="'modal_'+task.id">
       More
      </b-button>
      <img
        class="avatar rounded-circle ml-5"
        src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        alt="Avatar"
      >
    </div>
    <b-modal size="xl" ref="modal_task" :id="'modal_'+task.id"> 
        <template #modal-title>
            <div>
              <h4>{{ task.task_name}}</h4>
              <b-select v-if="task.status_id < 4" id="status" v-model="task.status_id"
              :options="status_list"
              value-field="id"
              text-field="name"
              ></b-select>
              <b-button v-if="task.status_id == 3 && user.role > 2" variant="primary"  @click.prevent="evaluate">
                  Evaluate
              </b-button>
              <b-button v-if="task.status_id > 3" variant="secondary" disabled>
                  Evaluated
              </b-button>
            </div>
            <div class="confirm-area" v-if="task.status_id == 0 && user.role <= 2">
              <b-button class="reject" v-b-modal="'reject_'+task.id">
                Reject
              </b-button>
              <b-button class="accept" @click.prevent="updateStatus(task)">
                Accept
              </b-button>
            </div>
        </template>
        <div class="modal-body">
            <b-form ref="addForm" >
                <b-form-group
                    id="task-name"
                    label="Task name"
                    label-for="name"
                >
                    <b-form-input
                    id="name"
                    v-model="task.task_name"
                    type="text"
                    placeholder="ex: Make event for freshman"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="task-description" label="Task Description" label-for="description">
                    <b-form-textarea
                    id="description"
                    v-model="task.description"
                    placeholder="Description..."
                    rows="4"
                    max-rows="6"
                    ></b-form-textarea>
                </b-form-group>

                <b-form-group id="task-assignee" label="Assignee" label-for="assignee">
                    <b-form-select
                    id="assignee"
                    v-model="task.assignee_id"
                    :options="staff"
                    value-field="id"
                    text-field="name"
                    ></b-form-select>
                </b-form-group>

                <b-form-group id="qa-id" label="QA" label-for="qa_id">
                    <b-form-select
                    id="qa_id"
                    v-model="task.qa_id"
                    :options="manager"
                    value-field="id"
                    text-field="name"
                    ></b-form-select>
                </b-form-group>

                <div class="d-flex">
                  <b-form-group class="col-lg-6">
                    <label class="mt-3" for="start_date">Start Date</label>
                    <b-form-input
                    id="start_date"
                    v-model="task.start_date"
                    type="date"
                    placeholder="ex: 07-04-2021"
                    required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-lg-6">
                    <label class="mt-3" for="end_date">End Date</label>
                    <b-form-input
                    id="end_date"
                    v-model="task.end_date"
                    type="date"
                    placeholder="ex: 07-04-2021"
                    required
                    ></b-form-input>
                  </b-form-group>
                </div>

                <b-form-group id="task-criteria" label="Criteria" label-for="criteria">
                  <div class="d-flex">
                    <div class="col-lg-12">
                      <b-form-select @change="pushCriteria" 
                        id="criteria"
                        v-model="selectedCriteria"
                        v-if="task.status_id < 3 && user.role > 2"
                      >
                      <b-form-select-option v-for="criterio in taskCriteria" :key="criterio.id" :value="{id:criterio.id, criteria_name:criterio.criteria_name,max_score:criterio.max_score}">
                        {{ criterio.criteria_name }} - {{ criterio.max_score }}
                      </b-form-select-option>
                      </b-form-select>

                      <div class="choosenCriteria mt-2">
                        <div class="item d-flex" v-for="(item, index) in choosenCriteria" :key="item.id" >
                            <b-button @click="openCriterion(item.id)" class="bg-white borderd shadow col-lg-4 mt-1">
                              <span class="float-left" >{{ item.criteria_name }}</span>
                              <strong class="col-md-1" >Max Score: {{ item.max_score }}</strong>
                              <i v-if="user.role > 2" class="fas fa-times float-right" @click="delCriteria"></i>
                              
                            </b-button>
                            <div class="evaluation-range col-lg-3 ml-3" v-if="isEvaluate == true || task.status_id > 3">
                              <b-form-input :disabled="user.role <= 2" class="mt-2 " v-model="evaluation[index].score" type="range" min="0" :max="item.max_score" step="5"></b-form-input>
                              <div class="float-right">Value: {{ evaluation[index].score }}/{{ item.max_score }}</div>
                            </div>
                            <div class="col-lg-5" :disabled="user.role <= 2" v-if="isEvaluate == true || task.status_id > 3">
                              <b-form-input v-model="evaluation[index].note" type="text"></b-form-input>
                            </div>
                        </div>
                        <b-button v-if="task.status_id < 3 && user.role > 2" class="col-lg-2" id="btn-modal" v-b-modal.modalCriteria>
                          Create
                        </b-button>
                        <CriterionNew :choosenList="choosenCriteria" :criteria_types="criteria_types"></CriterionNew>
                        <!-- <Criterion v-if="isOpenCriteria === true" :criterion="criterion"></Criterion> -->
                      </div>
                      
                    </div>  
                  </div>
                </b-form-group>

                <b-form-group id="task-priority" label="Priority" label-for="priority">
                  <b-form-radio-group
                    id="priority"
                    v-model="task.priority"
                    :options="priority_list"
                  ></b-form-radio-group>
                </b-form-group>
            </b-form>
            <hr>
            <h4>Recent Activity</h4>
            <div class="col-12 border">
                <div class="post mt-3">
                  <div class="user-block">
                    <img class="img-circle img-bordered-sm" src="../../../public/img/user7-128x128.jpg" alt="user image">
                    <span class="username">
                      <a href="#">Jonathan Burke Jr.</a>
                    </span>
                    <span class="description">7:45 PM today</span>
                  </div>
                  <!-- /.user-block -->
                  <p>
                    Lorem ipsum represents a long-held tradition for designers,
                    typographers and the like. Some people hate it and argue for
                    its demise, but others ignore.
                  </p>

                  <p>
                    <a href="#" class="link-black text-sm"><i class="fas fa-link mr-1"></i> Demo File 1 v2</a>
                  </p>
                </div>

                <div class="post clearfix mb-3">
                  <div class="user-block d-block">
                    <img class="img-circle img-bordered-sm" src="../../../public/img/user1-128x128.jpg" alt="User Image">
                    <span class="username">
                      <a href="#">You</a>
                    </span>
                    <span class="description">you@example.net</span>
                  </div>
                  <div class="d-block">
                    <b-form-textarea rows="3" max-rows="5" class="w-75 float-left" v-model="userComment"/>
                      <b-button @click="sendComment" variant="primary" class="ml-2"><i class="far fa-paper-plane"></i></b-button>
                      <b-form-file v-model="fileAttach" class="" plain></b-form-file>
                  </div>
                </div>
            </div>
        </div>
        <template #modal-footer>
          <div class="d-flex w-100">
            <b-button :disabled="user.role <= 2" 
            variant="danger"
            size="sm"
            class="mr-auto p-2"
            @click="onDelete"
            >
            Delete
            </b-button>

            <b-button
            variant="primary"
            size="sm"
            class="mr-3 p-2"
            @click="onSubmit"
            >
            Save
            </b-button>
            
            <b-button
            variant="default"
            size="sm"
            class="p-2"
            @click="toggleModal"
            >Cancel
            </b-button>
          </div>
        </template>
    </b-modal>

    <b-modal ref="reject" :id="'reject_'+task.id">
      <template #modal-title>
        Từ chối task : {{ task.task_name }}
      </template>
      <div class="modal-body">
        <b-form @submit="onSubmitReject">
          <b-form-group id="task-description">
              <b-form-textarea
              id="rejectform"
              name="reject"
              placeholder="Lí do từ chối"
              rows="4"
              max-rows="6"
              ></b-form-textarea>
          </b-form-group>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>
<script>
import CriterionNew from '@/components/criteria/CriterionNew'
// import Criterion from '@/components/criteria/Criterion'
export default {
  name: "task-card",
  components:{
    CriterionNew,
    // Criterion
  },
  props:['task','status_list','manager','staff','taskCriteria','user'],
  data () {
    return {
      criterion:Object,
      priority_list:[
        "High",
        "Medium",
        "Low"
      ],
      userComment:"",
      fileAttach: null,
      choosenCriteria:[],
      selectedCriteria:[],
      isExist:false,
      isEvaluate: false,
      evaluation:[],
      countReload:0,
      criteria_types: [
        {
          id:1,
          name:"Task"
        }
      ]
    }
  },
  mounted(){
    this.axios.get(`/getTaskCriteriaByTaskID/`+this.task.id)
    .then(res=> this.choosenCriteria = res.data.data)
    this.axios.get(`/getTaskEvaluationByTaskID/`+this.task.id)
    .then(res=>this.evaluation = res.data.data)
  },
  updated(){
  },
  methods:{
    openCriterion (e){
      console.log(e)
      this.axios.get(`/criteria/`+e)
      .then(res=>{
        this.criterion = res.data.data
        this.isOpenCriteria == true
      })
      .then(()=>{
        this.$ref['modal'].toggle('#toggle-btn')
        this.isOpenCriteria == false
        }
      )
    },
    sendComment(){

    },
    delCriteria(e){
      this.choosenCriteria.pop(e);
    },
    pushCriteria(){
      if(this.choosenCriteria.length == 0){
        this.choosenCriteria.push(this.selectedCriteria)
      }
      else{
        this.choosenCriteria.map((value) => {
          if(this.selectedCriteria.id === value.id){
            this.isExist = true
            return
          }
        })
        if(this.isExist != true){
          this.choosenCriteria.push(this.selectedCriteria)
        }
      }
    },
    toggleModal() {
      this.$refs['modal_task'].toggle('#toggle-btn-task')
    },
    onSubmit () {
      this.axios.put(`/tasks/`+this.task.id,this.task)
      .then(res=>{
        if(res.data.data){
          this.$emit('updatedList',this.countReload++)
          this.toggleModal()
        }
        else{
          console.log(res.data.message)
        }
      })
      this.evaluation.map((val)=>{
        this.axios.post('/evaluation',val)
        .then(res=>console.log(res.data.data))
      })
    },
    onDelete (){
      this.$bvModal.msgBoxConfirm('Are you sure?')
      .then(val=>{
          if(val == true){
            this.axios.delete(`/tasks/`+this.task.id)
            .then(res =>{
              if(res.data.message == "Success"){
                this.$emit('updatedList',this.countReload++)
                this.toggleModal()
              }
              else{
                console.log(res.data.message)
              }
            })
          }
        })
    },
    updateStatus(task){
      task.status_id += 1;
      this.axios.put('/tasks/'+task.id,task)
      .then( res =>{
        if(res.data.data){
          this.$emit('updatedList',this.countReload++)
        }
        else{
          console.log(res.data.message)
        }
      })
    },
    daysLeft (time) {
      let cur = new Date().getTime();
      let end = new Date(time).getTime();
      let result = Math.ceil((end-cur)/(1000*3600*24))
      if(result > 0){
        return "<strong>" + result + "</strong> d(s) left"
      }
      if(result == 0){
        return "<span class='text-warning'> overdue <strong >Today</strong></span>" 
      }
      if(result < 0){
        return "<span class='text-danger'> overdue <strong >" + result*(-1) + "</strong> d(s)"
      }
    },
    onSubmitReject(e){
      console.log(e.tartget)
    },
    evaluate(){
      this.isEvaluate = !this.isEvaluate
      this.evaluation = this.choosenCriteria.map(function(val){
        return {score: Number(val.max_score), note:"",criteria_id: val.id,task_id:val.task_id}
      })
    }
  }

};
</script>

<style scoped>
.avatar{
  width: 15%;
}
.date-left{
  vertical-align: top;
}
.end-date{
  color:lightgray;

  float:right
}
.task-card{
  width: 50%;
  line-height: 0.5em;
}
.reject{
  float: right;
  background-color:blue;
}
.accept{
  background-color: greenyellow;
  color: black;
}
.confirm-area{
  margin-left: 3.5em;
  margin-top:1.7em
}
.confirm-area .reject{
  margin-left: 1em;
}
.confirm-top{
  margin-top: -1.8em;
  padding-left: 0.6em
}
.evaluation{
  width: 6em;
  height: 3em;
  font-size: 0.7em;
}
</style>