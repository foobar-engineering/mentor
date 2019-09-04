(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"1de42e16aa5311874cea":function(t,e,r){"use strict";r.r(e);var o,n=r("8af190b70a6bc55c6f1b"),i=r.n(n),s=r("0d7f0986bcd2f33d8a2a"),c=(r("ab039aecd4a1d4fedc0e"),r("d7dd51e1bf6bfc2c9c3d")),a=r("ab4cb61bcb2dc161defb"),u=r("a28fc3c963a1d4d1a2e5"),f=r("0c3f27a24fbb7f10af30"),l=r.n(f);function p(t){return(p="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function b(t,e,r,n){o||(o="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=t&&t.defaultProps,s=arguments.length-3;if(e||0===s||(e={children:void 0}),e&&i)for(var c in i)void 0===e[c]&&(e[c]=i[c]);else e||(e=i||{});if(1===s)e.children=n;else if(s>1){for(var a=new Array(s),u=0;u<s;u++)a[u]=arguments[u+3];e.children=a}return{$$typeof:o,type:t,key:void 0===r?null:""+r,ref:null,props:e,_owner:null}}function d(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function h(t,e){return!e||"object"!==p(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var m,O=function(t){function e(t){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(r=h(this,y(e).call(this,t))).state={active:!1},r}var r,o,n;return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(e,i.a.Component),r=e,(o=[{key:"activate",value:function(){this.setState({active:!0})}},{key:"deactivate",value:function(){this.setState({active:!1})}},{key:"render",value:function(){return b("div",{className:"terminal-list-item ".concat(this.state.active?"active":"")},this.props.user.port,b("div",{onClick:this.deactivate.bind(this),className:"close"},void 0,"X"),b("div",{onClick:this.activate.bind(this),className:"title"},void 0,"".concat(this.props.user.userName,"@").concat(this.props.host,":").concat(this.props.user.port)),b("div",{className:"terminal-wrapper"},this.props.user.port,b("iframe",{src:"http://".concat(this.props.host,":").concat(this.props.user.port)},this.props.user.port)))}}])&&d(r.prototype,o),n&&d(r,n),e}(),w=(r("e2f8c163296c236d3ac3"),r("6542cd13fd5dd1bcffd4"));function _(t){return(_="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(t,e,r,o){m||(m="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=t&&t.defaultProps,i=arguments.length-3;if(e||0===i||(e={children:void 0}),e&&n)for(var s in n)void 0===e[s]&&(e[s]=n[s]);else e||(e=n||{});if(1===i)e.children=o;else if(i>1){for(var c=new Array(i),a=0;a<i;a++)c[a]=arguments[a+3];e.children=c}return{$$typeof:m,type:t,key:void 0===r?null:""+r,ref:null,props:e,_owner:null}}function S(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function k(t,e){return!e||"object"!==_(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function P(t,e){return(P=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var E=j(s.Helmet,{},void 0,j("title",{},void 0,"Terminals list"),j("meta",{name:"description",content:"Terminals"})),N=function(t){function e(t){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(r=k(this,g(e).call(this,t))).state={users:[],errors:[]},r}var r,o,n;return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&P(t,e)}(e,i.a.Component),r=e,(o=[{key:"componentDidMount",value:function(){var t=this.validateState();t.length?this.setState({errors:t}):this.setState({users:this.buildUsers()})}},{key:"validateState",value:function(){var t=[];return this.props.host&&this.props.host.length||t.push("Host not specified"),(!this.props.port_from||!this.props.port_from<0)&&t.push("Port not specified or invalid"),(!this.props.port_to||!this.props.port_to<0)&&t.push("Ports count not specified or invalid"),t}},{key:"buildUsers",value:function(){var t=this.props,e=t.port_from,r=t.port_to,o=[];if(r>0)for(var n=0;n<r;n++)o.push(this.buildUser(1*e+n,n));else o=[e];return o}},{key:"buildUser",value:function(t,e){return{port:t,userName:"user".concat(e),pass:l()(e+"").substring(0,4)}}},{key:"renderTerminals",value:function(){var t=this;return this.state.users.map(function(e){return j(O,{user:e,host:t.props.host},e.port)})}},{key:"renderErrors",value:function(){return j("div",{className:"errors-"},void 0,this.state.errors.join(" "))}},{key:"render",value:function(){return j("div",{},void 0,E,j("div",{className:"terminals-list"},void 0,this.state.errors.length?this.renderErrors():this.renderTerminals()))}}])&&S(r.prototype,o),n&&S(r,n),e}(),T=Object(u.b)({host:Object(w.b)(),port_from:Object(w.d)(),port_to:Object(w.e)(),repos:Object(w.f)(),loading:Object(w.c)(),error:Object(w.a)()}),C=Object(c.connect)(T);e.default=Object(a.compose)(C)(N)}}]);