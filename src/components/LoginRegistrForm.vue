<template>
  <!-- login form -->
  <q-dialog v-model="showLoginForm" v-if="showLoginForm">
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-input
          outlined
          type="email"
          v-model="login_email"
          label="E-mail"
          dence
          class="spaces"
        />

        <q-input
          v-model="login_pass"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          dence
          class="spaces"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-btn
          style="background: rgb(165, 4, 219); width: 100%; font-size: medium"
          glossy
          label="Log in"
          @click="login()"
        />
      </q-card-section>

      <q-card-section class="q-pt-none btn-for-reg">
        <q-btn
          flat
          color="primary"
          style="text-transform: none"
          label="Forgot password?"
          @click="OpenResetPasswordDialog()"
        />
      </q-card-section>

      <q-card-section class="q-pt-none btn-for-reg">
        <q-btn
          flat
          label="I don't have an account"
          @click="openRegistrForm()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- registration form -->
  <q-dialog v-model="showRegForm" v-if="showRegForm">
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-input
          outlined
          type="email"
          v-model="reg_email"
          label="E-mail"
          dence
          class="spaces"
          :rules="[myRule]"
        />

        <q-input
          v-model="reg_pass"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          dence
          class="spaces"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          v-model="reg_rep_pass"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          dence
          class="spaces"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn
          style="background: rgb(165, 4, 219); width: 100%; font-size: medium"
          glossy
          label="Sign Up"
          @click="createNewUser()"
        />
      </q-card-section>
      <q-card-section class="q-pt-none btn-for-reg">
        <q-btn flat label="I have an account" @click="openRegistrForm()" />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showPassForm" v-if="showPassForm">
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-input
          outlined
          type="email"
          v-model="reset_pass_email"
          label="E-mail"
          dence
          class="spaces"
        />
        <q-btn
          style="background: rgb(165, 4, 219); width: 100%; font-size: medium"
          glossy
          label="Reset password"
        />
      </q-card-section>
      <q-card-section class="q-pt-none btn-for-reg"> </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "vLoginForm",
  emits: ["closeLoginRegForm"],
  data() {
    return {
      showLoginForm: true,
      showRegForm: false,
      showPassForm: false,
      login_email: "",
      login_pass: "",
      reg_email: "",
      reg_pass: "",
      reg_rep_pass: "",
      reset_pass_email: "",
      isPwd: true,
    };
  },
  methods: {
    openRegistrForm() {
      this.showLoginForm = !this.showLoginForm;
      this.showRegForm = !this.showRegForm;
    },
    async login() {
      // this.loader = true
      const url = "https://www.ukrge.site/tbilisea/API/login.php";
      const json = JSON.stringify({
        email: this.login_email,
        password: this.login_pass,
      });
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
        if (user.jwt) {
          localStorage.setItem("jwt", user.jwt);
          localStorage.setItem("email", user.email);
          localStorage.setItem("status", user.status);
          location.reload();
        } else alert(user.message);
      } catch (error) {
        console.log("error", error);
      }
      //  finally {
      //   this.loader = false;
      // }
    },
    async createNewUser() {
      const url = "https://www.ukrge.site/tbilisea/API/create_user.php";
      const json = JSON.stringify({
        email: this.reg_email,
        password: this.reg_pass,
      });
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
        localStorage.setItem("jwt", user.jwt);
        localStorage.setItem("email", user.email);
        localStorage.setItem("status", user.status);
        location.reload();
      } catch (error) {
        console.log("error", error);
      }
    },
    resetPassword() {
      // send request to the server
    },
    validateLoginForm() {
      // check if fields are correct
    },
    validateRegForm() {
      // check if fields are correct
    },
    OpenResetPasswordDialog() {
      this.showPassForm = true;
    },

    myRule(val) {
      // simulating a delay

      return new Promise((resolve, reject) => {
        /// add checing if an email is used
        setTimeout(() => {
          // call
          //  resolve(true)
          //     --> content is valid
          //  resolve(false)
          //     --> content is NOT valid, no error message
          //  resolve(error_message)
          //     --> content is NOT valid, we have error message
          resolve(!!val || "* Required");

          // calling reject(...) will also mark the input
          // as having an error, but there will not be any
          // error message displayed below the input
          // (only in browser console)
        }, 1000);
      });
    },
  },

  updated() {
    if (!this.showLoginForm && !this.showRegForm && !this.showPassForm)
      this.$emit("closeLoginRegForm");
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
