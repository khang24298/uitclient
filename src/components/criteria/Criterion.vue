<template>
    <div class="criterion">
        <b-button class="bg-white border-0 w-100 d-flex" id="toggle-btn" v-b-modal="'modal_'+criterion.id">
            <div class="title col-lg-9">{{criterion.criteria_name}}</div>
            <div class="score col-lg-3"><strong>Max: {{criterion.max_score}}</strong></div>
        </b-button>
        <b-modal hide-backdrop ref="modal" :id="'modal_'+criterion.id">
            <template #modal-title>
                {{ criterion.criteria_name }}
            </template>
            <div>
                <b-form>
                    <b-form-group
                    id="input-group-1"
                    label="Tên tiêu chí:"
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

                    <b-form-group id="description_criteria" label="Mô tả:" label-for="description"
                    >
                        <b-textarea
                            id="description"
                            v-model="criterion.description"
                            type="text"
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
                    
                    <!-- <b-form-group id="input-group-3" label="Score:" label-for="input-3"> 
                    <b-form-input
                        id="input-3"
                        type="range"
                        v-model="criterion.score"
                        min="0" :max="criterion.max_score" step="5"
                        placeholder="ex: 100"
                    ></b-form-input>
                    {{ criterion.score }} 
                    </b-form-group>-->

                    <b-form-group id="input-group-4" label="Loại: " label-for="input-4">
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
                <div class="w-100 ">
                    <b-button
                        variant="danger"
                        size="sm"
                        class="ml-2 float-left"
                        @click.prevent="onDelete"
                    >Xoá
                    </b-button>

                    <b-button
                        variant="default"
                        size="sm"
                        class="ml-2 float-right"
                        @click="toggleModal"
                    >Huỷ
                    </b-button>

                    <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click.prevent="onSubmit"
                    >
                        Lưu
                    </b-button>
                
                
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name:'Criterion',
    props:['criterion'],
    data (){
        return{
            criteria_types:[
                {
                    id:1,
                    name: "Công việc"
                },
                {
                    id:2,
                    name: "Nhân sự"
                }
            ]
        }
    },
    mounted(){
        if(Number(this.$route.query.criterion) == Number(this.criterion.id)){
            let criteria_modal = 'modal_'+ Number(this.$route.query.criterion)
            this.$bvModal.show(criteria_modal)
        }
    },
    methods:{
        toggleModal() {
            this.$refs['modal'].toggle('#toggle-btn')
        },
        onSubmit () {
            this.axios.put(`/criteria/`+this.criterion.id,this.criterion)
            .then(res=>{
                if(res.data.message == "Success"){
                    this.toggleModal()
                    alert("Success Update!")
                }
                else{
                    alert("Fail Update : \n" + res.data.message)
                }
            })
        },
        onDelete (){
            this.axios.delete(`/criteria/`+this.criterion.id)
            .then(res=>{
                if(res.data.message == "Success"){
                    this.toggleModal()
                    alert("Success Delete!")
                }
                else{
                    alert("Fail Delete : \n" + res.data.message)
                }
            })
        }
    }
}
</script>

<style scoped>
.task_column{
    float: float-left;
}

.user-column{
    float: float-right;
}
</style>