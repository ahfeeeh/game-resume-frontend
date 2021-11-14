<template>
<div class="container py-4" style="margin-top:50px">
    <div class="home">
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content">
        <h1>This is a Modal Header</h1>
        <p>This is a modal message</p>
      </div>
    </Modal>
    <button @click="toggleModal" type="button">Open Modal</button>
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
 * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Karla", sans-serif;
}
 button {
	padding: 20px 30px;
	border: none;
	font-size: 16px;
	background-color: crimson;
	color: #fff;
	cursor: pointer;
}
 
.home {
	/*background-color: rgba(0, 176, 234, 0.5);*/
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
 
</style>