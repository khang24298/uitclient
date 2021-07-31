<template>
    <div class="content-wrapper">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class=" card-title"><b>BẢNG XẾP HẠNG</b></h3>
                        <input class="ml-5 border border-light" type="date" name="date" v-model="date" id="date" @change="changeDate($event)"/>

                        <div class="card-tools">
                            <div class="input-group input-group-sm" style="width: 150px;">
                                <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-default">
                                    <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body table-responsive p-0" style="height: 70vh;">
                        <table class="table table-head-fixed text-nowrap">
                            <thead>
                            <tr>
                                <th>Hạng</th>
                                <th>Tên</th>
                                <th>Điểm tác phong</th>
                                <th>Điểm công việc</th>
                                <th>Tổng điểm</th>
                                <th class="text-center">Năng suất cùng kỳ</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in orderBy(userRankList,'total_rank',1)" :key="user.user_id">
                                <td>{{ user.total_rank}}</td>
                                <td>{{ user.user_name }}</td>
                                <td>{{ user.score_by_personnel_criteria }}</td>
                                <td>{{ user.score_by_task_criteria }}</td>
                                <td>{{ user.total_score }}</td>
                                <td class="text-center"><span class="tag tag-success ">{{ user.increase_or_decrease.toFixed(0) }} %</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'

var today = new Date();

export default {
  name: 'Ranking',
  title: "UIT - Bảng xếp hạng",
  components: {
  },
  mixins: [Vue2Filters.mixin],
    data() {
        return{
            userRankList:[],
            date: today.toISOString().slice(0,10),
            month: today.getMonth()+1,
            year: today.getFullYear(),
        }
    },
    mounted(){
        this.axios.get(`/getRankListInUserDepartmentByMonth/`+this.month+`/`+this.year)
        .then(res=>{
            this.userRankList = res.data.data
        })
    },
    watch: {
      month:function(){
         this.axios.get(`/getRankListInUserDepartmentByMonth/`+this.month+`/`+this.year)
        .then(res=>{
            this.userRankList = res.data.data
        })
      },
      year:function(){
         this.axios.get(`/getRankListInUserDepartmentByMonth/`+this.month+`/`+this.year)
        .then(res=>{
            this.userRankList = res.data.data
        })
      }
      
    },
    methods: {
        changeDate(e){
            let choosenDate = e.target.value;
            this.year = new Date(choosenDate).getFullYear();
            this.month = new Date(choosenDate).getMonth()+1;
        }
    },    
}
</script>
<style scoped>

</style>
