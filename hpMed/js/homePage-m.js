
var moduleOrderStatic = [];
var moduleOrder = [];
var elementsArray = [];

const imageDir = 'https://www.uncommongoods.com/images';
const ugWeb = 'https://www.uncommongoods.com';


class Dependents {
    constructor(params) {
        this.modulePosition = params.data.index;
        this.showDesktop = params.data.showDesktop;
        this.viewPortSize = ko.observable(breakpointValue());
        this.isSmall = function(){
            return this.viewPortSize() === 'small' ? true : false;
        }
        this.displayDesktop = function() {
            return this.isSmall() || this.showDesktop ? true : false;
        }
        this.responsiveImage = function(itemId, largeImage, smallImage) {
            var responsiveLarge = function() {
                return largeImage ? largeImage + ' 1024w, ' + largeImage + ' 640w, ' : productImgPath(itemId,640) + ' 1024w, ' +  productImgPath(itemId,640) + ' 640w, ';
            }
            var responsiveSmall = function() {
                return smallImage ? smallImage + ' 320w, ' : productImgPath(itemId,360) + ' 320w';
            }
            return responsiveLarge()+responsiveSmall();
        }
        ko.bindingHandlers.resizeView = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                $(document).ready(function () {
                    var breakpoint = breakpointValue();
                    viewModel.viewPortSize(breakpoint);
                });

                $(window).resize(function () {
                    var breakpoint = breakpointValue();
                    viewModel.viewPortSize(breakpoint);
                });

                var section = allBindings().resizeView;
                var display = allBindings().style.display;

                moduleOrderStatic.push(section);
                if (display === 'block') {
                    moduleOrder.push(section);
                } else {
                   moduleOrder.push('');
               }

            },
            update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                var section = allBindings().resizeView;
                var display = allBindings().style.display;
                var index = viewModel.modulePosition;
                var totalModules = bindingContext.$parents[1].totalModules;
                var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                if (display === 'block' && moduleOrder[index] != moduleOrderStatic[index]) {
                    moduleOrder[index] = moduleOrderStatic[index];
                }
                if (display === 'none') {
                    moduleOrder[index] = '';
                }
                elementsArray.push($(element)[0]);

                $(document).ready(function () {
                    if (viewModel.modulePosition + 1 === totalModules) {
                        var moduleOrderRefresh = moduleOrder;
                        var elementsArrayRefresh = [];

                        moduleOrderRefresh = moduleOrderRefresh.filter(Boolean);
                        moduleOrder.forEach((module,index) => {
                            if (module != '') {
                                elementsArrayRefresh.push(elementsArray[index]);
                            }
                        })
                        moduleOrderRefresh.forEach((module,index) => {
                            var alphaChar = alpha.charAt(index);
                            var elements = elementsArrayRefresh[index].querySelectorAll('a');
                            //console.log(alphaChar);

                            elements.forEach((el,i) => {
                                var linkNumber = i+1;
                                var trackingCode = 'hp_module_' + alphaChar + linkNumber +'_'+ module;
                                var trackingLink = el.getAttribute("href");
                                trackingLink = trackingLink.replace(/https:\/\/www.uncommongoods.com/g, '');
                                //console.log(trackingLink);

                                if (trackingLink !== '') {
                                    $(el).attr("onclick", "javascript: pageTracker._trackPageview('/internal"+trackingLink+"?source="+trackingCode+"');  dataLayer.push({'internalHPModuleLinkUrl':'/internal"+trackingLink+"?source="+trackingCode+"'},{'event':'fireGTMTrackHPModulePageView'});");
                                } else {
                                    $('a[href=""]').click(function (event) { // where href are blank prevent page reload on click
                                        event.preventDefault();
                                    })
                                }
                            })
                        })
                    }
                })
            }
        };
    }
};
//Returns screen viewport size (small, medium, large, xlarge)
function breakpointValue() {
    return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};

//Returns default image path
function productImgPath(itemId,size) {
    var itemDir = imageDir+'/items/';
    var itemIdTrim = itemId.toString().slice(0, -2);

    if (size === 640) {
        return itemDir+itemIdTrim+'00/'+itemId+'_1_640px.jpg';
    }
    if (size === 360) {
        return itemDir+itemIdTrim+'00/'+itemId+'_1_360px.jpg';
    }
}

