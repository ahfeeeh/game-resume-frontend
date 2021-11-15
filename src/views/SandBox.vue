<template>
<div class="container py-4" style="margin-top:50px">
    <div class="home">
    <Modal @close="toggleModalDelete" :modalActive="modalActiveDelete">
        <template v-slot:modal-header>
            Delete a Game
        </template>
      
       
        <template v-slot:modal-content>            
            <h2>Are you sure you want to remove this game?</h2>
        </template>
      

        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary">Delete Game</button>
        </template>
      

    </Modal>
        <Modal @close="toggleModalFinished" :modalActive="modalActiveFinished">
        <template v-slot:modal-header>
            Mark Game as Finished
        </template>
      
       
        <template v-slot:modal-content>            
            <h2>Are you sure you want to mark this game as finished?</h2>
        </template>
      

        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary">Mark as Finished</button>
        </template>
      

    </Modal>
    <button @click="toggleModalDelete" type="button" class="btn btn-primary">Open Modal Delete</button>
    <button @click="toggleModalFinished" type="button" class="btn btn-primary">Open Modal Finished</button>
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
    const modalActiveDelete = ref(false);
    const modalActiveFinished = ref(false);

    const toggleModalDelete = () => {
      modalActiveDelete.value = !modalActiveDelete.value;
    };
    const toggleModalFinished = () => {
      modalActiveFinished.value = !modalActiveFinished.value;
    };

    return { modalActiveDelete,modalActiveFinished, toggleModalDelete,toggleModalFinished };
  }
};
</script>

<style scoped>

</style>