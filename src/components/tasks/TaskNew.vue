<template>
    <b-modal size="lg" ref="modalCreate" id="modalCreate" hide-backdrop >
        <template #modal-title>
            <h4>Tạo mới công việc</h4>
        </template>
        <div class="modal-body">
            <b-form ref="addForm" >
                <b-form-group id="task-priority" label="Ưu tiên" label-for="priority">
                  <b-form-radio-group
                    id="priority"
                    v-model="task.priority"
                    :options="priority_list"
                  ></b-form-radio-group>
                </b-form-group>

                <b-form-group
                    id="task-name"
                    label="Tên công việc"
                    label-for="name"
                >
                    <b-form-input
                    id="name"
                    v-model="task.task_name"
                    type="text"
                    placeholder="ex: Làm công việc a"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="task-description" label="Mô tả" label-for="description">
                    <vue-editor id="editor" v-model="task.description"> </vue-editor>
                      <div class="col-lg-12">
                        <label>Files
                            <input type="file" id="files" ref="files" multiple @change="handleFilesUpload" style="display:none"/>
                        </label>
                        <div v-for="(file, key) in files" :key="key" class="file-listing">
                          <h5>
                            <span class="badge badge-light">{{ file.name }}</span>&nbsp; 
                            <button class="remove-file badge" @click="removeFile(key)">Remove</button>
                          </h5>
                        </div>

                        <button type="button" @click="addFiles" class="d-block btn btn-primary">
                            <i class="fas fa-plus"></i>
                        </button>
                      </div>
                </b-form-group>
                <div class="d-flex">
                  <b-form-group class="col-lg-3" id="task-assignee" label="Phụ trách" label-for="assignee">
                      <b-form-select
                      id="assignee"
                      v-model="task.assignee_id"
                      :options="staff"
                      value-field="id"
                      text-field="name"
                      ></b-form-select>
                  </b-form-group>
                  <b-form-group class="col-lg-3" id="qa-id" label="Kiểm định" label-for="qa_id">
                      <b-form-select
                      id="qa_id"
                      v-model="task.qa_id"
                      :options="manager"
                      value-field="id"
                      text-field="name"
                      ></b-form-select>
                  </b-form-group>
                  <b-form-group class="col-lg-3" label="Bắt đầu" label-for="start_date">
                    <b-form-input
                    id="start_date"
                    v-model="task.start_date"
                    type="date"
                    required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group class="col-lg-3" label="Kết thúc" label-for="end_date">
                    <b-form-input
                    id="end_date"
                    v-model="task.end_date"
                    type="date"
                    required
                    ></b-form-input>
                  </b-form-group>

                </div>
               
                
                
                <b-form-group id="task-criteria" label="Tiêu chí" label-for="criteria">
                  <div class="d-flex">
                    <div class="col-lg-10">
                      <b-form-select @change="pushCriteria"
                        id="criteria"
                        v-model="selectedCriteria"
                      >
                      <b-form-select-option v-for="criterio in taskCriteria" :key="criterio.id" :value="{id:criterio.id,criteria_name:criterio.criteria_name,max_score:criterio.max_score,criteria_type_id:criterio.criteria_type_id}">
                        {{ criterio.criteria_name }} - {{ criterio.max_score }}
                      </b-form-select-option>
                      </b-form-select>

                      <div class="choosenCriteria mt-2">
                        <b-button class="bg-white borderd shadow w-100 mt-1" @mouseover="openHover(item.id)" @mouseleave="closeHover()" v-for="item in choosenCriteria" :key="item.id">
                          <div class="popup" v-if="idHover == item.id && item.description !== ''"><p class="inner">{{ item.description }}</p></div>
                          <input name="criteria_name" id="criteria_name" type="text" v-model="item.criteria_name" class="float-left border-0 col-lg-10" />
                          <input name="max_score" id="max_score" type="number" v-model="item.max_score" class="col-lg-1" />
                          <i class="fas fa-times float-right" @click="delCriteria"></i>
                        </b-button>
                      </div>
                    </div>
                    <b-button class="col-lg-1" style="background-color:#1a75ff" id="btn-modal" v-b-modal.modalCriteria>
                      Tạo mới
                    </b-button>
                    <CriterionNew :choosenList="choosenCriteria" :criteria_types="criteria_types" :from="fromTask"></CriterionNew>
                    <!-- <Criterion v-if="isOpenCriteria === true" :criterion="criterion"></Criterion> -->
                  </div>
                </b-form-group>
            </b-form>
        </div>
        <template #modal-footer>
            <b-button
            variant="success"
            size="sm"
            class="float-left"
            @click="onSubmit"
            >
            Lưu
            </b-button>
            
            <b-button
            variant="default"
            size="sm"
            class="mr-3 float-right"
            @click="toggleModal"
            >Huỷ
            </b-button>
        </template>
    </b-modal>
