var mappingOrder = {};
var initViewModels = [];
var counter = 0;
// var loadingModelData = ko.observableArray();

class Dependents {
    constructor(params) {
        this.loadingModelData = ko.observableArray().extend({ deferred: true });

        this.itemNumber = ko.observable("");
        this.itemUrl = ko.observable("");

        this.imageSmallUrl = ko.observable("");
        this.imageLargeUrl = ko.observable("");
        this.imageDescription = ko.observable("");

        this.headline = ko.observable("");
        this.headlineUrl = ko.observable("");
        this.headlineDescription = ko.observable("");

        this.copy = ko.observable("");
        this.copyUrl = ko.observable("");
        this.copyDescription = ko.observable("");

        this.cta = ko.observable("");
        this.ctaUrl = ko.observable("");
        this.ctaDescription = ko.observable("");

        this.section = ko.observable("");
        this.sectionUrl = ko.observable("");
        this.sectionDescription = ko.observable("");

        this.seo1Section = ko.observable("");
        this.seo1SectionUrl = ko.observable("");
        this.seo1SectionDescription = ko.observable("");

        this.seo1cta = ko.observable("");
        this.seo1ctaUrl = ko.observable("");
        this.seo1ctaDescription = ko.observable("");

        this.seo2Section = ko.observable("");
        this.seo2SectionUrl = ko.observable("");
        this.seo2SectionDescription = ko.observable("");

        this.seo2cta = ko.observable("");
        this.seo2ctaUrl = ko.observable("");
        this.seo2ctaDescription = ko.observable("");

        this.seo2ItemNumber = ko.observable("");
        this.seo2ItemUrl = ko.observable("");

        this.seo2ImageSmallUrl = ko.observable("");
        this.seo2ImageLargeUrl = ko.observable("");
        this.seo2ImageDescription = ko.observable("");

        this.seo2cta = ko.observable("");
        this.seo2ctaUrl = ko.observable("");
        this.seo2ctaDescription = ko.observable("");

        this.moduleType = ko.observable("");
        this.displayModuleOn = ko.observable("");
        this.screenSizes = ko.observableArray(['small', 'medium', 'large', 'xlarge']);
        this.selectedGroupScreenSize = ko.observable('small');
        this.selectedModuleScreenSize = ko.observable('small')

        this.alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.mappingOrder = {};
        this.uniqueIdModified = ko.observable("");
        this.uniqueId = new Date().getTime();
        this.sortMappingOrder = function() {
            var uniqueIdReordered = this.uniqueIdModified();

            function reorderAlpha(obj, curr, updated) {
                var jsonString = JSON.stringify(obj);
                jsonString = jsonString.replace(curr, updated);
                var jsonObj = JSON.parse(jsonString);
                return jsonObj;
            };
            uniqueIdReordered.forEach((el,index) => {
                var alphaChar = this.alpha.charAt(index);
                if (Object.keys(this.mappingOrder[el]) != alphaChar) {
                    var curr = Object.keys(this.mappingOrder[el])[0];
                    this.mappingOrder[el] = reorderAlpha(this.mappingOrder[el],curr, alphaChar);
                }
            });
        }
        this.removeModule = function(e) {
          var container = document.getElementById(e.uniqueId);
          var removeIndex = this.params.data.selectedModules().indexOf(ko.contextFor(container).$parent);
          this.params.data.selectedModules().splice(removeIndex, 1)
          ko.removeNode(container);
          delete this.params.data.mappingOrder[e.uniqueId];;
        }
        this.bindingHandlers = {
            init: $(function () {
                $(document).foundation({
                    accordion: {
                        content_class: 'content', // specify the class used for active (or open) accordion panels
                        active_class: 'active', // allow multiple accordion panels to be active at the same time
                        multi_expand: false, // allow accordion panels to be closed by clicking on their headers
                        toggleable: true
                    }
                });
            })
        };

        ko.bindingHandlers.sortable = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                if (Object.keys(mappingOrder).length != 0) {
                    viewModel.params.data.loadingModelData.push(bindingContext);

                    if (counter === viewModel.params.data.selectedModules().length) {
                        var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        var result = viewModel.params.data.loadingModelData().reduce(function(prev, curr) {
                            if (prev.length && curr.$parent === prev[prev.length - 1][0].$parent) {
                                prev[prev.length - 1].push(curr);
                            }
                            else {
                                prev.push([curr]);
                            }
                            return prev;
                        }, []);

                        console.log(result);

                        result.forEach((section, index) => {
                            var alphaChar = alpha.charAt(index);
                            var moduleType = section[0].$parent;
                            section.forEach((binding,i) => {
                                //console.log(mappingOrder[alphaChar][moduleType]['sections'][i]);

                                binding.$data.itemNumber(!!mappingOrder[alphaChar][moduleType]['sections'][i].item ? mappingOrder[alphaChar][moduleType]['sections'][i].item : '');
                                binding.$data.itemUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.link : '');
                                binding.$data.selectedModuleScreenSize(!!mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn ? mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn : '');

                                binding.$data.imageSmallUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.small : '');
                                binding.$data.imageLargeUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.large : '');
                                binding.$data.imageDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.description : '');

                                binding.$data.section(!!mappingOrder[alphaChar][moduleType]['sections'][i].section ? mappingOrder[alphaChar][moduleType]['sections'][i].section.text : '');
                                binding.$data.sectionUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].section ? mappingOrder[alphaChar][moduleType]['sections'][i].section.link : '');
                                binding.$data.sectionDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].section ? mappingOrder[alphaChar][moduleType]['sections'][i].section.description : '');

                                binding.$data.headline(!!mappingOrder[alphaChar][moduleType]['sections'][i].headline ? mappingOrder[alphaChar][moduleType]['sections'][i].headline.text : '');
                                binding.$data.headlineUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].headline ? mappingOrder[alphaChar][moduleType]['sections'][i].headline.link : '');
                                binding.$data.headlineDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].headline ? mappingOrder[alphaChar][moduleType]['sections'][i].headline.description : '');

                                binding.$data.copy(!!mappingOrder[alphaChar][moduleType]['sections'][i].copy ? mappingOrder[alphaChar][moduleType]['sections'][i].copy.text : '');
                                binding.$data.copyUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].copy ? mappingOrder[alphaChar][moduleType]['sections'][i].copy.link : '');
                                binding.$data.copyDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].copy ? mappingOrder[alphaChar][moduleType]['sections'][i].copy.description : '');

                                binding.$data.cta(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.text : '');
                                binding.$data.ctaUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.link : '');
                                binding.$data.ctaDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.description : '');

                                //binding.$data.section(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.text : '');
                                //binding.$data.sectionUrl(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.link : '');
                                //binding.$data.sectionDescription(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.description : '');

                            })
                        })

                    }

                    // if (viewModel.params.data.selectedModules().length <= Object.keys(mappingOrder).length) {
                    //     findModule(bindingContext.$parent);
                    //
                    // }
                    //
                    // function findModule(viewModelModule) {
                        // Object.keys(mappingOrder).forEach((letter, i) => {
                        //     Object.keys(mappingOrder[letter]).forEach((module, index) => {
                    //             if (viewModelModule === module){
                    //                 switch (module) {
                    //                     case 'large-feature-module':
                    //                         //console.log(mappingOrder[letter][module]['sections'][index].cta.link);
                    //                         viewModel.itemNumber(mappingOrder[letter][module]['sections'][index].item);
                    //                         viewModel.selectedModuleScreenSize(mappingOrder[letter][module]['sections'][index].displayModuleOn);
                    //
                    //                         viewModel.itemUrl(mappingOrder[letter][module]['sections'][index].image.link);
                    //                         viewModel.imageSmallUrl(mappingOrder[letter][module]['sections'][index].image.customImage.small);
                    //                         viewModel.imageLargeUrl(mappingOrder[letter][module]['sections'][index].image.customImage.large);
                    //                         viewModel.imageDescription(mappingOrder[letter][module]['sections'][index].image.description);
                    //
                    //                         viewModel.headline(mappingOrder[letter][module]['sections'][index].headline.text);
                    //                         viewModel.headlineUrl(mappingOrder[letter][module]['sections'][index].headline.link);
                    //                         viewModel.headlineDescription(mappingOrder[letter][module]['sections'][index].headline.description);
                    //
                    //                         viewModel.cta(mappingOrder[letter][module]['sections'][index].cta.text);
                    //                         viewModel.ctaUrl(mappingOrder[letter][module]['sections'][index].cta.link);
                    //                         viewModel.ctaDescription(mappingOrder[letter][module]['sections'][index].cta.description);
                    //                     break
                    //                     case 'small-feature-module':
                    //                         viewModel.itemNumber(mappingOrder[letter][module]['sections'][index].item);
                    //                         viewModel.selectedModuleScreenSize(mappingOrder[letter][module]['sections'][index].displayModuleOn);
                    //
                    //                         viewModel.itemUrl(mappingOrder[letter][module]['sections'][index].image.link);
                    //                         viewModel.imageSmallUrl(mappingOrder[letter][module]['sections'][index].image.customImage.small);
                    //                         viewModel.imageLargeUrl(mappingOrder[letter][module]['sections'][index].image.customImage.large);
                    //                         viewModel.imageDescription(mappingOrder[letter][module]['sections'][index].image.description);
                    //
                    //                         viewModel.section(mappingOrder[letter][module]['sections'][index].section.text);
                    //                         viewModel.sectionUrl(mappingOrder[letter][module]['sections'][index].section.link);
                    //                         viewModel.sectionDescription(mappingOrder[letter][module]['sections'][index].section.description);
                    //
                    //                         viewModel.headline(mappingOrder[letter][module]['sections'][index].headline.text);
                    //                         viewModel.headlineUrl(mappingOrder[letter][module]['sections'][index].headline.link);
                    //                         viewModel.headlineDescription(mappingOrder[letter][module]['sections'][index].headline.description);
                    //
                    //                         viewModel.cta(mappingOrder[letter][module]['sections'][index].cta.text);
                    //                         viewModel.ctaUrl(mappingOrder[letter][module]['sections'][index].cta.link);
                    //                         viewModel.ctaDescription(mappingOrder[letter][module]['sections'][index].cta.description);
                    //                     break
                    //                     case 'basic-story-module':
                                            // viewModel.itemNumber(mappingOrder[letter][module]['sections'][index].item);
                                            // viewModel.selectedModuleScreenSize(mappingOrder[letter][module]['sections'][index].displayModuleOn);
                                            //
                                            // viewModel.itemUrl(mappingOrder[letter][module]['sections'][index].image.link);
                                            // viewModel.imageSmallUrl(mappingOrder[letter][module]['sections'][index].image.customImage.small);
                                            // viewModel.imageLargeUrl(mappingOrder[letter][module]['sections'][index].image.customImage.large);
                                            // viewModel.imageDescription(mappingOrder[letter][module]['sections'][index].image.description);
                                            //
                                            // viewModel.section(mappingOrder[letter][module]['sections'][index].section.text);
                                            // viewModel.sectionUrl(mappingOrder[letter][module]['sections'][index].section.link);
                                            // viewModel.sectionDescription(mappingOrder[letter][module]['sections'][index].section.description);
                                            //
                                            // viewModel.headline(mappingOrder[letter][module]['sections'][index].headline.text);
                                            // viewModel.headlineUrl(mappingOrder[letter][module]['sections'][index].headline.link);
                                            // viewModel.headlineDescription(mappingOrder[letter][module]['sections'][index].headline.description);
                                            //
                                            // viewModel.cta(mappingOrder[letter][module]['sections'][index].cta.text);
                                            // viewModel.ctaUrl(mappingOrder[letter][module]['sections'][index].cta.link);
                                            // viewModel.ctaDescription(mappingOrder[letter][module]['sections'][index].cta.description);
                    //                     break
                    //                     case 'extended-story-module':
                    //                         viewModel.itemNumber(mappingOrder[letter][module]['sections'][index].item);
                    //                         viewModel.selectedModuleScreenSize(mappingOrder[letter][module]['sections'][index].displayModuleOn);
                    //
                    //                         viewModel.itemUrl(mappingOrder[letter][module]['sections'][index].image.link);
                    //                         viewModel.imageSmallUrl(mappingOrder[letter][module]['sections'][index].image.customImage.small);
                    //                         viewModel.imageLargeUrl(mappingOrder[letter][module]['sections'][index].image.customImage.large);
                    //                         viewModel.imageDescription(mappingOrder[letter][module]['sections'][index].image.description);
                    //
                    //                         viewModel.section(mappingOrder[letter][module]['sections'][index].section.text);
                    //                         viewModel.sectionUrl(mappingOrder[letter][module]['sections'][index].section.link);
                    //                         viewModel.sectionDescription(mappingOrder[letter][module]['sections'][index].section.description);
                    //
                    //                         viewModel.headline(mappingOrder[letter][module]['sections'][index].headline.text);
                    //                         viewModel.headlineUrl(mappingOrder[letter][module]['sections'][index].headline.link);
                    //                         viewModel.headlineDescription(mappingOrder[letter][module]['sections'][index].headline.description);
                    //
                    //                         viewModel.copy(mappingOrder[letter][module]['sections'][index].copy.text);
                    //                         viewModel.copyUrl(mappingOrder[letter][module]['sections'][index].copy.link);
                    //                         viewModel.copyDescription(mappingOrder[letter][module]['sections'][index].copy.description);
                    //
                    //                         viewModel.cta(mappingOrder[letter][module]['sections'][index].cta.text);
                    //                         viewModel.ctaUrl(mappingOrder[letter][module]['sections'][index].cta.link);
                    //                         viewModel.ctaDescription(mappingOrder[letter][module]['sections'][index].cta.description);
                    //                     break
                    //                     case 'collection-grid-module':
                    //                         var itemNumbers = [];
                    //                         var itemUrls = [];
                    //                         var smallImageUrls = [];
                    //                         var largeImageUrls = [];
                    //                         var imageDescriptions = [];
                    //                         mappingOrder[letter][module]['sections'].forEach((item, index) => {
                    //                             itemNumbers.push(item.item);
                    //                             itemUrls.push(item.image.link);
                    //                             smallImageUrls.push(item.image.customImage.small);
                    //                             largeImageUrls.push(item.image.customImage.small);
                    //                             imageDescriptions.push(item.image.customImage.small);
                    //                         })
                    //                         itemNumbers = itemNumbers.join("\n");
                    //                         itemUrls = itemUrls.join("\n");
                    //                         smallImageUrls = smallImageUrls.join("\n");
                    //                         largeImageUrls = largeImageUrls.join("\n");
                    //                         imageDescriptions = imageDescriptions.join("\n");
                    //
                    //                         viewModel.itemNumber(itemNumbers);
                    //                         viewModel.itemUrl(itemUrls);
                    //                         viewModel.imageSmallUrl(smallImageUrls);
                    //                         viewModel.imageLargeUrl(largeImageUrls);
                    //                         viewModel.imageDescription(imageDescriptions);
                    //
                    //                         viewModel.section(mappingOrder[letter][module]['section'].text);
                    //                         viewModel.sectionUrl(mappingOrder[letter][module]['section'].link);
                    //                         viewModel.sectionDescription(mappingOrder[letter][module]['section'].description);
                    //
                    //                         viewModel.headline(mappingOrder[letter][module]['headline'].text);
                    //                         viewModel.headlineUrl(mappingOrder[letter][module]['headline'].link);
                    //                         viewModel.headlineDescription(mappingOrder[letter][module]['headline'].description);
                    //
                    //                         viewModel.cta(mappingOrder[letter][module]['cta'].text);
                    //                         viewModel.ctaUrl(mappingOrder[letter][module]['cta'].link);
                    //                         viewModel.ctaDescription(mappingOrder[letter][module]['cta'].description);
                    //                     break
                    //                     case 'carousel-module':
                    //                         var itemNumbers = [];
                    //                         var itemUrls = [];
                    //                         var smallImageUrls = [];
                    //                         var largeImageUrls = [];
                    //                         var imageDescriptions = [];
                    //                         mappingOrder[letter][module]['sections'].forEach((item, index) => {
                    //                             itemNumbers.push(item.item);
                    //                             itemUrls.push(item.image.link);
                    //                             smallImageUrls.push(item.image.customImage.small);
                    //                             largeImageUrls.push(item.image.customImage.small);
                    //                             imageDescriptions.push(item.image.customImage.small);
                    //                         })
                    //                         itemNumbers = itemNumbers.join("\n");
                    //                         itemUrls = itemUrls.join("\n");
                    //                         smallImageUrls = smallImageUrls.join("\n");
                    //                         largeImageUrls = largeImageUrls.join("\n");
                    //                         imageDescriptions = imageDescriptions.join("\n");
                    //
                    //                         viewModel.itemNumber(itemNumbers);
                    //                         viewModel.itemUrl(itemUrls);
                    //                         viewModel.imageSmallUrl(smallImageUrls);
                    //                         viewModel.imageLargeUrl(largeImageUrls);
                    //                         viewModel.imageDescription(imageDescriptions);
                    //
                    //                         viewModel.section(mappingOrder[letter][module]['section'].text);
                    //                         viewModel.sectionUrl(mappingOrder[letter][module]['section'].link);
                    //                         viewModel.sectionDescription(mappingOrder[letter][module]['section'].description);
                    //
                    //                         viewModel.headline(mappingOrder[letter][module]['headline'].text);
                    //                         viewModel.headlineUrl(mappingOrder[letter][module]['headline'].link);
                    //                         viewModel.headlineDescription(mappingOrder[letter][module]['headline'].description);
                    //
                    //                         viewModel.cta(mappingOrder[letter][module]['cta'].text);
                    //                         viewModel.ctaUrl(mappingOrder[letter][module]['cta'].link);
                    //                         viewModel.ctaDescription(mappingOrder[letter][module]['cta'].description);
                    //                     break
                    //                     case 'text-link-module':
                    //                         viewModel.section(mappingOrder[letter][module].section.text);
                    //                         viewModel.sectionUrl(mappingOrder[letter][module].section.link);
                    //                         viewModel.sectionDescription(mappingOrder[letter][module].section.description);
                    //
                    //                         viewModel.itemNumber(mappingOrder[letter][module]['sections'][index].item);
                    //                         viewModel.selectedModuleScreenSize(mappingOrder[letter][module]['sections'][index].displayModuleOn);
                    //
                    //                         viewModel.itemUrl(mappingOrder[letter][module]['sections'][index].image.link);
                    //                         viewModel.imageSmallUrl(mappingOrder[letter][module]['sections'][index].image.customImage.small);
                    //                         viewModel.imageLargeUrl(mappingOrder[letter][module]['sections'][index].image.customImage.large);
                    //                         viewModel.imageDescription(mappingOrder[letter][module]['sections'][index].image.description);
                    //
                    //                         viewModel.cta(mappingOrder[letter][module]['sections'][index].cta.text);
                    //                         viewModel.ctaUrl(mappingOrder[letter][module]['sections'][index].cta.link);
                    //                         viewModel.ctaDescription(mappingOrder[letter][module]['sections'][index].cta.description);
                    //                     break
                    //                     case 'image-link-double-module':
                    //                         viewModel.section(mappingOrder[letter][module].section.text);
                    //                         viewModel.sectionUrl(mappingOrder[letter][module].section.link);
                    //                         viewModel.sectionDescription(mappingOrder[letter][module].section.description);
                    //
                    //                         viewModel.itemNumber(mappingOrder[letter][module]['sections'][index].item);
                    //                         viewModel.selectedModuleScreenSize(mappingOrder[letter][module]['sections'][index].displayModuleOn);
                    //
                    //                         viewModel.itemUrl(mappingOrder[letter][module]['sections'][index].image.link);
                    //                         viewModel.imageSmallUrl(mappingOrder[letter][module]['sections'][index].image.customImage.small);
                    //                         viewModel.imageLargeUrl(mappingOrder[letter][module]['sections'][index].image.customImage.large);
                    //                         viewModel.imageDescription(mappingOrder[letter][module]['sections'][index].image.description);
                    //
                    //                         viewModel.cta(mappingOrder[letter][module]['sections'][index].cta.text);
                    //                         viewModel.ctaUrl(mappingOrder[letter][module]['sections'][index].cta.link);
                    //                         viewModel.ctaDescription(mappingOrder[letter][module]['sections'][index].cta.description);
                    //                     break
                    //                     case 'button-link-double-module':
                    //                         viewModel.section(mappingOrder[letter][module].section.text);
                    //                         viewModel.sectionUrl(mappingOrder[letter][module].section.link);
                    //                         viewModel.sectionDescription(mappingOrder[letter][module].section.description);
                    //
                    //                         viewModel.itemNumber(mappingOrder[letter][module]['sections'][index].item);
                    //                         viewModel.selectedModuleScreenSize(mappingOrder[letter][module]['sections'][index].displayModuleOn);
                    //
                    //                         viewModel.itemUrl(mappingOrder[letter][module]['sections'][index].image.link);
                    //                         viewModel.imageSmallUrl(mappingOrder[letter][module]['sections'][index].image.customImage.small);
                    //                         viewModel.imageLargeUrl(mappingOrder[letter][module]['sections'][index].image.customImage.large);
                    //                         viewModel.imageDescription(mappingOrder[letter][module]['sections'][index].image.description);
                    //
                    //                         viewModel.cta(mappingOrder[letter][module]['sections'][index].cta.text);
                    //                         viewModel.ctaUrl(mappingOrder[letter][module]['sections'][index].cta.link);
                    //                         viewModel.ctaDescription(mappingOrder[letter][module]['sections'][index].cta.description);
                    //                     break
                    //                     case 'seo-link-module':
                    //                         var seo1cta = [];
                    //                         var seo1ctaUrl = [];
                    //                         var seo1ctaDescription = [];
                    //
                    //                         var seo2cta = [];
                    //                         var seo2ctaUrl = [];
                    //                         var seo2ctaDescription = [];
                    //                         var itemNumbers = [];
                    //                         var itemUrls = [];
                    //                         var imageDescriptions = [];
                    //                         var smallImageUrls = [];
                    //                         var largeImageUrls = [];
                    //
                    //                         mappingOrder[letter][module]['seo1']['sections'].forEach((item, index) => {
                    //                             seo1cta.push(item.cta.text);
                    //                             seo1ctaUrl.push(item.cta.link);
                    //                             seo1ctaDescription.push(item.cta.description);
                    //                         })
                    //
                    //                         mappingOrder[letter][module]['seo2']['sections'].forEach((item, index) => {
                    //                             itemNumbers.push(item.item);
                    //                             itemUrls.push(item.image.link);
                    //                             imageDescriptions.push(item.image.description);
                    //                             smallImageUrls.push(item.image.customImage.small);
                    //                             largeImageUrls.push(item.image.customImage.large);
                    //                             seo2cta.push(item.cta.text);
                    //                             seo2ctaUrl.push(item.cta.link);
                    //                             seo2ctaDescription.push(item.cta.description);
                    //                         })
                    //
                    //                         seo1cta = seo1cta.join("\n");
                    //                         seo1ctaUrl = seo1ctaUrl.join("\n");
                    //                         seo1ctaDescription = seo1ctaDescription.join("\n");
                    //
                    //                         itemNumbers = itemNumbers.join("\n");
                    //                         itemUrls = itemUrls.join("\n");
                    //                         smallImageUrls = smallImageUrls.join("\n");
                    //                         largeImageUrls = largeImageUrls.join("\n");
                    //                         imageDescriptions = imageDescriptions.join("\n");
                    //                         seo2cta = seo2cta.join("\n");
                    //                         seo2ctaUrl = seo2ctaUrl.join("\n");
                    //                         seo2ctaDescription = seo2ctaDescription.join("\n");
                    //
                    //                         viewModel.seo1Section(mappingOrder[letter][module]['seo1']['section'].text);
                    //                         viewModel.seo1SectionUrl(mappingOrder[letter][module]['seo1']['section'].link);
                    //                         viewModel.seo1SectionDescription(mappingOrder[letter][module]['seo1']['section'].description);
                    //
                    //                         viewModel.seo1cta(seo1cta);
                    //                         viewModel.seo1ctaUrl(seo1ctaUrl);
                    //                         viewModel.seo1ctaDescription(seo1ctaDescription);
                    //
                    //                         viewModel.seo2Section(mappingOrder[letter][module]['seo2']['section'].text);
                    //                         viewModel.seo2SectionUrl(mappingOrder[letter][module]['seo2']['section'].link);
                    //                         viewModel.seo2SectionDescription(mappingOrder[letter][module]['seo2']['section'].description);
                    //
                    //                         viewModel.seo2ItemNumber(itemNumbers);
                    //                         viewModel.seo2ItemUrl(itemUrls);
                    //                         viewModel.seo2ImageSmallUrl(smallImageUrls);
                    //                         viewModel.seo2ImageLargeUrl(largeImageUrls);
                    //                         viewModel.seo2ImageDescription(imageDescriptions);
                    //
                    //                         viewModel.seo2cta(seo2cta);
                    //                         viewModel.seo2ctaUrl(seo2ctaUrl);
                    //                         viewModel.seo2ctaDescription(seo2ctaDescription);
                    //                     break
                    //                 }
                    //             }
                    //         })
                    //     })
                    // }
                }
            },
            update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                var el = document.getElementById('sortableContainer');
                var sortable = new Sortable(el, {
                    // group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
                    sort: true,  // sorting inside list
                    delay: 0, // time in milliseconds to define when the sorting should start
                    animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
                    handle: ".draggable",  // Drag handle selector within list items
                    ghostClass: "sortable-ghost",  // Class name for the drop placeholder
                    dataIdAttr: 'data-id',
                    // // dragging started
                    onStart: function (evt) {
                        var elements = document.querySelectorAll('.active');
                        elements.forEach((el, index) => {
                            el.className = el.className.replace("active", "");
                        })
                    },
                    // // dragging ended
                    onEnd: function (/**Event*/evt) {
                        //var oldIndex = evt.oldIndex;  // element's old index within parent
                        //var newIndex = evt.newIndex;  // element's new index within parent
                        var order = sortable.toArray();
                        ko.dataFor(evt.item).params.data.uniqueIdModified(order);
                        ko.dataFor(evt.item).params.data.sortMappingOrder();
                    }
                });
                var uniqueId = viewModel.uniqueId;
                var alphaChar = viewModel.alpha.charAt(viewModel.accordionIndex());
                var moduleType = bindingContext.$parent;
                viewModel.moduleType(bindingContext.$parent);

                viewModel.params.data.mappingOrder[uniqueId] = {};
                viewModel.params.data.mappingOrder[uniqueId][alphaChar] = {};
                viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType] = {};

                switch (moduleType) {
                    case 'large-feature-module':
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                            {
                                'item': viewModel.itemNumber(),
                                'displayModuleOn': viewModel.selectedModuleScreenSize(),
                                'image': {
                                    'customImage': {
                                        "small": viewModel.imageSmallUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                        "large": viewModel.imageLargeUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                    },
                                    'link': viewModel.itemUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.imageDescription()
                                },
                                'headline': {
                                    'text': viewModel.headline().replace(/é/g, "&#233;"),
                                    'link': viewModel.headlineUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.headlineDescription()
                                },
                                'cta': {
                                    'text': viewModel.cta().replace(/é/g, "&#233;"),
                                    'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.ctaDescription()
                                }
                            }
                        ]
                    break;
                    case 'small-feature-module':
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                            {
                                'item': viewModel.itemNumber(),
                                'displayModuleOn': viewModel.selectedModuleScreenSize(),
                                'section': {
                                    'text': viewModel.section().replace(/é/g, "&#233;"),
                                    'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.sectionDescription()
                                },
                                'image': {
                                    'customImage': {
                                        "small": viewModel.imageSmallUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                        "large": viewModel.imageLargeUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                    },
                                    'link': viewModel.itemUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.imageDescription()
                                },
                                'headline': {
                                    'text': viewModel.headline().replace(/é/g, "&#233;"),
                                    'link': viewModel.headlineUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.headlineDescription()
                                },
                                'cta': {
                                    'text': viewModel.cta().replace(/é/g, "&#233;"),
                                    'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.ctaDescription()
                                }
                            }
                        ]
                    break;
                    case 'basic-story-module':
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                            {
                                'item': viewModel.itemNumber(),
                                'displayModuleOn': viewModel.selectedModuleScreenSize(),
                                'section': {
                                    'text': viewModel.section().replace(/é/g, "&#233;"),
                                    'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.sectionDescription()
                                },
                                'image': {
                                    'customImage': {
                                        "small": viewModel.imageSmallUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                        "large": viewModel.imageLargeUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                    },
                                    'link': viewModel.itemUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.imageDescription()
                                },
                                'headline': {
                                    'text': viewModel.headline().replace(/é/g, "&#233;"),
                                    'link': viewModel.headlineUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.headlineDescription()
                                },
                                'cta': {
                                    'text': viewModel.cta().replace(/é/g, "&#233;"),
                                    'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.ctaDescription()
                                }
                            }
                        ]
                    break;
                    case 'extended-story-module':
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                            {
                                'item': viewModel.itemNumber(),
                                'displayModuleOn': viewModel.selectedModuleScreenSize(),
                                'section': {
                                    'text': viewModel.section().replace(/é/g, "&#233;"),
                                    'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.sectionDescription()
                                },
                                'image': {
                                    'customImage': {
                                        "small": viewModel.imageSmallUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                        "large": viewModel.imageLargeUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                    },
                                    'link': viewModel.itemUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.imageDescription()
                                },
                                'headline': {
                                    'text': viewModel.headline().replace(/é/g, "&#233;"),
                                    'link': viewModel.headlineUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.headlineDescription()
                                },
                                'copy': {
                                    'text': viewModel.copy().replace(/é/g, "&#233;"),
                                    'link': viewModel.copyUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.copyDescription()
                                },
                                'cta': {
                                    'text': viewModel.cta().replace(/é/g, "&#233;"),
                                    'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.ctaDescription()
                                }
                            }
                        ]
                    break;
                    case 'collection-grid-module':
                        var itemsList = viewModel.itemNumber().replace(/\n/g, ',').split(',');
                        var itemsUrlList = viewModel.itemUrl().replace(/\n/g, ',').split(',');
                        var smallImageList = viewModel.imageSmallUrl().replace(/\n/g, ',').split(',');
                        var largeImageList = viewModel.imageLargeUrl().replace(/\n/g, ',').split(',');
                        var imageDescriptionList = viewModel.imageDescription().replace(/\n/g, ',').split(',');

                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['headline'] = {
                            'text': viewModel.headline().replace(/é/g, "&#233;"),
                            'link': viewModel.headlineUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.headlineDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['cta'] = {
                            'text': viewModel.cta().replace(/é/g, "&#233;"),
                            'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.ctaDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['displayModuleOn'] = viewModel.selectedModuleScreenSize(),
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = []
                        itemsList.forEach((item, index) => {
                            if (item != '') {
                                viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'].push(
                                    {
                                        'item': item.trim(),
                                        'image': {
                                            'customImage': {
                                                'small': smallImageList[index] === undefined ? '' : smallImageList[index].replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                                'large': largeImageList[index] === undefined ? '' : largeImageList[index].replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                            },
                                            'link': itemsUrlList[index] === undefined ? '' : itemsUrlList[index].replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                            'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                        }
                                    }
                                )
                            }
                        })
                    break;
                    case 'carousel-module':
                        var itemsList = viewModel.itemNumber().replace(/\n/g, ',').split(',');
                        var itemsUrlList = viewModel.itemUrl().replace(/\n/g, ',').split(',');
                        var smallImageList = viewModel.imageSmallUrl().replace(/\n/g, ',').split(',');
                        var largeImageList = viewModel.imageLargeUrl().replace(/\n/g, ',').split(',');
                        var imageDescriptionList = viewModel.imageDescription().replace(/\n/g, ',').split(',');

                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['headline'] = {
                            'text': viewModel.headline().replace(/é/g, "&#233;"),
                            'link': viewModel.headlineUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.headlineDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['cta'] = {
                            'text': viewModel.cta().replace(/é/g, "&#233;"),
                            'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.ctaDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['displayModuleOn'] = viewModel.selectedModuleScreenSize(),
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = []
                        itemsList.forEach((item, index) => {
                            if (item != '') {
                                viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'].push(
                                    {
                                        'item': item.trim(),
                                        'image': {
                                            'customImage': {
                                                'small': smallImageList[index] === undefined ? '' : smallImageList[index].replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                                'large': largeImageList[index] === undefined ? '' : largeImageList[index].replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                            },
                                            'link': itemsUrlList[index] === undefined ? '' : itemsUrlList[index].replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                            'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                        }
                                    }
                                )
                            }
                        })
                    break;
                    case 'text-link-module':
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                            {
                                'item': viewModel.itemNumber(),
                                'displayModuleOn': viewModel.selectedModuleScreenSize(),
                                'image': {
                                    'customImage': {
                                        "small": viewModel.imageSmallUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                        "large": viewModel.imageLargeUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                    },
                                    'link': viewModel.itemUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.imageDescription()
                                },
                                'cta': {
                                    'text': viewModel.cta().replace(/é/g, "&#233;"),
                                    'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.ctaDescription()
                                }
                            }
                        ]
                    break;
                    case 'image-link-double-module':
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                            {
                                'item': viewModel.itemNumber(),
                                'displayModuleOn': viewModel.selectedModuleScreenSize(),
                                'image': {
                                    'customImage': {
                                        "small": viewModel.imageSmallUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                        "large": viewModel.imageLargeUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                    },
                                    'link': viewModel.itemUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.imageDescription()
                                },
                                'cta': {
                                    'text': viewModel.cta().replace(/é/g, "&#233;"),
                                    'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.ctaDescription()
                                }
                            }
                        ]
                    break;
                    case 'button-link-double-module':
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                            {
                                'item': viewModel.itemNumber(),
                                'displayModuleOn': viewModel.selectedModuleScreenSize(),
                                'image': {
                                    'customImage': {
                                        "small": viewModel.imageSmallUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                        "large": viewModel.imageLargeUrl().replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                    },
                                    'link': viewModel.itemUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.imageDescription()
                                },
                                'cta': {
                                    'text': viewModel.cta().replace(/é/g, "&#233;"),
                                    'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                    'description': viewModel.ctaDescription()
                                }
                            }
                        ]
                    break;
                    case 'seo-link-module':
                        var seo1ctaList = viewModel.seo1cta().replace(/\n/g, ',').split(',');
                        var seo1ctaUrlList = viewModel.seo1ctaUrl().replace(/\n/g, ',').split(',');
                        var seo1ctaDescriptionList = viewModel.seo1ctaDescription().replace(/\n/g, ',').split(',');

                        var seo2ItemsList = viewModel.seo2ItemNumber().replace(/\n/g, ',').split(',');
                        var seo2ItemsUrlList = viewModel.seo2ItemUrl().replace(/\n/g, ',').split(',');
                        var seo2SmallImageList = viewModel.seo2ImageSmallUrl().replace(/\n/g, ',').split(',');
                        var seo2LargeImageList = viewModel.seo2ImageLargeUrl().replace(/\n/g, ',').split(',');
                        var seo2ImageDescriptionList = viewModel.seo2ImageDescription().replace(/\n/g, ',').split(',');
                        var seo2ctaList = viewModel.seo2cta().replace(/\n/g, ',').split(',');
                        var seo2ctaUrlList = viewModel.seo2ctaUrl().replace(/\n/g, ',').split(',');
                        var seo2ctaDescriptionList = viewModel.seo2ctaDescription().replace(/\n/g, ',').split(',');

                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['seo1'] = {}
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['seo1']['section'] = {
                            'text': viewModel.seo1Section().replace(/é/g, "&#233;"),
                            'link': viewModel.seo1SectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.seo1SectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['seo1']['sections'] = []
                        seo1ctaList.forEach((item, index) => {
                            if (item != '') {
                                viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['seo1']['sections'].push(
                                    {
                                        'cta': {
                                            'text': item.trim(),
                                            'link': seo1ctaUrlList[index] === undefined ? '' : seo1ctaUrlList[index].replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                            'description': seo1ctaDescriptionList[index] === undefined ? '' : seo1ctaDescriptionList[index]
                                        }
                                    }
                                )
                            }
                        })

                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['seo2'] = {}
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['seo2']['section'] = {
                            'text': viewModel.seo2Section().replace(/é/g, "&#233;"),
                            'link': viewModel.seo2SectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.seo2SectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['seo2']['sections'] = []
                        seo2ItemsList.forEach((item, index) => {
                            if (item != '') {
                                viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['seo2']['sections'].push(
                                    {
                                        'item': item.trim(),
                                        'image': {
                                            'customImage': {
                                                'small': seo2SmallImageList[index] === undefined ? '' : seo2SmallImageList[index].replace(/http:\/\/www.uncommongoods.com/g, "").trim(),
                                                'large': seo2LargeImageList[index] === undefined ? '' : seo2LargeImageList[index].replace(/http:\/\/www.uncommongoods.com/g, "").trim()
                                            },
                                            'link': seo2ItemsUrlList[index] === undefined ? '' : seo2ItemsUrlList[index].replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                            'description': seo2ImageDescriptionList[index] === undefined ? '' : seo2ImageDescriptionList[index]
                                        },
                                        'cta': {
                                            'text': seo2ctaList[index] === undefined ? '' : seo2ctaList[index].replace(/é/g, "&#233;").trim(),
                                            'link': seo2ctaUrlList[index] === undefined ? '' : seo2ctaUrlList[index].replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                                            'description': seo2ctaDescriptionList[index] === undefined ? '' : seo2ctaDescriptionList[index]
                                        }
                                    }
                                )
                            }
                        })
                    break;
                }
            }
        };
    }
}

