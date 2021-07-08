<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand-md navbar-light navbar-white">
    <div class="container">
      <a href="/" class="navbar-brand">
        <img src="../../../public/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
             style="opacity: .8;width:25%;margin-right:5%">
        <span class="brand-text font-weight-light">UIT WORK</span>
      </a>
      <button class="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse order-3" id="navbarCollapse">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
         
          <li class="nav-item">
            <a href="/" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="About" class="nav-link">Liên hệ</a>
          </li>
        </ul>

        <!-- SEARCH FORM -->
        <form class="form-inline ml-0 ml-md-3">
          <div class="input-group input-group-sm">
            <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
              <button class="btn btn-navbar" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Right navbar links -->
        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown list-unstyled">
          <b-dropdown href="#" variant="default" toggle-class="text-decoration-none">
            <template #button-content>
              <i class="far fa-bell"></i>
            </template>
            <div class="dropdown-noti">
            <b-dropdown-item v-for="noti in orderBy(userNotis,'id',-1)" :key="noti.id" class="dropdown-item">
              <!-- Message Start -->
              <div class="dropdown-divider"></div>

              <notification :noti="noti" ></notification>
              
              <!-- Message End -->
            </b-dropdown-item>
            </div>
            <a href="/mailbox" class="border-top dropdown-item dropdown-footer">See All Messages</a>
          </b-dropdown>
        </li>
       
    </div>
  </nav>
  <!-- End nav -->
</template>

<script>
import {mapGetters} from 'vuex'
import Vue2Filters from 'vue2-filters'
import Notification from './Notification'

export default {
  name:"Header",
  mixins: [Vue2Filters.mixin],
  data(){
    return{
      userNotis:[],
      num:5
    }
  },
  components:{
    Notification
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })    
  },
  mounted(){
    this.axios.get(`/getNotificationByUserID/`+this.user.id)
    .then(res=>{
      this.userNotis = res.data.data.splice(0,this.num)
    })
  },
  methods:{
    loadMore(){
      this.num += 5;
    }
  }
}
</script>


<style scoped>
.dropdown-noti{
  max-height: 40vh;
  overflow: auto;
  width: 20vw;
}
.dropdown-item{
  padding: .1rem 0.3rem!important;
}
.noti-area div{
  left:-15vw!important;
}
.dropdown-toggle::after{
  content:none!important;
}
</style>