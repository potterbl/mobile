<template>
  <div class="step">
    <content-block>
      <div class="logo__text">
        <div class="logo">
          <img src="@/assets/Logo.png" alt="Logo" />
        </div>
        <h2>Dental Clinic</h2>
        <p class="body__medium">Register new client</p>
      </div>
      <div class="registration__form">
        <div class="input__area">
          <label id="name" for="name" class="caption__regular"
            >Email/Phone</label
          >
          <input
            class="input__reg"
            type="text"
            name="name"
            v-model="emailPhone"
            @input="updateName"
          />
        </div>
        <div class="input__area">
          <label id="mail__phone" for="mail__phone" class="caption__regular"
            >Password</label
          >
          <input
            class="input__reg"
            type="text"
            name="mail__phone"
            v-model="password"
            @input="updateMailPhone"
          />
        </div>
        <custom-button
          @click="loginMe(this.mailPhone, this.password)"
          :style="{
            'pointer-events':
              this.emailPhone === '' || this.password === '' ? 'none' : '',
            'margin-top': `${marginTopButton}px`,
          }"
          :disabled="this.emailPhone === '' || this.password === ''"
          >Login</custom-button
        >
        <div class="already">
          <p class="body__regular">Not have an account?</p>
          <router-link
            to="/login"
            style="margin-left: 8px; text-decoration: none; color: #0066ff"
            >Register</router-link
          >
        </div>
        <div class="help">
          <p class="caption__regular">Need urgent help?</p>
          <a
            class="caption__regular"
            href="#"
            style="text-decoration: none; color: #0066ff"
            >Skip registration and call the clinic</a
          >
        </div>
      </div>
    </content-block>
  </div>
</template>

<script>
export default {
  name: "login-page",
  data() {
    return {
      marginTopButton: 61,
      password: "",
      emailPhone: "",
    };
  },
  methods: {
    loginMe(mp, pass) {
      this.$store.state.userNotFound = false;
      this.$store.commit("loginUser", { mailPhone: mp, password: pass });
      if (!this.$store.state.userNotFound) {
        this.$router.push("/time-select");
      } else {
        const label = document.querySelector("#name");
        label.style =
          "font-weight: 400; font-size: 14px; line-height: 17px; top: 0; color: red;";
        label.innerText = "Wrong email/phone or password";
      }
    },
    updateName() {
      const label = document.querySelector("#name");
      if (this.emailPhone != "") {
        label.style =
          "font-weight: 400; font-size: 14px; line-height: 17px; top: 0;";
      } else {
        label.style =
          "top: 34px; font-weight: 400; font-size: 16px; line-height: 19px;";
      }
    },
    updateMailPhone() {
      const label = document.querySelector("#mail__phone");
      if (this.password != "") {
        label.style =
          "font-weight: 400; font-size: 14px; line-height: 17px; top: 0;";
      } else {
        label.style =
          "top: 34px; font-weight: 400; font-size: 16px; line-height: 19px;";
      }
    },
  },
  mounted() {
    if (window.innerHeight <= 570) {
      this.marginTopButton = 15;
    } else if (window.innerHeight <= 642) {
      this.marginTopButton = 30;
    }
  },
};
</script>

<style scoped>
.step {
  background-color: #f6f7f8;
  margin: 0;
  min-height: 100vh;
}
.step__of {
  display: flex;
  align-items: center;
}
.logo__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  margin-bottom: 21px;
}
.logo__text h2 {
  margin-top: 13px;
  margin-bottom: 6px;
  color: #0066ff;
}
.logo {
  width: 120px;
  height: 120px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 16px;
}
.logo img {
  width: 62px;
}
.input__area {
  height: 63px;
  position: relative;
}
.input__area label {
  position: absolute;
  left: 16px;
  top: 34px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.015em;
  pointer-events: none;
  transition: all 0.3s ease;
}
.input__reg {
  margin-top: 23px;
}
input {
  width: 100%;
  border-radius: 50px;
  border: 0;
  box-sizing: border-box;
  height: 40px;
  padding: 0 16px;
  font-weight: 500;
  font-size: 16px;
  color: #0066ff;
}
.already {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 21px;
}
.help {
  margin-top: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.help p {
  color: rgba(112, 112, 112, 1);
}

/*------------------------------------*/
@media (max-height: 610px) {
  .logo__text {
    margin-bottom: 0;
  }
}
@media (max-height: 590px) {
  .logo {
    width: 100px;
    height: 100px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo img {
    width: 60px;
  }
}
@media (max-height: 555px) {
  .logo {
    width: 80px;
    height: 80px;
  }
  .logo img {
    width: 40px;
  }
}
</style>
