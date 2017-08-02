import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {mapMutations} from 'vuex'

export const playerMixin = {
    computed:{
        iconMode(){
                return this.mode ===playMode.sequence?'icon-sequence':this.mode===playMode.loop?'icon-loop':'icon-random'
            },
    },
    methods:{
        changeMode(){
                const mode = (this.mode+1) % 3
                this.setPlayMode(mode)
                let list = null
                if(mode === playMode.random){
                    list = shuffle(this.sequenceList)
                }else{
                    list = this.sequenceList
                }
                this.resetCurrentIndex(list)
                this.setPlayList(list)
            },
            resetCurrentIndex(list){
                let index = list.findIndex((item)=>{
                    return item.id === this.currentSong.id
                })
                this.setCurrentIndex(index)
            },
            ...mapMutations({
                setPlayingState:'SET_PLAYING_STATE',
                setCurrentIndex:'SET_CURRENT_INDEX',
                setPlayMode:'SET_PLAY_MODE',
                setPlayList:'SET_PLAYLIST'
            }),
    }
}