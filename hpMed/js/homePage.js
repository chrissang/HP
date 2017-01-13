

var responsivelyLazy=function(){var t=!1,n=null,q=null,m="undefined"!==typeof IntersectionObserver,u=function(c){if(null===n)return!1;var f=c.getBoundingClientRect();c=f.top;var a=f.left,b=f.width,f=f.height;return c<q&&0<c+f&&a<n&&0<a+b},r=function(c,f){var a=f.getAttribute("data-srcset");if(null!==a)if(a=a.trim(),0<a.length){for(var a=a.split(","),b=[],h=a.length,e=0;e<h;e++){var d=a[e].trim();if(0!==d.length){var g=d.lastIndexOf(" ");if(-1===g)var k=d,d=999998;else k=d.substr(0,g),d=parseInt(d.substr(g+
1,d.length-g-2),10);g=!1;-1!==k.indexOf(".webp",k.length-5)?t&&(g=!0):g=!0;g&&b.push([k,d])}}b.sort(function(a,c){if(a[1]<c[1])return-1;if(a[1]>c[1])return 1;if(a[1]===c[1]){if(-1!==c[0].indexOf(".webp",c[0].length-5))return 1;if(-1!==a[0].indexOf(".webp",a[0].length-5))return-1}return 0});a=b}else a=[];else a=[];k=c.offsetWidth*window.devicePixelRatio;b=null;h=a.length;for(e=0;e<h;e++)if(d=a[e],d[1]>=k){b=d;break}null===b&&(b=[f.getAttribute("src"),999999]);"undefined"===typeof c.lastSetOption&&
(c.lastSetOption=["",0]);if(c.lastSetOption[1]<b[1]){var w=0===c.lastSetOption[1],v=b[0],a=new Image;a.addEventListener("load",function(){f.setAttribute("srcset",v);if(w){var a=c.getAttribute("data-onlazyload");null!==a&&(new Function(a)).bind(c)()}},!1);a.addEventListener("error",function(){c.lastSetOption=["",0]},!1);a.src=v;c.lastSetOption=b}},l=function(){var c=function(c,a){for(var b=c.length,h=0;h<b;h++){var e=c[h],d=a?e:e.parentNode;u(d)&&r(d,e)}};c(document.querySelectorAll(".responsively-lazy > img"),
!1);c(document.querySelectorAll("img.responsively-lazy"),!0)};if("srcset"in document.createElement("img")&&"undefined"!==typeof window.devicePixelRatio&&"undefined"!==typeof window.addEventListener&&"undefined"!==typeof document.querySelectorAll){var n=window.innerWidth,q=window.innerHeight,p=new Image;p.src="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEADMDOJaQAA3AA/uuuAAA=";p.onload=p.onerror=function(){t=2===p.width;if(m){var c=function(){for(var a=document.querySelectorAll(".responsively-lazy"),
c=a.length,b=0;b<c;b++){var d=a[b];"undefined"===typeof d.responsivelyLazyObserverAttached&&(d.responsivelyLazyObserverAttached=!0,f.observe(d))}},f=new IntersectionObserver(function(a){for(var c in a){var b=a[c];if(0<b.intersectionRatio)if(b=b.target,"img"!==b.tagName.toLowerCase()){var d=b.querySelector("img");null!==d&&r(b,d)}else r(b,b)}});l()}else{var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)},
b=!0,h=function(){b&&(b=!1,l());a.call(null,h)},e=function(){b=!0},d=function(){for(var a=document.querySelectorAll(".responsively-lazy"),c=a.length,b=0;b<c;b++)for(var d=a[b].parentNode;d&&"html"!==d.tagName.toLowerCase();)"undefined"===typeof d.responsivelyLazyScrollAttached&&(d.responsivelyLazyScrollAttached=!0,d.addEventListener("scroll",e)),d=d.parentNode};h()}var g=function(){if(m)var a=null;window.addEventListener("resize",function(){n=window.innerWidth;q=window.innerHeight;m?(window.clearTimeout(a),
a=window.setTimeout(function(){l()},300)):b=!0});m?(window.addEventListener("load",l),c()):(window.addEventListener("scroll",e),window.addEventListener("load",e),d());"undefined"!==typeof MutationObserver&&(new MutationObserver(function(){m?(c(),l()):(d(),b=!0)})).observe(document.querySelector("body"),{childList:!0,subtree:!0})};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",g):g()}}return{run:l,isVisible:u}}();


!function(e,t){"function"==typeof define&&define.amd?define(["knockout"],t):"object"==typeof exports?module.exports=t(require("knockout")):e.KnockoutFastForeach=t(e.ko)}(this,function(e){"use strict";function t(e){return!!e&&"object"==typeof e&&e.constructor===Object}function n(e){return 8===e.nodeType&&h.test(u?e.text:e.nodeValue)}function s(t){var n,s=document.createElement("div");return t.content?n=t.content:"SCRIPT"===t.tagName?(n=document.createElement("div"),n.innerHTML=t.text):n=t,e.utils.arrayForEach(e.virtualElements.childNodes(n),function(e){e&&s.insertBefore(e.cloneNode(!0),null)}),s}function i(e,t){return{status:"added",value:e,index:t}}function o(e){return"function"==typeof Symbol?Symbol(e):e}function r(t){this.element=t.element,this.container=n(this.element)?this.element.parentNode:this.element,this.$context=t.$context,this.data=t.data,this.as=t.as,this.noContext=t.noContext,this.noIndex=t.noIndex,this.afterAdd=t.afterAdd,this.beforeRemove=t.beforeRemove,this.templateNode=s(t.templateNode||(t.name?document.getElementById(t.name).cloneNode(!0):t.element)),this.afterQueueFlush=t.afterQueueFlush,this.beforeQueueFlush=t.beforeQueueFlush,this.changeQueue=[],this.firstLastNodesList=[],this.indexesToDelete=[],this.rendering_queued=!1,this.pendingDeletes=[],e.virtualElements.emptyNode(this.element);var o=e.unwrap(this.data);o.map&&this.onArrayChange(o.map(i),!0),e.isObservable(this.data)&&(this.data.indexOf||(this.data=this.data.extend({trackArrayChanges:!0})),this.changeSubs=this.data.subscribe(this.onArrayChange,this,"arrayChange"))}function a(t){t.$index=e.observable()}var d=9007199254740991,u=document&&"<!--test-->"===document.createComment("test").text,h=u?/^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,l=document&&"function"==typeof document.createDocumentFragment,c=o("_ko_ffe_pending_delete_index");r.PENDING_DELETE_INDEX_KEY=c,r.animateFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return window.setTimeout(e,1e3/60)},r.prototype.dispose=function(){this.changeSubs&&this.changeSubs.dispose(),this.flushPendingDeletes()},r.prototype.onArrayChange=function(e,t){for(var n=this,s={added:[],deleted:[]},i=0,o=e.length;i<o;i++){if(s.added.length&&"added"==e[i].status){var a=s.added[s.added.length-1],d=a.isBatch?a.index+a.values.length-1:a.index;if(d+1==e[i].index){a.isBatch||(a={isBatch:!0,status:"added",index:a.index,values:[a.value]},s.added.splice(s.added.length-1,1,a)),a.values.push(e[i].value);continue}}s[e[i].status].push(e[i])}s.deleted.length>0&&(this.changeQueue.push.apply(this.changeQueue,s.deleted),this.changeQueue.push({status:"clearDeletedIndexes"})),this.changeQueue.push.apply(this.changeQueue,s.added),this.changeQueue.length>0&&!this.rendering_queued&&(this.rendering_queued=!0,t?n.processQueue():r.animateFrame.call(window,function(){n.processQueue()}))},r.prototype.processQueue=function(){var t=this,n=d;"function"==typeof this.beforeQueueFlush&&this.beforeQueueFlush(this.changeQueue),e.utils.arrayForEach(this.changeQueue,function(e){"number"==typeof e.index&&(n=Math.min(n,e.index)),t[e.status](e)}),this.flushPendingDeletes(),this.rendering_queued=!1,this.noIndex||this.updateIndexes(n),"function"==typeof this.afterQueueFlush&&this.afterQueueFlush(this.changeQueue),this.changeQueue=[]},r.prototype.added=function(t){for(var n=t.index,s=t.isBatch?t.values:[t.value],i=this.getLastNodeBeforeIndex(n),o=[],r=0,d=s.length;r<d;++r){var u,h=this.getPendingDeleteFor(s[r]);if(h&&h.nodesets.length)u=h.nodesets.pop();else{var l,c=this.templateNode.cloneNode(!0);l=this.noContext?this.$context.extend({$item:s[r],$index:this.noIndex?void 0:e.observable()}):this.$context.createChildContext(s[r],this.as||null,this.noIndex?void 0:a),e.applyBindingsToDescendants(l,c),u=e.virtualElements.childNodes(c)}o.push.apply(o,Array.prototype.slice.call(u)),this.firstLastNodesList.splice(n+r,0,{first:u[0],last:u[u.length-1]})}"function"==typeof this.afterAdd?this.afterAdd({nodeOrArrayInserted:this.insertAllAfter(o,i),foreachInstance:this}):this.insertAllAfter(o,i)},r.prototype.getNodesForIndex=function(e){var t=[],n=this.firstLastNodesList[e].first,s=this.firstLastNodesList[e].last;for(t.push(n);n&&n!==s;)n=n.nextSibling,t.push(n);return t},r.prototype.getLastNodeBeforeIndex=function(e){return e<1||e-1>=this.firstLastNodesList.length?null:this.firstLastNodesList[e-1].last},r.prototype.insertAllAfter=function(t,n){var s,i,o,r=this.element;if(void 0===t.nodeType&&void 0===t.length)throw new Error("Expected a single node or a node array");if(void 0!==t.nodeType)return e.virtualElements.insertAfter(r,t,n),[t];if(1===t.length)e.virtualElements.insertAfter(r,t[0],n);else if(l){for(s=document.createDocumentFragment(),o=0,i=t.length;o!==i;++o)s.appendChild(t[o]);e.virtualElements.insertAfter(r,s,n)}else for(o=t.length-1;o>=0;--o){var a=t[o];if(!a)break;e.virtualElements.insertAfter(r,a,n)}return t},r.prototype.shouldDelayDeletion=function(e){return e&&("object"==typeof e||"function"==typeof e)},r.prototype.getPendingDeleteFor=function(e){var t=e&&e[c];return void 0===t?null:this.pendingDeletes[t]},r.prototype.getOrCreatePendingDeleteFor=function(e){var t=this.getPendingDeleteFor(e);return t?t:(t={data:e,nodesets:[]},e[c]=this.pendingDeletes.length,this.pendingDeletes.push(t),t)},r.prototype.deleted=function(e){if(this.shouldDelayDeletion(e.value)){var t=this.getOrCreatePendingDeleteFor(e.value);t.nodesets.push(this.getNodesForIndex(e.index))}else this.removeNodes(this.getNodesForIndex(e.index));this.indexesToDelete.push(e.index)},r.prototype.removeNodes=function(t){if(t.length){var n=function(){for(var n=t[0].parentNode,s=t.length-1;s>=0;--s)e.cleanNode(t[s]),n.removeChild(t[s])};if(this.beforeRemove){var s=this.beforeRemove({nodesToRemove:t,foreachInstance:this})||{};"function"==typeof s.then&&s.then(n,e.onError?e.onError:void 0)}else n()}},r.prototype.flushPendingDeletes=function(){for(var e=0,t=this.pendingDeletes.length;e!=t;++e){for(var n=this.pendingDeletes[e];n.nodesets.length;)this.removeNodes(n.nodesets.pop());n.data&&void 0!==n.data[c]&&delete n.data[c]}this.pendingDeletes=[]},r.prototype.clearDeletedIndexes=function(){for(var e=this.indexesToDelete.length-1;e>=0;--e)this.firstLastNodesList.splice(this.indexesToDelete[e],1);this.indexesToDelete=[]},r.prototype.getContextStartingFrom=function(t){for(var n;t;){if(n=e.contextFor(t))return n;t=t.nextSibling}},r.prototype.updateIndexes=function(e){for(var t,n=e,s=this.firstLastNodesList.length;n<s;++n)t=this.getContextStartingFrom(this.firstLastNodesList[n].first),t&&t.$index(n)},e.bindingHandlers.fastForEach={init:function(n,s,i,o,a){var d,u=s();return t(u)?(u.element=u.element||n,u.$context=a,d=new r(u)):d=new r({element:n,data:e.unwrap(a.$rawData)===u?a.$rawData:u,$context:a}),e.utils.domNodeDisposal.addDisposeCallback(n,function(){d.dispose()}),{controlsDescendantBindings:!0}},FastForEach:r},e.virtualElements.allowedBindings.fastForEach=!0});

