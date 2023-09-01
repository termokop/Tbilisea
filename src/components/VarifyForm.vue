<template>
  <!-- varify form -->
  <q-dialog v-model="showVarifyForm" v-if="showVarifyForm">
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-input
          outlined
          v-model="firstName"
          label="First name"
          dence
          class="spaces"
        />

        <q-input
          v-model="lastName"
          outlined
          label="Last name"
          dence
          class="spaces"
        >
        </q-input>

        <q-input
          v-model="dateOFBirth"
          outlined
          type="date"
          label="Date of Birth"
          class="spaces"
        />

        <q-input
          v-model="phone_number"
          mask="(###) ### - ####"
          type="tel"
          outlined
          label="Phone Number"
          dence
          class="spaces"
        >
        </q-input>

        <q-input
          v-model="passport_info_id"
          outlined
          label="ID or Passport Number"
          dence
          class="spaces"
        >
        </q-input>

        <q-input
          v-model="url_for_soc_media"
          type="url"
          outlined
          label="Public Facebook or Instagram profile URL"
          dence
          class="spaces"
        >
        </q-input>

        <q-btn
          style="background: green; width: 100%; font-size: medium"
          glossy
          label="Varify account"
          @click="sendVarifyInfo()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "vVarifyForm",
  emits: ["closeVarifyForm"],
  data() {
    return {
      showVarifyForm: true,
      firstName: "",
      lastName: "",
      dateOFBirth: "",
      phone_number: "",
      passport_info_id: "",
      url_for_soc_media: "",
    };
  },
  methods: {
    async sendVarifyInfo() {
      let varification_info = {
        userInfo: {
          firstName: this.firstName,
          lastName: this.lastName,
          dateOFBirth: this.dateOFBirth,
          phone_number: this.phone_number,
          passport_info_id: this.passport_info_id,
          url_for_soc_media: this.url_for_soc_media,
        },
        jwt: localStorage.getItem("jwt"),
      };
      const url =
        "https://www.ukrge.site/tbilisea/API/verification_for_user.php";
      const json = JSON.stringify(varification_info);
      console.log(json);
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
        if(user.message === 'Done') location.reload();
      } catch (error) {
        console.log("error", error);
      }
    },
  },

  updated() {
    if (!this.showVarifyForm) this.$emit("closeVarifyForm");
  },
};
</script>

<style scoped>
.btn-for-reg {
  width: fit-content;
  margin: auto;
}

.spaces {
  margin: 10px 0 10px 0;
}
</style>
