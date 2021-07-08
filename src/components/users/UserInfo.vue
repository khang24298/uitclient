<template>
    <div class="">
        <li class="list-inline-item" v-for="user in users" :key="user.id">
            <div class="circle border shadow" @mouseover="openHover(user.id)" 
            @mouseleave="closeHover()"
            >
                <div class="popup row" v-if="idHover == user.id">
                    <span class="inner col-12">
                        <i class="float-left fas fa-user"></i> &nbsp;{{ user.name }}
                    </span>
                    
                    <span class="inner col-12">
                        <i class="float-left fas fa-envelope"></i> &nbsp;{{ user.email}}
                    </span>
                </div>
                <span class="initials">{{ formatName(user.name) }}</span>   
            </div>
        </li>
    </div>
</template>

<script>
    export default {
        name: "User",
        props:[
            'project'
        ],
        data(){
            return{
                users:[],
                idHover:null
            }
        },
        mounted(){
            this.axios.get(`/getUsersJoinedProject/`+this.project.id)
            .then(res=> this.users = res.data.data)
        },
        methods:{
            openHover(e){
                this.idHover = e
            },
            closeHover(){
                this.idHover = null;
            },
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
.popup {
    position: absolute;
    left: 100%;
    bottom: 0;
    transform: translate3d(0, -50%, 0);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    background: white;
    border-radius: 0.5em;
    width: 12em;
}

.inner {
  padding: 7px;
}
.inner .float-left{
    padding:4px;
}
</style>

