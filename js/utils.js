/*
 * utils(v1.0)：Set up a utils namespace, and add the method used in the project to the namespace to avoid contamination of global variables.
 * by team on 2015/09/29
 */
var utils = {
    //win:Set or get the information about the browser's box model
    win: function (attr, value) {
        var len = arguments.length;
        if (len === 0) {
            return;
        }
        if (len === 1) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },
    //listToArray:Converts an array of classes into an array set
    listToArray: function (likeArray) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeArray, 0);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                ary[ary.length] = likeArray[i];
            }
        }
        return ary;
    },
    //toJSON:JSON format string, converted to JSON format object
    toJSON: function (jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }
};

//getElementsByClass:Through the collection of elements of the class can access the corresponding elements
utils.getElementsByClass = function (cName, context) {
    context = context || document;
    if ("getElementsByClassName" in context) {
        return this.listToArray(context.getElementsByClassName(cName));
    }
    var cAry = cName.replace(/^\s+|\s+$/g, "").split(/\s+/), allTags = context.getElementsByTagName("*"), ary = [];
    for (var i = 0; i < allTags.length; i++) {
        var curTag = allTags[i], flag = true;
        for (var k = 0; k < cAry.length; k++) {
            var reg = new RegExp("(^| +)" + cAry[k] + "( +|$)");
            if (!reg.test(curTag.className)) {
                flag = false;
                break;
            }
        }
        flag ? ary[ary.length] = curTag : null;
    }
    return ary;
};

//children:Gets all the elements of an element under the child node
utils.children = function (curEle, tagName) {
    var ary = [], nodes = curEle.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        var curNode = nodes[i];
        curNode.nodeType === 1 ? (typeof tagName === "undefined" ? ary[ary.length] = curNode : (curNode.nodeName.toLowerCase() === tagName.toLowerCase() ? ary[ary.length] = curNode : null)) : null;
    }
    return ary;
};

//prev:Get on a brother element node
utils.prev = function (curEle) {
    if ("previousElementSibling" in curEle) {
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
};

//next:Gets the next younger brother element node
utils.next = function (curEle) {
    if ("nextElementSibling" in curEle) {
        return curEle.nextElementSibling;
    }
    var nex = curEle.nextSibling;
    while (nex && nex.nodeType !== 1) {
        nex = nex.nextSibling;
    }
    return nex;
};

//sibling:Gets two adjacent elements.
utils.sibling = function (curEle) {
    var pre = this.prev(curEle), nex = this.next(curEle), ary = [];
    pre ? ary[ary.length] = pre : null;
    nex ? ary[ary.length] = nex : null;
    return ary;
};

//prevAll:Gets all the older brother element nodes
utils.prevAll = function (curEle) {
    var ary = [], pre = this.prev(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = this.prev(pre);
    }
    return ary;
};

//nextAll:Gets all the younger brother element nodes
utils.nextAll = function (curEle) {
    var ary = [], nex = this.next(curEle);
    while (nex) {
        ary[ary.length] = nex;
        nex = this.next(nex);
    }
    return ary;
};

//siblings:Gets all the sibling nodes
utils.siblings = function (curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle));
};

//getIndex:Gets the index position of the current element
utils.getIndex = function (curEle) {
    return this.prevAll(curEle).length;
};

//first:Gets the first element child node
utils.first = function (curEle, tagName) {
    var chd = this.children(curEle, tagName);
    return chd.length > 0 ? chd[0] : null;
};

//last:Gets the last element child node
utils.last = function (curEle, tagName) {
    var chd = this.children(curEle, tagName);
    return chd.length > 0 ? chd[chd.length - 1] : null;
};

//attr:Sets or gets the attributes of an element
utils.attr = function (curEle, property, value) {
    var len = arguments.length;
    if (len <= 1) return;
    if (len === 2) {
        return property === "class" ? curEle.className : curEle.getAttribute(property);
    }
    property === "class" ? curEle.className = value : curEle.setAttribute(property, value);
};

//removeAttr:The related attributes of an element
utils.removeAttr = function (curEle, property) {
    var len = arguments.length;
    if (len <= 1) return;
    property === "class" ? curEle.className = null : curEle.removeAttribute(property);
};

