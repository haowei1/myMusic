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
<!--        <router-link :key="index" tag="li" :to="{name:'MusicPlay',params:{songId:item.id}}" class="song" v-for="(item, index) in songList">-->
        <li class="song" v-for="(item, index) in songList.itemlist">
          <div class="left">
            <div class="info  single-line ">
              <div>
                <span>{{ item.name }}</span>
              </div>
              <span class="txt">{{ item.singer }}</span>
            </div>
          </div>
        </li>
<!--        </router-link>-->
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
                songList: []
            }
        },
        methods: {
            search(){
                // const SearchURL = this.HOST + "/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&key=" + this.songName;
                const SearchURL = this.HOST + "/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=" + this.songName;
                this.$axios.get(SearchURL)
                    .then(res => {
                        alert(res.data.callback(data))
                        // this.songList = res.data.data.song;
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
  .list {
    word-wrap: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    word-break: break-all;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
  }

  .list li.song {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    min-height: 55px;
    text-align: left;
  }

  li{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-height: 50px;
    border-bottom: 1px solid #F2F2F2;
    padding-left: 10px;
  }

  .list .item.song .left, .list li.song .left {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list .item .info, .list li .info {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list li .info>span {
    font-weight: 400;
    display: block;
    font-size: 12px;
    color: #999;
  }

</style>
