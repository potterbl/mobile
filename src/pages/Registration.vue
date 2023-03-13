<template>
  <div class="step" v-if="step == 1">
    <content-block>
      <div class="step__of" style="margin-left: 18px">
        <p class="caption__regular">Step {{ step }} of 3</p>
      </div>
      <div class="logo__text">
        <div class="logo">
          <img src="@/assets/Logo.png" alt="Logo" />
        </div>
        <h2>Dental Clinic</h2>
        <p class="body__medium">Register new client</p>
      </div>
      <div class="registration__form">
        <div class="input__area">
          <label id="name" for="name" class="caption__regular">Name</label>
          <input
            class="input__reg"
            type="text"
            name="name"
            v-model="name"
            @input="updateName"
          />
        </div>
        <div class="input__area">
          <label id="mail__phone" for="mail__phone" class="caption__regular"
            >Email/Phone</label
          >
          <input
            class="input__reg"
            type="text"
            name="mail__phone"
            v-model="mailPhone"
            @input="updateMailPhone"
          />
        </div>
        <div class="input__area">
          <label id="message" for="message" class="caption__regular"
            >Message</label
          >
          <input
            class="input__reg"
            type="text"
            name="message"
            v-model="message"
            @input="updateMessage"
          />
        </div>
        <custom-button
          @click="registerMe"
          :style="{
            'pointer-events':
              this.name === '' || this.mailPhone === '' ? 'none' : '',
              'margin-top': `${marginTopButton}px`
          }"
          :disabled="this.name === '' || this.mailPhone === ''"
          >Register me</custom-button
        >
        <div class="already">
          <p class="body__regular">Already a client?</p>
          <router-link
            to="/login-page"
            style="margin-left: 8px; text-decoration: none; color: #0066ff"
            >Login</router-link
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
  <div class="step" v-if="step == 2">
    <content-block>
      <div class="step__header">
        <div class="step__of" style="margin-left: 18px">
          <a href="#" class="prev caption__regular" @click="prev">&lt;</a>
          <p class="caption__regular">Step {{ step }} of 3</p>
        </div>
        <h1 style="text-align: center; margin-top: 11px; margin-bottom: 6px">
          Choose procedures
        </h1>
        <div class="search__wrapper">
          <img src="@/assets/search.png" alt="search" />
          <input
            type="text"
            v-model="search"
            @input="searchProc"
            class="search"
            placeholder="Teeth cleaning, brace, crown"
          />
        </div>
      </div>
      <div class="procedures">
        <div
          class="procedures__item"
          v-for="procedure in filteredProcedures"
          :key="procedure.id"
          @click="addProcedure(procedure.id)"
          :class="{chosen: chosenProcedures.includes(procedure.id)}"
        >
          <img :src="require(`@/assets/${procedure.img}`)" alt="" />
          <div class="procedures__text">
            <p class="body__medium">{{ procedure.title }}</p>
            <p class="caption__regular">{{ procedure.body }}</p>
          </div>
        </div>
      </div>
      <next-button v-if="chosenProcedures.length" @click="registerMe"/>
    </content-block>
  </div>
  <div class="step" v-if="step == 3">
    <content-block>
        <div class="step__header">
            <div class="step__of" style="margin-left: 18px">
                <a href="#" class="prev caption__regular" @click="prev">&lt;</a>
                <p class="caption__regular">Step {{ step }} of 3</p>
            </div>
            <h1 style="margin-top: 11px; margin-left: 15px; margin-right: 15px;">Do you have any allergic reactions to medications?</h1>
            <p class="body__regular" v-if="!alergic" style="margin-top: 22px; margin-left: 15px; margin-right: 15px; color: rgba(50, 50, 50, 0.7);">Letting your dentist know about any past 
                allergies can help them determine whether 
                your symptoms are from something 
                you’re allergic to or something more serious.</p>
            <div class="alergic__msg" v-if="alergic">
                <p class="body__regular">Yes, I do</p>
                <div class="msg__triangle"></div>
            </div>
            <input type="text" placeholder="Type please which medications" v-if="alergic && !alergicSub" style="margin-top: 50px; color: rgba(50, 50, 50, 0.7);" v-model="alergics">
            <custom-button v-if="alergic && !alergicSub" style="margin-top: 20px;" @click="alergicSubmit">Submit</custom-button>
            <div class="alergic__post__msg" v-if="alergicSub">
                <p class="body__regular">Type please which medications</p>
            </div>
            <div class="alergic__msg" v-if="alergicSub">
                <p class="body__regular">{{alergics}}</p>
                <div class="msg__triangle"></div>
            </div>
        </div>
        <div v-if="!alergic" class="buttons__alergic">
            <button class="alergic" @click="createAccount(name, mailPhone, message, chosenProcedures, alergics)">No, I don't</button>
            <button class="alergic" @click="setAlergic">Yes, I do</button>
        </div>
    </content-block>
    <div class="complete" v-if="alergicSub">
        <h2 style="margin-top: 39px; margin-left: 42px; margin-right: 42px;">Do not worry!  
            We will take care of you</h2>
            <p class="body__regular" style="margin-top: 22px; margin-left: 42px; margin-right: 42px;">The information was transferred 
                to a specialist for the selection 
                of suitable medicines. </p>
                <custom-button @click="createAccount(name, mailPhone, message, chosenProcedures, alergics)" style="margin-top: 47px; width: calc(100% - 16px); margin-left: 8px;">Proceed to Time selection</custom-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "registration-page",
  data() {
    return {
      step: 1,
      name: "",
      mailPhone: "",
      message: "",
      chosenProcedures: [],
      filteredProcedures: [],
      search: "",
      alergic: false,
      alergicSub: false,
      alergics: '',
      marginTopButton: 61,
    };
  },
  methods: {
    createAccount(name, mailPhone, message, chosenProcedures, alergics){
        this.$store.commit('newUser', {name, mailPhone, message, chosenProcedures, alergics})
        this.$router.push('/time-select')
    },
    setAlergic(){
        this.alergic = true
    },
    alergicSubmit(){
        this.alergicSub = true
    },
    addProcedure(id) {
      if (!this.chosenProcedures.includes(id)) {
        this.chosenProcedures.push(id);
      } else {
        const index = this.chosenProcedures.indexOf(id);
        this.chosenProcedures.splice(index, 1);
      }
    },
    registerMe() {
      this.step++;
    },
    prev() {
      this.step--;
      setTimeout(() => {
        this.updateName();
        this.updateMailPhone();
        this.updateMessage();
      });
    },
    searchProc() {
      const search = this.search.toLowerCase();
      this.filteredProcedures = this.$store.state.procedures.filter(
        (procedure) => {
          const title = procedure.title.toLowerCase();
          const body = procedure.body.toLowerCase();
          return title.includes(search) || body.includes(search);
        }
      );
    },
    updateName() {
      const label = document.querySelector("#name");
      if (this.name != "") {
        label.style =
          "font-weight: 400; font-size: 14px; line-height: 17px; top: 0;";
      } else {
        label.style =
          "top: 34px; font-weight: 400; font-size: 16px; line-height: 19px;";
      }
    },
    updateMailPhone() {
      const label = document.querySelector("#mail__phone");
      if (this.mailPhone != "") {
        label.style =
          "font-weight: 400; font-size: 14px; line-height: 17px; top: 0;";
      } else {
        label.style =
          "top: 34px; font-weight: 400; font-size: 16px; line-height: 19px;";
      }
    },
    updateMessage() {
      const label = document.querySelector("#message");
      if (this.message != "") {
        label.style =
          "font-weight: 400; font-size: 14px; line-height: 17px; top: 0;";
      } else {
        label.style =
          "top: 34px; font-weight: 400; font-size: 16px; line-height: 19px;";
      }
    },
  },
  beforeMount() {
    this.searchProc();
  },
  mounted() {
    if(window.innerHeight <= 570){
      this.marginTopButton = 15
    } else if(window.innerHeight <= 642){
      this.marginTopButton = 30
    } 
  }
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

