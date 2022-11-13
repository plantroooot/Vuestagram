<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="{ backgroundImage : `url(${vuestacont.userImage})` }"></div>
      <span class="profile-name">{{ vuestacont.name }}</span>
    </div>
    <div @click="$store.commit('changeLike', postNum)" :class="`${vuestacont.filter}`" class="post-body" :style="{ backgroundImage : `url(${vuestacont.postImage})` }"></div> <!-- vue로 스타일 집어넣을때 오브젝트자료형으로도 집어넣을 수 있음 - :style="{ fontSize : '20px' }" -->
    <div class="post-content">
      <p>{{ likes }} Likes</p>
      <p><strong>{{ vuestacont.name }}</strong> {{ vuestacont.content }}</p>
      <p class="date">{{ vuestacont.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name : 'post',
    props : {
        vuestacont : Object,
        step : Number,
        likes : Number,
        postNum : Number,
    }
};
</script>

<style>
.post {
  width: 100%;
}
.profile {
  background-image: url("https://placeimg.com/100/100/arch");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  background-image: url("https://placeimg.com/640/480/animals");
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
} 
</style>