//Mobile HP modules
ko.components.register('large-feature-module', {
    viewModel: class LargeFeatureModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.largeFeatureModulesSections = params.data.sections;
            this.sectionLenIsOne = function() {
                return this.largeFeatureModulesSections.length === 1 ? true : false;
            }
            this.isFirstModule = function() {
                return this.modulePosition === 0 ? true : false;
            }
            this.className = function() {
                if (this.isFirstModule()) {
                    var columnLen = 12/(this.largeFeatureModulesSections.length-1);
                    return "small-12 medium-"+columnLen+" large-"+columnLen+" columns";
                } else {
                    var columnLen = 12/(this.largeFeatureModulesSections.length);
                    return "small-12 medium-"+columnLen+" large-"+columnLen+" columns";
                }
            }
        }
    },
    template: `
        <section class="large-feature-module background-color-off-white" data-bind="resizeView: 'LF', style: { display: displayDesktop() ? 'block' : 'none', } " >
            <!-- ko foreach: largeFeatureModulesSections -->
                <!-- ko if: $parent.isFirstModule() && $index() === 0 || $parent.sectionLenIsOne() -->
                    <div class="row">
                        <div class="small-12 medium-12 large-12 columns">
                            <a class="heroLink" data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                                <picture>
                                    <!--[if IE 9]><video style="display: none;"><![endif]-->
                                        <source data-bind="attr: { media: '(min-width: 40.063em)', srcset: image.customImage.large ? image.customImage.large : productImgPath(item,640) }">
                                        <source data-bind="attr: { media: '(max-width: 40em)', srcset: image.customImage.small ? image.customImage.small : productImgPath(item,360) }">
                                    <!--[if IE 9]></video><![endif]-->


                                    <!-- ko if: $parent.isSmall() -->
                                        <img class="responsively-lazy" data-bind="attr: { src: image.customImage.small ? image.customImage.small : productImgPath(item,360), alt: item }">
                                    <!-- /ko -->

                                    <!-- ko if: !$parent.isSmall() -->
                                        <img class="responsively-lazy" data-bind="attr: { src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: item }">
                                    <!-- /ko -->
                                </picture>
                            </a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="small-12 medium-8 large-8 small-centered columns">
                            <div class="white-box-container text-center">
                                <h1><a class="a-secondary" data-bind="text: headline.text, attr: { href: headline.link ? ugWeb+headline.link : '' }"></a></h1>
                                <p class="body-small"><a data-bind="text: cta.text, attr: { href: cta.link ? ugWeb+cta.link : '' }"></a></p>
                            </div>
                        </div>
                    </div>
                <!-- /ko -->
            <!-- /ko -->

            <!-- ko if: !sectionLenIsOne() -->
                <div class="row">
                    <!-- ko foreach: largeFeatureModulesSections -->
                        <!-- ko if: !$parent.isFirstModule() || $parent.isFirstModule() && $index() > 0 -->
                            <div data-bind="attr: { class: $parent.className() }">
                                <a class="heroLink" data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                                    <div class="responsively-lazy preventReflow">
                                        <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: item }"/>
                                    </div>
                                </a>

                                <div class="row">
                                    <div class="small-12 medium-10 large-10 small-centered columns">
                                        <div class="white-box-container text-center">
                                            <h1><a class="a-secondary" data-bind="text: headline.text, attr: { href: headline.link ? ugWeb+headline.link : '' }"></a></h1>
                                            <p class="body-small"><a data-bind="text: cta.text, attr: { href: cta.link ? ugWeb+cta.link : '' }"></a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!-- /ko -->
                    <!-- /ko -->
                </div>
            <!-- /ko -->
        </section>`, synchronous: true
});

ko.components.register('small-feature-module', {
    viewModel: class SmallFeatureModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.intro = params.data.intro;
            this.smModulesSections = params.data.sections;
            this.even = function(index) {
                return index % 2 === 0 ? true : false
            }
        }
    },
    template: `
        <section data-bind="resizeView: 'SF', style: { display: displayDesktop() ? 'block' : 'none' }" class="small-feature-module background-color-white">
            <!-- ko if: intro.text -->
                <div class="row">
                    <div class="small-12 text-center columns">
                        <label class="body-small-caps"><a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : '' }"></a></label>
                    </div>
                </div>
            <!-- /ko -->

            <!-- ko foreach: smModulesSections -->
                <!-- ko if: $parent.even($index()) -->
                    <div class="row">
                        <div class="small-12 columns">
                            <div class="container">
                                <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                                    <div class="responsively-lazy preventReflow">
                                        <img class="preventReflow right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                    </div>
                                </a>
                                <div class="content-copy">
                                    <a data-bind="attr: { href: headline.link ? ugWeb+headline.link : '' }"><h3 data-bind="text: headline.text"></h3></a>
                                    <p class="body-small"><a data-bind="text: cta.text, attr: { href: cta.link ? ugWeb+cta.link : '' }"></a></p>
                                </div>
                            </div>
                        </div>
                        <div class="small-12 columns"><hr/></div>
                    </div>
                <!-- /ko -->

                <!-- ko if: !$parent.even($index()) -->
                    <div class="row">
                        <div class="small-12 columns">
                            <div class="container">
                                <div class="content-copy">
                                    <a data-bind="attr: { href: headline.link ? ugWeb+headline.link : '' }"><h3 data-bind="text: headline.text"></h3></a>
                                    <p class="body-small"><a data-bind="text: cta.text, attr: { href: cta.link ? ugWeb+cta.link : '' }"></a></p>
                                </div>
                                <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                                    <div class="responsively-lazy preventReflow">
                                        <img class="preventReflow right" data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="small-12 columns"><hr/></div>
                    </div>
                <!-- /ko -->
            <!-- /ko -->
        </section>`, synchronous: true
});

