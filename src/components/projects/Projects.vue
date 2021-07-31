<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Dự án</h1>
          </div>
          <div class="col-sm-6">
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <b-alert show dismissible variant="success" v-if="isSuccess == 'Success'">
        <h5><i class="icon fas fa-check"></i> Thành công!</h5>
        Tạo mới dự án thành công!
      </b-alert>
      <b-alert show dismissible variant="danger" v-if="isSuccess == false">
        <h5><i class="icon fas fa-ban"></i> Thất bại!</h5>
        Tạo mới dự án thất bại!
      </b-alert>
      <div class="card">
        <div class="card-header" v-if="userInfo.role > 2">
          <b-button style="background-color:#1a75ff" v-b-modal="'mymodal'">Tạo mới dự án</b-button>
          
        </div>
        <div class="card-body p-0">
          <table class="table table-striped projects">
              <thead>
                  <tr>
                      <th style="width: 1%">
                          #
                      </th>
                      <th style="width: 20%">
                          Tên dự án
                      </th>
                      <th style="width: 30%">
                          Thành viên
                      </th>
                      <th>
                          {{ (userInfo.role > 2) ? "Tiến độ dự án" : "Tiến độ của bạn"}}
                      </th>
                      <th style="width: 8%" class="text-center">
                          Kết thúc
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in projects" :key="item.id">
                      <td>
                          {{ item.id }}
                      </td>
                      <td>
                          <router-link :to="'/project/' + item.id">
                              {{ item.project_name }}
                          </router-link>
                          <br/>
                          <small>
                              Bắt đầu: {{ item.start_date | filterDate }}
                          </small>
                      </td>
                      <td>
                          <ul class="list-inline">
                              <User :project="item">
                              </User>
                              
                              <!-- <li class="list-inline-item">
                                  <img alt="Avatar" class="table-avatar" src="../../../public/img/avatar3.png">
                              </li>
                              <li class="list-inline-item">
                                  <img alt="Avatar" class="table-avatar" src="../../../public/img/avatar4.png">
                              </li> -->
                          </ul>
                      </td>
                      <td class="project_progress">
                          <k-progress :percent="item.progress.toFixed(0)" :color="getColor(item.progress)"></k-progress>
                        
                      </td>
                      <td class="project-state">
                          <span v-if="item.progress == 100" class="badge badge-success">{{ item.end_date | filterDate}}</span>
                          <span v-else-if="isExpiredProject(item.end_date) == true" class="badge badge-danger">{{ item.end_date | filterDate}}</span>
                          <span v-else class="badge badge-failed">{{ item.end_date | filterDate}}</span>
                      </td>
                  </tr>

              </tbody>
          </table>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

    </section>
    <!-- /.content -->
    <section class="project-create" v-if="userInfo.role > 2">
      <b-modal hide-backdrop ref="mymodal" id="mymodal" >
        <template #modal-title>
            <h4>Tạo mới dự án</h4>
        </template>
        <div class="modal-body">
          <b-form >
            <b-form-group
              id="input-group-1"
              label="Tên dự án:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="project.project_name"
                type="text"
                placeholder="ex: Dự án cải tiến hành chính"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Mô tả:" label-for="input-2">
              <b-form-textarea
                id="input-2"
                v-model="project.description"
                placeholder="ex: Mô tả dự án"
                rows="6"
                max-rows="10"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-3" label="Bắt đầu" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="project.start_date"
                name="start_date"
                type="date"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Kết thúc:" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="project.end_date"
                name="end_date"
                type="date"
              ></b-form-input>
            </b-form-group>
          </b-form>
        </div>
        <template #modal-footer>
          <b-button @click="onSubmit" class="btn-success">
            Lưu
          </b-button>
          <b-button class="border btn-light" id="toggle-btn" @click="toggleModal">Huỷ</b-button>
        </template>
      </b-modal>
    </section>
  </div>
  <!-- /.content-wrapper -->

</template>

<script>
var day = new Date();
import {mapGetters} from 'vuex'
import User from '@/components/users/UserInfo';
export default {
  name: 'Projects',
  props: {
    msg: String
  },
  components:{
    User,
  },
  data () {
    return {
      projects : [],
      project: {
        project_name: "",
        description: "",
        start_date: "",
        end_date: ""
      },
      users:[],
      isSuccess: null,
      today: day.toISOString().slice(0,10)
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/user',
    })
  },
  mounted() {
    this.axios.get(`/getProjectsUserJoinedOrCreated/`+this.userInfo.id).then(res => {
      this.projects = res.data.data
    })
  },
  methods:{
    getColor(percent) {
      if(percent < 40){
        return '#ffc069';
      } else if(percent < 60) {
        return '#fadb14';
      } else if(percent < 80) {
        return '#13c2c2';
      } else {
        return '#389e0d';
      }
    },
    isExpiredProject(date){
      if(Date.parse(date) < Date.parse(this.today)){
        return true
      }
      else{
        return false
      }
    },
    onSubmit(){
      this.axios.post('/projects',this.project)
      .then(res =>{
        if(res.data.data){
          this.projects.push(res.data.data)
          this.projects.reverse();
          this.isSuccess = res.data.message;
          this.toggleModal()
        }
        else{
          this.isSuccess = false;
        }
      })
    },
    toggleModal() {
      this.$refs['mymodal'].toggle('#toggle-btn')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
