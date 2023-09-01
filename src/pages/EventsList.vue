<template>
  <q-page class="flex flex-center">
    <div
      v-for="event in events"
      class="events_div"
      :key="event.id"
      @click="chooseEvent(event.id)"
    >
      <div class="picture">
        <img
          alt="Quasar logo"
          :src="event.picture"
          style="width: 100%; height: 300px"
        />
      </div>
      <div class="event-info">
        <p>{{ event.name }}</p>
        <p>{{ event.date }}</p>
      </div>
      <!-- <div class="btns">
        <q-btn color="primary" label="Buy ticket" @click="onClick" />
      </div> -->
    </div>
  </q-page>
</template>

<script>
import { events } from "src/js/auth";
import { defineComponent } from "vue";
import EventInfo from "./EventInfo.vue";

export default defineComponent({
  name: "IndexPage",
  components: [EventInfo],
  data() {
    return {
      events: events.list,
    };
  },
  methods: {
    chooseEvent(id) {
      this.$router.push({
        path: "/event",
        query: { event: id },
      });
    },
  },
});
</script>

<style scoped>
.events_div {
  width: 600px;
  border: 10px solid transparent;
}

.events_div:hover {
  background-color: #2d2d2d;
  border: 10px solid transparent;
  border-radius: 30px;
}

.event-info,
.btns,
.picture {
  margin: auto;
  width: fit-content;
}

p {
  width: fit-content;
  margin: auto;
  font-size: 20px;
}
</style>