var moduleOrderStatic = [];
var moduleOrder = [];
var alphaOrder = [];
var counter = 0;

const ugWeb = '//www.uncommongoods.com';

class Dependents {
    constructor(params) {
        // this.modulePosition = params.data.index + 1;
        this.alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.modulePosition = params.position + 1;
        this.viewPortSize = ko.observable(breakpointValue());
        this.displayOn = function(viewPortSize) {
            return {
                'small': this.viewPortSize() === 'small' || this.viewPortSize() === 'medium' || this.viewPortSize() === 'large' || this.viewPortSize() === 'xlarge' ? true : false,
                'medium': this.viewPortSize() === 'medium' || this.viewPortSize() === 'large' || this.viewPortSize() === 'xlarge' ? true : false,
                'large': this.viewPortSize() === 'large' || this.viewPortSize() === 'xlarge' ? true : false,
                'xlarge': this.viewPortSize() === 'xlarge' ? true : false
            }[viewPortSize]
        }
        this.displayGroup = function(arry) {
            var sectionArray = [];
            arry.forEach((el,i) => {
                sectionArray.push(el.displayModuleOn);
            })
            if (sectionArray.indexOf('small') > -1) {
                return 'small';
            } else if (sectionArray.indexOf('medium') > -1) {
                return 'medium';
            } else if (sectionArray.indexOf('large') > -1) {
                return 'large';
            } else {
                return 'xlarge';
            }
        }
        this.responsiveImage = function(itemId, largeImage, smallImage) {
            var responsiveValue;
            var largeImageSize = largeImage.split('_').pop().split('.')[0].slice(0, -2);
            var smallImageSize = smallImage.split('_').pop().split('.')[0].slice(0, -2);
            responsiveValue = smallImageSize ? smallImage + ' ' + smallImageSize + 'w, ' : productImgPath(itemId,360) + ' 360w, ';
            responsiveValue += largeImageSize ? largeImage + ' ' + largeImageSize + 'w' : productImgPath(itemId,640) + ' 640w';
            return responsiveValue;
        }
        this.isEven = function(index) {
            return index % 2 === 0 ? true : false
        }
        this.classNameBlockGrid = function(sectionData) {
            this.nonHiddenModuleSections = [];
            if (this.viewPortSize() === 'small') {
                return 'small-6 columns';
            } else if(this.viewPortSize() === 'medium') {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium') {
                        this.nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '4': 'medium-3 columns',
                    '6': 'medium-2 columns'
                }[this.nonHiddenModuleSections.length];

            } else if(this.viewPortSize() === 'large') {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large') {
                        this.nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '4': 'large-3 columns',
                    '6': 'large-2 columns'
                }[this.nonHiddenModuleSections.length];
            } else {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large' || module.displayModuleOn === 'xlarge') {
                        this.nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '4': 'medium-3 columns',
                    '6': 'medium-2 columns'
                }[this.nonHiddenModuleSections.length];
            }

        }
        this.className = function(sectionData) {
            var nonHiddenModuleSections = [];
            if(this.viewPortSize() === 'large') {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large') {
                        nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '2': 'large-6 columns',
                    '3': 'large-4 columns',
                    '4': 'large-6 columns'
                }[nonHiddenModuleSections.length];
            } else {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large' || module.displayModuleOn === 'xlarge') {
                        nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '2': 'large-6 columns',
                    '3': 'large-4 columns',
                    '4': 'large-6 columns'
                }[nonHiddenModuleSections.length];
            }
        }
        ko.bindingHandlers.resizeView = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                $(window).resize(function () {
                    var breakpoint = breakpointValue();
                    viewModel.viewPortSize(breakpoint);
                });

                var section = allBindings().resizeView;
                var display = allBindings().if;

                moduleOrderStatic.push(section);

                if (display) {
                    moduleOrder.push(section);

                } else {
                   moduleOrder.push('');
                }

                $(document).ready(function() {
                    var breakpoint = breakpointValue();
                    viewModel.viewPortSize(breakpoint);
                });
            },
            update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                var display = allBindings().if;
                var index = viewModel.modulePosition - 1;
                // var totalModules = bindingContext.$parents[0].totalModules;
                // var totalModules = bindingContext.$parents[0].totalModules;
                //var totalModules = Object.keys(mappingOrder).length;
                var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                $(document).ready(function() {
                    if (display) {
                        moduleOrder[index] = moduleOrderStatic[index];
                    } else {
                        moduleOrder[index] = '';
                    }

                    if(display) {
                        var elements = Array.from(ko.virtualElements.firstChild(element).nextElementSibling.querySelectorAll('a'));
                        var arryLength = elements.length;


                        while (arryLength--) {
                            if (elements[arryLength].parentElement.classList.contains("swiper-slide-duplicate")) {
                                elements.splice(arryLength, 1);
                            }
                        }

                        elements.forEach((el,index) => {
                            if (index === 0) {
                                alphaOrder.push(alpha.charAt(counter));
                                counter++
                            }

                            var linkNumber = index+1;
                            var dataType = el.getAttribute("data-type");
                            var dataDescription = el.getAttribute('data-description').split(' ').join('_');
                            var moduleType = allBindings().resizeView;
                            var alphaChar = alphaOrder[alphaOrder.length-1];

                            if(dataDescription != '') {
                                dataDescription = '_'+dataDescription;
                            }

                            var trackingCode = 'hp_module_' + alphaChar + linkNumber + '_'+ dataType + '_' + moduleType + dataDescription;
                            var trackingLink = el.getAttribute("href");

                            var ctaText = el.getAttribute("data-cta") ? el.getAttribute("data-cta") : 'NA';
                            var itemNumber = el.getAttribute("data-itemNumber") ? el.getAttribute("data-itemNumber") : "NA";
                            var sectionDescription = el.getAttribute("data-sectionDescription") ? el.getAttribute("data-sectionDescription") : 'NA';

                            var id = alphaChar + linkNumber + '_' + moduleType;
                            var name = ctaText.replace(/'/g, "")+'_'+trackingLink.replace(/\/\/www.uncommongoods.com/g, '').replace("//blog.uncommongoods.com","/blog");
                            var creative = itemNumber;
                            var pos = sectionDescription;

                            trackingLink = trackingLink.replace(/\/\/www.uncommongoods.com/g, '');

                            if (trackingLink !== '' && moduleType != 'TL_SEO') {
                                if (trackingLink.includes("//blog.uncommongoods.com")) {
                                    trackingLink = trackingLink.replace("//blog.uncommongoods.com","/blog");
                                    $(el).attr("onclick", `javascript: pageTracker._trackPageview('/internal`+trackingLink+`?source=`+trackingCode+`');dataLayer.push({'internalHPModuleLinkUrl':'/internal`+trackingLink+`?source=`+trackingCode+`'},{'event':'fireGTMTrackHPModulePageView'});onPromoClick('`+id+`', '`+name+`', '`+creative+`', '`+pos+`')`);
                                } else {
                                    $(el).attr("onclick", `javascript: pageTracker._trackPageview('/internal`+trackingLink+`?source=`+trackingCode+`');dataLayer.push({'internalHPModuleLinkUrl':'/internal`+trackingLink+`?source=`+trackingCode+`'},{'event':'fireGTMTrackHPModulePageView'});onPromoClick('`+id+`', '`+name+`', '`+creative+`', '`+pos+`')`);
                                }
                            } else if (trackingLink !== '' && moduleType === 'TL_SEO') {
                                $(el).attr("onclick", `javascript: pageTracker._trackPageview('/internal`+trackingLink+`?source=`+trackingCode+`');dataLayer.push({'internalHPModuleLinkUrl':'/internal`+trackingLink+`?source=`+trackingCode+`'},{'event':'fireGTMTrackHPModulePageView'});onPromoClick('`+id+`', '`+name+`', '`+creative+`', '`+pos+`')`);
                            } else {
                                $(el).attr("onclick", `javascript: pageTracker._trackPageview('/internal`+trackingLink+`?source=`+trackingCode+`');dataLayer.push({'internalHPModuleLinkUrl':'/internal`+trackingLink+`?source=`+trackingCode+`'},{'event':'fireGTMTrackHPModulePageView'});onPromoClick('`+id+`', '`+name+`', '`+creative+`', '`+pos+`')`);
                                $('a[href=""]').click(function (event) { // where href are blank
                                    event.preventDefault();
                                })
                            }
                        })
                    }

                    if (viewModel.modulePosition === totalModules) {
                        var moduleOrderRefresh = moduleOrder.filter(Boolean);
                        counter = 0;
                        alphaOrder = [];
                        moduleOrderRefresh[moduleOrderRefresh.length - 1] === 'BD' ? document.getElementsByClassName("prefooterLine")[0].style.display='none' : document.getElementsByClassName("prefooterLine")[0].style.display='block';
                    }
                })
            }
        };
        ko.virtualElements.allowedBindings.resizeView = true;
    }
};

