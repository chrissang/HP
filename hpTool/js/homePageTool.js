var hpJson = {};
var cleanJson = {};

class Dependents {
    constructor(params) {
        this.itemNumber = ko.observable("");
        this.itemUrl = ko.observable("");
        this.imageUrl = ko.observable("");
        this.imageSmallUrl = ko.observable("");
        this.imageLargeUrl = ko.observable("");
        this.headline = ko.observable("");
        this.headlineUrl = ko.observable("");

        this.copy = ko.observable("");
        this.copyUrl = ko.observable("");

        this.cta = ko.observable("");
        this.ctaUrl = ko.observable("");
        this.section = ko.observable("");
        this.sectionUrl = ko.observable("");
        this.moduleType = ko.observable("");

        this.imageDescription = ko.observable("");
        this.headlineDescription = ko.observable("");
        this.ctaDescription = ko.observable("");
        this.sectionDescription = ko.observable("");
        this.copyDescription = ko.observable("");

        this.displayGroupOn = ko.observable("");
        this.displayModuleOn = ko.observable("");

        this.groupScreenSizes = ko.observableArray(['small', 'medium', 'large', 'xlarge']);
        this.selectedGroupScreenSize = ko.observable('');
        this.selectedModuleScreenSize = ko.observable('')

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
        self = this;
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
                        var oldIndex = evt.oldIndex;  // element's old index within parent
                        var newIndex = evt.newIndex;  // element's new index within parent
                        var order = sortable.toArray();
                        ko.dataFor(evt.item).params.data.uniqueIdModified(order);
                        ko.dataFor(evt.item).params.data.sortMappingOrder();
                    }
                });

                //viewModel.params.data.uniqueIdModified(viewModel.uniqueId);
                var uniqueId = viewModel.uniqueId;
                var alphaChar = viewModel.alpha.charAt(viewModel.accordionIndex());
                var moduleType = bindingContext.$parent;
                viewModel.moduleType(bindingContext.$parent);

                viewModel.params.data.mappingOrder[uniqueId] = {};
                viewModel.params.data.mappingOrder[uniqueId][alphaChar] = {};
                viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType] = {};

                switch (moduleType) {
                    case 'large-feature-module':
                    viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['displayGroupOn'] = viewModel.selectedGroupScreenSize(),
                    viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                        {
                            'item': viewModel.itemNumber(),
                            'displayModuleOn': viewModel.selectedModuleScreenSize(),
                            'image': {
                                'customImage': {
                                    "small": viewModel.imageSmallUrl(),
                                    "large": viewModel.imageLargeUrl()
                                },
                                'link': viewModel.itemUrl(),
                                'description': viewModel.imageDescription()
                            },
                            'headline': {
                                'text': viewModel.headline(),
                                'link': viewModel.headlineUrl(),
                                'description': viewModel.headlineDescription()
                            },
                            'cta': {
                                'text': viewModel.cta(),
                                'link': viewModel.ctaUrl(),
                                'description': viewModel.ctaDescription()
                            }
                        }
                    ]
                    break;
                    case 'small-feature-module':
                    viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['displayGroupOn'] = viewModel.selectedGroupScreenSize(),
                    viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                        {
                            'item': viewModel.itemNumber(),
                            'displayModuleOn': viewModel.selectedModuleScreenSize(),
                            'section': {
                                'text': viewModel.section(),
                                'link': viewModel.sectionUrl(),
                                'description': viewModel.sectionDescription()
                            },
                            'image': {
                                'customImage': {
                                    "small": viewModel.imageSmallUrl(),
                                    "large": viewModel.imageLargeUrl()
                                },
                                'link': viewModel.itemUrl(),
                                'description': viewModel.imageDescription()
                            },
                            'headline': {
                                'text': viewModel.headline(),
                                'link': viewModel.headlineUrl(),
                                'description': viewModel.headlineDescription()
                            },
                            'cta': {
                                'text': viewModel.cta(),
                                'link': viewModel.ctaUrl(),
                                'description': viewModel.ctaDescription()
                            }
                        }
                    ]
                    break;
                    case 'basic-story-module':
                    viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['displayGroupOn'] = viewModel.selectedGroupScreenSize(),
                    viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                        {
                            'item': viewModel.itemNumber(),
                            'displayModuleOn': viewModel.selectedModuleScreenSize(),
                            'section': {
                                'text': viewModel.section(),
                                'link': viewModel.sectionUrl(),
                                'description': viewModel.sectionDescription()
                            },
                            'image': {
                                'customImage': {
                                    "small": viewModel.imageSmallUrl(),
                                    "large": viewModel.imageLargeUrl()
                                },
                                'link': viewModel.itemUrl(),
                                'description': viewModel.imageDescription()
                            },
                            'headline': {
                                'text': viewModel.headline(),
                                'link': viewModel.headlineUrl(),
                                'description': viewModel.headlineDescription()
                            },
                            'cta': {
                                'text': viewModel.cta(),
                                'link': viewModel.ctaUrl(),
                                'description': viewModel.ctaDescription()
                            }
                        }
                    ]
                    break;
                    case 'extended-story-module':
                    viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['displayGroupOn'] = viewModel.selectedGroupScreenSize(),
                    viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['sections'] = [
                        {
                            'item': viewModel.itemNumber(),
                            'displayModuleOn': viewModel.selectedModuleScreenSize(),
                            'section': {
                                'text': viewModel.section(),
                                'link': viewModel.sectionUrl(),
                                'description': viewModel.sectionDescription()
                            },
                            'image': {
                                'customImage': {
                                    "small": viewModel.imageSmallUrl(),
                                    "large": viewModel.imageLargeUrl()
                                },
                                'link': viewModel.itemUrl(),
                                'description': viewModel.imageDescription()
                            },
                            'headline': {
                                'text': viewModel.headline(),
                                'link': viewModel.headlineUrl(),
                                'description': viewModel.headlineDescription()
                            },
                            'copy': {
                                'text': viewModel.copy(),
                                'link': viewModel.copyUrl(),
                                'description': viewModel.copyDescription()
                            },
                            'cta': {
                                'text': viewModel.cta(),
                                'link': viewModel.ctaUrl(),
                                'description': viewModel.ctaDescription()
                            }
                        }
                    ]
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
        <div class="row" data-bind="attr: { 'data-id': uniqueId }">
            <div class="small-12 columns">
                <dl class="accordion small-12 columns" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a data-bind="text: 'Large Feature Module '+accordionIndex(), attr: { href: '#accordion'+accordionIndex(), id: 'accordion-heading'+accordionIndex(), role: 'tab' }" class="draggable"></a>

                        <div data-bind="sortable: accordionIndex(), attr: { id: 'accordion'+accordionIndex(), 'aria-labelledby': 'accordion-heading'+accordionIndex(), role: 'tabpanel' }" class="content">
                            <div class="row">
                                <div class="small-12 medium-4 columns">
                                    <label>Item #</label>
                                    <input data-bind="textInput: itemNumber" type="number" placeholder="Item #"></input>
                                </div>
                                <div class="small-12 medium-4 columns">
                                    <label>Item URL</label>
                                    <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL"></input>
                                </div>
                                <div class="small-12 medium-2 columns">
                                    <label>Display Group On</label>
                                    <select data-bind="options: groupScreenSizes, optionsCaption: 'Display On', value: selectedGroupScreenSize"></select>
                                </div>
                                <div class="small-12 medium-2 columns">
                                    <label>Display Module On</label>
                                    <select data-bind="options: groupScreenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
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
        <div class="row" data-bind="attr: { 'data-id': uniqueId }">
            <div class="small-12 columns">
                <dl class="accordion small-12 columns" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a data-bind="text: 'Small Feature Module '+accordionIndex(), attr: { href: '#accordion'+accordionIndex(), id: 'accordion-heading'+accordionIndex(), role: 'tab' }" class="draggable"></a>

                        <div data-bind="sortable: accordionIndex(), attr: { id: 'accordion'+accordionIndex(), 'aria-labelledby': 'accordion-heading'+accordionIndex(), role: 'tabpanel' }" class="content">
                            <div class="row">
                                <div class="small-12 medium-4 columns">
                                    <label>Item #</label>
                                    <input data-bind="textInput: itemNumber" type="text" placeholder="Item #">
                                </div>
                                <div class="small-12 medium-4 columns">
                                    <label>Item URL</label>
                                    <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL">
                                </div>
                                <div class="small-12 medium-2 columns">
                                    <label>Display Group On</label>
                                    <select data-bind="options: groupScreenSizes, optionsCaption: 'Display On', value: selectedGroupScreenSize"></select>
                                </div>
                                <div class="small-12 medium-2 columns">
                                    <label>Display Module On</label>
                                    <select data-bind="options: groupScreenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
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
        </div>`, synchronous: true
});

ko.components.register('basic-story-module', {
    viewModel: class SmallFeatureModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row" data-bind="attr: { 'data-id': uniqueId }">
            <div class="small-12 columns">
                <dl class="accordion small-12 columns" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a data-bind="text: 'Basic Story Module '+accordionIndex(), attr: { href: '#accordion'+accordionIndex(), id: 'accordion-heading'+accordionIndex(), role: 'tab' }" class="draggable"></a>

                        <div data-bind="sortable: accordionIndex(), attr: { id: 'accordion'+accordionIndex(), 'aria-labelledby': 'accordion-heading'+accordionIndex(), role: 'tabpanel' }" class="content">
                            <div class="row">
                                <div class="small-12 medium-4 columns">
                                    <label>Item #</label>
                                    <input data-bind="textInput: itemNumber" type="text" placeholder="Item #">
                                </div>
                                <div class="small-12 medium-4 columns">
                                    <label>Item URL</label>
                                    <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL">
                                </div>
                                <div class="small-12 medium-2 columns">
                                    <label>Display Group On</label>
                                    <select data-bind="options: groupScreenSizes, optionsCaption: 'Display On', value: selectedGroupScreenSize"></select>
                                </div>
                                <div class="small-12 medium-2 columns">
                                    <label>Display Module On</label>
                                    <select data-bind="options: groupScreenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
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
        </div>`, synchronous: true
});

