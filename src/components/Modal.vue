<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">

          <div class="modal" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      <!-- Modal Title -->
                      <slot name="modal-header" />                    
                    </h5>
                    <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Modal Content -->
                    <slot name="modal-content" />                    
                  </div>
                  <div class="modal-footer">
                    <!-- Modal Footer --> 
                    <slot name="modal-footer" />                                       
                    <button @click="close" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>          
          
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["modalActive"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    return { close };
  },
};
</script>

<style scoped>
.modal-animation-enter-active, .modal-animation-leave-active {
	transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
 .modal-animation-enter-from, .modal-animation-leave-to {
	opacity: 0;
}
 .modal-animation-inner-enter-active {
	transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
 .modal-animation-inner-leave-active {
	transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
 .modal-animation-inner-enter-from {
	opacity: 0;
	transform: scale(0.8);
}
 .modal-animation-inner-leave-to {
	transform: scale(0.8);
}
 .modal {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(255, 255, 255, 0.7);
}
 .modal .modal-inner {
	position: relative;
	max-width: 640px;
	width: 80%;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	background-color: #fff;
	padding: 64px 16px;
}
 .modal .modal-inner i {
	position: absolute;
	top: 15px;
	right: 15px;
	font-size: 20px;
	cursor: pointer;
}
 .modal .modal-inner i:hover {
	/*color: crimson;*/
}
 .modal .modal-inner button {
	/*padding: 20px 30px;*/
	border: none;
	/*font-size: 16px;*/
	/*background-color: crimson;
	color: #fff;*/
	cursor: pointer;
}
 
</style>