//Returns screen viewport size (small, medium, large, xlarge)
function breakpointValue() {
    return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};
//Returns default image path
function productImgPath(itemId,size) {
    var itemDir = '/images/items/';
    var itemIdTrim = itemId.toString().slice(0, -2);

    if (size === 640) {
        return itemDir+itemIdTrim+'00/'+itemId+'_1_640px.jpg';
    }
    if (size === 360) {
        return itemDir+itemIdTrim+'00/'+itemId+'_1_360px.jpg';
    }
}
//Returns url with domain attached unless already included in the link
function addUgDomain(link) {
    if (link.substring(0, 2) == '//') {
        return link;
    }
    if (link === '') {
        return '';
    }
    else {
        return ugWeb + link;
    }
}
//Mobile HP modules
ko.components.register('large-feature-module', {
    viewModel: class LargeFeatureModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.isVideo = function(video) {
                return video.split('.').pop() === 'mp4' ? true : false;
            }
            this.posterImage = function(videoFile) {
                return videoFile.split('.').shift() + '.jpg';
            }
            this.largeFeatureModulesSections = mappingOrder[this.alpha]['large-feature-module']['sections'];
            this.displayGroupViewPortSize = this.displayGroup(this.largeFeatureModulesSections);
        }
    },
    template: `
    <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'LF' -->
        <section data-bind="" class="large-feature-module background-color-off-white">
            <!-- ko fastForEach: largeFeatureModulesSections -->
                <!-- ko if: $parent.displayOn(displayModuleOn) -->
                    <div class="row fullwidth">
                        <div class="small-12 large-11 xlarge-10 xxlarge-8 large-centered columns">
                            <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text }">
                                <picture>
                                    <!--[if IE 9]><video style="display: none;"><![endif]-->
                                        <source data-bind="attr: { media: '(min-width: 40.063em)', srcset: image.customImage.large ? image.customImage.large : productImgPath(item,640) }">
                                        <source data-bind="attr: { media: '(max-width: 40em)', srcset: image.customImage.small ? image.customImage.small : productImgPath(item,360) }">
                                    <!--[if IE 9]></video><![endif]-->

                                    <!-- ko if: $parent.viewPortSize() === 'small' -->
                                        <div class="responsively-lazy preventReflow">
                                            <img data-bind="attr: { src: image.customImage.small ? image.customImage.small : productImgPath(item,360), alt: cta.text }">
                                        </div>
                                    <!-- /ko -->

                                    <!-- ko if: $parent.viewPortSize() != 'small' -->
                                        <!-- ko if: $parent.isVideo(image.customImage.large) -->
                                            <video loop muted autoplay data-bind="attr: { poster: $parent.posterImage(image.customImage.large) }">
                                                <source data-bind="attr: { src: image.customImage.large }" type="video/mp4">
                                                <source data-bind="attr: { src: image.customImage.large }" type="video/webm">
                                            </video>
                                        <!-- /ko -->
                                        <!-- ko if: !$parent.isVideo(image.customImage.large) -->
                                            <div class="responsively-lazy preventReflow">
                                                <div data-bind="style: { backgroundImage: 'url( '+ image.customImage.large  +' )'}" class="LF_backgroundImage"></div>
                                            </div>
                                        <!-- /ko -->
                                    <!-- /ko -->
                                </picture>
                            </a>
                        </div>
                    </div>
                    <div class="row fullwidth">
                        <div class="small-12 medium-8 large-6 small-centered columns">
                            <div class="white-box-container text-center">
                                <a class="a-secondary" data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text }">
                                    <h1 data-bind="html: headline.text"></h1>
                                </a>
                                <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text }"></a></p>
                            </div>
                        </div>
                    </div>
                <!-- /ko -->
            <!-- /ko -->
        </section>
    <!-- /ko -->`, synchronous: true
});