</template>
<script>
import CriterionNew from '@/components/criteria/CriterionNew'
import { VueEditor } from "vue2-editor";
var today = new Date()
// var date = today.getDate()+ '/'+ (today.getMonth()+1)+ '/' + today.getFullYear()
export default {
  name:'TaskNew',
  components:{
    CriterionNew,
    VueEditor
  },
  props: ['manager','staff','taskCriteria'],
  data () {
    return {
      files: [],
      priority_list:[
        "Cao",
        "Trung bình",
        "Thấp"
      ],
      task: {
        task_name:"",
        description: "",
        assignee_id:"",
        start_date: today.toISOString().slice(0,10),
        end_date:today.toISOString().slice(0,10),
        qa_id:"",
        priority:"",
        project_id: this.$route.params.id
      },
      manager_list: [],
      staff_list: [],
      fromTask:'Task',
      choosenCriteria:[],
      selectedCriteria:[],
      isExist: false,
      countReload:0,
      isOpenCriteria: false,
      criteria_types:
      {
      id: 1,
      name: "Task",
      },
      idHover:null,
    }
    
  },
  mounted(){
  },
  methods:{
    openHover(e){
      this.idHover = e
    },
    closeHover(){
      this.idHover = null;
    },
    createCriteria (task){
      this.choosenCriteria.forEach(val=>{
        val.task_id = task.id
      })
      this.axios.post('/criteria',this.choosenCriteria)
      .then((res)=>{
        (res)
      })
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
      (this.choosenCriteria)
    },
    toggleModal(){
      this.$refs['modalCreate'].toggle('#btn-modal')
    },
    onSubmit() {
      this.axios.post('/tasks',this.task)
      .then( res =>{
        if(res.data.data){
          this.createCriteria(res.data.data)
          this.submitFiles(res.data.data)
          this.$emit('update',this.countReload++)
          this.task = {
            task_name:"",
            description: "",
            assignee_id:"",
            start_date: today.toISOString().slice(0,10),
            end_date:today.toISOString().slice(0,10),
            qa_id:"",
            priority:"",
            project_id: this.$route.params.id
          },
          this.choosenCriteria = [];
          this.toggleModal()
        }
        else{
          (res.data.message);
        }
      })
    },
    // Upload multiple file
    submitFiles(data){
        /*
        Initialize the form data
        */
        let formData = new FormData();
        formData.append('task_id',data.id)
        /*
        Iteate over any file sent over appending the files
        to the form data.
        */
        for( var i = 0; i < this.files.length; i++ ){
            let file = this.files[i];
            formData.append('files[' + i + ']', file);
        }
        /*
        Make the request to the POST /multiple-files URL
        */
        this.axios.post( '/uploadFiles',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((val)=>{
            ('SUCCESS WITH DATA: '+val)
        })
        .catch(()=>{
            ('FAILURE!!');
        });
    },
    /*
        Handles a change on the file upload
    */
    handleFilesUpload(){
        // this.files = this.$refs.files.files;
        let uploadedFiles = this.$refs.files.files;
        /*
            Adds the uploaded file to the files array
        */
        for( var i = 0; i < uploadedFiles.length; i++ ){
            this.files.push( uploadedFiles[i] );
        }
    },
    addFiles(){
        this.$refs.files.click();
    },
    removeFile( key ){
        this.files.splice( key, 1 );
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


</style>