/* ------------------------------------------------------- */
.step__header {
  position: sticky;
  top: 6px;
  background-color: #f6f7f8;
}
.prev {
  margin-right: 17px;
}
.search__wrapper {
  position: relative;
}
.search__wrapper img {
  position: absolute;
  top: 13px;
  left: 16px;
}
.search {
  padding-left: 41px;
  margin-bottom: 9px;
  color: #C5C5C7;
}
.search::placeholder{
    color: #C5C5C7;
}
.procedures {
  height: auto;
}
.procedures::-webkit-scrollbar-thumb {
  background-color: #f4f5f6;
  border-radius: 1rem;
  width: 5px;
}
.procedures::-webkit-scrollbar-track {
  background-color: #f6f7f8;
  width: 5px;
}
.procedures__item {
  height: 91px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 18px;
  background-color: #fff;
  border-radius: 16px;
  margin-top: 16px;
  display: flex;
  transition: all .3s;
}
.procedures__item img {
  height: 53px;
  width: 53px;
}
.procedures__text {
  margin-left: 12px;
}
.chosen{
    background: #0066FF;
    color: #fff;
    transition: all .3s;
}
.chosen p:last-child{
    color: rgba(255, 255, 255, 0.7);
}
/*-------------------------------------------*/
.buttons__alergic{
    width: calc(100% - 24px);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 62px;
}
.alergic{
    box-sizing: border-box;
    border: 1px solid #0066FF;
    width: 140px;
    height: 49px;
    border-radius: 37px;
    color: #0066FF;
    background-color: transparent;
}
.alergic__msg{
    margin-top: 22px;
    margin-left: auto;
    padding: 15px 30px;
    background: #0066FF;
    width: fit-content;
    border-radius: 37px;
    box-shadow: 0px 4px 16px rgba(0, 102, 255, 0.42);
    position: relative;
    z-index: 2;
    color: #fff;

}
.msg__triangle{
    width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 17px solid #0066FF;
  box-shadow: 0px 4px 16px rgba(0, 102, 255, 0.42);
  position: absolute;
  transform: rotate(37.46deg);
  bottom: -5px;
  right: 11px;
  z-index: 1;
}
.alergic__post__msg{
    padding: 15px 23px;
    border: 1px solid #0066FF;
    color: #0066FF;
    border-radius: 37px;
    width: fit-content;
    margin-top: 33px;
}
.complete{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 331px;
    border-radius: 32px 32px 0px 0px;
    background: #FFFFFF;
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