ko.components.register('extended-story-module', {
    viewModel: class SmallFeatureModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = ko.observable(params.data.selectedModules().length-1);
        }
    },
    template: `
        <div class="row" data-bind="attr: { 'data-id': uniqueId }">
            <div class="small-12 columns">
                <dl class="accordion small-12 columns" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a data-bind="text: 'Extended Story Module '+accordionIndex(), attr: { href: '#accordion'+accordionIndex(), id: 'accordion-heading'+accordionIndex(), role: 'tab' }" class="draggable"></a>

                        <div data-bind="sortable: accordionIndex(), attr: { id: 'accordion'+accordionIndex(), 'aria-labelledby': 'accordion-heading'+accordionIndex(), role: 'tabpanel' }" class="content">
                            <div class="row">
                                <div class="small-12 medium-4 columns">
                                    <label>Item #</label>
                                    <input data-bind="textInput: itemNumber" type="text" placeholder="Item #">
                                </div>
                                <div class="small-12 medium-4 columns">
                                    <label>Item URL</label>
                                    <input data-bind="textInput: itemUrl" type="text" placeholder="Item URL">
                                </div>
                                <div class="small-12 medium-2 columns">
                                    <label>Display Group On</label>
                                    <select data-bind="options: groupScreenSizes, optionsCaption: 'Display On', value: selectedGroupScreenSize"></select>
                                </div>
                                <div class="small-12 medium-2 columns">
                                    <label>Display Module On</label>
                                    <select data-bind="options: groupScreenSizes, optionsCaption: 'Display On', value: selectedModuleScreenSize"></select>
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
                                    <input data-bind="textInput: copy" type="text" placeholder="Copy">
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
        </div>`, synchronous: true
});

