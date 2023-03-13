<template>
  <div class="time__select__wrapper">
    <content-block style="padding: 6px 23px">
      <div class="step__of">
        <a href="#" class="prev caption__regular" @click="prev">&lt;</a>
        <p class="caption__regular">Step 3 of 3</p>
      </div>
      <div class="time__header">
        <img src="@/assets/calendar.png" alt="calendar" />
        <h1>Select time</h1>
      </div>
      <div class="date">
        <h2>{{ month }}</h2>

        <h2 class="select" @click="selectMonth">></h2>
      </div>
      <div class="days">
        <div class="day__wrapper" id="days">
          <div
            class="day"
            v-for="(days, index) in currentMonth"
            :key="index"
            @click="chooseDay(days.day)"
            :style="{ 'background-color': days.day === selectedDay ? '#0066ff' : '', color: days.day === selectedDay ? 'white' : ''}"
          >
            <p class="caption__regular">{{ days.dayOfWeek }}</p>
            <p class="body__medium">{{ days.day }}</p>
          </div>
        </div>
      </div>
    </content-block>
    <div
      :class="{ menu: monthSelect }"
      class="menuStart"
      v-if="monthSelect"
      style="height: min-content"
    >
      <div class="menu__header">
        <div class="handle"></div>
      </div>
      <p class="body__medium">Select month:</p>
      <div class="custom__select">
        <div
          class="options"
          v-for="(month, index) in months"
          :key="index"
          @click="monthChange(month)"
          :style="{
            'background-color': month.match(this.month) ? '#0066FF' : '',
          }"
        >
          <p
            class="caption__regular"
            style="color: #0066ff"
            :style="{ color: month.match(this.month) ? 'white' : '' }"
            
          >
            {{ month }}
          </p>
        </div>
      </div>
    </div>
    <div id="day__menu" class="menuStart" v-if="!monthSelect" :class="dayChosen? 'menu' : ''">
      <div class="menu__header" id="header">
        <div class="handle"></div>
      </div>
      <p class="body__medium">Morning</p>
      <div class="custom__select">
        <div
          class="options"
          v-for="(time, index) in morning"
          :key="index"
          :style="{
            'background-color': time.match(this.selectedTime) ? '#0066FF' : '',
          }"
          @click="timeChange(time)"
        >
          <p
            class="caption__regular"
            style="color: #0066ff"
            :style="{ color: time.match(this.selectedTime) ? 'white' : '' }"
          >
            {{ time }}
          </p>
        </div>
      </div>
      <p class="body__medium" style="margin-top: 40px">Day</p>
      <div class="custom__select">
        <div
          class="options"
          v-for="(time, index) in day"
          :key="index"
          :style="{
            'background-color': time.match(this.selectedTime) ? '#0066FF' : '',
          }"
          @click="timeChange(time)"
        >
          <p
            class="caption__regular"
            style="color: #0066ff"
            :style="{ color: time.match(this.selectedTime) ? 'white' : '' }"
          >
            {{ time }}
          </p>
        </div>
      </div>
      <p class="body__medium" style="margin-top: 40px">Evening</p>
      <div class="custom__select">
        <div
          class="options"
          v-for="(time, index) in evening"
          :key="index"
          :style="{
            'background-color': time.match(this.selectedTime) ? '#0066FF' : '',
          }"
          @click="timeChange(time)"
        >
          <p
            class="caption__regular"
            style="color: #0066ff"
            :style="{ color: time.match(this.selectedTime) ? 'white' : '' }"
          >
            {{ time }}
          </p>
        </div>
      </div>
      <custom-button style="position: fixed;bottom: 82px; left: 8px; width: calc(100% - 16px)" @click="pushNew(this.month, this.selectedDay, this.selectedTime)" v-if="timeSelected">Continue</custom-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "time-select",
  data() {
    return {
      month: "March",
      months: [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      monthSelect: false,
      days: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],

      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      currentMonth: [],
      selectedDay: "",
      selectedTime: "8:00",
      morning: [
        "8:00 am",
        "9:15 am",
        "10:00 am",
        "11:00 am",
        "11:30 am",
        "11:50 am",
      ],
      day: ["12:00 am", "12:30 am", "2:00 pm"],
      evening: ["4:00 pm", "5:00 pm", "6:45 pm"],
      dayChosen: false,
      timeSelected: false,
    };
  },
  methods: {
    pushNew(month, day, time){
        this.$store.commit('meetUser', {month, day, time})
        this.$router.push('/check-out')
    },
    prev() {
      this.$router.push("/registration");
    },
    selectMonth() {
      this.monthSelect = !this.monthSelect;
      setTimeout(()=>{
        this.updateMove()
      }, 500)
    },
    updateMove(){
      const menu = document.querySelector('#day__menu');

function startMoveMenu(e) {
  var startY = e.clientY || e.touches[0].clientY;
  var currentTop = menu.offsetTop;

  document.addEventListener("mousemove", moveMenu);
  document.addEventListener("touchmove", moveMenu);
  document.addEventListener("mouseup", stopMoveMenu);
  document.addEventListener("touchend", stopMoveMenu);

  e.stopPropagation();
  e.preventDefault();

  function moveMenu(e) {
    var newY = e.clientY || e.touches[0].clientY;
    var newTop = currentTop + newY - startY;

    var minTop = 0;
    var maxTop = menu.offsetHeight / 2;
    if (newTop > menu.offsetHeight / 4) {
      newTop = maxTop;
      menu.classList.remove('menu');
    } else if (newTop < menu.offsetHeight / 4) {
      newTop = minTop;
      menu.classList.add('menu');
    }

    menu.style = 'transform: translateY(' + newTop + "px)";
  }

  function stopMoveMenu(e) {
    document.removeEventListener("mousemove", moveMenu);
    document.removeEventListener("touchmove", moveMenu);
    document.removeEventListener("mouseup", stopMoveMenu);
    document.removeEventListener("touchend", stopMoveMenu);

    e.stopPropagation();
    e.preventDefault();
  }
}

if (this.monthSelect == false) {
  if (this.dayChosen == true) {
    const menuHeader = document.querySelector('#header');

    menuHeader.addEventListener('mousedown', startMoveMenu);
    menuHeader.addEventListener('touchstart',startMoveMenu);
  }
}
    },
    monthChange(newValue) {
      this.month = newValue;
      this.monthSelect = !this.monthSelect;
      setTimeout(()=>{
        this.updateMove()
      }, 500)
    },
    timeChange(time) {
      this.selectedTime = time;
      this.timeSelected = true
    },
    chooseDay(day) {
      this.selectedDay = day;
      this.dayChosen = true;
      setTimeout(()=>{
        this.updateMove()
      }, 500)
    },
  },
  mounted() {
    const monthIndex = this.months.indexOf(this.month);
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, monthIndex, i);
      const dayOfWeek = this.daysOfWeek[date.getDay()];
      this.currentMonth.push({
        day: i,
        dayOfWeek: dayOfWeek,
      });
    }

    // const days = document.querySelector("#days");

