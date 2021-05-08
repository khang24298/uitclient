<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <Projects />
    <Footer />
    <aside class="control-sidebar control-sidebar-dark">
    </aside>
  </div>
</template>

<script>
import Projects from '@/components/projects/Projects.vue'
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'Home',
  components: {
    Projects,
    Header,
    Sidebar,
    Footer
  },

}
</script>

<style scoped>
  @import '../../plugins/fontawesome-free/css/all.min.css';
  @import 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css';
  /* @import '../../plugins/icheck-bootstrap/icheck-bootstrap.min.css'; */
  @import '../../dist/css/adminlte.min.css';
  @import 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700';
</style>
