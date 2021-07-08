<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <Ranking />
    <Footer />
  </div>
</template>

<script>
import Ranking from '@/components/ranking/Ranking.vue'
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'viewRanking',
  title: "UIT - Bảng xếp hạng",
  components: {
    Ranking,
    Header,
    Sidebar,
    Footer
  }
}
</script>
<style scoped>

</style>
