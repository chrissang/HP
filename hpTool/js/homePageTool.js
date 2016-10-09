

// var selectedModules = [];
var moduleOrder = {}
var dict = {}

class Dependents {
    constructor(params) {
        this.selectedModules = ko.observableArray([]);
        this.itemNumber = ko.observable("");
        this.itemUrl = ko.observable("");
        this.imageUrl = ko.observable("");
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
                    // disabled: false, // Disables the sortable if set to true.
                    // store: {
                    //     get: function (sortable) {
                    //       var order = localStorage.getItem(sortable.options.group);
                    //
                    //       return order ? order.split('|') : [];
                    //     },
                    //
                    //     // Saving the acquired sorting (called each time upon sorting modification)
                    //     set: function (sortable) {
                    //       var order = sortable.toArray();
                    //       localStorage.setItem(sortable.options.group, order.join('|'));
                    //     }
                    // },
                    animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
                    handle: ".draggable",  // Drag handle selector within list items
                    // filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
                    //draggable: ".item",  // Specifies which items inside the element should be sortable
                    ghostClass: "sortable-ghost",  // Class name for the drop placeholder
                    // chosenClass: "sortable-chosen",  // Class name for the chosen item
                    dataIdAttr: 'data-id',
                    //
                    // forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in
                    // fallbackClass: "sortable-fallback"  // Class name for the cloned DOM Element when using forceFallback
                    // fallbackOnBody: false  // Appends the cloned DOM Element into the Document's Body
                    //
                    // scroll: true, // or HTMLElement
                    // scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                    // scrollSpeed: 10, // px

                    // setData: function (dataTransfer, dragEl) {
                    //     //dataTransfer.setData('Text', dragEl.textContent);
                    // },

                    // // dragging started
                    onStart: function (evt) {
                        //evt.oldIndex;  //element index within parent

                        var elements = document.querySelectorAll('.active');
                        elements.forEach((el, index) => {
                            el.className = el.className.replace("active", "");
                        })
                    },
                    //
                    // // dragging ended
                    onEnd: function (/**Event*/evt) {
                        evt.oldIndex;  // element's old index within parent
                        evt.newIndex;  // element's new index within parent
                        var indexValue = evt.item.attributes[2].value;
                        var sortableOrder = ko.dataFor(evt.item).params.data.selectedModules();
                        sortableOrder.splice(evt.oldIndex, 1)
                        sortableOrder.splice(evt.newIndex, 0, indexValue)

                        // console.log(beforeSortableOrder);
                        //console.log('drag end sortableOrder ',sortableOrder);
                        // console.log('drag end ',moduleOrder);

                    },

                    // Element is dropped into the list from another list
                    // onAdd: function (/**Event*/evt) {
                    //     var itemEl = evt.item;  // dragged HTMLElement
                    //     evt.from;  // previous list
                    //     // + indexes from onEnd
                    // },

                    // Changed sorting within list
                    // onUpdate: function (/**Event*/evt) {
                    //     var itemEl = evt.item;  // dragged HTMLElement
                    //     + indexes from onEnd
                    // },

                    // Called by any change to the list (add / update / remove)
                    // onSort: function (/**Event*/evt) {
                    //     // same properties as onUpdate
                    //
                    // },

                    // // Element is removed from the list into another list
                    // onRemove: function (/**Event*/evt) {
                    //     // same properties as onUpdate
                    // },
                    //
                    // // Attempt to drag a filtered element
                    // onFilter: function (/**Event*/evt) {
                    //     var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
                    // },
                    //
                    // // Event when you move an item in the list or between lists
                    // onMove: function (/**Event*/evt) {
                    //     //var beforeSortableOrder = ko.dataFor(evt.dragged).params.data.selectedModules();
                    //     // console.log('onStart ',evt.dragged );
                    //     // console.log('viewModel ',ko.dataFor(evt.dragged));
                    //     // console.log('data ',ko.dataFor(evt.dragged).itemNumber() );
                    //
                    //
                    //     // Example: http://jsbin.com/tuyafe/1/edit?js,output
                    //     evt.dragged; // dragged HTMLElement
                    //     evt.draggedRect; // TextRectangle {left, top, right и bottom}
                    //     evt.related; // HTMLElement on which have guided
                    //     evt.relatedRect; // TextRectangle
                    //     // return false; — for cancel
                    // }

                });


                console.log('before drag ',viewModel.params.data.selectedModules());

                var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var modulePosition = viewModel.params.data.selectedModules().length-1;
                var alphaChar = alpha.charAt(modulePosition);
                var moduleType = bindingContext.$parent;

                moduleOrder[alphaChar] = {};
                moduleOrder[alphaChar][moduleType] = {};

                switch (moduleType) {
                    case 'large-feature-module':
                        moduleOrder[alphaChar][moduleType]['item'] = viewModel.itemNumber();
                    break;
                    case 'small-feature-module':
                        moduleOrder[alphaChar][moduleType]['item'] = viewModel.itemNumber();
                    break;
                }

                moduleOrder[alphaChar][moduleType]['item']
                //console.log(moduleOrder);
            }
        };
    }
}



ko.components.register('large-feature-module', {
    viewModel: class LargeFeatureModuleComponentModel extends Dependents {
        constructor(params) {
          super(params);
          this.params = params;
          this.accordionIndex = params.data.selectedModules().length;
        }
    },
    template: `
        <div class="row" data-bind="attr: { 'data-id': 'large-feature-module' }">
            <div class="small-12 columns">
                <dl class="accordion small-12 columns" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a data-bind="text: 'Large Feature Module '+accordionIndex, attr: { href: '#accordion'+accordionIndex, id: 'accordion-heading'+accordionIndex, role: 'tab' }" class="draggable"></a>

                        <div data-bind="sortable: accordionIndex, attr: { id: 'accordion'+accordionIndex, 'aria-labelledby': 'accordion-heading'+accordionIndex, role: 'tabpanel' }" class="content">
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
          this.accordionIndex = params.data.selectedModules().length;
        }
    },
    template: `
        <div class="row" data-bind="attr: { 'data-id': 'small-feature-module' }">
            <div class="small-12 columns">
                <dl class="accordion small-12 columns" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a data-bind="text: 'Small Feature Module '+accordionIndex, attr: { href: '#accordion'+accordionIndex, id: 'accordion-heading'+accordionIndex, role: 'tab' }" class="draggable"></a>

                        <div data-bind="sortable: accordionIndex, attr: { id: 'accordion'+accordionIndex, 'aria-labelledby': 'accordion-heading'+accordionIndex, role: 'tabpanel' }" class="content">
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

            this.handleClick = function (e) {

                this.selectedModules.push(this.selectedModule());
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

        <div data-bind="foreach: selectedModules()" id="sortableContainer">
            <!-- ko component: {name: $data, params: { data: $parent } } --><!-- /ko -->
        </div>`, synchronous: true
});

ko.applyBindings();
