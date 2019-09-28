<template>
  <div class="lrcContainer">
    <div class="lrc" ref="lrc">
<!-- <p class="lrc-p" v-for="(item, key, index) in lrcData" :key="index"> {{ item }}</p>-->
<!-- <p v-show="(parseInt(currentTime) >= keyArr[index]) && (parseInt(currentTime) < keyArr[index+1])" class="lrc-p"  v-for="(item,key,index) in lrcData" :key="index">{{ item }} </p> -->

      {{ getAllKey }}
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
// const getLRC = require('../assets/js/music');
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
        mounted() {
            const lrcUrl = "/music/lrc";
            this.$axios.post(lrcUrl, {
                musicId: this.musicId
            })
                .then(res => {
                    if (res.data.code == -1901){
                        this.lrcStr = "[00:00.00]抱歉，暂无歌词";
                    }else {
                        let div = document.createElement('div');
                        div.innerHTML = res.data.lyric;
                        this.lrcStr = div.firstChild.nodeValue

                        // 数据格式处理
                        const lyrics = this.lrcStr.split("\n");
                        const lrcObj = {};
                        for (var h = 0 ; h<lyrics.length; h++) {
                            if (lyrics[h].endsWith(']')){
                                delete lyrics[h];
                            }
                        }
                        for(let i = 0 ;i<lyrics.length; i++){
                            const lyric = decodeURIComponent(lyrics[i]);
                            const timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                            const timeRegExpArr = lyric.match(timeReg);
                            if(!timeRegExpArr)continue;
                            const clause = lyric.replace(timeReg,'');
                            for(let k = 0,h = timeRegExpArr.length;k < h; k++) {
                                const t = timeRegExpArr[k];
                                const min = Number(String(t.match(/\[\d*/i)).slice(1)),
                                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                                const time = min * 60 + sec;
                                lrcObj[time] = clause;
                            }
                        }
                        this.lrcData = lrcObj;
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        },
        computed:{
            getAllKey(){
                for(const i in this.lrcData){
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
// _getLRC() {
//     getLRC.getLRC(this.$route.params.item.songid).then((res) => {
//         let div = document.createElement('div');
//         div.innerHTML = res.lyric;
//         this.lrc = div.firstChild.nodeValue
//     })
// },
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
  .active{
    color: red !important;
    font-size: 16px !important;
    margin-bottom: 4px !important;
    margin-top: 4px !important;
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
  .up30{
    margin-top: -30px;
  }
</style>
