(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b24"],{"8e97":function(t,e,s){},dcc9:function(t,e,s){"use strict";var a=s("8e97"),i=s.n(a);i.a},e6c9:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"md-layout"},[s("div",{staticClass:"md-layout-item"},[s("signup-card",[s("h2",{staticClass:"title text-center",attrs:{slot:"title"},slot:"title"},[t._v("Register")]),s("div",{staticClass:"md-layout-item md-size-50 md-medium-size-50 md-small-size-100 ml-auto",attrs:{slot:"content-left"},slot:"content-left"},t._l(t.contentLeft,function(e){return s("div",{key:e.title,staticClass:"info info-horizontal"},[s("div",{class:"icon "+e.colorIcon},[s("md-icon",[t._v(t._s(e.icon))])],1),s("div",{staticClass:"description"},[s("h4",{staticClass:"info-title"},[t._v(t._s(e.title))]),s("p",{staticClass:"description"},[t._v(t._s(e.description))])])])}),0),s("div",{staticClass:"md-layout-item md-size-50 md-medium-size-50 md-small-size-100 mr-auto",attrs:{slot:"content-right"},slot:"content-right"},[s("md-field",{staticClass:"md-form-group"},[s("md-icon",[t._v("person")]),s("md-input",{directives:[{name:"validate",rawName:"v-validate",value:"alpha|required",expression:"'alpha|required'"}],attrs:{type:"text",placeholder:t.lg.user.name,name:"name"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),s("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("name")))]),t.errors.first("name")?s("md-icon",{staticClass:"left text-danger"},[t._v("warning")]):t._e(),s("md-field",{staticClass:"md-form-group"},[s("md-icon",[t._v("email")]),s("md-input",{directives:[{name:"validate",rawName:"v-validate",value:"email|required",expression:"'email|required'"}],attrs:{name:"email",type:"email",placeholder:t.lg.user.email},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),s("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("email")))]),t.errors.first("email")?s("md-icon",{staticClass:"left text-danger"},[t._v("warning")]):t._e(),s("md-checkbox",{on:{click:function(e){t.terms=!t.terms}},model:{value:t.terms,callback:function(e){t.terms=e},expression:"terms"}},[t._v("\n          "+t._s(t.lg.base.term1)+"\n          "),s("a",{attrs:{to:"/terms"}},[t._v(t._s(t.lg.base.term2))]),t._v(".\n        ")]),s("div",{staticClass:"button-container"},[s("md-button",{staticClass:"md-success md-round mt-4",attrs:{slot:"footer",href:""},on:{click:t.register},slot:"footer"},[t._v(t._s(t.lg.user.register))])],1),s("div",{staticClass:"button-container"},[s("md-button",{staticClass:"md-success md-round mt-4",attrs:{slot:"footer",href:"",to:"/login"},slot:"footer"},[t._v(t._s(t.lg.user.haveAccount))])],1)],1)])],1)])},i=[],n=s("2d7d"),o=s.n(n),r=(s("7f7f"),s("2af9")),l={name:"Register",components:{SignupCard:r["p"],Gauth:r["e"]},data:function(){return{name:null,username:null,terms:!1,email:null,password:null,contentLeft:[{colorIcon:"icon-success",icon:"timeline",title:"Marketing"},{colorIcon:"icon-danger",icon:"code",title:"Fully Coded in HTML5"},{colorIcon:"icon-info",icon:"group",title:"Built Audience"}],inputs:[{icon:"face",name:this.lg.user.name,nameAttr:"name",type:"text"},{icon:"email",name:this.lg.user.email,nameAttr:"email",type:"email"}]}},methods:{register:function(){var t=this;if(null!=this.name&&null!=this.email)if(this.terms)if(this.errors.items.length>0)this.$toasted.show("Uno o mas campos erroneos!");else{var e=this.email,s=this.name,a=this.username,i=this.password;this.$store.dispatch("users/register",{email:e,name:s,username:a,password:i}).then(function(e){t.$router.push("/login"),t.$toasted.show("Verifica tu correo y activa tu cuenta!",{type:"info"})}).catch(function(e){console.warn(e),console.warn(e.response),console.warn(e.statusText);var s=e.status||e.response.status,a=new o.a;a.set(403,"warning"),a.set(404,"danger"),a.set(500,"danger"),a.set(401,"info"),a.set(409,"warning"),t.$toasted.show(" "+e.statusText||!1,{type:a.get(s)})})}else this.$toasted.show("Debes aceptar los terminos y condiciones!",{type:"info"});else this.$toasted.show("Uno o mas campos vacios!",{type:"danger"})}}},c=l,m=(s("dcc9"),s("2877")),d=Object(m["a"])(c,a,i,!1,null,"15f7a473",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-1b24.7ea5420e.js.map