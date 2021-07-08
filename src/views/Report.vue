<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <Report />
    <Footer />
  </div>
</template>

<script>
import Report from '@/components/report/Report.vue'
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'viewReport',
  title: "UIT - Báo cáo thống kê",
  components: {
    Report,
    Header,
    Sidebar,
    Footer
  }
}
</script>
<style scoped>

</style>
