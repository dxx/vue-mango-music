import localStorage from "./storage"

const theme = {};

theme.mangoYellow = {
  rootColor: "#333333",
  rootBgColor: "#F8F8FF",
  /* 首页header */
  appHeaderColor: "#FFFFF0",
  appHeaderBgColor: "#FFA500",
  /* 首页tab */
  tabColor: "rgba(0, 0, 0, .7)",
  tabBgColor: "#FFFFFF",
  /* 最新专辑 */
  albumColor: "rgba(0, 0, 0, 0.6)",
  albumNameColor: "#333333",
  /* 排行榜 */
  rankingWrapperBgColor: "#FFFFFF",
  rankingSingerColor: "rgba(0, 0, 0, 0.5)",
  /* 搜索 */
  searchBgColor: "#FFFFFF",
  searchBoxBgColor: "#FFFFFF",
  searchBoxWrapperBgColor: "#F8F8FF",
  searchTitleColor: "rgba(0, 0, 0, .7)",
  searchHotColor: "#000000",
  searchHotBorderColor: "rgba(0, 0, 0, .7)",
  searchResultBorderColor: "#E5E5E5",
  /* 详情 */
  detailBgColor: "#F8F8FF",
  detailSongColor: "#000000",
  detailSingerColor: "rgba(0, 0, 0, 0.6)",
  /* mini播放器 */
  miniPlayerBgColor: "#FFFFFF",
  miniImgBorderColor: "#EEEEEE",
  miniProgressBarBgColor: "rgba(0, 0, 0, 0.1)",
  miniRightColor: "#FFD700",
  miniSongColor: "#333333",
  activeColor: "#FFA500"
};

theme.coolBlack = {
  rootColor: "#DDDDDD",
  rootBgColor: "#212121",
  appHeaderColor: "#FFD700",
  appHeaderBgColor: "transparent",
  tabColor: "#DDDDDD",
  tabBgColor: "transparent",
  albumColor: "rgba(221, 221, 221, 0.7)",
  albumNameColor: "#FFFFFF",
  rankingWrapperBgColor: "#333333",
  rankingSingerColor: "rgba(221, 221, 221, 0.7)",
  searchBgColor: "#212121",
  searchBoxBgColor: "#333333",
  searchBoxWrapperBgColor: "#212121",
  searchTitleColor: "#FFD700",
  searchHotColor: "#DDDDDD",
  searchHotBorderColor: "transparent",
  searchResultBorderColor: "transparent",
  detailBgColor: "#212121",
  detailSongColor: "#FFFFFF",
  detailSingerColor: "rgba(221, 221, 221, 0.7)",
  miniPlayerBgColor: "#333333",
  miniImgBorderColor: "rgba(221, 221, 221, 0.3)",
  miniProgressBarBgColor: "rgba(0, 0, 0, 0.3)",
  miniRightColor: "#FFD700",
  miniSongColor: "#FFFFFF",
  activeColor: "#FFD700"
};

theme.kuGouBlue = Object.assign({}, theme.mangoYellow, {
  appHeaderBgColor: "#2CA2F9",
  activeColor: "#2CA2F9",
  searchTitleColor: "#2CA2F9",
  miniRightColor: "#2CA2F9"
});

theme.netBaseRed = Object.assign({}, theme.mangoYellow, {
  appHeaderBgColor: "#D43C33",
  activeColor: "#D43C33",
  searchTitleColor: "#D43C33",
  miniRightColor: "#D43C33"
});

theme.qqGreen = Object.assign({}, theme.mangoYellow, {
  appHeaderBgColor: "#31C27C",
  activeColor: "#31C27C",
  searchTitleColor: "#31C27C",
  miniRightColor: "#31C27C"
});

let getThemeStyle = (theme) => {
  if (!theme) {
    return "";
  }
  return `
    .theme-root {
      color: ${theme.rootColor};
      background-color: ${theme.rootBgColor};
    }
    .theme-app-header {
      color: ${theme.appHeaderColor};
      background-color: ${theme.appHeaderBgColor};
    }
    .theme-music-tab {
      color: ${theme.tabColor};
      background-color: ${theme.tabBgColor};
    }
    .theme-recommend-title {
      color: ${theme.activeColor};
    }
    .theme-album-wrapper {
      color: ${theme.albumColor};
    }
    .theme-album-wrapper .album-name {
      color: ${theme.albumNameColor}
    }
    .theme-ranking-wrapper {
      background-color: ${theme.rankingWrapperBgColor};
    }
    .theme-ranking-wrapper .ranking-title {
      color: ${theme.albumNameColor};
    }
    .theme-ranking-wrapper .singer {
      color: ${theme.rankingSingerColor};
    }
    .theme-music-singers .choose {
      color: ${theme.activeColor} !important;
      border: 1px solid ${theme.activeColor} !important;
    }
    .theme-search {
      background-color: ${theme.searchBgColor};
    }
    .theme-search .title {
      color: ${theme.searchTitleColor};
    }
    .theme-search .hot-item {
      border: 1px solid ${theme.searchHotBorderColor};
      color: ${theme.searchHotColor};
      background-color: ${theme.searchBoxBgColor};
    }
    .theme-search-box {
      background-color: ${theme.searchBoxBgColor};
    }
    .theme-search-box input {
      color: ${theme.rootColor};
    }
    .theme-search-box-wrapper {
      background-color: ${theme.searchBoxWrapperBgColor};
    }
    .theme-search-result .singer {
      color: ${theme.albumColor};
    }
    .theme-search-result .singer-wrapper .singer {
      color: ${theme.rootColor};
    }
    .theme-search-result .singer-wrapper .info {
      color: ${theme.albumColor};
    }
    .theme-search-result .result-container .album-wrapper,
    .theme-search-result .result-container .singer-wrapper,
    .theme-search-result .result-container .song-wrapper {
      border-top: 1px solid ${theme.searchResultBorderColor};
    }
    .theme-detail-wrapper {
      background-color: ${theme.detailBgColor};
    }
    .theme-detail-wrapper .song-name {
      color: ${theme.detailSongColor};
    }
    .theme-detail-wrapper .song-singer {
      color: ${theme.detailSingerColor};
    }
    .theme-mini-player {
      background-color: ${theme.miniPlayerBgColor};
    }
    .theme-mini-player .player-img {
      border: 2px solid ${theme.miniImgBorderColor};
    }
    .theme-mini-player .progress-bar {
      background-color: ${theme.miniProgressBarBgColor} !important;
    }
    .theme-mini-player .progress {
      background-color: ${theme.miniRightColor} !important;
    }
    .theme-mini-player .player-right {
      color: ${theme.miniRightColor};
    }
    .theme-mini-player .song {
      color: ${theme.miniSongColor};
    }
    .theme-mini-player .singer {
      color: ${theme.detailSingerColor};
    }
    .music-album, .ranking-info, .music-singer {
      background-color: ${theme.detailBgColor};
    }
    .router-link.router-link-active {
      color: ${theme.activeColor} !important;
      border-bottom: 2px solid ${theme.activeColor};
    }
  `;
};

let setThemeStyle = (theme) => {
  let styleText = getThemeStyle(theme);
  let oldStyle = document.getElementById("theme");
  const style = document.createElement("style");
  style.id = "theme";
  style.type = "text/css";
  style.innerHTML = styleText;
  oldStyle ? document.head.replaceChild(style, oldStyle) : document.head.appendChild(style);
};

// 设置主题
setThemeStyle(theme[localStorage.getTheme()]);

export {theme, setThemeStyle}
