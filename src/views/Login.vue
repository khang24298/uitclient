<template>
    <div class="login-page">
        <div class="login-box mx-auto">
            <div class="login-logo">
                <a href="../../index2.html"><b style="color:white">UIT WORK</b></a>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your work</p>

                <b-form @submit.prevent="onSubmit">
                    <div class="input-group mb-3">
                        <input v-model="email" name="email" type="email" class="form-control" placeholder="Email">
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="password" name="password" type="password" class="form-control" placeholder="Password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember">
                                <label for="remember">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                        </div>
                    </div>
                </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  name: 'Login',
 
  data () {
    return{
        email: "",
        password: ""
    }
  },
  methods:{
    ...mapActions({
        logIn:'auth/logIn',
    }),
    onSubmit () {
        this.logIn({
            email: this.email,
            password: this.password
        })
        .then(()=>{
            this.$router.replace({
                name:'Home'
            })
        })
    }
  }
}
</script>

<style scoped>
.login-page{
    background-image: url("https://www.chetu.com/img/blogs/sliderbg/oracle-erp-banner.jpg");
}
</style>
