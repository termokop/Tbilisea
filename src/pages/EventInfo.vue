<template>
  <q-page class="flex flex-center">
    <div class="event_div" v-if="showContent">
      <div class="picture">
        <img
          alt="Event logo"
          :src="event.picture"
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="event-info">
        <div class="date_place">
          <div>{{ event.date }}</div>
          <div>
            <a :href="event.place_link" target="_blank"><span class="material-icons">location_on</span> {{ event.place_name }}</a>
          </div>
        </div>

        <p class="description">{{ event.description_en }}</p>
      </div>

      <div class="price">Price: {{ event.price }} GEL</div>

      <div v-if="isUserLogined.check === false">
        <p>For buy the ticket you need to login and varify your account</p>
        <div class="btns">
          <q-item
            clickable
            v-ripple
            class="btn-buy-ticket"
            @click="showLoginForm = !showLoginForm"
          >
            <q-item-section> Login </q-item-section>
          </q-item>
        </div>
      </div>
      <div class="btns" v-else-if="isUserLogined.status === 'done'">
        <q-item clickable v-ripple class="btn-buy-ticket" @click="buy_ticket">
          <q-item-section avatar>
            <svg
              xml:space="preserve"
              viewBox="0 0 100 100"
              y="0px"
              x="0px"
              width="60px"
              height="60px"
              style="
                width: 100%;
                height: 100%;
                background-size: initial;
                background-repeat-y: initial;
                background-repeat-x: initial;
                background-position-y: initial;
                background-position-x: initial;
                background-origin: initial;
                background-image: initial;
                background-color: transparent;
                background-clip: initial;
                background-attachment: initial;
                animation-play-state: running;
              "
            >
              <g
                class="ldl-scale"
                style="
                  transform-origin: 50% 50%;
                  transform: rotate(0deg) scale(0.8, 0.8);
                  animation-play-state: running;
                "
              >
                <path
                  d="M91,41.8l-7.9-7.9c-4.4,4.3-11.6,4.3-16-0.1s-4.4-11.5-0.1-16l-7.9-7.9L44,25l31.9,31.9L91,41.8z"
                  stroke-miterlimit="10"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="3.5"
                  stroke="#333333"
                  fill="#F4E6C8"
                  style="
                    stroke: rgb(51, 51, 51);
                    fill: rgb(244, 230, 200);
                    animation-play-state: running;
                  "
                ></path>
                <g style="animation-play-state: running">
                  <path
                    d="M44,25l-35,35l7.9,7.9c4.4-4.3,11.6-4.3,16,0.1s4.4,11.5,0.1,16l7.9,7.9l35-35L44,25z"
                    stroke-miterlimit="10"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="3.5"
                    stroke="#333333"
                    fill="#F5E169"
                    style="
                      stroke: rgb(51, 51, 51);
                      fill: rgb(245, 225, 105);
                      animation-play-state: running;
                    "
                  ></path>
                  <polygon
                    points="52.8,48.1 50.6,54.4 54.6,59.7 48,59.6 44.1,65 42.2,58.7 35.8,56.7 41.2,52.9 41.2,46.3 46.5,50.2"
                    stroke-miterlimit="10"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="3.5"
                    stroke="#333333"
                    fill="#F7B26A"
                    style="
                      stroke: rgb(51, 51, 51);
                      fill: rgb(247, 178, 106);
                      animation-play-state: running;
                    "
                  ></polygon>
                </g>
              </g>
            </svg>
          </q-item-section>
          <q-item-section> BUY TICKET </q-item-section>
        </q-item>
      </div>

      <div class="toVarification" v-else>
        <p>
          You can varify in
          <q-item class="linkToMyProf" clickable v-ripple to="/profile"
            >My profile</q-item
          >
        </p>
      </div>
    </div>

    <LoginRegistrForm
      v-if="showLoginForm"
      @closeLoginRegForm="showLoginForm = false"
    ></LoginRegistrForm>
  </q-page>
  <v-loader :visible="visible"></v-loader>
</template>

<script>
import { isUserLogined } from "src/js/auth";
import { defineComponent } from "vue";
import LoginRegistrForm from "../components/LoginRegistrForm.vue";
import vLoader from "src/components/vLoader.vue";

export default defineComponent({
  name: "IndexPage",
  components: { LoginRegistrForm, vLoader },
  data() {
    return {
      visible: false,
      showContent: false,
      isUserLogined,
      showLoginForm: false,
      loggined: false,
      event: {},
    };
  },
  methods: {
    login() {
      this.loggined = true;
    },
    async loadEventInfo(id) {
      const url = "https://www.ukrge.site/tbilisea/API/get_event_info.php";
      const json = JSON.stringify({ id: id });
      try {
        this.visible = true;
        this.showContent = false;
        let response = await fetch(url, {
          method: "POST",
          body: json,
        });
        let result = await response.json();
        console.log(result);
        if (result.eventInfo.id) {
          this.event = result.eventInfo;
        } else alert("This event has been expired");
      } catch (error) {
        //console.log(error)
        alert("Something wrong...");
      } finally {
        setTimeout(() => {
              this.visible = false
              this.showContent = true
            }, 1000)
      }
    },
  },
  created() {
    this.loadEventInfo(this.$route.query.event);
  },
});
</script>

<style scoped lang="scss">
.event_div {
  width: 90%;
  max-width: 800px;
}

.event-info,
.btns,
.picture {
  margin: 0;
  width: fit-content;
}

p {
  width: fit-content;
  margin: auto;
}

.date_place {
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: gray;
  font-size: 25px;
}

.description {
  color: white;
  font-size: large;
}

.event-info,
.btns {
  margin: 0 auto 50px auto;
}

.btn-buy-ticket {
  background-color: $primary;
  font-size: 30px;
  border-radius: 15px;
}

.toVarification p {
  display: flex;
}

.linkToMyProf {
  margin: 0 0 0 6px;
  padding: 0;
  color: purple;
  height: fit-content;
}

a {
  text-decoration: none;
}
</style>
