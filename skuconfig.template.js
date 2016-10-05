const INFINITEISH = 9999;
const PREVIEW_URL = 'http://localhost:3000/images/24867.jpg?test=1';

var Transitions = {

    hideAllAfter: function (n) {
        return function () {
            //variable this is bound to an instance of input-group

            this.children().forEach((e, index) => {
                if (index > n) e.hidden(true);
            });
        }
    },

    revealAfter: function (n) {

        // reveal after element n is completed
        // "this" is bound to the input component

        return function () {
            if (this.inputGroup.recentlyCompleted() === n) {
                this.hidden(false);
            }
        }
    }

};

class DependentDropDownModel {
    constructor(inputmodel) {
        this.componentName = inputmodel.componentName;
        this.model = inputmodel;
    }

    get lastLevel() {
        return this.model.headers.length - 1;
    }

    getChoices(pathArray) {
        var level = pathArray.length;
        var nonUniqChoices = [];

        if (level === 0) {
            nonUniqChoices = this.model.rows;
        } else {
            nonUniqChoices = this.model.rows.filter(row => pathArray.every((e, index) => e === row[index]))
        }

        var lookup = this.model.lookups[this.model.headers[level]];
        var uniqChoices = Array.from(nonUniqChoices.reduce((aSet, e)=> {
                aSet.add(e[level]);
                return aSet
            }, new Set())
        ).map(val => {
            val = String(val);
            var lookupValueKey = lookup.headers[1];
            var lookupObject = lookup.rows.find(e=> String(e.Value) === val);
            if (lookupObject) {
                var display = lookupObject[lookupValueKey];
            } else {
                var display = val;
            }
            return {val: val, display: display}
        });

        return {
            level: level,
            key: this.model.headers[level],
            type: this.model.lookup_types[this.model.headers[level]],
            members: uniqChoices
        }

    }
}


const selectComponents = {
    Text: 'ug-text-select', Image: 'ug-image-select', Color: 'ug-color-select', ImageText: 'ug-image-text-select'
};

const maxOptionChars = 20;

class CustomInputModel {
    constructor(params) {
        this.composite = false; // default value false. overriden by a DependenDropdown viewmodel
        this.params = params || {};
        this.indexInGroup = params.indexInGroup();
        this.hidden = ko.observable(false);
        this.inputGroup = params.inputGroup;

        this.value = ko.observable();


        this.params.element.violations = ko.observableArray();
        this.params.element.groupHasValue = ko.observableArray();
        this.params.element.groupViolations = ko.observableArray();


        this.params.element.hasValue = ko.observable(false);

        if (params.element && params.element.transition) {
            var fnAndArgs = params.element.transition.split(/\s+/);
            var transitionFnFactory = Transitions[fnAndArgs[0]]
            var args = fnAndArgs.slice(1).map(c => parseInt(c));
            var transitionFn = transitionFnFactory.apply(null, args);
            this.transition = transitionFn.bind(this);
        } else {
            this.transition = Transitions.revealAfter(this.indexInGroup - 1);
        }

        this.submit = function () {
            if (this.errors().length == 0) {
                alert('Thank you.');
            } else {
                alert('Please check your submission.');
                this.errors.showAllMessages();
            }
        }
    }

    //BM: completed()
    completed() {
        this.inputGroup.checkInInput(this.indexInGroup, this.value());
        this.transition();
    }
}

function DependentDropDownViewModelFactory(dependentDropDown) {
    return class ViewModel extends CustomInputModel {
        constructor(params) {

            super(params);
            this.composite = true;

            this.dependentDropDown = dependentDropDown;
            this.currentLevel = ko.observable(0);
            this.values = ko.observableArray();
            this.inputGroup.children.push(this);

            // initial content of selectOptions is the first level of choices (level 0)
            this.selectOptions = ko.observableArray([this.makeSelect(0)]);
        }

        //--------- private functions ----------------------
        select(val, level, autoSelect) {
            autoSelect = autoSelect ? autoSelect : false;
            if (level <= this.dependentDropDown.lastLevel) {

                this.values.splice(level, INFINITEISH);
                this.values.push(val);
                this.unselect(level + 1);

                if (level >= this.currentLevel()) {
                    this.currentLevel(level + 1);
                } else {
                    this.currentLevel(level);
                    this.selectOptions.splice(level + 1, INFINITEISH);
                }

                if (level < this.dependentDropDown.lastLevel) {
                    //console.log("*** Making select for ", val, level);
                    var newSelect = this.makeSelect(level + 1, this.values(), autoSelect);
                    this.selectOptions.push(newSelect);

                } else {
                    //this.value(this.values().join("-"));
                    //BM: make the map of values and put is in this.value
                    let valsArr = this.values();
                    let valsMap = this.dependentDropDown.model.headers.reduce((acc, header, index, key) => {
                        let v = valsArr[index];

                        if (v !== "N/A") {
                            acc[header] = v;
                        }

                        return acc;
                    }, {});
                    this.value(valsMap);
                    this.completed();
                }
            }

        };

        unselect(level) {
            this.currentLevel(level);
            this.selectOptions.splice(level + 1, INFINITEISH)
        };

        makeSelect(level, values) {

            // values param should have only (level) elements

            if (values) {
                values.splice(level, INFINITEISH);
            }

            if (level < this.dependentDropDown.model.headers.length) {
                var selectType = this.dependentDropDown.model.lookup_types[this.dependentDropDown.model.headers[level]];
                var type = this.dependentDropDown.model.headers[level];
                var valuesArray = values ? values : [];

                var retval = {
                    headers: this.dependentDropDown.model.headers,
                    dropDownChoices: this.dependentDropDown.getChoices(valuesArray).members,
                    level: level,
                    selectClass: selectComponents[selectType],
                    label: this.dependentDropDown.model.headers[level],
                    selectType: this.dependentDropDown.model.lookup_types[this.dependentDropDown.model.headers[level]],
                    lookups: this.dependentDropDown.model.lookups[type].rows,
                    parent: this
                };

                return retval;

            }
        };

    }
}

