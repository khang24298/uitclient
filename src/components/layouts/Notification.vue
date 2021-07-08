<template>
    <div class="media">
        <img src="../../../public/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-1 img-circle">
        <div class="media-body">
            <router-link target="_blank" :to="url" style="color:black">
                <h3 class="dropdown-item-title text-primary">
                    {{ noti.type_name.toUpperCase() }}
                <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm message-noti">{{ noti.message }}</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> {{ noti.updated_at | filterDateTime }} </p>
            </router-link>
        </div>
    </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'

export default {
    name:"notication",
    mixins: [Vue2Filters.mixin],
    props:[
        'noti','noti_types'
    ],
    data(){
        return{
            type_noti: "",
            url:'#'
        }
    },
    mounted(){
        this.formatUrl(this.noti)
    },
    methods:{
        formatUrl(noti) {
            let content = JSON.parse(noti.content);
            switch(Number(noti.type_id)){
                case 1:
                    this.url = '/project/'+content.id
                    break;
                case 2:
                    this.url = '/project/'+content.project_id+'?task='+content.id
                    break;
                case 3:
                    this.url = '/criteria/'+content.id
                    break;
                case 4:
                    this.url = '/evaluation/';
                break;
                default:
                    break;
            }
            return this.url;
        }
    }
}
</script>

<style scoped>

.message-noti{
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
}
</style>