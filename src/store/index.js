import { createStore } from "vuex";

export default createStore({
  state: {
    procedures: [
      {
        img: "golden-crown.png",
        title: "Dental Crown",
        body: "Crowns are used to protect, cover and restore the shape of your teeth",
        id: 1,
      },
      {
        img: "implant.png",
        title: "Dental Implant",
        body: "Metal post that replaces the root portion of a missing tooth",
        id: 2,
      },
      {
        img: "braces-rubber-bands.png",
        title: "Braces",
        body: "Braces used to correct crowded or crooked teeth, or a misaligned jaw",
        id: 3,
      },
      {
        img: "tooth-shine.png",
        title: "Tooth Cleaning",
        body: "Professional cleaning includes tooth scaling, tooth polishing ",
        id: 4,
      },
      {
        img: "vineer.png",
        title: "Veneers",
        body: "Dental veneers are a cosmetic device ",
        id: 5,
      },
      {
        img: "tools.png",
        title: "General Check Up",
        body: "We will check for cavities and to see if there's any plaque",
        id: 6,
      },
    ],
    users: [
      {
        name: "test",
        mailPhone: "test",
        message: "test",
        chosenProcedures: [2, 5],
        alergics: "test",
        id: 0,
        meetings: [{ month: "July", day: 3, time: "12:30 am" }],
        password: "test",
      },
    ],
    counterId: 0,
    userNotFound: false,
  },
  getters: {},
  mutations: {
    newUser(state, payload) {
      state.counterId++;
      const newUser = {
        name: payload.name,
        mailPhone: payload.mailPhone,
        message: payload.message,
        chosenProcedures: payload.chosenProcedures,
        alergics: payload.alergics,
        id: state.counterId,
        meetings: [],
        password: payload.name,
      };

      state.users.push(newUser);
      console.log(newUser);
    },
    meetUser(state, payload) {
      const user = state.users.find((u) => u.id === state.counterId);
      user.meetings.push({
        month: payload.month,
        day: payload.day,
        time: payload.time,
      });
      console.log(user);
    },
    removeChosenProcedure(state, payload) {
      const user = state.users.find((u) => u.id === payload.id);
      if (user) {
        const index = user.chosenProcedures.indexOf(payload.procedureId);
        if (index !== -1) {
          user.chosenProcedures.splice(index, 1);
        }
      }
    },
    loginUser(state, payload) {
      const user = state.users.find((u) => u.mailPhone == payload.mailPhone);
      if (user && user.password == payload.password) {
        this.state.counterID = user.id;
      } else {
        this.state.userNotFound = true;
      }
    },
  },
  actions: {},
  modules: {},
});
