<template>
  <div class="lrcContainer">
    <div class="lrc" ref="lrc">
<!--      <p class="lrc-p" v-for="(item, key, index) in lrcData" :key="index"> {{ item }}</p>-->

      {{ getAllKey }}
      <!-- <p v-show="(parseInt(currentTime) >= keyArr[index]) && (parseInt(currentTime) < keyArr[index+1])" class="lrc-p"  v-for="(item,key,index) in lrcData" :key="index">{{ item }} </p> -->
      <p
        class="lrc-p"
        :class="{active:parseInt(currentTime) >= keyArr[index] && parseInt(currentTime) < keyArr[index+1]}"
        v-for="(item,key,index) in lrcData"
        :key="index">
        {{ item }}{{ srcollLrc(key,index) }}
      </p>
    </div>
  </div>
</template>

<script>
    const getLRC = require('../assets/js/music');
    export default {
        name: "LRC",
        data(){
            return{
                lrcStr: "",
                lrcData:{},
                keyArr:[]
            }
        },
        props:{
          musicId: {
              type: [String,Number],
              default: "",
          },
          currentTime:{
              type:[String,Number],
              default:0
          },
          durationTime:{
              type:[String,Number],
              default:0
          }
        },
        created() {
            this._getLRC();
        },
        mounted() {
            console.log(this.musicId);
            console.log(this.lrcStr)
            // 数据格式处理
            var lyrics = this.lrcStr.split("\n");
            var lrcObj = {};
            for(var i = 0 ;i<lyrics.length;i++){
                var lyric = decodeURIComponent(lyrics[i]);
                var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                var timeRegExpArr = lyric.match(timeReg);
                if(!timeRegExpArr)continue;
                var clause = lyric.replace(timeReg,'');
                for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                    var t = timeRegExpArr[k];
                    var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                        sec = Number(String(t.match(/\:\d*/i)).slice(1));
                    var time = min * 60 + sec;
                    lrcObj[time] = clause;
                }
            }
            this.lrcData = lrcObj;
        },
        computed:{
            getAllKey(){
                for(var i in this.lrcData){
                    this.keyArr.push(i);
                }
            }
        },
        methods:{
            srcollLrc(key,index){
                const lrcDiv = this.$refs.lrc;
                if(key < this.currentTime && key > this.currentTime - (this.keyArr[index+1] - this.keyArr[index])){
                    lrcDiv.style.top = -((index-2)*30)+"px"
                }
            },
            _getLRC() {
                getLRC.getLRC(this.musicId).then((res) => {
                    let div = document.createElement('div');
                    div.innerHTML = res.lyric;
                    this.lrcStr = div.firstChild.nodeValue
                })
            },
        }
    }
</script>

<style scoped>
  .lrcContainer{
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
  }

  .lrc{
    width: 100%;
    position: absolute;
    top: 0;
  }
  .lrc-p{
    height: 30px;
    line-height: 30px;
  }
</style>
