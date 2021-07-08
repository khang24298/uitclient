<template>
  <div class="bg-white shadow rounded px-3 pt-2 pb-2 mt-3 cursor-move task" :class="priority()">
    <div class="d-flex confirm-top" v-if="task.status_id == 0 && user.role <= 2">
      <b-button class="col-lg-6" variant="outline-none" id="btn-reject-task" v-b-modal="'reject_'+task.id">
        <i class="fa-lg fas fa-times-circle" style="color:red"></i>
      </b-button>
      <b-button class="col-lg-4" variant="outline-none" @click.prevent="accept(task)">
        <i class="fa-lg fas fa-check-square" style="color:green"></i>
      </b-button>
    </div>
    <div class="">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm text-center">{{task.task_name}}</p>
    </div>
    <div class="flex pb-1 ">
      <span class="text-sm date-left" v-html="daysLeft(task.end_date)"></span>
      <span class="text-sm text-gray-600 end-date">{{task.end_date | filterDate}}</span>
    </div>
    <div class="btn-open-area d-flex">
      <b-button class="btn-light border shadow text-sm task-card" ref="btnShow" id="toggle-btn-task" v-b-modal="'modal_'+task.id">
       <strong>Chi tiết</strong>
      </b-button>
      <div class="ml-5 circle border shadow" @mouseover="openHover(task.id)" 
      @mouseleave="closeHover()"
      >
          <div class="popup-user-info row" v-if="idHover == task.id">
              <span class="inner-user-info col-12">
                  <i class="float-left fas fa-user"></i> &nbsp;{{ task.name }}
              </span>
              
              <span class="inner-user-info col-12">
                  <i class="float-left fas fa-envelope"></i> &nbsp;{{ task.email}}
              </span>
          </div>
          <span class="initials">{{ formatName(task.name) }}</span>   
      </div>
    </div>
    
    <b-modal hide-backdrop size="xl" ref="modal_task" :id="'modal_'+task.id" @show="getOthersData(task.id)"> 
        <template #modal-title>
            <div>
              <h4>{{ task.task_name}}</h4>
              <b-select v-if="task.status_id < 4" id="status" v-model="task.status_id"
              :options="status_list"
              value-field="type_id"
              text-field="name"
              ></b-select>
              <b-button v-if="task.status_id == 3 && user.role > 2" variant="primary"  @click.prevent="evaluate">
                  Đánh giá
              </b-button>
              <b-button v-if="task.status_id > 3" variant="secondary" disabled>
                  Đã đánh giá
              </b-button>
            </div>
            <div class="confirm-area" v-if="task.status_id == 0 && user.role <= 2">
              <b-button class="reject col-lg-5" v-b-modal="'reject_'+task.id">
                Từ chối
              </b-button>
              <b-button class="accept col-lg-5" @click.prevent="accept(task)">
                Chấp nhận
              </b-button>
            </div>
        </template>
        <div class="modal-body">
            <b-form ref="addForm" >
               <b-form-group id="task-priority" label="Ưu tiên" label-for="priority">
                  <b-form-radio-group
                    id="priority"
                    v-model="task.priority"
                    :options="priority_list"
                    class="d-block"
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
                    placeholder="ex: Làm việc a"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="task-description" label="Mô tả" label-for="description">
                      <vue-editor id="editor" v-model="task.description"> </vue-editor>
                        
                      <div class="col-lg-12">
                        <label>Files
                            <p class="d-flex">
                                <a v-for="item in filesUploaded" :key="item.id" :href="item.path" target="_blank" class="mr-3 link-black text-sm">
                                    <i class="fas fa-link mr-1"></i>{{ item.file_name }}
                                </a>
                            </p>
                            <input type="file" id="taskfiles" ref="taskfiles" multiple @change="handleFilesUpload" style="display:none"/>
                        </label>
                        <div v-for="(file, key) in filesAttach" :key="key" class="file-listing">
                          <h5> 
                            <span class="badge badge-light">{{ file.name }}</span>&nbsp; 
                            <button class="remove-file badge " @click="removeFile(key)"> Remove</button>
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

                  <b-form-group class="col-lg-3"  id="qa-id" label="Kiểm định" label-for="qa_id">
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
                    placeholder="ex: 07-04-2021"
                    required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-lg-3" label="Kết thúc" label-for="end_date">
                    <b-form-input
                    id="end_date"
                    v-model="task.end_date"
                    type="date"
                    placeholder="ex: 07-04-2021"
                    required
                    ></b-form-input>
                  </b-form-group>

                </div>
                <b-form-group id="task-criteria" label="Tiêu chí" label-for="criteria">
                  <div class="d-flex">
                    <div class="col-lg-12">
                      <div class="choosenCriteria mt-2">
                        <div class="item d-flex" v-for="item in choosenCriteria" :key="item.id" >
                            <b-button :id="item.id" @mouseover="openHover(item.id)" @mouseleave="closeHover()" class="bg-white borderd shadow col-lg-6 mt-1">
                              <div class="popup" v-if="idHover == item.id && item.description !== ''"><p class="inner">{{ item.description }}</p></div>
                              <span class="float-left col-lg-9" >{{ item.criteria_name }}</span>
                              <strong class="col-lg-2" >Tối đa: {{ item.max_score }}</strong>
                              <i v-if="user.role > 2" class="fas fa-times float-right" @click="delCriteria"></i>
                            </b-button>
                            <div class="col-lg-6" v-if="item.score || isEvaluate == true" >
                              <div class="evaluation-range col-lg-12">
                                <b-form-input :disabled="user.role <= 2" class="mt-2 " v-model="item.score" type="range" min="0" :max="item.max_score" step="5"></b-form-input>
                                <div class="float-right">Điểm: <strong>{{ item.score }}/{{ item.max_score }}</strong></div>
                                <span class="float-left">Nhận xét</span>

                              </div>
                              <div class="col-lg-12" :disabled="user.role <= 2">
                                <b-form-input v-model="item.note" type="text"></b-form-input>
                              </div>
                            </div>
                        </div>
                        
                        <CriterionNew :choosenList="choosenCriteria" :criteria_types="criteria_types"></CriterionNew>
                      </div>
                      
                    </div>  
                  </div>
                </b-form-group>

            </b-form>
            <hr>
            <comment :task_id="task.id" :documents="filesUploaded"></comment>
        </div>
        <template #modal-footer>
          <div class="w-100">
            <b-button v-if="user.role > 2" 
            variant="danger"
            size="sm"
            class="p-2"
            @click="onDelete"
            >
            Xoá
            </b-button>

            <b-button
            variant="default"
            size="sm"
            class="p-2 float-right"
            @click="toggleModal"
            >Huỷ
            </b-button>

            <b-button
            variant="primary"
            size="sm"
            class="mr-2 p-2 float-right"
            @click="onSubmit"
            v-if="task.status_id != 4"
            >
            Lưu
            </b-button>
            
          </div>
        </template>
    </b-modal>

    <b-modal hide-backdrop ref="reject" :id="'reject_'+task.id">
      <template #modal-title>
        Từ chối công việc : {{ task.task_name }}
      </template>
      <div class="modal-body">
        <b-form>
          <b-form-group id="task-description">
              <b-form-textarea
              id="rejectform"
              v-model="rejectContent"
              name="reject"
              placeholder="Lí do từ chối"
              rows="4"
              max-rows="6"
              ></b-form-textarea>
          </b-form-group>
        </b-form>
      </div>
      <template #modal-footer>
          <div class="w-100">
            <b-button
            variant="primary"
            size="sm"
            class="mr-2 p-2 float-right"
            @click="onSubmitReject"
            >
            Gửi
            </b-button>
            
          </div>
        </template>
    </b-modal>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import CriterionNew from '@/components/criteria/CriterionNew'