ko.components.register('large-feature-module', {
    viewModel: class LargeFeatureModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Large Feature Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Item #</label>
                                        <input data-bind="textInput: itemNumber" type="number" placeholder="Item #"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Item URL</label>
                                        <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Display Module On</label>
                                        <select data-bind="options: screenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <input data-bind="textInput: imageSmallUrl" type="text" placeholder="Small Image URL"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <input data-bind="textInput: imageLargeUrl" type="text" placeholder="Large Image URL"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <input data-bind="textInput: imageDescription" type="text" placeholder="Image Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline</label>
                                        <input data-bind="textInput: headline" type="text" placeholder="Headline">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline URL</label>
                                        <input data-bind="textInput: headlineUrl" type="text" placeholder="Headline URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline Description Tag</label>
                                        <input data-bind="textInput: headlineDescription" type="text" placeholder="Headline Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <input data-bind="textInput: cta" type="text" placeholder="CTA">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <input data-bind="textInput: ctaUrl" type="text" placeholder="CTA URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <input data-bind="textInput: ctaDescription" type="text" placeholder="CTA Description Tag"></input>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div
        </div>`, synchronous: true
});

ko.components.register('small-feature-module', {
    viewModel: class SmallFeatureModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Small Feature Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Item #</label>
                                        <input data-bind="textInput: itemNumber" type="text" placeholder="Item #">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Item URL</label>
                                        <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Display Module On</label>
                                        <select data-bind="options: screenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <input data-bind="textInput: imageSmallUrl" type="text" placeholder="Small Image URL"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <input data-bind="textInput: imageLargeUrl" type="text" placeholder="Large Image URL"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <input data-bind="textInput: imageDescription" type="text" placeholder="Image Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: sectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: sectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline</label>
                                        <input data-bind="textInput: headline" type="text" placeholder="Headline">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline URL</label>
                                        <input data-bind="textInput: headlineUrl" type="text" placeholder="Headline URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline Description Tag</label>
                                        <input data-bind="textInput: headlineDescription" type="text" placeholder="Headline Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <input data-bind="textInput: cta" type="text" placeholder="CTA">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <input data-bind="textInput: ctaUrl" type="text" placeholder="CTA URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <input data-bind="textInput: ctaDescription" type="text" placeholder="CTA Description Tag"></input>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div>
        </div>`, synchronous: true
});

