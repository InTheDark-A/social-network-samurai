(this["webpackJsonpsocial-network-samurai"]=this["webpackJsonpsocial-network-samurai"]||[]).push([[4],{234:function(t,e,s){t.exports={"form-control":"FormControls_form-control__3LzEh",formControl:"FormControls_formControl__3_THR",error:"FormControls_error__15mi5",formSummaryError:"FormControls_formSummaryError__2zZr7"}},235:function(t,e,s){"use strict";s.d(e,"b",(function(){return u})),s.d(e,"a",(function(){return p}));var r=s(3),a=s(38),o=(s(0),s(234)),n=s.n(o),i=(s(112),s(1)),c=function(t){t.input;var e=t.meta,s=(t.element,Object(a.a)(t,["input","meta","element"])),r=e.touched&&e.error;return Object(i.jsxs)("div",{className:n.a.formControl+" "+(r?n.a.error:""),children:[Object(i.jsx)("div",{children:s.children}),r&&Object(i.jsx)("span",{children:Object(i.jsx)("b",{children:e.error})})]})},u=function(t){var e=t.input,s=(t.meta,Object(a.a)(t,["input","meta"]));return Object(i.jsx)(c,Object(r.a)(Object(r.a)({},t),{},{children:Object(i.jsx)("textarea",Object(r.a)(Object(r.a)({},e),s))}))},p=function(t){var e=t.input,s=(t.meta,Object(a.a)(t,["input","meta"]));return Object(i.jsx)(c,Object(r.a)(Object(r.a)({},t),{},{children:Object(i.jsx)("input",Object(r.a)(Object(r.a)({},e),s))}))}},237:function(t,e,s){"use strict";s.d(e,"b",(function(){return r})),s.d(e,"a",(function(){return a}));var r=function(t){if(!t)return"Field is required"},a=function(t){return function(e){if(e&&e.length>t)return"Max length is ".concat(t," symbols")}}},256:function(t,e,s){t.exports={wrapper:"ProfileInfo_wrapper__3ZNgn",descriptionBlock:"ProfileInfo_descriptionBlock__3-5_P",status:"ProfileInfo_status__3X1wy",statusA:"ProfileInfo_statusA__1o1oH"}},299:function(t,e,s){t.exports={wrapper:"Profile_wrapper__1InWB",body:"Profile_body__1pN5T",background:"Profile_background__vnSnR"}},300:function(t,e,s){t.exports={postsBlock:"MyPosts_postsBlock__3w1ZZ",posts:"MyPosts_posts__DZz81"}},301:function(t,e,s){t.exports={item:"Post_item__2X_zq"}},304:function(t,e,s){"use strict";s.r(e);var r=s(3),a=s(22),o=s(23),n=s(25),i=s(24),c=s(0),u=s.n(c),p=s(299),d=s.n(p),l=s(256),j=s.n(l),b=s(32),f=s(1),h=function(t){Object(n.a)(s,t);var e=Object(i.a)(s);function s(){var t;Object(a.a)(this,s);for(var r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return(t=e.call.apply(e,[this].concat(o))).state={editMode:!1,status:t.props.status},t.activateEditMode=function(){t.setState({editMode:!0})},t.deactivateEditMode=function(){t.setState({editMode:!1}),t.props.updateStatus(t.state.status)},t.onStatusChange=function(e){t.setState({status:e.currentTarget.value})},t}return Object(o.a)(s,[{key:"componentDidUpdate",value:function(t,e,s){t.status!==this.props.status&&this.setState({status:this.props.status})}},{key:"render",value:function(){return Object(f.jsxs)("div",{children:[!this.state.editMode&&Object(f.jsx)("div",{children:Object(f.jsx)("span",{className:j.a.statusA,onClick:this.activateEditMode.bind(this),children:this.props.status||"------"})}),this.state.editMode&&Object(f.jsx)("div",{children:Object(f.jsx)("input",{onChange:this.onStatusChange,type:"text",autoFocus:!0,onBlur:this.deactivateEditMode.bind(this),value:this.state.status})})]})}}]),s}(u.a.Component),O=function(t){return t.profile?(console.log(t),Object(f.jsx)("div",{children:Object(f.jsxs)("div",{className:j.a.descriptionBlock,children:[Object(f.jsx)("img",{src:t.profile.photos.small}),Object(f.jsxs)("div",{className:j.a.status,children:[Object(f.jsxs)("p",{children:["\u0421\u0442\u0430\u0442\u0443\u0441: ",t.profile.aboutMe]}),Object(f.jsx)(h,{status:t.status,updateStatus:t.updateStatus})]})]})})):Object(f.jsx)(b.a,{})},m=s(62),x=s(300),_=s.n(x),v=s(301),g=s.n(v),k=function(t){return Object(f.jsxs)("div",{className:g.a.item,children:[Object(f.jsx)("img",{src:"https://yt3.ggpht.com/ytc/AAUvwnhAqEAF26--bgeyaisBjBaDBiTBW1BaUsuUOYFRQA=s900-c-k-c0x00ffffff-no-rj",alt:"avatar"}),t.message,Object(f.jsx)("div",{children:Object(f.jsxs)("span",{children:[t.likesCount," likes"]})})]})},S=s(112),y=s(113),P=s(237),C=s(235),A=Object(P.a)(15),M=u.a.memo((function(t){var e=t.postsData.map((function(t){return Object(f.jsx)(k,{message:t.message,likesCount:t.likesCount},t.id)}));return Object(f.jsxs)("div",{className:_.a.postsBlock,children:["My posts",Object(f.jsx)(w,{onSumbit:function(e){t.addPost(e.post),e.post=""}}),Object(f.jsx)("div",{className:_.a.posts,children:e})]})})),w=Object(y.a)({form:"profileAddPost"})((function(t){return Object(f.jsxs)("form",{onSubmit:t.handleSubmit(t.onSumbit),children:[Object(f.jsx)("div",{children:Object(f.jsx)(S.a,{component:C.b,name:"post",placeholder:"\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0442\u0435\u043a\u0441\u0442 \u043f\u043e\u0441\u0442\u0430",validate:[P.b,A]})}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{children:"Add post"})})]})})),B=M,N=s(20),U=Object(N.b)((function(t){return{postsData:t.profilePage.postsData}}),{addPost:m.a})(B),I=s.p+"static/media/back_profile.c8bda5dd.jpg",E=function(t){return Object(f.jsxs)("div",{className:d.a.wrapper,children:[Object(f.jsxs)("div",{className:d.a.body,children:[Object(f.jsx)(O,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),Object(f.jsx)("div",{className:d.a.background,children:Object(f.jsx)("img",{src:I,alt:"back"})})]}),Object(f.jsx)(U,{})]})},F=s(7),D=s(18),z=function(t){Object(n.a)(s,t);var e=Object(i.a)(s);function s(){return Object(a.a)(this,s),e.apply(this,arguments)}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var t=this.props.match.params.userId;t||(this.props.isAuth?t=this.props.authorizedUserId:this.props.history.push("/login")),this.props.getUserProfile(t),this.props.getUserStatus(t)}},{key:"render",value:function(){return!1===this.props.isAuth?Object(f.jsx)(F.a,{to:"/login"}):(console.log(this.props),Object(f.jsx)(E,Object(r.a)(Object(r.a)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus})))}}]),s}(u.a.Component);e.default=Object(D.d)(Object(N.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:m.c,getUserStatus:m.d,updateStatus:m.e}),F.f)(z)}}]);
//# sourceMappingURL=4.0ed22bcc.chunk.js.map