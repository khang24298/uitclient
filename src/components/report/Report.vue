<template>
    <div class="content-wrapper" style="min-height: 222px;">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-5">
            <h3 class="m-0">Trang chủ </h3>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <div class="col-3 text-center">
              <br>
              <div class="d-flex ">
                <b-form-input class="col-12" type="number" v-model="time">
                </b-form-input>
                <b-form-select
                          id="type"
                          class="col-12"
                          v-model="typeSelected"
                          :options="type"
                          value-field="value"
                          text-field="name"
                ></b-form-select>
              </div>
            </div>
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
              <span class="info-box-icon bg-info elevation-1"><i class="fas fa-folder"></i></span>

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
              <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-tasks"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Tổng số Công việc</span>
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
              <span class="info-box-icon bg-success elevation-1"><i class="far fa-check-circle"></i></span>
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
        <!-- Real Statics -->
        <h3 v-if="user.role > 2">Thống kê </h3>
        <div v-if="user.role > 2" class="row">
          <div class="col-6">
            <strong class="text-center"><h4>Dự án, công việc</h4> </strong>
            <div class="card col-lg-12 ">
              <span class="p-2"> 
                <strong class="float-left">Dự án hoàn tất/Tổng dự án:</strong> 
                <span class="float-right">{{ projectStatics.done_project}}/{{projectStatics.total_project }}</span>
              </span>
              <span class="p-2">
                <strong class="float-left">Tỷ lệ dự án trễ hạn:</strong>  
                <span class="float-right">{{ (projectStatics.late_project/projectStatics.total_project).toFixed(2)*100 }}%</span>
              </span>
               <span class="p-2">
                <strong class="float-left">Đang triển khai:</strong>  
                <span class="float-right">{{ projectStatics.on_going_project }}</span>
              </span>
            </div>
            <!-- <div class="card">
              <span>
                <strong>Tỷ lệ dự án trễ hạn:</strong>  
                {{ (projectStatics.late_project/projectStatics.total_project).toFixed(2)*100 }}%
              </span>
            </div>
            <div class="card">
              <span>
                <strong>Đang triển khai:</strong>  
                {{ projectStatics.on_going_project }}
              </span>
            </div> -->
            <div class="card col-lg-12 pb-1">
              <strong class="p-2">Tỷ lệ công việc/nhân sự theo từng dự án</strong>
              <div v-for="(project,index) in projectStatics.detail" :key="project.id">
                  <span class="pl-2 pr-2 float-left">{{ index +1 }}. {{ project.project_name }} </span>
                  <span class="pl-2 pr-2 float-right" v-if="project.total_tasks != 0 && changeToMilisec(project.start_date) <= today">{{ project.taskPerUser }}/người</span>
                  <span v-else class="pl-2 pr-2 float-right">Chưa triển khai</span>
              </div>
            </div>
          </div>
          <div class="col-6">
            <strong class="text-center"><h4>Nhân sự</h4> </strong>

            <div class="card p-2"><strong class="pb-1">Tăng trường nhân sự:</strong>
              <div v-for="(item,index) in memberStatics.userGroupByTime" :key="item.id">
                <span class="float-left pl-2 pr-2">{{ index+1 }}. {{ convertKeyToName(typeSelected) }}: {{ item.key }}  </span>     
                <span class="float-right pl-2 pr-2"> Số lượng: {{ item.value.length}}</span>
              </div>
            </div>
            <div class="card p-2"><strong class="pb-1">Tỷ lệ công việc/nhân sự theo thời gian</strong> 
              <div v-for="(item,index) in memberStatics.taskEachUsers" :key="item.id">
                <span class="float-left pl-2 pr-2 ">{{ index+1 }}. {{ convertKeyToName(typeSelected) }}: {{ item.key }}  </span>     
                <span class="float-right pl-2 pr-2">{{ item.value.toFixed(2) }}/người</span>
              </div>
            </div>
          </div>

        </div>
        
        <div class="d-flex pb-3">
          <h3 class="col-2">Bộ lọc dự án</h3>
          <b-button class="" variant="primary" @click="toggleFilter">{{ showName }}</b-button>
        </div>
        <div v-if="isShowFilter === true" class="filterFunction" name="filterFunction">
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
          <div class="col-3">
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

          <!-- Filter button -->
          <div class="col-1">
            <b-button  variant="primary" @click="submitFilter">Lọc</b-button>
          </div>

        </div>

        <div class="row">
          <div class="col-12">
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
          
        </div>

        <project-report :projectDetail="projectDetail.tasks"></project-report>
        <div class="clearfix">
          <b-pagination
            v-model="curPage"
            :total-rows="projectDetail.count"
            :per-page="perPage"
          ></b-pagination>
        </div>
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
import { Pie } from "vue-chartjs"
import { Line } from 'vue-chartjs'

var curDate = new Date();
var today = curDate.getTime();
export default {
  name: 'Report',
  title: "UIT - Thống kê",
  components: {
    ProjectReport,
  },
  extends: Pie,Line,
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
          memberStatics: [],
          projectStatics: [],
          today: today,
          time: 1,
          type:[
            {
              "name":"Năm",
              "value":"year"
            },
            {
              "name":"Tháng",
              "value":"month"
            },
            {
              "name":"Ngày",
              "value":"day"
            }
          ],
          typeSelected: "month",
          isShowFilter:false,
          showName: "Hiển thị",
        }
    },
    computed:{
      ...mapGetters({
        user:'auth/user'
      })
    },
    mounted(){
        this.axios.post('/getMembersStatics',{
          "type": this.typeSelected,
          "time": this.time
        }).then(res=>{ this.memberStatics = res.data.data})
        this.axios.post('/getProjectStatics',{
          "type":this.typeSelected,
          "time":this.time
        }).then(res=>{this.projectStatics = res.data.data})
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
        this.axios.post('/getTheStatistics',{
          "type":this.typeSelected,
          "time":this.time
        })
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
      time:function(){
        this.axios.post('/getMembersStatics',{
          "type": this.typeSelected,
          "time": this.time
        }).then(res=>{ this.memberStatics = res.data.data})
        this.axios.post('/getProjectStatics',{
          "type":this.typeSelected,
          "time":this.time
        }).then(res=>{this.projectStatics = res.data.data})
        this.axios.post('/getTheStatistics',{
          "type":this.typeSelected,
          "time":this.time
        })
        .then(res=>{
            this.statics = res.data.data
        })
      },
      typeSelected:function(){
        this.axios.post('/getMembersStatics',{
          "type": this.typeSelected,
          "time": this.time
        }).then(res=>{ this.memberStatics = res.data.data})
        this.axios.post('/getProjectStatics',{
          "type":this.typeSelected,
          "time":this.time
        }).then(res=>{this.projectStatics = res.data.data})
        this.axios.post('/getTheStatistics',{
          "type":this.typeSelected,
          "time":this.time
        })
        .then(res=>{
            this.statics = res.data.data
        })
      }
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
      },
      changeToMilisec(time){
        return new Date(time).getTime()
      },
      convertKeyToName(key){
        let name = "";
        switch(key){
          case "year":
            name = "Năm";
            break;
          case "month":
            name = "Tháng";
            break;
          case "day":
            name = "Ngày";
            break;
          default:
            break;
        }
        return name;
      },
      toggleFilter(){
        this.isShowFilter = !this.isShowFilter;
        if(this.isShowFilter === true){
          this.showName = "Ẩn";
        }
        else{
          this.showName = "Hiển thị";
        }
      }
    }
}
</script>

<style scoped>

</style>