ko.components.register('basic-story-module', {
    viewModel: class BasicStoryModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Basic Story Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Item #</label>
                                        <input data-bind="textInput: itemNumber" type="text" placeholder="Item #">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Item URL</label>
                                        <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Display Module On</label>
                                        <select data-bind="options: screenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <input data-bind="textInput: imageSmallUrl" type="text" placeholder="Small Image URL"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <input data-bind="textInput: imageLargeUrl" type="text" placeholder="Large Image URL"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <input data-bind="textInput: imageDescription" type="text" placeholder="Image Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: sectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: sectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline</label>
                                        <input data-bind="textInput: headline" type="text" placeholder="Headline">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline URL</label>
                                        <input data-bind="textInput: headlineUrl" type="text" placeholder="Headline URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline Description Tag</label>
                                        <input data-bind="textInput: headlineDescription" type="text" placeholder="Headline Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <input data-bind="textInput: cta" type="text" placeholder="CTA">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <input data-bind="textInput: ctaUrl" type="text" placeholder="CTA URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <input data-bind="textInput: ctaDescription" type="text" placeholder="CTA Description Tag"></input>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div
        </div>`, synchronous: true
});

ko.components.register('extended-story-module', {
    viewModel: class ExtendedStoryModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Extended Story Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Item #</label>
                                        <input data-bind="textInput: itemNumber" type="text" placeholder="Item #">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Item URL</label>
                                        <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Display Module On</label>
                                        <select data-bind="options: screenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <input data-bind="textInput: imageSmallUrl" type="text" placeholder="Small Image URL"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <input data-bind="textInput: imageLargeUrl" type="text" placeholder="Large Image URL"></input>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <input data-bind="textInput: imageDescription" type="text" placeholder="Image Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: sectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: sectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline</label>
                                        <input data-bind="textInput: headline" type="text" placeholder="Headline">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline URL</label>
                                        <input data-bind="textInput: headlineUrl" type="text" placeholder="Headline URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline Description Tag</label>
                                        <input data-bind="textInput: headlineDescription" type="text" placeholder="Headline Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Copy</label>
                                        <textarea rows="6" type="text" placeholder="Copy" data-bind="textInput: copy"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Copy URL</label>
                                        <input data-bind="textInput: copyUrl" type="text" placeholder="Copy URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Copy Description Tag</label>
                                        <input data-bind="textInput: copyDescription" type="text" placeholder="Copy Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <input data-bind="textInput: cta" type="text" placeholder="CTA">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <input data-bind="textInput: ctaUrl" type="text" placeholder="CTA URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <input data-bind="textInput: ctaDescription" type="text" placeholder="CTA Description Tag"></input>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div>
        </div>`, synchronous: true
});

