(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aeb9"],{"04b1":function(t,a,e){},3124:function(t,a,e){"use strict";var s=e("04b1"),l=e.n(s);l.a},"3ecc":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"md-layout"},[e("div",{staticClass:"md-layout-item md-size-100"},[e("md-card",[e("md-card-header",{staticClass:"md-card-header-icon md-card-header-green"},[e("div",{staticClass:"card-icon"},[e("md-icon",[t._v("assignment")])],1),e("h4",{staticClass:"title"},[t._v("Simple Table")])]),e("md-card-content",[e("md-table",{scopedSlots:t._u([{key:"md-table-row",fn:function(a){var s=a.item;return e("md-table-row",{},[e("md-table-cell",{attrs:{"md-label":"#"}},[t._v(t._s(s.id))]),e("md-table-cell",{attrs:{"md-label":"Name"}},[t._v(t._s(s.name))]),e("md-table-cell",{attrs:{"md-label":"Country"}},[t._v(t._s(s.country))]),e("md-table-cell",{attrs:{"md-label":"City"}},[t._v(t._s(s.city))]),e("md-table-cell",{attrs:{"md-label":"Salary"}},[t._v(t._s(s.salary))]),e("md-table-cell",{class:t.getAlignClasses(s),attrs:{"md-label":"Actions"}},[e("md-button",{staticClass:"md-just-icon",class:t.getClass(s.icon1,s.id)},[e("md-icon",[t._v(t._s(s.icon1))])],1),e("md-button",{staticClass:"md-just-icon",class:t.getClass(s.icon2,s.id)},[e("md-icon",[t._v(t._s(s.icon2))])],1),e("md-button",{staticClass:"md-just-icon",class:t.getClass(s.icon3,s.id)},[e("md-icon",[t._v(t._s(s.icon3))])],1)],1)],1)}}]),model:{value:t.tableData,callback:function(a){t.tableData=a},expression:"tableData"}})],1)],1)],1),e("div",{staticClass:"md-layout-item md-size-100"},[e("md-card",[e("md-card-header",{staticClass:"md-card-header-icon md-card-header-green"},[e("div",{staticClass:"card-icon"},[e("md-icon",[t._v("assignment")])],1),e("h4",{staticClass:"title"},[t._v("Striped Table with Checkboxes")])]),e("md-card-content",[e("md-table",{staticClass:"table-striped",scopedSlots:t._u([{key:"md-table-row",fn:function(a){var s=a.item;return e("md-table-row",{attrs:{"md-selectable":"multiple","md-auto-select":""}},[e("md-table-cell",{attrs:{"md-label":"#"}},[t._v(t._s(s.id))]),e("md-table-cell",{attrs:{"md-label":"Product Name"}},[t._v(t._s(s.name))]),e("md-table-cell",{attrs:{"md-label":"Type"}},[t._v(t._s(s.type))]),e("md-table-cell",{attrs:{"md-label":"Qty"}},[t._v(t._s(s.qty))]),e("md-table-cell",{attrs:{"md-label":"Price"}},[t._v(t._s(s.price))]),e("md-table-cell",{class:t.getAlignClasses(s),attrs:{"md-label":"Amount"}},[t._v(t._s(s.amount))])],1)}}]),model:{value:t.tableDataStriped,callback:function(a){t.tableDataStriped=a},expression:"tableDataStriped"}}),e("div",{staticClass:"table table-stats table-striped"},[e("div",{staticClass:"td-price"},[e("div",{staticClass:"td-total"},[t._v("\n              Total\n            ")]),e("span",[e("small",[t._v("€")]),t._v("\n              €12,999\n            ")])])])],1)],1)],1),e("div",{staticClass:"md-layout-item md-size-100"},[e("md-card",[e("md-card-header",{staticClass:"md-card-header-icon md-card-header-green"},[e("div",{staticClass:"card-icon"},[e("md-icon",[t._v("assignment")])],1),e("h4",{staticClass:"title"},[t._v("Shopping Cart Table")])]),e("md-card-content",[e("md-table",{staticClass:"table-shopping",scopedSlots:t._u([{key:"md-table-row",fn:function(a){var s=a.item;return e("md-table-row",{},[e("md-table-cell",{attrs:{"md-label":""}},[e("div",{staticClass:"img-container"},[e("img",{attrs:{src:s.image,alt:"products"}})])]),e("md-table-cell",{staticClass:"td-name",attrs:{"md-label":"Product"}},[e("a",{attrs:{href:"#jacket"}},[t._v(t._s(s.product))]),e("br"),e("small",[t._v(t._s(s.category))])]),e("md-table-cell",{attrs:{"md-label":"Color"}},[t._v(t._s(s.color))]),e("md-table-cell",{attrs:{"md-label":"Size"}},[t._v(t._s(s.size))]),e("md-table-cell",{staticClass:"td-number",attrs:{"md-label":"Price"}},[e("small",[t._v("€")]),t._v("\n              "+t._s(s.price)+"\n            ")]),e("md-table-cell",{staticClass:"td-number",attrs:{"md-label":"Qty"}},[t._v("\n              "+t._s(s.qty)+"\n              "),e("div",{staticClass:"md-group"},[e("md-button",{staticClass:"md-round md-info md-just-icon",nativeOn:{click:function(a){return t.increaseQuantity(s)}}},[e("md-icon",[t._v("add")])],1),e("md-button",{staticClass:"md-round md-info md-just-icon",nativeOn:{click:function(a){return t.decreaseQuantity(s)}}},[e("md-icon",[t._v("remove")])],1)],1)]),e("md-table-cell",{staticClass:"td-number",attrs:{"md-label":"Amount"}},[e("small",[t._v("€")]),t._v("\n              "+t._s(s.amount)+"\n            ")]),e("md-table-cell",[e("md-button",{staticClass:"md-just-icon md-round md-simple"},[e("md-icon",[t._v("close")])],1)],1)],1)}}]),model:{value:t.shoppingCartTable,callback:function(a){t.shoppingCartTable=a},expression:"shoppingCartTable"}}),e("div",{staticClass:"table table-stats"},[e("div",{staticClass:"td-price"},[e("div",{staticClass:"td-total"},[t._v("\n              Total\n            ")]),e("span",[e("small",[t._v("€")]),t._v("\n              "+t._s(t.shoppingTotal)+"\n            ")])]),e("div",{staticClass:"text-right"},[e("md-button",{staticClass:"md-info md-round"},[t._v("\n              Complete Purchase\n              "),e("md-icon",[t._v("keyboard_arrow_right")])],1)],1)])],1)],1)],1)])},l=[],i={data:function(){return{tableData:[{id:1,name:"Dakota Rice",salary:"$36.738",country:"Niger",city:"Oud-Turnhout",icon1:"person",icon2:"edit",icon3:"close"},{id:2,name:"Minerva Hooper",salary:"$23,789",country:"Curaçao",city:"Sinaai-Waas",icon1:"person",icon2:"edit",icon3:"close"},{id:3,name:"Sage Rodriguez",salary:"$56,142",country:"Netherlands",city:"Baileux",icon1:"person",icon2:"edit",icon3:"close"},{id:4,name:"Philip Chaney",salary:"$38,735",country:"Korea, South",city:"Overland Park",icon1:"person",icon2:"edit",icon3:"close"},{id:5,name:"Doris Greene",salary:"$63,542",country:"Malawi",city:"Feldkirchen in Kärnten",icon1:"person",icon2:"edit",icon3:"close"}],tableDataStriped:[{id:1,name:"Moleskine Agenda",type:"Office",qty:"25",price:"€ 49",amount:"€ 1,225"},{id:2,name:"Stabilo Pen",type:"Office",qty:"30",price:"€ 10",amount:"€ 300"},{id:3,name:"A4 Paper Pack",type:"Office",qty:"50",price:"€ 10.99",amount:"€ 109"},{id:4,name:"Apple Ipad",type:"Meeting",qty:"10",price:"€ 499.00",amount:"€ 4,990"},{id:5,name:"Apple Iphone",type:"Communication",qty:"10",price:"€ 599.00",amount:"€ 5,990"}],shoppingCartTable:[{image:"./img/product1.jpg",product:"Spring Jacket",category:"by Dolce&Gabbana",color:"Red",size:"M",price:549,qty:1,amount:549},{image:"./img/product2.jpg",product:"Short Pants",category:"by Gucci",color:"Purple",size:"M",price:499,qty:2,amount:998},{image:"./img/product3.jpg",product:"Pencil Skirt",category:"by Valentino",color:"Red",size:"M",price:799,qty:1,amount:799}]}},computed:{shoppingTotal:function(){return this.shoppingCartTable.reduce(function(t,a){return t+a.amount},0)}},methods:{getClass:function(t,a){var e="";switch(t){case"person":e="md-info";break;case"edit":e="md-success";break;case"close":e="md-danger";break}switch(a){case 1:case 5:break;case 2:case 4:e="".concat(e," md-round");break;case 3:e="".concat(e," md-simple");break}return e},getAlignClasses:function(t){var a=t.id;return{"text-right":a}},increaseQuantity:function(t){t.qty++,this.computeAmount(t)},decreaseQuantity:function(t){t.qty>1&&(t.qty--,this.computeAmount(t))},computeAmount:function(t){t.amount=t.qty*t.price}}},c=i,n=(e("3124"),e("2877")),d=Object(n["a"])(c,s,l,!1,null,"5ccbffd0",null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-aeb9.01528ff4.js.map