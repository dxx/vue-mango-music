webpackJsonp([5],{"2cKQ":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("hNqL"),i=a("VeAG"),s=a("Sgn/"),o=a("9cIF"),r=a("T452"),c=a("W7Ek"),d=a("A6Hu"),u={name:"singer",data:function(){return{loading:!0,title:"歌曲",data:{name:"",img:a("eBXX"),desc:"",songs:[]},toastShow:!1}},methods:{getSongUrl:function(t,e){Object(o.a)(e).then(function(e){if(e&&e.code===r.a&&e.data.items){var a=e.data.items[0];t.url="http://dl.stream.qqmusic.qq.com/"+a.filename+"?vkey="+a.vkey+"&guid=3655047200&fromtag=66"}})}},created:function(){var t=this;Object(s.a)(this.$route.params.singerId).then(function(e){if(e&&e.code===r.a){var a=c.b(e.data),n=[];e.data.list.forEach(function(e){if(1!==e.musicData.pay.payplay){var a=d.b(e.musicData);t.getSongUrl(a,a.mId),n.push(a)}}),t.data={name:a.name,img:a.img,desc:"",songs:n},t.loading=!1}}).catch(function(){t.toastShow=!0,setTimeout(function(){t.toastShow=!1,t.loading=!1},1e3)})},components:{Toast:n.a,Detail:i.a}},g={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"music-singer"},[e("detail",{attrs:{title:this.title,data:this.data,loading:this.loading}}),this._v(" "),e("toast",{attrs:{show:this.toastShow,content:"加载失败..."}})],1)},staticRenderFns:[]};var l=a("VU/8")(u,g,!1,function(t){a("T48w")},"data-v-2072bce9",null);e.default=l.exports},"Sgn/":function(t,e,a){"use strict";e.b=function(t,e){var a=i()({},o.c,{g_tk:5381,loginUin:0,hostUin:0,platform:"yqq",needNewCode:0,channel:"singer",page:"list",key:e,pagenum:t,pagesize:100});return Object(s.a)(o.d.singerList,a,o.b)},e.a=function(t){var e=i()({},o.c,{g_tk:5381,loginUin:0,hostUin:0,platform:"yqq",needNewCode:0,singermid:t,order:"listen",begin:0,num:100,songstatus:1});return Object(s.a)(o.d.singerInfo,e,o.b)};var n=a("woOf"),i=a.n(n),s=a("WlK5"),o=a("T452")},T48w:function(t,e){}});
//# sourceMappingURL=5.f6bbeb1d7b7f2d967efe.js.map