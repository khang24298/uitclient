<template>
    <div class="post border-0 col-lg-12 overflow-auto">
        <div class="user-block d-flex">
            <div class="circle border shadow" >
                <span class="initials">{{ formatName(item.user_name) }}</span>   
            </div>
            <div class="col-lg-4">
                <span class="username">
                    {{ item.user_name }}
                </span>
                <span class="description">{{ item.updated_at | filterDateTime }}</span>
            </div>
          
        </div>
        <!-- /.user-block -->
        <p v-html="item.content"></p>
        <p class="d-flex">
            <a v-for="fileCom in documents" :key="fileCom.id" :href="fileCom.path" target="_blank" class="mr-3 link-black text-sm">
                <i class="fas fa-link mr-1"></i>{{ fileCom.file_name }}
            </a>
        </p>
    </div>
</template>

<script>
    export default {
        'name': "CommentDetail",
        props:[
            'item'
        ],
        data(){
            return{
                documents:[]
            }
        },
        mounted(){
            this.axios.get(`/getDocumentInfoByCommentId/`+this.item.id)
            .then(val=>{
                if(val.data.data.length > 0){
                    this.documents = val.data.data
                }
            })
        },
        methods:{
            formatName(name){
                let fullname = name.split(' ')
                let initials = fullname.shift().charAt(0) + fullname.pop().charAt(0);
                return initials.toUpperCase();
            }
        }
    }
</script>

<style scoped>
.circle {
  border-radius: 50%;
  height: 2.5rem;
  text-align: center;
  width: 2.5rem;
  background-color: #ccc;
  position: relative;
}

.initials {
  font-size: calc(2.5rem / 2); /* 50% of parent */
  line-height: 1;
  position: relative;
  top: calc(2.5rem / 5); /* 25% of parent */
}
.user-block .username,.description{
    margin-left:10px!important;
}
</style>

