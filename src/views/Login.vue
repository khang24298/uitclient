<template>
    <div class="login-page">
        <div class="login-box mx-auto">
            <div class="login-logo">
                <a href="../../index2.html"><b style="color:white">UIT WORK</b></a>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg">Đăng nhập để bắt đầu công việc nào!</p>

                <b-form @submit.prevent="onSubmit">
                    <div class="input-group mb-3">
                        <input v-model="email" name="email" type="email" class="form-control" placeholder="Email" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="password" name="password" type="password" class="form-control" placeholder="Password" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember">
                                <label for="remember">
                                    Nhớ mật khẩu
                                </label>
                            </div>
                        </div>
                        <div class="col-6">
                            <button type="submit" class="btn btn-primary btn-block">Đăng nhập</button>
                        </div>
                    </div>
                    <br>
                    <b-alert show variant="danger" v-if="isError == true">
                        <h5><i class="icon fas fa-ban"></i> Thất bại!</h5>
                        {{ message }}
                    </b-alert>
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
  title: 'UIT - Đăng nhập',
  data () {
    return{
        email: "",
        password: "",
        message:null,
        isError: false,
    }
  },
  methods:{
    ...mapActions({
        logIn:'auth/logIn',
    }),
    onSubmit () {
        this.isError = false
        this.logIn({
            email: this.email,
            password: this.password
        })
        .then(()=>{
            this.$router.replace({
                name:'Home'
            })
        })
        if(!this.$store.state.user){
            setTimeout(() => {   
                this.isError = true
                this.message = "Email hoặc mật khẩu không đúng!"; 
            }, 2000);
           
        }
    }
  }
}
</script>

<style scoped>
.login-page{
    background-image: url("https://www.chetu.com/img/blogs/sliderbg/oracle-erp-banner.jpg");
}
</style>
