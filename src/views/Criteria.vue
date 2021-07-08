<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <Criteria />
    <Footer />
  </div>
</template>

<script>
import Criteria from '@/components/criteria/Criteria.vue'
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'viewCriteria',
  title: 'UIT - Tiêu Chí',
  components: {
    Criteria,
    Header,
    Sidebar,
    Footer
  }
}
</script>
<style scoped>
 
</style>
