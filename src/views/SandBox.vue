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
  name: "Home",
  components: {
    Modal,
  },
  setup() {
    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    return { modalActive, toggleModal };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Karla:wght@300;400&display=swap");
/* * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Karla", sans-serif;
}*/
/* button {
	padding: 20px 30px;
	border: none;
	font-size: 16px;
	background-color: crimson;
	color: #fff;
	cursor: pointer;
}*/
 /*
.home {
	background-color: rgba(0, 176, 234, 0.5);
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
 .home .modal-content {
	display: flex;
	flex-direction: column;
}
 .home .modal-content h1, .home .modal-content p {
	margin-bottom: 16px;
}
 .home .modal-content h1 {
	font-size: 32px;
}
 .home .modal-content p {
	font-size: 18px;
}
 */
</style>