ko.components.register('collection-grid-module', {
    viewModel: class CollectionGridModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Collection Grid Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Item #</label>
                                        <textarea rows="6" type="text" placeholder="Item #" data-bind="textInput: itemNumber"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Item URL</label>
                                        <textarea rows="6" type="text" placeholder="Item URL" data-bind="textInput: itemUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Display Module On</label>
                                        <select data-bind="options: screenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <textarea rows="6" type="text" placeholder="Small Image URL" data-bind="textInput: imageSmallUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <textarea rows="6" type="text" placeholder="Large Image URL" data-bind="textInput: imageLargeUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <textarea rows="6" type="text" placeholder="Image Description Tag" data-bind="textInput: imageDescription"></textarea>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: sectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: sectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline</label>
                                        <input data-bind="textInput: headline" type="text" placeholder="Headline">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline URL</label>
                                        <input data-bind="textInput: headlineUrl" type="text" placeholder="Headline URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline Description Tag</label>
                                        <input data-bind="textInput: headlineDescription" type="text" placeholder="Headline Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <input data-bind="textInput: cta" type="text" placeholder="CTA">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <input data-bind="textInput: ctaUrl" type="text" placeholder="CTA URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <input data-bind="textInput: ctaDescription" type="text" placeholder="CTA Description Tag"></input>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div>
        </div>`, synchronous: true
});

ko.components.register('carousel-module', {
    viewModel: class CarouselModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Carousel Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Item #</label>
                                        <textarea rows="6" type="text" placeholder="Item #" data-bind="textInput: itemNumber"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Item URL</label>
                                        <textarea rows="6" type="text" placeholder="Item URL" data-bind="textInput: itemUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Display Module On</label>
                                        <select data-bind="options: screenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <textarea rows="6" type="text" placeholder="Small Image URL" data-bind="textInput: imageSmallUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <textarea rows="6" type="text" placeholder="Large Image URL" data-bind="textInput: imageLargeUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <textarea rows="6" type="text" placeholder="Image Description Tag" data-bind="textInput: imageDescription"></textarea>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: sectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: sectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline</label>
                                        <input data-bind="textInput: headline" type="text" placeholder="Headline">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline URL</label>
                                        <input data-bind="textInput: headlineUrl" type="text" placeholder="Headline URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Headline Description Tag</label>
                                        <input data-bind="textInput: headlineDescription" type="text" placeholder="Headline Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <input data-bind="textInput: cta" type="text" placeholder="CTA">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <input data-bind="textInput: ctaUrl" type="text" placeholder="CTA URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <input data-bind="textInput: ctaDescription" type="text" placeholder="CTA Description Tag"></input>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div>
        </div>`, synchronous: true
});

