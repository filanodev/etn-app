<template>
    <div>
        <div id="addresses-panel" class="menu menu-box-modal rounded-m menu-active" data-menu-height="310" data-menu-width="350" style="display: block; width: 95%; height: 410px;">
            <div class="menu-title">
                <h1>{{$t('message.side_menu.addresses')}}</h1>
                <a class="close-menu" @click="$hide_modal.all" style="float: right;">
                    <svg class="tw:ml-[10px] tw:align-[sub!important] tw:inline" width="20px" height="20px" viewBox="0 0 75.80 75.80" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.00075803"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.27409"> <g id="Group_64" data-name="Group 64" transform="translate(-624.082 -383.588)"> <path id="Path_56" data-name="Path 56" d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z" fill="#a63289"></path> </g> </g><g id="SVGRepo_iconCarrier"> <g id="Group_64" data-name="Group 64" transform="translate(-624.082 -383.588)"> <path id="Path_56" data-name="Path 56" d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z" fill="#a63289"></path> </g> </g></svg>
                </a>
            </div>
            <div class="content">
                <h2 class="font-14 color-piketplace">{{$t('message.product_address')}}</h2>
                <a v-if="line_order && line_order.product">
                    <a class="font-14 shadow-l btn-full rounded-s font-600 text-start mb-2 btn-dark-piketplace-outline pe-2 ps-2">
                        <div>
                            <span class="ms-n2">{{$t('message.address.country_name')}}:</span>
                            <span class="float-end me-n1">{{line_order.product.country.name}}</span>
                        </div>
                        <div>
                            <span class="ms-n2">{{$t('message.address.city')}}:</span>
                            <span class="float-end me-n1">{{line_order.product.city}}</span>
                        </div>
                        <div>
                            <span class="ms-n2">{{$t('message.address.address')}}:</span>
                            <span class="float-end me-n1">{{line_order.product.address}}</span>
                        </div>
                    </a>
                </a>
                <div v-if="line_order && !line_order.noshipping && line_order.order.shipping">
                    <h2 class="font-14 color-piketplace">{{$t('message.address.shipping_address')}}</h2>
                    <a class="font-14 shadow-l btn-full rounded-s font-600 text-start mb-2 btn-dark-piketplace pe-2 ps-2">
                        <div>
                            <span class="ms-n2">{{$t('message.address.name')}}:</span>
                            <span class="float-end me-n1">{{line_order.order.shipping.name}}</span>
                        </div>
                        <div>
                            <span class="ms-n2">{{$t('message.address.country_name')}}:</span>
                            <span class="float-end me-n1">{{line_order.order.shipping.country_name}}</span>
                        </div>
                        <div>
                            <span class="ms-n2">{{$t('message.address.city')}}:</span>
                            <span class="float-end me-n1">{{line_order.order.shipping.city}}</span>
                        </div>
                        <div>
                            <span class="ms-n2">{{$t('message.address.address')}}:</span>
                            <span class="float-end me-n1">{{line_order.order.shipping.address}}</span>
                        </div>
                        <div>
                            <span class="ms-n2">{{$t('message.address.phone_number')}}:</span>
                            <span class="float-end me-n1">{{line_order.order.shipping.phone_number}}</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div id="show-image-modal" class="rounded-m content menu menu-box-bottom rounded-m" data-menu-effect="menu-over" style="display: block; height: 100%;width: 100%;margin: auto;">
            <a class="close-menu" @click="$hide_modal.all" style="float: right;">
                <i class="fa fa-times-circle color-red-dark fa-2x"></i>
            </a>
            <img style="width: 100%;height: 97%;object-fit: contain;" :src="selected_image_src">
        </div>
        <div id="show-selected-image-modal" class="rounded-m content menu menu-box-bottom rounded-m" data-menu-effect="menu-over" style="display: block; height: 80%;width: 100%;margin: auto;">
            <a class="close-menu" @click="$hide_modal.all" style="float: right;">
                <i class="fa fa-times-circle color-red-dark fa-2x"></i>
            </a>
            <img style="width: 100%;height: 80%;object-fit: contain;" :src="url">
            <div style="text-align: center;padding-top: 10px">
                <button :disabled="isSendFile" @click="sendFile" class="btn btn-dark-piketplace">
                    {{$t('message.send')}} &nbsp;
                    <i class="fa fa-send pt-2"></i>
                </button>
            </div>
        </div>
        <div>
            <div class="header header-fixed header-logo-center" style="opacity: 1;background-color: white;">
                <a class="header-icon header-icon-1" style="width: 250px;text-align: left;white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;">
                    <div @click="$router.go(-1)" style="width: 10%;display: inline-block;text-align: left;" class="">
                        <span style="vertical-align: sub;">
                            <svg class="tw:ml-[10px] tw:align-[sub!important] tw:inline" width="20px" height="20px" viewBox="0 0 75.80 75.80" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.00075803"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.27409"> <g id="Group_64" data-name="Group 64" transform="translate(-624.082 -383.588)"> <path id="Path_56" data-name="Path 56" d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z" fill="#a63289"></path> </g> </g><g id="SVGRepo_iconCarrier"> <g id="Group_64" data-name="Group 64" transform="translate(-624.082 -383.588)"> <path id="Path_56" data-name="Path 56" d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z" fill="#a63289"></path> </g> </g></svg>
                        </span>
                    </div>
                    &nbsp;<img v-if="corresponding_user!==null && corresponding_user.avatar" :src="corresponding_user.avatar" class="tw:inline" style="width: 20px;height: 20px;border-radius: 50%;object-fit: cover;">&nbsp;&nbsp;<strong class="font-18 tw:inline" v-if="corresponding_user!==null">{{corresponding_user.shopNameShow}}<svg v-if="line_order!==null && corresponding_id==line_order.product.user.id" class="tw:inline" width="20px" height="20px" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg" fill="#a63289"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>store</title> <g id="store-Filled"> <path id="store-Filled-2" data-name="store-Filled" class="cls-1" d="M20.5,18A3.5,3.5,0,0,1,17,21.5H14.53V19a2.5,2.5,0,0,0-5,0v2.5H7A3.5,3.5,0,0,1,3.5,18V13.35A5.634,5.634,0,0,0,5.99,14,4.409,4.409,0,0,0,9,12.78a4.3,4.3,0,0,0,6,0A4.409,4.409,0,0,0,18.01,14a5.634,5.634,0,0,0,2.49-.65Zm.974-9.158L20.386,5.577A4.494,4.494,0,0,0,16.117,2.5H7.883A4.494,4.494,0,0,0,3.614,5.577L2.526,8.842A.5.5,0,0,0,2.5,9a3.5,3.5,0,0,0,3.49,3.5A3.853,3.853,0,0,0,9,11.034a3.809,3.809,0,0,0,6.006,0A3.854,3.854,0,0,0,18.01,12.5,3.5,3.5,0,0,0,21.5,9,.5.5,0,0,0,21.474,8.842Z"></path> </g> </g></svg></strong>
                </a>
                <span v-if="line_order" @click="$show_modal.show_modal({id: 'addresses-panel'})" class="header-icon header-icon-5" style="height: 100%;">
                    <span class="fa-stack fa-lg">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-address-card-o fa-stack-1x fa-inverse color-piketplace"></i>
                    </span>
                </span>
            </div>
        </div>
        <div id="footer-bar" class="d-flex" style="bottom: 10px;">
            <div class="me-3 speach-icon" @click="trigger_upload">
                <a data-menu="menu-upload" class="bg-gray-dark ms-2"><i class="fa fa-file-image-o pt-2"></i></a>
                <input id="file" type="file" ref="message_file" name="" style="display: none;" accept="image/png, image/jpeg, image/jpg, image/gif" @change="load_file">
            </div>
            <i v-if="newMessages.length>0" style="width: 20px;height: 20px;border-radius: 50%;color: #fff;background-color: red;margin-top: -8px;">{{newMessages.length}}</i>
            <div class="flex-fill speach-input">
                <input id="message" type="text" class="form-control" :placeholder="$t('message.support_chat.enter_message')" v-model="form.message" @input="clearRequired()">
            </div>
            <div class="ms-3 speach-icon" style="margin-top: 7px;">
                <button :disabled="isSendingMessage" @click="send" class="btn btn-dark-piketplace me-2" style="border-radius: 50%;">
                    <i class="fa fa-send pt-2"></i>
                </button>
            </div>
        </div>
        <div class="page-content">
            <div class="content mt-0 mb-n5">
                <div v-observe-visibility="handleScrolledToTop">
                    <img v-if="isLoading" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="loader rounded-sm img-fluid" style="display: block;">
                    <div v-if="noMoreData" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                        {{$t('message.no_more_data')}}
                    </div>
                </div>
                <div v-for="(message, i) in oldMessages.slice().reverse()">
                    <MessageLine @click="showImage(message)" :message="message" />
                </div>
                <div v-for="(message, i) in messages.slice().reverse()">
                    <MessageLine @click="showImage(message)" :message="message" />
                </div>
                <div style="text-align: center;">
                    <span v-if="newMessages.length>0 && newMessages[0].sender_id!=user.id">
                        {{$tc('message.support_chat.nb_new_messages',newMessages.length)}}
                    </span>
                </div>
                <div v-if="newMessages.length>0" v-for="(message, i) in newMessages.slice().reverse()">
                    <MessageLine @click="showImage(message)" :message="message" />
                </div>
                <div v-observe-visibility="handleScrolledToBottom">
                </div>
            </div>
            <!-- <div v-if="isLoading" style="position: absolute;top: 0;left: 0;background-color: rgba(0,0,0,0.6);width: 100%;min-height: 900px;">
                <div style="text-align: center;width: 100%;margin-top: 50px;">
                    <img src="/site_images/transparent-gif/loading3.gif" style="width: 200px;margin-top: 20px;border-radius: 20%;">
                </div>
                <div style="text-align: center;width: 100%;margin-top: 10px;">
                    <i class="fa fa-undo fa-2x" style="color: #fff"></i>
                </div>
            </div> -->
        </div>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import Compressor from 'compressorjs';
    import MessageLine from '../components/MessageLine.vue';

    export default{
        name: "Message",
        components: {
            MessageLine
        },
        data: () => ({
            //user: null,
            corresponding_id: null,
            line_order_id: null,
            line_order: null,
            corresponding_user: null,
            messages: [],
            newMessages: [],
            oldMessages: [],
            form: {
                message: "",
                file: null,
            },
            isLoading: false,
            isSendingMessage: false,
            noMoreData: false,
            updateNewMessage: null,
            first_open: true,
            nb_at_bottom: 0,
            nb_at_top: 0,

            start_message_id: 0,
            end_message_id: 0,
            url: '',
            current_file: {},
            isSendFile: false,
            selected_image_src: '',
            isLoading: false,
        }),
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'header_type', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isOpenLoading', 'connecting']),
        },
        created () {
            this.updateFunction();
        },
        beforeUnmount () {
            clearInterval(this.updateNewMessage);//Break the setInterval
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        async mounted(){
            //this.$hide_modal.hide_modal('menu-main');
            this.$hide_modal.all();
            this.header_type = "no_header"
            this.corresponding_id = this.$route.params.corresponding_id;
            this.line_order_id = this.$route.params.line_order_id;
            
            await this.getMessages()

            window.scrollTo({ top: 0, behavior: `${'smooth'}` });
        },
        methods: {
            clearRequired(){
                $('#message').css('cssText', 'border-color:rgba(0,0,0,.08)!important' )
            },
            trigger_upload(){
                //this.url = ''
                this.$refs.message_file.value = null;
                $('#file').trigger('click')
            },
            showImage(message){
                if (message.isImage) {
                    this.selected_image_src = JSON.parse(message.message)[0].lien
                    this.$show_modal.show_modal({'id': 'show-image-modal'})
                }
            },
            loadImageWidthHeight(file_select) {
              this.imageLoaded = false;
              if(!file_select || file_select.type.indexOf('image/') !== 0) return;

              this.current_file.size = file_select.size;
                    
              let reader = new FileReader();
              
              reader.readAsDataURL(file_select);
              reader.onload = evt => {
                let img = new Image();
                img.onload = () => {
                  this.current_file.width = img.width;
                  this.current_file.height = img.height;
                  this.imageLoaded = true;
                  this.compressFile(file_select)
                }
                img.src = evt.target.result;
              }
              reader.onerror = evt => {
                console.error(evt);
              }
            },
            compressFile(file_select){
                const self = this;
                  if (!self.$functions.isLessThan0_5MB(file) || self.current_file.width > 1000) {
                    let width = self.current_file.width
                    let quality = 0.6
                    if (width > 1000) {
                      width = 1000
                    }
                    if (self.current_file.width > 1000 && self.$functions.isLessThan0_5MB(file)) {
                      quality = 1
                    }
                    console.log('self.image params ', width, quality)
                    new Compressor(file, {
                      quality: quality,
                      width: width,
                      //height: 190,

                      // The compression process is asynchronous,
                      // which means you have to access the `result` in the `success` hook function.
                      success(result) {
                        console.log('compression result', result)
                        const formData = new FormData();
                        formData.append('selectedFiles', result, result.name);
                        self.file = result
                      },
                      error(err) {
                        console.log(err.message);
                      },
                    });
                  }
            },
            load_file(event){
                this.file = event.target.files[0]
                this.file = this.$refs.message_file.files[0];
                //this.$emit('update:modelValue', event.target.files[0])
                //console.log('update:modelValue', event.target.files[0])
                this.url = URL.createObjectURL(this.file);
                this.loadImageWidthHeight(this.file)
                //alert('load_file')
            },
            async getMessages(){
                //alert('getMessages')
                this.isLoading = true;
                let user_id = this.user.id
                let corresponding_id = this.corresponding_id
                let line_order_id = this.line_order_id
                let parameters = {user_id, corresponding_id, line_order_id}
                await axios.get(`/msg-order/messages`, {params: parameters})
                .then(res => {
                    console.log(' messages res.data', res.data)
                    this.isLoading = false;
                    this.messages = res.data.messages
                    this.line_order = res.data.line_order
                    //this.newMessages = res.data.les_new_messages
                    /*if ((this.start_message_id == 0 || this.end_message_id == 0) && this.messages.length>0) {
                        this.start_message_id = this.messages[this.messages.length-1].id
                        this.end_message_id = this.messages[0].id
                    }*/
                    this.updateStartEndMessagesIds()
                    //this.messages.push(...res.data.messages)
                    if (res.data.corresponding_user!=null) {
                        this.corresponding_user = res.data.corresponding_user
                        //this.$refs.header.setData({title: res.data.corresponding_user.fullnameOrUsername, route: this.prevRoute, img: this.corresponding_user.avatar});
                    }else{
                        //this.$refs.header.setData({title: "Support", route: this.prevRoute, img: "Piketplace.png"});
                    }
                    console.log("new_messages", this.newMessages);
                    console.log("old_messages", this.messages);
                    if (this.first_open || this.at_bottom) {
                        this.first_open = false;
                        setTimeout(function () {
                            window.scrollTo({ top: document.body.scrollHeight, behavior: `${'smooth'}` });
                        }, 100);
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                });
            },
            sendFile(){
                this.isSendFile = true
                this.send()
            },
            async send(){
                console.log(this.file)
                //alert('send')
                let receiver_id = this.corresponding_id
                let sender_id = this.user.id
                if (this.form.message=="" && !this.isSendFile) {
                    $('#message').css('cssText', 'border-color:red!important' )
                    //this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.support_chat.no_message_to_send'))
                    return 0;
                }

                //let isSupport = 1
                this.isLoading = true;
                this.isSendingMessage = true;
                let message = this.form.message
                await axios.post(`/msg-order/send-message`, {sender_id:sender_id, receiver_id:receiver_id, message:message, line_order_id:this.line_order_id, end_message_id:this.end_message_id, file:this.file}, {headers: {
                              "Content-Type": "multipart/form-data",
                          }})
                .then(res => {
                    this.isLoading = false;
                    this.isSendFile = false;
                    this.isSendingMessage = false;
                    this.file = null;
                    console.log("res messages", res.data);
                    this.$hide_modal.hide_modal('show-selected-image-modal')
                    if (res.data.status) {
                        this.form.message = ""
                        //this.messages.push(...res.data.messages)
                        /*this.messages = res.data.messages
                        this.newMessages = []
                        console.log("messages", this.messages);*/
                        res.data.newMessages.push(...this.newMessages)
                        this.newMessages = res.data.newMessages
                        this.updateStartEndMessagesIds()
                        setTimeout(function () {
                            window.scrollTo({ top: document.body.scrollHeight, behavior: `${'smooth'}` });
                        }, 100);
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t(res.data.message))
                    }
                })
                .catch(error => {
                    this.isSendFile = false;
                    this.isLoading = false;
                    this.isSendingMessage = false;
                    this.file = null;
                });
            },
            async getNewMessages(){
                let user_id = this.user.id
                let line_order_id = this.line_order_id
                let end_message_id = this.end_message_id
                let parameters = {user_id, end_message_id, line_order_id}
                let url = '/msg-order/new-messages'
                await axios.get(url, {params: parameters})
                .then(res => {
                    this.isLoading = false;
                    res.data.newMessages.push(...this.newMessages)
                    this.newMessages = res.data.newMessages
                    //this.newMessages.push(...res.data.messages)
                    this.updateStartEndMessagesIds()
                    console.log("new_messages", this.newMessages);
                    if (this.first_open || this.at_bottom) {
                        this.first_open = false;
                        //Scroll to bottom
                        /*setTimeout(function () {
                            window.scrollTo({ top: document.body.scrollHeight, behavior: `${'smooth'}` });
                        }, 100);*/
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                });
            },
            async getOldMessages(){
                //alert('getOldMessages')
                let user_id = this.user.id
                let line_order_id = this.line_order_id
                let url = '/msg-order/old-messages'
                let start_message_id = this.start_message_id
                let parameters = {user_id, line_order_id, start_message_id}
                this.isLoading = true;
                await axios.get(url, {params: parameters})
                .then(res => {
                    this.isLoading = false;
                    this.start_message_id = res.data.start_message_id;
                    console.log("oldMessages res.data.oldMessages", res.data.oldMessages);
                    this.oldMessages.push(...res.data.oldMessages)
                    if (res.data.oldMessages.length==0) {
                        this.noMoreData = true
                    }
                    this.updateStartEndMessagesIds()
                    console.log("oldMessages", this.oldMessages);
                    /*if (this.first_open || this.at_bottom) {
                        this.first_open = false;
                        setTimeout(function () {
                            window.scrollTo({ top: document.body.scrollHeight, behavior: `${'smooth'}` });
                        }, 100);
                    }*/
                })
                .catch(error => {
                    this.isLoading = false;
                });
            },
            updateFunction(){
                this.updateNewMessage = setInterval(() => {
                    //alert('update')
                    this.getNewMessages()
                }, 10000)
            },
            handleScrolledToBottom(isVisible){
                if (!isVisible) {
                    this.at_bottom = false
                }else{
                    this.at_bottom = true
                    this.nb_at_bottom++
                    if (this.nb_at_bottom == 2) {
                        this.newMessages.push(...this.messages)
                        this.messages = this.newMessages
                        this.newMessages = []
                        this.nb_at_bottom = 0
                    }
                }
            },
            handleScrolledToTop(isVisible){
                //alert(isVisible)
                if (isVisible && this.nb_at_top!=0) {
                    //alert('get old messages')
                    this.getOldMessages();
                }
                this.nb_at_top++
            },
            goBack() {
                // Go back one step in the browser history
                this.$router.back();
            },
            updateStartEndMessagesIds() {
                /*if ((this.start_message_id == 0 || this.end_message_id == 0) && this.messages.length>0) {
                    this.start_message_id = this.messages[this.messages.length-1].id
                    this.end_message_id = this.messages[0].id
                }*/
                if (this.oldMessages.length>0) {
                    this.start_message_id = this.oldMessages[this.oldMessages.length-1].id
                }else if(this.messages.length>0){
                    this.start_message_id = this.messages[this.messages.length-1].id
                }
                if (this.newMessages.length>0) {
                    this.end_message_id = this.newMessages[0].id
                }else if(this.messages.length>0){
                    this.end_message_id = this.messages[0].id
                }
                console.log('updateStartEndMessagesIds', this.start_message_id, this.end_message_id)
            }
        },
        watch: {
            url(newVal, oldVal){
                if (newVal!='') {
                    this.$show_modal.show_modal({'id': 'show-selected-image-modal'})
                }
            }
        }
    }
</script>

<style scoped>
</style>
