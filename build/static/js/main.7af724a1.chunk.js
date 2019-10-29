(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(14),l=t(2),i=function(e){var n=e.handleSearch;return r.a.createElement("div",null,"Filter shown with: ",r.a.createElement("input",{onChange:n}))},m=function(e){var n=e.addName,t=e.handleNameChange,a=e.handleNumberChange,u=e.newName,c=e.newNumber;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:u,onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add"))))},d=function(e){var n=e.name,t=e.number,a=e.id,u=e.deleteName;return r.a.createElement("li",null,n," ",t," ",r.a.createElement("button",{onClick:function(){return u(n,a)}},"Delete")," ")},f=function(e){var n=e.filteredPersons,t=e.deleteName;return r.a.createElement("div",null,r.a.createElement("ul",null,n.map(function(e){return r.a.createElement(d,{name:e.name,number:e.number,id:e.id,deleteName:t,key:e.id})})))},s=function(e){var n=e.message,t=e.status;return null===n?null:"Error"===t?r.a.createElement("div",{className:"error"},n):r.a.createElement("div",{className:"success"},n)},b=t(3),h=t.n(b),E="/api/persons",v=function(){return h.a.get(E).then(function(e){return e.data})},w=function(e){return h.a.post(E,e).then(function(e){return e.data})},p=function(e){return h.a.delete("".concat(E,"/").concat(e)).then(function(){return e})},N=function(e,n){return h.a.put("".concat(E,"/").concat(e),n).then(function(e){return e.data})},g=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),d=Object(l.a)(c,2),b=d[0],h=d[1],E=Object(a.useState)(""),g=Object(l.a)(E,2),j=g[0],C=g[1],O=Object(a.useState)([]),y=Object(l.a)(O,2),S=y[0],k=y[1],L=Object(a.useState)(null),D=Object(l.a)(L,2),T=D[0],A=D[1],P=Object(a.useState)(null),J=Object(l.a)(P,2),x=J[0],B=J[1];Object(a.useEffect)(function(){v().then(function(e){u(e),k(e)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{message:T,status:x}),r.a.createElement(i,{handleSearch:function(e){var n=e.target.value.toLowerCase(),a=t.filter(function(e){return e.name.toLowerCase().includes(n)});k(a)}}),r.a.createElement("h2",null,"Add new"),r.a.createElement(m,{addName:function(e){if(e.preventDefault(),t.some(function(e){return e.name.toLowerCase()===b.toLowerCase()})){var n=t.find(function(e){return e.name.toLowerCase()===b.toLowerCase()});if(n.number!==j){if(window.confirm("".concat(n.name," is already added to phonebook. Do you want to replace phone number?"))){var a=Object(o.a)({},n,{number:j});N(n.id,a).then(function(e){u(t.map(function(t){return t.id!==n.id?t:e})),k(t.map(function(t){return t.id!==n.id?t:e})),h(""),C(""),A("Updated number for ".concat(e.name)),setTimeout(function(){A(null)},3e3)}).catch(function(e){A("".concat(n.name," has been already removed from the database")),B("Error"),h(""),C(""),setTimeout(function(){A(null),B(null)},3e3)})}return}return h(""),C(""),alert("".concat(n.name," with number ").concat(n.number," is already added to the database"))}var r={name:b.trim(),number:j,id:void 0};w(r).then(function(e){u(t.concat(e)),k(t.concat(e)),h(""),C(""),A("Added ".concat(e.name)),setTimeout(function(){A(null)},3e3)}).catch(function(e){A(e.response.data.error.message),B("Error"),h(""),C(""),setTimeout(function(){A(null),B(null)},3e3)})},handleNameChange:function(e){h(e.target.value)},handleNumberChange:function(e){C(e.target.value)},newName:b,newNumber:j}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{filteredPersons:S,deleteName:function(e,n){window.confirm("Do you really want to remove ".concat(e))&&p(n).then(function(e){var n=t.filter(function(n){return n.id!==e}),a=t.find(function(n){return n.id===e});u(n),k(n),A("Deleted ".concat(a.name)),setTimeout(function(){A(null)},3e3)})}}))};t(38);c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.7af724a1.chunk.js.map