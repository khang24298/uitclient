<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <Projects />
    <Footer />
  </div>
</template>

<script>
import Projects from '@/components/projects/Projects.vue'
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'viewProjects',
  title: "UIT - Dự án",
  components: {
    Projects,
    Header,
    Sidebar,
    Footer
  }
}
</script>
<style scoped>

</style>
