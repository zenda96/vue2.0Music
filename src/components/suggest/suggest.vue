<template>
    <scroll class="suggest" :data="result">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconclass(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
        </ul>
    </scroll>
</template>
<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {filterSinger} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Singer from 'common/js/singer'
import {mapMutations} from 'vuex'
const TYPE_SINGER = 'singer'

export default{
    data(){
        return{
            page:1,
            result:[]
        }
    },
    props:{
        query:{
            type:String,
            default:''
        },
        showSinger:{
            type:Boolean,
            default:true
        }
    },
    watch:{
        query(){
            this.searh()
        }
    },
    methods:{
        searh(){
            search(this.query,this.page,this.showSinger).then((res)=>{
                if(res.code===ERR_OK){
                    this.result = this._genResult(res.data)
                }
            })
        },
        getIconclass(item){
            if(item.type === TYPE_SINGER){
                return 'icon-mine'
            }else{
                return 'icon-music'
            }
        },
        getDisplayName(item){
            if(item.type === TYPE_SINGER){
                return item.singername
            }else{
                return `${item.songname} - ${filterSinger(item.singer)}`
            }
        },
        selectItem(item){
            console.log(item)
            if(item.type===TYPE_SINGER){
                const singer = new Singer({
                    id:item.singerid,
                    name:item.singername,
                    mid:item.singermid
                })
                this.$router.push({
                    path:`/search/${singer.id}`
                })
                this.setSinger(singer)
            }
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        }),
        _genResult(data){
            let ret =[]
            if(data.zhida && data.zhida.singerid){
                ret.push({...data.zhida,...{type:TYPE_SINGER}})
            }
            if(data.song){
                ret = ret.concat(data.song.list)
            }
            return ret
        }
    },
    components:{
        Scroll
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .suggest
        height:100%
        overflow:hidden
        .suggest-list
            padding:0 30px
            .suggest-item
                display:flex
                align-items:center
                padding-bottom:20px
                .icon
                    flex:0 0 30px
                    width:30px
                    [class^="icon-"]
                        font-size:14px
                        color:$color-text-d
                .name
                    flex:1
                    font-size:$font-size-medium
                    color:$color-text-d
                    overflow:hidden
                    .text
                        no-wrap()
        .no-result-wrapper
            position:absolute
            width:100%
            top:50%
            trasnform:translateY(-50%)
</style>