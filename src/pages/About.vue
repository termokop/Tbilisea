<template>
  <q-page class="flex flex-center">
    <div class="events">
      <div class="picture">
        <img
          alt="Quasar logo"
          src="https://media.istockphoto.com/id/1133362469/photo/im-having-the-best-time-with-you-guys.jpg?s=612x612&w=0&k=20&c=YyxE1HC7u9CipD6JZuyoIGAuY4cXvUNVATP2605zVDE="
        >
      </div>
      <div class="event-info">
        <p> We are super team who making the best events!!!</p>

      </div>
      <div class="btns">
        <q-btn color="primary" label="Contacts" @click="contacts = true" />
      </div>
    </div>

    <q-dialog v-model="contacts" >
      <q-card bordered class="card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Contact us:</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <vContacts></vContacts>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import vContacts from '../components/vContacts.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {vContacts},
  data() {
    return {
      contacts: false
    }
  },
  methods: {
    onClick() {
      alert("Logic for contact the team")
    }
  }
})
</script>


<style scoped>

.events {
  width: 100%;
}

.event-info, .btns, .picture {
  width: 100%;
  margin: auto;
  width: fit-content;
}

p {
  width: fit-content;
  margin: auto;
}

.card {
    border-radius: 30px;
    margin: 10px 0 0 0;
    background-color: #e9e9e9;
}

</style>
