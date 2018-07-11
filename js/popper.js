! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t() }(this, function() { "use strict";

    function e(e) { var t = !1; return function() { t || (t = !0, Promise.resolve().then(function() { t = !1, e() })) } }

    function t(e) { var t = !1; return function() { t || (t = !0, setTimeout(function() { t = !1, e() }, se)) } }

    function n(e) { var t = {}; return e && "[object Function]" === t.toString.call(e) }

    function r(e, t) { if (1 !== e.nodeType) return []; var n = window.getComputedStyle(e, null); return t ? n[t] : n }

    function o(e) { return "HTML" === e.nodeName ? e : e.parentNode || e.host }

    function i(e) { if (!e) return window.document.body; switch (e.nodeName) {
            case "HTML":
            case "BODY":
                return e.ownerDocument.body;
            case "#document":
                return e.body } var t = r(e),
            n = t.overflow,
            a = t.overflowX,
            s = t.overflowY; return /(auto|scroll)/.test(n + s + a) ? e : i(o(e)) }

    function a(e) { var t = e && e.offsetParent,
            n = t && t.nodeName; return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(t.nodeName) && "static" === r(t, "position") ? a(t) : t : e ? e.ownerDocument.documentElement : window.document.documentElement }

    function s(e) { var t = e.nodeName; return "BODY" === t ? !1 : "HTML" === t || a(e.firstElementChild) === e }

    function f(e) { return null !== e.parentNode ? f(e.parentNode) : e }

    function p(e, t) { if (!(e && e.nodeType && t && t.nodeType)) return window.document.documentElement; var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            r = n ? e : t,
            o = n ? t : e,
            i = document.createRange();
        i.setStart(r, 0), i.setEnd(o, 0); var u = i.commonAncestorContainer; if (e !== u && t !== u || r.contains(o)) return s(u) ? u : a(u); var l = f(e); return l.host ? p(l.host, t) : p(e, f(t).host) }

    function u(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
            n = "top" === t ? "scrollTop" : "scrollLeft",
            r = e.nodeName; if ("BODY" === r || "HTML" === r) { var o = e.ownerDocument.documentElement,
                i = e.ownerDocument.scrollingElement || o; return i[n] } return e[n] }

    function l(e, t) { var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = u(t, "top"),
            o = u(t, "left"),
            i = n ? -1 : 1; return e.top += r * i, e.bottom += r * i, e.left += o * i, e.right += o * i, e }

    function c(e, t) { var n = "x" === t ? "Left" : "Top",
            r = "Left" === n ? "Right" : "Bottom"; return +e["border" + n + "Width"].split("px")[0] + +e["border" + r + "Width"].split("px")[0] }

    function d(e, t, n, r) { return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], ce() ? n["offset" + e] + r["margin" + ("Height" === e ? "Top" : "Left")] + r["margin" + ("Height" === e ? "Bottom" : "Right")] : 0) }

    function h() { var e = window.document.body,
            t = window.document.documentElement,
            n = ce() && window.getComputedStyle(t); return { height: d("Height", e, t, n), width: d("Width", e, t, n) } }

    function m(e) { return ge({}, e, { right: e.left + e.width, bottom: e.top + e.height }) }

    function g(e) { var t = {}; if (ce()) try { t = e.getBoundingClientRect(); var n = u(e, "top"),
                o = u(e, "left");
            t.top += n, t.left += o, t.bottom += n, t.right += o } catch (i) {} else t = e.getBoundingClientRect(); var a = { left: t.left, top: t.top, width: t.right - t.left, height: t.bottom - t.top },
            s = "HTML" === e.nodeName ? h() : {},
            f = s.width || e.clientWidth || a.right - a.left,
            p = s.height || e.clientHeight || a.bottom - a.top,
            l = e.offsetWidth - f,
            d = e.offsetHeight - p; if (l || d) { var g = r(e);
            l -= c(g, "x"), d -= c(g, "y"), a.width -= l, a.height -= d } return m(a) }

    function v(e, t) { var n = ce(),
            o = "HTML" === t.nodeName,
            a = g(e),
            s = g(t),
            f = i(e),
            p = r(t),
            u = +p.borderTopWidth.split("px")[0],
            c = +p.borderLeftWidth.split("px")[0],
            d = m({ top: a.top - s.top - u, left: a.left - s.left - c, width: a.width, height: a.height }); if (d.marginTop = 0, d.marginLeft = 0, !n && o) { var h = +p.marginTop.split("px")[0],
                v = +p.marginLeft.split("px")[0];
            d.top -= u - h, d.bottom -= u - h, d.left -= c - v, d.right -= c - v, d.marginTop = h, d.marginLeft = v } return (n ? t.contains(f) : t === f && "BODY" !== f.nodeName) && (d = l(d, t)), d }

    function b(e) { var t = e.ownerDocument.documentElement,
            n = v(e, t),
            r = Math.max(t.clientWidth, window.innerWidth || 0),
            o = Math.max(t.clientHeight, window.innerHeight || 0),
            i = u(t),
            a = u(t, "left"),
            s = { top: i - n.top + n.marginTop, left: a - n.left + n.marginLeft, width: r, height: o }; return m(s) }

    function w(e) { var t = e.nodeName; return "BODY" === t || "HTML" === t ? !1 : "fixed" === r(e, "position") ? !0 : w(o(e)) }

    function y(e, t, n, r) { var a = { top: 0, left: 0 },
            s = p(e, t); if ("viewport" === r) a = b(s);
        else { var f = void 0; "scrollParent" === r ? (f = i(o(e)), "BODY" === f.nodeName && (f = e.ownerDocument.documentElement)) : f = "window" === r ? e.ownerDocument.documentElement : r; var u = v(f, s); if ("HTML" !== f.nodeName || w(s)) a = u;
            else { var l = h(),
                    c = l.height,
                    d = l.width;
                a.top += u.top - u.marginTop, a.bottom = c + u.top, a.left += u.left - u.marginLeft, a.right = d + u.left } } return a.left += n, a.top += n, a.right -= n, a.bottom -= n, a }

    function E(e) { var t = e.width,
            n = e.height; return t * n }

    function O(e, t, n, r, o) { var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0; if (-1 === e.indexOf("auto")) return e; var a = y(n, r, i, o),
            s = { top: { width: a.width, height: t.top - a.top }, right: { width: a.right - t.right, height: a.height }, bottom: { width: a.width, height: a.bottom - t.bottom }, left: { width: t.left - a.left, height: a.height } },
            f = Object.keys(s).map(function(e) { return ge({ key: e }, s[e], { area: E(s[e]) }) }).sort(function(e, t) { return t.area - e.area }),
            p = f.filter(function(e) { var t = e.width,
                    r = e.height; return t >= n.clientWidth && r >= n.clientHeight }),
            u = p.length > 0 ? p[0].key : f[0].key,
            l = e.split("-")[1]; return u + (l ? "-" + l : "") }

    function x(e, t, n) { var r = p(t, n); return v(n, r) }

    function L(e) { var t = window.getComputedStyle(e),
            n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            r = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
            o = { width: e.offsetWidth + r, height: e.offsetHeight + n }; return o }

    function T(e) { var t = { left: "right", right: "left", bottom: "top", top: "bottom" }; return e.replace(/left|right|bottom|top/g, function(e) { return t[e] }) }

    function N(e, t, n) { n = n.split("-")[0]; var r = L(e),
            o = { width: r.width, height: r.height },
            i = -1 !== ["right", "left"].indexOf(n),
            a = i ? "top" : "left",
            s = i ? "left" : "top",
            f = i ? "height" : "width",
            p = i ? "width" : "height"; return o[a] = t[a] + t[f] / 2 - r[f] / 2, n === s ? o[s] = t[s] - r[p] : o[s] = t[T(s)], o }

    function C(e, t) { return Array.prototype.find ? e.find(t) : e.filter(t)[0] }

    function D(e, t, n) { if (Array.prototype.findIndex) return e.findIndex(function(e) { return e[t] === n }); var r = C(e, function(e) { return e[t] === n }); return e.indexOf(r) }

    function M(e, t, r) { var o = void 0 === r ? e : e.slice(0, D(e, "name", r)); return o.forEach(function(e) { e["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!"); var r = e["function"] || e.fn;
            e.enabled && n(r) && (t.offsets.popper = m(t.offsets.popper), t.offsets.reference = m(t.offsets.reference), t = r(t, e)) }), t }

    function k() { if (!this.state.isDestroyed) { var e = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };
            e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = N(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = "absolute", e = M(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e)) } }

    function W(e, t) { return e.some(function(e) { var n = e.name,
                r = e.enabled; return r && n === t }) }

    function S(e) { for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length - 1; r++) { var o = t[r],
                i = o ? "" + o + n : e; if ("undefined" != typeof window.document.body.style[i]) return i } return null }

    function P() { return this.state.isDestroyed = !0, W(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[S("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this }

    function B(e) { var t = e.ownerDocument; return t ? t.defaultView : window }

    function H(e, t, n, r) { var o = "BODY" === e.nodeName,
            a = o ? e.ownerDocument.defaultView : e;
        a.addEventListener(t, n, { passive: !0 }), o || H(i(a.parentNode), t, n, r), r.push(a) }

    function A(e, t, n, r) { n.updateBound = r, B(e).addEventListener("resize", n.updateBound, { passive: !0 }); var o = i(e); return H(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n }

    function j() { this.state.eventsEnabled || (this.state = A(this.reference, this.options, this.state, this.scheduleUpdate)) }

    function I(e, t) { return B(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) { e.removeEventListener("scroll", t.updateBound) }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t }

    function F() { this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = I(this.reference, this.state)) }

    function R(e) { return "" !== e && !isNaN(parseFloat(e)) && isFinite(e) }

    function U(e, t) { Object.keys(t).forEach(function(n) { var r = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && R(t[n]) && (r = "px"), e.style[n] = t[n] + r }) }

    function Y(e, t) { Object.keys(t).forEach(function(n) { var r = t[n];
            r !== !1 ? e.setAttribute(n, t[n]) : e.removeAttribute(n) }) }

    function q(e) { return U(e.instance.popper, e.styles), Y(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && U(e.arrowElement, e.arrowStyles), e }

    function K(e, t, n, r, o) { var i = x(o, t, e),
            a = O(n.placement, i, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding); return t.setAttribute("x-placement", a), U(t, { position: "absolute" }), n }

    function V(e, t) { var n = t.x,
            r = t.y,
            o = e.offsets.popper,
            i = C(e.instance.modifiers, function(e) { return "applyStyle" === e.name }).gpuAcceleration;
        void 0 !== i && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"); var s = void 0 !== i ? i : t.gpuAcceleration,
            f = a(e.instance.popper),
            p = g(f),
            u = { position: o.position },
            l = { left: Math.floor(o.left), top: Math.floor(o.top), bottom: Math.floor(o.bottom), right: Math.floor(o.right) },
            c = "bottom" === n ? "top" : "bottom",
            d = "right" === r ? "left" : "right",
            h = S("transform"),
            m = void 0,
            v = void 0; if (v = "bottom" === c ? -p.height + l.bottom : l.top, m = "right" === d ? -p.width + l.right : l.left, s && h) u[h] = "translate3d(" + m + "px, " + v + "px, 0)", u[c] = 0, u[d] = 0, u.willChange = "transform";
        else { var b = "bottom" === c ? -1 : 1,
                w = "right" === d ? -1 : 1;
            u[c] = v * b, u[d] = m * w, u.willChange = c + ", " + d } var y = { "x-placement": e.placement }; return e.attributes = ge({}, y, e.attributes), e.styles = ge({}, u, e.styles), e.arrowStyles = ge({}, e.offsets.arrow, e.arrowStyles), e }

    function z(e, t, n) { var r = C(e, function(e) { var n = e.name; return n === t }),
            o = !!r && e.some(function(e) { return e.name === n && e.enabled && e.order < r.order }); if (!o) { var i = "`" + t + "`",
                a = "`" + n + "`";
            console.warn(a + " modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!") } return o }

    function G(e, t) { if (!z(e.instance.modifiers, "arrow", "keepTogether")) return e; var n = t.element; if ("string" == typeof n) { if (n = e.instance.popper.querySelector(n), !n) return e } else if (!e.instance.popper.contains(n)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e; var o = e.placement.split("-")[0],
            i = e.offsets,
            a = i.popper,
            s = i.reference,
            f = -1 !== ["left", "right"].indexOf(o),
            p = f ? "height" : "width",
            u = f ? "Top" : "Left",
            l = u.toLowerCase(),
            c = f ? "left" : "top",
            d = f ? "bottom" : "right",
            h = L(n)[p];
        s[d] - h < a[l] && (e.offsets.popper[l] -= a[l] - (s[d] - h)), s[l] + h > a[d] && (e.offsets.popper[l] += s[l] + h - a[d]); var g = s[l] + s[p] / 2 - h / 2,
            v = r(e.instance.popper, "margin" + u).replace("px", ""),
            b = g - m(e.offsets.popper)[l] - v; return b = Math.max(Math.min(a[p] - h, b), 0), e.arrowElement = n, e.offsets.arrow = {}, e.offsets.arrow[l] = Math.round(b), e.offsets.arrow[c] = "", e }

    function _(e) { return "end" === e ? "start" : "start" === e ? "end" : e }

    function X(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            n = be.indexOf(e),
            r = be.slice(n + 1).concat(be.slice(0, n)); return t ? r.reverse() : r }

    function J(e, t) { if (W(e.instance.modifiers, "inner")) return e; if (e.flipped && e.placement === e.originalPlacement) return e; var n = y(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
            r = e.placement.split("-")[0],
            o = T(r),
            i = e.placement.split("-")[1] || "",
            a = []; switch (t.behavior) {
            case we.FLIP:
                a = [r, o]; break;
            case we.CLOCKWISE:
                a = X(r); break;
            case we.COUNTERCLOCKWISE:
                a = X(r, !0); break;
            default:
                a = t.behavior } return a.forEach(function(s, f) { if (r !== s || a.length === f + 1) return e;
            r = e.placement.split("-")[0], o = T(r); var p = e.offsets.popper,
                u = e.offsets.reference,
                l = Math.floor,
                c = "left" === r && l(p.right) > l(u.left) || "right" === r && l(p.left) < l(u.right) || "top" === r && l(p.bottom) > l(u.top) || "bottom" === r && l(p.top) < l(u.bottom),
                d = l(p.left) < l(n.left),
                h = l(p.right) > l(n.right),
                m = l(p.top) < l(n.top),
                g = l(p.bottom) > l(n.bottom),
                v = "left" === r && d || "right" === r && h || "top" === r && m || "bottom" === r && g,
                b = -1 !== ["top", "bottom"].indexOf(r),
                w = !!t.flipVariations && (b && "start" === i && d || b && "end" === i && h || !b && "start" === i && m || !b && "end" === i && g);
            (c || v || w) && (e.flipped = !0, (c || v) && (r = a[f + 1]), w && (i = _(i)), e.placement = r + (i ? "-" + i : ""), e.offsets.popper = ge({}, e.offsets.popper, N(e.instance.popper, e.offsets.reference, e.placement)), e = M(e.instance.modifiers, e, "flip")) }), e }

    function Q(e) { var t = e.offsets,
            n = t.popper,
            r = t.reference,
            o = e.placement.split("-")[0],
            i = Math.floor,
            a = -1 !== ["top", "bottom"].indexOf(o),
            s = a ? "right" : "bottom",
            f = a ? "left" : "top",
            p = a ? "width" : "height"; return n[s] < i(r[f]) && (e.offsets.popper[f] = i(r[f]) - n[p]), n[f] > i(r[s]) && (e.offsets.popper[f] = i(r[s])), e }

    function Z(e, t, n, r) { var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            i = +o[1],
            a = o[2]; if (!i) return e; if (0 === a.indexOf("%")) { var s = void 0; switch (a) {
                case "%p":
                    s = n; break;
                case "%":
                case "%r":
                default:
                    s = r } var f = m(s); return f[t] / 100 * i } if ("vh" === a || "vw" === a) { var p = void 0; return p = "vh" === a ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0), p / 100 * i } return i }

    function $(e, t, n, r) { var o = [0, 0],
            i = -1 !== ["right", "left"].indexOf(r),
            a = e.split(/(\+|\-)/).map(function(e) { return e.trim() }),
            s = a.indexOf(C(a, function(e) { return -1 !== e.search(/,|\s/) }));
        a[s] && -1 === a[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead."); var f = /\s*,\s*|\s+/,
            p = -1 !== s ? [a.slice(0, s).concat([a[s].split(f)[0]]), [a[s].split(f)[1]].concat(a.slice(s + 1))] : [a]; return p = p.map(function(e, r) { var o = (1 === r ? !i : i) ? "height" : "width",
                a = !1; return e.reduce(function(e, t) { return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, a = !0, e) : a ? (e[e.length - 1] += t, a = !1, e) : e.concat(t) }, []).map(function(e) { return Z(e, o, t, n) }) }), p.forEach(function(e, t) { e.forEach(function(n, r) { R(n) && (o[t] += n * ("-" === e[r - 1] ? -1 : 1)) }) }), o }

    function ee(e, t) { var n = t.offset,
            r = e.placement,
            o = e.offsets,
            i = o.popper,
            a = o.reference,
            s = r.split("-")[0],
            f = void 0; return f = R(+n) ? [+n, 0] : $(n, i, a, s), "left" === s ? (i.top += f[0], i.left -= f[1]) : "right" === s ? (i.top += f[0], i.left += f[1]) : "top" === s ? (i.left += f[0], i.top -= f[1]) : "bottom" === s && (i.left += f[0], i.top += f[1]), e.popper = i, e }

    function te(e, t) { var n = t.boundariesElement || a(e.instance.popper);
        e.instance.reference === n && (n = a(n)); var r = y(e.instance.popper, e.instance.reference, t.padding, n);
        t.boundaries = r; var o = t.priority,
            i = e.offsets.popper,
            s = { primary: function(e) { var n = i[e]; return i[e] < r[e] && !t.escapeWithReference && (n = Math.max(i[e], r[e])), me({}, e, n) }, secondary: function(e) { var n = "right" === e ? "left" : "top",
                        o = i[n]; return i[e] > r[e] && !t.escapeWithReference && (o = Math.min(i[n], r[e] - ("right" === e ? i.width : i.height))), me({}, n, o) } }; return o.forEach(function(e) { var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
            i = ge({}, i, s[t](e)) }), e.offsets.popper = i, e }

    function ne(e) { var t = e.placement,
            n = t.split("-")[0],
            r = t.split("-")[1]; if (r) { var o = e.offsets,
                i = o.reference,
                a = o.popper,
                s = -1 !== ["bottom", "top"].indexOf(n),
                f = s ? "left" : "top",
                p = s ? "width" : "height",
                u = { start: me({}, f, i[f]), end: me({}, f, i[f] + i[p] - a[p]) };
            e.offsets.popper = ge({}, a, u[r]) } return e }

    function re(e) { if (!z(e.instance.modifiers, "hide", "preventOverflow")) return e; var t = e.offsets.reference,
            n = C(e.instance.modifiers, function(e) { return "preventOverflow" === e.name }).boundaries; if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) { if (e.hide === !0) return e;
            e.hide = !0, e.attributes["x-out-of-boundaries"] = "" } else { if (e.hide === !1) return e;
            e.hide = !1, e.attributes["x-out-of-boundaries"] = !1 } return e }

    function oe(e) { var t = e.placement,
            n = t.split("-")[0],
            r = e.offsets,
            o = r.popper,
            i = r.reference,
            a = -1 !== ["left", "right"].indexOf(n),
            s = -1 === ["top", "left"].indexOf(n); return o[a ? "left" : "top"] = i[n] - (s ? o[a ? "width" : "height"] : 0), e.placement = T(t), e.offsets.popper = m(o), e } for (var ie = "undefined" != typeof window && "undefined" != typeof window.document, ae = ["Edge", "Trident", "Firefox"], se = 0, fe = 0; fe < ae.length; fe += 1)
        if (ie && navigator.userAgent.indexOf(ae[fe]) >= 0) { se = 1; break }
    var pe = ie && window.Promise,
        ue = pe ? e : t,
        le = void 0,
        ce = function() { return void 0 === le && (le = -1 !== navigator.appVersion.indexOf("MSIE 10")), le },
        de = function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") },
        he = function() {
            function e(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t } }(),
        me = function(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e },
        ge = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        ve = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        be = ve.slice(3),
        we = { FLIP: "flip", CLOCKWISE: "clockwise", COUNTERCLOCKWISE: "counterclockwise" },
        ye = { shift: { order: 100, enabled: !0, fn: ne }, offset: { order: 200, enabled: !0, fn: ee, offset: 0 }, preventOverflow: { order: 300, enabled: !0, fn: te, priority: ["left", "right", "top", "bottom"], padding: 5, boundariesElement: "scrollParent" }, keepTogether: { order: 400, enabled: !0, fn: Q }, arrow: { order: 500, enabled: !0, fn: G, element: "[x-arrow]" }, flip: { order: 600, enabled: !0, fn: J, behavior: "flip", padding: 5, boundariesElement: "viewport" }, inner: { order: 700, enabled: !1, fn: oe }, hide: { order: 800, enabled: !0, fn: re }, computeStyle: { order: 850, enabled: !0, fn: V, gpuAcceleration: !0, x: "bottom", y: "right" }, applyStyle: { order: 900, enabled: !0, fn: q, onLoad: K, gpuAcceleration: void 0 } },
        Ee = { placement: "bottom", eventsEnabled: !0, removeOnDestroy: !1, onCreate: function() {}, onUpdate: function() {}, modifiers: ye },
        Oe = function() {
            function e(t, r) { var o = this,
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                de(this, e), this.scheduleUpdate = function() { return requestAnimationFrame(o.update) }, this.update = ue(this.update.bind(this)), this.options = ge({}, e.Defaults, i), this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }, this.reference = t && t.jquery ? t[0] : t, this.popper = r && r.jquery ? r[0] : r, this.options.modifiers = {}, Object.keys(ge({}, e.Defaults.modifiers, i.modifiers)).forEach(function(t) { o.options.modifiers[t] = ge({}, e.Defaults.modifiers[t] || {}, i.modifiers ? i.modifiers[t] : {}) }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) { return ge({ name: e }, o.options.modifiers[e]) }).sort(function(e, t) { return e.order - t.order }), this.modifiers.forEach(function(e) { e.enabled && n(e.onLoad) && e.onLoad(o.reference, o.popper, o.options, e, o.state) }), this.update(); var a = this.options.eventsEnabled;
                a && this.enableEventListeners(), this.state.eventsEnabled = a } return he(e, [{ key: "update", value: function() { return k.call(this) } }, { key: "destroy", value: function() { return P.call(this) } }, { key: "enableEventListeners", value: function() { return j.call(this) } }, { key: "disableEventListeners", value: function() { return F.call(this) } }]), e }(); return Oe.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Oe.placements = ve, Oe.Defaults = Ee, Oe });