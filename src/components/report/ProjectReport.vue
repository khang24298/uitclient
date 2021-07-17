<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
            <div class="card-header d-flex border-transparent">
                <h3 class="card-title col-lg-3">Thống kê dự án</h3>
                <div class="col-lg-3">
                        <h3 class="card-title">Search</h3>
                        <b-form-input v-model="searchQuery"></b-form-input>
                </div>
            </div>
            <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table m-0">
                <thead>
                <tr>
                    <th>Mã công việc</th>
                    <th>Tên công việc</th>
                    <th>Nhân sự</th>
                    <th>Dự án</th>
                    <th>Trạng thái</th>
                    <th>Ngày hết hạn</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="pro in orderBy(resultQuery,'id',-1)" :key="pro.id">
                        <td>{{ pro.id}}</td>
                        <td><router-link target="_blank" :to="'/project/'+pro.id+'?task='+pro.id">{{ pro.task_name }}</router-link></td>
                        <td>{{ pro.user_name}}</td>
                        <td><router-link target="_blank" :to="'/project/'+pro.id">{{ pro.project_name}}</router-link></td>
                        <td v-html="formatStatus(pro.status_id)"></td>
                        <td v-bind:class="{ overdue: formatDateStyle(pro) }">{{ pro.end_date | filterDate }}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <!-- /.table-responsive -->
            </div>
            <!-- /.card-body -->
            
            <!-- /.card-footer -->
        </div>
        </div>
    </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'

export default {
    name:"project-report",
    props:[
        'projectDetail'
    ],
    mixins: [Vue2Filters.mixin],
    data(){
        return{
          searchQuery:"",
        }
    },
    computed:{
      resultQuery(){
        if(this.searchQuery){
          return this.projectDetail.filter((item)=>{
            return this.searchQuery.toLowerCase().split(' ').every(v => item.task_name.toLowerCase().includes(v))
          })
        }else{
          return this.projectDetail;
        }
      }
    },
    methods:{
        formatStatus(status_id){
        let html = ""
        switch(status_id){
          case 0:
            html = "<span class='badge badge-light'>Đang chờ</span>"
            break;
          case 1:
            html = "<span class='badge badge-info'>Sẽ làm</span>"
            break;
          case 2:
            html = "<span class='badge badge-warning'>Đang làm</span>"
            break;
          case 3:
            html = "<span class='badge badge-success'>Đã xong</span>"
            break;
          case 4:
            html = "<span class='badge badge-primary'>Đã đánh giá</span>"
            break;
          case 5:
            html = "<span class='badge badge-danger'>Từ chối</span>"
            break;
          default:
          break;
        }
        return html
      },
      formatDateStyle(task){
          if(task.status_id < 4){
            if(new Date(task.end_date).getTime() < Date.now()){
              return true;
            }
          }
          return false;
      }
    }
}
</script>

<style scoped>
.overdue{
    color: orangered;
    font-weight: bold;
}
</style>