ko.components.register('text-link-module', {
    viewModel: class TextLinkModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Text Link Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: sectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: sectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Item #</label>
                                        <input data-bind="textInput: itemNumber" type="text" placeholder="Item #">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Item URL</label>
                                        <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Display Module On</label>
                                        <select data-bind="options: screenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <input data-bind="textInput: imageSmallUrl" type="text" placeholder="Small Image URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <input data-bind="textInput: imageLargeUrl" type="text" placeholder="Large Image URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <input data-bind="textInput: imageDescription" type="text" placeholder="Image Description Tag">
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <input data-bind="textInput: cta" type="text" placeholder="CTA">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <input data-bind="textInput: ctaUrl" type="text" placeholder="CTA URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <input data-bind="textInput: ctaDescription" type="text" placeholder="CTA Description Tag">
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div>
        </div>`, synchronous: true
});

ko.components.register('image-link-double-module', {
    viewModel: class ImageLinkDoubleModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Image Link Double Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: sectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: sectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Item #</label>
                                        <input data-bind="textInput: itemNumber" type="text" placeholder="Item #">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Item URL</label>
                                        <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Display Module On</label>
                                        <select data-bind="options: screenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <input data-bind="textInput: imageSmallUrl" type="text" placeholder="Small Image URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <input data-bind="textInput: imageLargeUrl" type="text" placeholder="Large Image URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <input data-bind="textInput: imageDescription" type="text" placeholder="Image Description Tag">
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <input data-bind="textInput: cta" type="text" placeholder="CTA">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <input data-bind="textInput: ctaUrl" type="text" placeholder="CTA URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <input data-bind="textInput: ctaDescription" type="text" placeholder="CTA Description Tag">
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div>
        </div>`, synchronous: true
});

