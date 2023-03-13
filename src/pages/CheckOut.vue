<template>
    <div class="content__wrap">
        <content-block style="padding: 6px 23px">
            <div class="step__of">
              <a href="#" class="prev caption__regular" @click="prev">&lt;</a>
              <p class="caption__regular">Return</p>
            </div>
            <div class="check__out__caption">
                <img src="" alt="">
                <h1>Checkout</h1>
            </div>
            <div class="procedures">
                <div class="procedure" v-for="(user, index) in $store.state.users" :key="index">
                    <div class="caption" v-if="user.id == counterId">
                        <h2>{{user.meetings[0].time}}</h2>
                        <p class="body__regular" style="margin-left: 11px;">{{user.meetings[0].day}} </p>
                        <p class="body__regular" style="margin-left: 5px;">{{user.meetings[0].month}}</p>
                        
                    </div>
                    <div class="card" v-for="(card, index) in $store.state.procedures" :key="index" v-show="user.id == counterId && user.chosenProcedures.includes(card.id)">
                        <div class="card__top">
                            <img :src="require(`@/assets/${card.img}`)" alt="image">
                            <div class="top__text">
                                <h3>{{ card.title }}</h3>
                                <p class="custom">{{ card.body }}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="card__bottom">
                            <button @click="decline(card.id, this.idAcc)" class="custom__btn" style="color: red; background-color: white;">Decline</button>
                            <button class="custom__btn">Set Reminder</button>
                        </div>
                    </div>
                </div>
            </div>
            <custom-button style="position: fixed;bottom: 82px; left: 8px; width: calc(100vw - 16px)">Confrim</custom-button>
          </content-block>
    </div>
</template>

<script>
    export default {
        name: 'check-out',
        data() {
            return {
                idAcc: 0,
            }
        },
        methods: {
            decline(card, acc){
                this.$store.commit('removeChosenProcedure', { id: acc, procedureId: card });

            },
            prev(){
              this.$router.push('/time-select')
            }
        },
        computed: {
    counterId() {
      return this.$store.state.counterId
    },
    },
    beforeMount() {
      this.idAcc = this.$store.state.counterId
    }
    }
</script>

<style scoped>
.procedures{
    margin-top: 16px;
}
.content__wrap{
    min-height: 100vh;
    width: 100vw;
    background-color: #f6f7f8;
}
.step__of {
    display: flex;
    align-items: center;
  }
  .prev {
    margin-right: 17px;
  }
  .caption{
    display: flex;
    align-items: flex-end;
  }
  .card{
    width: 100%;
    height: 182px;
    background: #FFFFFF;
border-radius: 16px;
margin-top: 8px;
  }
  .card__top{
    display: flex;
    padding: 18px;
    box-sizing: border-box;
    height: 91px;
    align-items: center;
  }
  .card__top img{
    width: 54px;
    height: 54px;
  }
  .top__text{
    margin-left: 11px;
  }
  .card__bottom{
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: space-between;
    height: 91px;
  }
  .custom__btn{
    
background: #0066FF;
border-radius: 24px;
color: white;
border: 0;
width: 144px;
height: 33px;
  }
  hr{
    width: 92%;
    border: 0;
    height: 1px;
    background-color: #E5E5E5;
    margin: 0 auto;
  }
  h3{
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
letter-spacing: -0.015em;

color: #000000;
  }
  .custom{
    font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
letter-spacing: -0.015em;
color: rgba(0, 0, 0, 0.7);
  }
</style>