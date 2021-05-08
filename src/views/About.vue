<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <div class="text-center "><h1> This is About Page</h1> </div>
    <Footer />
    <aside class="control-sidebar control-sidebar-dark">
    </aside>
  </div>
</template>

<script>
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'About',
  components: {
    Header,
    Sidebar,
    Footer
  }
}
</script>

<style scoped>

</style>
