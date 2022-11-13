<template>
  <div>
    <!-- <div>
      <button @click="this.$emit('stepNumber', 0);">버튼0</button>
      <button @click="this.$emit('stepNumber', 1);">버튼1</button>
      <button @click="this.$emit('stepNumber', 2);">버튼2</button>
    </div> -->
    <div v-if="step == 0">
      <Post :likes="$store.state.likes[i]" :postNum="i" :vuestacont="vuestacont[i]" v-for="(vsta, i) in vuestacont" :key="i" />
      <!-- v-if와 v-for는 한 곳에 못씁니당... -->
    </div>
    <!-- <Post :vuestacont="vuestacont[0]" />
    <Post :vuestacont="vuestacont[1]" />
    <Post :vuestacont="vuestacont[2]" /> -->

    <!-- 필터선택페이지 -->
    <div v-if="step == 1">
      <div :class="`${usedfilter}`" class="upload-image" :style="{backgroundImage : `url('${filedata}')`}"></div>
      <div class="filters">
        <!-- <FilterBox :filedata="filedata" :filterdata="filterdata[0]"></FilterBox>
        <FilterBox :filedata="filedata" :filterdata="filterdata[1]"></FilterBox> -->
        <FilterBox :filedata="filedata" :filters="filters[i]" v-for="(ftr, i) in filters" :key="i">
          <!-- <template v-slot:a>aa</template>
          <template v-slot:b>bb</template> -->
          <!-- <template v-slot:default="작명"> {{작명.msg}}</template> slot props 사용 -->
          {{ftr}}
        </FilterBox>
        <!-- <컴포넌트></컴포넌트>사이에 데이터 넣기 -->
        
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="step == 2">
      <div :class="`${usedfilter}`" class="upload-image" :style="{backgroundImage : `url('${filedata}')`}"></div>
      <div class="write">
        <!-- <textarea class="write-box" @input="sendText">write!</textarea> 내가 쓴 답. -->
        <textarea class="write-box" @input="$emit('textCont', $event.target.value)">write!</textarea>
      </div>
    </div>
  </div>

</template>

<script>
import Post from './Post.vue'
import FilterBox from './FilterBox.vue'
export default {
    name : "container",
    data(){
      return{
        filters : [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
        "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
        "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
      }
    },
    components :{
        Post : Post,
        FilterBox : FilterBox,
    },
    // methods : {
    //   sendText(){
    //     var text = document.querySelector('.write-box');
    //     //console.log(text.value);
    //     this.$emit('textCont', text.value);
    //   }
    // },
    props : {
      vuestacont : Object,
      step : Number,
      filedata : String,
      usedfilter : String,
    },
}
</script>

<style>
.upload-image{
width: 100%;
height: 450px;
background: cornflowerblue;
background-size : cover;
background-position:50% 50%;
background-repeat:no-repeat;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555; 
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}
</style>