ko.components.register('basic-story-module', {
    viewModel: class BasicStoryModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.item = params.data.item;
            this.intro = params.data.intro;
            this.image = params.data.image;
            this.headline = params.data.headline;
            this.cta = params.data.cta;
        }
    },
    template: `
        <section data-bind="resizeView: 'BS', style: { display: displayDesktop() ? 'block' : 'none' }" class="basic-story-module background-color-off-white">
            <div class="row container">
                <!-- ko if: intro.text -->
                    <div class="small-12 text-center columns">
                        <label class="body-small-caps"><a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : ''}"></a></label>
                    </div>
                <!-- /ko -->

                <div class="small-10 small-centered text-center columns">
                    <a data-bind="attr: { href: headline.link ? ugWeb+headline.link : '' }"><h2 data-bind="text: headline.text"></h2></a>
                    <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                        <div class="responsively-lazy preventReflow itemPhoto">
                            <img data-bind="attr: { 'data-srcset': responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: item }"/>
                        </div>
                    </a>
                    <a data-bind="attr: { href: cta.link ? ugWeb+cta.link : '' }">
                        <button class="btn-secondary expand" data-bind="text: cta.text"></button>
                    </a>
                </div>
            </div>
        </section>`, synchronous: true
});

ko.components.register('extended-story-module', {
    viewModel: class ExtendedStoryModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.item = params.data.item;
            this.artistId = params.data.artistId;
            this.intro = params.data.intro;
            this.image = params.data.image;
            this.headline = params.data.headline;
            this.cta = params.data.cta;
            this.copy = params.data.copy;
        }
    },
    template: `
        <section data-bind="resizeView: 'ES', style: { display: displayDesktop() ? 'block' : 'none' }" class="extended-story-module background-color-off-white">
            <div class="row container">
                <div class="small-12 text-center columns">
                    <!-- ko if: intro.text -->
                        <div class="small-12 text-center columns">
                            <label class="body-small-caps"><a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : '' }"></a></label>
                        </div>
                    <!-- /ko -->

                    <div class="small-12 text-center columns">
                        <h2>
                            <a class="a-secondary" data-bind="text: headline.text, attr: { href: headline.link ? ugWeb+headline.link : '' }"></a>
                        </h2>
                    </div>

                    <div class="small-12 text-center columns">
                        <div class="row">
                            <div class="small-11 small-centered columns">
                                <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                                    <div class="responsively-lazy preventReflow itemPhoto">
                                        <img data-bind="attr: { 'data-srcset': responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: item }"/>
                                    </div>
                                    <!-- ko if: artistId -->
                                        <img class="artistPhoto " data-bind="attr: { 'src': imageDir+'/artist/Artist_'+artistId+'.jpg', alt: artistId }">
                                    <!-- /ko -->
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="small-11 text-center columns">
                        <p class="text-left">
                            <a class="a-secondary" data-bind="text: copy.text, attr: { href: copy.link ? ugWeb+copy.link : '' }"></a>
                        </p>
                        <p class="body-small"><a data-bind="text: cta.text, attr: { href: cta.link ? ugWeb+cta.link : '' }"></a></p>
                    </div>

                </div>
            </div>
        </section>`, synchronous: true
});