import Comment from '@/components/tasks/Comment'
export default {
  name: "task-card",
  components:{
    CriterionNew,
    Comment,
    VueEditor
  },
  props:['task','status_list','manager','staff','taskCriteria','user'],
  data () {
    return {
      hover:false,
      criterion:Object,
      priority_list:[
        "Cao",
        "Trung Bình",
        "Thấp"
      ],
      idHover:null,
      rejectContent:"",
      filesAttach: [],
      filesUploaded: [],
      choosenCriteria:[],
      selectedCriteria:[],
      isExist:false,
      isEvaluate: false,
      evaluation:[],
      countReload:0,
      criteria_types: {
          id:1,
          name:"Task"
      },
    }
  },
  mounted(){
    if(Number(this.$route.query.task) == Number(this.task.id)){
      let task_modal = 'modal_'+ Number(this.$route.query.task)
      this.$bvModal.show(task_modal)
    }
  },
  methods:{
    formatName(name){
      let fullname = name.split(' ')
      let initials = fullname.shift().charAt(0) + fullname.pop().charAt(0);
      return initials.toUpperCase();
    },
    priority(){
      let className = "";
      switch(this.task.priority){
        case "Cao":
          className = "high-priority";
          break;
        case "Trung Bình":
          className = "medium-priority";
          break;
        default:
          break;
      }
      return className;
    },
    openHover(e){
      this.idHover = e
    },
    closeHover(){
      this.idHover = null;
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
      this.$bvModal.hide('modal_'+this.task.id)
    },
    showModal(task){
      this.$bvModal.show('modal_'+ task.task_id)
    },
    onSubmit () {
      if(this.isEvaluate != true){
        this.axios.put(`/tasks/`+this.task.id,this.task)
        .then(res=>{
          if(res.data.data){
            this.submitFiles(res.data.data)
            this.$emit('update',this.countReload++)
            this.toggleModal()
          }
          else{
            console.log(res.data.message)
          }
        })
      }
      else{
        this.evaluation = this.choosenCriteria.map(function(val){
          return {score: Number(val.score), note:val.note,criteria_id: val.id,task_id:val.task_id}
        })
        this.axios.post('/evaluation',this.evaluation)
        .then(val=>{
          if(val.data.message =="Success"){
            this.$emit('update',this.countReload++)
            this.toggleModal()
          }
          else{
            console.log('Fail: '+val.data.message)
          }
        })
      }
    },
    onDelete (){
      this.$bvModal.msgBoxConfirm('Are you sure?')
      .then(val=>{
          if(val == true){
            this.axios.delete(`/tasks/`+this.task.id)
            .then(res =>{
              if(res.data.message == "Success"){
                this.$emit('update',this.countReload++)
                this.toggleModal()
              }
              else{
                console.log(res.data.message)
              }
            })
          }
        })
    },
    accept(task){
      task.status_id = 1;
      this.axios.post('/updateTaskStatus',{ 
            "task_id": task.id,
            "status_id": task.status_id 
          })
      .then( res =>{
        if(res.data.data){
          this.$emit('update',this.countReload++)
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
        return "<strong>" + result + "</strong> ngày còn lại"
      }
      if(result == 0){
        return "<span class='text-warning'> hết hạn <strong >hôm nay</strong></span>" 
      }
      if(result < 0){
        return "<span class='text-danger'> hết hạn <strong >" + result*(-1) + "</strong> ngày"
      }
    },
    onSubmitReject(){
      this.axios.post('/refusedTask',{
        task_id: this.task.id,
        status_id: this.task.status_id,
        content: this.rejectContent
      })
      .then(res=>{
        if(res.data.data == true){
          this.$emit('update', this.countReload++);
          this.$refs['reject'].toggle('#btn-reject-task');
        }
        else{
          console.log('Reject Failed: '+res.data.message)
        }
      })
    },
    evaluate(){
      this.isEvaluate = !this.isEvaluate
      this.axios.get(`/getTaskCriteriaByTaskID/`+this.task.id)
      .then((val)=>{
        this.choosenCriteria = val.data.data
      })
    },
    // Upload multiple file
    submitFiles(task){
        /*
        Initialize the form data
        */
        let formData = new FormData();
        formData.append('task_id',task.id)

        /*
        Iteate over any file sent over appending the files
        to the form data.
        */
        for( var i = 0; i < this.filesAttach.length; i++ ){
            let file = this.filesAttach[i];
            formData.append('files[' + i + ']', file);
        }
        /*
        Make the request to the POST /multiple-files URL
        */
        this.axios.post('/uploadFiles',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(()=>{
            ('SUCCESS!!');
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
        let uploadedFiles = this.$refs.taskfiles.files
        /*
            Adds the uploaded file to the files array
        */
        for( var i = 0; i < uploadedFiles.length; i++ ){
            this.filesAttach.push( uploadedFiles[i] );
        }
    },
    addFiles(){
        this.$refs.taskfiles.click();
    },
    removeFile( key ){
        this.filesAttach.splice( key, 1 );
    },
    getOthersData(task_id){
      this.axios.get(`/getDocumentInfoByTaskID/`+task_id)
      .then(val=>{
        if(val.data.data.length > 0){
          this.filesUploaded = val.data.data
        }
        else{
          console.log(val.data.message)
        }
      })
      .catch(()=>{
        ('FAILURE!!')
      })
      this.axios.get(`/getTaskCriteriaByTaskID/`+task_id)
      .then((val)=>{
        this.choosenCriteria = val.data.data
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
  float: left;
  padding:5px;
  background-color:red;
}
.accept{
  background-color: greenyellow;
  color: black;
  padding:5px;
  float: left;
  width:100%;
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
.high-priority {
  border-left: 5px solid rgba(233, 9, 9, 0.733);
  border-right: 5px solid rgba(233, 9, 9, 0.733);
}
.medium-priority {
  border-left: 5px solid rgb(247, 243, 7);
  border-right: 5px solid rgb(247, 243, 7);
}

.circle {
  border-radius: 50%;
  height: 2.5rem;
  text-align: center;
  width: 2.5rem;
  background-color: #ccc;
  position: relative;
}

.initials {
  font-size: calc(2.5rem / 2); /* 50% of parent */
  line-height: 1;
  position: relative;
  top: calc(2.5rem / 5); /* 25% of parent */
}
.popup-user-info {
    position: absolute;
    left: 100%;
    bottom: -20%;
    transform: translate3d(0, -50%, 0);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    background: white;
    border-radius: 0.5em;
    width: 12em;
}

.inner-user-info {
  padding: 7px;
}
.inner-user-info .float-left{
    padding:4px;
}

</style>