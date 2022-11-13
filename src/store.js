//vuex사용
import { createStore } from 'vuex';
import axios from 'axios';
import data from './assets/vuesta.js';

const store = createStore({
  state(){
    return { //저장할 state
      name : "kim",
      age : 20,
      likes : [30, 40, 50],
      liked : [false, false, false],
      more : {
        
      },
      vuestacont : data,
      display : false,
    }
  },
  mutations : {
    changeName(state){ //state == state()에 있는 데이터를 의미함. state.state이름(this.name과 유사함)
      state.name = 'park';
    },
    changeAge(state, payload){
      state.age += payload; //commit으로 보낸 데이터 받아짐
    },
    changeLike(state, payload){
      if(state.liked[payload] == false){
        state.likes[payload]++;
        state.liked[payload] = true;
      }else{
        state.likes[payload]--;
        state.liked[payload] = false;
      }
    },
    setMore(state, data){
      state.more = data
    }
  },
  actions : { //ajax요청, 또는 오래걸리는 작업들, 함수식으로 작성함.
    getData(context){ //context == store
      axios.get('https://codingapple1.github.io/vue/more0.json')
      .then((rst)=>{
        console.log(rst.data); //state에 저장시 mutation에 함수 만들어 저장
        context.commit('setMore', rst.data);
        context.state.vuestacont.push(rst.data); 
      });
    }
  }
})

export default store;