ko.components.register('collection-grid-module', {
    viewModel: class CollectionGridModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.intro = params.data.intro;
            this.headline = params.data.headline;
            this.cta = params.data.cta;
            this.collectionGridModulesSections = params.data.sections;
            this.isLessThan2 = function(index) {
                return index < 2 ? true : false;
            }
        }
    },
    template: `
        <section data-bind="resizeView: 'CG', style: { display: displayDesktop() ? 'block' : 'none' }" class="collection-grid-module background-color-off-white">
            <!-- ko if: isSmall() -->
                <div class="row container">
                    <!-- ko if: intro.text -->
                        <div class="small-12 text-center columns">
                            <label class="body-small-caps"><a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : '' }"></a></label>
                        </div>
                    <!-- /ko -->

                    <!-- ko foreach: collectionGridModulesSections -->
                        <!-- ko if: $parent.isLessThan2($index()) -->
                            <div class="small-6 columns">
                                <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                                    <div class="responsively-lazy preventReflow">
                                        <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                    </div>
                                </a>
                            </div>
                        <!-- /ko -->
                    <!-- /ko -->

                    <div class="small-12 text-center columns copyContainer">
                        <h3>
                            <a class="a-secondary" data-bind="text: headline.text, attr: { href: headline.link ? ugWeb+headline.link : '' }"></a>
                        </h3>
                        <p class="body-small"><a data-bind="text: cta.text, attr: { href: cta.link ? ugWeb+cta.link : '' }"></a></p>
                    </div>

                    <!-- ko foreach: collectionGridModulesSections -->
                        <!-- ko if: !$parent.isLessThan2($index()) -->
                            <div class="small-6 columns">
                                <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                                    <div class="responsively-lazy preventReflow">
                                        <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                    </div>
                                </a>
                            </div>
                        <!-- /ko -->
                    <!-- /ko -->
                </div>
            <!-- /ko -->

            <!-- ko if: !isSmall() -->
                <div class="row">
                    <!-- ko foreach: collectionGridModulesSections -->
                        <!-- ko if: $parent.isLessThan2($index()) -->
                            <div class="medium-6 columns">
                                <!-- ko if: $index() === 0 -->
                                    <div class="responsively-lazy preventReflow">
                                        <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                    </div>
                                <!-- /ko -->

                                <!-- ko if: $index() === 1 -->
                                    <div class="main-container">
                                        <div class="left-container">
                                            <div class="responsively-lazy preventReflow">
                                                <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                            </div>
                                        </div>
                                        <div class="right-container">
                                            <div class="half-containers">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(subImageTop.item, subImageTop.customImage.large, subImageTop.customImage.small), src: subImageTop.customImage.large ? subImageTop.customImage.large : productImgPath(subImageTop.item,360), alt: subImageTop.item }"/>
                                                </div>
                                             </div>
                                            <div class="half-containers">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(subImageBottom.item, subImageBottom.customImage.large, subImageBottom.customImage.small), src: subImageBottom.customImage.large ? subImageBottom.customImage.large : productImgPath(subImageBottom.item,360), alt: subImageBottom.item }"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="copyContainer text-center">
                                        <div>
                                            <h3>
                                                <a class="a-secondary" data-bind="text: $parent.headline.text, attr: { href: $parent.headline.link ? ugWeb+$parent.headline.link : '' }"></a>
                                            </h3>
                                            <p class="body-small"><a data-bind="text: $parent.cta.text, attr: { href: $parent.cta.link ? ugWeb+$parent.cta.link : '' }"></a></p>
                                        </div>
                                    </div>
                                <!-- /ko -->
                            </div>
                        <!-- /ko -->
                    <!-- /ko -->
                </div>

                <div class="row">
                    <!-- ko foreach: collectionGridModulesSections -->
                        <!-- ko if: !$parent.isLessThan2($index()) -->
                            <div class="medium-6 columns">
                                <!-- ko if: $index() === 2 -->
                                    <div class="main-container">
                                        <div class="left-container">
                                            <div class="responsively-lazy preventReflow">
                                                <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                            </div>
                                        </div>
                                        <div class="right-container">
                                            <div class="half-containers">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(subImageTop.item, subImageTop.customImage.large, subImageTop.customImage.small), src: subImageTop.customImage.large ? subImageTop.customImage.large : productImgPath(subImageTop.item,360), alt: subImageTop.item }"/>
                                                </div>
                                             </div>
                                            <div class="half-containers">
                                                <div class="responsively-lazy preventReflow">
                                                    <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(subImageBottom.item, subImageBottom.customImage.large, subImageBottom.customImage.small), src: subImageBottom.customImage.large ? subImageBottom.customImage.large : productImgPath(subImageBottom.item,360), alt: subImageBottom.item }"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <!-- /ko -->

                                <!-- ko if: $index() === 3 -->
                                    <div class="responsively-lazy preventReflow" style="padding-bottom: calc(100% + .75rem);">
                                        <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                    </div>
                                <!-- /ko -->
                            </div>
                        <!-- /ko -->
                    <!-- /ko -->
                </div>
            <!-- /ko -->
        </section>`, synchronous: true
});

