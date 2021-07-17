<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="../../../index3.html" class="brand-link">
        <img src="../../../public/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style="opacity: .8">
        <span class="brand-text font-weight-light">UIT WORK</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
        <!-- Sidebar user (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex" v-if="authenticated">
            <div class="image">
                <div class="circle border shadow" >
                    <span class="initials">{{ formatName(user.name) }}</span>  
                </div>
            </div>
            <div class="info">
                <a class="d-block" style="white-space:pre-wrap">{{ user.name}}</a>
            </div>
            <div class="logout ml-5">
                <b-button @click.prevent="signOut">
                    <i class="fas fa-sign-out-alt"></i>
                </b-button>
            </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column text-left" data-widget="treeview" role="menu" data-accordion="false">
            <!-- Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library -->
                <li class="nav-item">
                    <router-link to="/" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                        Trang chủ
                    </p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/projects" class="nav-link">
                    <i class="nav-icon far fa-calendar-alt"></i>
                    <p>Dự án</p>
                    </router-link>
                </li>
                <li class="nav-item" v-if="user.role > 2">
                    <router-link to="/criteria" class="nav-link">
                    <i class="nav-icon far fa-calendar-alt"></i>
                    <p>Quản lý tiêu chí</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/evaluation" class="nav-link">
                    <i class="nav-icon far fa-circle text-info"></i>
                    <p>Đánh giá</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/ranking" class="nav-link">
                    <i class="nav-icon far fa-circle"></i>
                    <p>Xếp hạng</p>
                    </router-link>
                </li>
                
                <li class="nav-item">
                    <router-link to="/about" class="nav-link">
                    <i class="nav-icon far fa-calendar-alt"></i>
                    <p>
                        Về chúng tôi
                    </p>
                    </router-link>
                </li>
            </ul>
        </nav>
        </div>
    </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions} from 'vuex'
export default {
    name:"SideBar",
    data(){
        return{
        }
    },
    computed:{
      ...mapGetters({
          authenticated: 'auth/authenticated',
          user: 'auth/user'
      })
    },
    methods: {
        formatName(name){
            let fullname = name.split(' ')
            let initials = fullname.shift().charAt(0) + fullname.pop().charAt(0);
            return initials.toUpperCase();
        },
        ...mapActions({
            logOut: "auth/logOut"
        }),
        signOut() {
        this.$bvModal.msgBoxConfirm('Are you sure?')
          .then(val=>{
              if(val == true){
                  this.logOut().then(()=>{
                      this.$router.replace({
                        name:"Login"
                      })
                  })
              }
          })
          .catch(err => {
              console.log(err)
          })
        }
    }
}
</script>

<style scoped>
.circle {
  border-radius: 50%;
  height: 2.5rem;
  text-align: center;
  width: 2.5rem;
  background-color: #ccc;
  position: relative;
}

.initials {
  font-size: calc(2.5rem / 2); /* 50% of parent */
  line-height: 1;
  position: relative;
  top: calc(2.5rem / 5); /* 25% of parent */
}
</style>
