(window.webpackJsonp=window.webpackJsonp||[]).push([[21,15,16],{375:function(t,r,n){"use strict";n.r(r);var e=n(26),o=(n(60),{data:function(){return{transports:[]}},mounted:function(){var t=this;return Object(e.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return"/api/v1/transports",r.prev=1,r.next=4,t.$axios.$get("/api/v1/transports",{headers:{"x-api-key":t.$config.apiKey}});case 4:n=r.sent,t.transports=n.data,r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),console.error("Error retrieving transports:",r.t0);case 11:case"end":return r.stop()}}),r,null,[[1,8]])})))()}}),c=n(71),component=Object(c.a)(o,(function(){return(0,this._self._c)("b-table",{attrs:{striped:"",hover:"",items:this.transports}})}),[],!1,null,null,null);r.default=component.exports},380:function(t,r,n){"use strict";n.r(r);var e=n(26),o=(n(60),{components:{TransportTable:n(375).default},data:function(){return{}},mounted:function(){return Object(e.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},methods:{}}),c=n(71),component=Object(c.a)(o,(function(){var t=this,r=t._self._c;return r("div",[r("h3",[t._v("Transports Dashboard")]),t._v(" "),r("TransportTable")],1)}),[],!1,null,null,null);r.default=component.exports;installComponents(component,{TransportTable:n(375).default})},401:function(t,r,n){"use strict";n.r(r);var e={components:{TransportsDashboard:n(380).default}},o=n(71),component=Object(o.a)(e,(function(){return(0,this._self._c)("TransportsDashboard")}),[],!1,null,null,null);r.default=component.exports;installComponents(component,{TransportsDashboard:n(380).default})}}]);