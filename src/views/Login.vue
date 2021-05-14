<template>
  <div class="wrapper">
    <add-one-field
      :dialogProp="dialog"
      :optionsProp="options"
      :rulesProp="rulesEmail"
      @on-send="restorePass"
      @on-close="dialog = false"
    />
    <form class="elevation-2">
      <div class="form-header"></div>
      <div class="fields">
        <v-text-field
          v-model="admin.email"
          dense
          prepend-icon="mdi-at"
          type="text"
          label="Email"
          :rules="rulesEmail"
          autofocus
          color="purple darken-3"
        ></v-text-field>
        <v-text-field
          v-model="admin.password"
          prepend-icon="mdi-lock-outline"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          name="Password"
          label="Password"
          color="purple darken-3"
          counter
        ></v-text-field>
        <v-checkbox
          v-model="admin.isRemember"
          dense
          class="dense-checkbox mt-2"
          label="Keep me Signed in"
          color="purple darken-3"
          hide-details
        ></v-checkbox>
      </div>
      <div class="form-center">
        <v-btn
          width="100%"
          outlined
          @click.prevent="authAdmin"
          type="submit"
          color="purple darken-3"
          >Log in</v-btn
        >
      </div>
      <v-divider class="my-4"></v-divider>
      <div class="form-center">
        <v-btn color="grey" plain @click="dialog = true">
          Forgot password?
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import AddOneField from "@/components/AddOneField.vue";
import firebase from "firebase/app";
import { HTTP } from "@/actions/index";
export default {
  components: { AddOneField },
  data() {
    return {
      admin: {
        email: "",
        password: "",
        isRemember: false,
      },
      options: {
        title: "Reset password",
        label: "Email",
        icon: "mdi-at",
        action: "Send",
      },
      rulesEmail: [
        (value) => !!value || "Required email",
        (value) => {
          // eslint-disable-next-line max-len
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      ],
      dialog: false,
      showPassword: false,
    };
  },
  methods: {
    async authAdmin() {
      try {
        this.admin.isRemember
          ? await firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          : await firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION);
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(this.admin.email, this.admin.password);
        this.$store.dispatch("addUser", user.email);
        const { token } = await firebase.auth().currentUser?.getIdTokenResult();
        this.$store.dispatch("addIsLogin", true);
        this.$store.dispatch("addToken", token);
        HTTP.defaults.headers.Authorization = `Bearer ${token}`;
        this.$router.push({ name: "Admin" });
      } catch (e) {
        this.$store.dispatch("addSnackbar", {
          isOpen: true,
          message: e.message,
        });
      }
    },
    async restorePass(email) {
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          this.$store.dispatch("addSnackbar", {
            isOpen: true,
            message: "The letter was sent to email",
          });
        })
        .catch((error) => {
          this.$store.dispatch("addSnackbar", { isOpen: true, message: error });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    padding: 2rem;
    background-color: white;
    border-radius: 5px;
    .form-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 2rem;
      img {
        width: 160px;
      }
    }
    .fields {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.5rem;
    }
    .form-center {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
}
@media (max-width: 600px) {
  .wrapper {
    form {
      max-width: 90vw;
    }
  }
}
</style>
