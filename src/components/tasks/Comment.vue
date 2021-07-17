<template>
    <div class="row">
        <div class="col-12">
            <h4>Trao đổi</h4>
            <br/>

            <CommentDetail v-for="item in comments" :key="item.id" :item="item"/>

            <div class="d-flex">
                <div class="post col-lg-8">
                    <div class="user-block d-flex">
                        <div class="circle border shadow" >
                            <span class="initials">{{ formatName(user.name) }}</span>  
                        </div>
                        <span class="col-lg-4 username">
                            You
                        </span>
                      
                    </div>
                    <div class="mt-5 d-block">
                        <vue-editor id="editor" v-model="content"> </vue-editor>
                    </div>
                </div>
                <div class="col-4 mt-5 d-flex">
                   

                    <div class="col-lg-12">
                        <label><i class="fa fa-link mr-1"></i>Tệp đính kèm
                            <input type="file" id="files" ref="files" multiple @change="handleFilesUpload" style="display:none"/>
                        </label>
                        <div v-for="(file, key) in files" :key="key" class="file-listing">
                            <h5 class="d-flex">
                                <span class="badge badge-light col-lg-10 overflow-hidden">{{ file.name }}</span>&nbsp; 
                                <button class="remove-file badge badge-secondary" @click="removeFile(key)">Remove</button>
                            </h5>
                        </div>

                        <button type="button" @click="addFiles" class="d-block btn btn-secondary">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <b-button class="send-comment" variant="primary" @click="sendComment">
                        Gửi
                        <i class="far fa-paper-plane"></i>    
                    </b-button>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import CommentDetail from "@/components/tasks/CommentDetail.vue"
import { VueEditor } from "vue2-editor";
import { mapGetters } from 'vuex';
export default {
    name:"comment",
    props:[
        'task_id',
        'documents'
    ],
    components:{
        VueEditor,
        CommentDetail
    },
    computed:{
        ...mapGetters({
            user:'auth/user'
        })
    },
    mounted(){
        this.axios.get(`/getCommentByTaskID/`+this.task_id)
        .then(val=>{
            if(val.data.data.length > 0){
                this.comments = val.data.data
                
            }
        })
    },
    data(){
        return{
            content: "",
            files: [],
            comments:[],
            documentInComment:[]
        }
    },
    methods:{
         formatName(name){
                let fullname = name.split(' ')
                let initials = fullname.shift().charAt(0) + fullname.pop().charAt(0);
                return initials.toUpperCase();
            },
        sendComment(){
            this.axios.post('/comments',{
                'content': this.content,
                'task_id': this.task_id
            })
            .then(val=>{
                if(val.data.data){
                    this.submitFiles(val.data.data)
                    let data = val.data.data;
                    data['user_name'] = this.user.name
                    this.comments.push(data);

                }
                else{
                    (val.data.message)
                }
            })
        },

        // Upload multiple file
        submitFiles(comment){
            /*
            Initialize the form data
            */
            let formData = new FormData();
            formData.append('comment_id', comment.id);
            /*
            Iteate over any file sent over appending the files
            to the form data.
            */
            for( var i = 0; i < this.files.length; i++ ){
                let file = this.files[i];
                formData.append('files[' + i + ']', file);
            }
            /*
            Make the request to the POST /multiple-files URL
            */
            this.axios.post( '/uploadFiles',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(()=>{
                ('SUCCESS!!');
            })
            .catch(()=>{
                ('FAILURE!!');
            });
        },
        /*
            Handles a change on the file upload
        */
        handleFilesUpload(){
            // this.files = this.$refs.files.files;
            let uploadedFiles = this.$refs.files.files;
            /*
                Adds the uploaded file to the files array
            */
            for( var i = 0; i < uploadedFiles.length; i++ ){
                this.files.push( uploadedFiles[i] );
            }
        },
        addFiles(){
            this.$refs.files.click();
        },
        removeFile( key ){
            this.files.splice( key, 1 );
        }
    }
}
</script>

<style scoped>
.send-comment{
    position: absolute;
    bottom: 1em;
}
input[type="file"]{
    position: absolute;
    top: -500px;
}
div.file-listing{
    width: 100%;
}
span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
}
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