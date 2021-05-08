<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <Project />
    <Footer />
  </div>
</template>

<script>
import Project from '@/components/projects/Project.vue'
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'viewProject',
  components: {
    Project,
    Header,
    Sidebar,
    Footer
  }
}
</script>
<style scoped>

</style>
