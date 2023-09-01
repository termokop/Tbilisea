<template>

  <q-scroll-area style="height: calc(100% - 295px); margin-top: 295px; background-color: #1d1d1d; color: white">
    <q-list padding>

      <q-item  clickable v-ripple v-if="isUserLogined.check === false" @click="showLoginFormMethod()">
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          Login
        </q-item-section>
      </q-item>


      <q-item clickable v-ripple to="/events">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            Events
          </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/profile" v-if="isUserLogined.check">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            My profile
          </q-item-section>
      </q-item>



        <q-item clickable v-ripple  to="/about">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            About us
          </q-item-section>
        </q-item>


        <q-item clickable v-ripple  @click="logout" v-if="isUserLogined.check">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            Logout
          </q-item-section>
        </q-item>


        <q-item>
          <q-item-section>
            <span class="q-mx-auto version"> TBILISEA<sup>&copy;</sup> </span>
          </q-item-section>
        </q-item>
    </q-list>


  </q-scroll-area>

  <q-img class="absolute-top" src="../assets/logo1.png" style="width: 100%; background-color: #1d1d1d;">
  </q-img>

<LoginRegistrForm v-if="showLoginForm" @closeLoginRegForm="showLoginForm=false"></LoginRegistrForm>

</template>


<script>

import { isUserLogined } from "src/js/auth";
import LoginRegistrForm from './LoginRegistrForm.vue'

export default {
  name: 'vDrawer',
  components: {LoginRegistrForm},
  data() {
    return {
      isUserLogined,
      showLoginForm: false,

    }
  },
  methods: {
    logout() {
      isUserLogined.check = false,
      localStorage.clear()
      this.$router.replace({
        path: '/'
      })
    },
    showLoginFormMethod() {
      this.showLoginForm = false;
      this.showLoginForm = true;
    }
  },

}

</script>
