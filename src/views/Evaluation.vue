<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <Evaluation />
    <Footer />
  </div>
</template>

<script>
import Evaluation from '@/components/evaluation/Evaluation.vue'
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'viewEvaluation',
  components: {
    Evaluation,
    Header,
    Sidebar,
    Footer
  }
}
</script>
<style scoped>
 
</style>
