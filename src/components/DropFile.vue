<template>
  <div>
      <label for="form5" class="">
        {{ $t('message.upload.image_label', {'nb': nbFilesAccepted}) }}
        <span id="message-image" style="">{{ $t('message.upload.image_label_error') }}</span>
      </label>
      <div class="main">
        <div
          :style="isDragging && 'border-color: green;'"
          class="dropzone-container"
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
          style="overflow: auto;"
        >
          <div v-if="!uploadDone && hotFilesUploadCount != 0" style="position: relative;top: 0;left: 0;background-color: transparent;width: 100%;min-height: 300px;margin-top: -4rem;border-radius: 10px;">
            <h2 style="color: #000;padding: 10px;">{{$t('message.loading')}}</h2>
            <div style="text-align: center;width: 100%;margin-top: 0px;">
                <img class="m-auto" src="/site_images/index_loader.gif" style="width: 50px;margin-top: 0px;border-radius: 10%;">
            </div>
          </div>
          <input
            type="file"
            multiple
            name="file"
            id="fileInput"
            class="hidden-input"
            @change="onChange"
            ref="file"
            accept=".jpg,.jpeg,.png"
          />
          <!-- {{ current_image.width }}
          {{ imageLoaded }}
          {{ uploadDone }} -->
          <!-- {{$store.state.flag}}
          <div v-html="$store.state.flag"></div> -->
          <label for="fileInput" class="file-label">
            <!-- <div v-if="isDragging">Release to drop files here.</div>
            <div v-else>Drop files here or <u>click here</u> to upload.</div> -->
            <i class="fa fa-cloud-upload"></i>
          </label>
          <div class="preview-container mt-4" v-if="files.length" style="display: inline-flex;">
            <div v-for="file in files" :key="file.name" class="preview-card">
              <div>
                <img class="preview-img" :src="file.name.includes('/')?file.name:generateURL(file)" />
                <!-- <p>
                  {{ file.name }}
                  {{ Math.round(file.size / 1000) + "kb" }}
                </p> -->
              </div>
              <div>
                <button
                  class="ml-2"
                  type="button"
                  @click="remove(files.indexOf(file))"
                  title="Remove file"
                >
                  <i class="fa fa-trash-o fa-2x" style="color: #ca1f1f;"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Compressor from 'compressorjs';
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from '../stores'

import axios from 'axios';

import '../assets/dropfile.css'