const dependentDropDownModels = compositeConfigs.names.reduce((acc, compositeName) => {
    let config = compositeConfigs[compositeName];
    acc[config.componentName] = new DependentDropDownModel(config);
    return acc;
}, {});

const dependentDropDownViewModels = Object.keys(dependentDropDownModels).reduce((acc, componentName) => {
    let depDd = dependentDropDownModels[componentName];
    let vmCls = DependentDropDownViewModelFactory(depDd);

    acc[componentName] = vmCls;

    return acc;
}, {});


/*
 * Register all components serving as views of composites
 */
Object.keys(dependentDropDownViewModels).forEach(componentName => {

    console.log("Registering ", componentName);

    if (ko.components.isRegistered(componentName)) {
        return;
    }

    ko.components.register(componentName, {
        viewModel: dependentDropDownViewModels[componentName], template: `<div data-bind='foreach: selectOptions, style: {display: hidden() ? "none": "block"}'>
                <!-- ko if: $data == 'N/A' -->
                    <div data-bind='text: label'></div>
                <!-- /ko -->
            <ug-component data-bind='attr:{name: selectClass}' params='component: selectClass, params: $data'></ug-component>
        </div>`,

        synchronous: true
    });

});

class SelectViewModel {
    constructor(params) {
        console.log("PARAMS", params)
        this.parent = params.parent;
        this.label = params.label;
        this.selectType = params.label;
        this.level = params.level;
        this.selected = ko.observable();
        this.lookups = this.parent.dependentDropDown.model.lookups;
        this.dropDownChoices = params.dropDownChoices;
        this.groupId = params.parent.inputGroup.groupId;


        this.skip = ko.observable(false);

        this.handleDropDownChange = function (obj, event) {
            if (this.selected() === this.dropDownChoices[0].val && obj instanceof SelectViewModel) {
                this.parent.unselect(this.level);

            } else {
                if (obj.val && obj.display) {
                    this.selected(obj.val);
                }
                this.parent.select(this.selected(), this.level)
                //console.log("MIKE JONES"+this.selected())
            }


        };

        this.autoSelect = this.dropDownChoices.length < 2;

        this.skip = ko.observable(false);

        if (this.autoSelect) {
            this.selected(this.dropDownChoices[0].val);

            this.skip(this.dropDownChoices[0].val === "N/A");


            //NOTE: without setTimeout, we will not be able to see the cascading
            //   creation of level-n+1 selects
            setTimeout(() => this.handleDropDownChange(this.dropDownChoices[0]), 0);

        }
        //console.log(this.parent.values())
    }
}


