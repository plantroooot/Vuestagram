<template>
    <div @click="fire" :class="`${filters} filter-item`" :style="{backgroundImage : `url(${filedata})`}">
        <!-- <slot name="a"></slot>
        <slot name="b"></slot> -->
        <!-- <slot :msg="msg"></slot> -->
        <!-- slot props - 부모가 자식 데이터를 가져다 쓰고 싶을때 사용 -->
        <slot class="hidden"></slot>
    </div>
    
    <!-- 
        slot문법
        - 자식컴포넌트의 구멍 뜷기 
        - 부모 컴포넌트에서 <컴포넌트></컴포넌트>사이에 데이터 넣기
        - HTML에 데이터바인딩시 유용함.(속성에 데이터바인딩은 props를 씀)
        - 간단한 내용을 전송할 수 있음.
        - HTML태그 자체도 전송 가능함.
    -->
    
</template>

<script>
export default {
    name : 'filterbox',
    data(){
        return{
            msg : 'hi'
        }
    },
    methods : {
        fire(){
            this.emitter.emit('onFilter', this.filters);
            //다른 컴포넌트로 전송 가능(부모 - 형제 전부 가능) this.emitter.emit('작명', '데이터')
        }
    },
    props : {
        filedata : String,
        filters : String,
    }
}
</script>

<style>
.filter-item {
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color : white;
    background-size: cover;
    background-position : center;
    font-size:0;
    text-indent:-9999px;
}
</style>