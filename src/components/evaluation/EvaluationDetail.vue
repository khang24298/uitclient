<template>
  <!-- Modal -->
    <li>
      <b-button class="user" id="btn-toggle-user" v-b-modal="'modal_'+user.id">
        <img class="user-logo" src="../../../public/img/user2-160x160.jpg" alt="User Image">
      </b-button>
      <a class="users-list-name" href="#">{{ user.name }}</a>
      <span class="users-list-date">Joined: <b>{{ user.created_at | filterDate }}</b></span>
      <b-modal hide-backdrop @show="getUserCriteriaByUserId(user.id)" modal-class="user-modal" size="xl" ref="modal_user" :id="'modal_'+user.id"> 
        <template #modal-title>
            <div>
              <h4>{{ user.name}}</h4>
              <img class="user-logo" src="../../../public/img/user2-160x160.jpg" alt="User Image">
              <b-button v-if="isEvaluate == false && hasBeenEvalued == false && choosenCriteria.length > 0" variant="primary" @click="isEvaluate = !isEvaluate">
                  Đánh giá
              </b-button>
              <b-button v-if="hasBeenEvalued == true" variant="secondary">
                  Đã đánh giá
              </b-button>
              
            </div>
        </template>
        <div class="modal-body">
            <p class="d-flex col-12">
              <span class="col-4"><b>Email:</b> {{ user.email }}</span>
              <span class="col-4">
                <b>Phòng/Khoa:</b>
                Khoa học và Kỹ thuật thông Tin
              </span>
              <span class="col-4" v-if="hasBeenEvalued == true">
                <b>Tổng điểm đánh giá:</b>
                &nbsp;{{ sumEvaluation(evaluationCount) }}
              </span>
            </p>
            <p class="d-flex col-12">
              <span class="col-4"><b>Phone:</b> {{ user.phone }}</span>
              <span class="col-4">
                <b>Cấp bậc:</b> Nhân sự
              </span>
            </p>
            <b-form ref="userForm" class="d-flex" >
                <b-form-group class="col-lg-12">
                  <b-form-select @change="pushCriteria" 
                      id="criteria"
                      v-model="selectedCriteria"
                      class="col-lg-8"
                      v-if="hasBeenEvalued == false"
                    >
                    <b-form-select-option v-for="criterio in userCriteria" :key="criterio.id" :value="{id:criterio.id, criteria_name:criterio.criteria_name,max_score:criterio.max_score,criteria_type_id:criterio.criteria_type_id}">
                      {{ criterio.criteria_name }} - {{ criterio.max_score }}
                    </b-form-select-option>
                    
                  </b-form-select>
                  <span v-if="isEvaluate == true" class="col-lg-3 text-danger font-italic">
                      *Hệ thống sẽ thiết lập điểm tối đa nếu để trống
                  </span> 
                  <div class="choosenCriteria mt-2 col-lg-10">
                    <div class="item d-flex" v-for="item in choosenCriteria" :key="item.id" >
                        <b-button @mouseover="openHover(item.id)" @mouseleave="closeHover()" class="bg-white borderd shadow col-lg-10 mt-1">
                          <div class="popup" v-if="idHover == item.id"><p class="inner">{{ item.description }}</p></div>
                          <span class="float-left" >{{ item.criteria_name }}</span>
                          <strong class="col-md-1" >Điểm tối đa: {{ item.max_score }}</strong>
                          <i class="fas fa-times float-right" @click="delCriteria"></i>
                        </b-button>
                        <div class="col-lg-6" v-if="hasBeenEvalued == true || isEvaluate == true">
                           
                          <div class="evaluation-range col-lg-12">
                            <b-form-input class="mt-2 " v-model="item.score" type="range" min="0" :max="item.max_score" step="5"></b-form-input>
                            <div class="float-right">Value: {{ item.score }}/{{ item.max_score }}</div>
                          </div>
                          <div class="col-lg-12" >
                            <b-form-input v-model="item.note" type="text"></b-form-input>
                          </div>
                        </div>
                        
                    </div>
                     
                  </div>
                
                </b-form-group>

                <b-button v-if="hasBeenEvalued == false && isEvaluate == false" class="col-lg-1 btn-create" id="btn-modal" v-b-modal.modalCriteria style="background-color:#1a75ff">
                 Tạo mới
                </b-button>
              
                <CriterionNew :choosenList="choosenCriteria" :criteria_types="criteria_types"></CriterionNew>
            </b-form>
        </div>
        <template #modal-footer>
          <div class="">
            <b-button
            v-if="hasBeenEvalued == false"
            variant="primary"
            size="sm"
            class="mr-3 p-2"
            @click="onSubmit"
            >
            Lưu
            </b-button>
            
            <b-button
            variant="default"
            size="sm"
            class="p-2"
            @click="toggleModal"
            >Huỷ
            </b-button>
          </div>
        </template>
    </b-modal>  
  </li>