ko.components.register('ug-text-select', {
    viewModel: class TextSelect extends SelectViewModel {
        constructor(params) {
            super(params);
            this.shouldBeRadio = (params.dropDownChoices.length === 1 || params.dropDownChoices.length === 2 && params.dropDownChoices.reduce((total, choice) => {
                total += choice.display.length;
                return total;
            }, 0) < maxOptionChars;

            this.optionLen = ("Select " + params.label.toLowerCase()).length;
            this.optionText = function () {
                return !this.shouldBeRadio && ("Select " + params.label.toLowerCase()).length < 25 ? "Select " + params.label.toLowerCase() : "Select option";
            }
            this.dropDownChoices =
                !this.shouldBeRadio ? [{display: this.optionText()}].concat(params.dropDownChoices) : params.dropDownChoices;
        }
    },

    template: `<div class='row' data-bind='style: {display: skip() ? "none": "block"}'>
            <!-- ko if: optionLen > 25 -->
                <div class='small-12 columns'>
                    <label data-bind='text: label'></label>
                </div>
            <!-- /ko -->

            <!-- ko ifnot: shouldBeRadio -->
                <div class='small-12 columns'>
                    <select data-bind='optionsText: "display", optionsValue: "val", value: selected, options: dropDownChoices, event:{ change: handleDropDownChange}'></select>
                </div>
            <!-- /ko -->

            <!-- RADIO BUTTON MODE -->
            <!-- ko if: shouldBeRadio -->
                <!-- ko if: label -->
                    <div class='small-12 columns'>
                        <label data-bind='text: label'></label>
                    </div>
                <!-- /ko -->
                <div class='small-12 columns'>
                    <!-- ko foreach: dropDownChoices -->
                        <span>
                            <input data-bind='value: $data.val, checked: $parent.selected(), attr:{id: $data.val+"-"+$parent.groupId, name: "radio"+$parent.groupId+$parent.level}'
                                   type='radio'/>
                            <label data-bind='text: $data.display, attr: {for: $data.val+"-"+$parent.groupId}, event:{ click: $parent.handleDropDownChange.bind($parent)}'></label>
                        </span>
                    <!-- /ko -->
                </div>
            <!-- /ko -->
        </div>`, synchronous: true
});


ko.components.register('ug-color-select', {
    viewModel: SelectViewModel,

    template: `<div class='row' data-bind='style: {display: skip() ? "none": "block"}'>
            <!-- ko if: label -->
                <div class='small-12 columns'>
                   <label data-bind='text: label'></label>
               </div>
            <!-- /ko -->

            <!-- ko foreach: dropDownChoices -->
                <!-- ko if: $data !== 'N/A' -->
                    <div class='small-3 columns end'>
                        <input data-bind='attr: {id: "input-"+$data.val}' class='overRideInput' type='radio' name='images'/>
                        <label data-bind='attr: {for: "input-"+$data.val}'>
                            <div data-bind='style: {backgroundColor: $data.display}, attr: {class: "color-swatch" + ($parent.selected() === $data.val ? " activeBorderColor":"")}, click: $parent.handleDropDownChange.bind($parent)'></div>

                            <!-- ko if: $data.val.length >= 3 -->
                                <div class="color-swatch-label" data-bind="text: $data.val"></div>
                            <!-- /ko -->

                        </label>
                    </div>
                <!-- /ko -->
            <!-- /ko -->

        </div>`, synchronous: true

});

ko.components.register('ug-image-select', {
    viewModel: SelectViewModel,

    template: `<div class='row'>
            <!-- ko if: label -->
                <div class='small-12 columns'>
                   <label data-bind='text: label'></label>
               </div>
            <!-- /ko -->

            <!-- ko foreach: dropDownChoices -->
                <div class='small-6 columns end'>
                    <input data-bind='attr: {id: "input-"+$data.val}' class='overRideInput' type='radio' name='images'/>
                    <label data-bind='attr: {for: "input-"+$data.val}'>
                        <img data-bind='attr: {src: $data.display, class: "inActiveBorderColor" + ($parent.selected() === $data.val ? " activeBorderColor":"")}, click: $parent.handleDropDownChange.bind($parent)'/>
                    </label>
                </div>
            <!-- /ko -->

        </div>`, synchronous: true

});

ko.components.register('ug-image-text-select', {
    viewModel: class ImageTextSelect extends SelectViewModel {
        constructor(params) {
            super(params);


            this.imgText = function (optionValue) {
                let imgurl = optionValue.display;

                var sepPos = imgurl.lastIndexOf(';');
                return {
                    image: imgurl.slice(0, sepPos), text: imgurl.slice(sepPos + 1).trim()
                };
            };
            this.imageLen = params.dropDownChoices.length;

        }
    }, template: `<div class='row' data-bind='style: {display: skip() ? "none": "block"}'>
            <!-- ko foreach: dropDownChoices -->
                <!-- ko if: $parent.imageLen == 1 -->
                    <div class='small-12 columns end'>
                        <input data-bind='attr: {id: "input-"+$data}' class='overRideInput' type='radio' name='images'/>
                        <label data-bind='attr: {for: "input-"+$data}'>
                            <div style="border: 1px solid silver;">
                            <img data-bind='attr: {src: $parent.imgText($data).image, class: "inActiveBorderColor" + ($parent.selected() === $data.val ? " activeBorderColor":"")}, click: $parent.handleDropDownChange.bind($parent)'/>
                            <div data-bind="text: $parent.imgText($data).text" class="text-center"></div>
                            </div>
                        </label>
                    </div>
                <!-- /ko -->

                <!-- ko if: $parent. imageLen > 1 -->
                    <div class='small-6 columns end'>
                        <input data-bind='attr: {id: "input-"+$data}' class='overRideInput' type='radio' name='images'/>
                        <label data-bind='attr: {for: "input-"+$data}'>
                            <div style="border: 1px solid silver;">
                            <img data-bind='attr: {src: $parent.imgText($data).image, class: "inActiveBorderColor" + ($parent.selected() === $data.val ? " activeBorderColor":"")}, click: $parent.handleDropDownChange.bind($parent)'/>
                            <div data-bind="text: $parent.imgText($data).text"></div>
                            </div>
                        </label>
                    </div>
                <!-- /ko -->
            <!-- /ko -->

        </div>`, synchronous: true


});


ko.components.register('ug-component', {
    viewModel: function (params) {
        this.params = params.params || {};
        this.component = params.component || {};
    },

    template: `<!-- ko component: {name: component, params:params} -->
        <!-- /ko -->`,

    synchronous: true
});

ko.components.register('ug-selector', {

    viewModel: class StateSelectComponentModel extends CustomInputModel {
        constructor(params) {
            super(params);
            this.inputGroup.children.push(this);


            this.handleDropDownChange = function (e) {
                this.completed();
            }
        }
    },

    template: `<div class='row' data-bind='style: {display: hidden() ? "none": "block"}'>
            <!-- ko if: params.element.label -->
                <div class='small-12 columns'>
                    <label data-bind='text: params.element.label'></label>
                </div>
            <!-- /ko -->
            <div class='small-12 columns'>
                <select data-bind='value: value, options: params.element.options, optionsCaption: "-", event:{ change: handleDropDownChange }'></select>
            </div>

            <div class='small-12 columns'>
                <!-- ko if: params.element.notes -->
                    <div data-bind='text: params.element.notes' class='input-notes overRide'></div>
                <!-- /ko -->
                <div class="error override" data-bind="text: params.element.violations()"></div>
            </div>

        </div>`, synchronous: true
});


ko.components.register('ug-textbox', {

    viewModel: class TextBoxComponentModel extends CustomInputModel {
        constructor(params) {
            super(params);

            this.inputGroup.children.push(this);
            this.figureName = ko.observable();

            this.handleChange = function (e) {

                let violations = this.enforceRules();

                if (violations.length === 0) {
                    this.params.element.violations([]);
                    this.completed();
                } else {
                    this.params.element.violations(violations);
                }

                this.completed();
            };

            this.enforceRules = function () {
                //let violations = params.element.violations();
                let violations = [];
                let rules = this.params.element;

                if (rules.minlength && this.value()) {
                    if (this.value().length < rules.minlength) {
                        violations.push("Length should be at least " + rules.minlength + " characters");
                    }
                }

                if (rules.uppercase) {
                    this.value(this.value().toUpperCase());
                }

                if (rules.lowercase) {
                    this.value(this.value().toLowerCase());
                }

                if (rules.integer && this.value()) {
                    if (isNaN(this.value())) {
                        violations.push("Should be a whole number. e.g 8, 32, 111");
                    } else {
                        this.value(parseInt(this.value()));
                    }
                }

                if (rules.decimal && this.value()) {
                    if (isNaN(this.value())) {
                        violations.push("Should be a decimal number. e.g 10.06, 123.0, 88.8");
                    } else {
                        this.value(parseFloat(this.value()));
                    }
                }

                return violations;

            }
        }
    },

    template: `<!-- ko if: params.element.maxlength <= 24 -->
            <div class='row' data-bind='style: {display: hidden() ? "none": "block"}'>

                <!-- ko if: params.element.label -->
                    <div class='small-6 columns'>
                        <label data-bind='text: params.element.label'></label>
                    </div>
                <!-- /ko -->

                <!-- ko if: params.element.maxlength -->
                    <div class='small-6 columns'>
                        <div class='body-mini textLimit right' data-bind='text: params.element.maxlength + " Characters Max."' class='input-notes overRide'></div>
                    </div>
                <!-- /ko -->
                <div class='small-12 columns'>
                    <input data-bind='textInput: value, validationElement: value, attr: params.element, event:{ change: handleChange }'/>
                </div>

                <div class='small-12 columns'>
                    <!-- ko if: params.element.notes -->
                        <div data-bind='text: params.element.notes' class='input-notes overRide'></div>
                    <!-- /ko -->
                    <div class="error override" data-bind="text: params.element.violations()"></div>
                </div>
            </div>
        <!-- /ko -->

        <!-- ko if: params.element.maxlength >= 25 -->
            <div class='row' data-bind='style: {display: hidden() ? "none": "block"}'>
                <!-- ko if: params.element.label -->
                    <div class='small-12 columns'>
                        <label data-bind='text: params.element.label'></label>
                    </div>
                <!-- /ko -->
                <div class='small-12 columns'>
                    <textarea data-bind='event:{ change: handleChange }'/>
                </div>
            </div>
        <!-- /ko -->`
    , synchronous: true
});

ko.components.register('ug-checkbox', {

    viewModel: class CheckBoxComponentModel extends CustomInputModel {
        constructor(params) {
            super(params);
            this.inputGroup.children.push(this);
            this.groupId = params.inputGroup.groupId;

            this.handleChange = function (e) {
                console.log("checkbox", this, this.value());
                this.completed();
            }
        }
    },

    template: `<div class='row' data-bind='style: {display: hidden() ? "none": "block"}'>
            <!-- ko if: params.element.label -->
                <div class='small-12 columns'>
                    <label data-bind='text: params.element.label'></label>
                </div>
            <!-- /ko -->
            <!-- ko foreach: params.element.options -->
                <div class='small-4 columns end'>
                    <input data-bind='value: value, attr:{id: $data+"-"+$parent.groupId}'
                       type='checkbox'/>
                    <label data-bind='text: $data, attr:{for: $data+"-"+$parent.groupId}, event:{ change: $parent.handleChange }'></label>
                </div>
            <!-- /ko -->

            <div class='small-12 columns'>
                <!-- ko if: params.element.notes -->
                    <div data-bind='text: params.element.notes' class='input-notes overRide'></div>
                <!-- /ko -->
                <div class="error override" data-bind="text: params.element.violations()"></div>
            </div>

        </div>`, synchronous: true
});

ko.components.register('ug-time', {

    viewModel: class TimeComponentModel extends CustomInputModel {
        constructor(params) {
            super(params);
            this.timeComponents = params.element.options;

            this.inputGroup.children.push(this);

            this.secondsSelected = ko.observable();
            this.minutesSelected = ko.observable();
            this.hoursSelected = ko.observable();

            this.sixty = Array.from({length: 59}, (x,i) => i + 1);
            this.hours = Array.from({length: 12}, (x,i) => i + 1);
            this.optionsLen = params.element.options.length;

            this.labelToObservableMapping = {
                'seconds': {observable: this.secondsSelected, options: this.sixty},
                'minutes': {observable: this.minutesSelected, options: this.sixty},
                'hours': {observable: this.hoursSelected, options: this.hours},
            };

            this.columnNumber = function () {
                return {
                    1: 'small-12 columns',
                    2: 'small-12 medium-6 columns',
                    3: 'small-12 medium-4 columns',
                    4: 'small-12 medium-4 columns'
                }[this.optionsLen];
            };

            this.handleDropDownChange = function (e) {
                console.log(e);

                // check id all time components have been filled up
                let hasEmptyComponent = this.timeComponents.find(c => {
                    let isEmpty = this[c + "Selected"]() ? false : true;
                    return isEmpty;
                });

                console.log(hasEmptyComponent);
                if (!hasEmptyComponent) {
                    let time = this.timeComponents.reduce((acc, tcomp) => {
                        acc[tcomp] = this[tcomp + "Selected"]();
                        return acc;
                    }, {});

                    this.value(time);
                    this.completed();
                } else {
                    this.value();
                }
            }

        }
    },

    template: `<div class='row' data-bind='style: {display: hidden() ? "none": "block"}'>
            <!-- ko if: params.element.label -->
                <div class='small-12 columns'>
                    <label data-bind='text: params.element.label'></label>
                </div>
            <!--/ko -->

            <!-- ko foreach: params.element.options -->
                <div data-bind="attr:{ class: $parent.columnNumber() }">
                     <select data-bind='$parent.labelToObservableMapping[$data].observable, options: $parent.labelToObservableMapping[$data].options, optionsCaption: $data, event:{ change: $parent.handleDropDownChange.bind($parent) }'></select>
                </div>
            <!-- /ko -->

            <div class='small-12 columns'>
                <!-- ko if: params.element.notes -->
                    <div data-bind='text: params.element.notes' class='input-notes overRide'></div>
                <!-- /ko -->
                <div class="error override" data-bind="text: params.element.violations()"></div>
            </div>

        </div>`, synchronous: true
});

ko.components.register('ug-date', {

    viewModel: class DateComponentModel extends CustomInputModel {
        constructor(params) {
            super(params);
            self = this;
            this.inputGroup.children.push(this);

            this.selectedDOTW = ko.observable();
            this.selectedMonth = ko.observable();
            this.selectedDay = ko.observable();
            this.selectedYear = ko.observable();

            this.groupId = this.inputGroup.groupId;

            this.month_31 = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
            this.month_30 = ['April', 'June', 'September', 'November'];
            this.month_29 = ['February'];
            this.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            this.daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            this.yearNow = new Date().getFullYear();
            this.year = Array.from(new Array((this.yearNow - 1900) + 11), (x, i) => i + (1900));

            this.day = ko.computed(function () {
                if (self.month_31.indexOf(self.selectedMonth()) != -1) return Array.from(new Array(31), (x, i) => i + 1);
                if (self.month_30.indexOf(self.selectedMonth()) != -1) return Array.from(new Array(30), (x, i) => i + 1);
                if (self.month_29.indexOf(self.selectedMonth()) != -1) return Array.from(new Array(29), (x, i) => i + 1);
                else return Array.from(new Array(31), (x, i) => i + 1);
            });

            this.optionsArry = params.element.options;
            this.optionsLen = params.element.options.length;


            this.labelToObservableMapping = {
                'month': {observable: this.selectedMonth, options: this.month},
                'day(#)': {observable: this.selectedDay, options: this.day},
                'days of the week': {observable: this.selectedDOTW, options: this.daysOfTheWeek},
                'year': {observable: this.selectedYear, options: this.year}
            };

            this.columnNumber = function (data) {
                switch (this.optionsLen) {
                    case 1:
                        return 'small-12 columns'
                        break;
                    case 2:
                        return 'small-12 medium-6 columns'
                        break;
                    case 3:
                        if (data == this.optionsArry[this.optionsArry.length - 1]) {
                            return 'small-12 columns'
                        } else {
                            return 'small-12 medium-6 columns'
                        }
                        break;
                    case 4:
                        return 'small-12 medium-6 columns end'
                        break;
                }
            }

            this.handleChange = function (e) {
                console.log("DATE!", this.selectedDOTW(), this.selectedMonth(),
                    this.selectedDay(),
                    this.selectedYear());

            }
        }
    },

    template: `<div class='row' data-bind='style: {display: hidden() ? "none": "block"}'>
            <!-- ko if: params.element.label -->
                <div class='small-12 columns'>
                    <label data-bind='text: params.element.label'></label>
                </div>
            <!-- /ko -->

            <!-- ko foreach: params.element.options -->
                <div data-bind="attr:{ class: $parent.columnNumber($data) }">
                    <select data-bind='value: $parent.labelToObservableMapping[$data].observable, options: $parent.labelToObservableMapping[$data].options, optionsCaption: $data, event:{ change: $parent.handleChange.bind($parent)}'></select>
                </div>
            <!-- /ko -->

            <div class='small-12 columns'>
                <!-- ko if: params.element.notes -->
                    <div data-bind='text: params.element.notes' class='input-notes overRide'></div>
                <!-- /ko -->
                <div class="error override" data-bind="text: params.element.violations()"></div>
            </div>

            </div>`, synchronous: true
});

ko.components.register('ug-datepicker', {

    viewModel: class DatePickerComponentModel extends CustomInputModel {
        constructor(params) {
            super(params);

            this.inputGroup.children.push(this);
            this.calIndex = params.indexInGroup();
            this.groupName = params.group.group.groupName.replace(/ /g, '');
            this.calId;
            this.caltarget;
            self = this;

            ko.bindingHandlers.getCalId = {
                init: function (element, valueAccessor, allBindings) {
                    self.calId = valueAccessor();
                }
            }

            ko.bindingHandlers.getTargetId = {
                init: function (element, valueAccessor, allBindings) {
                    self.caltarget = valueAccessor();
                    $('#' + self.calId + '').fdatepicker({
                        format: 'mm-dd-yyyy',
                        appendTo: '#' + self.caltarget + ''
                    })
                }
            }

            this.handleChange = function (e) {
                this.completed();
                //this.inputGroup.mapValues.set(this.inputGroup.params.groupId + "ug-datePicker", this.value());
                this.completed();
            }
        }
    },

    template: `<div class='row' data-bind='style: {display: hidden() ? "none": "block"}'>
        <!-- ko if: params.element.label -->
            <div class='small-12 columns'>
                <label data-bind='text: params.element.label'></label>
            </div>
        <!-- /ko -->

        <div class='small-12 columns'>
            <input data-bind="value: value, event:{ change: handleChange }, attr:{ id: 'cal_'+calIndex+''}, getCalId:  'cal_'+calIndex+''" type='text' class='span2 overRide' placeholder="mm-dd-yyyy">
        </div>

        <div class='small-12 columns'>
            <!-- ko if: params.element.notes -->
                <div data-bind='text: params.element.notes' class='input-notes cal overRide'></div>
            <!-- /ko -->
            <div class="error override" data-bind="text: params.element.violations()"></div>
        </div>

        <div class='small-12 columns'>
            <div data-bind="attr:{ id: 'calTarget_'+calIndex+''}, getTargetId: 'calTarget_'+calIndex+''"></div>
        </div>

    </div>`, synchronous: true
});

ko.components.register('ug-state-select', {

    viewModel: class StateSelectComponentModel extends CustomInputModel {
        constructor(params) {
            super(params);
            this.inputGroup.children.push(this);
            this.selectedState = ko.observable();

            this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
            this.handleDropDownChange = function (e) {
                // this.value(this.inputGroup.params.groupId+"-ugStates-"+this.selectedState());
                // this.inputGroup.mapValues.set(this.inputGroup.params.groupId + "us-state-input", this.value());
                console.log("UG-US_STATE COMPLETED: " + this.value());
                this.completed();
            }
        }
    },

    template: `<div class='row' data-bind='style: {display: hidden() ? "none": "block"}'>
            <!-- ko if: params.element.label -->
                <div class='small-12 columns'>
                    <label data-bind='text: params.element.label'></label>
                </div>
            <!-- /ko -->
            <div class='small-12 columns'>
                <select data-bind='value: value, options: states, optionsCaption: "-", event:{ change: handleDropDownChange}'></select>
            </div>

            <div class='small-12 columns'>
                <!-- ko if: params.element.notes -->
                    <div data-bind='text: params.element.notes' class='input-notes overRide'></div>
                <!-- /ko -->
                <div class="error override" data-bind="text: params.element.violations()"></div>
            </div>
        </div>`, synchronous: true
});

ko.components.register('ug-country-select', {

    viewModel: class CountrySelectComponentModel extends CustomInputModel {
        constructor(params) {
            super(params);
            this.inputGroup.children.push(this);
            this.country =
                ['Serbia', 'United States', 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Anguilla', 'Antarctica', 'Antigua And Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'England', 'Equatorial Guinea', 'Eritrea', 'Espana', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Great Britain', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and Mc Donald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Republic of', "Korea, Democratic People's Republic of", 'Kuwait', 'Kyrgyzstan', "Lao People's Democratic Republic", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Ireland', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa (Independent)', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Scotland', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'South Korea', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'USA', 'Uzbekistan', 'Vanuatu', 'Vatican City State (Holy See)', 'Venezuela', 'Viet Nam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe'];
            this.handleDropDownChange = function (e) {
                this.completed();
            }
        }
    },

    template: `<div class='row' data-bind='style: {display: hidden() ? "none": "block"}'>
            <!-- ko if: params.element.label -->
                <div class='small-12 columns'>
                    <label data-bind='text: params.element.label'></label>
                </div>
            <!-- /ko -->
            <div class='small-12 columns'>
                <select data-bind='value: value, options: country, optionsCaption: "-", event:{ change: handleDropDownChange}'></select>
            </div>

            <div class='small-12 columns'>
                <!-- ko if: params.element.notes -->
                    <div data-bind='text: params.element.notes' class='input-notes overRide'></div>
                <!-- /ko -->
                <div class="error override" data-bind="text: params.element.violations()"></div>
            </div>
        </div>`, synchronous: true
});

ko.components.register('input-group', {
    //BM: input-group viewmodel
    viewModel: function (params) {
        params.parent.groupComponents.push(this)

        this.personalization = this.parent;

        this.groupValues = {}; // {0: elementValue0, 1: elementValue1}

        this.grpParams = {
            groupId: this.groupId,
            index: params.index(),
            group: params.group,
            required: params.group.required,
            groupLen: params.groupLen,
        };

        this.groupId = params.group.uuid;
        this.children = ko.observableArray();
        this.recentlyCompleted = ko.observable();

        this.used = function () {
            var components = this.children();
            if (this.grpParams.required) {

                components.map(component => {
                    var violations = component.params.element.violations();
                    var inputRequire = component.params.element.required;
                    var options = component.params.element.options;
                    var hasValue;

                    if (component.value() == undefined || component.value() == '') {
                        hasValue = false;
                    } else {
                        hasValue = true;
                    }

                    if (component.params.element.type === 'time' || component.params.element.type === 'date') {
                        options.map(data => {
                            var hasGroupValue = component.params.element.groupHasValue();
                            if (hasGroupValue.length !== options.length && violations.length === 0) {
                                component.params.element.violations.push("This field is required.");
                            } else if (hasGroupValue.length === options.length) {
                                component.params.element.violations.remove("This field is required.");
                            }
                        })

                    } else {

                        if (inputRequire && !hasValue && violations.length === 0) {
                            component.params.element.violations.push("This field is required.");
                        } else if (hasValue) {
                            component.params.element.violations.remove("This field is required.");
                        }

                    }
                })
            }

        };

        this.countAddedChildren = function () {
            return this.children().length;
        };

        //BM: input-group - build this.customizationValues
        this.checkInInput = function (elementIndex, inputValue) {

            this.groupValues[elementIndex] = inputValue;

            this.recentlyCompleted(elementIndex);
            console.log("**** completed", inputValue);

            this.children().forEach((e, index) => e.transition());
        };

        // fix each element for that they always contain params
        this.grpParams.group.elements.forEach(component => {
            component.params = component.params ? component.params : {};
        });

    },

    template: `<div class='row' data-bind="afterGroupRender: countAddedChildren()">
            <!-- ko if: grpParams.groupLen === 1 -->
                <!-- ko foreach: grpParams.group.elements -->
                    <ug-component data-bind="attr:{name: componentName}" params='component: componentName, params: {indexInGroup: $index, element: params, group: $parent.params, inputGroup: $parent}'></ug-component>
                <!-- /ko -->
            <!-- /ko -->

            <!-- ko if: grpParams.groupLen > 1 -->
               <dl class='accordion small-12 columns' data-accordion role='tablist'>
                   <dd class='accordion-navigation'>
                       <a data-bind=' attr:{href: "#item-"+grpParams.groupId, id: "item-"+grpParams.groupId+"-heading", "data-name": grpParams.groupId}' role='tab'>
                            <span data-bind="text: grpParams.group.groupName"></span>
                            <span data-bind="text: grpParams.required ? '' : '(optional)'" class="optionalCopy"></span>
                       </a>

                       <div data-bind='attr: {id: "item-"+grpParams.groupId, "aria-labelledby": "item-"+grpParams.groupId+"-heading", class: grpParams.required ? "content active": "content" }' role='tabpanel'>
                          <!-- ko foreach: grpParams.group.elements -->
                              <ug-component data-bind="attr:{name: componentName}" params='component: componentName, params: {indexInGroup: $index, element: params, group: $parent.grpParams, inputGroup: $parent}'></ug-component>
                          <!-- /ko -->
                       </div>
                   </dd>
                 </dl>
              <!-- /ko -->
          </div>`, synchronous: true
});

ko.components.register('personalization-container', {
    viewModel: function (params) {
        this.groups = skuConfig.groups;

        //BM: build the full customization data
        // ******************************************************
        this.customizationValues = function () {
            let grpvals = this.groupComponents.reduce((acc, groupViewModel, grpIndex) => {
                //include only used groups (input is filled up)
                let keys = Object.keys(groupViewModel.groupValues);
                console.log("GROUP!", grpIndex, groupViewModel.groupValues)
                if (keys.length > 0) {
                    let inputValues = [];
                    acc[grpIndex] = {
                        groupId: groupViewModel.groupId,
                        index: grpIndex;
                    inputValues: inputValues
                }
                }

                return acc;

            }, {});

            //console.log("GROUPS!", grpvals)

            return {
                skuId: skuConfig.skuId,
                values: grpvals
            }
        };

        this.groupComponents = [];
        this.previewButton = ko.observable(false);
        this.previewUrl = ko.observable();
        this.showImage = ko.observable(false);

        if (hasPreview == true) {
            this.previewButton(true);
        }


        this.handlePreview = function (e) {
            console.log("customization", this.customizationValues());
        }

        this.handleSubmit = function (e) {
            //var groups = this.groups;
            var groupComponents = this.groupComponents;

            groupComponents.map(component => {
                var used = component.used();
            })

        }
    },

    template: `<div id='personalizationInnerContainer' class='small-10 small-centered columns'>
            <div class='row'>
                <div class='accordion small-12 columns'>
                    <h2>Enter Your Personalization</h2>
                </div>
            </div>

            <!-- ko foreach: {data: groups}  -->
                <input-group params="group: $data, index: $index, groupLen: $parent.groups.length, parent: $parent"></input-group>
            <!-- /ko -->

            <div class='row' style="padding-top: 1rem;">
            
            
                <div class='small-12 columns'>
                    <button class="urgent" data-bind="event:{ click:handleSubmit }" style="width: 100%;">add to cart</button>
                </div>
                
                <!-- ko if: previewButton  -->
                    <div class='small-12 columns'>
                        <button type="button" data-bind='event:{ click: handlePreview}' id="a2c" style="width:100%;">Preview Item</button>
                    </div>
                <!-- /ko -->

                <!-- ko if: showImage  -->
                    <div class='small-12 columns'>
                        <img data-bind='attr:{src: previewUrl}'>
                        <div data-bind='text: previewUrl'></div>
                    </div>
                <!-- /ko -->


            </div>

        </div>`, synchronous: true
});

export function render() {

    console.log("LOADED");

    ko.bindingHandlers.afterGroupRender = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var fireAfterRenderAction = (valueAccessor() === viewModel.grpParams.group.elements.length);

            if (fireAfterRenderAction) {
                if (viewModel.grpParams.group && viewModel.grpParams.group.onGroup) {
                    var fnAndArgs = viewModel.grpParams.group.onGroup.split(/\s+/);
                    var fn = Transitions[fnAndArgs[0]];
                    var onGroupFunction = fn(fnAndArgs.slice(1));
                    var groupAfterRender = onGroupFunction.bind(viewModel);

                    groupAfterRender();
                }
            }

            if (bindingContext.$data.update) bindingContext.$data.update(element, valueAccessor, allBindings, viewModel, bindingContext);
        }
    };

    ko.applyBindings();
}
