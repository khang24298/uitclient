<template>
    <b-modal ref="modalCriteria" id="modalCriteria" >
        <template #modal-title>
            <h4>Add New Critiria</h4>
        </template>
        <div class="modal-body">
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label="Criteria Name:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="criterion.criteria_name"
                type="email"
                placeholder="ex: Hoàn thành đúng hạn"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Max Score:" label-for="input-2">
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

            <!-- <b-form-group id="input-group-3" label="Score:" label-for="input-3">
              <b-form-input
                id="input-3"
                type="range"
                v-model="criterion.score"
                min="0" :max="criterion.max_score" step="5"
                placeholder="ex: 100"
              ></b-form-input>
              {{ criterion.score }}
            </b-form-group> -->

            <b-form-group v-if="criteria_types.length > 1" id="input-group-4" label="Type: " label-for="input-4">
               <b-form-select
                id="input-4"
                v-model="criterion.criteria_type_id"
                :options="criteria_types"
                value-field="id"
                text-field="name"
                required
              ></b-form-select>
            </b-form-group>
          </b-form>
        </div>
        <template #modal-footer>
            <b-button
            variant="primary"
            size="sm"
            class="float-left"
            @click.prevent="onSubmit"
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
export default {
  name:'CriterionNew',
  props: ['criteria_types','choosenList'],
  data () {
    return {
      criterion:{}
    }
  },
  methods:{
    toggleModal(){
      this.$refs['modalCriteria'].toggle('#btn-modal')
    },
    onSubmit() {
      if(this.criteria_types.length <=1 ){
        this.criterion.criteria_type_id = this.criteria_types[0].id
      }
      this.axios.post('/criteria',this.criterion)
      .then(res=>{
        if(res.data.data){
          this.choosenList.push(res.data.data)
          this.toggleModal()
        }
        else{
          alert("Fail! \n"+res.data.message)
        }
      })
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
};
</script>
