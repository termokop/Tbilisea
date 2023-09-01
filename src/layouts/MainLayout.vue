<template>
  <q-layout view="hHh lpR fFf" style="background-color: #1d1d1d">
    <q-header elevated class="bg_header text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="title">
          <img src="../assets/logo1.png" style="width: 80px" />
          <p style="margin: 0">TBILISEA</p>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <v-menu></v-menu>
    </q-drawer>

    <q-page-container class="bg-content" v-if="showContent">
      <router-view />
    </q-page-container>

    <v-loader :visible="visible"></v-loader>
  </q-layout>
</template>

<script>
import vMenu from "src/components/vMenu.vue";
import { isUserLogined, events } from "src/js/auth";
import vLoader from "src/components/vLoader.vue";

export default {
  data() {
    return {
      visible: false,
      showContent: false,
      leftDrawerOpen: false,
      isUserLogined,
    };
  },
  components: { vMenu, vLoader },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
  async created() {
    this.visible = true;
    this.showContent = false;
    if (localStorage.getItem("jwt")) {
      const url = "https://www.ukrge.site/tbilisea/API/validate_token.php";
      const json = JSON.stringify({
        jwt: localStorage.getItem("jwt"),
      });
      console.log("JSON is here", json);
      try {
        let response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: json,
        });
        let result = await response.json();
        const user = result;
        if (user.data.email) {
          localStorage.setItem("email", user.data.email);
          localStorage.setItem("status", user.data.status);
          this.isUserLogined.check = true;
          this.isUserLogined.status = user.data.status;
        } else {
          localStorage.clear();
        }
      } catch (error) {
        console.log("error", error);
      }
    }

    const url = "https://www.ukrge.site/tbilisea/API/get_events_list.php";
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      let result = await response.json();
      console.log(result);
      events.list = result.list;
    } catch (error) {
      console.log("error", error);
    } finally {
      setTimeout(() => {
        this.visible = false;
        this.showContent = true;
      }, 1000);
    }
  },
};
</script>

<style>
@font-face {
  font-family: "BarbTwistedBlocks";
  src: url("barbtwistedblocks_-webfont.woff") format("woff"),
    url("BarbTwistedBlocks.otf") format("opentype");
}

.bg_header {
  background: linear-gradient(to left, rgb(73, 3, 97), rgb(13, 17, 119));
}

.bg-content {
  background-image: url(../assets/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: #1d1d1d; */
  color: white;
}

.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "BarbTwistedBlocks", Arial, sans-serif;
  font-style: italic;
  font-weight: bolder;
  font-size: 50px;
  width: fit-content;
  margin: auto;

  background: linear-gradient(
    to bottom,
    rgba(181, 245, 4, 0.83),
    rgba(20, 225, 9, 0.805)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
