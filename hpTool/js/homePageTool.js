
// var moduleOrder = {}
var dict = {}

class Dependents {
    constructor(params) {
        this.mappingOrder = {};
        this.uniqueIdModified = ko.observableArray();
        this.itemNumber = ko.observable("");
        this.itemUrl = ko.observable("");
        this.imageUrl = ko.observable("");
        this.uniqueId = new Date().getTime();
        this.sortMappingOrder = function() {
            var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var uniqueIdReordered = this.uniqueIdModified()

            function reorderAlpha(obj, curr, updated) {
                var jsonString = JSON.stringify(obj);
                jsonString = jsonString.replace(curr, updated);
                var jsonObj = JSON.parse(jsonString);
                //console.log(jsonString);
                //console.log(jsonObj);
                return jsonObj;
                //return JSON.parse(jsonString);
            }
            // TODO: have to swap the uniqueIdReordered as well as the alpha chars
            console.log('uniqueIdReordered ',uniqueIdReordered)
            uniqueIdReordered.forEach((el,index) => {
                var alphaChar = alpha.charAt(index);
                //console.log('each ',Object.keys(this.mappingOrder[el]), alphaChar);
                if (Object.keys(this.mappingOrder[el]) != alphaChar) {
                    var curr = Object.keys(this.mappingOrder[el])[0];
                    this.mappingOrder[el] = reorderAlpha(this.mappingOrder[el],curr, alphaChar);

                }
                console.log('after reorder ',this.mappingOrder)
            })

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
                        evt.oldIndex;  // element's old index within parent
                        evt.newIndex;  // element's new index within parent
                        var order = sortable.toArray();
                        // ko.dataFor(evt.item).params.data.selectedModules(order);
                        ko.dataFor(evt.item).params.data.uniqueIdModified(order);
                        ko.dataFor(evt.item).params.data.sortMappingOrder();
                    },
                    // Changed sorting within list
                    onUpdate: function (/**Event*/evt) {
                        var itemEl = evt.item;  // dragged HTMLElement
                        // + indexes from onEnd

                    }
                });

                var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var sortedOrder = viewModel.params.data.uniqueIdModified();
                var uniqueId = viewModel.uniqueId;
                var alphaChar = alpha.charAt(viewModel.accordionIndex());
                var moduleType = bindingContext.$parent;

                viewModel.params.data.mappingOrder[uniqueId] = {};
                viewModel.params.data.mappingOrder[uniqueId][alphaChar] = {};
                viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType] = {};

                switch (moduleType) {
                    case 'large-feature-module':
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['item'] = viewModel.itemNumber();
                        break;
                    case 'small-feature-module':
                        viewModel.params.data.mappingOrder[uniqueId][alphaChar][moduleType]['item'] = viewModel.itemNumber();
                        break;
                }
                //console.log('mappingOrder ',viewModel.params.data.mappingOrder);
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
                                    <h3 data-bind="text: itemUrl"></h3>
                                </div>
                                <div class="small-12 medium-4 columns">
                                    <label>Image URL</label>
                                    <input type="text" placeholder="Image URL"></input>
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
                            </div>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>`, synchronous: true
});

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
              {name: 'Image Link Single (LS)', value: 'image-link-single-module'},
              {name: 'Image Link Double (LD)', value: 'image-link-double-module'},
              {name: 'Button Link Single (BI)', value: 'button-link-single-module'},
              {name: 'Button Link Double (BD)', value: 'button-link-double-module'}
          ];

          this.handleClick = function (e) {
              if (this.selection()) {
                  this.selectedModules.push(this.selection());

                //   console.log('handleClick ',this.uniqueId);
                //   var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                //   var order = this.selectedModules();
                  //
                //   order.forEach((el,index) => {
                //       var alphaChar = alpha.charAt(index);
                //       var moduleType = el;
                //
                //       this.mappingOrder[alphaChar] = {};
                //       this.mappingOrder[alphaChar][moduleType] = {};
                //
                //   })
                //   console.log('created ',this.mappingOrder);
              }
          }
        //   this.createJson = function(e) {
        //       var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        //       var order = this.selectedModules();
        //       var sortedOrder = this.selectedModulesModified();
          //
        //       if (sortedOrder.length != 0) {
        //             sortedOrder.forEach((el,index) => {
        //                 var alphaChar = alpha.charAt(index);
        //                 var moduleType = el;
          //
        //                 this.mappingOrder[alphaChar] = {};
        //                 this.mappingOrder[alphaChar][moduleType] = {};
        //             })
        //         } else {
        //             order.forEach((el,index) => {
        //                 var alphaChar = alpha.charAt(index);
        //                 var moduleType = el;
          //
        //                 this.mappingOrder[alphaChar] = {};
        //                 this.mappingOrder[alphaChar][moduleType] = {};
          //
        //                 //  switch (moduleType) {
        //                 //      case 'large-feature-module':
        //                 //         this.mappingOrder[alphaChar][moduleType]['item'] = '';
        //                 //         break;
        //                 //     case 'small-feature-module':
        //                 //         this.mappingOrder[alphaChar][moduleType]['item'] = '';
        //                 //         break;
        //                 // }
        //             })
        //         }
          //
          //
        //   }
        //   ko.virtualElements.allowedBindings.viewAdded = true;
        //   ko.bindingHandlers.viewAdded = {
        //       update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        //           //console.log(bindingContext )
        //       }
        //   }
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
                <button data-bind="">Preview Order</button>
            </div>
        </div>

        <div data-bind="foreach: selectedModules()" id="sortableContainer">
            <!-- ko component: {name: $data, params: { data: $parent } } --><!-- /ko -->
        </div>`, synchronous: true
});

ko.applyBindings();
