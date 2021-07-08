<template>
     <div class="card">
            <div class="card-header">
            <h3 class="card-title ">Đề xuất khen thưởng</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body p-0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nhân sự</th>
                    <th>Điểm</th>
                    <th style="width: 6em">Cùng kỳ</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in limitBy(orderBy(userPerformaceList, 'total_rank', 1),2)" :key="user.user_id">
                    <td>{{ user.total_rank}}</td>
                    <td>{{ user.user_name}}</td>
                    <td>{{ user.total_score.toFixed(0) }}</td>
                    <td><span class="badge bg-success">{{user.increase_or_decrease.toFixed(0)}}%</span>&nbsp;&nbsp;<i class="fas fa-angle-double-up text-success"></i></td>
                </tr>
                <tr>
                    <td colspan="4"><a href="/ranking">Tất cả <i class="fa fa-angle-double-right" aria-hidden="true"></i></a></td>
                </tr>
                
                </tbody>
            </table>
            </div>
            <hr style="color:grey">
            <div class="card-header text-center">
                <h3 class="card-title ">Cân nhắc phê bình/Khiển trách</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body p-0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th >#</th>
                    <th>Nhân sự</th>
                    <th>Điểm</th>
                    <th style="width: 6em">Cùng kỳ </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in limitBy(orderBy(userPerformaceList, 'total_rank', -1),2)" :key="user.user_id">
                    <td>{{ user.total_rank}}</td>
                    <td>{{ user.user_name}}</td>
                    <td>{{ user.total_score.toFixed(0) }}</td>
                    <td><span class="badge bg-danger">{{ user.increase_or_decrease.toFixed(0) }}%</span> &nbsp;&nbsp;<i class="fas fa-angle-double-down text-danger"></i></td>
                </tr>
                
                <tr>
                    <td colspan="4"><a href="/ranking">Tất cả   <i class="fa fa-angle-double-right" aria-hidden="true"></i></a></td>
                </tr>
                </tbody>
            </table>
            </div>
            <!-- /.card-body -->
    </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'
export default {
    name:'ShortRanking',
    props:[
        'month','year'
    ],
    mixins: [Vue2Filters.mixin],
    data() {
        return{
            userPerformaceList:[],
        }
    },
    mounted(){
        this.axios.get('/getRankListByMonth/'+ this.month +'/'+this.year)
        .then(res=>{
            this.userPerformaceList = res.data.data
        })
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
       
    }
   
}
</script>

<style scoped>

</style>