<template>
    <b-modal hide-backdrop ref="modalCriteria" id="modalCriteria" >
        <template #modal-title>
            <h4>Tạo tiêu chí</h4>
        </template>
        <div class="modal-body">
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label="Tên tiêu chí:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="criterion.criteria_name"
                type="text"
                placeholder="ex: Hoàn thành đúng hạn"
                required  
              ></b-form-input>
            </b-form-group>

             <b-form-group
              id="description_criteria"
              label="Mô tả:"
              label-for="description"
            >
              <b-textarea
                id="description"
                v-model="criterion.description"
                type="text"
                placeholder="ex: Hoàn thành đúng hạn"
                required  
                rows="3"
              ></b-textarea>
            </b-form-group>
            
            <b-form-group id="input-group-2" label="Điểm tối đa:" label-for="input-2">
              <strong class="float-right">{{ criterion.max_score }}</strong>
              <b-form-input
                id="input-2"
                type="range"
                v-model="criterion.max_score"
                placeholder="ex: 100"
                min="0" max="100" step="5"
                required
                
              ></b-form-input>
            </b-form-group>

            <b-form-group v-if="criteria_types.length > 1" id="input-group-4" label="Loại tiêu chí: " label-for="input-4">
               <b-form-select
                id="input-4"
                v-model="criterion.criteria_type_id"
                :options="criteria_types"
                value-field="id"
                text-field="name"
                required
              ></b-form-select>
            </b-form-group>

            <b-alert show dismissible variant="danger" v-if="isValidated == false">
                <p>* Là trường bắt buộc</p>
            </b-alert>
          </b-form>
        </div>
        <template #modal-footer>
            <b-button
            variant="primary"
            size="sm"
            class="float-left"
            @click.prevent="onSubmit"
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
export default {
  name:'CriterionNew',
  props: ['criteria_types','choosenList','from'],
  data () {
    return {
      criterion:{
        max_score:100
      },
      isValidated:true
    }
  },
  methods:{
    validate(data){
      if(data.criteria_name != "" && data.criteria_type_id != ""){
        return this.isValidated = true ;
      }
      else{
        return this.isValidated = false ;
      }
    },
    toggleModal(){
      this.$refs['modalCriteria'].toggle('#btn-modal')
    },
    onSubmit() {
      if(this.choosenList){
        if(this.criteria_types){
          this.criterion.criteria_type_id = this.criteria_types.id
        }
        this.choosenList.push(this.criterion)
        this.criterion = {
          name:"",
          description:""
        };
        this.toggleModal()
      }
      else{
        this.axios.post('/criteria',[this.criterion])
        .then(res=>{
          if(res.data.data){
            this.criterion = {
              name:"",
              description:""
            };
            this.toggleModal()
          }
          else{
            alert("Fail! \n"+res.data.message)
          }
        })
      }
      
    },
  }
};
</script>
