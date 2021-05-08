<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="../../../index3.html" class="brand-link">
        <img src="../../../dist/img/AdminLTELogo.png"
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
                <img src="../../../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block">{{ user.name}}</a>
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
                        Dashboard
                    </p>
                    </router-link>
                </li>
                
                <li class="nav-item" v-if="user.role > 2">
                    <router-link to="/criteria" class="nav-link">
                    <i class="nav-icon far fa-calendar-alt"></i>
                    <p>Criteria Manager</p>
                    </router-link>
                </li>
                <li class="nav-item" v-if="user.role > 2">
                    <router-link to="/evaluation" class="nav-link">
                    <i class="nav-icon far fa-circle text-info"></i>
                    <p>Evaluation</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/ranking" class="nav-link">
                    <i class="nav-icon far fa-circle"></i>
                    <p>Ranking</p>
                    </router-link>
                </li>
                
                <li class="nav-item">
                    <router-link to="/about" class="nav-link">
                    <i class="nav-icon far fa-calendar-alt"></i>
                    <p>
                        About
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
