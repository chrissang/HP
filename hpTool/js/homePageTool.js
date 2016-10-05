

class Dependents {
    constructor(params) {
      this.modulesArry = ko.observableArray();
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
    }
}
function createModule(moduleType) {
    console.log('moduleType ',moduleType);
}

ko.components.register('large-feature-module', {
    viewModel: class LargeFeatureModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.modulesArry.push('large-feature-module');
          console.log('this ', this.modulesArry());
        }
    },
    template: `

      <div class="row">
        <div class="small-12 columns">
          <dl class="accordion small-12 columns" data-accordion="" role="tablist">
              <dd class="accordion-navigation">
                <a  role="tab" href="#item-undefined" id="item-undefined-heading">Accordion 1</a>

                <div role="tabpanel" id="item-undefined" aria-labelledby="item-undefined-heading" class="content">
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
                  </div>
                </div>
              </dd>
          </dl>
        </div>
      </div>

        `, synchronous: true
});

ko.components.register('small-feature-module', {
    viewModel: class LargeFeatureModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
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

ko.components.register('homePageTool', {
  viewModel: class HomePageToolComponentModel extends Dependents {
      constructor(params) {
        super(params);
        this.modueTypes = [
            {name: 'Large Feature (LF)', value: 'large-feature-module'},
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
        this.selectedModules = ko.observableArray();
        this.handleClick = function (e) {
            this.selectedModules.push(this.selectedModule());
            console.log('create ', this.selectedModules());
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
                <select data-bind="options: modueTypes, value: selectedModule ,optionsText: 'name', optionsValue: 'value', optionsCaption: 'Choose Module Type'"></select>
            </div>
            <div class="small-6 columns end">
                <button data-bind="event:{ click: handleClick }">Create Module</button>
            </div>
        </div>

        <!-- ko foreach: selectedModules() -->
            <div class="row">
                <div class="small-12 columns">
                    <p data-bind="text: $data"></p>
                </div>
            </div>

            <!-- ko component: {name: $data } --><!-- /ko -->
        <!-- /ko --> `, synchronous: true
});

ko.applyBindings();
