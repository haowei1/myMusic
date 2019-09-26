<template>
  <div id="player">
    <div>
      <h2 id="name">{{ this.$route.params.item.songname }}</h2>
      <div id="singer">
        <span v-for="(singer, index) in singer">{{ singer.name }} &nbsp;</span>
      </div>
    </div>

    <div id="img">
      <img :src=imgUrl />
    </div>
    <div id="lrc">
      <LRC :musicId ='this.$route.params.item.songid'  :durationTime="durationTime" :currentTime="currentTime"/>
    </div>
    <div id="audio">
      <audio :src=playUrl ref="player" controls autoplay></audio>
    </div>
  </div>
</template>
<script>
    import Vue from 'vue'
    const LRC = Vue.component("lrc",(resolve)=>require(["../components/LRC"],resolve))
    // import LRC from '../components/LRC'
    // const getLRC = require('../assets/js/music');
    export default {
        name: "player",
        data() {
            return {
                songInfo: [],
                playUrl: "",
                imgUrl: "",
                songMid: "",
                albumMid: "",
                singer: [],
                lrc: "",
                currentTime:0,
                durationTime:0
            }
        },
        components:{
            LRC
        },
        // created() {
        //     this._getLRC();
        // },
        mounted() {
            this.singer = this.singer = this.$route.params.item.singer;
            this.songMid = this.$route.params.item.songmid;
            this.albumMid = this.$route.params.item.albummid;
            this.imgUrl = "https://y.gtimg.cn/music/photo_new/T002R300x300M000" + this.albumMid + ".jpg";
            const infoUrl = this.HOST + "/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747" +
                "&songmid=" + this.songMid + "&filename=C400" + this.songMid + ".m4a&guid=126548448";
            this.$axios.get(infoUrl)
                .then(res => {
                    this.songInfo = res.data.data.items;
                    this.playUrl = "http://ws.stream.qqmusic.qq.com/" + this.songInfo[0].filename + "?fromtag=0&guid=126548448&vkey=" + this.songInfo[0].vkey;
                })
                .catch(error => {
                    console.log(error)
                });
            this.addEventListeners();
        },
        methods: {
            // _getLRC() {
            //     getLRC.getLRC(this.$route.params.item.songid).then((res) => {
            //         let div = document.createElement('div');
            //         div.innerHTML = res.lyric;
            //         this.lrc = div.firstChild.nodeValue
            //     })
            // },
            addEventListeners(){
                this.$refs.player.addEventListener('timeupdate', this._currentTime),
                    this.$refs.player.addEventListener('canplay', this._durationTime)
            },
            removeEventListeners: function () {
                this.$refs.player.removeEventListener('timeupdate', this._currentTime)
                this.$refs.player.removeEventListener('canplay', this._durationTime)
            },
            _currentTime(){
                this.currentTime = this.$refs.player.currentTime
                // currentTime是audio标签提供的获取当前播放时间的方法
            },
            _durationTime(){
                this.durationTime = this.$refs.player.duration
                // duration是audio标签提供的获得歌曲播放整体时间的方法
            }

        },
        beforeDestroyed(){
            this.removeEventListeners();
        },

    }

</script>

<style scoped>
  #player{
    background-color: azure;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    text-align: center;
  }
  #name{
    color: darkslategray;
    margin-top: 50px;
    font-size: 20px;
    font-style: italic;
  }
  #singer{
    font-size: 16px;
    color: #de3dc8fa;
    text-align: center;
    font-style: initial;
    margin-top: 10px;
  }
  #img{
    margin-top: 50px;
    margin-right: auto;
    margin-left: auto;
    width: 200px;
    width: 200px;
  }
  #lrc{
    margin-top: 80px;
    text-align: center;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    background-color: navajowhite;
  }
  #audio{
    width: 100%;
    position: fixed;
    bottom: 30px;
    left: auto;
    right: auto;
  }
</style>
/*
var t;
clearTimeout(t)
t = setTimeout(function (){
  //doSomeSting
}, 500);
*/