function reducerFilter(acc, xs) {
  xs.map((item, index) => {
      if (xs[index] === xs[index+1]) {
          if (xs[index] === 'collection-grid-module' || xs[index] === 'carousel-module' || xs[index] === 'text-link-module') {
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

ko.components.register('homePageTool', {
  viewModel: class HomePageToolComponentModel extends Dependents {
      constructor(params) {
          super(params);
          this.selection = ko.observable();
          this.selectedModules = ko.observableArray();
          this.moduleTypes = [
              {name: 'Large Feature (LF)', value: 'large-feature-module'},
              {name: 'Small Feature (SF)', value: 'small-feature-module'},
              {name: 'Basic Story (BS)', value: 'basic-story-module'},
              {name: 'Extended Story (ES)', value: 'extended-story-module'},
              {name: 'Collection Grid (CG)', value: 'collection-grid-module'},
              {name: 'Carousel (CL)', value: 'carousel-module'},
              {name: 'Text Link (TL)', value: 'text-link-module'},
              {name: 'Image Link Double (LD)', value: 'image-link-double-module'},
              {name: 'Button Link Double (BD)', value: 'button-link-double-module'}
          ];
          this.jsonOrder = function(arry) {
              var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
              var hpJson = {};
              arry.forEach((obj, index) => {
                  hpJson[alpha.charAt(index)] = obj;
                  //console.log('obj',obj);
              })
              //console.log('hpJson ',hpJson);
            $.ajax({
                type: "POST",
                url: "http://localhost:5000/json",
                data: hpJson,
                dataType: "json"
            }).done(function(msg) {
                console.log("Data Saved: " + msg);
            });
          }

          this.handleClick = function (e) {
              if (this.selection()) {
                  this.selectedModules.push(this.selection());
              }
          }
          this.previewOrder = function(e) {
              var obj = this.mappingOrder;
              var duplicateModuleNames = [];
              var duplicateObjects = [];
              var concatArray = [];

              //gets the order
              Object.keys(obj).forEach(function(key) {
                 Object.assign(cleanJson, obj[key]);
              });

              Object.keys(cleanJson).forEach(function(key,index) {
                  duplicateModuleNames.push(Object.keys(cleanJson[key])[0]);
                  duplicateObjects.push(cleanJson[key]);
              });

              var adjecentCombine = reducerFilter([],duplicateModuleNames);

              adjecentCombine.forEach((el,index) => {
                  var moduleType = Object.keys(duplicateObjects[index])[0];
                  //console.log(el);
                  if (el === 'concat') {
                      duplicateObjects[index+1][moduleType].sections = duplicateObjects[index][moduleType].sections.concat(duplicateObjects[index+1][moduleType].sections);
                      duplicateObjects.splice(index,1,'');
                  }
              })

              duplicateObjects = duplicateObjects.filter(function(n){ return n != '' });

              this.jsonOrder(duplicateObjects);


          }
      }
    },
    template: `
        <div class='row'>
            <div class='small-12 columns'>
                <h2>Home Page Tool</h2>
            </div>
        </div>

        <div class="row">
            <div class="small-6 columns end">
                <select data-bind="options: moduleTypes, value: selection ,optionsText: 'name', optionsValue: 'value', optionsCaption: 'Choose Module Type'"></select>
            </div>
            <div class="small-6 columns end">
                <button data-bind="event:{ click: handleClick }">Create Module</button>
                <button data-bind="event:{ click: previewOrder }">Preview Order</button>
            </div>
        </div>

        <div data-bind="foreach: selectedModules()" id="sortableContainer">
            <!-- ko component: {name: $data, params: { data: $parent } } --><!-- /ko -->
        </div>`, synchronous: true
});

ko.applyBindings();
