<template>
    <div class="media">
        <img src="../../../public/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-1 img-circle">
        <div class="media-body">
                <h3 class="dropdown-item-title text-primary">
                    {{ noti.type_name.toUpperCase() }}
                <span class="float-right text-sm text-primary" v-if="noti.has_seen === 0"><i class="fas fa-circle"></i></span>
                </h3>
                <p class="text-sm message-noti">{{ noti.message }}</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> {{ noti.updated_at | filterDateTime }} </p>
        </div>
    </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'

export default {
    name:"notication",
    mixins: [Vue2Filters.mixin],
    props:[
        'noti'
    ],
    data(){
        return{
            type_noti: "",
        }
    },
    mounted(){
    },
    methods:{
        
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