<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Projects</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Projects</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <b-alert show dismissible variant="success" v-if="isSuccess == 'Success'">
        <h5><i class="icon fas fa-check"></i> Success!</h5>
        Success adding new project!
      </b-alert>
      <b-alert show dismissible variant="danger" v-if="isSuccess == false">
        <h5><i class="icon fas fa-ban"></i> Fail!</h5>
        There is an error while adding new project!
      </b-alert>
      <div class="card">
        <div class="card-header" v-if="user.role > 2">
          <b-button v-b-modal.mymodal>Create new Project</b-button>
          <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i class="fas fa-minus"></i>
            </button>
            <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body p-0">
          <table class="table table-striped projects">
              <thead>
                  <tr>
                      <th style="width: 1%">
                          #
                      </th>
                      <th style="width: 20%">
                          Project Name
                      </th>
                      <th style="width: 30%">
                          Team Members
                      </th>
                      <th>
                          Project Progress
                      </th>
                      <th style="width: 8%" class="text-center">
                          Status
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="project in projects" :key="project.id">
                      <td>
                          {{ project.id }}
                      </td>
                      <td>
                          <router-link :to="'/project/' + project.id">
                              {{ project.project_name }}
                          </router-link>
                          <br/>
                          <small>
                              Created: {{ project.created_at | formatDate }}
                          </small>
                      </td>
                      <td>
                          <ul class="list-inline">
                            <!-- {{ getUsersInProject(project) }} -->
                              <!-- <li class="list-inline-item" v-for="user in usersInProject[project.id]" :key="user.id">
                                  {{ user.name }}
                                  <img alt="Avatar" class="table-avatar" src="../../../public/img/avatar.png">
                              </li> -->
                              <li class="list-inline-item">
                                  <img alt="Avatar" class="table-avatar" src="../../../public/img/avatar2.png">
                              </li>
                              <li class="list-inline-item">
                                  <img alt="Avatar" class="table-avatar" src="../../../public/img/avatar3.png">
                              </li>
                              <li class="list-inline-item">
                                  <img alt="Avatar" class="table-avatar" src="../../../public/img/avatar4.png">
                              </li>
                          </ul>
                      </td>
                      <td class="project_progress" v-if="isOdd(project.id) == 1">

                          <div class="progress progress-sm" >
                              <div class="progress-bar bg-green" role="progressbar" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100" style="width: 57%">
                              </div>
                          </div>
                          <small>
                              57% Complete
                          </small>
                      </td>
                      <td class="project_progress" v-if="isOdd(project.id) !== 1">

                          <div class="progress progress-sm" >
                              <div class="progress-bar bg-green" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                              </div>
                          </div>
                          <small>
                              100% Complete
                          </small>
                      </td>
                      <td class="project-state">
                          <span v-if="isOdd(project.id) !== 1" class="badge badge-success">Completed</span>
                          <span v-if="isOdd(project.id) == 1" class="badge badge-failed">In progress</span>
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
    <section class="project-create" v-if="user.role > 2">
      <b-modal ref="mymodal" id="mymodal" >
        <template #modal-title>
            <h4>Create New Project</h4>
        </template>
        <div class="modal-body">
          <b-form >
            <b-form-group
              id="input-group-1"
              label="Project Name:"
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

            <b-form-group id="input-group-2" label="Description:" label-for="input-2">
              <b-form-textarea
                id="input-2"
                v-model="project.description"
                placeholder="Key Results"
                rows="6"
                max-rows="10"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-3" label="Start Date" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="project.start_date"
                name="start_date"
                type="date"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="End Date:" label-for="input-4">
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
          <b-button @click="onSubmit" class="btn-primary">
            Save
          </b-button>
          <b-button id="toggle-btn" @click="toggleModal">Cancel</b-button>
        </template>
      </b-modal>
    </section>
  </div>
  <!-- /.content-wrapper -->

</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Projects',
  props: {
    msg: String
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
      isSuccess: null,
      user: null,
      usersInProject:[]
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/user',
    })
  },
  mounted: function() {
    this.user = (this.userInfo) ? this.userInfo : null
    this.axios.get(`/getProjectsUserJoinedOrCreated/`+this.user.id).then(res => this.projects = res.data.data)
  },
  methods:{
    isOdd(number){
      return number%2;
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
    getUsersInProject(project){
      return this.axios.get(`/getUsersJoinedProject/`+project.id).then(res => this.usersInProject[project.id] = res.data.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
