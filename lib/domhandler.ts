import *as t from "domelementtype";
import e from "./node.js";
var n = "default" in t ? t.default : t;
var o = {}; 
var i = o && o.__createBinding || (Object.create ? function (t, e, n, o) {
    void 0 === o && (o = n);
    Object.defineProperty(t, o, { enumerable: true, get: function () { return e[n] } })
} : function (t, e, n, o) {
    void 0 === o && (o = n);
    t[o] = e[n] });
    var a = o && o.__exportStar || function (t, e) {
        for (var n in t)
            "default" === n || Object.prototype.hasOwnProperty.call(e, n) || i(e, t, n)
        };
    Object.defineProperty(o, "__esModule", { value: true });
    o.DomHandler = void 0; var s = n; var r = e; a(e, o);
    var d = /\s+/g;
    var l = { normalizeWhitespace: false, withStartIndices: false, withEndIndices: false, xmlMode: false };
    var h = function () {
    /**
       * @param callback Called once parsing has completed.
       * @param options Settings for the handler.
       * @param elementCB Callback whenever a tag is closed.
       */
    function DomHandler(t, e, n) { this.dom = []; this.root = new r.Document(this.dom); this.done = false; this.tagStack = [this.root]; this.lastNode = null; this.parser = null; if ("function" === typeof e) { n = e; e = l } if ("object" === typeof t) { e = t; t = void 0 } this.callback = null !== t && void 0 !== t ? t : null; this.options = null !== e && void 0 !== e ? e : l; this.elementCB = null !== n && void 0 !== n ? n : null } DomHandler.prototype.onparserinit = function (t) { this.parser = t }; DomHandler.prototype.onreset = function () { this.dom = []; this.root = new r.Document(this.dom); this.done = false; this.tagStack = [this.root]; this.lastNode = null; this.parser = null }; DomHandler.prototype.onend = function () { if (!this.done) { this.done = true; this.parser = null; this.handleCallback(null) } }; DomHandler.prototype.onerror = function (t) { this.handleCallback(t) }; DomHandler.prototype.onclosetag = function () { this.lastNode = null; var t = this.tagStack.pop(); this.options.withEndIndices && (t.endIndex = this.parser.endIndex); this.elementCB && this.elementCB(t) }; DomHandler.prototype.onopentag = function (t, e) { var n = this.options.xmlMode ? s.ElementType.Tag : void 0; var o = new r.Element(t, e, void 0, n); this.addNode(o); this.tagStack.push(o) }; DomHandler.prototype.ontext = function (t) { var e = this.options.normalizeWhitespace; var n = this.lastNode; if (n && n.type === s.ElementType.Text) { e ? n.data = (n.data + t).replace(d, " ") : n.data += t; this.options.withEndIndices && (n.endIndex = this.parser.endIndex) } else { e && (t = t.replace(d, " ")); var o = new r.Text(t); this.addNode(o); this.lastNode = o } }; DomHandler.prototype.oncomment = function (t) { if (this.lastNode && this.lastNode.type === s.ElementType.Comment) this.lastNode.data += t; else { var e = new r.Comment(t); this.addNode(e); this.lastNode = e } }; DomHandler.prototype.oncommentend = function () { this.lastNode = null }; DomHandler.prototype.oncdatastart = function () { var t = new r.Text(""); var e = new r.NodeWithChildren(s.ElementType.CDATA, [t]); this.addNode(e); t.parent = e; this.lastNode = t }; DomHandler.prototype.oncdataend = function () { this.lastNode = null }; DomHandler.prototype.onprocessinginstruction = function (t, e) { var n = new r.ProcessingInstruction(t, e); this.addNode(n) }; DomHandler.prototype.handleCallback = function (t) { if ("function" === typeof this.callback) this.callback(t, this.dom); else if (t) throw t }; DomHandler.prototype.addNode = function (t) { var e = this.tagStack[this.tagStack.length - 1]; var n = e.children[e.children.length - 1]; this.options.withStartIndices && (t.startIndex = this.parser.startIndex); this.options.withEndIndices && (t.endIndex = this.parser.endIndex); e.children.push(t); if (n) { t.prev = n; n.next = t } t.parent = e; this.lastNode = null }; return DomHandler
}(); o.DomHandler = h; o.default = h; const c = o.__esModule, p = o.cloneNode, m = o.hasChildren, u = o.isDocument, f = o.isDirective, v = o.isComment, y = o.isText, D = o.isCDATA, N = o.isTag, H = o.Element, x = o.Document, g = o.NodeWithChildren, w = o.ProcessingInstruction, I = o.Comment, C = o.Text, T = o.DataNode, b = o.Node; const k = o.DomHandler; export { I as Comment, T as DataNode, x as Document, k as DomHandler, H as Element, b as Node, g as NodeWithChildren, w as ProcessingInstruction, C as Text, c as __esModule, p as cloneNode, o as default, m as hasChildren, D as isCDATA, v as isComment, f as isDirective, u as isDocument, N as isTag, y as isText };

    //# sourceMappingURL=index.js.map