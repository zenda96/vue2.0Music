// 异步操作以及批量控制mutation
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex(list,song){
    return list.findIndex((item)=>{
        return item.id === song.id
    })
}

export const selectPlay = function({commit,state},{list,index}){
    commit(types.SET_SEQUENCE_LIST,list)
    if(state.mode === playMode.random){
        let randomlist = shuffle(list)
        commit(types.SET_PLAYLIST,randomlist)
        index = findIndex(randomlist,list[index])
    }else{
        commit(types.SET_PLAYLIST,list)
    }    
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const randomPlay = function({commit},{list}){
    commit(types.SET_PLAY_MODE,playMode.random)
    commit(types.SET_SEQUENCE_LIST,list)
    let randomlist= shuffle(list)
    commit(types.SET_PLAYLIST,randomlist)
    commit(types.SET_CURRENT_INDEX,0)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const deleteSong = function({commit,state},song){
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    let pIndex = findIndex(playlist,song)
    playlist.splice(pIndex,1)
    let sIndex = findIndex(sequenceList,song)
    sequenceList.splice(sIndex,1)
    if(currentIndex>pIndex || currentIndex ===playlist.length){
        currentIndex --
    }

    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)

    const playingState = playlist.length>0
    commit(types.SET_PLAYING_STATE,playingState) 
}

export const deleteSongList = function({commit}){
    commit(types.SET_PLAYLIST,[])
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PLAYING_STATE,false) 
}