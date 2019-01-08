import * as MutationTypes from "./mutation-types"
import localStorage from "../util/storage"

const mutation = {
  [MutationTypes.SET_SKIN](state, skin) {
    state.skin = skin;
    localStorage.setSkin(skin);
  },
  /**
   * 显示或隐藏播放状态，使用es6计算属性命名作为方法名
   */
  [MutationTypes.SHOW_PLAYER](state, status) {
    state.showStatus = status;
  },
  /**
   * 修改当前歌曲
   */
  [MutationTypes.CHANGE_SONG](state, song) {
    state.song = song;
    localStorage.setCurrentSong(song);
  },
  /**
   * 添加歌曲
   */
  [MutationTypes.SET_SONGS](state, songs) {
    state.songs = songs;
    localStorage.setSongs(songs);
  },
  /**
   * 移除歌曲
   */
  [MutationTypes.REMOVE_SONG_FROM_LIST](state, id) {
    let newSongs = state.songs.filter(song => song.id !== id);
    state.songs = newSongs;
    localStorage.setSongs(newSongs);
  }
};

export default mutation