ko.components.register('carousel-module', {
    viewModel: class CarouselModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.intro = params.data.intro;
            this.headline = params.data.headline;
            this.cta = params.data.cta;
            this.carouselModulesSections = params.data.sections;
            this.bindingHandlers = {
                init: $(function () {
                    var mySwiper = new Swiper('.swiper-container', {
                        // Optional parameters
                        loop: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        slidesPerView: 5,
                        slidesPerGroup: 5,
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
            };
        }
    },
    template: `
        <section data-bind="resizeView: 'CL', style: { display: displayDesktop() ? 'block' : 'none' }" class="carousel-module background-color-off-white">
            <div class="row container">
                <!-- ko if: intro.text -->
                    <div class="small-12 text-center columns">
                        <label class="body-small-caps"><a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : '' }"></a></label>
                    </div>
                <!-- /ko -->

                <div class="small-12 text-center columns">
                    <h2><a class="a-secondary" data-bind="text: headline.text, attr: { href: headline.link ? ugWeb+headline.link : '' }"></a></h2>
                </div>
                <div class="small-12 columns carouselPadding">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <!-- ko foreach: carouselModulesSections -->
                                <div class="swiper-slide">
                                    <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                                        <div class="responsively-lazy preventReflow">
                                            <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                        </div>
                                    </a>
                                </div>
                            <!-- /ko -->
                        </div>
                        <div class="swiper-button-prev"><span class="icon-caret_left icon-lg"></span></div>
                        <div class="swiper-button-next"><span class="icon-caret_right icon-lg"></span></div>
                    </div>
                </div>
                <div class="small-12 columns">
                    <a data-bind="attr: { href: cta.link ? ugWeb+cta.link : '' }">
                        <button class="btn-secondary expand" data-bind="text: cta.text"></button>
                    </a>
                </div>
            </div>
        </section>`, synchronous: true
});

ko.components.register('text-link-module', {
    viewModel: class TextLinkModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.intro = params.data.intro;
            this.textLinkModuleSections = params.data.sections;
        }
    },
    template: `
        <section data-bind="resizeView: 'TL', style: { display: displayDesktop() ? 'block' : 'none' }" class="text-link-module background-color-off-white">
            <div class"row">
                <div class="small-12 small-centered columns container">
                    <!-- ko if: intro.text -->
                        <div class="row">
                            <div class="small-12 text-center columns">
                                <h3>
                                    <a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : '' }"></a>
                                </h3>
                            </div>
                        </div>
                    <!-- /ko -->

                    <!-- ko foreach: textLinkModuleSections -->
                        <div class="row">
                            <div class="small-12 columns">
                                <div class="text-link-container">
                                    <div class="content"><h4><a class="a-secondary" data-bind="text: ctaLeft.text, attr: { href: ctaLeft.link ? ugWeb+ctaLeft.link : '' }"></a></h4></div>
                                    <div class="content"><h4><a class="a-secondary" data-bind="text: ctaRight.text, attr: { href: ctaRight.link ? ugWeb+ctaRight.link : '' }"></a></h4></div>
                                </div>
                            </div>
                        </div>
                    <!-- /ko -->
                </div>
            </div>
        </section>
    `, synchronous: true
});

ko.components.register('image-link-single-module', {
    viewModel: class ImageLinkSingleModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.intro = params.data.intro;
            this.item = params.data.item;
            this.image = params.data.image;
            this.copy = params.data.copy;
        }
    },
    template: `
        <section data-bind="resizeView: 'LS', style: { display: displayDesktop() ? 'block' : 'none' }" class="image-link-single-module background-color-off-white">
            <div class="row container">
                <!-- ko if: intro.text -->
                    <div class="small-12 text-center columns">
                        <h3>
                            <a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : '' }"></a>
                        </h3>
                     </div>
                <!-- /ko -->

                <div class="small-11 small-centered text-center columns">
                    <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                        <div class="responsively-lazy preventReflow itemPhoto">
                            <img data-bind="attr: { 'data-srcset': responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: item }"/>
                        </div>
                    </a>
                    <h4><a class="a-secondary" data-bind="text: copy.text, attr: { href: copy.link ? ugWeb+copy.link : '' }"></a></h4>
                </div>
            </div>
        </section>`, synchronous: true
});

ko.components.register('image-link-double-module', {
    viewModel: class ImageLinkDoubleModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.intro = params.data.intro;
            this.imageLinkDoubleModuleSections = params.data.sections;
        }
    },
    template: `
        <section data-bind="resizeView: 'LD', style: { display: displayDesktop() ? 'block' : 'none' }" class="image-link-double-module background-color-off-white">
            <div class="row container">
                <div class="small-12 small-centered columns">
                    <!-- ko if: intro.text -->
                        <div class="row">
                            <div class="small-12 text-center columns">
                                <h3>
                                    <a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : '' }"></a>
                                </h3>
                            </div>
                        </div>
                    <!-- /ko -->
                </div>

                <div class="small-11 small-centered medium-12 columns">
                    <div class="row">
                        <!-- ko foreach: imageLinkDoubleModuleSections -->
                            <div class="small-6 medium-2 large-2 text-center columns content">
                                <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                                    <div class="responsively-lazy preventReflow">
                                        <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                                    </div>
                                </a>
                                <h4><a class="a-secondary" data-bind="text: cta.text, attr: { href: cta.link ? ugWeb+cta.link : cta.link }"></a></h4>
                            </div>
                        <!-- /ko -->
                    </div>
                </div>
            </div>
        </section>`, synchronous: true
});

ko.components.register('button-link-single-module', {
    viewModel: class ButtonLinkSingleModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.intro = params.data.intro;
            this.buttonLinkSingleModuleSections = params.data.sections;
        }
    },
    template: `
        <section data-bind="resizeView: 'BI', style: { display: displayDesktop() ? 'block' : 'none' }" class="button-link-single-module background-color-white">
            <!-- ko if: intro.text -->
                <div class="row intro">
                    <div class="small-12 text-center columns">
                        <h3>
                            <a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : '' }"></a>
                        </h3>
                    </div>
                </div>
            <!-- /ko -->

            <!-- ko foreach: buttonLinkSingleModuleSections -->
                <div class="row container">
                    <div class="small-12 small-centered columns">
                        <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                            <div class="responsively-lazy preventReflow">
                                <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,640), alt: item }"/>
                            </div>
                        </a>
                    </div>
                    <div class="small-11 small-centered columns">
                        <a data-bind="attr: { href: copy.link ? ugWeb+copy.link : '' }">
                            <button class="btn-secondary expand" data-bind="text: copy.text"></button>
                        </a>
                    </div>
                </div>
            <!-- /ko -->
        </section>`, synchronous: true
});

