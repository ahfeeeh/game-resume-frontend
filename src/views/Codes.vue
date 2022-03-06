<template>
  <div class="container py-4" style="margin-top:50px">
  <div class="about">
    <h1>Codes</h1>
  <quill-editor theme="snow" toolbar="full" :content="content" contentType="html"></quill-editor>
  </div>
</div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// import '@vueup/vue-quill/dist/vue-quill.bubble.css';

export default {    
    
  components: {
QuillEditor
  },
  data(){
      return {content: "<h1>Some initial content</h1>" }
  }
}
</script>

<style>

</style>