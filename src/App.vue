<template>
  <div></div>
    <!-- <form id="frm" name="frm">
        <input type="text" name="txt1" />
        <input type="text" name="txt2" />
        <a @click="test">보기</a>
    </form> -->
  <!-- 
    - App.vue - 상하단
    - Container.vue - 내용물(메인피드)
    - Post.vue
    - 컴포넌트 만드는 기준 - 다른곳에서 쓸러 같으면 쓰기
   -->
   
   <!-- gnb샘플 -->
  <ul>
       <li v-for="(depth1, i) in gnb" :key="i">
        <a href="javascript:;">{{ gnb[i].name }}</a>
        <ul>
          <li v-for="(depth2, j) in gnb[i].depth2" :key="j">
            {{ gnb[i].depth2[j].name }}
          </li>
        </ul>
      </li> 
  </ul>
  
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
      <!-- 글 발행기능 post-추가  -> vuestacont에 오브젝트를 하나 추가해주면 끝. -->
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container :vuestacont="$store.state.vuestacont" :step="step" :filedata="filedata" @textCont="textarea = $event" :usedfilter="usedfilter" />
  <!-- @$emit으로 작명한 변수이름="변경할 state = $event" 순으로 작성 -->
  
  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input type="file" @change="upload" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
    <!-- FileReader() - 파일을 글자로 변환함 / URL.createIbjectURL - 이미지의 가상 URL생성가능 -->
  </div>

  <!-- <div v-if="uistate == 0">내용0</div>
  <div v-if="uistate == 1">내용1</div>
  <div v-if="uistate == 2">내용2</div>
  <button @click="uistate = 0">버튼0</button>
  <button @click="uistate = 1">버튼1</button>
  <button @click="uistate = 2">버튼2</button> -->

  
  <h4 v-if="$store.state.display == true">ㅎㅇ {{ $store.state.name }}</h4>
  <!-- Vuex state가져오기 -> $store.state.state이름 -->
  <!-- <button @click="$store.state.name = '박'">버튼</button> -->
  <!-- state값 직접 수정 금지(국룰!) - 수정하고 싶으면 미리 store.js에 수정방법 정의 / 그 방법을 컴포넌트에서 소환해서 수정해야함 -->
  <button v-if="$store.state.display == true" @click="$store.commit('changeName')">버튼</button>
  <!-- 
    Vuex데이터 수정방법
    1. store.js에 state수정방법 정의
    2. store.js에 데이터를 수정해달라고 부탁해야함. - $store.commit('정의한 함수 명', 데이터);
    3. 정의한 데이터는 store.js에서 사용 가능
  -->

  <!-- 예제1 -->
  <p>{{ $store.state.age }}</p>
  <button @click="changeAge(3)">button</button>
  <!-- commit함수를 mapMutation에 등록한 뒤 함수명(보낼 데이터)형식으로 축약해서 사용 가능함. -->

  <p v-if="$store.state.display == true">{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기 2</button>
  <!-- store.js에서 actions에 있는 함수 불러오기 - $store.dispatch.('함수명') -->

  <!-- <p>{{ $store.state.vuestacont }}</p> -->

  <!-- <p>{{ now2 }}  {{ counter }}</p> -->
  <!-- methods vs computed(함수이름만 씀 - state데이터이기 때문) / 갱신이 되지 않음. -->
  <!-- <button @click="counter++">버튼</button> -->
  <p>{{ myname }}</p>
  

</template>

<script>
import data from './assets/vuesta.js';
import gnb from './assets/gnb.js';
import Container from './components/Container.vue';
import axios from 'axios'; //npm install axios
//npm install mitt
//Vuex - 모든 컴포넌트들이 데이터를 공유할 수 있는 자바스크립트 파일을 만드는 것(저장, 사용, 수정 전부 가능).
import {mapState, mapMutations} from 'vuex';

//PWA - 앱으로 발행 가능(실제 앱은 아니지만 브라우저 상태창을 전부 제거하여 앱처럼 보이게 가능)


export default {
  name: 'App',
  data(){
        return{
            vuestacont : data,
            num1 : 0,
            step : 0,
            filedata : '',
            textarea : '',
            usedfilter : '',
            gnb : gnb,
            counter : 0,
        }
  },
  mounted(){
    this.emitter.on('onFilter', (a)=>{
      //console.log(a);
      this.usedfilter = a;
    });
    //emitter 메세지 수신 - this.emitter.on('작명', (param)=>{});
    //state생성 후 받아온 데이터 넣어주기.

  },
  components: {
    Container : Container
  },
  methods : {
    publish(){
      var myvuesta = {
        name: "Min",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.filedata,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.textarea,
        filter: this.usedfilter,
      };
      this.vuestacont.unshift(myvuesta); //sthis.vuestacont에 {나의게시물}을 맨 앞에 밀어넣음
      //console.log(this.textarea);
      this.step = 0;
    },
    more(){
      //console.log(this.cNum);    
      //get
      axios.get(`https://codingapple1.github.io/vue/more${this.num1}.json`)
      .then((rst)=>{ //요청으로 가져온 결과 arrow function이 더 좋음.
        //요청성공시 실행할 코드
        console.log(rst.data);
        this.vuestacont.push(rst.data); //배열에 추가
        this.num1 += 1;
      });
      //post
      //axios.post('URL', {name : 'kim'}).then(callback).catch(callback);
      //catch - 실패시 실행할 함수      
    },
    upload(e){
      let file = e.target.files;
      let url = URL.createObjectURL(file[0]);
      // blob - 원래는 0, 1로 이루어진 데이터를 이 오브젝트에 담아 다룸.
      this.filedata = url;
      this.step++;
      //url.replaceAll('blob');
    },
    test(){
      var frm = document.querySelector('#frm');
      alert(frm.txt1.value);
    },
    now(){
      return new Date();
      //사용 할때마다 실행됨
    },
    ...mapMutations(['setMore', 'changeAge']), 
    //...mapMutations(['함수명'])store.js의 mutations에 저장된 함수를 간결하게 가져다 쓸 수 있음
    //import필요
  },
  computed : {    
    now2(){
      return new Date();
      //웹사이트 로딩시 실행하고 값을 기억하여 이벤트가 발생할때 해당 값을 읽어옴.
      //컴퓨팅 파워를 절약할 수 있음.
    },
    name(){
      return this.$store.state.name;
      //store에 저장된 state값을 저장할 수 있음(코드가 간결해짐 - name이라고만 작성함.)
      //꼭 return과 this.$store는 써야함.
    },
    age(){
      return this.$store.state.age;
    },
    ...mapState(['name', 'age', 'likes']),
    ...mapState({ myname : 'name' }) //작명해서 사용하고 싶을 경우 오브젝트 형식으로 구현하면 됨. - {작명 : "state명"}
    //배열 안에 state명을 쓰면 해당 state만 입력해서 사용 가능함.
    //vuex함수라서 import해야함.
  }
}
</script>

<style>
/* @import 'style.css' - 외부에서 가져올 수 있음. */
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
  z-index:50;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