</template>

<script>
import CriterionNew from '@/components/criteria/CriterionNew.vue'

export default {
  name:'evaluation-detail',
  props: ['user','userCriteria','month','year'],
  components:{
    CriterionNew
  },
  data(){
    return{
      idHover:null,
      evaluation:[],
      isEvaluate: false,
      isExist:false,
      choosenCriteria: [],
      selectedCriteria: [],
      criteria_types: {
        id:2,
        name:"User"
      },
      hasBeenEvalued: false,
      evaluationCount:[],
    }
  },
  watch: {
      month:function(){
          this.axios.get('/getRankListByMonth/'+ this.month +'/'+this.year)
          .then(res=>{
              this.userPerformaceList = res.data.data
          })
      },
      year:function(){
          this.axios.get('/getRankListByMonth/'+ this.month +'/'+this.year)
          .then(res=>{
              this.userPerformaceList = res.data.data
          })
      }
      
  },
  methods:{
    openHover(e){
      this.idHover = e
    },
    closeHover(){
      this.idHover = null;
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
    getUserCriteriaByUserId(user_id){
      console.log(this.month)
      this.axios.get(`/getUserCriteriaByUserID/`+user_id+'/'+this.month+'/'+this.year)
      .then(res => this.choosenCriteria = res.data.data)
      this.axios.get(`/getUserEvaluationByUserID/`+user_id+'/'+this.month+'/'+this.year)
      .then(res=>{
        if(res.data.data.length > 0){
          this.hasBeenEvalued = true
          this.evaluationCount = res.data.data
        }
      })
    },
    sumEvaluation(arr){
      console.log(arr)
      return arr.reduce((a,b)=>a.score + b.score)
    },
    onSubmit(){
      if(this.isEvaluate == true && this.hasBeenEvalued == false)
      {
        this.evaluate()
      }
      else{
          this.choosenCriteria.forEach(val=>{
            val.user_id = this.user.id
          })
          this.axios.post('/criteria',this.choosenCriteria)
          .then((res)=>{
            if(res.data.data){
              this.toggleModal()
            }
            else{
              console.log(res.data.message)
            }
          })
      }
        
    },
    toggleModal(){
      this.$refs['modal_user'].toggle('#btn-toggle-user')
    },
    delCriteria(e){
      this.choosenCriteria.pop(e);
    },
    evaluate(){
        this.evaluation = this.choosenCriteria.map(function(val){
          return {score: Number(val.score), note:val.note,criteria_id: val.id,user_id:val.user_id}
        })
        this.axios.post('/evaluation', this.evaluation)
          .then(val=>{
            if(val.data.data){
              this.toggleModal()
            }
            else{
              alert('Fail : \n'+val.data.message)
            }
          })
    }
  }
};
</script>

<style scoped>
.user{
  border: none;
  background: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
}
li .user-logo{
  width:80%;
}
.latest>li img{
  border: 3px solid #03fc1c
}
.user-modal{
  background:wheat;
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
.btn-create{
  position: absolute;
  right: 25%;
}
</style>