ko.components.register('button-link-double-module', {
    viewModel: class ButtonLinkDoubleModuleComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.intro = params.data.intro;
            this.buttonLinkDoubleModuleSections = params.data.sections;
        }
    },
    template: `
        <section data-bind="resizeView: 'BD', style: { display: displayDesktop() ? 'block' : 'none' }" class="button-link-double-module background-color-white">
             <div class="row container">
                 <!-- ko if: intro.text -->
                     <div class="small-12 text-center columns">
                         <h3>
                             <a class="a-secondary" data-bind="text: intro.text, attr: { href: intro.link ? ugWeb+intro.link : '' }"></a>
                         </h3>
                     </div>
                  <!-- /ko -->

                <!-- ko foreach: buttonLinkDoubleModuleSections -->
                    <div class="small-6 medium-3 text-center columns content">
                        <a data-bind="attr: { href: image.link ? ugWeb+image.link : '' }">
                            <div class="responsively-lazy preventReflow">
                                <img data-bind="attr: { 'data-srcset': $parent.responsiveImage(item, image.customImage.large, image.customImage.small), src: image.customImage.large ? image.customImage.large : productImgPath(item,360), alt: item }"/>
                            </div>
                        </a>
                        <div class="row btnContainer">
                            <div class="small-11 small-centered columns">
                                <a data-bind="attr: { href: cta.link ? ugWeb+cta.link : '' }">
                                    <button class="btn-secondary expand" data-bind="text: cta.text"></button>
                                </a>
                            </div>
                        </div>
                    </div>
                <!-- /ko -->
            </div>
        </section>`, synchronous: true
});

ko.components.register('homePage-container', {
    //viewModel: function (params) {
    viewModel: class HomePageContainerComponentModel extends Dependents {
        constructor(params) {
            super(params);
            this.totalModules = Object.keys(mappingOrder).length;
            Object.keys(mappingOrder).forEach((letter, i) => {
                Object.keys(mappingOrder[letter]).forEach((module, index) => {
                    mappingOrder[letter][module]['index'] = i;
                })
            });
        }
    },
    template: `
        <!--ko foreach: { data: Object.keys(mappingOrder) } -->
            <!-- ko component: {name: Object.keys(mappingOrder[$data])[0], params:{data:mappingOrder[$data][Object.keys(mappingOrder[$data])], order:$parent}} --><!-- /ko -->
        <!-- /ko -->`, synchronous: true
});

ko.applyBindings();