ko.components.register('button-link-double-module', {
    viewModel: class ButtonLinkDoubleModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Button Link Double Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: sectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: sectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Item #</label>
                                        <input data-bind="textInput: itemNumber" type="text" placeholder="Item #">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Item URL</label>
                                        <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Display Module On</label>
                                        <select data-bind="options: screenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <input data-bind="textInput: imageSmallUrl" type="text" placeholder="Small Image URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <input data-bind="textInput: imageLargeUrl" type="text" placeholder="Large Image URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <input data-bind="textInput: imageDescription" type="text" placeholder="Image Description Tag">
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <input data-bind="textInput: cta" type="text" placeholder="CTA">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <input data-bind="textInput: ctaUrl" type="text" placeholder="CTA URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <input data-bind="textInput: ctaDescription" type="text" placeholder="CTA Description Tag">
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div>
        </div>`, synchronous: true
});

ko.components.register('seo-link-module', {
    viewModel: class SeoLinkModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row module" data-bind="attr: { 'data-id': uniqueId, id: uniqueId }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'SEO Links Module', attr: { href: '#accordion'+uniqueId, id: 'accordion-heading'+uniqueId, role: 'tab' }" class="draggable"></a>

                            <div data-bind="sortable: uniqueId, attr: { id: 'accordion'+uniqueId, 'aria-labelledby': 'accordion-heading'+uniqueId, role: 'tabpanel' }" class="content">
                                <div class="row">
                                    <div class="small-12 columns">
                                        <h3>TL SEO 1</h3>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: seo1Section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: seo1SectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: seo1SectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <textarea rows="4" type="text" placeholder="CTA" data-bind="textInput: seo1cta"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <textarea rows="4" type="text" placeholder="CTA URL" data-bind="textInput: seo1ctaUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <textarea rows="4" type="text" placeholder="CTA Description Tag" data-bind="textInput: seo1ctaDescription"></textarea>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 columns">
                                        <h3>LD SEO 2</h3>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Section</label>
                                        <input data-bind="textInput: seo2Section" type="text" placeholder="Section">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section URL</label>
                                        <input data-bind="textInput: seo2SectionUrl" type="text" placeholder="Section URL">
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Section Description Tag</label>
                                        <input data-bind="textInput: seo2SectionDescription" type="text" placeholder="Section Description Tag"></input>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-6 columns">
                                        <label>Item #</label>
                                        <textarea rows="6" type="text" placeholder="Item #" data-bind="textInput: seo2ItemNumber"></textarea>
                                    </div>
                                    <div class="small-12 medium-6 columns">
                                        <label>Item URL</label>
                                        <textarea rows="6" type="text" placeholder="Item URL" data-bind="textInput: seo2ItemUrl"></textarea>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>Small Image URL</label>
                                        <textarea rows="6" type="text" placeholder="Small Image URL" data-bind="textInput: seo2ImageSmallUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Large Image URL</label>
                                        <textarea rows="6" type="text" placeholder="Large Image URL" data-bind="textInput: seo2ImageLargeUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>Image Description Tag</label>
                                        <textarea rows="6" type="text" placeholder="Image Description Tag" data-bind="textInput: seo2ImageDescription"></textarea>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA</label>
                                        <textarea rows="6" type="text" placeholder="CTA" data-bind="textInput: seo2cta"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA URL</label>
                                        <textarea rows="6" type="text" placeholder="CTA URLL" data-bind="textInput: seo2ctaUrl"></textarea>
                                    </div>
                                    <div class="small-12 medium-4 columns">
                                        <label>CTA Description Tag</label>
                                        <textarea rows="6" type="text" placeholder="CTA Description Tag" data-bind="textInput: seo2ctaDescription"></textarea>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>

                <div class="small-1 text-center columns removeModule">
                    <i class="fa fa-times fa-3" aria-hidden="true" data-bind="event:{ click: removeModule }"></i>
                </div>
            </div>
        </div>`, synchronous: true
});

