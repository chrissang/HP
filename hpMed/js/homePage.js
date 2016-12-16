var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var moduleOrderStatic = [];
var moduleOrder = [];
var alphaOrder = [];
var counter = 0;
var imageDir = '//www.uncommongoods.com/images';
var ugWeb = '//www.uncommongoods.com';
var Dependents = (function () {
    function Dependents(params) {
        this.modulePosition = params.data.index + 1;
        this.displayGroupViewPortSize = params.data.displayGroupOn;
        this.viewPortSize = ko.observable(breakpointValue());
        this.displayOn = function (viewPortSize) {
            return {
                'small': this.viewPortSize() === 'small' || this.viewPortSize() === 'medium' || this.viewPortSize() === 'large' || this.viewPortSize() === 'xlarge' ? true : false,
                'medium': this.viewPortSize() === 'medium' || this.viewPortSize() === 'large' || this.viewPortSize() === 'xlarge' ? true : false,
                'large': this.viewPortSize() === 'large' || this.viewPortSize() === 'xlarge' ? true : false,
                'xlarge': this.viewPortSize() === 'xlarge' ? true : false
            }[viewPortSize];
        };
        this.displayGroup = function (arry) {
            var sectionArray = [];
            arry.forEach(function (el, i) {
                sectionArray.push(el.displayModuleOn);
            });
            if (sectionArray.indexOf('small') > -1) {
                return 'small';
            }
            else if (sectionArray.indexOf('medium') > -1) {
                return 'medium';
            }
            else if (sectionArray.indexOf('large') > -1) {
                return 'large';
            }
            else {
                return 'xlarge';
            }
        };
        this.responsiveImage = function (itemId, largeImage, smallImage) {
            var responsiveLarge = function () {
                return largeImage ? largeImage + ' 1024w, ' + largeImage + ' 640w, ' : productImgPath(itemId, 640) + ' 1024w, ' + productImgPath(itemId, 640) + ' 640w, ';
            };
            var responsiveSmall = function () {
                return smallImage ? smallImage + ' 320w, ' : productImgPath(itemId, 360) + ' 320w';
            };
            return responsiveLarge() + responsiveSmall();
        };
        this.isVideo = function (video) {
            return video.split('.').pop() === 'mp4' ? true : false;
        };
        this.posterImage = function (videoFile) {
            return videoFile.split('.').shift() + '.jpg';
        };
        this.isEven = function (index) {
            return index % 2 === 0 ? true : false;
        };
        this.classNameBlockGrid = function (sectionData) {
            var _this = this;
            this.nonHiddenModuleSections = [];
            if (this.viewPortSize() === 'small') {
                return 'small-block-grid-2';
            }
            else if (this.viewPortSize() === 'medium') {
                sectionData.forEach(function (module, index) {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium') {
                        _this.nonHiddenModuleSections.push(module.displayModuleOn);
                    }
                });
                return {
                    '4': 'medium-block-grid-4',
                    '6': 'medium-block-grid-3'
                }[this.nonHiddenModuleSections.length];
            }
            else if (this.viewPortSize() === 'large') {
                sectionData.forEach(function (module, index) {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large') {
                        _this.nonHiddenModuleSections.push(module.displayModuleOn);
                    }
                });
                return {
                    '4': 'large-block-grid-4',
                    '6': 'large-block-grid-6'
                }[this.nonHiddenModuleSections.length];
            }
            else {
                sectionData.forEach(function (module, index) {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large' || module.displayModuleOn === 'xlarge') {
                        _this.nonHiddenModuleSections.push(module.displayModuleOn);
                    }
                });
                return {
                    '4': 'medium-block-grid-4',
                    '6': 'medium-block-grid-6'
                }[this.nonHiddenModuleSections.length];
            }
        };
        this.className = function (sectionData) {
            var nonHiddenModuleSections = [];
            if (this.viewPortSize() === 'large') {
                sectionData.forEach(function (module, index) {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large') {
                        nonHiddenModuleSections.push(module.displayModuleOn);
                    }
                });
                return {
                    '2': 'large-6 columns',
                    '3': 'large-4 columns',
                    '4': 'large-6 columns'
                }[nonHiddenModuleSections.length];
            }
            else {
                sectionData.forEach(function (module, index) {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large' || module.displayModuleOn === 'xlarge') {
                        nonHiddenModuleSections.push(module.displayModuleOn);
                    }
                });
                return {
                    '2': 'large-6 columns',
                    '3': 'large-4 columns',
                    '4': 'large-6 columns'
                }[nonHiddenModuleSections.length];
            }
        };
        ko.bindingHandlers.resizeView = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                $(window).resize(function () {
                    var breakpoint = breakpointValue();
                    viewModel.viewPortSize(breakpoint);
                });
                var section = allBindings().resizeView;
                var display = allBindings().if;
                moduleOrderStatic.push(section);
                if (display) {
                    moduleOrder.push(section);
                }
                else {
                    moduleOrder.push('');
                }
                //moduleOrder = moduleOrder.filter(Boolean);
                $(document).ready(function () {
                    var breakpoint = breakpointValue();
                    viewModel.viewPortSize(breakpoint);
                });
            },
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var display = allBindings().if;
                var index = viewModel.modulePosition - 1;
                var totalModules = bindingContext.$parents[1].totalModules;
                var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $(document).ready(function () {
                    if (display) {
                        moduleOrder[index] = moduleOrderStatic[index];
                    }
                    else {
                        moduleOrder[index] = '';
                    }
                    if (display) {
                        var elements = Array.from(ko.virtualElements.firstChild(element).nextElementSibling.querySelectorAll('a'));
                        var arryLength = elements.length;
                        while (arryLength--) {
                            if (elements[arryLength].parentElement.classList.contains("swiper-slide-duplicate")) {
                                elements.splice(arryLength, 1);
                            }
                        }
                        elements.forEach(function (el, index) {
                            if (index === 0) {
                                alphaOrder.push(alpha.charAt(counter));
                                counter++;
                            }
                            var linkNumber = index + 1;
                            var dataType = el.getAttribute("data-type");
                            var dataDescription = el.getAttribute('data-description').split(' ').join('_');
                            var moduleType = allBindings().resizeView;
                            var alphaChar = alphaOrder[alphaOrder.length - 1];
                            if (dataDescription != '') {
                                dataDescription = '_' + dataDescription;
                            }
                            var trackingCode = 'hp_module_' + alphaChar + linkNumber + '_' + dataType + '_' + moduleType + dataDescription;
                            var trackingLink = el.getAttribute("href");
                            var ctaText = el.getAttribute("data-cta") ? el.getAttribute("data-cta") : 'NA';
                            var itemNumber = el.getAttribute("data-itemNumber") ? el.getAttribute("data-itemNumber") : "NA";
                            var sectionDescription = el.getAttribute("data-sectionDescription") ? el.getAttribute("data-sectionDescription") : 'NA';
                            var id = alphaChar + linkNumber + '_' + moduleType;
                            var name = ctaText + '_' + trackingLink.replace(/https:\/\/www.uncommongoods.com/g, '').replace("//blog.uncommongoods.com", "/blog");
                            var creative = itemNumber;
                            var pos = sectionDescription;
                            trackingLink = trackingLink.replace(/https:\/\/www.uncommongoods.com/g, '');
                            //console.log(trackingCode);
                            //console.log(trackingLink);
                            //onPromoClick(`+id+`, `+name+`, `+creative+`, `+pos+`)`
                            if (trackingLink !== '') {
                                if (trackingLink.includes("//blog.uncommongoods.com")) {
                                    trackingLink = trackingLink.replace("//blog.uncommongoods.com", "/blog");
                                    $(el).attr("onclick", "javascript: pageTracker._trackPageview('/internal" + trackingLink + "?source=" + trackingCode + "');dataLayer.push({'internalHPModuleLinkUrl':'/internal" + trackingLink + "?source=" + trackingCode + "'},{'event':'fireGTMTrackHPModulePageView'})");
                                }
                                else {
                                    $(el).attr("onclick", "javascript: pageTracker._trackPageview('/internal" + trackingLink + "?source=" + trackingCode + "');dataLayer.push({'internalHPModuleLinkUrl':'/internal" + trackingLink + "?source=" + trackingCode + "'},{'event':'fireGTMTrackHPModulePageView'})");
                                }
                            }
                            else {
                                $(el).attr("onclick", "javascript: pageTracker._trackPageview('/internal" + trackingLink + "?source=" + trackingCode + "');dataLayer.push({'internalHPModuleLinkUrl':'/internal" + trackingLink + "?source=" + trackingCode + "'},{'event':'fireGTMTrackHPModulePageView'})");
                                $('a[href=""]').click(function (event) {
                                    event.preventDefault();
                                });
                            }
                        });
                    }
                    if (viewModel.modulePosition === totalModules) {
                        var moduleOrderRefresh = moduleOrder.filter(Boolean);
                        counter = 0;
                        alphaOrder = [];
                        moduleOrderRefresh[moduleOrderRefresh.length - 1] === 'BD' ? document.getElementsByClassName("prefooterLine")[0].style.display = 'none' : document.getElementsByClassName("prefooterLine")[0].style.display = 'block';
                    }
                });
            }
        };
        ko.virtualElements.allowedBindings.resizeView = true;
    }
    return Dependents;
}());
;
//Returns screen viewport size (small, medium, large, xlarge)
function breakpointValue() {
    return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
}
;
//Returns default image path
function productImgPath(itemId, size) {
    var itemDir = imageDir + '/items/';
    var itemIdTrim = itemId.toString().slice(0, -2);
    if (size === 640) {
        return itemDir + itemIdTrim + '00/' + itemId + '_1_640px.jpg';
    }
    if (size === 360) {
        return itemDir + itemIdTrim + '00/' + itemId + '_1_360px.jpg';
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
    viewModel: (function (_super) {
        __extends(LargeFeatureModuleComponentModel, _super);
        function LargeFeatureModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.largeFeatureModulesSections = params.data.sections;
            this.displayGroupViewPortSize = ko.observable();
            this.displayGroupViewPortSize(this.displayGroup(this.largeFeatureModulesSections));
            //this.displayGroupViewPortSize = this.displayGroup(this.largeFeatureModulesSections);
        }
        return LargeFeatureModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'LF' -->\n <section data-bind=\"\" class=\"large-feature-module background-color-off-white\">\n <!-- ko foreach: largeFeatureModulesSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <div class=\"row fullwidth\">\n <div class=\"small-12 large-11 xlarge-10 xxlarge-8 large-centered columns\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text }\">\n <picture>\n <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\n <source data-bind=\"attr: { media: '(min-width: 40.063em)', srcset: image.customImage.large ? image.customImage.large : productImgPath(item,640) }\">\n <source data-bind=\"attr: { media: '(max-width: 40em)', srcset: image.customImage.small ? image.customImage.small : productImgPath(item,360) }\">\n <!--[if IE 9]></video><![endif]-->\n\n <!-- ko if: $parent.viewPortSize() === 'small' -->\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { src: image.customImage.small ? image.customImage.small : productImgPath(item,360), alt: cta.text }\">\n </div>\n <!-- /ko -->\n\n <!-- ko if: $parent.viewPortSize() != 'small' -->\n <!-- ko if: $parent.isVideo(image.customImage.large) -->\n <video loop muted autoplay data-bind=\"attr: { poster: $parent.posterImage(image.customImage.large) }\">\n <source data-bind=\"attr: { src: image.customImage.large }\" type=\"video/mp4\">\n <source data-bind=\"attr: { src: image.customImage.large }\" type=\"video/webm\">\n </video>\n <!-- /ko -->\n <!-- ko if: !$parent.isVideo(image.customImage.large) -->\n <div class=\"responsively-lazy preventReflow\">\n <div data-bind=\"style: { backgroundImage: 'url( '+ image.customImage.large +' )'}\" class=\"LF_backgroundImage\"></div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n </picture>\n </a>\n </div>\n </div>\n <div class=\"row fullwidth\">\n <div class=\"small-12 medium-8 large-6 small-centered columns\">\n <div class=\"white-box-container text-center\">\n <a class=\"a-secondary\" data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text }\">\n <h1 data-bind=\"html: headline.text\"></h1>\n </a>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text }\"></a></p>\n </div>\n </div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('small-feature-module', {
    viewModel: (function (_super) {
        __extends(SmallFeatureModuleComponentModel, _super);
        function SmallFeatureModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.smModulesSections = params.data.sections;
            this.displayGroupViewPortSize = ko.observable();
            this.displayGroupViewPortSize(this.displayGroup(this.smModulesSections));
            //this.displayGroupViewPortSize = this.displayGroup(this.smModulesSections);
        }
        return SmallFeatureModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'SF' -->\n <section data-bind=\"\" class=\"small-feature-module background-color-white\">\n <!-- ko if: viewPortSize() === 'small' || viewPortSize() === 'medium' -->\n <!-- ko foreach: smModulesSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <!-- ko if: $parent.isEven($index()) -->\n <div class=\"row fullwidth\">\n <div class=\"container\">\n <div class=\"small-6 medium-7 columns\">\n <div data-bind=\"style: { margin: $parent.viewPortSize() === 'medium' ? '-1.5rem 0 0 -1.5rem' : '0' }\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img class=\"right\" data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n <div class=\"small-6 medium-5 columns text-center\">\n <div class=\"copyContainer\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h3 data-bind=\"html: headline.text\"></h3></a>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text }\"></a></p>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n\n <!-- ko if: !$parent.isEven($index()) -->\n <div class=\"row fullwidth\">\n <div class=\"container\">\n <div class=\"small-6 medium-5 columns text-center\">\n <div class=\"copyContainer\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h3 data-bind=\"html: headline.text\"></h3></a>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n <div class=\"small-6 medium-7 columns\">\n <div data-bind=\"style: { margin: $parent.viewPortSize() === 'medium' ? '-1.5rem -1.5rem 0 0' : '0' }\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description}\">\n <div class=\"responsively-lazy preventReflow\">\n <img class=\"right\" data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n <!-- /ko -->\n <!-- /ko -->\n\n <!-- ko if: viewPortSize() === 'large' || viewPortSize() === 'xlarge' -->\n <div class=\"row fullwidth\">\n <div class=\"large-11 xlarge-10 xxlarge-8 large-centered columns\">\n <div class=\"row fullwidth\">\n <!-- ko foreach: smModulesSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <div data-bind=\"attr: { class: $parent.className($parent.smModulesSections) }\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img class=\"right\" data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }\"/>\n </div>\n </a>\n <div class=\"row\">\n <div class=\"large-12 large-centered columns\">\n <div class=\"white-box-container text-center\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h2 data-bind=\"html: headline.text\"></h2></a>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n </div>\n </div>\n </div>\n <!-- /ko -->\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('basic-story-module', {
    viewModel: (function (_super) {
        __extends(BasicStoryModuleComponentModel, _super);
        function BasicStoryModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.basicStoryModulesSections = params.data.sections;
            this.displayGroupViewPortSize = ko.observable();
            this.displayGroupViewPortSize(this.displayGroup(this.basicStoryModulesSections));
            //this.displayGroupViewPortSize = this.displayGroup(this.basicStoryModulesSections);
        }
        return BasicStoryModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'BS' -->\n <section data-bind=\"\" class=\"basic-story-module background-color-off-white\">\n <!-- ko if: viewPortSize() === 'small' -->\n <!-- ko foreach: basicStoryModulesSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <div class=\"row container\">\n <!-- ko if: section.text -->\n <div class=\"small-12 text-center columns\">\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n </div>\n <!-- /ko -->\n\n <div class=\"small-12 columns\">\n <div class=\"row\">\n <div class=\"small-10 small-centered text-center columns\">\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h2 data-bind=\"html: headline.text\"></h2></a>\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }\"/>\n </div>\n </a>\n <a data-bind=\"attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: cta.text\"></button>\n </a>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n <!-- /ko -->\n\n <!-- ko if: viewPortSize() === 'medium' -->\n <!-- ko foreach: basicStoryModulesSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <!-- ko if: $parent.isEven($index()) -->\n <div class=\"row fullwidth\">\n <div class=\"container\">\n <div class=\"medium-7 columns\">\n <div style=\"margin-top: -1.5rem; margin-left: -1.5rem;\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img class=\"right\" data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n\n <div class=\"medium-5 columns text-center\">\n <div class=\"copyContainer\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h2 data-bind=\"html: headline.text\"></h2></a>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n\n <!-- ko if: !$parent.isEven($index()) -->\n <div class=\"row fullwidth\">\n <div class=\"container\">\n <div class=\"medium-5 columns text-center\">\n <div class=\"copyContainer\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h2 data-bind=\"html: headline.text\"></h2></a>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n <div class=\"medium-7 columns\">\n <div style=\"margin-top: -1.5rem; margin-right: -1.5rem;\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img class=\"right\" data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n <!-- /ko -->\n <!-- /ko -->\n\n <!-- ko if: viewPortSize() === 'large' || viewPortSize() === 'xlarge' -->\n <div class=\"row fullwidth\">\n <div class=\"large-11 xlarge-10 xxlarge-8 large-centered columns\">\n <div class=\"row\">\n <!-- ko foreach: basicStoryModulesSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <div data-bind=\"attr: { class: $parent.className($parent.basicStoryModulesSections) }\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img class=\"right\" data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }\"/>\n </div>\n </a>\n <div class=\"row\">\n <div class=\"large-12 large-centered columns\">\n <div class=\"white-box-container text-center\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section' , 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h2 data-bind=\"html: headline.text\"></h2></a>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n </div>\n </div>\n </div>\n <!-- /ko -->\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('extended-story-module', {
    viewModel: (function (_super) {
        __extends(ExtendedStoryModuleComponentModel, _super);
        function ExtendedStoryModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.extendedStoryModulesSections = params.data.sections;
            this.displayGroupViewPortSize = ko.observable();
            this.displayGroupViewPortSize(this.displayGroup(this.extendedStoryModulesSections));
            //this.displayGroupViewPortSize = this.displayGroup(this.extendedStoryModulesSections);
        }
        return ExtendedStoryModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'ES' -->\n <section data-bind=\"\" class=\"extended-story-module background-color-off-white\">\n <!-- ko if: viewPortSize() === 'small' -->\n <!-- ko foreach: extendedStoryModulesSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <div class=\"row container\">\n <div class=\"small-12 text-center columns\">\n <!-- ko if: section.text -->\n <div class=\"small-12 text-center columns\">\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description}\"></a></label>\n </div>\n <!-- /ko -->\n <div class=\"small-12 text-center columns\">\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h2 data-bind=\"html: headline.text\"></h2></a>\n </div>\n <div class=\"small-12 text-center columns\">\n <div class=\"row\">\n <div class=\"small-11 small-centered columns\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow itemPhoto\">\n <img data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n </div>\n <div class=\"small-11 text-center columns\">\n <p class=\"text-left\">\n <a class=\"a-secondary\" data-bind=\"html: copy.text, attr: { href: addUgDomain(copy.link), 'data-type': 'Copy', 'data-description': copy.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a>\n </p>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n <!-- /ko -->\n\n <!-- ko if: viewPortSize() === 'medium' || viewPortSize() === 'large' || viewPortSize() === 'xlarge'-->\n <!-- ko foreach: extendedStoryModulesSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <!-- ko if: $parent.isEven($index()) -->\n <div class=\"row fullwidth\">\n <div class=\"medium-12 large-11 xlarge-10 xxlarge-8 large-centered columns\">\n <div class=\"row\">\n <div class=\"container\">\n <div class=\"medium-7 large-8 columns\">\n <div style=\"margin: -1.5rem 0 0 -1.5rem;\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img class=\"right\" data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n\n <div class=\"medium-5 large-4 columns text-center\">\n <div class=\"copyContainer\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h2 data-bind=\"html: headline.text\"></h2></a>\n <p class=\"text-left\">\n <a class=\"a-secondary\" data-bind=\"html: copy.text, attr: { href: addUgDomain(copy.link), 'data-type': 'Copy', 'data-description': copy.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a>\n </p>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n\n <!-- ko if: !$parent.isEven($index()) -->\n <div class=\"row fullwidth\">\n <div class=\"medium-12 large-11 xlarge-10 xxlarge-8 large-centered columns\">\n <div class=\"row\">\n <div class=\"container\">\n <div class=\"medium-5 large-4 columns text-center\">\n <div class=\"copyContainer\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h2 data-bind=\"html: headline.text\"></h2></a>\n <p class=\"text-left\">\n <a class=\"a-secondary\" data-bind=\"html: copy.text, attr: { href: addUgDomain(copy.link), 'data-type': 'Copy', 'data-description': copy.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a>\n </p>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n <div class=\"medium-7 large-8 columns\">\n <div style=\"margin: -1.5rem -1.5rem 0 0;\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img class=\"right\" data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n <!-- /ko -->\n <!-- /ko -->\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('collection-grid-module', {
    viewModel: (function (_super) {
        __extends(CollectionGridModuleComponentModel, _super);
        function CollectionGridModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.section = params.data.section;
            this.headline = params.data.headline;
            this.cta = params.data.cta;
            this.collectionGridModulesSections = params.data.sections;
            this.arrayContent1 = this.collectionGridModulesSections[0];
            this.arrayContent2 = this.collectionGridModulesSections[1];
            this.arrayContent3 = this.collectionGridModulesSections[2];
            this.arrayContent4 = this.collectionGridModulesSections[3];
            this.arrayContent5 = this.collectionGridModulesSections[4];
            this.arrayContent6 = this.collectionGridModulesSections[5];
            this.displayGroupViewPortSize = ko.observable();
            this.displayGroupViewPortSize(params.data.displayModuleOn);
            //this.displayGroupViewPortSize = params.data.displayModuleOn;
        }
        return CollectionGridModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'CG' -->\n <section data-bind=\"\" class=\"collection-grid-module background-color-off-white\">\n <div class=\"row fullwidth\">\n <div class=\"small-12 large-11 xlarge-10 xxlarge-8 large-centered columns\">\n <div class=\"row container\">\n <div class=\"small-12 medium-6 columns\">\n <div class=\"flex\">\n <div class=\"small-8-width\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent1.image.link), 'data-type': 'Image', 'data-description': arrayContent1.image.description, 'data-itemNumber': arrayContent1.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent1.item, arrayContent1.image.customImage.large, arrayContent1.image.customImage.small), src: arrayContent1.image.customImage.large ? arrayContent1.image.customImage.large : productImgPath(arrayContent1.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n <div class=\"small-4-width\">\n <div>\n <a data-bind=\"attr: { href: addUgDomain(arrayContent2.image.link), 'data-type': 'Image', 'data-description': arrayContent2.image.description, 'data-itemNumber': arrayContent2.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent2.item, arrayContent2.image.customImage.large, arrayContent2.image.customImage.small), src: arrayContent2.image.customImage.large ? arrayContent2.image.customImage.large : productImgPath(arrayContent2.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n <div>\n <a data-bind=\"attr: { href: addUgDomain(arrayContent3.image.link), 'data-type': 'Image', 'data-description': arrayContent3.image.description, 'data-itemNumber': arrayContent3.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent3.item, arrayContent3.image.customImage.large, arrayContent3.image.customImage.small), src: arrayContent3.image.customImage.large ? arrayContent3.image.customImage.large : productImgPath(arrayContent3.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n </div>\n </div>\n\n <!-- ko if: viewPortSize() === 'small' -->\n <div class=\"small-12 text-center columns white-box-container\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n\n <a class=\"a-secondary\" data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <h3 data-bind=\"html: headline.text\"></h3>\n </a>\n\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n <!-- /ko -->\n\n <div class=\"small-12 medium-6 columns\">\n <div class=\"flex\">\n <div class=\"small-8-width\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent4.image.link), 'data-type': 'Image', 'data-description': arrayContent4.image.description, 'data-itemNumber': arrayContent4.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent4.item, arrayContent4.image.customImage.large, arrayContent4.image.customImage.small), src: arrayContent4.image.customImage.large ? arrayContent4.image.customImage.large : productImgPath(arrayContent4.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n <div class=\"small-4-width\">\n <div>\n <a data-bind=\"attr: { href: addUgDomain(arrayContent5.image.link), 'data-type': 'Image', 'data-description': arrayContent5.image.description, 'data-itemNumber': arrayContent5.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent5.item, arrayContent5.image.customImage.large, arrayContent5.image.customImage.small), src: arrayContent5.image.customImage.large ? arrayContent5.image.customImage.large : productImgPath(arrayContent5.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n <div>\n <a data-bind=\"attr: { href: addUgDomain(arrayContent6.image.link), 'data-type': 'Image', 'data-description': arrayContent6.image.description, 'data-itemNumber': arrayContent6.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent6.item, arrayContent6.image.customImage.large, arrayContent6.image.customImage.small), src: arrayContent6.image.customImage.large ? arrayContent6.image.customImage.large : productImgPath(arrayContent6.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n </div>\n </div>\n\n <!-- ko if: viewPortSize() != 'small' -->\n <div class=\"small-12 columns\">\n <div class=\"row\">\n <div class=\"medium-8 large-6 medium-centered columns\">\n <div class=\"white-box-container text-center\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h1 data-bind=\"html: headline.text\"></h1></a>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n </div>\n </div>\n </div>\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('carousel-module', {
    viewModel: (function (_super) {
        __extends(CarouselModuleComponentModel, _super);
        function CarouselModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.section = params.data.section;
            this.headline = params.data.headline;
            this.cta = params.data.cta;
            this.carouselModulesSections = params.data.sections;
            this.arrayContent1 = this.carouselModulesSections[0];
            this.arrayContent2 = this.carouselModulesSections[1];
            this.arrayContent3 = this.carouselModulesSections[2];
            this.arrayContent4 = this.carouselModulesSections[3];
            this.arrayContent5 = this.carouselModulesSections[4];
            this.arrayContent6 = this.carouselModulesSections[5];
            this.displayGroupViewPortSize = ko.observable();
            this.displayGroupViewPortSize(params.data.displayModuleOn);
            //this.displayGroupViewPortSize = params.data.displayModuleOn;
            ko.bindingHandlers.reinit = {
                update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
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
                    });
                }
            };
        }
        return CarouselModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'CL' -->\n <section data-bind=\"\" class=\"carousel-module background-color-off-white\">\n <div class=\"row fullwidth\">\n <!-- ko if: viewPortSize() === 'small' -->\n <!-- ko if: section.text -->\n <div class=\"small-12 text-center columns\">\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n </div>\n <!-- /ko -->\n\n <div class=\"small-12 text-center columns\">\n <a class=\"a-secondary\" data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <h3 data-bind=\"html: headline.text\"></h3>\n </a>\n </div>\n\n <div class=\"small-12 columns carouselPadding\">\n <div class=\"swiper-container\">\n <div class=\"swiper-wrapper\">\n <!-- ko foreach: carouselModulesSections -->\n <div class=\"swiper-slide\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': $parent.cta.text, 'data-sectionDescription': $parent.section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: $parent.cta.text }\"/>\n </div>\n </a>\n </div>\n <!-- /ko -->\n </div>\n <div class=\"swiper-button-prev\"><span class=\"icon-caret_left icon-lg\"></span></div>\n <div class=\"swiper-button-next\"><span class=\"icon-caret_right icon-lg\"></span></div>\n </div>\n </div>\n <div class=\"small-10 small-centered columns\" data-bind=\"reinit\">\n <a data-bind=\"attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: cta.text\"></button>\n </a>\n </div>\n <!-- /ko -->\n\n <!-- ko if: viewPortSize() != 'small' -->\n <div class=\"small-12 large-11 xlarge-10 xxlarge-8 large-centered columns\">\n <div class=\"row container\">\n <div class=\"small-12 medium-6 columns\">\n <div class=\"flex\">\n <div class=\"small-8-width\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent1.image.link), 'data-type': 'Image', 'data-description': arrayContent1.image.description, 'data-itemNumber': arrayContent1.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent1.item, arrayContent1.image.customImage.large, arrayContent1.image.customImage.small), src: arrayContent1.image.customImage.large ? arrayContent1.image.customImage.large : productImgPath(arrayContent1.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n\n <div class=\"small-4-width\">\n <div>\n <a data-bind=\"attr: { href: addUgDomain(arrayContent2.image.link), 'data-type': 'Image', 'data-description': arrayContent2.image.description, 'data-itemNumber': arrayContent2.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent2.item, arrayContent2.image.customImage.large, arrayContent2.image.customImage.small), src: arrayContent2.image.customImage.large ? arrayContent2.image.customImage.large : productImgPath(arrayContent2.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n <div>\n <a data-bind=\"attr: { href: addUgDomain(arrayContent3.image.link), 'data-type': 'Image', 'data-description': arrayContent3.image.description, 'data-itemNumber': arrayContent3.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent3.item, arrayContent3.image.customImage.large, arrayContent3.image.customImage.small), src: arrayContent3.image.customImage.large ? arrayContent3.image.customImage.large : productImgPath(arrayContent3.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n </div>\n </div>\n\n <div class=\"small-12 medium-6 columns\">\n <div class=\"flex\">\n <div class=\"small-8-width\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent4.image.link), 'data-type': 'Image', 'data-description': arrayContent4.image.description, 'data-itemNumber': arrayContent4.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent4.item, arrayContent4.image.customImage.large, arrayContent4.image.customImage.small), src: arrayContent4.image.customImage.large ? arrayContent4.image.customImage.large : productImgPath(arrayContent4.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n\n <div class=\"small-4-width\">\n <div>\n <a data-bind=\"attr: { href: addUgDomain(arrayContent5.image.link), 'data-type': 'Image', 'data-description': arrayContent5.image.description, 'data-itemNumber': arrayContent5.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent5.item, arrayContent5.image.customImage.large, arrayContent5.image.customImage.small), src: arrayContent5.image.customImage.large ? arrayContent5.image.customImage.large : productImgPath(arrayContent5.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n <div>\n <a data-bind=\"attr: { href: addUgDomain(arrayContent6.image.link), 'data-type': 'Image', 'data-description': arrayContent6.image.description, 'data-itemNumber': arrayContent6.item, 'data-cta': cta.text, 'data-sectionDescription': section.description }\">\n <div class=\"responsively-lazy preventReflow\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent6.item, arrayContent6.image.customImage.large, arrayContent6.image.customImage.small), src: arrayContent6.image.customImage.large ? arrayContent6.image.customImage.large : productImgPath(arrayContent6.item,360), alt: cta.text }\"/>\n </div>\n </a>\n </div>\n </div>\n </div>\n </div>\n\n <div class=\"small-12 columns\">\n <div class=\"row\">\n <div class=\"medium-8 large-6 medium-centered columns\">\n <div class=\"white-box-container text-center\">\n <!-- ko if: section.text -->\n <label class=\"body-small-caps-override\"><a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></label>\n <!-- /ko -->\n <a data-bind=\"attr: { href: addUgDomain(headline.link), 'data-type': 'Headline', 'data-description': headline.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"><h1 data-bind=\"html: headline.text\"></h1></a>\n <p class=\"body-small-override\"><a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': section.description }\"></a></p>\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n </div>\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('text-link-module', {
    viewModel: (function (_super) {
        __extends(TextLinkModuleComponentModel, _super);
        function TextLinkModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.section = params.data.section;
            this.textLinkModuleSections = params.data.sections;
            this.nonHiddenModuleSections = [];
            this.displayGroupViewPortSize = ko.observable();
            this.displayGroupViewPortSize(this.displayGroup(this.textLinkModuleSections));
            //this.displayGroupViewPortSize = this.displayGroup(this.textLinkModuleSections);
        }
        return TextLinkModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'TL' -->\n <section data-bind=\"\" class=\"text-link-module background-color-off-white\">\n <div class=\"row fullwidth waterColor\">\n <div class=\"small-12 large-11 xlarge-10 xxlarge-8 small-centered columns container\">\n <!-- ko if: section.text -->\n <div class=\"row\">\n <div class=\"small-12 text-center columns\">\n <a class=\"a-secondary\" data-bind=\"attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-sectionDescription': section.description }\">\n <h2 data-bind=\"html: section.text\"></h2>\n </a>\n </div>\n </div>\n <!-- /ko -->\n\n <!-- ko if: viewPortSize() === 'small' -->\n <div class=\"row\">\n <!-- ko foreach: textLinkModuleSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <div class=\"small-6 columns\">\n <div class=\"text-link-container\">\n <div class=\"content\">\n <a class=\"a-secondary\" data-bind=\"attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }\">\n <h4 data-bind=\"html: cta.text\">/h4>\n </a><\n </div>\n </div>\n </div>\n <!-- /ko -->\n <!-- /ko -->\n </div>\n <!-- /ko -->\n\n <!-- ko if: viewPortSize() != 'small' -->\n <div class=\"row\">\n <div class=\"medium-12 columns\">\n <ul data-bind=\"attr: { class: classNameBlockGrid(textLinkModuleSections) }\">\n <!-- ko foreach: textLinkModuleSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <li class=\"text-center content\">\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }\">\n <img data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }\"/>\n </a>\n </div>\n <a class=\"a-secondary\" data-bind=\"attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }\">\n <h4 data-bind=\"html: cta.text\"></h4>\n </a>\n </li>\n <!-- /ko -->\n <!-- /ko -->\n </ul>\n </div>\n </div>\n <!-- /ko -->\n </div>\n </div>\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('image-link-double-module', {
    viewModel: (function (_super) {
        __extends(ImageLinkDoubleModuleComponentModel, _super);
        function ImageLinkDoubleModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.section = params.data.section;
            this.imageLinkDoubleModuleSections = params.data.sections;
            this.nonHiddenModuleSections = [];
            this.displayGroupViewPortSize = ko.observable();
            this.displayGroupViewPortSize(this.displayGroup(this.imageLinkDoubleModuleSections));
        }
        return ImageLinkDoubleModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'LD' -->\n <section data-bind=\"\" class=\"image-link-double-module background-color-off-white\">\n <div class=\"row fullwidth waterColor\">\n <div class=\"small-12 large-11 xlarge-10 xxlarge-8 small-centered columns container\">\n <!-- ko if: section.text -->\n <div class=\"row\">\n <div class=\"small-12 xlarge-10 xxlarge-8 text-center xlarge-centered columns\">\n <h2>\n <a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-sectionDescription': section.description }\"></a>\n </h2>\n </div>\n </div>\n <!-- /ko -->\n\n <div class=\"row\">\n <div class=\"small-11 medium-12 small-centered columns\">\n <ul data-bind=\"attr: { class: classNameBlockGrid(imageLinkDoubleModuleSections) }\">\n <!-- ko foreach: imageLinkDoubleModuleSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <li class=\"text-center content\">\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }\">\n <img data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }\"/>\n </a>\n </div>\n <h4><a class=\"a-secondary\" data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }\"></a></h4>\n </li>\n <!-- /ko -->\n <!-- /ko -->\n </ul>\n </div>\n </div>\n </div>\n </div>\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('button-link-double-module', {
    viewModel: (function (_super) {
        __extends(ButtonLinkDoubleModuleComponentModel, _super);
        function ButtonLinkDoubleModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.section = params.data.section;
            this.buttonLinkDoubleModuleSections = params.data.sections;
            this.arrayContent1 = this.buttonLinkDoubleModuleSections[0];
            this.arrayContent2 = this.buttonLinkDoubleModuleSections[1];
            this.arrayContent3 = this.buttonLinkDoubleModuleSections[2];
            this.arrayContent4 = this.buttonLinkDoubleModuleSections[3];
            this.arrayContent5 = this.buttonLinkDoubleModuleSections[4];
            this.arrayContent6 = this.buttonLinkDoubleModuleSections[5];
            this.displayGroupViewPortSize = ko.observable();
            this.displayGroupViewPortSize(this.displayGroup(this.buttonLinkDoubleModuleSections));
            //this.displayGroupViewPortSize = this.displayGroup(this.buttonLinkDoubleModuleSections);
            this.nonHiddenModuleSections = [];
            // this.hidePrefooterLine = function() {
            //     return this.modulePosition === params.parent.totalModules ? document.getElementsByClassName("prefooterLine")[0].style.display='none' : '';
            // }
            this.shouldStack = function () {
                //this.hidePrefooterLine();
                return this.viewPortSize() === 'xlarge' && this.buttonLinkDoubleModuleSections.length === 6 ? true : false;
            };
            this.showBtnContainerInside = function () {
                return this.viewPortSize() != 'small' && this.buttonLinkDoubleModuleSections.length === 4 || this.viewPortSize() === 'medium' && this.buttonLinkDoubleModuleSections.length === 6 ? true : false;
            };
            this.showBtnContainerHanging = function () {
                return this.viewPortSize() === 'small' || this.viewPortSize() === 'large' && this.buttonLinkDoubleModuleSections.length === 6 ? true : false;
            };
        }
        return ButtonLinkDoubleModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'BD' -->\n <section data-bind=\"\" class=\"button-link-double-module background-color-white\">\n <div class=\"row\">\n <div class=\"small-12 columns\">\n <div class=\"row collapse\">\n <div class=\"small-8 medium-10 large-8 small-centered columns\">\n <hr class=\"dottedSpacer\">\n </div>\n </div>\n </div>\n </div>\n\n <!-- ko if: section.text -->\n <div class=\"row\">\n <div class=\"small-12 small-centered text-center columns\">\n <h2>\n <a class=\"a-secondary\" data-bind=\"html: section.text, attr: { href: addUgDomain(section.link), 'data-type': 'Section', 'data-description': section.description, 'data-sectionDescription': section.description }\"></a>\n </h2>\n </div>\n </div>\n <!-- /ko -->\n\n <!-- ko if: !shouldStack() -->\n <div class=\"row fullwidth\">\n <div class=\"small-12 large-11 xlarge-10 xxlarge-8 large-centered columns\">\n <ul data-bind=\"attr: { class: classNameBlockGrid(buttonLinkDoubleModuleSections) }\">\n <!-- ko foreach: buttonLinkDoubleModuleSections -->\n <!-- ko if: $parent.displayOn(displayModuleOn) -->\n <li class=\"text-center\">\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }\">\n <img data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }\"/>\n </a>\n <!-- ko if: $parent.showBtnContainerInside() -->\n <div class=\"btnContainerInside\">\n <a data-bind=\"attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: cta.text\"></button>\n </a>\n </div>\n <!-- /ko -->\n </div>\n <!-- ko if: $parent.showBtnContainerHanging() -->\n <div class=\"btnContainerHanging\">\n <a data-bind=\"attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.section.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: cta.text\"></button>\n </a>\n </div>\n <!-- /ko -->\n </li>\n <!-- /ko -->\n <!-- /ko -->\n </ul>\n </div>\n </div>\n <!-- /ko -->\n\n <!-- ko if: shouldStack() -->\n <div class=\"row fullwidth\">\n <div class=\"xlarge-10 xxlarge-8 xlarge-centered columns stackedMargin\">\n <div class=\"row\">\n <div class=\"small-12 medium-6 columns\">\n <div class=\"row\">\n <div class=\"xlarge-8 columns\">\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent1.image.link), 'data-type': 'Image', 'data-description': arrayContent1.image.description }\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent1.item, arrayContent1.image.customImage.large, arrayContent1.image.customImage.small), src: arrayContent1.image.customImage.large ? arrayContent1.image.customImage.large : productImgPath(arrayContent1.item,360), alt: arrayContent1.cta.text }\"/>\n </a>\n <div class=\"btnContainerInside\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent1.cta.link), 'data-type': 'CTA', 'data-description': arrayContent1.cta.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: arrayContent1.cta.text\"></button>\n </a>\n </div>\n </div>\n </div>\n <div class=\"xlarge-4 columns\">\n <div class=\"colBottomPadding\">\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent2.image.link), 'data-type': 'Image', 'data-description': arrayContent2.image.description }\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent2.item, arrayContent2.image.customImage.large, arrayContent2.image.customImage.small), src: arrayContent2.image.customImage.large ? arrayContent2.image.customImage.large : productImgPath(arrayContent2.item,360), alt: arrayContent2.cta.text }\"/>\n </a>\n <div class=\"btnContainerInside\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent2.cta.link), 'data-type': 'CTA', 'data-description': arrayContent2.cta.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: arrayContent2.cta.text\"></button>\n </a>\n </div>\n </div>\n </div>\n <div>\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent3.image.link), 'data-type': 'Image', 'data-description': arrayContent3.image.description }\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent3.item, arrayContent3.image.customImage.large, arrayContent3.image.customImage.small), src: arrayContent3.image.customImage.large ? arrayContent3.image.customImage.large : productImgPath(arrayContent3.item,360), alt: arrayContent3.cta.text }\"/>\n </a>\n <div class=\"btnContainerInside\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent3.cta.link), 'data-type': 'CTA', 'data-description': arrayContent3.cta.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: arrayContent3.cta.text\"></button>\n </a>\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n\n <div class=\"small-12 medium-6 columns\">\n <div class=\"row\">\n <div class=\"xlarge-8 columns\">\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent4.image.link), 'data-type': 'Image', 'data-description': arrayContent4.image.description }\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent4.item, arrayContent4.image.customImage.large, arrayContent4.image.customImage.small), src: arrayContent4.image.customImage.large ? arrayContent4.image.customImage.large : productImgPath(arrayContent4.item,360), alt: arrayContent4.cta.text }\"/>\n </a>\n <div class=\"btnContainerInside\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent4.cta.link), 'data-type': 'CTA', 'data-description': arrayContent4.cta.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: arrayContent4.cta.text\"></button>\n </a>\n </div>\n </div>\n </a>\n </div>\n <div class=\"xlarge-4 columns\">\n <div class=\"colBottomPadding\">\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent5.image.link), 'data-type': 'Image', 'data-description': arrayContent5.image.description }\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent5.item, arrayContent5.image.customImage.large, arrayContent5.image.customImage.small), src: arrayContent5.image.customImage.large ? arrayContent5.image.customImage.large : productImgPath(arrayContent5.item,360), alt: arrayContent5.cta.text }\"/>\n </a>\n <div class=\"btnContainerInside\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent5.cta.link), 'data-type': 'CTA', 'data-description': arrayContent5.cta.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: arrayContent5.cta.text\"></button>\n </a>\n </div>\n </div>\n </div>\n <div>\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent6.image.link), 'data-type': 'Image', 'data-description': arrayContent6.image.description }\">\n <img data-bind=\"attr: { 'data-srcset': responsiveImage(arrayContent6.item, arrayContent6.image.customImage.large, arrayContent6.image.customImage.small), src: arrayContent6.image.customImage.large ? arrayContent6.image.customImage.large : productImgPath(arrayContent6.item,360), alt: arrayContent6.cta.text }\"/>\n </a>\n <div class=\"btnContainerInside\">\n <a data-bind=\"attr: { href: addUgDomain(arrayContent3.cta.link), 'data-type': 'CTA', 'data-description': arrayContent6.cta.description }\">\n <button class=\"btn-secondary expand\" data-bind=\"html: arrayContent3.cta.text\"></button>\n </a>\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n\n <div class=\"row\">\n <div class=\"small-12 columns\">\n <div class=\"row collapse\">\n <div class=\"small-8 medium-10 large-8 small-centered columns\">\n <hr class=\"dottedSpacer\">\n </div>\n </div>\n </div>\n </div>\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('seo-link-module', {
    viewModel: (function (_super) {
        __extends(SeoLinkModuleComponentModel, _super);
        function SeoLinkModuleComponentModel(params) {
            _super.call(this, params);
            this.params = params;
            this.seo1 = params.data.seo1;
            this.seo1Sections = params.data.seo1.sections;
            this.seo2 = params.data.seo2;
            this.seo2Sections = params.data.seo2.sections;
            this.displayGroupViewPortSize = ko.observable('small');
            //this.displayGroupViewPortSize = 'small';
        }
        return SeoLinkModuleComponentModel;
    }(Dependents)),
    template: "\n <!-- ko if: displayOn(displayGroupViewPortSize()), resizeView: 'TL_SEO' -->\n <section data-bind=\"\" class=\"seoLinks text-link-module background-color-off-white\">\n <!-- ko if: viewPortSize() === 'small' -->\n <div class\"row\">\n <div class=\"small-12 small-centered columns container\">\n <!-- ko if: seo1.section.text -->\n <div class=\"row\">\n <div class=\"small-12 text-center columns\">\n <h2>\n <a class=\"a-secondary\" data-bind=\"html: seo1.section.text, attr: { href: addUgDomain(seo1.section.link), 'data-type': 'Section', 'data-description': seo1.section.description, 'data-sectionDescription': seo1.section.description }\"></a>\n </h2>\n </div>\n </div>\n <!-- /ko -->\n <div class=\"row\">\n <!-- ko foreach: seo1Sections -->\n <div class=\"small-6 columns\">\n <div class=\"text-link-container\">\n <div class=\"content\"><h4><a class=\"a-secondary\" data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo1.section.description }\"></a></h4></div>\n </div>\n </div>\n <!-- /ko -->\n </div>\n </div>\n </div>\n\n <div class=\"seoLinks2 image-link-double-module background-color-off-white\">\n <div class=\"row container\">\n <div class=\"small-12 small-centered columns\">\n <!-- ko if: seo2.section.text -->\n <div class=\"row\">\n <div class=\"small-12 xlarge-10 text-center xlarge-centered columns\">\n <h2>\n <a class=\"a-secondary\" data-bind=\"html: seo2.section.text, attr: { href: addUgDomain(seo2.section.link), 'data-type': 'Section', 'data-description': seo2.section.description, 'data-sectionDescription': seo2.section.description }\"></a>\n </h2>\n </div>\n </div>\n <!-- /ko -->\n </div>\n\n <div class=\"small-11 small-centered columns\">\n <ul data-bind=\"attr: { class: classNameBlockGrid(seo2Sections) }\">\n <!-- ko foreach: seo2Sections -->\n <li class=\"text-center content\">\n <div class=\"responsively-lazy preventReflow\">\n <a data-bind=\"attr: { href: addUgDomain(image.link), 'data-type': 'Image', 'data-description': image.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo2.section.description}\">\n <img data-bind=\"attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: cta.text }\"/>\n </a>\n </div>\n <h4><a class=\"a-secondary\" data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-itemNumber': item, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo2.section.description }\"></a></h4>\n </li>\n <!-- /ko -->\n </ul>\n </div>\n </div>\n </div>\n <!-- /ko -->\n\n <!-- ko if: viewPortSize() != 'small' -->\n <div class=\"row fullwidth seo1LinksContainer\">\n <div class=\"small-12 columns\">\n <div class=\"row topSpacer\">\n <div class=\"small-12 columns\">\n <div class=\"row collapse\">\n <div class=\"small-6 medium-10 large-8 small-centered columns\" style=\"width: 372px;\">\n <hr class=\"dottedSpacer\">\n </div>\n </div>\n </div>\n </div>\n\n <div class=\"row\">\n <div class=\"small-12 text-center columns\">\n <div>\n <div class=\"topCatContent\">\n <span data-bind=\"html: seo1.section.text\"></span>\n <div class=\"displayInline\">\n <!-- ko foreach: seo1Sections -->\n <a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo1.section.description }\" class=\"body-small-crumbs\"></a>\n <!-- /ko -->\n </div>\n </div>\n\n <div>\n <span data-bind=\"html: seo2.section.text\"></span>\n <div class=\"displayInline\">\n <!-- ko foreach: seo2Sections -->\n <a data-bind=\"html: cta.text, attr: { href: addUgDomain(cta.link), 'data-type': 'CTA', 'data-description': cta.description, 'data-cta': cta.text, 'data-sectionDescription': $parent.seo2.section.description }\" class=\"body-small-crumbs\"></a>\n <!-- /ko -->\n </div>\n </div>\n </div>\n </div>\n </div>\n\n <div class=\"row bottomSpacer\">\n <div class=\"small-12 columns\">\n <div class=\"row collapse\">\n <div class=\"small-6 medium-10 large-8 small-centered columns\" style=\"width: 372px;\">\n <hr class=\"dottedSpacer\">\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n <!-- /ko -->\n </section>\n <!-- /ko -->", synchronous: true
});
ko.components.register('homePage-container', {
    viewModel: (function (_super) {
        __extends(HomePageContainerComponentModel, _super);
        function HomePageContainerComponentModel(params) {
            _super.call(this, params);
            this.seoLinks = params.seoLinks;
            this.totalModules = Object.keys(mappingOrder).length;
            Object.keys(mappingOrder).forEach(function (letter, i) {
                Object.keys(mappingOrder[letter]).forEach(function (module, index) {
                    mappingOrder[letter][module]['index'] = i;
                });
            });
        }
        return HomePageContainerComponentModel;
    }(Dependents)),
    template: "\n <!--ko foreach: { data: Object.keys(mappingOrder) } -->\n <!-- ko component: {name: Object.keys(mappingOrder[$data])[0], params:{data:mappingOrder[$data][Object.keys(mappingOrder[$data])], parent:$parent }} --><!-- /ko -->\n <!-- /ko -->", synchronous: true
});
ko.applyBindings();
