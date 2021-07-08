<template>
    <div class="col-lg-8">
        <div class="card">
          <div class="card-header row ml-0">
            <div class="col-lg-3">
              <h3 class="card-title">Thành viên</h3>
            </div>
            <div class="search-user col-lg-7">
              <form class="form-inline ml-3">
                <div class="input-group input-group-sm">
                  <input class="form-control form-control-navbar" type="search" placeholder="Tìm kiếm" aria-label="Search">
                  <div class="input-group-append border">
                    <button class="btn btn-navbar" type="submit">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-tools">
              <span class="badge badge-danger">Tổng cộng {{ usersList.length }} thành viên</span>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body p-0">
            <ul class="users-list all-users clearfix">
              <evaluation-detail v-for="item in usersList" 
              :key="item.id" 
              :user="item"
              :userCriteria="userCriteria"
              :month="month"
              :year="year"
              >
              </evaluation-detail>
  
            </ul>
            
            <!-- /.users-list -->
          </div>
          <!-- /.card-body -->
          <div class="card-footer text-center">
            <a href="javascript:void" v-on:click="loadMore"><i class="fa fa-angle-double-down" aria-hidden="true"></i></a>
          </div>
          <!-- /.card-footer -->
        </div>
      </div>
</template>

<script>
import EvaluationDetail from './EvaluationDetail.vue'
export default {
    name:"Members",
    props:['userCriteria','usersList','month','year'],
    components:{
      EvaluationDetail
    },
    data(){
      return{
        
      }
    },
    methods:{
      loadMore(){
      }
    }
}
</script>

<style scoped>
.all-users > li{
  width: 20%;
}
.input-group-append .btn-navbar{
  align-self: baseline;
}
.input-group-append{
  height: 2%;
}
.search-user input{
  height: auto;
}
.search-user .input-group{
  width: 50%;
}
</style>