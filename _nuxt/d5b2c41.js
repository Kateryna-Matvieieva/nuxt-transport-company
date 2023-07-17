(window.webpackJsonp=window.webpackJsonp||[]).push([[0,3,4,5,8,9,10,11,12,13],{376:function(e,t,o){"use strict";o.r(t);o(5),o(4),o(6),o(3),o(7);var r=o(0),n=o(29),l=(o(15),o(2),o(1),o(382)),c=o(383),d=o(384),m=o(385),v=o(386),f=o(387),h=o(388),_=o(389),w=o(390);function D(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function y(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?D(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):D(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var T={name:"GenericRoutesTable",components:{ViewDetailsDropdownItem:l.default,DeleteRouteDropdownItem:c.default,EditRouteDropdownItem:d.default,CompleteRouteDropdownItem:m.default,DeleteRouteConfirmModal:v.default,CompleteRouteConfirmModal:f.default,RouteDetailsModal:h.default,AssignTransportDropdownItem:_.default,AssignTransportModal:w.default},props:{title:{type:String,required:!0},routes:{type:Array,required:!0},serverError:{type:String,default:null},isLoading:{type:Boolean,default:!1}},data:function(){return{tableFields:[{key:"actions",label:"Actions"},{key:"id",label:"Id"},{key:"start_city",label:"Start City"},{key:"end_city",label:"End City"},{key:"distance",label:"Distance"},{key:"departure_date",label:"Departure Date"},{key:"completion_date",label:"Completion Date"},{key:"transport_type",label:"Transport Type"},{key:"expected_revenue",label:"Expected Revenue"},{key:"plate_number",label:"Plate Number"}],routeToDelete:null,routeToComplete:null,selectedRouteId:null,showDeleteModal:!1,showCompleteModal:!1,routeToAssign:null,showAssignModal:!1,localRoutes:[]}},watch:{routes:function(e){this.localRoutes=Object(n.a)(e)}},computed:{formattedRoutes:function(){return this.localRoutes.map((function(e){var t="".concat(e.distance," km"),o="$".concat(e.expected_revenue);return y(y({},e),{},{departure_date:new Date(e.departure_date).toLocaleDateString(),completion_date:new Date(e.completion_date).toLocaleDateString(),distance:t,expected_revenue:o})}))}},methods:{editRouteTableHandler:function(e){this.$emit("openEditRouteDashboardHandler",e)},prepareForDeletion:function(e){this.routeToDelete=e,this.routeToComplete=null,this.showDeleteModal=!0},deleteRoute:function(e){this.localRoutes=this.localRoutes.filter((function(t){return t.id!==e.id})),this.showDeleteModal=!1},cancelDeletion:function(){this.showDeleteModal=!1},viewDetails:function(e){this.selectedRouteId=e},prepareForCompletion:function(e){this.routeToComplete=e,this.routeToDelete=null,this.showCompleteModal=!0},updateRoute:function(e){this.localRoutes=this.localRoutes.map((function(t){return t.id===e.id?e:t})),this.showCompleteModal=!1,this.$emit("updateRoute",e)},cancelCompletion:function(){this.showCompleteModal=!1},prepareForAssignment:function(e){this.routeToAssign=e,this.showAssignModal=!0},cancelAssignment:function(){this.showAssignModal=!1}},created:function(){this.localRoutes=Object(n.a)(this.routes)}},O=o(71),component=Object(O.a)(T,(function(){var e=this,t=e._self._c;return t("div",[t("h3",[e._v(e._s(e.title))]),e._v(" "),e.isLoading?t("div",[e._v("Loading...")]):e.isLoading||e.serverError||0!==e.localRoutes.length?!e.isLoading&&e.serverError?t("div",{staticClass:"alert alert-danger"},[e._v("\n    "+e._s(e.serverError)+"\n  ")]):t("div",[t("b-table",{attrs:{striped:"",hover:"",items:e.formattedRoutes,fields:e.tableFields},scopedSlots:e._u([{key:"cell(actions)",fn:function(data){return[t("b-dropdown",[t("ViewDetailsDropdownItem",{attrs:{item:data.item},on:{viewDetails:e.viewDetails}}),e._v(" "),t("EditRouteDropdownItem",{attrs:{item:data.item},on:{editRouteTableHandler:e.editRouteTableHandler}}),e._v(" "),t("DeleteRouteDropdownItem",{on:{deleteRoute:function(t){return e.prepareForDeletion(data.item)}}}),e._v(" "),t("AssignTransportDropdownItem",{attrs:{item:data.item},on:{assignTransport:e.prepareForAssignment}}),e._v(" "),"ongoing"===data.item.status?t("CompleteRouteDropdownItem",{attrs:{item:data.item},on:{completeRoute:e.prepareForCompletion}}):e._e()],1)]}}])})],1):t("div",[e._v("No data")]),e._v(" "),t("AssignTransportModal",{attrs:{showModal:e.showAssignModal,routeId:e.routeToAssign},on:{"update:showModal":function(t){e.showAssignModal=t},"update:show-modal":function(t){e.showAssignModal=t},assignTransport:e.updateRoute,cancel:e.cancelAssignment}}),e._v(" "),t("DeleteRouteConfirmModal",{attrs:{showModal:e.showDeleteModal,routeToDelete:e.routeToDelete},on:{"update:showModal":function(t){e.showDeleteModal=t},"update:show-modal":function(t){e.showDeleteModal=t},delete:e.deleteRoute,cancel:e.cancelDeletion}}),e._v(" "),t("CompleteRouteConfirmModal",{attrs:{showModal:e.showCompleteModal,routeToComplete:e.routeToComplete},on:{"update:showModal":function(t){e.showCompleteModal=t},"update:show-modal":function(t){e.showCompleteModal=t},complete:e.updateRoute,cancel:e.cancelCompletion}}),e._v(" "),t("RouteDetailsModal",{attrs:{routeId:e.selectedRouteId},on:{reset:function(t){e.selectedRouteId=null}}})],1)}),[],!1,null,null,null);t.default=component.exports},382:function(e,t,o){"use strict";o.r(t);var r={name:"ViewDetailsDropdownItem",props:{item:{type:Object,required:!0}},methods:{viewDetails:function(){this.$emit("viewDetails",this.item.id)}}},n=o(71),component=Object(n.a)(r,(function(){var e=this;return(0,e._self._c)("b-dropdown-item",{on:{click:e.viewDetails}},[e._v("View details")])}),[],!1,null,null,null);t.default=component.exports},383:function(e,t,o){"use strict";o.r(t);var r={name:"DeleteRouteDropdownItem",methods:{deleteRoute:function(){this.$emit("deleteRoute")}}},n=o(71),component=Object(n.a)(r,(function(){var e=this;return(0,e._self._c)("b-dropdown-item",{on:{click:e.deleteRoute}},[e._v("Delete route")])}),[],!1,null,null,null);t.default=component.exports},384:function(e,t,o){"use strict";o.r(t);o(5),o(4),o(2),o(1),o(6),o(3),o(7);var r=o(0),n=o(35);o(183),o(11),o(20);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={name:"EditRouteDropdownItem",props:{item:{type:Object,required:!0}},methods:{editRouteOptionHandler:function(){var e=function(e){var t=e.split("/"),o=Object(n.a)(t,3),r=o[0],l=o[1],c=o[2];return new Date(Number(c),Number(l)-1,Number(r))};this.$emit("editRouteTableHandler",c(c({},this.item),{},{departure_date:e(this.item.departure_date),completion_date:e(this.item.completion_date),expected_revenue:parseFloat(this.item.expected_revenue.replace(/\D/g,"")),distance:parseFloat(this.item.distance.replace(/\D/g,""))}))}}},m=o(71),component=Object(m.a)(d,(function(){var e=this;return(0,e._self._c)("b-dropdown-item",{on:{click:e.editRouteOptionHandler}},[e._v("Edit route")])}),[],!1,null,null,null);t.default=component.exports},385:function(e,t,o){"use strict";o.r(t);var r={name:"CompleteRouteDropdownItem",props:{item:{type:Object,required:!0}},methods:{completeRoute:function(){"ongoing"===this.item.status&&this.$emit("completeRoute",this.item)}}},n=o(71),component=Object(n.a)(r,(function(){var e=this;return(0,e._self._c)("b-dropdown-item",{on:{click:e.completeRoute}},[e._v("Complete Route")])}),[],!1,null,null,null);t.default=component.exports},386:function(e,t,o){"use strict";o.r(t);var r=o(26),n=(o(60),o(14),{name:"DeleteRouteConfirmModal",props:{routeToDelete:{type:Object,default:null},showModal:{type:Boolean,required:!0}},data:function(){return{deleteError:null,deleting:!1}},computed:{message:function(){return this.routeToDelete?"Id(".concat(this.routeToDelete.id,") ").concat(this.routeToDelete.status," route ").concat(this.routeToDelete.start_city,"-").concat(this.routeToDelete.end_city," ").concat(this.routeToDelete.departure_date," - ").concat(this.routeToDelete.completion_date):""}},methods:{deleteRoute:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.deleting=!0,t.prev=1,t.next=4,e.$axios.$delete("/api/v1/routes/".concat(e.routeToDelete.id),{headers:{"x-api-key":e.$config.apiKey}});case 4:e.$emit("delete",e.routeToDelete),e.deleteError=null,t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),console.error("Error deleting route:",t.t0),e.deleteError="Failed to delete route. Please try again.";case 12:return t.prev=12,e.deleting=!1,t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[1,8,12,15]])})))()},cancel:function(){this.$emit("cancel")}}}),l=o(71),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("b-modal",{attrs:{centered:"",title:"Confirm Delete"},scopedSlots:e._u([{key:"modal-footer",fn:function(){return[t("b-button",{attrs:{variant:"secondary"},on:{click:e.cancel}},[e._v("Cancel")]),e._v(" "),t("b-button",{attrs:{variant:"danger",disabled:e.deleting},on:{click:e.deleteRoute}},[e._v("Delete")])]},proxy:!0}]),model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[t("p",[e._v("Are sure you want to delete the following route?")]),e._v(" "),t("p",[t("strong",[e._v(e._s(e.message))])]),e._v(" "),e.deleteError?t("b-alert",{attrs:{show:"",variant:"danger"}},[e._v("\n    "+e._s(e.deleteError)+"\n  ")]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},387:function(e,t,o){"use strict";o.r(t);var r=o(0),n=o(26);o(60),o(16),o(14),o(5),o(4),o(2),o(1),o(6),o(3),o(7);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={name:"CompleteRouteConfirmModal",props:{routeToComplete:{type:Object,default:null},showModal:{type:Boolean,required:!0}},data:function(){return{completionError:null,completing:!1}},computed:{isFutureRoute:function(){var e,t,o=new Date,r=new Date(null===(e=this.routeToComplete)||void 0===e?void 0:e.departure_date.split("/").reverse().join("-")),n=new Date(null===(t=this.routeToComplete)||void 0===t?void 0:t.completion_date.split("/").reverse().join("-"));return o<r||o<n},message:function(){return this.routeToComplete?"Id(".concat(this.routeToComplete.id,") ").concat(this.routeToComplete.status," route ").concat(this.routeToComplete.start_city,"-").concat(this.routeToComplete.end_city," ").concat(this.routeToComplete.departure_date," - ").concat(this.routeToComplete.completion_date):""}},watch:{isFutureRoute:function(e){this.completionError=e?"The dates of the route are still in the future. Sorry, you cannot complete future routes.":null}},methods:{updateRoute:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.isFutureRoute){t.next=3;break}return e.completionError="The dates of the route are still in the future. Sorry, you cannot complete future routes.",t.abrupt("return");case 3:return e.completing=!0,t.prev=4,t.next=7,e.$axios.$patch("/api/v1/routes/".concat(e.routeToComplete.id,"/complete"),{headers:{"x-api-key":e.$config.apiKey}});case 7:e.$emit("complete",c(c({},e.routeToComplete),{},{status:"completed"})),e.completionError=null,t.next=15;break;case 11:t.prev=11,t.t0=t.catch(4),console.error("Error completing route:",t.t0),e.completionError="Failed to complete route. Please try again.";case 15:return t.prev=15,e.completing=!1,t.finish(15);case 18:case"end":return t.stop()}}),t,null,[[4,11,15,18]])})))()},cancel:function(){this.$emit("cancel")}}},m=o(71),component=Object(m.a)(d,(function(){var e=this,t=e._self._c;return t("b-modal",{attrs:{centered:"",title:"Confirm Completion"},scopedSlots:e._u([{key:"modal-footer",fn:function(){return[t("b-button",{attrs:{variant:"secondary"},on:{click:e.cancel}},[e._v("Cancel")]),e._v(" "),t("b-button",{attrs:{variant:"primary",disabled:e.isFutureRoute||e.completing},on:{click:e.updateRoute}},[e._v("Complete")])]},proxy:!0}]),model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[t("p",[e._v("Are you sure you want to complete the following route?")]),e._v(" "),t("p",[t("strong",[e._v(e._s(e.message))])]),e._v(" "),e.completionError?t("b-alert",{attrs:{show:"",variant:"danger"}},[e._v("\n    "+e._s(e.completionError)+"\n  ")]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},388:function(e,t,o){"use strict";o.r(t);var r=o(26),n=(o(60),o(183),{props:{routeId:{type:Number,default:null}},data:function(){return{showModal:!1,routeDetails:null,serverError:null,isLoading:!1}},watch:{routeId:function(e){e&&this.fetchRouteDetails(e)}},methods:{resetModal:function(){this.showModal=!1,this.routeDetails=null},fetchRouteDetails:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function o(){var r;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.isLoading=!0,t.serverError=null,o.prev=2,o.next=5,t.$axios.$get("/api/v1/routes/".concat(e),{headers:{"x-api-key":t.$config.apiKey}});case 5:r=o.sent,t.routeDetails=r.data,t.showModal=!0,o.next=14;break;case 10:o.prev=10,o.t0=o.catch(2),console.error("Error retrieving route:",o.t0),t.serverError=o.t0.message||"Unexpected error occurred";case 14:return o.prev=14,t.isLoading=!1,o.finish(14);case 17:case"end":return o.stop()}}),o,null,[[2,10,14,17]])})))()}}}),l=o(71),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("b-modal",{attrs:{id:"route-details-modal",title:"Route Details","ok-only":"","ok-title":"OK"},on:{hide:e.resetModal},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[e.routeDetails?t("div",[t("p",[t("strong",[e._v("Route Id:")]),e._v(" "+e._s(e.routeDetails.id))]),e._v(" "),t("p",[t("strong",[e._v("Start City:")]),e._v(" "+e._s(e.routeDetails.start_city))]),e._v(" "),t("p",[t("strong",[e._v("End City:")]),e._v(" "+e._s(e.routeDetails.end_city))]),e._v(" "),t("p",[t("strong",[e._v("Distance:")]),e._v(" "+e._s(e.routeDetails.distance))]),e._v(" "),t("p",[t("strong",[e._v("Departure Date:")]),e._v(" "+e._s(new Date(e.routeDetails.departure_date).toLocaleDateString()))]),e._v(" "),t("p",[t("strong",[e._v("Completion Date:")]),e._v(" "+e._s(new Date(e.routeDetails.completion_date).toLocaleDateString()))]),e._v(" "),t("p",[t("strong",[e._v("Transport Type:")]),e._v(" "+e._s(e.routeDetails.transport_type))]),e._v(" "),t("p",[t("strong",[e._v("Expected Revenue:")]),e._v(" "+e._s(e.routeDetails.expected_revenue))]),e._v(" "),t("p",[t("strong",[e._v("Status:")]),e._v(" "+e._s(e.routeDetails.status))]),e._v(" "),t("br"),e._v(" "),t("h5",[e._v("Assigned Transport Details")]),e._v(" "),e.routeDetails["Transport.id"]?[t("p",[t("strong",[e._v("Transport Id:")]),e._v(" "+e._s(e.routeDetails["Transport.id"]))]),e._v(" "),t("p",[t("strong",[e._v("Plate Number:")]),e._v(" "+e._s(e.routeDetails["Transport.plate_number"]))]),e._v(" "),t("p",[t("strong",[e._v("Transport Status:")]),e._v(" "+e._s(e.routeDetails["Transport.status"]))]),e._v(" "),t("p",[t("strong",[e._v("Transport Model:")]),e._v(" "+e._s(e.routeDetails["Transport.model"]))]),e._v(" "),t("p",[t("strong",[e._v("Purchase Date:")]),e._v(" "+e._s(new Date(e.routeDetails["Transport.purchase_date"]).toLocaleDateString())+"\n      ")]),e._v(" "),t("p",[t("strong",[e._v("Mileage:")]),e._v(" "+e._s(e.routeDetails["Transport.mileage"]))]),e._v(" "),t("p",[t("strong",[e._v("Transport Type:")]),e._v(" "+e._s(e.routeDetails["Transport.transport_type"]))])]:t("p",[e._v("No Assigned Transport")])],2):e._e(),e._v(" "),e.serverError?t("div",{staticClass:"alert alert-danger"},[e._v("\n    "+e._s(e.serverError)+"\n  ")]):e._e(),e._v(" "),e.isLoading?t("b-spinner"):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},389:function(e,t,o){"use strict";o.r(t);var r={name:"AssignTransportDropdownItem",props:{item:{type:Object,required:!0}},methods:{assignTransportHandler:function(){this.$emit("assignTransport",this.item.id)}}},n=o(71),component=Object(n.a)(r,(function(){var e=this;return(0,e._self._c)("b-dropdown-item",{on:{click:e.assignTransportHandler}},[e._v("Assign Transport")])}),[],!1,null,null,null);t.default=component.exports},390:function(e,t,o){"use strict";o.r(t);var r=o(26),n=(o(60),o(183),o(15),o(14),{name:"AssignTransportModal",props:{routeId:{type:Number,default:null},showModal:{type:Boolean,required:!0}},data:function(){return{availableTransports:[],selectedTransportId:null,fetchError:null,fetching:!1,routeDates:null}},computed:{transportOptions:function(){return this.availableTransports.map((function(e){return{text:"Id(".concat(e.id,") - ").concat(e.plate_number," ").concat(e.model," (").concat(e.transport_type,")"),value:e.id}}))}},watch:{routeId:function(e){e&&this.fetchAvailableTransports(e)}},methods:{cancel:function(){this.$emit("cancel")},fetchAvailableTransports:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function o(){var r;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.fetching=!0,o.prev=1,o.next=4,t.$axios.$get("/api/v1/routes/".concat(e,"/availableTransports"),{headers:{"x-api-key":t.$config.apiKey}});case 4:r=o.sent,t.availableTransports=r.data.availableTransports,r.data.route&&(t.routeDates="".concat(new Date(r.data.route.departure_date).toLocaleDateString()," - ").concat(new Date(r.data.route.completion_date).toLocaleDateString()),t.selectedTransportId=r.data.route.transport_id),t.fetchError=null,o.next=14;break;case 10:o.prev=10,o.t0=o.catch(1),console.error("Failed to fetch available transports:",o.t0),t.fetchError=o.t0.message;case 14:return o.prev=14,t.fetching=!1,o.finish(14);case 17:case"end":return o.stop()}}),o,null,[[1,10,14,17]])})))()},confirmAssignment:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.selectedTransportId){t.next=17;break}return e.fetching=!0,t.prev=2,t.next=5,e.$axios.$patch("/api/v1/routes/".concat(e.routeId,"/assignTransport/").concat(e.selectedTransportId),{},{headers:{"x-api-key":e.$config.apiKey}});case 5:o=t.sent,e.$emit("assignTransport",o.data),e.cancel(),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(2),console.error("Failed to assign transport:",t.t0),e.fetchError=t.t0.message;case 14:return t.prev=14,e.fetching=!1,t.finish(14);case 17:case"end":return t.stop()}}),t,null,[[2,10,14,17]])})))()}}}),l=o(71),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("b-modal",{attrs:{title:"Assign Transport",centered:""},on:{hide:e.cancel},scopedSlots:e._u([{key:"modal-footer",fn:function(){return[t("b-button",{attrs:{variant:"secondary"},on:{click:e.cancel}},[e._v("Cancel")]),e._v(" "),t("b-button",{attrs:{variant:"primary",disabled:e.fetching},on:{click:e.confirmAssignment}},[e._v("Assign")])]},proxy:!0}]),model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[e.fetching?t("div",[e._v("Loading...")]):e.availableTransports.length>0?t("div",[t("b-form-radio-group",{attrs:{options:e.transportOptions,name:"transport-options",stacked:""},model:{value:e.selectedTransportId,callback:function(t){e.selectedTransportId=t},expression:"selectedTransportId"}})],1):t("div",[e._v("No available transport for these dates: "+e._s(e.routeDates))]),e._v(" "),e.fetchError?t("b-alert",{attrs:{show:"",variant:"danger"}},[e._v("\n    "+e._s(e.fetchError)+"\n  ")]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports}}]);