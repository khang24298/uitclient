<template>
    <b-modal size="xl" ref="modalCreate" id="modalCreate" >
        <template #modal-title>
            <h4>Add New Task</h4>
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

                <label class="mt-3" for="start_date">Start Date</label>
                <b-form-input
                id="start_date"
                v-model="task.start_date"
                type="date"
                placeholder="ex: 07-04-2021"
                required
                ></b-form-input>

                <label class="mt-3" for="end_date">End Date</label>
                <b-form-input
                id="end_date"
                v-model="task.end_date"
                type="date"
                placeholder="ex: 07-04-2021"
                required
                ></b-form-input>

                <b-form-group id="qa-id" label="QA" label-for="qa_id">
                    <b-form-select
                    id="qa_id"
                    v-model="task.qa_id"
                    :options="manager"
                    value-field="id"
                    text-field="name"
                    ></b-form-select>
                </b-form-group>
                
                <b-form-group id="task-criteria" label="Criteria" label-for="criteria">
                  <div class="d-flex">
                    <div class="col-lg-10">
                      <b-form-select @change="pushCriteria"
                        id="criteria"
                        v-model="selectedCriteria"
                      >
                      <b-form-select-option v-for="criterio in taskCriteria" :key="criterio.id" :value="{id:criterio.id, criteria_name:criterio.criteria_name,max_score:criterio.max_score}">
                        {{ criterio.criteria_name }} - {{ criterio.max_score }}
                      </b-form-select-option>
                      </b-form-select>

                      <div class="choosenCriteria mt-2">
                        <b-button class="bg-white borderd shadow w-100 mt-1" v-for="item in choosenCriteria" :key="item.id">
                          <input name="criteria_name" id="criteria_name" type="text" v-model="item.criteria_name" class="float-left border-0" />
                          <input name="max_score" id="max_score" type="number" v-model="item.max_score" class="col-lg-3" />
                          <i class="fas fa-times float-right" @click="delCriteria"></i>
                        </b-button>
                      </div>
                    </div>
                    <b-button class="col-lg-2" id="btn-modal" v-b-modal.modalCriteria>
                      Create
                    </b-button>
                    <CriterionNew :choosenList="choosenCriteria" :criteria_types="criteria_types"></CriterionNew>
                    <!-- <Criterion v-if="isOpenCriteria === true" :criterion="criterion"></Criterion> -->
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
        </div>
        <template #modal-footer>
            <b-button
            variant="primary"
            size="sm"
            class="float-left"
            @click="onSubmit"
            >
            Save
            </b-button>
            
            <b-button
            variant="default"
            size="sm"
            class="mr-3 float-right"
            @click="toggleModal"
            >Cancel
            </b-button>
        </template>
    </b-modal>
</template>
<script>
import CriterionNew from '@/components/criteria/CriterionNew'
// import Criterion from '@/components/criteria/Criterion'

export default {
  name:'TaskNew',
  components:{
    CriterionNew,
    // Criterion
  },
  props: ['manager','staff','listTask'],
  data () {
    return {
      priority_list:[
        "High",
        "Medium",
        "Low"
      ],
      task: {
        task_name:"",
        description: "",
        assignee_id:"",
        start_date:"",
        end_date:"",
        qa_id:"",
        priority:"",
        project_id: this.$route.params.id
      },
      manager_list: [],
      staff_list: [],
      taskCriteria: [],
      choosenCriteria:[],
      selectedCriteria:[],
      isOpenCriteria: false,
      criteria_types:[
        {
        id: 1,
        name: "Task",
        }
      ]
    }
    
  },
  mounted(){
    this.axios.get('/criteria')
    .then(res=>{
      if(res.data.data){
        this.taskCriteria = res.data.data
      }
    })
  },
  methods:{
    delCriteria(e){
      this.choosenCriteria.pop(e);
    },
    pushCriteria(){
      if(this.choosenCriteria.length == 0){
        this.choosenCriteria.push(this.selectedCriteria)
      }
      else{
        let isExist = false
        this.choosenCriteria.map((value) => {
          if(this.selectedCriteria.id === value.id){
            isExist = true
            return
          }
        })
        if(isExist != true){
          this.choosenCriteria.push(this.selectedCriteria)
          isExist = true
        }
      }
      console.log(this.choosenCriteria)
    },
    toggleModal(){
      this.$refs['modalCreate'].toggle('#btn-modal')
    },
    createCriteria (task){
      this.choosenCriteria.filter(val => !val.date_created).forEach(val=>{
        this.axios.post('/criteria',{
          criteria_name: val.criteria_name,
          max_score: val.max_score,
          task_id: task.id,
          criteria_type_id: 1
        }).then(res=>console.log(res.data.message))
      })
    },
    onSubmit() {
      this.axios.post('/tasks',this.task)
      .then( res =>{
        if(res.data.data){
          this.createCriteria(res.data.data)
          this.listTask.push(res.data.data)
          this.toggleModal()
        }
        else{
          console.log(res.data.message);
        }
      })
    }
  }
};
</script>

<style scoped>
.b-form-datepicker #start_date{
  position: absolute;
  left: 0;
  bottom: 0;
}
.b-form-datepicker label{
  margin-left: 2em;
  width: 95%;
  margin-top: -0.45em;
}
</style>