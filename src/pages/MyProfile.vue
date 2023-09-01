<template>
  <q-page class="flex flex-center">
    <div class="user-info">
      <div class="needValidate" v-if="isUserLogined.status === 'waiting'">
        <p>
          Looks like we don't know you yet... Please, varificate your account.
        </p>

        <q-btn
          label="Varificate account"
          color="primary"
          @click="showVarifyFormFN()"
        ></q-btn>
      </div>

      <div class="needValidate" v-if="isUserLogined.status === 'sent'">
        <p>
          You have sent your personal information. We need time to check it. You will get the email when it done.)
        </p>
      </div>

      <p>Tickets:</p>

      <div v-if="tickets.length === 0">
        <p>You don't have actual tickets yet...</p>

        <div>
          <canvas ref="qrcodeCanvas"></canvas>
        </div>
      </div>

      <div class="btns">
        <q-btn color="primary" label="See events" to="/events" />

        <q-btn
          color="primary"
          label="Change personal info"
          @click="change_personal_info"
        />
      </div>
    </div>

    <VarifyForm
      v-if="showVarifyForm"
      @closeVarifyForm="showVarifyForm = false"
    ></VarifyForm>
  </q-page>
</template>

<script>
import { isUserLogined } from "src/js/auth";
import { defineComponent } from "vue";
import VarifyForm from "src/components/VarifyForm.vue";
import QRCode from "qrcode";

export default defineComponent({
  name: "MyProfile",
  components: {
    VarifyForm,
  },
  data() {
    return {
      isUserLogined,
      showVarifyForm: false,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      tickets: [],
    };
  },
  methods: {
    change_personal_info() {
      alert("Change personal info");
    },
    showVarifyFormFN() {
      this.showVarifyForm = false;
      this.showVarifyForm = true;
    },
  },
  mounted() {
    const canvas = this.$refs.qrcodeCanvas

    QRCode.toCanvas(canvas,  'Hello, World!', (error) => {
      if (error) {
        console.error(error)
      } else {
        console.log('QR code generated successfully')
      }
    })
  }
});
</script>

<style scoped lang="scss">
p {
  width: fit-content;
  margin: auto;
  font-size: 25px;
}

.btns {
  padding: 40px 0 0 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.user-info{
  padding: 20px;
}
</style>
