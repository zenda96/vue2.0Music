import * as types from './mutation-types'

const mutations ={
    [types.SET_SINGER](state,singer){
        state.singer=singer
    },
    [types.SET_PLAYING_STATE](state,flag){
        state.playing = flag
    },
}

export default mutations