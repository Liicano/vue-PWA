(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["3b7b"],{"3b7b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item md-small-size-100",staticStyle:{padding:"0"}},[a("v-card",{staticClass:"mx-auto",attrs:{color:"#01C73E",dark:"","max-width":"400"}},[a("v-card-actions",[null!=t.user?a("v-list-tile",{staticClass:"grow"},[t.user.data.imgUrl?a("v-list-tile-avatar",{attrs:{color:"grey darken-3"}},[a("v-img",{staticClass:"elevation-6",attrs:{src:t.user.data.imgUrl}})],1):a("v-list-tile-avatar",{attrs:{color:"grey darken-3"}},[a("v-img",{staticClass:"elevation-6",attrs:{src:t.getImg()}})],1),a("v-list-tile-content",[a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item md-size-70"},[a("h6",[t._v(t._s(t.movement.name))]),a("h6",[a("i",[t._v(t._s(t.user.data.name))])])])])])],1):t._e()],1)],1)],1)]),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item md-small-size-100",staticStyle:{padding:"0"}},[a("item-list",{attrs:{items:t.items}})],1)]),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item md-small-size-100",staticStyle:{padding:"0"}},[a("totales")],1)]),a("v-snackbar",{attrs:{color:"green","multi-line":!1,timeout:4e3,vertical:!1},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[a("b",[t._v("Registrate aqui")]),a("v-btn",{attrs:{dark:"",flat:""},on:{click:function(e){return t.goToRegister()}}},[t._v("Registrar")])],1)],1)},i=[],c=a("cebc"),n=a("2f62"),r=a("85b8"),l=a("59f6"),o={data:function(){return{showSnackbar:null,items:null,user:null,movement:null,active:!0}},components:{totales:r["a"],itemList:l["a"]},created:function(){var t=this;this.getCurrentIncome(this.$route.params.id).then(function(e){t.showUser(e),t.movement=e})},methods:Object(c["a"])({},Object(n["b"])({getCurrentIncome:"incomes/getIncome"}),{showUser:function(t){"User"!=t.client.type?this.user=t.responsable:this.user=t.client},goToRegister:function(){window.location.href="https://app.unabase.com"},getImg:function(){return a("1b36")}}),computed:Object(c["a"])({},Object(n["c"])({getIncome:"incomes/getIncome"}),{activeFab:function(){switch(this.tabs){case"one":return{class:"purple",icon:"account_circle"};case"two":return{class:"red",icon:"edit"};case"three":return{class:"green",icon:"keyboard_arrow_up"};default:return{}}}})},u=o,m=a("2877"),d=Object(m["a"])(u,s,i,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=3b7b.97930c26.js.map