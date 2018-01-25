/**
 * 本地持久化操作对象
 */
let localStorage = {
  setSkin(key) {
    window.localStorage.setItem("skin", key);
  },
  getSkin() {
    let theme = window.localStorage.getItem("skin");
    return !theme ? "mangoYellow" : theme;
  },
  setCurrentSong(song) {
    window.localStorage.setItem("song", JSON.stringify(song));
  },
  getCurrentSong() {
    let song = window.localStorage.getItem("song");
    return song ? JSON.parse(song) : {};
  },
  setSongs(songs) {
    window.localStorage.setItem("songs", JSON.stringify(songs));
  },
  getSongs() {
    let songs = window.localStorage.getItem("songs");
    return songs ? JSON.parse(songs) : [];
  }
};

export default localStorage
