(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4925"],{"70a2":function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"md-layout text-center"},[e("div",{staticClass:"md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"},[e("login-card",{attrs:{"header-color":"green"}},[e("md-field",{staticClass:"md-form-group mdl-typography--text-center",attrs:{slot:"title"},slot:"title"},[e("div",{staticClass:"row"},[e("img",{attrs:{src:a("1a7f"),alt:""}})])]),e("center",{attrs:{slot:"inputs"},slot:"inputs"},[e("md-field",{staticClass:"md-form-group"},[e("md-input",{attrs:{type:"password",placeholder:s.lg.user.password},model:{value:s.password1,callback:function(t){s.password1=t},expression:"password1"}})],1),e("md-field",{staticClass:"md-form-group"},[e("md-input",{attrs:{type:"password",placeholder:s.lg.user.passwordConfirm},model:{value:s.password2,callback:function(t){s.password2=t},expression:"password2"}})],1),e("md-button",{staticClass:"md-simple md-success md-lg",attrs:{slot:"footer"},on:{click:s.restart},slot:"footer"},[s._v(s._s(s.lg.user.changePassword))])],1)],1)],1)])},r=[],o=a("cebc"),d=a("2af9"),i=a("2f62"),l=a("1881"),n={name:"Restart",components:{LoginCard:d["j"]},data:function(){return{id:null,password1:null,password2:null}},computed:{},methods:Object(o["a"])({},Object(i["b"])({setPassword:"users/setPassword"}),{restart:function(){var s=this;this.setPassword({password:this.password1,newPassword:this.password2,id:this.id}).then(function(t){s.$router.push("/")}).catch(function(t){s.$toasted.show(""+l["a"].user.restartPasswordFail)})}}),mounted:function(){this.id=this.$route.query.id}},c=n,u=(a("fe5b"),a("2877")),p=Object(u["a"])(c,e,r,!1,null,null,null);t["default"]=p.exports},"9f27":function(s,t,a){},fe5b:function(s,t,a){"use strict";var e=a("9f27"),r=a.n(e);r.a}}]);
//# sourceMappingURL=chunk-4925.5ad62382.js.map