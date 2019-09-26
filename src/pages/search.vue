<template>
  <div id="search">
    <div>
      <el-row>
        <el-col :span="20"><div class="grid-content bg-purple">
          <el-input id="inp_name" v-model="songName" placeholder="请输入歌名" size="small"></el-input>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light">
          <el-button id="btn_search" type="primary" icon="el-icon-search" @click="search" size="small"></el-button>
        </div></el-col>
      </el-row>
    </div>
    <div>
      <ul class="list searchlist">
        <router-link :key="index" tag="li" :to="{name:'Player', params:{item: item}}" class="song" v-for="(item, index) in songList.list">
          <div class="left">
            <div class="info  single-line ">
              <div>
                <span id="song_name">{{ item.songname }}</span>
              </div>
              <span class="txt"> {{ item.albumname }} &nbsp;&nbsp;</span><span class="txt" v-for="(singer, index) in item.singer"> {{ singer.name }} </span>
            </div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "search",
        data(){
            return {
                songName: "",
                songList: [],
                resultStr: ""
            }
        },
        methods: {
            search(){
                const SearchURL = this.HOST + "/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=15&w=" + this.songName;
                this.$axios.get(SearchURL)
                    .then(res => {
                        this.resultStr = res.data.substring(9, res.data.length - 1);
                        this.resultStr = JSON.parse(this.resultStr);
                        this.songList = this.resultStr.data.song;
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
  #search{
    padding: 20px;
  }
  li{
    margin-top: 10px;
    background: blanchedalmond;
  }
  .txt{
    font-size: 12px;
    margin-top: 3px;
  }
  #song_name {
    font-size: 16px;
    color: red;
  }

</style>
