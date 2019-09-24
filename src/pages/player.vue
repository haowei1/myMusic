<template>
  <div id="player">
      <div>
        <h2 id="name">{{ this.$route.params.item.songname }}</h2>
        <h3 id="singer" v-for="(singer, index) in singer">{{ singer.name }}</h3>
      </div>
      <div id="img">
        <img :src=imgUrl />
      </div>
      <div id="audio">
        <audio :src=playUrl ref="player" controls autoplay></audio>
      </div>
  </div>
</template>

<script>
    export default {
        name: "player",
        data() {
            return {
                songInfo: [],
                playUrl: "",
                imgUrl: "",
                songMid: "",
                albumMid: "",
                singer: []
            }
        },
        mounted() {
            this.singer = this.singer = this.$route.params.item.singer;
            this.songMid = this.$route.params.item.songmid;
            this.albumMid = this.$route.params.item.albummid;
            this.imgUrl = "https://y.gtimg.cn/music/photo_new/T002R300x300M000" + this.albumMid + ".jpg";
            const infoURL = this.HOST + "/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747" +
                "&songmid=" + this.songMid + "&filename=C400" + this.songMid + ".m4a&guid=126548448";
            this.$axios.get(infoURL)
                .then(res => {
                    this.songInfo = res.data.data.items;
                    this.playUrl = "http://ws.stream.qqmusic.qq.com/" + this.songInfo[0].filename + "?fromtag=0&guid=126548448&vkey=" + this.songInfo[0].vkey;
                })
                .catch(error => {
                    console.log(error)
                })

         }
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
    font-size: 18px;
    color: aquamarine;
    text-align: center;
    font-style: oblique;
    margin-top: 10px;
  }
  #img{
    margin-top: 40px;
    margin-right: auto;
    margin-left: auto;
    width: 200px;
    width: 200px;
  }
  #audio{
    width: 100%;
    position: fixed;
    bottom: 30px;
    left: auto;
    right: auto;
  }
</style>