export default {
  emits: ['filesUploaded'],
  props: {
    files: {
      type: Array,
      default: []
    },
    files_uploaded_response: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: "product_images"
    }
  },
  data() {
    return {
      isDragging: false,
      imageLoaded: false,
      maxFilesReached: false,
      //files_uploaded_response: [],
      current_image:{
        size:'',
        height:'',
        width:''
      },
      hotFilesUploadCount: 0,
      nbFilesAccepted: 0,
      isLoading: false,
    };
  },
  computed: {
      ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'uploadDone']),
  },
  mounted(){
    this.isoToEmoji('tg')
    //console.log(this.isoToEmoji('tg'))
    this.files.forEach((val, index) => {
      console.log('this.here')
        this.files_uploaded_response.push(val.name)
    })
    console.log('this.files_uploaded_response', this.files.length, this.files)
    if (this.isLoggedIn) {
        this.getSettings()
    }
  },
  methods: {
    ...mapActions(useStore, ['isoToEmoji', 'showMessage']),
    getSettings(){
        let type = 'nb_files_product'
        if (this.type == 'shipping_images') {
          type = 'nb_files_shipping'
        }
        this.isLoading = true
        axios.get('/get-settings')
          .then(res => {
            this.isLoading = false
            //console.log('res.data.settings', res.data.settings)
            res.data.settings.forEach((val, index)=>{
              if (val.name == type) {
                this.nbFilesAccepted = val.value
              }
            })
          })
          .catch(error => {
            this.isLoading = false
          });
    },
    loadImageWidthHeight(file_select) {
      this.imageLoaded = false;
      if(!file_select || file_select.type.indexOf('image/') !== 0) return;

      this.current_image.size = file_select.size;
            
      let reader = new FileReader();
      
      reader.readAsDataURL(file_select);
      reader.onload = evt => {
        let img = new Image();
        img.onload = () => {
          this.current_image.width = img.width;
          this.current_image.height = img.height;
          this.imageLoaded = true;
          this.uploadOneFile(file_select)
        }
        img.src = evt.target.result;
      }
      reader.onerror = evt => {
        console.error(evt);
      }
    },
    onChange() {
      const self = this;
      if (self.files.length == self.nbFilesAccepted) {
        self.$functions.msg_box(self, 'error', self.$t('message.info'), self.$t('message.publishForm.limit_reached'))
        return
      }
      let incomingFiles = Array.from(this.$refs.file.files);
      const fileExist = self.files.some((r) =>
        incomingFiles.some(
          (file) => file.name === r.name && file.size === r.size
        )
      );
      if (fileExist) {
        self.$functions.msg_box(self, 'error', self.$t('message.info'), self.$t('message.publishForm.image_exists'))
        return
      }
      let res = self.nbFilesAccepted - self.files.length
      if (res < incomingFiles.length) {
        self.maxFilesReached = true
        let tab = []
        for (var i = 0; i < res; i++) {
          tab.push(incomingFiles[i])
        }
        incomingFiles = tab
      }
      this.hotFilesUploadCount = incomingFiles.length;
      this.uploadDone = false;
      incomingFiles.some(
          (file) => {
            //console.log('incomingFiles', file)
            if (
              file.type.toLowerCase() != "image/jpg" &&
              file.type.toLowerCase() != "image/jpeg" &&
              file.type.toLowerCase() != "image/png" && 
              file.type.toLowerCase() != "image/webp"
            ) {
              self.$functions.msg_box(self, 'error', self.$t('message.info'), self.$t('message.publishForm.only_jpg_jpeg_png_webp_accepted'))
              return
            }
            console.log('self.image', self.current_image)
            self.loadImageWidthHeight(file)
          }
      )
      //self.files.push(...incomingFiles);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
      this.files_uploaded_response.splice(i, 1);
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
    uploadFiles() {
      const files = this.files;
      const formData = new FormData();
      files.forEach((file) => {
          formData.append("selectedFiles", file);
      });

      axios({
          method: "POST",
          url: "/file-store",
          data: formData,
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
    },
    uploadOneFile(file) {
      const self = this;
      if (!self.isLessThan0_5MB(file) || self.current_image.width > 1000) {
        let width = self.current_image.width
        let quality = 0.6
        if (width > 1000) {
          width = 1000
        }
        if (self.current_image.width > 1000 && self.isLessThan0_5MB(file)) {
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

            axios({
                method: "POST",
                url: "/file-store",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(resp => {
              console.log('success if', resp.data)
              self.files_uploaded_response.push(resp.data.name)
              //respd.data.data
              self.files.push(file);
              self.hotFilesUploadCount--
              if (self.hotFilesUploadCount == 0) {
                self.uploadDone = true
              }
              if (self.maxFilesReached) {
                self.maxFilesReached = false
                self.$functions.msg_box(self, 'error', self.$t('message.info'), self.$t('message.publishForm.max_files_reached', {'nb': this.nbFilesAccepted}))
              }
              self.$emit('filesUploaded', self.files_uploaded_response)
            }).catch(error => {
              self.showMessage({message: self.$t('message.an_error_occured'), confirm_func: self.$confirm})
            });
          },
          error(err) {
            console.log(err.message);
          },
        });
      }else{
        const formData = new FormData();
        formData.append("selectedFiles", file);

        axios({
            method: "POST",
            url: "/file-store",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(resp => {
          //respd.data.data
          console.log('success else', resp.data)
          self.files_uploaded_response.push(resp.data.name)
          self.files.push(file);
          self.hotFilesUploadCount--
          if (self.hotFilesUploadCount == 0) {
            self.uploadDone = true
          }
          if (self.maxFilesReached) {
            self.maxFilesReached = false
            self.showMessage({message: self.nbFilesAccepted+' '+self.$t('message.max_files_reached'), confirm_func: self.$confirm})
          }
          self.$emit('filesUploaded', self.files_uploaded_response)
        }).catch(error => {
            self.showMessage({message: self.$t('message.an_error_occured'), confirm_func: self.$confirm})
        });
      }
    },
    isLessThan2MB(file){
      return file.size / 1024 / 1024 < 2
    },
    isLessThan1MB(file){
      return file.size / 1024 / 1024 < 1
    },
    isLessThan0_5MB(file){
      return file.size / 1024 / 1024 < 0.5
    },
  },
  watch: {
    isLoggedIn(newVal, oldVal){
      if (newVal == true) {
        this.getSettings()
      }
    }
  }
};
</script>
<style scoped>
    
</style>