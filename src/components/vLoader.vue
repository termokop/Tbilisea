<template>
  <q-inner-loading :showing="visible" dark transition-duration="200">
    <img src="../assets/logo1.png" alt="" class="loading" />
    <!-- <q-spinner-gears color="primary" /> -->
  </q-inner-loading>
</template>

<script>
export default {
  name: "vLoader",
  props: {
    visible: {
      type: Boolean,
      requared: true,
    },
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  background-color: black;

}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -100px 0 0 -100px;
  width: 200px;
  animation: loading 1.5s infinite ease-in-out;
}



@keyframes loading {
  0% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  }


  50% {
    transform: perspective(1000px) rotateX(0deg) rotateY(-90deg);
  }

  100% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  }
}
</style>