//Module Templates
// "large-feature-module": {
//     "item": "42160",
//     "image": {
//         "customImage": "http://www.uncommongoods.com/images/items/42100/42160_3_1200px.jpg",
//         "link": "/kitchen-bar/kitchen-tools"
//     },
//     "headline": {
//         "text": "set up your prep",
//         "link": "/kitchen-bar/kitchen-tools"
//     },
//     "cta": {
//         "text": "call to action",
//         "link": "/kitchen-bar/kitchen-tools"
//     }
// },
// "small-feature-module": {
//     "intro": {
//         "text": "Section Intro",
//         "link": ""
//      },
//     "sections": [
//          {
//             "item": "24066",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/3-stone-sea-glass-necklace"
//              },
//             "headline": {
//                 "text": "Our Favorite inspirational Jewelry Gifts",
//                 "link": "/jewelry?view=all"
//              },
//             "cta": {
//                 "text": "shop the gift guide",
//                 "link": "/jewelry?view=all"
//              }
//         },
//         {
//             "item": "40433",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/adventurer-multi-tool-clip-watch"
//             },
//             "headline": {
//                 "text": "15 Groomsmen Gifts Your Guys Will Use",
//                 "link": "/gifts/wedding-gifts/groomsmen-gifts"
//             },
//             "cta": {
//                 "text": "shop the gift guide",
//                 "link": "/gifts/wedding-gifts/groomsmen-gifts"
//             }
//         },
//         {
//            "item": "23847",
//            "image": {
//                "customImage": "",
//                "link": "/product/elwood-the-rainbow-unicorn-mug"
//            },
//            "headline": {
//                "text": "Unforgettable Birthday Gifts for Everyone",
//                "link": "/gifts/birthday-gifts?view=all"
//            },
//            "cta": {
//                "text": "shop the gift guide",
//                "link": "/gifts/birthday-gifts?view=all"
//            }
//        }
//     ]
// },
// "basic-story-module": {
//     "item": "42160",
//     "intro": {
//         "text": "Section Intro",
//         "link": ""
//     },
//     "image": {
//         "customImage": "http://www.uncommongoods.com/images/items/42100/42160_3_1200px.jpg",
//         "link": "/kitchen-bar/kitchen-tools"
//     },
//     "headline": {
//         "text": "City Bike Map Glasses - Set of 2",
//         "link": "/product/city-bike-map-glasses-set-of-2"
//     },
//     "cta": {
//         "text": "see more",
//         "link": "/product/city-bike-map-glasses-set-of-2"
//     }
// },
// "extended-story-module": {
//     "item": "42121",
//     "intro": {
//         "text": "coming soon",
//         "link": "/product/nightbulb"
//     },
//     "image": {
//         "customImage": "",
//         "link": "/product/nightbulb"
//     },
//     "headline": {
//         "text": "Introducing the Nightbulb",
//         "link": "/product/nightbulb"
//     },
//     "cta": {
//         "text": "pre-order now",
//         "link": "/product/nightbulb"
//     },
//     "copy": {
//         "text": "Designers Liz Ross and David Westby set out to create a snow globe-inspired light, only to find that lightbulbs and flurry-filled domes already shared some design history.",
//         "link": "/product/nightbulb"
//     }
// },
// "collection-grid-module": {
//     "intro": {
//         "text": "Section Intro",
//         "link": ""
//     },
//     "headline": {
//         "text": "something for everyone",
//         "link": "/fun/by-interest"
//     },
//     "cta": {
//         "text": "shop by interest",
//         "link": "/fun/by-interest"
//     },
//     "sections": [
//         {
//            "item": "42230",
//            "image": {
//                "customImage": "",
//                "link": "/product/timbrefone-acoustic-phone-amp"
//            }
//        },
//        {
//            "item": "42173",
//            "image": {
//               "customImage": "",
//               "link": "/product/bike-today-work-tomorrow-paperweight"
//            }
//        },
//        {
//            "item": "27160",
//            "image": {
//                "customImage": "",
//                "link": "/product/you-help-me-grow-planter"
//            }
//        },
//        {
//            "item": "41680",
//            "image": {
//                "customImage": "",
//                "link": "/product/block-printed-robe"
//            }
//        }
//     ]
// },
// "carousel-module": {
//     "intro": {
//         "text": "Section Intro",
//         "link": ""
//     },
//     "headline": {
//         "text": "collection headline",
//         "link": "/kitchen-bar/kitchen-tools"
//     },
//     "cta": {
//         "text": "call to action",
//         "link": "/kitchen-bar/kitchen-tools"
//     },
//     "sections": [
//         {
//             "item": "27234",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/productivity-timing-hourglass"
//             }
//         },
//         {
//             "item": "41601",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/personalized-amp-doormat"
//             }
//         },
//         {
//             "item": "41087",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/personalized-my-alphabet-letter-blanket"
//             }
//         },
//         {
//             "item": "22195",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/equation-geek-watch"
//             }
//         },
//         {
//             "item": "26739",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/musical-skyline-art-large"
//             }
//         },
//         {
//             "item": "23960",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/personalized-whiskey-barrel"
//             }
//         }
//     ]
// },
// "text-link-module": {
//     "intro": {
//         "text": "shop by recipient",
//         "link": "/gifts/by-recipient"
//     },
//     "sections": [
//         {
//             "ctaLeft": {
//                 "text": "for him",
//                 "link": "/gifts/by-recipient/gifts-for-men"
//             },
//             "ctaRight": {
//                 "text": "for her",
//                 "link": "/gifts/by-recipient/gifts-for-women"
//             }
//         },
//         {
//             "ctaLeft": {
//                 "text": "for couples",
//                 "link": "/gifts/by-recipient/gifts-for-couples"
//             },
//             "ctaRight": {
//                 "text": "for kids",
//                 "link": "/gifts/by-recipient/gifts-for-kids"
//             }
//         },
//         {
//             "ctaLeft": {
//                 "text": "gifts under $25",
//                 "link": "/gifts/by-price/gifts-under-25"
//             },
//             "ctaRight": {
//                 "text": "gifts under $50",
//                 "link": "/gifts/by-price/gifts-under-50"
//             }
//         },
//         {
//             "ctaLeft": {
//                 "text": "wedding gifts",
//                 "link": "/gifts/wedding-gifts?view=all"
//             },
//             "ctaRight": {
//                 "text": "this just in",
//                 "link": "/this-just-in"
//             }
//         },
//         {
//             "ctaLeft": {
//                 "text": "handmade",
//                 "link": "/sets/handmade-gifts"
//             },
//             "ctaRight": {
//                 "text": "home decor",
//                 "link": "/home-garden/home-decor?view=all"
//             }
//         },
//         {
//             "ctaLeft": {
//                 "text": "sale",
//                 "link": "/sale"
//             },
//             "ctaRight": {
//                 "text": "jewelry",
//                 "link": "/jewelry?view=all"
//             }
//         }
//     ]
// },
// "image-link-single-module": {
//     "intro": {
//         "text": "Section Intro",
//         "link": ""
//     },
//     "item": "42733",
//     "image": {
//         "customImage": "",
//         "link": "/product/personalized-flex-time-clock"
//     },
//     "copy": {
//         "text": "Flex Time",
//         "link": "/product/personalized-flex-time-clock"
//     }
// },
// "image-link-double-module": {
//     "intro": {
//         "text": "Top Categories",
//         "link": "/gifts/by-recipient"
//     },
//     "sections": [
//         {
//             "item": "42159",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/bioluminescent-mini-aquarium"
//             },
//             "cta": {
//                 "text": "fun",
//                 "link": "/product/bioluminescent-mini-aquarium"
//             }
//         },
//         {
//             "item": "26827",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/barnwood-state-side-tables"
//             },
//             "cta": {
//                 "text": "home",
//                 "link": "/product/barnwood-state-side-tables"
//             }
//         },
//         {
//             "item": "24008",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/pedestal-jewelry-holder"
//             },
//             "cta": {
//                 "text": "jewelry",
//                 "link": "/product/pedestal-jewelry-holder"
//             }
//         },
//         {
//             "item": "40340",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/nautical-whiskey-stones"
//             },
//             "cta": {
//                 "text": "kitchen & bar",
//                 "link": "/product/nautical-whiskey-stones"
//             }
//         },
//         {
//             "item": "42511",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/a-couple-of-gardeners-hanging-sculptures"
//             },
//             "cta": {
//                 "text": "this just in",
//                 "link": "/product/a-couple-of-gardeners-hanging-sculptures"
//             }
//         },
//         {
//             "item": "26208",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/pyramid-tea-bag-set"
//             },
//             "cta": {
//                 "text": "sale",
//                 "link": "/product/pyramid-tea-bag-set"
//             }
//         }
//     ]
// },
// "button-link-single-module": {
//     "intro": {
//         "text": "Section Intro",
//         "link": ""
//     },
//     "sections": [
//         {
//             "item": "20154",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/personalized-cursive-wedding-vase"
//             },
//             "copy": {
//                 "text": "wedding gifts",
//                 "link": "/gifts/wedding-gifts?view=all"
//             }
//         },
//         {
//             "item": "41007",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/constant-sparkling-champagne-flutes-set-of-4"
//             },
//             "copy": {
//                 "text": "anniversary gifts",
//                 "link": "/gifts/anniversary-gifts/anniversary-gifts"
//             }
//         },
//         {
//             "item": "22272",
//             "image": {
//                 "customImage": "",
//                 "link": "/product/intersection-of-love-photo-print"
//             },
//             "copy": {
//                 "text": "personalized gifts",
//                 "link": "/gifts/personalized/personalized-gifts"
//             }
//         }
//     ]
// },
// "button-link-double-module": {
//     "intro": {
//         "text": "Section Intro",
//         "link": ""
//     },
//     "sections": [
//         {
//             "item": "25208",
//             "image": {
//                 "customImage": "",
//                 "link": "/gifts/wedding-gifts?view=all"
//             },
//             "cta": {
//                 "text": "wedding Gifts",
//                 "link": "/gifts/wedding-gifts?view=all"
//             }
//         },
//         {
//             "item": "19835",
//             "image": {
//                 "customImage": "",
//                 "link": "/sets/handmade-gifts"
//             },
//             "cta": {
//                 "text": "handmade Gifts",
//                 "link": "/sets/handmade-gifts"
//             }
//         },
//         {
//             "item": "26468",
//             "image": {
//                 "customImage": "",
//                 "link": "/gifts/anniversary-gifts/anniversary-gifts"
//             },
//             "cta": {
//                 "text": "anniversary Gifts",
//                 "link": "/gifts/anniversary-gifts/anniversary-gifts"
//             }
//         },
//         {
//             "item": "24870",
//             "image": {
//                 "customImage": "",
//                 "link": "/gifts/birthday-gifts?view=all"
//             },
//             "cta": {
//                 "text": "birthday Gifts",
//                 "link": "/gifts/birthday-gifts?view=all"
//             }
//         }
//     ]
// },
// "extended-story-module": {
//     "item": "42161",
//     "intro": {
//         "text": "meet the maker",
//         "link": "/product/common-edge-3d-printed-initial-necklace"
//     },
//     "image": {
//         "customImage": "http://www.uncommongoods.com/images/items/42100/42161_2_640px.jpg",
//         "link": "/product/common-edge-3d-printed-initial-necklace"
//     },
//     "headline": {
//         "text": "Andrea Panico",
//         "link": "/product/common-edge-3d-printed-initial-necklace"
//     },
//     "cta": {
//         "text": "read more",
//         "link": "/product/common-edge-3d-printed-initial-necklace"
//     },
//     "copy": {
//         "text": "Andrea combines her architectural approach to jewelry design with 3D printing technology to create her Common Edge initial Necklace.",
//         "link": "/product/common-edge-3d-printed-initial-necklace"
//     },
//     "artistId": "26401"
// }