ko.components.register('small-feature-module', {
    viewModel: class SmallFeatureModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.smModulesSections = mappingOrder[this.alpha]['small-feature-module']['sections'];
            this.displayGroupViewPortSize = this.displayGroup(this.smModulesSections);
        }
    },
    template: `
        <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'SF' -->
            <section data-bind="" class="small-feature-module background-color-white">
                <!-- ko if: viewPortSize() === 'small' || viewPortSize() === 'medium' -->
                    <!-- ko fastForEach: smModulesSections -->
                        <!-- ko if: $parent.displayOn(displayModuleOn) -->
                            <!-- ko if: $parent.isEven($index()) -->
                                <div class="row fullwidth">
                                    <div class="container">
                                        <div class="small-6 medium-7 columns">
                                            <div data-bind="attr: { class: $parent.viewPortSize() === 'medium' ? 'offsetLeft' : ''}">
                                                <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                    <div class="responsively-lazy preventReflow">
                                                        <img class="right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }"/>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="small-6 medium-5 columns text-center">
                                            <div class="copyContainer">
                                                <!-- ko if: section.text -->
                                                    <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                <!-- /ko -->
                                                <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h3 data-bind="html: headline.text"></h3></a>
                                                <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text }"></a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- /ko -->

                            <!-- ko if: !$parent.isEven($index()) -->
                                <div class="row fullwidth">
                                    <div class="container">
                                        <div class="small-6 medium-5 columns text-center">
                                            <div class="copyContainer">
                                                <!-- ko if: section.text -->
                                                    <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                <!-- /ko -->
                                                <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h3 data-bind="html: headline.text"></h3></a>
                                                <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                            </div>
                                        </div>
                                        <div class="small-6 medium-7 columns">
                                            <div data-bind="attr: { class: $parent.viewPortSize() === 'medium' ? 'offsetRight' : ''}">
                                                <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description}">
                                                    <div class="responsively-lazy preventReflow">
                                                        <img class="right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }"/>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- /ko -->
                        <!-- /ko -->
                    <!-- /ko -->
                <!-- /ko -->

                <!-- ko if: viewPortSize() === 'large' || viewPortSize() === 'xlarge' -->
                    <div class="row fullwidth">
                        <div class="large-11 xlarge-10 xxlarge-8 large-centered columns">
                            <div class="row fullwidth">
                                <!-- ko fastForEach: smModulesSections -->
                                    <!-- ko if: $parent.displayOn(displayModuleOn) -->
                                        <div data-bind="attr: { class: $parent.className($parent.smModulesSections) }">
                                            <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img class="right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }"/>
                                                </div>
                                            </a>
                                            <div class="row">
                                                <div class="large-12 large-centered columns">
                                                    <div class="white-box-container text-center">
                                                        <!-- ko if: section.text -->
                                                            <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                        <!-- /ko -->
                                                        <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h2 data-bind="html: headline.text"></h2></a>
                                                        <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <!-- /ko -->
                                <!-- /ko -->
                            </div>
                        </div>
                    </div>
                <!-- /ko -->
            </section>
        <!-- /ko -->`, synchronous: true
});

ko.components.register('basic-story-module', {
    viewModel: class BasicStoryModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.basicStoryModulesSections = mappingOrder[this.alpha]['basic-story-module']['sections'];
            this.displayGroupViewPortSize = this.displayGroup(this.basicStoryModulesSections);
        }
    },
    template: `
        <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'BS' -->
            <section data-bind="" class="basic-story-module background-color-off-white">
                <!-- ko if: viewPortSize() === 'small' -->
                    <!-- ko fastForEach: basicStoryModulesSections -->
                        <!-- ko if: $parent.displayOn(displayModuleOn) -->
                            <div class="row container">
                                <!-- ko if: section.text -->
                                    <div class="small-12 text-center columns">
                                        <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description  }"></a></label>
                                    </div>
                                <!-- /ko -->

                                <div class="small-12 columns">
                                    <div class="row">
                                        <div class="small-10 small-centered text-center columns">
                                            <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h2 data-bind="html: headline.text"></h2></a>
                                            <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }"/>
                                                </div>
                                            </a>
                                            <a data-bind="attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <button class="btn-secondary expand" data-bind="html: cta.text"></button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!-- /ko -->
                    <!-- /ko -->
                <!-- /ko -->

                <!-- ko if: viewPortSize() === 'medium' -->
                    <!-- ko fastForEach: basicStoryModulesSections -->
                        <!-- ko if: $parent.displayOn(displayModuleOn) -->
                            <!-- ko if: $parent.isEven($index()) -->
                                <div class="row fullwidth">
                                    <div class="container">
                                        <div class="medium-7 columns">
                                            <div class="offsetLeft">
                                                <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                    <div class="responsively-lazy preventReflow">
                                                        <img class="right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }"/>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="medium-5 columns text-center">
                                            <div class="copyContainer">
                                                <!-- ko if: section.text -->
                                                    <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                <!-- /ko -->
                                                <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h2 data-bind="html: headline.text"></h2></a>
                                                <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- /ko -->

                            <!-- ko if: !$parent.isEven($index()) -->
                                <div class="row fullwidth">
                                    <div class="container">
                                        <div class="medium-5 columns text-center">
                                            <div class="copyContainer">
                                                <!-- ko if: section.text -->
                                                    <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                <!-- /ko -->
                                                <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h2 data-bind="html: headline.text"></h2></a>
                                                <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                            </div>
                                        </div>
                                        <div class="medium-7 columns">
                                            <div class="offsetRight">
                                                <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                    <div class="responsively-lazy preventReflow">
                                                        <img class="right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }"/>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- /ko -->
                        <!-- /ko -->
                    <!-- /ko -->
                <!-- /ko -->

                <!-- ko if: viewPortSize() === 'large' || viewPortSize() === 'xlarge' -->
                    <div class="row fullwidth">
                        <div class="large-11 xlarge-10 xxlarge-8 large-centered columns">
                            <div class="row">
                                <!-- ko fastForEach: basicStoryModulesSections -->
                                    <!-- ko if: $parent.displayOn(displayModuleOn) -->
                                        <div data-bind="attr: { class: $parent.className($parent.basicStoryModulesSections) }">
                                            <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img class="right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }"/>
                                                </div>
                                            </a>
                                            <div class="row">
                                                <div class="large-12 large-centered columns">
                                                    <div class="white-box-container text-center">
                                                        <!-- ko if: section.text -->
                                                            <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section' , 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                        <!-- /ko -->
                                                        <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h2 data-bind="html: headline.text"></h2></a>
                                                        <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <!-- /ko -->
                                <!-- /ko -->
                            </div>
                        </div>
                    </div>
                <!-- /ko -->
            </section>
        <!-- /ko -->`, synchronous: true
});

ko.components.register('extended-story-module', {
    viewModel: class ExtendedStoryModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.extendedStoryModulesSections = mappingOrder[this.alpha]['extended-story-module']['sections'];
            this.displayGroupViewPortSize = this.displayGroup(this.extendedStoryModulesSections);
        }
    },
    template: `
        <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'ES' -->
            <section data-bind="" class="extended-story-module background-color-off-white">
                <!-- ko if: viewPortSize() === 'small' -->
                    <!-- ko fastForEach: extendedStoryModulesSections -->
                        <!-- ko if: $parent.displayOn(displayModuleOn) -->
                            <div class="row container">
                                <div class="small-12 text-center columns">
                                    <!-- ko if: section.text -->
                                        <div class="small-12 text-center columns">
                                            <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description}"></a></label>
                                        </div>
                                    <!-- /ko -->
                                    <div class="small-12 text-center columns">
                                        <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h2 data-bind="html: headline.text"></h2></a>
                                    </div>
                                    <div class="small-12 text-center columns">
                                        <div class="row">
                                            <div class="small-11 small-centered columns">
                                                <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                    <div class="responsively-lazy preventReflow itemPhoto">
                                                        <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }"/>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-11 text-center columns">
                                        <p class="text-left">
                                            <a class="a-secondary" data-bind="html: copy.text, attr: { href: addUgDomain(copy.link), 'data-type': 'Copy', 'data-description': copy.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a>
                                        </p>
                                        <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                    </div>
                                </div>
                            </div>
                        <!-- /ko -->
                    <!-- /ko -->
                <!-- /ko -->

                <!-- ko if: viewPortSize() === 'medium' || viewPortSize() === 'large' || viewPortSize() === 'xlarge'-->
                    <!-- ko fastForEach: extendedStoryModulesSections -->
                        <!-- ko if: $parent.displayOn(displayModuleOn) -->
                            <!-- ko if: $parent.isEven($index()) -->
                                <div class="row fullwidth">
                                    <div class="medium-12 large-11 xlarge-10 xxlarge-8 large-centered columns">
                                        <div class="row">
                                            <div class="container">
                                                <div class="medium-7 large-8 columns">
                                                    <div class="offsetLeft">
                                                        <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                            <div class="responsively-lazy preventReflow">
                                                                <img class="right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }"/>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div class="medium-5 large-4 columns text-center">
                                                    <div class="copyContainer">
                                                        <!-- ko if: section.text -->
                                                            <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                        <!-- /ko -->
                                                        <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h2 data-bind="html: headline.text"></h2></a>
                                                        <p class="text-left">
                                                            <a class="a-secondary" data-bind="html: copy.text, attr: { href: addUgDomain(copy.link), 'data-type': 'Copy', 'data-description': copy.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a>
                                                        </p>
                                                        <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- /ko -->

                            <!-- ko if: !$parent.isEven($index()) -->
                                <div class="row fullwidth">
                                    <div class="medium-12 large-11 xlarge-10 xxlarge-8  large-centered columns">
                                        <div class="row">
                                            <div class="container">
                                                <div class="medium-5 large-4 columns text-center">
                                                    <div class="copyContainer">
                                                        <!-- ko if: section.text -->
                                                            <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                        <!-- /ko -->
                                                        <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h2 data-bind="html: headline.text"></h2></a>
                                                        <p class="text-left">
                                                            <a class="a-secondary" data-bind="html: copy.text, attr: { href: addUgDomain(copy.link), 'data-type': 'Copy', 'data-description': copy.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a>
                                                        </p>
                                                        <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                                    </div>
                                                </div>
                                                <div class="medium-7 large-8 columns">
                                                    <div class="offsetRight">
                                                        <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                            <div class="responsively-lazy preventReflow">
                                                                <img class="right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }"/>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- /ko -->
                        <!-- /ko -->
                    <!-- /ko -->
                <!-- /ko -->
            </section>
        <!-- /ko -->`, synchronous: true
});