//getCss:Get elements of the style
utils.getCss = function (curEle, attr) {
    var val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
    var temp = parseFloat(val);
    return isNaN(temp) ? val : temp;
};

//setCss 添加某个元素curEle的attr这个属性上的行内样式值为value
utils.setCss = function (curEle,attr,value) {
    var reg=/^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Bottom|Right)?))$/;
    if(attr==="opacity"){
        curEle["style"]["opacity"]=value;
        curEle["style"]["filter"]="alpha(opacity="+value*100+")";
    }else if(reg.test(attr)){
        var valReg=/^\d+$/;
        curEle["style"][attr]=valReg.test(value)?value:value+"px";
    }else{
        curEle["style"][attr]=value;
    }
};

//setGroupCss
utils.setGroupCss = function (curEle,opations) {   //opations是个样式的集合
    if(Object.prototype.toString.call(opations)!=="object Object"){
        return;              //也可以写成({}).toString.call(opations)!=="object Object"
    }
    for(var key in opations){    //for in循环可以把在原型上手动设置的共有属性也遍历到
        if(opations.hasOwnProperty(key)){
            this.setCss(curEle,key,opations[key]);
        }
    }

};

//offset:Gets the offset of the element distance body. attr:"left"/"top"
utils.offset = function (curEle, attr) {
    var offsetL = curEle.offsetLeft, offsetT = curEle.offsetTop, offsetP = curEle.offsetParent;
    while (offsetP) {
        offsetL += offsetP.offsetLeft;
        offsetT += offsetP.offsetTop;
        if (navigator.userAgent.indexOf("MSIE 8.0") <= -1) {
            offsetL += offsetP.clientLeft;
            offsetT += offsetP.clientTop;
        }
        offsetP = offsetP.offsetParent;
    }
    return attr === "left" ? offsetL : offsetT;
};

//hasClass:To determine whether the current element contains a class name
utils.hasClass = function (curEle, cName) {
    var cur = curEle.className, reg = new RegExp("(^| +)" + cName + "( +|$)");
    return reg.test(cur);
};

//addClass:The class name to add style elements
utils.addClass = function (curEle, cName) {
    var cAry = cName.replace(/^\s+|\s+$/g, "").split(/\s+/);
    for (var i = 0; i < cAry.length; i++) {
        var cur = cAry[i];
        if (!this.hasClass(curEle, cur)) {
            curEle.className += " " + cur;
        }
    }
};

//removeClass:Style name delete element
utils.removeClass = function (curEle, cName) {
    var cAry = cName.replace(/^\s+|\s+$/g, "").split(/\s+/);
    for (var i = 0; i < cAry.length; i++) {
        var cur = cAry[i], reg = new RegExp("(^| +)" + cur + "( +|$)", "g");
        if (this.hasClass(curEle, cur)) {
            curEle.className = curEle.className.replace(reg, " ");
        }
    }
};

//
utils.html=function(curEle,value){
    var len=arguments.length;
    if(len===0) return;
    if(len===1){
        return curEle.innerHTML;
    }
    curEle.innerHTML=value;
};

/*utils.val(){

};*/
//把cueEle元素放到container容器里的最前面
utils.prepend=function(newEle,container){
    var fir=this.first(container);
    if(fir){
        container.insertBefore(newEle,fir);
    }else{
        container.appendChild(newEle);
    }
};
//把新元素添加到老元素的后面
utils.insertAfter=function(newEle,oldEle){
    var nex=this.next(oldEle),par=oldEle.parentNode;
};

//检测数据类型
//utils.isNaN(val)
/*
~function (check) {
    var numObj = {
        isNum: "Number",
        isStr: "String",
        isBoo: "Boolean",
        isNul: "Null",
        isUnd: "Undefined",
        isObj: "Object",
        isAry: "Array",
        isFun: "Function",
        isReg: "RegExp"
    }, isType = function () {
        var outerArg = arguments[0];
        return function () {
            var innerArg = arguments[0], reg = new RegExp("^\\[object " + outerArg + "\\]$", "i");
            return reg.test(Object.prototype.toString.call(innerArg));
        }
    };
    for (var key in numObj) {
        if(numObj.hasOwnProperty(key)){
            check[key] = isType(numObj[key]);
        }

    }
}(check);
*/

//在内置类的原型上扩展方法
~function(){
    var aryPro=Array;
}();
















