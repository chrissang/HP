var mappingOrder = {};
var initViewModels = [];
var load = false;
var counter = 0;

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
        this.selectedModuleScreenSize = ko.observable('small');

        this.alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.mappingOrder = {};
        this.uniqueIdModified = ko.observable("");
        this.uniqueId = new Date().getTime();
        this.sortMappingOrder = function() {
            var uniqueIdReordered = this.uniqueIdModified();
            uniqueIdReordered.forEach((el,index) => {
                var alphaChar = this.alpha.charAt(index);

                if (Object.keys(this.mappingOrder[el])[0] != index) {
                    var jsonString = JSON.stringify(this.mappingOrder[el]);
                    var replaceVal = Object.keys(this.mappingOrder[el])[0];
                    jsonString = jsonString.replace(RegExp(replaceVal), index);
                    this.mappingOrder[el] = JSON.parse(jsonString);
                }
            });

            var mappingOrderCopy = this.mappingOrder;
            var removedUniqueIdJson = {};
            var tempArry = [];

            Object.keys(mappingOrderCopy).forEach(function(key) {
                Object.assign(removedUniqueIdJson, mappingOrderCopy[key]);
            })
            Object.keys(removedUniqueIdJson).forEach(function(key,index) {
                tempArry.push(Object.keys(removedUniqueIdJson[key])[0])
            });
        }
        this.removeModule = function(e) {
          var container = document.getElementById('uniqueId-'+e.uniqueId);
          var removeIndex = this.params.data.selectedModules().indexOf(ko.contextFor(container).$parent);
          this.params.data.selectedModules().splice(removeIndex, 1)
          ko.removeNode(container);
          delete this.params.data.mappingOrder[e.uniqueId];
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

        ko.bindingHandlers.componentData = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                if (Object.keys(mappingOrder).length != 0 && load === true) {

                    viewModel.params.data.loadingModelData.push(bindingContext);

                    if (counter === viewModel.params.data.selectedModules().length) {
                        var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                        //groups modules that are the same and next to each other into array
                        var result = viewModel.params.data.loadingModelData().reduce(function(prev, curr) {
                            if (prev.length && curr.$parent === prev[prev.length - 1][0].$parent) {
                                if (curr.$parent === 'collection-grid-module' || curr.$parent === 'carousel-module' || curr.$parent === 'seo-link-module') {
                                    prev.push([curr]);
                                } else {
                                    prev[prev.length - 1].push(curr);
                                }
                            }
                            else {
                                prev.push([curr]);
                            }
                            return prev;
                        }, []);

                        result.forEach((section, index) => {
                            var alphaChar = alpha.charAt(index);
                            var moduleType = section[0].$parent;
                            section.forEach((binding,i) => {
                                switch (binding.$parent) {
                                    case 'text-link-module':
                                        binding.$data.section(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.text : '');
                                        binding.$data.sectionUrl(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.link : '');
                                        binding.$data.sectionDescription(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.description : '');

                                        binding.$data.itemNumber(!!mappingOrder[alphaChar][moduleType]['sections'][i].item ? mappingOrder[alphaChar][moduleType]['sections'][i].item : '');
                                        binding.$data.itemUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.link : '');
                                        binding.$data.selectedModuleScreenSize(!!mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn ? mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn : '');

                                        binding.$data.imageSmallUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.small : '');
                                        binding.$data.imageLargeUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.large : '');
                                        binding.$data.imageDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.description : '');

                                        binding.$data.cta(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.text : '');
                                        binding.$data.ctaUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.link : '');
                                        binding.$data.ctaDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.description : '');
                                    break;
                                    case 'image-link-double-module':
                                        binding.$data.section(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.text : '');
                                        binding.$data.sectionUrl(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.link : '');
                                        binding.$data.sectionDescription(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.description : '');

                                        binding.$data.itemNumber(!!mappingOrder[alphaChar][moduleType]['sections'][i].item ? mappingOrder[alphaChar][moduleType]['sections'][i].item : '');
                                        binding.$data.itemUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.link : '');
                                        binding.$data.selectedModuleScreenSize(!!mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn ? mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn : '');

                                        binding.$data.imageSmallUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.small : '');
                                        binding.$data.imageLargeUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.large : '');
                                        binding.$data.imageDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.description : '');

                                        binding.$data.cta(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.text : '');
                                        binding.$data.ctaUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.link : '');
                                        binding.$data.ctaDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.description : '');
                                    break;
                                    case 'button-link-double-module':
                                        binding.$data.section(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.text : '');
                                        binding.$data.sectionUrl(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.link : '');
                                        binding.$data.sectionDescription(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.description : '');

                                        binding.$data.itemNumber(!!mappingOrder[alphaChar][moduleType]['sections'][i].item ? mappingOrder[alphaChar][moduleType]['sections'][i].item : '');
                                        binding.$data.itemUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.link : '');
                                        binding.$data.selectedModuleScreenSize(!!mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn ? mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn : '');

                                        binding.$data.imageSmallUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.small : '');
                                        binding.$data.imageLargeUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.large : '');
                                        binding.$data.imageDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.description : '');

                                        binding.$data.cta(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.text : '');
                                        binding.$data.ctaUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.link : '');
                                        binding.$data.ctaDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.description : '');
                                    break;
                                    case 'collection-grid-module':
                                        binding.$data.selectedModuleScreenSize(!!mappingOrder[alphaChar][moduleType].displayModuleOn ? mappingOrder[alphaChar][moduleType].displayModuleOn : '');

                                        binding.$data.section(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.text : '');
                                        binding.$data.sectionUrl(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.link : '');
                                        binding.$data.sectionDescription(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.description : '');

                                        binding.$data.headline(!!mappingOrder[alphaChar][moduleType].headline ? mappingOrder[alphaChar][moduleType].headline.text : '');
                                        binding.$data.headlineUrl(!!mappingOrder[alphaChar][moduleType].headline ? mappingOrder[alphaChar][moduleType].headline.link : '');
                                        binding.$data.headlineDescription(!!mappingOrder[alphaChar][moduleType].headline ? mappingOrder[alphaChar][moduleType].headline.description : '');

                                        binding.$data.cta(!!mappingOrder[alphaChar][moduleType].cta ? mappingOrder[alphaChar][moduleType].cta.text : '');
                                        binding.$data.ctaUrl(!!mappingOrder[alphaChar][moduleType].cta ? mappingOrder[alphaChar][moduleType].cta.link : '');
                                        binding.$data.ctaDescription(!!mappingOrder[alphaChar][moduleType].cta ? mappingOrder[alphaChar][moduleType].cta.description : '');

                                        var itemNumbers = [];
                                        var itemUrls = [];
                                        var smallImageUrls = [];
                                        var largeImageUrls = [];
                                        var imageDescriptions = [];

                                        if (mappingOrder[alphaChar][moduleType]['sections'] != undefined) {
                                            mappingOrder[alphaChar][moduleType]['sections'].forEach((item, index) => {
                                                itemNumbers.push(item.item);
                                                itemUrls.push(item.image.link);
                                                smallImageUrls.push(item.image.customImage.small);
                                                largeImageUrls.push(item.image.customImage.large);
                                                imageDescriptions.push(item.image.description);
                                            })
                                            itemNumbers = itemNumbers.join("\n");
                                            itemUrls = itemUrls.join("\n");
                                            smallImageUrls = smallImageUrls.join("\n");
                                            largeImageUrls = largeImageUrls.join("\n");
                                            imageDescriptions = imageDescriptions.join("\n");

                                            binding.$data.itemNumber(itemNumbers ? itemNumbers : '');
                                            binding.$data.itemUrl(itemUrls ? itemUrls : '');
                                            binding.$data.imageSmallUrl(smallImageUrls ? smallImageUrls : '');
                                            binding.$data.imageLargeUrl(largeImageUrls ? largeImageUrls : '');
                                            binding.$data.imageDescription(imageDescriptions ? imageDescriptions : '');
                                        }
                                    break;
                                    case 'carousel-module':
                                        binding.$data.selectedModuleScreenSize(!!mappingOrder[alphaChar][moduleType].displayModuleOn ? mappingOrder[alphaChar][moduleType].displayModuleOn : '');

                                        binding.$data.section(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.text : '');
                                        binding.$data.sectionUrl(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.link : '');
                                        binding.$data.sectionDescription(!!mappingOrder[alphaChar][moduleType].section ? mappingOrder[alphaChar][moduleType].section.description : '');

                                        binding.$data.headline(!!mappingOrder[alphaChar][moduleType].headline ? mappingOrder[alphaChar][moduleType].headline.text : '');
                                        binding.$data.headlineUrl(!!mappingOrder[alphaChar][moduleType].headline ? mappingOrder[alphaChar][moduleType].headline.link : '');
                                        binding.$data.headlineDescription(!!mappingOrder[alphaChar][moduleType].headline ? mappingOrder[alphaChar][moduleType].headline.description : '');

                                        binding.$data.cta(!!mappingOrder[alphaChar][moduleType].cta ? mappingOrder[alphaChar][moduleType].cta.text : '');
                                        binding.$data.ctaUrl(!!mappingOrder[alphaChar][moduleType].cta ? mappingOrder[alphaChar][moduleType].cta.link : '');
                                        binding.$data.ctaDescription(!!mappingOrder[alphaChar][moduleType].cta ? mappingOrder[alphaChar][moduleType].cta.description : '');

                                        var itemNumbers = [];
                                        var itemUrls = [];
                                        var smallImageUrls = [];
                                        var largeImageUrls = [];
                                        var imageDescriptions = [];

                                        if (mappingOrder[alphaChar][moduleType]['sections'] != undefined) {
                                            mappingOrder[alphaChar][moduleType]['sections'].forEach((item, index) => {
                                                itemNumbers.push(item.item);
                                                itemUrls.push(item.image.link);
                                                smallImageUrls.push(item.image.customImage.small);
                                                largeImageUrls.push(item.image.customImage.large);
                                                imageDescriptions.push(item.image.description);
                                            })
                                            itemNumbers = itemNumbers.join("\n");
                                            itemUrls = itemUrls.join("\n");
                                            smallImageUrls = smallImageUrls.join("\n");
                                            largeImageUrls = largeImageUrls.join("\n");
                                            imageDescriptions = imageDescriptions.join("\n");

                                            binding.$data.itemNumber(itemNumbers ? itemNumbers : '');
                                            binding.$data.itemUrl(itemUrls ? itemUrls : '');
                                            binding.$data.imageSmallUrl(smallImageUrls ? smallImageUrls : '');
                                            binding.$data.imageLargeUrl(largeImageUrls ? largeImageUrls : '');
                                            binding.$data.imageDescription(imageDescriptions ? imageDescriptions : '');
                                        }
                                    break;
                                    case 'seo-link-module':
                                        binding.$data.seo1Section(!!mappingOrder[alphaChar][moduleType]['seo1'].section ? mappingOrder[alphaChar][moduleType]['seo1'].section.text : '');
                                        binding.$data.seo1SectionUrl(!!mappingOrder[alphaChar][moduleType]['seo1'].section ? mappingOrder[alphaChar][moduleType]['seo1'].section.link : '');
                                        binding.$data.seo1SectionDescription(!!mappingOrder[alphaChar][moduleType]['seo1'].section ? mappingOrder[alphaChar][moduleType]['seo1'].section.description : '');

                                        binding.$data.seo2Section(!!mappingOrder[alphaChar][moduleType]['seo2'].section ? mappingOrder[alphaChar][moduleType]['seo2'].section.text : '');
                                        binding.$data.seo2SectionUrl(!!mappingOrder[alphaChar][moduleType]['seo2'].section ? mappingOrder[alphaChar][moduleType]['seo2'].section.link : '');
                                        binding.$data.seo2SectionDescription(!!mappingOrder[alphaChar][moduleType]['seo2'].section ? mappingOrder[alphaChar][moduleType]['seo2'].section.description : '');

                                        var seo1_cta_text = [];
                                        var seo1_cta_link = [];
                                        var seo1_cta_description = [];

                                        var seo2_cta_text = [];
                                        var seo2_cta_link = [];
                                        var seo2_cta_description = [];

                                        var seo2_items = [];
                                        var seo2_items_urls = [];

                                        var seo2_small_images = [];
                                        var seo2_large_images = [];
                                        var seo2_image_descriptions = [];

                                        if (mappingOrder[alphaChar][moduleType]['seo1']['sections'] != undefined) {
                                            mappingOrder[alphaChar][moduleType]['seo1']['sections'].forEach((item, index) => {
                                                seo1_cta_text.push(item.cta.text);
                                                seo1_cta_link.push(item.cta.link);
                                                seo1_cta_description.push(item.cta.description);
                                            });
                                        }

                                        if (mappingOrder[alphaChar][moduleType]['seo2']['sections'] != undefined) {
                                            mappingOrder[alphaChar][moduleType]['seo2']['sections'].forEach((item, index) => {
                                                seo2_cta_text.push(item.cta.text);
                                                seo2_cta_link.push(item.cta.link);
                                                seo2_cta_description.push(item.cta.description);
                                                seo2_items.push(item.item);
                                                seo2_items_urls.push(item.image.link);
                                                seo2_small_images.push(item.image.customImage.small);
                                                seo2_large_images.push(item.image.customImage.large);
                                                seo2_image_descriptions.push(item.image.description);
                                            });
                                        }

                                        seo1_cta_text = seo1_cta_text.join("\n");
                                        seo1_cta_link = seo1_cta_link.join("\n");
                                        seo1_cta_description = seo1_cta_description.join("\n");

                                        seo2_cta_text = seo2_cta_text.join("\n");
                                        seo2_cta_link = seo2_cta_link.join("\n");
                                        seo2_cta_description = seo2_cta_description.join("\n");

                                        seo2_items = seo2_items.join("\n");
                                        seo2_items_urls = seo2_items_urls.join("\n");

                                        seo2_small_images = seo2_small_images.join("\n");
                                        seo2_large_images = seo2_large_images.join("\n");
                                        seo2_image_descriptions = seo2_image_descriptions.join("\n");

                                        binding.$data.seo1cta(seo1_cta_text ? seo1_cta_text : '');
                                        binding.$data.seo1ctaUrl(seo1_cta_link ? seo1_cta_link : '');
                                        binding.$data.seo1ctaDescription(seo1_cta_description ? seo1_cta_description : '');

                                        binding.$data.seo2cta(seo2_cta_text ? seo2_cta_text : '');
                                        binding.$data.seo2ctaUrl(seo2_cta_link ? seo2_cta_link : '');
                                        binding.$data.seo2ctaDescription(seo2_cta_description ? seo2_cta_description : '');

                                        binding.$data.seo2ItemNumber(seo2_items ? seo2_items : '');
                                        binding.$data.seo2ItemUrl(seo2_items_urls ? seo2_items_urls : '');

                                        binding.$data.seo2ImageSmallUrl(seo2_small_images ? seo2_small_images : '');
                                        binding.$data.seo2ImageLargeUrl(seo2_large_images ? seo2_large_images : '');
                                        binding.$data.seo2ImageDescription(seo2_image_descriptions ? seo2_image_descriptions : '');
                                    break;
                                    default:
                                        binding.$data.section(!!mappingOrder[alphaChar][moduleType]['sections'][i].section ? mappingOrder[alphaChar][moduleType]['sections'][i].section.text : '');
                                        binding.$data.sectionUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].section ? mappingOrder[alphaChar][moduleType]['sections'][i].section.link : '');
                                        binding.$data.sectionDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].section ? mappingOrder[alphaChar][moduleType]['sections'][i].section.description : '');

                                        binding.$data.itemNumber(!!mappingOrder[alphaChar][moduleType]['sections'][i].item ? mappingOrder[alphaChar][moduleType]['sections'][i].item : '');
                                        binding.$data.itemUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.link : '');
                                        binding.$data.selectedModuleScreenSize(!!mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn ? mappingOrder[alphaChar][moduleType]['sections'][i].displayModuleOn : '');

                                        binding.$data.imageSmallUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.small : '');
                                        binding.$data.imageLargeUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.customImage.large : '');
                                        binding.$data.imageDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].image ? mappingOrder[alphaChar][moduleType]['sections'][i].image.description : '');

                                        binding.$data.headline(!!mappingOrder[alphaChar][moduleType]['sections'][i].headline ? mappingOrder[alphaChar][moduleType]['sections'][i].headline.text : '');
                                        binding.$data.headlineUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].headline ? mappingOrder[alphaChar][moduleType]['sections'][i].headline.link : '');
                                        binding.$data.headlineDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].headline ? mappingOrder[alphaChar][moduleType]['sections'][i].headline.description : '');

                                        binding.$data.copy(!!mappingOrder[alphaChar][moduleType]['sections'][i].copy ? mappingOrder[alphaChar][moduleType]['sections'][i].copy.text : '');
                                        binding.$data.copyUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].copy ? mappingOrder[alphaChar][moduleType]['sections'][i].copy.link : '');
                                        binding.$data.copyDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].copy ? mappingOrder[alphaChar][moduleType]['sections'][i].copy.description : '');

                                        binding.$data.cta(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.text : '');
                                        binding.$data.ctaUrl(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.link : '');
                                        binding.$data.ctaDescription(!!mappingOrder[alphaChar][moduleType]['sections'][i].cta ? mappingOrder[alphaChar][moduleType]['sections'][i].cta.description : '');
                                }
                            })
                        })
                    }
                }
            },
            update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                var uniqueId = viewModel.uniqueId;
                var position = document.getElementById('sortableContainer').children.length;
                var moduleType = bindingContext.$parent;
                var uniqueIdArry = document.getElementById('sortableContainer').children;

                viewModel.params.data.mappingOrder[uniqueId] = {};
                viewModel.params.data.mappingOrder[uniqueId][position] = {};
                viewModel.params.data.mappingOrder[uniqueId][position][moduleType] = {};

                switch (moduleType) {
                    case 'large-feature-module':
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'] = [
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
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'] = [
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
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'] = [
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
                    case 'extended-story-module':
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'] = [
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

                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['headline'] = {
                            'text': viewModel.headline().replace(/é/g, "&#233;"),
                            'link': viewModel.headlineUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.headlineDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['cta'] = {
                            'text': viewModel.cta().replace(/é/g, "&#233;"),
                            'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.ctaDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['displayModuleOn'] = viewModel.selectedModuleScreenSize(),
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'] = []
                        itemsList.forEach((item, index) => {
                            if (item != '') {
                                viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'].push(
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

                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['headline'] = {
                            'text': viewModel.headline().replace(/é/g, "&#233;"),
                            'link': viewModel.headlineUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.headlineDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['cta'] = {
                            'text': viewModel.cta().replace(/é/g, "&#233;"),
                            'link': viewModel.ctaUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.ctaDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['displayModuleOn'] = viewModel.selectedModuleScreenSize(),
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'] = []
                        itemsList.forEach((item, index) => {
                            if (item != '') {
                                viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'].push(
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
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'] = [
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
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'] = [
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
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['section'] = {
                            'text': viewModel.section().replace(/é/g, "&#233;"),
                            'link': viewModel.sectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.sectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['sections'] = [
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

                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['seo1'] = {}
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['seo1']['section'] = {
                            'text': viewModel.seo1Section().replace(/é/g, "&#233;"),
                            'link': viewModel.seo1SectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.seo1SectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['seo1']['sections'] = []

                        seo1ctaList.forEach((item, index) => {
                            if (item != '') {
                                viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['seo1']['sections'].push(
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

                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['seo2'] = {}
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['seo2']['section'] = {
                            'text': viewModel.seo2Section().replace(/é/g, "&#233;"),
                            'link': viewModel.seo2SectionUrl().replace(/http:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,""),
                            'description': viewModel.seo2SectionDescription()
                        },
                        viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['seo2']['sections'] = []
                        seo2ItemsList.forEach((item, index) => {
                            if (item != '') {
                                viewModel.params.data.mappingOrder[uniqueId][position][moduleType]['seo2']['sections'].push(
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
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'large-feature-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Large Feature Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
        </li>`, synchronous: true
});

ko.components.register('small-feature-module', {
    viewModel: class SmallFeatureModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'small-feature-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Small Feature Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
        </li>`, synchronous: true
});

ko.components.register('basic-story-module', {
    viewModel: class BasicStoryModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'basic-story-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Basic Story Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
            </div
        </li>`, synchronous: true
});

ko.components.register('extended-story-module', {
    viewModel: class ExtendedStoryModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'extended-story-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Extended Story Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
        </li>`, synchronous: true
});

ko.components.register('collection-grid-module', {
    viewModel: class CollectionGridModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'collection-grid-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Collection Grid Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
        </li>`, synchronous: true
});

ko.components.register('carousel-module', {
    viewModel: class CarouselModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'carousel-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Carousel Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
        </li>`, synchronous: true
});

ko.components.register('text-link-module', {
    viewModel: class TextLinkModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'text-link-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Text Link Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
        </li>`, synchronous: true
});

ko.components.register('image-link-double-module', {
    viewModel: class ImageLinkDoubleModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'image-link-double-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Image Link Double Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
        </li>`, synchronous: true
});

ko.components.register('button-link-double-module', {
    viewModel: class ButtonLinkDoubleModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'button-link-double-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'Button Link Double Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
        </li>`, synchronous: true
});

ko.components.register('seo-link-module', {
    viewModel: class SeoLinkModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
        }
    },
    template: `
        <li class="row" data-bind="componentData, attr: {'id': 'uniqueId-'+uniqueId,  'data-type': 'seo-link-module' }">
            <div class="flexContainer">
                <div class="small-11 columns">
                    <dl class="accordion" data-accordion="" role="tablist">
                        <dd class="accordion-navigation">
                            <a data-bind="text: 'SEO Links Module', attr: { href: '#accordion-'+uniqueId, id: 'accordion-heading-'+uniqueId, role: 'tab' }"></a>

                            <div data-bind="attr: { id: 'accordion-'+uniqueId, 'aria-labelledby': 'accordion-heading-'+uniqueId, role: 'tabpanel' }" class="content">
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
        </li>`, synchronous: true
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

//TODO testing new way of rendering modules
ko.components.register('homePageTool', {
    viewModel: class HomePageToolComponentModel extends Dependents {
      constructor(params) {
          super(params);
          this.selection = ko.observable();
          this.selectedModules = ko.observableArray([]);
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
            load = false;
            this.selectedModules.push(this.selection());
          }
          this.previewHomepage = function(e) {
              //console.log('preview click ',this.mappingOrder);
              var mappingOrderCopy = JSON.parse(JSON.stringify(this.mappingOrder));
              var removedUniqueIdJson = {};
              var duplicateModuleNames = [];
              var duplicateObjects = [];
              var concatArray = [];
              var orderedJson = {};

              //removes uniqueIds
              Object.keys(mappingOrderCopy).forEach(function(key) {
                 Object.assign(removedUniqueIdJson, mappingOrderCopy[key]);
              });

              Object.keys(removedUniqueIdJson).sort().forEach(function(key,index) {
                  orderedJson[key] = removedUniqueIdJson[key];
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
              this.jsonOrder(duplicateObjects);
          }
          this.reRender = function renderLoadedJson() {
              this.selectedModules.removeAll();
              counter = 0;
              Object.keys(mappingOrder).forEach((letter, i) => {
                  Object.keys(mappingOrder[letter]).forEach((module, index) => {
                      if (module === 'collection-grid-module' || module === 'carousel-module' || module === 'seo-link-module') {
                          counter ++;
                      } else {
                          counter += mappingOrder[letter][module]['sections'].length;
                      }
                  })
              })

              Object.keys(mappingOrder).forEach((letter, i) => {
                  Object.keys(mappingOrder[letter]).forEach((module, index) => {
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
                             this.selectedModules.push(module);
                          break
                          case 'carousel-module':
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
                             this.selectedModules.push(module);
                          break
                      }
                  })
              })
              console.log('mappingOrder ',mappingOrder)
          };
          this.loadHomePage = function(e) {
              var loadDate = this.date();
              var self = this;
              load = true;
              this.loadingModelData.removeAll();
              $.ajax({
                  type: "GET",
                  url: "http://localhost:5000/hp_config/"+loadDate+".js",
                  success: function(data) {
                     var clearModules = [];
                     clearModules = Array.from(document.getElementById('sortableContainer').querySelectorAll('li'));
                     clearModules.forEach((el, index)=> {
                         ko.removeNode(el);
                         delete self.mappingOrder[el.getAttribute('id').split('-')[1]];
                     })
                    self.reRender();
                },
                error: function(jqXHR, status, error){
                    if (jqXHR.status === 404) {
                        alert('No data found for '+loadDate+'');
                    }
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
          ko.bindingHandlers.sortable = {
              init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                $( function() {
                    $( "#sortableContainer" ).sortable({
                        axis: "y",
                        update: function(event, ui) {
                            var childElements = element.querySelectorAll("li");
                            var elementOrderArry = [];
                            var uniqueIdOrderArry = [];

                            childElements.forEach((item, index) => {
                                elementOrderArry.push(item.dataset.type);
                                uniqueIdOrderArry.push(ko.dataFor(item).uniqueId);
                            })
                            viewModel.uniqueIdModified(uniqueIdOrderArry);
                            viewModel.sortMappingOrder();
                        }
                    });
                });
              }
          };
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

        <ul data-bind="foreach: selectedModules(), sortable" id="sortableContainer">
            <!-- ko component: {name: $data, params: { data: $parent }} --><!-- /ko -->
        </ul>`, synchronous: true
});
ko.applyBindings();
