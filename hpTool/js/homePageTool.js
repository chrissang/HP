

function createModule(moduleType) {
    console.log('moduleType ',moduleType);
}

ko.components.register('large-feature-module', {
    viewModel: class LargeFeatureModuleComponentModel {
        constructor(params) {
        }
    },
    template: `
        <div class="row">
            <div class="small-12 medium-4 columns">
                <label>Item #</label>
                <input type="text" placeholder="Item #">
            </div>
            <div class="small-12 medium-4 columns">
                <label>Item URL</label>
                <input type="text" placeholder="Item URL">
            </div>
            <div class="small-12 medium-4 columns">
                <label>Image URL</label>
                <input type="text" placeholder="Image URL">
            </div>
        </div>
        <div class="row">
            <div class="small-12 medium-6 columns">
                <label>Headline</label>
                <input type="text" placeholder="Headline">
            </div>
            <div class="small-12 medium-6 columns">
                <label>Headline URL</label>
                <input type="text" placeholder="Headline URL">
            </div>
        </div>
        <div class="row">
            <div class="small-12 medium-6 columns">
                <label>CTA</label>
                <input type="text" placeholder="CTA">
            </div>
            <div class="small-12 medium-6 columns">
                <label>CTA URL</label>
                <input type="text" placeholder="CTA URL">
            </div>
        </div>`, synchronous: true
});

ko.components.register('small-feature-module', {
    viewModel: class LargeFeatureModuleComponentModel {
        constructor(params) {
        }
    },
    template: `
        <div class="row">
            <div class="small-12 medium-4 columns">
                <label>Item #</label>
                <input type="text" placeholder="Item #">
            </div>

            <div class="small-12 medium-4 columns">
                <label>Item URL</label>
                <input type="text" placeholder="Item URL">
            </div>

            <div class="small-12 medium-4 columns">
                <label>Image URL</label>
                <input type="text" placeholder="Image URL">
            </div>
        </div>
        <div class="row">
            <div class="small-12 medium-6 columns">
                <label>Section</label>
                <input type="text" placeholder="Section">
            </div>
            <div class="small-12 medium-6 columns">
                <label>Section URL</label>
                <input type="text" placeholder="Section URL">
            </div>
        </div>
        <div class="row">
            <div class="small-12 medium-6 columns">
                <label>Headline</label>
                <input type="text" placeholder="Headline">
            </div>
            <div class="small-12 medium-6 columns">
                <label>Headline URL</label>
                <input type="text" placeholder="Headline URL">
            </div>
        </div>
        <div class="row">
            <div class="small-12 medium-6 columns">
                <label>CTA</label>
                <input type="text" placeholder="CTA">
            </div>
            <div class="small-12 medium-6 columns">
                <label>CTA URL</label>
                <input type="text" placeholder="CTA URL">
            </div>
        </div>`, synchronous: true
});


ko.components.register('ug-component', {
    viewModel: function (params) {
        this.component = params.component() || {};
        console.log(params)
    },
    template: `<!-- ko component: {name: component} --><!-- /ko -->`,synchronous: true
});

ko.components.register('homePageTool', {
    viewModel: function (params) {
        this.modueTypes = [
            {name: 'Larg Feature (LF)', value: 'large-feature-module'},
            {name: 'Small Feature (SF)', value: 'small-feature-module'},
            {name: 'Basic Story (BS)', value: 'basic-story-module'},
            {name: 'Extended Story (ES)', value: 'extended-story-module'},
            {name: 'Collection Grid (CG)', value: 'collection-grid-module'},
            {name: 'Carousel (CL)', value: 'carousel-module'},
            {name: 'Text Link (TL)', value: 'text-link-module'},
            {name: 'Image Link Single (LS)', value: 'image-link-single-module'},
            {name: 'Image Link Double (LD)', value: 'image-link-double-module'},
            {name: 'Button Link Single (BI)', value: 'button-link-single-module'},
            {name: 'Button Link Double (BD)', value: 'button-link-double-module'}
        ];
        this.selectedModule = ko.observable();
        this.componentNames = ko.observableArray();
        this.handleClick = function (e) {
            this.componentNames.push(this.selectedModule());
            console.log('create ', this.componentNames());
        }
    },
    template: `
        <div class="row">
            <div class="small-6 columns end">
                <select data-bind="options: modueTypes, value: selectedModule ,optionsText: 'name', optionsValue: 'value', optionsCaption: 'Choose Module Type'"></select>
            </div>
            <div class="small-6 columns end">
                <button data-bind="event:{ click: handleClick }">Create Module</button>
            </div>
        </div>

        <!-- ko foreach: componentNames() -->
            <div class="row">
                <div class="small-12 columns">
                    <p data-bind="text: $data"></p>
                </div>
            </div>

            <!-- ko component: {name: $data} --><!-- /ko -->
        <!-- /ko --> `, synchronous: true
});

ko.applyBindings();
