<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <MailBox />
    <Footer />
  </div>
</template>

<script>
import MailBox from '@/components/mailbox/MailBox.vue'
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'viewMailBox',
  title: "UIT - Thông báo",
  components: {
    MailBox,
    Header,
    Sidebar,
    Footer
  }
}
</script>
<style scoped>

</style>