ko.components.register('collection-grid-module', {
    viewModel: class CollectionGridModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.section = mappingOrder[this.alpha]['collection-grid-module']['section'];
            this.headline = mappingOrder[this.alpha]['collection-grid-module']['headline'];
            this.cta = mappingOrder[this.alpha]['collection-grid-module']['cta'];
            this.collectionGridModulesSections = mappingOrder[this.alpha]['collection-grid-module']['sections'];
            this.arrayContent1 = this.collectionGridModulesSections[0];
            this.arrayContent2 = this.collectionGridModulesSections[1];
            this.arrayContent3 = this.collectionGridModulesSections[2];
            this.arrayContent4 = this.collectionGridModulesSections[3];
            this.arrayContent5 = this.collectionGridModulesSections[4];
            this.arrayContent6 = this.collectionGridModulesSections[5];
            this.displayGroupViewPortSize = mappingOrder[this.alpha]['collection-grid-module']['displayModuleOn'];
        }
    },
    template: `
        <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'CG' -->
            <section data-bind="" class="collection-grid-module background-color-off-white">
                <div class="row fullwidth">
                    <div class="small-12 large-11 xlarge-10 xxlarge-8 large-centered columns">
                        <div class="row container">
                            <div class="small-12 medium-6 columns">
                                <div class="flex">
                                    <div class="small-8-width">
                                        <a data-bind="attr: { href: addUgDomain(arrayContent1.image.link), 'data-type': 'Image', 'data-description': arrayContent1.image.description, 'data-itemNumber': arrayContent1.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                            <div class="responsively-lazy preventReflow">
                                                <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent1.item, arrayContent1.image.customImage.large, arrayContent1.image.customImage.small), src: arrayContent1.image.customImage.large ? arrayContent1.image.customImage.large : productImgPath(arrayContent1.item,360), alt: cta.text }"/>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="small-4-width">
                                        <div>
                                            <a data-bind="attr: { href: addUgDomain(arrayContent2.image.link), 'data-type': 'Image', 'data-description': arrayContent2.image.description, 'data-itemNumber': arrayContent2.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent2.item, arrayContent2.image.customImage.large, arrayContent2.image.customImage.small), src: arrayContent2.image.customImage.large ? arrayContent2.image.customImage.large : productImgPath(arrayContent2.item,360), alt: cta.text }"/>
                                                </div>
                                            </a>
                                        </div>
                                        <div>
                                            <a data-bind="attr: { href: addUgDomain(arrayContent3.image.link), 'data-type': 'Image', 'data-description': arrayContent3.image.description, 'data-itemNumber': arrayContent3.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent3.item, arrayContent3.image.customImage.large, arrayContent3.image.customImage.small), src: arrayContent3.image.customImage.large ? arrayContent3.image.customImage.large : productImgPath(arrayContent3.item,360), alt: cta.text }"/>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- ko if: viewPortSize() === 'small' -->
                                <div class="small-12 text-center columns white-box-container">
                                    <!-- ko if: section.text -->
                                        <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                    <!-- /ko -->

                                    <a class="a-secondary" data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                        <h3 data-bind="html: headline.text"></h3>
                                    </a>

                                    <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                </div>
                            <!-- /ko -->

                            <div class="small-12 medium-6 columns">
                                <div class="flex">
                                    <div class="small-8-width">
                                        <a data-bind="attr: { href: addUgDomain(arrayContent4.image.link), 'data-type': 'Image', 'data-description': arrayContent4.image.description, 'data-itemNumber': arrayContent4.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                            <div class="responsively-lazy preventReflow">
                                                <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent4.item, arrayContent4.image.customImage.large, arrayContent4.image.customImage.small), src: arrayContent4.image.customImage.large ? arrayContent4.image.customImage.large : productImgPath(arrayContent4.item,360), alt: cta.text }"/>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="small-4-width">
                                        <div>
                                            <a data-bind="attr: { href: addUgDomain(arrayContent5.image.link), 'data-type': 'Image', 'data-description': arrayContent5.image.description, 'data-itemNumber': arrayContent5.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent5.item, arrayContent5.image.customImage.large, arrayContent5.image.customImage.small), src: arrayContent5.image.customImage.large ? arrayContent5.image.customImage.large : productImgPath(arrayContent5.item,360), alt: cta.text }"/>
                                                </div>
                                            </a>
                                        </div>
                                        <div>
                                            <a data-bind="attr: { href: addUgDomain(arrayContent6.image.link), 'data-type': 'Image', 'data-description': arrayContent6.image.description, 'data-itemNumber': arrayContent6.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent6.item, arrayContent6.image.customImage.large, arrayContent6.image.customImage.small), src: arrayContent6.image.customImage.large ? arrayContent6.image.customImage.large : productImgPath(arrayContent6.item,360), alt: cta.text }"/>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- ko if: viewPortSize() != 'small' -->
                                <div class="small-12 columns">
                                    <div class="row">
                                        <div class="medium-8 large-6 medium-centered columns">
                                            <div class="white-box-container text-center">
                                                <!-- ko if: section.text -->
                                                    <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                <!-- /ko -->
                                                <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h1 data-bind="html: headline.text"></h1></a>
                                                <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- /ko -->
                        </div>
                    </div>
                </div>
            </section>
        <!-- /ko -->`, synchronous: true
});