function reducerFilter(acc, xs) {
  xs.map((item, index) => {
      if (xs[index] === xs[index+1]) {
          if (xs[index] === 'collection-grid-module' || xs[index] === 'carousel-module') {
              acc.push(item);
          } else {
              acc.push('concat');
          }
      } else {
          acc.push(item);
      }
  })
  // console.log('acc ',acc);
  return acc;
}

// TODO: refactor accordionIndex and see if i need selectedModules for anyhting other than rendering modules
ko.components.register('homePageTool', {
    viewModel: class HomePageToolComponentModel extends Dependents {
      constructor(params) {
          super(params);
          this.selection = ko.observable();
          this.selectedModules = ko.observableArray();
          this.date = ko.observable();
          this.moduleTypes = [
              {name: 'Large Feature (LF)', value: 'large-feature-module'},
              {name: 'Small Feature (SF)', value: 'small-feature-module'},
              {name: 'Basic Story (BS)', value: 'basic-story-module'},
              {name: 'Extended Story (ES)', value: 'extended-story-module'},
              {name: 'Collection Grid (CG)', value: 'collection-grid-module'},
              {name: 'Carousel (CL)', value: 'carousel-module'},
              {name: 'Text Link (TL)', value: 'text-link-module'},
              {name: 'Image Link Double (LD)', value: 'image-link-double-module'},
              {name: 'Button Link Double (BD)', value: 'button-link-double-module'},
              {name: 'SEO Links (SEO)', value: 'seo-link-module'}
          ];
          this.jsonOrder = function(arry) {
              var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
              var hpJson = {};
              var hpDate = this.date();

              arry.forEach((obj, index) => {
                  hpJson[alpha.charAt(index)] = obj;
              })

              $.ajax({
                  type: "POST",
                  url: "http://localhost:5000/hp_config",
                  data: formToJSON(),
                  dataType: "json",
                  success: function() {
                     window.open('http://localhost:9000/simulator/?date='+hpDate, '_blank');
                  }
              }).done(function(msg) {
                  console.log("Data Saved: " + msg);
              });

              function formToJSON() {
                  return {
                      "json": hpJson,
                      "date": hpDate
                  };
              }
          }
          this.createModule = function (e) {
              if (this.selection()) {
                  this.selectedModules.push(this.selection());
              }
          }
          this.previewHomepage = function(e) {
              //console.log('preview click ',this.mappingOrder);
              var mappingOrderCopy = JSON.parse(JSON.stringify(this.mappingOrder));
              var cleanJson = {};
              var duplicateModuleNames = [];
              var duplicateObjects = [];
              var concatArray = [];
              var orderedJson = {};

              //removes uniqueIds
              Object.keys(mappingOrderCopy).forEach(function(key) {
                 Object.assign(cleanJson, mappingOrderCopy[key]);
              });


              Object.keys(cleanJson).sort().forEach(function(key,index) {
                  orderedJson[key] = cleanJson[key];
              });

              Object.keys(orderedJson).forEach(function(key,index) {
                  duplicateModuleNames.push(Object.keys(orderedJson[key])[0]);
                  duplicateObjects.push(orderedJson[key]);

              });

              var adjecentCombine = reducerFilter([],duplicateModuleNames);

              adjecentCombine.forEach((el,index) => {
                  var moduleType = Object.keys(duplicateObjects[index])[0];
                  if (el === 'concat') {
                      duplicateObjects[index+1][moduleType].sections = duplicateObjects[index][moduleType].sections.concat(duplicateObjects[index+1][moduleType].sections);
                      duplicateObjects.splice(index,1,'');
                  }
              })

              duplicateObjects = duplicateObjects.filter(function(n){ return n != '' });
              console.log('duplicateObjects ',duplicateObjects)
              this.jsonOrder(duplicateObjects);
          }
          this.reRender = function renderLoadedJson() {
              this.selectedModules.removeAll();
              counter = 0;
              Object.keys(mappingOrder).forEach((letter, i) => {
                  Object.keys(mappingOrder[letter]).forEach((module, index) => {

                      if (module != 'collection-grid-module' || module != 'carousel-module') {
                          counter += mappingOrder[letter][module]['sections'].length;
                      } else {
                          counter += 1
                      }


                      switch (module) {
                          case 'large-feature-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             sectionsArry.forEach((el,index) => {
                                this.selectedModules.push(module);
                            })
                          break
                          case 'small-feature-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             sectionsArry.forEach((el,index) => {
                                this.selectedModules.push(module);
                            })
                          break
                          case 'basic-story-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             sectionsArry.forEach((el,index) => {
                                this.selectedModules.push(module);
                            })
                          break
                          case 'extended-story-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             sectionsArry.forEach((el,index) => {
                                this.selectedModules.push(module);
                            })
                          break
                          case 'collection-grid-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             this.selectedModules.push(module);
                          break
                          case 'carousel-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             this.selectedModules.push(module);
                          break
                          case 'text-link-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             sectionsArry.forEach((el,index) => {
                                this.selectedModules.push(module);
                            })
                          break
                          case 'image-link-double-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             sectionsArry.forEach((el,index) => {
                                this.selectedModules.push(module);
                            })
                          break
                          case 'button-link-double-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             sectionsArry.forEach((el,index) => {
                                this.selectedModules.push(module);
                            })
                          break
                          case 'seo-link-module':
                             var sectionsArry = mappingOrder[letter][module].sections;
                             this.selectedModules.push(module);
                          break
                     }
                  })
              })
          };
          this.loadHomePage = function(e) {
              var loadDate = this.date();
              var self = this;
              $.ajax({
                  type: "GET",
                  url: "http://localhost:5000/hp_config/"+loadDate+".js",
                  success: function(data) {

                     var clearModules = [];
                     clearModules = Array.from(document.getElementById('sortableContainer').querySelectorAll('.module'));
                     clearModules.forEach((el, index)=> {
                         ko.removeNode(el);
                         delete self.mappingOrder[el.getAttribute('id')];
                     })
                     self.reRender();
                  }
              })
          }
          this.createNewHomePage = function(e) {
              window.location.reload();
          }
          ko.bindingHandlers.datepicker = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                var d = new Date();
                d.setHours(0, -d.getTimezoneOffset(), 0, 0); //removing the timezone offset.
                viewModel.date(d.toISOString().slice(0,10));

                $(function () {
                    $('#dp1').fdatepicker({
                        initialDate: 'yyyy-mm-dd',
                        format: 'yyyy-mm-dd',
                        disableDblClickSelection: true
                    }).on('changeDate', function (ev) {
                        viewModel.date(ev.date.toISOString().slice(0,10));
                    })
                })
            }
        }
      }
    },
    template: `
        <div class='row'>
            <div class='small-12 columns'>
                <h2>Create Home Page Tool</h2>
            </div>
        </div>

        <div class="row" style="max-width:200px; margin: 0;">
            <div class="small-2 columns" style="padding-right: 0;">
                <span class="prefix"><i class="fa fa-calendar" style="line-height: inherit;"></i></span>
            </div>
            <div class="small-10 columns" style="padding-left: 0;">
                <input type="text" class="span2" id="dp1" data-bind="datepicker">
            </div>
        </div>

        <div class="row">
            <div class="small-12 columns">
                <button data-bind="event:{ click: createNewHomePage }">Create New Home Page</button>
                <button data-bind="event:{ click: loadHomePage }">Load Home Page</button>
                <button data-bind="event:{ click: previewHomepage }">Preview Home Page</button>
            </div>

            <div class="small-4 columns">
                <select data-bind="options: moduleTypes, value: selection ,optionsText: 'name', optionsValue: 'value', optionsCaption: 'Choose Module Type'"></select>
            </div>

            <div class="small-8 columns end">
                <button data-bind="event:{ click: createModule }">Create Module</button>
            </div>
        </div>

        <div data-bind="foreach: selectedModules()" id="sortableContainer">
            <!-- ko component: {name: $data, params: { data: $parent } } --><!-- /ko -->
        </div>`, synchronous: true
});
// .extend({ deferred: true })

//ko.options.deferUpdates = true;
ko.applyBindings();
