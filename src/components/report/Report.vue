<template>
    <div class="content-wrapper" style="min-height: 222px;">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard </h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard </li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Info boxes -->
        <div class="row">
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-info elevation-1"><i class="fas fa-cog"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Tổng số Dự án</span>
                <span class="info-box-number">
                  {{ statics.totalProject }}
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Tổng số task</span>
                <span class="info-box-number">{{ statics.totalTask }}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->

          <!-- fix for small devices only -->
          <div class="clearfix hidden-md-up"></div>

          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-users"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Đã hoàn thành</span>
                <span class="info-box-number" >{{ statics.totalDoneTask }}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-thumbs-down"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Từ chối</span>
                <span class="info-box-number">{{ statics.totalRejectedTask }}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
     
        <div class="row">
          <!-- Project filter -->
          <div class="col-3">
            <div class="card">
              <div class="card-header border-transparent">
                <h3 class="card-title">Dự án</h3>
                <input type="checkbox" class="float-right" :value="{filter:'project_id',value:project}" 
                v-model="filterQuery" @change="check('project_id')">
              </div>
              <div class="card-body p-0 border-top">
                  <b-select id="projects" v-model="project"
                  :options="projects"
                  value-field="id"
                  text-field="project_name"
                  ></b-select>
              </div>
            </div>
          </div>
          
          <!-- User filter -->
          <div class="col-3">
            <div class="card">
              <div class="card-header border-transparent">
                <h3 class="card-title">Nhân sự</h3>
                <input type="checkbox" class="float-right" :value="{filter:'assignee_id',value:employee}" 
                v-model="filterQuery" @change="check('assignee_id')">
              </div>
              <div class="card-body p-0 border-top">
                  <b-select id="projects" v-model="employee"
                  :options="employeeList"
                  value-field="id"
                  text-field="name"
                  ></b-select>
              </div>
            </div>
          </div>
          
          <!-- Status filter -->
          <div class="col-2">
            <div class="card">
              <div class="card-header border-transparent">
                <h3 class="card-title">Trạng thái</h3>
                <input type="checkbox" class="float-right" :value="{filter:'status_id',value:status}" 
                v-model="filterQuery" @change="check('status_id')">
              </div>
              <div class="card-body p-0 border-top">
                  <b-select id="projects" v-model="status"
                  :options="statuses"
                  value-field="type_id"
                  text-field="name"
                  ></b-select>
              </div>
            </div>
          </div>

          <!-- Dealine filter -->
          <div class="col-4">
            <div class="card">
              <div class="card-header border-transparent ">
                <h3 class="card-title">Ngày hết hạn</h3>
                <input type="checkbox" class="float-right" :value="{filter:'end_date',value:{
                  from_date:from_date,
                  to_date:to_date
                }}" 
                v-model="filterQuery" @change="check('end_date')">
              </div>
              <div class="card-body p-0 border-top col-12 d-flex">
                  <b-form-input
                  id="start_date"
                  v-model="from_date"
                  type="date"
                  class="col-6"
                  required
                  ></b-form-input>

                  <b-form-input
                  id="end_date"
                  v-model="to_date"
                  class="col-6"
                  type="date"
                  ></b-form-input>
              </div>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col-11">
            <ul class="list-unstyled d-flex ">
              <li class="ml-2" v-for="(filter,index) in filterQuery" :key="index">
                <b-button :id="index" class="bg-white borderd shadow mt-1">
                  <strong class="float-left" >{{ filter.filter }}</strong>
                  <span class="" > &nbsp;: {{ filter.value }}</span>
                  <i class="fas fa-times ml-2" @click="delFilter(filter)"></i>
                </b-button>
              </li>
            </ul>
          </div>
          <div class="col-1">
            <b-button variant="primary" @click="submitFilter">Filter</b-button>
          </div>
        </div>

        <project-report :projectDetail="projectDetail.tasks"></project-report>
        <div class="clearfix">
          <b-pagination
            v-model="curPage"
            :total-rows="projectDetail.count"
            :per-page="perPage"
          ></b-pagination>
        </div>
        
      </div><!--/. container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'
import { mapGetters } from 'vuex'
import ProjectReport from '@/components/report/ProjectReport.vue'
export default {
  name: 'Report',
  title: "UIT - Thống kê",
  components: {
    ProjectReport
  },
  mixins: [Vue2Filters.mixin],
    data() {
        return{
          curPage:1,
          perPage:10,
          projects:[],
          project:null,
          projectDetail:[],
          statics:[],
          statuses:[],
          status:null,
          employeeList:[],
          employee:null,
          from_date:null,
          to_date:null,
          filterQuery:[],
        }
    },
    computed:{
      ...mapGetters({
        user:'auth/user'
      })
    },
    mounted(){
        this.axios.get('/status')
        .then(res=>{
            this.statuses = res.data.data
            this.status = res.data.data[0].type_id
        })
        this.axios.get('/getUsersWithEmployeeRole')
        .then(res=>{
            this.employeeList = res.data.data
            this.employee = res.data.data[0].id
        })
        this.axios.get(`/getProjectsUserJoinedOrCreated/`+this.user.id)
        .then(res=>{
          this.projects = res.data.data
          this.project = res.data.data[0].id
          this.axios.post('/getTasksByFilter',{
            'offset':0,
            'limit': this.perPage,
            'filters':this.filterQuery
          })
          .then(val=>{
            this.projectDetail = val.data.data
          })
        })
        this.axios.get('/getTheStatistics')
        .then(res=>{
            this.statics = res.data.data
        })
    },
    watch:{
      curPage:function(){
        this.axios.post('/getTasksByFilter',{
          'offset':this.curPage*this.perPage - this.perPage,
          'limit':this.perPage,
          'filters':this.filterQuery
        })
        .then(val=>{
          this.projectDetail = val.data.data
        })
      },
      
    },
    methods:{
      check(e){
        console.log(e)
      },
      submitFilter(){
        this.axios.post('/getTasksByFilter',{
          'offset':0,
          'limit':this.perPage,
          'filters':this.filterQuery
        })
        .then(val=>{
          this.projectDetail = val.data.data
        })
      },
      delFilter(e){
        this.filterQuery.pop(e)
      }
    }
}
</script>
<style scoped>

</style>