ko.components.register('carousel-module', {
    viewModel: class CarouselModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.section = mappingOrder[this.alpha]['carousel-module']['section'];
            this.headline = mappingOrder[this.alpha]['carousel-module']['headline'];
            this.cta = mappingOrder[this.alpha]['carousel-module']['cta'];
            this.carouselModulesSections = mappingOrder[this.alpha]['carousel-module']['sections'];
            this.arrayContent1 = this.carouselModulesSections[0];
            this.arrayContent2 = this.carouselModulesSections[1];
            this.arrayContent3 = this.carouselModulesSections[2];
            this.arrayContent4 = this.carouselModulesSections[3];
            this.arrayContent5 = this.carouselModulesSections[4];
            this.arrayContent6 = this.carouselModulesSections[5];
            this.displayGroupViewPortSize = mappingOrder[this.alpha]['carousel-module']['displayModuleOn'];
            ko.bindingHandlers.reinit = {
                update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                    $(function () {
                        var mySwiper = new Swiper('.swiper-container', {
                            loop: true,
                            loopAdditionalSlides: 0,
                            loopedSlides: 0,
                            nextButton: '.swiper-button-next',
                            prevButton: '.swiper-button-prev',
                            slidesPerView: 5,
                            spaceBetween: 12,
                            centeredSlides: true,
                            breakpoints: {
                                1024: {
                                    slidesPerGroup: 3,
                                    slidesPerView: 3
                                },
                                640: {
                                    slidesPerGroup: 2,
                                    slidesPerView: 2
                                },
                                320: {
                                    slidesPerGroup: 2,
                                    slidesPerView: 2
                                }
                            }
                        });
                    })
                }
            };
        }
    },
    template: `
        <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'CL' -->
            <section data-bind="" class="carousel-module background-color-off-white">
                <div class="row fullwidth">
                    <!-- ko if: viewPortSize() === 'small' -->
                        <!-- ko if: section.text -->
                            <div class="small-12 text-center columns">
                                <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                            </div>
                        <!-- /ko -->

                        <div class="small-12 text-center columns">
                            <a class="a-secondary" data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                <h3 data-bind="html: headline.text"></h3>
                            </a>
                        </div>

                        <div class="small-12 columns carouselPadding">
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    <!-- ko fastForEach: carouselModulesSections -->
                                        <div class="swiper-slide">
                                            <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': $parent.cta.text, 'data-sectionDescription': $parent.section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: $parent.cta.text }"/>
                                                </div>
                                            </a>
                                        </div>
                                    <!-- /ko -->
                                </div>
                                <div class="swiper-button-prev"><span class="icon-caret_left icon-lg"></span></div>
                                <div class="swiper-button-next"><span class="icon-caret_right icon-lg"></span></div>
                            </div>
                        </div>
                        <div class="small-10 small-centered columns" data-bind="reinit">
                            <a data-bind="attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                <button class="btn-secondary expand" data-bind="html: cta.text"></button>
                            </a>
                        </div>
                    <!-- /ko -->

                    <!-- ko if: viewPortSize() != 'small' -->
                        <div class="small-12 large-11 xlarge-10 xxlarge-8 large-centered columns">
                            <div class="row container">
                                <div class="small-12 medium-6 columns">
                                    <div class="flex">
                                        <div class="small-8-width">
                                            <a data-bind="attr: { href: addUgDomain(arrayContent1.image.link), 'data-type': 'Image', 'data-description': arrayContent1.image.description, 'data-itemNumber': arrayContent1.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent1.item, arrayContent1.image.customImage.large, arrayContent1.image.customImage.small), src: arrayContent1.image.customImage.large ? arrayContent1.image.customImage.large : productImgPath(arrayContent1.item,360), alt: cta.text }"/>
                                                </div>
                                            </a>
                                        </div>

                                        <div class="small-4-width">
                                            <div>
                                                <a data-bind="attr: { href: addUgDomain(arrayContent2.image.link), 'data-type': 'Image', 'data-description': arrayContent2.image.description, 'data-itemNumber': arrayContent2.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                    <div class="responsively-lazy preventReflow">
                                                        <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent2.item, arrayContent2.image.customImage.large, arrayContent2.image.customImage.small), src: arrayContent2.image.customImage.large ? arrayContent2.image.customImage.large : productImgPath(arrayContent2.item,360), alt: cta.text }"/>
                                                    </div>
                                                </a>
                                            </div>
                                            <div>
                                                <a data-bind="attr: { href: addUgDomain(arrayContent3.image.link), 'data-type': 'Image', 'data-description': arrayContent3.image.description, 'data-itemNumber': arrayContent3.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                    <div class="responsively-lazy preventReflow">
                                                        <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent3.item, arrayContent3.image.customImage.large, arrayContent3.image.customImage.small), src: arrayContent3.image.customImage.large ? arrayContent3.image.customImage.large : productImgPath(arrayContent3.item,360), alt: cta.text }"/>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="small-12 medium-6 columns">
                                    <div class="flex">
                                        <div class="small-8-width">
                                            <a data-bind="attr: { href: addUgDomain(arrayContent4.image.link), 'data-type': 'Image', 'data-description': arrayContent4.image.description, 'data-itemNumber': arrayContent4.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent4.item, arrayContent4.image.customImage.large, arrayContent4.image.customImage.small), src: arrayContent4.image.customImage.large ? arrayContent4.image.customImage.large : productImgPath(arrayContent4.item,360), alt: cta.text }"/>
                                                </div>
                                            </a>
                                        </div>

                                        <div class="small-4-width">
                                            <div>
                                                <a data-bind="attr: { href: addUgDomain(arrayContent5.image.link), 'data-type': 'Image', 'data-description': arrayContent5.image.description, 'data-itemNumber': arrayContent5.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                    <div class="responsively-lazy preventReflow">
                                                        <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent5.item, arrayContent5.image.customImage.large, arrayContent5.image.customImage.small), src: arrayContent5.image.customImage.large ? arrayContent5.image.customImage.large : productImgPath(arrayContent5.item,360), alt: cta.text }"/>
                                                    </div>
                                                </a>
                                            </div>
                                            <div>
                                                <a data-bind="attr: { href: addUgDomain(arrayContent6.image.link), 'data-type': 'Image', 'data-description': arrayContent6.image.description, 'data-itemNumber': arrayContent6.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }">
                                                    <div class="responsively-lazy preventReflow">
                                                        <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent6.item, arrayContent6.image.customImage.large, arrayContent6.image.customImage.small), src: arrayContent6.image.customImage.large ? arrayContent6.image.customImage.large : productImgPath(arrayContent6.item,360), alt: cta.text }"/>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="small-12 columns">
                                    <div class="row">
                                        <div class="medium-8 large-6 medium-centered columns">
                                            <div class="white-box-container text-center">
                                                <!-- ko if: section.text -->
                                                    <label class="body-small-caps-override"><a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></label>
                                                <!-- /ko -->
                                                <a data-bind="attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }"><h1 data-bind="html: headline.text"></h1></a>
                                                <p class="body-small-override"><a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }"></a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- /ko -->
                </div>
            </section>
        <!-- /ko -->`, synchronous: true
});

ko.components.register('text-link-module', {
    viewModel: class TextLinkModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.section = mappingOrder[this.alpha]['text-link-module']['section'];
            this.textLinkModuleSections = mappingOrder[this.alpha]['text-link-module']['sections'];
            this.nonHiddenModuleSections = [];
            this.displayGroupViewPortSize = this.displayGroup(this.textLinkModuleSections);
        }
    },
    template: `
        <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'TL' -->
            <section data-bind="" class="text-link-module background-color-off-white">
                <div class="row fullwidth waterColor">
                    <div class="small-12 large-11 xlarge-10 xxlarge-8 small-centered columns container">
                        <!-- ko if: section.text -->
                            <div class="row">
                                <div class="small-12 text-center columns">
                                    <h2>
                                        <a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-sectionDescription': section.description }"></a>
                                    </h2>
                                </div>
                            </div>
                        <!-- /ko -->

                        <!-- ko if: viewPortSize() === 'small' -->
                            <div class="row">
                                <!-- ko fastForEach: textLinkModuleSections -->
                                    <!-- ko if: $parent.displayOn(displayModuleOn) -->
                                        <div class="small-6 columns">
                                            <div class="text-link-container">
                                                <div class="content">
                                                    <h4>
                                                        <a class="a-secondary" data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }"></a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    <!-- /ko -->
                                <!-- /ko -->
                            </div>
                        <!-- /ko -->

                        <!-- ko if: viewPortSize() != 'small' -->
                            <div class="row">
                                <div class="medium-12 columns">
                                    <!-- ko fastForEach: textLinkModuleSections -->
                                        <!-- ko if: $parent.displayOn(displayModuleOn) -->
                                            <div data-bind="attr: { class: $parent.classNameBlockGrid($parent.textLinkModuleSections) + ' productContainer text-center content' }">
                                                <div class="responsively-lazy preventReflow">
                                                    <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }">
                                                        <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }"/>
                                                    </a>
                                                </div>
                                                <a class="a-secondary" data-bind="attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }">
                                                    <h4 data-bind="html: cta.text"></h4>
                                                </a>
                                            </div>
                                        <!-- /ko -->
                                    <!-- /ko -->
                                </div>
                            </div>
                        <!-- /ko -->
                    </div>
                </div>
            </section>
        <!-- /ko -->`, synchronous: true
});

ko.components.register('image-link-double-module', {
    viewModel: class ImageLinkDoubleModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.section = mappingOrder[this.alpha]['image-link-double-module']['section'];
            this.imageLinkDoubleModuleSections = mappingOrder[this.alpha]['image-link-double-module']['sections'];
            this.nonHiddenModuleSections = [];
            this.displayGroupViewPortSize = this.displayGroup(this.imageLinkDoubleModuleSections);
        }
    },
    template: `
        <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'LD' -->
            <section data-bind="" class="image-link-double-module background-color-off-white">
                <div class="row fullwidth waterColor">
                    <div class="small-12 large-11 xlarge-10 xxlarge-8 small-centered columns container">
                        <!-- ko if: section.text -->
                            <div class="row">
                                <div class="small-12 xlarge-10 xxlarge-8 text-center xlarge-centered columns">
                                    <h2>
                                        <a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-sectionDescription': section.description }"></a>
                                    </h2>
                                </div>
                            </div>
                        <!-- /ko -->
                        <div class="row">
                            <div class="small-11 medium-12 small-centered columns">
                                <!-- ko fastForEach: imageLinkDoubleModuleSections -->
                                    <!-- ko if: $parent.displayOn(displayModuleOn) -->
                                        <div data-bind="attr: { class: $parent.classNameBlockGrid($parent.imageLinkDoubleModuleSections) + ' productContainer text-center' }">
                                            <div class="responsively-lazy preventReflow">
                                                <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }">
                                                    <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }"/>
                                                </a>
                                            </div>
                                            <h4><a class="a-secondary" data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }"></a></h4>
                                        </div>
                                    <!-- /ko -->
                                <!-- /ko -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        <!-- /ko -->`, synchronous: true
    });