// days.addEventListener("touchstart", (e) => {
//   var touch = e.touches[0];
//   var startX = touch.clientX - days.offsetLeft;

//   document.addEventListener("touchmove", moveDays);
//   document.addEventListener("touchend", stopMoveDays);
//   document.addEventListener("mousemove", moveDays);
//   document.addEventListener("mouseup", stopMoveDays);

//   e.stopPropagation();
//   e.preventDefault();

//   function moveDays(e) {
//     if (e.type === "touchmove") {
//       var touch = e.touches[0];
//       var newLeft = touch.clientX - startX - days.offsetParent.offsetLeft;
//     } else {
//       newLeft = e.clientX - startX - days.offsetParent.offsetLeft;
//     }

//     var minLeft = -days.offsetWidth + window.innerWidth * 0.98;
//     var maxLeft = 0;
//     if (newLeft > maxLeft) {
//       newLeft = maxLeft;
//     } else if (newLeft < minLeft) {
//       newLeft = minLeft;
//     }

//     days.style.left = newLeft + "px";
//   }

//   function stopMoveDays(e) {
//     document.removeEventListener("touchmove", moveDays);
//     document.removeEventListener("touchend", stopMoveDays);
//     document.removeEventListener("mousemove", moveDays);
//     document.removeEventListener("mouseup", stopMoveDays);

//     e.stopPropagation();
//     e.preventDefault();
//   }
// });

  }
};
</script>

<style scoped>
.time__select__wrapper {
  width: 100vw;
  height: calc(100vh - env(safe-area-inset-bottom));
  background-color: #f6f7f8;
  overflow: hidden;
}
.step__of {
  display: flex;
  align-items: center;
}
.prev {
  margin-right: 17px;
}
.time__header {
  display: flex;
  align-items: center;
  margin-top: 11px;
}
.time__header h1 {
  margin-left: 19px;
}
.date {
  display: flex;
  align-items: center;
  margin-top: 27px;
}
.select {
  transform: rotate(90deg);
  margin-left: 15px;
}
.menuStart {
  height: calc(100vh - 255px);
  width: 100%;
  background-color: #fff;
  border-radius: 32px 32px 0px 0px;
  position: fixed;
  bottom: 0;
  transition: all 0.3s ease;
  transform: translateY(50%);
  padding: 0 18px;
  padding-bottom: 14px;
  box-sizing: border-box;
  opacity: 0.75;
  z-index: 1;
  overflow-y: scroll;
}
.menu {
  transition: all 0.3s ease;
  transform: translateY(0);
  opacity: 1;
  z-index:2;
}
.menu__header {
  height: 18px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: sticky;
  top: 0;
  background-color: #fff;
}
.handle {
  width: 32px;
  height: 4px;
  background: #e8e8e8;
  border-radius: 100px;
}
.custom__select {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
}
.options {
  width: 95px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #0066ff;
  border-radius: 38px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.days {
  position: relative;
  height: 71px;
  overflow-y: scroll;
}
.days::-webkit-scrollbar{
  display: none;
}
.day__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: fit-content;
}
.day {
  width: 50px;
  height: 71px;
  background: #ffffff;
  border: 1px solid #e3e6ef;
  border-radius: 16px;
  box-sizing: border-box;
  margin-right: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
