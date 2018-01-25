import localStorage from "../utils/storage"

// 状态数据
const initialState = {
  skin: localStorage.getSkin(),  // 主题
  showStatus: false,  // 播放页显示状态
  song: localStorage.getCurrentSong(),  // 当前歌曲
  songs: localStorage.getSongs()  // 歌曲列表
};

export default initialState