ko.components.register('button-link-double-module', {
    viewModel: class ButtonLinkDoubleModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.section = mappingOrder[this.alpha]['button-link-double-module']['section'];
            this.buttonLinkDoubleModuleSections = mappingOrder[this.alpha]['button-link-double-module']['sections'];
            this.arrayContent1 = this.buttonLinkDoubleModuleSections[0];
            this.arrayContent2 = this.buttonLinkDoubleModuleSections[1];
            this.arrayContent3 = this.buttonLinkDoubleModuleSections[2];
            this.arrayContent4 = this.buttonLinkDoubleModuleSections[3];
            this.arrayContent5 = this.buttonLinkDoubleModuleSections[4];
            this.arrayContent6 = this.buttonLinkDoubleModuleSections[5];
            this.displayGroupViewPortSize = this.displayGroup(this.buttonLinkDoubleModuleSections);
            this.nonHiddenModuleSections = [];
            this.shouldStack = function() {
                return this.viewPortSize() === 'xlarge' && this.buttonLinkDoubleModuleSections.length === 6 ? true : false;
            }
            this.showBtnContainerInside = function() {
                return this.viewPortSize() != 'small' && this.buttonLinkDoubleModuleSections.length === 4 || this.viewPortSize() === 'medium' && this.buttonLinkDoubleModuleSections.length === 6 ? true : false;
            }
            this.showBtnContainerHanging = function() {
                return this.viewPortSize() === 'small' || this.viewPortSize() === 'large' && this.buttonLinkDoubleModuleSections.length === 6 ? true : false;
            }
        }
    },
    template: `
        <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'BD' -->
            <section data-bind="" class="button-link-double-module background-color-white">

                <div class="row">
                    <div class="small-12 columns">
                        <div class="row collapse">
                            <div class="small-8 medium-10 large-8 small-centered columns">
                                <hr class="dottedSpacer">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ko if: section.text -->
                    <div class="row">
                        <div class="small-12 small-centered text-center columns">
                            <h2>
                                <a class="a-secondary" data-bind="html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-sectionDescription': section.description }"></a>
                            </h2>
                        </div>
                    </div>
                <!-- /ko -->

                <!-- ko if: !shouldStack() -->
                    <div class="row fullwidth">
                        <div class="small-12 large-11 xlarge-10 xxlarge-8 large-centered columns">
                            <!-- ko fastForEach: buttonLinkDoubleModuleSections -->
                                <!-- ko if: $parent.displayOn(displayModuleOn) -->
                                    <div data-bind="attr: { class: $parent.classNameBlockGrid($parent.buttonLinkDoubleModuleSections) + ' productContainer' }">
                                        <div class="responsively-lazy preventReflow">
                                            <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }">
                                                <img data-bind="attr: { src: image.customImage.large ? image.customImage.large : productImgPath(item,640), 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small),  alt: cta.text }"/>
                                            </a>
                                            <!-- ko if: $parent.showBtnContainerInside() -->
                                                <div class="btnContainerInside">
                                                    <a data-bind="attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }">
                                                        <button class="btn-secondary expand" data-bind="html: cta.text"></button>
                                                    </a>
                                                </div>
                                            <!-- /ko -->
                                        </div>
                                        <!-- ko if: $parent.showBtnContainerHanging() -->
                                            <div class="btnContainerHanging">
                                                <a data-bind="attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }">
                                                    <button class="btn-secondary expand" data-bind="html: cta.text"></button>
                                                </a>
                                            </div>
                                        <!-- /ko -->
                                    </div>
                                <!-- /ko -->
                            <!-- /ko -->
                        </div>
                    </div>
                <!-- /ko -->

                <!-- ko if: shouldStack() -->
                    <div class="row fullwidth">
                        <div class="xlarge-10 xxlarge-8 xlarge-centered columns stackedMargin">
                            <div class="row">
                                <div class="small-12 medium-6 columns">
                                    <div class="row">
                                        <div class="xlarge-8 columns">
                                            <div class="responsively-lazy preventReflow">
                                                <a data-bind="attr: { href: addUgDomain(arrayContent1.image.link), 'data-type': 'Image', 'data-description': arrayContent1.image.description }">
                                                    <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent1.item, arrayContent1.image.customImage.large, arrayContent1.image.customImage.small), src: arrayContent1.image.customImage.large ? arrayContent1.image.customImage.large : productImgPath(arrayContent1.item,360), alt: arrayContent1.cta.text }"/>
                                                </a>
                                                <div class="btnContainerInside">
                                                    <a data-bind="attr: { href: addUgDomain(arrayContent1.cta.link), 'data-type': 'CTA', 'data-description': arrayContent1.cta.description }">
                                                        <button class="btn-secondary expand" data-bind="html: arrayContent1.cta.text"></button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="xlarge-4 columns">
                                            <div class="colBottomPadding">
                                                <div class="responsively-lazy preventReflow">
                                                    <a data-bind="attr: { href: addUgDomain(arrayContent2.image.link), 'data-type': 'Image', 'data-description': arrayContent2.image.description }">
                                                        <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent2.item, arrayContent2.image.customImage.large, arrayContent2.image.customImage.small), src: arrayContent2.image.customImage.large ? arrayContent2.image.customImage.large : productImgPath(arrayContent2.item,360), alt: arrayContent2.cta.text }"/>
                                                    </a>
                                                    <div class="btnContainerInside">
                                                        <a data-bind="attr: { href: addUgDomain(arrayContent2.cta.link), 'data-type': 'CTA', 'data-description': arrayContent2.cta.description }">
                                                            <button class="btn-secondary expand" data-bind="html: arrayContent2.cta.text"></button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="responsively-lazy preventReflow">
                                                    <a data-bind="attr: { href: addUgDomain(arrayContent3.image.link), 'data-type': 'Image', 'data-description': arrayContent3.image.description }">
                                                        <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent3.item, arrayContent3.image.customImage.large, arrayContent3.image.customImage.small), src: arrayContent3.image.customImage.large ? arrayContent3.image.customImage.large : productImgPath(arrayContent3.item,360), alt: arrayContent3.cta.text }"/>
                                                    </a>
                                                    <div class="btnContainerInside">
                                                        <a data-bind="attr: { href: addUgDomain(arrayContent3.cta.link), 'data-type': 'CTA', 'data-description': arrayContent3.cta.description }">
                                                            <button class="btn-secondary expand" data-bind="html: arrayContent3.cta.text"></button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="small-12 medium-6 columns">
                                    <div class="row">
                                        <div class="xlarge-8 columns">
                                            <div class="responsively-lazy preventReflow">
                                                <a data-bind="attr: { href: addUgDomain(arrayContent4.image.link), 'data-type': 'Image', 'data-description': arrayContent4.image.description }">
                                                    <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent4.item, arrayContent4.image.customImage.large, arrayContent4.image.customImage.small), src: arrayContent4.image.customImage.large ? arrayContent4.image.customImage.large : productImgPath(arrayContent4.item,360), alt: arrayContent4.cta.text }"/>
                                                </a>
                                                <div class="btnContainerInside">
                                                    <a data-bind="attr: { href: addUgDomain(arrayContent4.cta.link), 'data-type': 'CTA', 'data-description': arrayContent4.cta.description }">
                                                        <button class="btn-secondary expand" data-bind="html: arrayContent4.cta.text"></button>
                                                    </a>
                                                </div>
                                            </div>
                                            </a>
                                        </div>
                                        <div class="xlarge-4 columns">
                                            <div class="colBottomPadding">
                                                <div class="responsively-lazy preventReflow">
                                                    <a data-bind="attr: { href: addUgDomain(arrayContent5.image.link), 'data-type': 'Image', 'data-description': arrayContent5.image.description }">
                                                        <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent5.item, arrayContent5.image.customImage.large, arrayContent5.image.customImage.small), src: arrayContent5.image.customImage.large ? arrayContent5.image.customImage.large : productImgPath(arrayContent5.item,360), alt: arrayContent5.cta.text }"/>
                                                    </a>
                                                    <div class="btnContainerInside">
                                                        <a data-bind="attr: { href: addUgDomain(arrayContent5.cta.link), 'data-type': 'CTA', 'data-description': arrayContent5.cta.description }">
                                                            <button class="btn-secondary expand" data-bind="html: arrayContent5.cta.text"></button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="responsively-lazy preventReflow">
                                                    <a data-bind="attr: { href: addUgDomain(arrayContent6.image.link), 'data-type': 'Image', 'data-description': arrayContent6.image.description }">
                                                        <img data-bind="attr: { 'data-srcset': responsiveImage(arrayContent6.item, arrayContent6.image.customImage.large, arrayContent6.image.customImage.small), src: arrayContent6.image.customImage.large ? arrayContent6.image.customImage.large : productImgPath(arrayContent6.item,360), alt: arrayContent6.cta.text }"/>
                                                    </a>
                                                    <div class="btnContainerInside">
                                                        <a data-bind="attr: { href: addUgDomain(arrayContent3.cta.link), 'data-type': 'CTA', 'data-description': arrayContent6.cta.description }">
                                                            <button class="btn-secondary expand" data-bind="html: arrayContent3.cta.text"></button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- /ko -->

                <div class="row">
                    <div class="small-12 columns">
                        <div class="row collapse">
                            <div class="small-8 medium-10 large-8 small-centered columns">
                                <hr class="dottedSpacer">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        <!-- /ko -->`, synchronous: true
});

