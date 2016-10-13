//Accepts 1 parameter which is the name of the xlsx file you want to parse
const XLSX = require('xlsx');
const fs = require('fs');
var file = process.argv[2];

// var workbook = XLSX.readFile('hp_mobile.xlsx');
// var sheet_name_list = workbook.SheetNames;
var dict = {};
var propsArray = [];
//var first_sheet_name = workbook.SheetNames[0];
//var worksheet = workbook.Sheets[first_sheet_name];

class MappingConfig {
    constructor() {
    }

    //replace short name ex: LF to full module name ex: large-feature-module
    getModuleType(shortName) {
        return {
            'LF': 'large-feature-module',
            'SF': 'small-feature-module',
            'BS': 'basic-story-module',
            'ES': 'extended-story-module',
            'CG': 'collection-grid-module',
            'CL': 'carousel-module',
            'TL': 'text-link-module',
            'LS': 'image-link-single-module',
            'LD': 'image-link-double-module',
            'BI': 'button-link-single-module',
            'BD': 'button-link-double-module'
        }[shortName];
    }

    //Get properties for modules
    getProperties(data) {
        this.uniqueRows.map((letter, index) => {
            var moduleShortName = this.uniqueModuleShortName[index].split('_').pop();
            var moduleType = this.getModuleType(moduleShortName);
            var props = {};

            dict[letter] = {};
            dict[letter][moduleType] = {};

            if (data[letter]) {
                switch (moduleType) {
                    case 'large-feature-module':
                        Object.keys(data[letter]).forEach((k, i) => {
                            props['item'] = data[letter][k].ITEMNUMBER;
                            props['image'] = {
                                "customImage": data[letter][k].IMAGEURL,
                                "link": data[letter][k].ITEMURL
                            };
                            props['headline'] = {
                                "text": data[letter][k].HEADLINE,
                                "link": data[letter][k].HEADLINEURL
                            };
                            props['cta'] = {
                                "text": data[letter][k].CTA,
                                "link": data[letter][k].CTAURL
                            };
                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'basic-story-module':
                        Object.keys(data[letter]).forEach((k, i) => {
                            props['item'] = data[letter][k].ITEMNUMBER;
                            props['section'] = {
                                "text": data[letter][k].SECTIONINTRO,
                                "link": data[letter][k].SECTIONINTROURL
                            };
                            props['image'] = {
                                "customImage": data[letter][k].IMAGEURL,
                                "link": data[letter][k].ITEMURL
                            };
                            props['headline'] = {
                                "text": data[letter][k].HEADLINE,
                                "link": data[letter][k].HEADLINEURL
                            };
                            props['cta'] = {
                                "text": data[letter][k].CTA,
                                "link": data[letter][k].CTAURL
                            };
                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'extended-story-module':
                        Object.keys(data[letter]).forEach((k, i) => {
                            props['item'] = data[letter][k].ITEMNUMBER;
                            props['image'] = {
                                "customImage": data[letter][k].IMAGEURL,
                                "link": data[letter][k].ITEMURL
                            };
                            props['section'] = {
                                "text": data[letter][k].SECTIONINTRO,
                                "link": data[letter][k].SECTIONINTROURL
                            };
                            props['headline'] = {
                                "text": data[letter][k].HEADLINE,
                                "link": data[letter][k].HEADLINEURL
                            };
                            props['cta'] = {
                                "text": data[letter][k].CTA,
                                "link": data[letter][k].CTAURL
                            };
                            props['copy'] = {
                                "text": data[letter][k].COPY,
                                "link": data[letter][k].COPYURL
                            };
                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'collection-grid-module':
                        props['section'] = {
                            "text": data[letter][0].SECTIONINTRO,
                            "link": data[letter][0].SECTIONINTROURL
                        };
                        props['headline'] = {
                            "text": data[letter][0].HEADLINE,
                            "link": data[letter][0].HEADLINEURL
                        };
                        props['cta'] = {
                            "text": data[letter][0].CTA,
                            "link": data[letter][0].CTAURL
                        };
                        props['sections'] = [];
                        var itemNumber = data[letter][0].ITEMNUMBER.replace(/\r?\n|\r/g, "").split(',');
                        var itemUrl = data[letter][0].ITEMURL.replace(/\r?\n|\r/g, "").split(',');
                        var imageUrl = data[letter][0].IMAGEURL.replace(/NA/g, "").replace(/\r?\n|\r/g, "").split(',');

                        itemNumber.map((item, i) => {
                            props['sections'].push(
                                {
                                    'item': item,
                                    'image': {
                                        'customImage': imageUrl[i],
                                        'link': itemUrl[i]
                                    }
                                }
                            )
                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'carousel-module':
                        props['section'] = {
                            "text":data[letter][0].SECTIONINTRO,
                            "link": data[letter][0].SECTIONINTROURL
                        };
                        props['headline'] = {
                            "text": data[letter][0].HEADLINE,
                            "link": data[letter][0].HEADLINEURL
                        };
                        props['cta'] = {
                            "text": data[letter][0].CTA,
                            "link": data[letter][0].CTAURL
                        };
                        props['sections'] = [];

                        var itemNumber = data[letter][0].ITEMNUMBER.replace(/\r?\n|\r/g, "").split(',');
                        var itemUrl = data[letter][0].ITEMURL.replace(/\r?\n|\r/g, "").split(',');
                        var imageUrl = data[letter][0].IMAGEURL.replace(/NA/g, "").replace(/\r?\n|\r/g, "").split(',');

                        itemNumber.map((item, i) => {
                            props['sections'].push(
                                {
                                    'item': item,
                                    'image': {
                                        "customImage": imageUrl[i],
                                        "link": itemUrl[i]
                                    }
                                }
                            )
                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'text-link-module':
                        props['section'] = {
                            "text": data[letter][0].SECTIONINTRO,
                            "link": data[letter][0].SECTIONINTROURL
                        };
                        props['sections'] = [];

                        Object.keys(data[letter]).forEach((k, i) => {
                            var cta = data[letter][k].CTA.replace(/\r?\n|\r/g, "").split(',');
                            var ctaUrl = data[letter][k].CTAURL.replace(/\r?\n|\r/g, "").split(',');
                            var ctaLeft = [];
                            var ctaRight = [];

                            cta.map((item, i) => {
                                if (i % 2 == 0) {
                                    ctaLeft.push( [cta[i], ctaUrl[i]] );
                                } else {
                                    ctaRight.push( [cta[i], ctaUrl[i]] );
                                }
                            });

                            ctaLeft.map((item, i) => {
                                props['sections'].push(
                                    {
                                        'ctaLeft': {
                                            'text': item[0],
                                            'link': item[1]
                                        },
                                        'ctaRight': {
                                            'text': ctaRight[i][0],
                                            'link': ctaRight[i][1]
                                        }
                                    }
                                )
                            });

                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'image-link-single-module':
                        Object.keys(data[letter]).forEach((k, i) => {
                            props['item'] = data[letter][k].ITEMNUMBER;
                            props['section'] = {
                                "text": data[letter][k].SECTIONINTRO,
                                "link": data[letter][k].SECTIONINTROURL
                            };
                            props['image'] = {
                                "text": data[letter][k].IMAGEURL,
                                "link": data[letter][k].ITEMURL
                            };
                            props['cta'] = {
                                "text": data[letter][k].CTA,
                                "link": data[letter][k].CTAURL
                            };
                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'image-link-double-module':
                        props['section'] = {
                            "text": data[letter][0].SECTIONINTRO,
                            "link": data[letter][0].SECTIONINTROURL
                        };
                        props['sections'] = [];
                        Object.keys(data[letter]).forEach((k, i) => {
                            props['sections'].push(
                                {
                                    'item': data[letter][k].ITEMNUMBER,
                                    'image': {
                                        'customImage': data[letter][k].IMAGEURL,
                                        'link': data[letter][k].ITEMURL
                                    },
                                    'cta': {
                                        'text': data[letter][k].CTA,
                                        'link': data[letter][k].CTAURL
                                    }
                                }
                            )
                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'button-link-single-module':
                        props['section'] = {
                            "text": data[letter][0].SECTIONINTRO,
                            "link": data[letter][0].SECTIONINTROURL
                        };
                        props['sections'] = [];
                        Object.keys(data[letter]).forEach((k, i) => {
                            props['sections'].push(
                                {
                                    'item': data[letter][k].ITEMNUMBER,
                                    'image': {
                                        'customImage': data[letter][k].IMAGEURL,
                                        'link': data[letter][k].ITEMURL
                                    },
                                    'cta': {
                                        'text': data[letter][k].CTA,
                                        'link': data[letter][k].CTAURL
                                    }
                                }
                            )
                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'button-link-double-module':
                        props['section'] = {
                            "text": data[letter][0].SECTIONINTRO,
                            "link": data[letter][0].SECTIONINTROURL
                        };
                        props['sections'] = [];
                        Object.keys(data[letter]).forEach((k, i) => {
                            props['sections'].push(
                                {
                                    'item': data[letter][k].ITEMNUMBER,
                                    'image': {
                                        'customImage': data[letter][k].IMAGEURL,
                                        'link': data[letter][k].ITEMURL
                                    },
                                    'cta': {
                                        'text': data[letter][k].CTA,
                                        'link': data[letter][k].CTAURL
                                    }
                                }
                            )
                        })
                        dict[letter][moduleType] = props;
                    break;

                    case 'small-feature-module':
                        props['section'] = {
                            "text": data[letter][0].SECTIONINTRO,
                            "link": data[letter][0].SECTIONINTROURL
                        };
                        props['sections'] = [];
                        Object.keys(data[letter]).forEach((k, i) => {
                            props['sections'].push(
                                {
                                    'item': data[letter][k].ITEMNUMBER,
                                    'image': {
                                        'customImage': data[letter][k].IMAGEURL,
                                        'link': data[letter][k].ITEMURL
                                    },
                                    'headline': {
                                        'text': data[letter][k].HEADLINE,
                                        'link': data[letter][k].HEADLINEURL
                                    },
                                    'cta': {
                                        'text': data[letter][k].CTA,
                                        'link': data[letter][k].CTAURL
                                    }
                                }
                            )
                        })
                        dict[letter][moduleType] = props;
                    break;
                }
            }
        })
    }

    //Removes duplicates if same letter appears more than once consecutively
    reducerFilter(acc, xs) {
      xs.map((item, index)=> {
          if (xs[index] === xs[index+1]) {
          } else {
              acc.push(item);
          }
      })
      return acc;
    }

    //replaces NA value to an empty string
    filterData(data) {
        // var emptyObj = Object.keys(data)[Object.keys(data).length-1];
        // delete data[emptyObj];
        var propsObj = {};
        var moduleTypeArray = [];

        //Gets data properties for each module
        this.uniqueRows.map(alphaChar => {
            propsObj[alphaChar] = [];
            Object.keys(data).forEach((k, i) => {
                Object.keys(data[k]).forEach((key, index) => {
                    if (typeof data[k][key] === 'string' && data[k][key] === 'NA') {
                        data[k][key] = data[k][key].replace("NA", "");
                    }
                })

                if (alphaChar == data[k].MODULETYPE.charAt(0)) {
                    //console.log(data[k]);
                    propsObj[alphaChar].push(data[k]);
                }
            })
        })
        this.getProperties(propsObj);
        this.createJson(dict);
    }

    //Creates JSON data to add to home page to dynamically generate the modules
    createJson(obj) {
      var outputFilename = __dirname+'/mappingOrder.json';

      fs.writeFile(outputFilename, JSON.stringify(obj, null, 4), function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("JSON saved to " + outputFilename);
          }
      });
    }

    //Reads xlsx file and gets values from each cell
    read(file) {
      var workbook = XLSX.readFile(file);
      var sheet_name_list = workbook.SheetNames;
      var data = {};
      var letters = [];
      var moduleShortNameArray = [];
      sheet_name_list.forEach(function(y) {
          var worksheet = workbook.Sheets[y];
          var headers = [];

          var column = 0;
          var enc_addr = XLSX.utils.encode_cell;
          var dec_range = XLSX.utils.decode_range;
          var range = dec_range(worksheet['!ref']);

          while (worksheet[enc_addr({c: column, r: 0})]) {
              headers.push((worksheet[enc_addr({c: column, r: 0})].v).replace(/ +/g, ""));
              column++
          }

          for (var R = range.s.r +1; R <= range.e.r; ++R) {

              var record = [];

              data['row'+R] = {};
              for (var C = range.s.c; C <= headers.length-1; ++C) {
                  let cell_address = enc_addr({c: C, r: R});
                  let cell = worksheet[cell_address];

                  if (cell && typeof cell.v !== 'undefined') {
                      var header = headers[R-1];
                      var value = cell.v;
                      record.push(value);
                      headers.map((header, index) => {
                          data["row"+R][header] = record[index];
                      })
                  }
              }
            moduleShortNameArray.push(record[0].split('_').pop());
            letters.push(record[0].charAt(0));

          }
      });

      this.uniqueRows = this.reducerFilter([], letters);
      this.uniqueModuleShortName = this.reducerFilter([], moduleShortNameArray);
      this.filterData(data);
    }
}

const mapping = new MappingConfig();
mapping.read(file);
