<template>
<div class="container py-4" style="margin-top:50px">
    <div class="home">
    <Modal @close="toggleModal" :modalActive="modalActive">
        <template v-slot:modal-header>
            Título da página
        </template>
      
       
        <template v-slot:modal-content>            
            <div class="input-group mb-3  input-group-md">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">ID</span>
                </div>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
            </div>
            <div class="input-group mb-3  input-group-md">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Title</span>
                </div>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
            </div>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Finished?">
            </div>

            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Fisical Disc?">
            </div>
        </template>
      

        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary">Save changes</button>
        </template>
      

    </Modal>
    <button @click="toggleModal" type="button" class="btn btn-primary">Open Modal</button>
  </div>
</div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
export default {
  name: "SandBox",
  components: {
    Modal,
  },
  setup() {
    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    return { modalActive, toggleModal };
  }
};
</script>

<style scoped>

</style>