ko.components.register('seo-link-module', {
    viewModel: class SeoLinkModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.alpha = this.alpha.charAt(params.data);
            this.seo1 = mappingOrder[this.alpha]['seo-link-module']['seo1'];
            this.seo1Sections = mappingOrder[this.alpha]['seo-link-module']['seo1']['sections'];
            this.seo2 = mappingOrder[this.alpha]['seo-link-module']['seo2'];
            this.seo2Sections = mappingOrder[this.alpha]['seo-link-module']['seo2']['sections'];
            this.displayGroupViewPortSize = 'small';
        }
    },
    template: `
        <!-- ko if: displayOn(displayGroupViewPortSize), resizeView: 'TL_SEO' -->
            <section data-bind="" class="seoLinks text-link-module background-color-off-white">
                <!-- ko if: viewPortSize() === 'small' -->
                    <div class"row">
                        <div class="small-12 small-centered columns container">
                            <!-- ko if: seo1.section.text -->
                                <div class="row">
                                    <div class="small-12 text-center columns">
                                        <h2>
                                            <a class="a-secondary" data-bind="html: seo1.section.text, attr: { href: addUgDomain(seo1.section.link), 'data-type': 'Section', 'data-description': seo1.section.description, 'data-sectionDescription': seo1.section.description  }"></a>
                                        </h2>
                                    </div>
                                </div>
                            <!-- /ko -->
                            <div class="row">
                                <!-- ko fastForEach: seo1Sections -->
                                    <div class="small-6 columns">
                                        <div class="text-link-container">
                                            <div class="content"><h4><a class="a-secondary" data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo1.section.description }"></a></h4></div>
                                        </div>
                                    </div>
                                <!-- /ko -->
                            </div>
                        </div>
                    </div>

                    <div class="seoLinks2 image-link-double-module background-color-off-white">
                        <div class="row container">
                            <div class="small-12 small-centered columns">
                                <!-- ko if: seo2.section.text -->
                                    <div class="row">
                                        <div class="small-12 xlarge-10 text-center xlarge-centered columns">
                                            <h2>
                                                <a class="a-secondary" data-bind="html: seo2.section.text, attr: { href: addUgDomain(seo2.section.link), 'data-type': 'Section', 'data-description': seo2.section.description, 'data-sectionDescription': seo2.section.description }"></a>
                                            </h2>
                                        </div>
                                    </div>
                                <!-- /ko -->
                            </div>

                            <div class="small-11 small-centered columns">
                                <div class="row">
                                    <!-- ko fastForEach: seo2Sections -->
                                        <div data-bind="attr: { class: $parent.classNameBlockGrid($parent.seo2Sections) + ' productContainer text-center content' }">
                                            <div class="responsively-lazy preventReflow">
                                                <a data-bind="attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo2.section.description}">
                                                    <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }"/>
                                                </a>
                                            </div>
                                            <h4><a class="a-secondary" data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo2.section.description }"></a></h4>
                                        </div>
                                    <!-- /ko -->
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- /ko -->

                <!-- ko if: viewPortSize() != 'small' -->
                    <div class="row fullwidth seo1LinksContainer">
                        <div class="small-12 columns">
                            <div class="row topSpacer">
                                <div class="small-12 columns">
                                    <div class="row collapse">
                                        <div class="small-6 medium-10 large-8 small-centered columns" style="width: 372px;">
                                            <hr class="dottedSpacer">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="small-12 text-center columns">
                                    <div>
                                        <div class="topCatContent">
                                            <span data-bind="html: seo1.section.text"></span>
                                            <div class="displayInline">
                                                <!-- ko fastForEach: seo1Sections -->
                                                    <a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo1.section.description }" class="body-small-crumbs"></a>
                                                <!-- /ko -->
                                            </div>
                                        </div>

                                        <div>
                                            <span data-bind="html: seo2.section.text"></span>
                                            <div class="displayInline">
                                                <!-- ko fastForEach: seo2Sections -->
                                                    <a data-bind="html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo2.section.description }" class="body-small-crumbs"></a>
                                                <!-- /ko -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row bottomSpacer">
                                <div class="small-12 columns">
                                    <div class="row collapse">
                                        <div class="small-6 medium-10 large-8 small-centered columns" style="width: 372px;">
                                            <hr class="dottedSpacer">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- /ko -->
            </section>
        <!-- /ko -->`, synchronous: true
});

// ko.components.register('homePage-container', {
//
//     viewModel: class HomePageContainerComponentModel extends Dependents {
//         constructor(params) {
//             super(params);
//             this.totalModules = Object.keys(mappingOrder).length;
//             this.alphaArry = Object.keys(mappingOrder);
//             this.alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//             this.moduleArray = [];
//             this.alphaArry.forEach((alpha, index) => {
//                 this.moduleArray.push(Object.keys(mappingOrder[this.alpha.charAt(index)])[0]);
//             })
//             //document.getElementById("hp_modules");
//             //$('#hp_modules').append('<large-feature-module params=position: 1></large-feature-module>');
//             // console.log('asasd ',$('#hp_modules'))
//             $('#hp_modules').append('<large-feature-module></large-feature-module>');
//             console.log($('#hp_modules'))
//         }
//     },
//     template: `
//
//
//     `, synchronous: true
// });

(function () {

   var report = [];
   var lastReport = 0;
   var debounceWait = 500;

   var viewReport = _.debounce(function () {
      if (report.length) {
         report = _.sortBy(report, "totalDuration").reverse();

         _.each(report, function(r) {
            r.entries = _.sortBy(r.entries, "duration").reverse();
         });

         var worst = _.max(report, function (r) {
            return r.totalDuration;
         });
         var total = _.reduce(report, function (memo, r) {
            return memo + r.totalDuration;
         }, 0);

         var levels = [
            { min: 0, max: 50, style: "background-color: green; color: white;" },
            { min: 51, max: 150, style: "background-color: orange; color: white;" },
            { min: 151, max: 99999, style: "background-color: red; color: white;" }
         ];

         var getLevel = function (v) {
            return _.find(levels, function (def) {
               return v >= def.min && v <= def.max;
            }).style;
         };

         console.log("%cKnockout Binding Report", "background-color: yellow; font-size: 2em;");
         console.log("Report Date:", new Date().toISOString(), "(+" + (new Date().getTime() - debounceWait - lastReport) + "ms)");
         console.log("%cTotal: " + total + "ms", getLevel(total));
         console.log("%cTop: " + worst.handler + " (" + worst.totalDuration + "ms)", getLevel(worst.totalDuration));

         console.table(report);

         report = [];
         lastReport = new Date().getTime();
      }
   }, debounceWait);

   var getWrapper = function (bindingName) {
      return function(fn, element, valueAccessor, allBindings, viewModel, bindingContext) {
         var st = new Date().getTime();

         var result = fn(element, valueAccessor, allBindings, viewModel, bindingContext);

         var duration = new Date().getTime() - st;
         var handlerReport = _.findWhere(report, { handler: bindingName });

         if (!handlerReport) {
            handlerReport = {
               handler: bindingName,
               totalDuration: 0,
               entries: []
            };
            report.push(handlerReport);
         }

         handlerReport.totalDuration += duration;
         handlerReport.entries.push({
            element: element,
            binding: (element.attributes && element.attributes["data-bind"]) || element.nodeValue || "",
            duration: duration
         });

         viewReport();

         return result;
      };
   };

   _.each(ko.bindingHandlers, function (binding, name) {
      if (binding.init) binding.init = _.wrap(binding.init, getWrapper(name + ".init"));
      if (binding.update) binding.update = _.wrap(binding.update, getWrapper(name + ".update"));
   });

})();
ko.applyBindings();
