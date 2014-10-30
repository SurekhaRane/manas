var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var ScreenFourLayout, UnitMainView, UnitTypeChildView, UnitTypeView, UnitsView, agreementValue, agreementValue1, infraid, object, perFlag;
  perFlag = 0;
  object = "";
  agreementValue = "";
  agreementValue1 = "";
  infraid = "";
  ScreenFourLayout = (function(_super) {
    __extends(ScreenFourLayout, _super);

    function ScreenFourLayout() {
      return ScreenFourLayout.__super__.constructor.apply(this, arguments);
    }

    ScreenFourLayout.prototype.template = '<div class="page-container row-fluid"> <div id="vs-container" class="vs-container flatContainer"> <header class="vs-header" id="unitblock-region"> </header> <div  id="mainunit-region"> </div> <div class="h-align-middle"> <!--<a class="btn btn-primary m-t-20 m-b-20 h-align-middle remove" ><span class="glyphicon glyphicon-heart"></span> Add to Wishlist</a>--> <!--<div class="alert alert-success alert-dismissible hide" role="alert" id="errormsg"></div>--> </div> <div class="step4Actions"> <div class="grid-container"> <div class="grid-block-4"> <a class="grid-link remove" name="list" id="list"> <h3 class="m-t-0 m-b-0"><span class="skyicon sky-heart"></span></h3> <h4 class="m-t-0 m-b-0">Add to Wishlist</h4> </a> </div> <div class="grid-block-4"> <a class="grid-link print-preview"> <h3 class="m-t-0 m-b-0"><span class="sky-printer"></span></h3> <h4 class="m-t-0 m-b-0">Print</h4> </a> </div> <div class="grid-block-4"> <a class="grid-link"> <h3 class="m-t-0 m-b-0"><span class="sky-mail"></span></h3> <h4 class="m-t-0 m-b-0">Email</h4> </a> </div> <div class="grid-block-4 costsheetbutton" > <a class="grid-link" data-remodal-target="modal"> <h3 class="m-t-0 m-b-0"><span class="sky-coin"></span></h3> <h4 class="m-t-0 m-b-0">Cost Sheet</h4> </a> </div> </div> </div> </div> </div> <div class="remodal" data-remodal-id="modal"> <div id="invoice" class="paid"> <div class="this-is"> <h3 class="light">Estimated Cost for Flat No. <span class="text-primary flatno"></span> in <span class="text-primary building"></span></h3> </div><!-- invoice headline --> <header id="header"> <div class="invoice-intro"> <div class="row"> <div class="col-sm-5"> <h5>Prepared for:</h5> <input type="text" id="" value="" class="form-control" placeholder="Customer Name"/> </div> <div class="col-sm-5"> <h5>Prepared by:</h5> <h4 class="preparedby"></h4> </div> <div class="col-sm-2"> <h5>Prepared on:</h5> <h4 class="preparedon"></h4> </div> </div> <!--<h2 class="medium m-t-0 m-b-5 text-primary">Skyi</h2> <p class="italic">Tagline comes here</p>--> </div> <div class="paymentDetails"> <div class="row"> <div class="col-sm-6"> <h5 >Total Cost:</h5> <h4><span class="totalcost" data-a-sign="Rs. " data-d-group="2"></span></h4> </div> <div class="col-sm-6"> <h5 >Amount Receivable as on Date:</h5> <h4><span class="rec" data-a-sign="Rs. " data-d-group="2"></span></h4> </div> </div> <div class="row"> <div class="col-sm-6"> <h5>Current Milestone:</h5> <h4> <span class="currentmile"></span></h4> </div> <div class="col-sm-6 form-inline"> <h5>Actual Payment:</h5> <input type="text" class="form-control"  id="payment" value="0"/> <span class="glyphicon glyphicon-plus discountToggle"></span> </div> </div> <div class="row"> <div class="col-sm-6 form-inline"> <h5>Payment Plan: </h5> <select id="paymentplans" class="form-control"> {{#paymentplans}} <option value="{{id}}">{{name}}</option> {{/paymentplans}} </select> </div> <div class="col-sm-6 form-inline"> <div class="discountBox"> <h5>Discount Type:</h5> <label class="checkbox-inline"> <input type="radio" class="radioClass" id="radio1"  checked name="discountradio" value="1"/> Value </label> <label class="checkbox-inline"> <input type="radio" class="radioClass" name="discountradio" value="2"/> Percentage </label> <br> <h5>Discount Amount:</h5> <input type="text" id="discountvalue" value="" class="numeric form-control" /> <input type="text" id="discountper" value="" class="numeric hidden form-control" /> <br> <h5>Add On Payment: </h5><h4><span class="addonpay" data-v-min="-9999999999999999.99"data-a-sign="Rs. " data-d-group="2"></span></h4> </div> </div> </div> </div> </header><!-- e: invoice header --> <section class="invoice-financials"> <div class="invoice-items"> <div id="costSheetTable"> </div> <!--<table id="costSheetTable"> <caption>Your Invoice</caption> <thead> <tr> <th>Item &amp; Description</th> <th>Quantity</th> <th>Price (GPL)</th> </tr> </thead> <tbody> </tbody> </table>--> </div> <div class="invoice-items"> <h4 class="text-primary">Payment Schedule</h4> <ul id="paymentTable"> </ul> </div><!-- e: invoice items --> </section><!-- e: invoice financials --> </div><!-- e: invoice --> </div>';

    ScreenFourLayout.prototype.regions = {
      unitRegion: '#unitblock-region',
      mainRegion: '#mainunit-region'
    };

    ScreenFourLayout.prototype.events = function() {
      return {
        'click #list': function(e) {
          var cart, cookieOldValue, imgclone, imgtodrag, key, myModal;
          myModal = new jBox('Notice', {
            content: '',
            autoClose: 2000,
            addClass: 'notifyBox',
            position: {
              x: 'center',
              y: 'top'
            },
            animation: {
              open: 'slide:top',
              close: 'slide:top'
            }
          });
          $("#showRightPush").removeClass("hidden");
          cookieOldValue = $.cookie("key");
          if (cookieOldValue === void 0 || $.cookie("key") === "") {
            cookieOldValue = "";
          } else {
            cookieOldValue = $.cookie("key").split(',').map(function(item) {
              return parseInt(item);
            });
          }
          if (cookieOldValue.length >= 4) {
            myModal.setContent("Cannot add more than 4 units");
            return false;
          } else {
            key = $.inArray(parseInt(App.unit['name']), cookieOldValue);
            if (parseInt(key) === -1) {
              App.cookieArray.push(parseInt(App.unit['name']));
              $('#list').addClass("remove");
            } else {
              myModal.setContent("Already entered");
              $('#list').removeClass("remove");
              return false;
            }
            App.cookieArray = $.merge(App.cookieArray, cookieOldValue);
            App.cookieArray = _.uniq(App.cookieArray);
            $.cookie('key', App.cookieArray);
            localStorage.setItem("cookievalue", App.cookieArray);
            myModal.setContent("The selected flat has been added to your WishList");
          }
          cart = $("#showRightPush");
          imgtodrag = $('.remove').find(".skyicon");
          if (imgtodrag) {
            imgclone = imgtodrag.clone().offset({
              top: imgtodrag.offset().top,
              left: imgtodrag.offset().left
            }).css({
              opacity: "0.8",
              position: "absolute",
              color: "#ff6600",
              "font-size": "30px",
              "z-index": "100"
            }).appendTo($("body")).animate({
              top: cart.offset().top + 10,
              left: cart.offset().left + 80,
              width: 50,
              height: 50
            }, 1200, "easeInOutCubic");
            imgclone.animate({
              width: 0,
              height: 0
            }, function() {
              $(this).detach();
            });
          }
          $('#list').removeClass("remove");
          return this.showWishList();
        },
        'click .del': function(e) {
          var body, index, menuRight, menuTop, showRightPush, showTop, val;
          val = $('#' + e.target.id).attr('data-id');
          index = App.cookieArray.indexOf(parseInt(val));
          App.cookieArray.splice(index, 1);
          if (App.cookieArray.length <= 1) {
            $('#compare').hide();
          }
          $.cookie('key', App.cookieArray);
          localStorage.setItem("cookievalue", App.cookieArray);
          if (App.cookieArray.length < 1) {
            console.log("eeeeeeeeeeeee");
            menuRight = document.getElementById("cbp-spmenu-s2");
            menuTop = document.getElementById("cbp-spmenu-s3");
            showTop = document.getElementById("showTop");
            showRightPush = document.getElementById("showRightPush");
            body = document.body;
            classie.toggle(showRightPush, "active");
            classie.toggle(body, "cbp-spmenu-push-toleft");
            classie.toggle(menuRight, "cbp-spmenu-open");
          }
          return this.showWishList();
        },
        'click a': function(e) {
          return e.preventDefault();
        },
        'click .selectedunit': function(e) {
          var body, buildingModel, floorriserange, i, menuRight, menuTop, rangeArrayVal, rangeModel, showRightPush, showTop, unitModel;
          menuRight = document.getElementById("cbp-spmenu-s2");
          menuTop = document.getElementById("cbp-spmenu-s3");
          showTop = document.getElementById("showTop");
          showRightPush = document.getElementById("showRightPush");
          body = document.body;
          classie.toggle(showRightPush, "active");
          classie.toggle(body, "cbp-spmenu-push-toleft");
          classie.toggle(menuRight, "cbp-spmenu-open");
          App.unit['name'] = $('#' + e.target.id).attr('data-id');
          App.unit['flag'] = 1;
          unitModel = App.master.unit.findWhere({
            id: parseInt($('#' + e.target.id).attr('data-id'))
          });
          App.defaults['unitType'] = unitModel.get('unitType');
          App.defaults['building'] = unitModel.get('building');
          rangeModel = App.master.range;
          App.backFilter['screen3'].push("floor");
          App.backFilter['screen2'].push("floor", "unitVariant");
          buildingModel = App.master.building.findWhere({
            id: unitModel.get('building')
          });
          floorriserange = buildingModel.get('floorriserange');
          rangeArrayVal = [];
          i = 0;
          object = this;
          $.each(floorriserange, function(index, value) {
            var end, start;
            start = parseInt(value.start);
            end = parseInt(value.end);
            while (parseInt(start) <= parseInt(end)) {
              rangeArrayVal[i] = start;
              start = parseInt(start) + 1;
              i++;
            }
            rangeArrayVal;
            if (jQuery.inArray(parseInt(unitModel.get('floor')), rangeArrayVal) >= 0) {
              return App.defaults['floor'] = rangeArrayVal.join(',');
            }
          });
          msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
          return msgbus.showApp('screen:four').insideRegion(App.layout.screenFourRegion).withOptions();
        },
        'click .print-preview': function(e) {
          return $('a.print-preview').printPreview();
        }
      };
    };

    ScreenFourLayout.prototype.onShow = function() {
      var capability, cookieOldValue, costSheetArray, count, flag, scr, usermodel;
      $(".discountToggle").click(function() {
        $(".discountBox").slideToggle();
      });
      usermodel = new Backbone.Model(USER);
      capability = usermodel.get('all_caps');
      if (usermodel.get('id') !== "0" && $.inArray('see_cost_sheet', capability) >= 0) {
        true;
      } else {
        $('.costsheetbutton').hide();
      }
      $(document).on('open', '.remodal', function() {
        $('.radioClass').on('click', function() {
          if (parseInt($('input[name=discountradio]:checked').val()) === 1) {
            $('#discountvalue').removeClass("hidden");
            $('#discountper').addClass("hidden");
            return perFlag = 1;
          } else {
            $('#discountvalue').addClass("hidden");
            $('#discountper').removeClass("hidden");
            return perFlag = 2;
          }
        });
        $('#discountvalue').on('change', function() {
          perFlag = 1;
          return object.generateCostSheet();
        });
        $('#discountper').on('change', function() {
          perFlag = 2;
          return object.generateCostSheet();
        });
        $('#payment').on('change', function() {
          return object.generateCostSheet();
        });
        $('#paymentplans').on('change', function() {
          var id;
          id = $('#' + this.id).val();
          return object.generatePaymentSchedule(id);
        });
        $('#infra').on('change', function() {
          infraid = $('#infra').val();
          return object.updated();
        });
        $('#infra1').on('change', function() {
          infraid = $('#infra').val();
          return object.updated();
        });
        return $('.numeric').on('keypress', function(e) {
          var keyCode, ret;
          keyCode = e.keyCode;
          ret = (keyCode >= 48 && keyCode <= 57) || keyCode === 46;
          return ret;
        });
      });
      scr = document.createElement('script');
      scr.src = '../wp-content/themes/apartmentselector/js/src/preload/jquery.remodal.js';
      document.body.appendChild(scr);
      $('html, body').delay(600).animate({
        scrollTop: $('#screen-four-region').offset().top
      }, 'slow');
      cookieOldValue = $.cookie("key");
      if (cookieOldValue === void 0 || $.cookie("key") === "") {
        cookieOldValue = [];
      } else {
        cookieOldValue = $.cookie("key").split(',').map(function(item) {
          return parseInt(item);
        });
      }
      App.cookieArray = cookieOldValue;
      this.showWishList();
      object = this;
      this.generateCostSheet();
      perFlag = "";
      costSheetArray = [];
      flag = 0;
      return count = 0;
    };

    ScreenFourLayout.prototype.showWishList = function() {
      var building, element, model, selectedUnitsArray, table, unitType, unitVariant, _i, _len;
      table = "";
      if ($.cookie("key") !== void 0 && $.cookie("key") !== "") {
        selectedUnitsArray = $.cookie("key").split(",");
        if (selectedUnitsArray.length > 1) {
          $('#compare').show();
        }
        table = "";
        for (_i = 0, _len = selectedUnitsArray.length; _i < _len; _i++) {
          element = selectedUnitsArray[_i];
          model = App.master.unit.findWhere({
            id: parseInt(element)
          });
          unitType = App.master.unit_type.findWhere({
            id: model.get('unitType')
          });
          unitVariant = App.master.unit_variant.findWhere({
            id: model.get('unitVariant')
          });
          building = App.master.building.findWhere({
            id: model.get('building')
          });
          table += '<li> <a href="#" id="unit' + element + '" data-id="' + element + '"  class="selectedunit">' + model.get('name') + '</a> <a href="#" class="del" id="' + element + '" data-id="' + element + '"  ></a> <div class="clearfix"></div> </li>';
        }
      }
      return $('#showWishlist').html(table);
    };

    ScreenFourLayout.prototype.onShowCostSheet = function(value) {
      var element, facingModel, facingModelArray, facingssArray, units, viewModel, viewModelArray, viewsArray, _i, _j, _len, _len1;
      units = App.master.unit.findWhere({
        id: parseInt(App.unit['name'])
      });
      this.generateCostSheet();
      viewModelArray = [];
      facingModelArray = [];
      units.set('views_name', value.views);
      if (value.views.length !== 0) {
        viewsArray = value.views;
        for (_i = 0, _len = viewsArray.length; _i < _len; _i++) {
          element = viewsArray[_i];
          viewModel = App.master.view.findWhere({
            id: parseInt(element)
          });
          viewModelArray.push(viewModel.get('name'));
        }
      } else {
        viewModelArray.push('-----');
      }
      $('.viewclass').text(viewModelArray.join(', '));
      facingssArray = value.facings;
      units.set('facing_name', value.facings);
      if (facingssArray.length !== 0) {
        for (_j = 0, _len1 = facingssArray.length; _j < _len1; _j++) {
          element = facingssArray[_j];
          facingModel = App.master.facings.findWhere({
            id: parseInt(element)
          });
          facingModelArray.push(facingModel.get('name'));
        }
      } else {
        facingModelArray.push('-----');
      }
      units = App.master.unit.findWhere({
        id: parseInt(App.unit['name'])
      });
      return $('.facingclass').text(facingModelArray.join(', '));
    };

    ScreenFourLayout.prototype.generateCostSheet = function() {
      var SettingModel, addon, agreement, agreement1, basicCost, basicCost1, buildingModel, costSheetArray, count, date, discount, element, finalcost, finalcost1, floorRise, floorRiseValue, id, id1, index, infraArray, infratxt, maintenance, membership_fees, membership_feesColl, membershipfees, milesotneVal, milestoneColl, milestoneCollection, milestonemodel, milestonename, milestones, milestonesArray, milestonesArrayColl, milestoneselectedValue, milstoneModelName, paymentColl, percentageValue, pervalue, planselectedValue, ratePerSqFtPrice, reccount, recount, reg_amt, reg_amt1, revisedrate, sales_tax, sales_tax1, selected, stamp_duty, stamp_duty1, table, totalcost, totalcost1, uniVariantModel, unitModel, unitTypeMemeber, unitVariantMemeber, unitVariantMemeberColl, univariantmem, usermodel, vat, vat1, _i, _j, _len, _len1;
      $('#costSheetTable').text("");
      costSheetArray = [];
      usermodel = new Backbone.Model(USER);
      $('.preparedby').text(usermodel.get('display_name'));
      date = new Date();
      $('.preparedon').text(date.getDate() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getFullYear());
      unitModel = App.master.unit.findWhere({
        id: parseInt(App.unit['name'])
      });
      $('.flatno').text(unitModel.get('name'));
      uniVariantModel = App.master.unit_variant.findWhere({
        id: unitModel.get('unitVariant')
      });
      costSheetArray.push(uniVariantModel.get('sellablearea'));
      costSheetArray.push(unitModel.get('persqftprice'));
      discount = 0;
      if (perFlag === 1) {
        discount = ((parseFloat(uniVariantModel.get('sellablearea')) * parseFloat(unitModel.get('persqftprice'))) - parseFloat($('#discountvalue').val())) / parseFloat(uniVariantModel.get('sellablearea'));
      } else if (perFlag === 2) {
        pervalue = parseFloat($('#discountper').val()) / 100;
        discount = parseFloat(unitModel.get('persqftprice')) * parseFloat(pervalue);
      }
      discount = Math.ceil(discount.toFixed(2));
      buildingModel = App.master.building.findWhere({
        id: unitModel.get('building')
      });
      floorRise = buildingModel.get('floorrise');
      floorRiseValue = floorRise[unitModel.get('floor')];
      ratePerSqFtPrice = parseFloat(costSheetArray[1]) + parseFloat(floorRiseValue);
      revisedrate = parseFloat(ratePerSqFtPrice) - (parseFloat(discount));
      costSheetArray.push(revisedrate);
      basicCost = parseFloat(uniVariantModel.get('sellablearea')) * parseFloat(revisedrate);
      costSheetArray.push(basicCost);
      costSheetArray.push(discount);
      table = "";
      $('.building').text(buildingModel.get('name'));
      planselectedValue = buildingModel.get('payment_plan');
      milestoneselectedValue = buildingModel.get('milestone');
      $("#paymentplans option[value=" + planselectedValue + "]").prop('selected', true);
      id1 = $('#paymentplans').val();
      maintenance = parseFloat(uniVariantModel.get('sellablearea')) * 100;
      SettingModel = new Backbone.Model(SETTINGS);
      stamp_duty = (basicCost * (parseFloat(SettingModel.get('stamp_duty')) / 100)) + 110;
      reg_amt = parseFloat(SettingModel.get('registration_amount'));
      vat = basicCost * (parseFloat(SettingModel.get('vat')) / 100);
      sales_tax = basicCost * (parseFloat(SettingModel.get('sales_tax')) / 100);
      infraArray = SettingModel.get('infrastructure_charges');
      membership_fees = SettingModel.get('membership_fees');
      membership_feesColl = new Backbone.Collection(membership_fees);
      unitTypeMemeber = membership_feesColl.findWhere({
        unit_type: parseInt(unitModel.get('unitType'))
      });
      if (unitTypeMemeber.get('membership_fees') === 0) {
        unitVariantMemeber = unitTypeMemeber.get('unit_variant');
        unitVariantMemeberColl = new Backbone.Collection(unitVariantMemeber);
        univariantmem = unitVariantMemeberColl.findWhere({
          unit_variant: parseInt(unitModel.get('unitVariant'))
        });
        membershipfees = univariantmem.get('membership_fees');
      } else {
        membershipfees = unitTypeMemeber.get('membership_fees');
      }
      infratxt = '';
      for (index = _i = 0, _len = infraArray.length; _i < _len; index = ++_i) {
        element = infraArray[index];
        selected = "";
        if (parseInt(element) === infraid) {
          selected = "selected";
        } else {
          selected = "";
        }
        infratxt += '<option value="' + element + '" ' + selected + '>' + element + '</option>';
      }
      basicCost1 = parseFloat(costSheetArray[0]) * parseFloat(costSheetArray[1]);
      table += '<div class="costsRow totals title"> <div class="costCell costName">Cost Type</div> <div class="costCell discCol showDisc">Base Rate <span class="cost-uniE600"></span></div> <div class="costCell">Discounted Rate <span class="cost-uniE600"></span></div> </div> <h5 class="headers"><span class="cost-office"></span> Skyi Costs</h5> <div class="costsRow"> <div class="costCell costName">Chargeable Area (Sq.Ft.)</div> <div class="costCell discCol showDisc">' + costSheetArray[0] + '</div> <div class="costCell">' + costSheetArray[0] + '</div> </div> <div class="costsRow"> <div class="costCell costName">Floorrise</div> <div class="costCell discCol showDisc">' + floorRiseValue + '</div> <div class="costCell">' + floorRiseValue + '</div> </div> <div class="costsRow"> <div class="costCell costName">Rate per Sq.Ft.</div> <div class="costCell discCol showDisc ratepersqft" data-a-sign="Rs. " data-d-group="2">' + costSheetArray[1] + '</div> <div class="costCell ratepersqft" data-a-sign="Rs. " data-d-group="2">' + costSheetArray[1] + '</div> </div> <div class="costsRow"> <div class="costCell costName">Revised Rate</div> <div class="costCell discCol showDisc ">--</div> <div class="costCell revisedrate" data-a-sign="Rs. " data-d-group="2">' + costSheetArray[2] + '</div> </div> <div class="costsRow"> <div class="costCell costName">Basic Cost</div> <div class="costCell discCol showDisc basicCost1" data-a-sign="Rs. " data-d-group="2">' + basicCost1 + '</div> <div class="costCell basicCost" data-a-sign="Rs. " data-d-group="2">' + basicCost + '</div> </div> <div class="costsRow"> <div class="costCell costName">Infrastructure and Developement Charges</div> <div class="costCell discCol showDisc"><select id="infra1"></select></div> <div class="costCell"><select id="infra"></select></div> </div>';
      $('#costSheetTable').append(table);
      $('#infra').append(infratxt);
      $('#infra1').append(infratxt);
      $('.ratepersqft').autoNumeric('init');
      $('.ratepersqft').autoNumeric('set', costSheetArray[1]);
      $('.revisedrate').autoNumeric('init');
      $('.revisedrate').autoNumeric('set', costSheetArray[2]);
      $('.basicCost1').autoNumeric('init');
      $('.basicCost1').autoNumeric('set', basicCost1);
      $('.basicCost').autoNumeric('init');
      $('.basicCost').autoNumeric('set', basicCost);
      $('.addonpay').autoNumeric('init');
      table = "";
      agreement1 = parseFloat(basicCost1) + parseFloat($('#infra').val());
      agreementValue1 = agreement1;
      agreement = parseFloat(basicCost) + parseFloat($('#infra').val());
      agreementValue = agreement;
      stamp_duty1 = (basicCost1 * (parseFloat(SettingModel.get('stamp_duty')) / 100)) + 110;
      reg_amt1 = parseFloat(SettingModel.get('registration_amount'));
      vat1 = basicCost1 * (parseFloat(SettingModel.get('vat')) / 100);
      sales_tax1 = basicCost1 * (parseFloat(SettingModel.get('sales_tax')) / 100);
      totalcost1 = parseFloat(agreement1) + parseFloat(stamp_duty1) + parseFloat(reg_amt1) + parseFloat(vat1) + parseFloat(sales_tax1);
      finalcost1 = parseFloat(totalcost1) + parseFloat(maintenance);
      paymentColl = new Backbone.Collection(PAYMENTPLANS);
      milestones = paymentColl.get(parseInt($('#paymentplans').val()));
      milestonesArray = milestones.get('milestones');
      milestonesArrayColl = new Backbone.Collection(milestonesArray);
      milestonemodel = milestonesArrayColl.findWhere({
        'milestone': parseInt(buildingModel.get('milestone'))
      });
      milestonesArray = milestonesArray.sort(function(a, b) {
        return parseInt(a.sort_index) - parseInt(b.sort_index);
      });
      milestoneCollection = new Backbone.Collection(MILESTONES);
      if (milestonemodel === void 0) {
        milesotneVal = _.first(milestonesArray);
        milestonemodel = milestonesArrayColl.findWhere({
          'milestone': parseInt(milesotneVal.milestone)
        });
        milestonename = milestoneCollection.get(parseInt(milestonemodel.get('milestone')));
        $('.currentmile').text(milestonename.get('name'));
      } else {
        milstoneModelName = milestoneCollection.get(milestonemodel.get('milestone'));
        $('.currentmile').text(milstoneModelName.get('name'));
      }
      milestoneColl = new Backbone.Collection(MILESTONES);
      count = 0;
      for (_j = 0, _len1 = milestonesArray.length; _j < _len1; _j++) {
        element = milestonesArray[_j];
        if (element.sort_index <= milestonemodel.get('sort_index')) {
          percentageValue = agreement * ((parseFloat(element.payment_percentage)) / 100);
          count = count + percentageValue;
        }
      }
      if (parseInt($('#payment').val()) === 0) {
        addon = 0;
      } else {
        addon = parseFloat($('#payment').val()) - parseFloat(count);
      }
      totalcost = parseFloat(agreement) + parseFloat(stamp_duty) + parseFloat(reg_amt) + parseFloat(vat) + parseFloat(sales_tax);
      finalcost = parseFloat(totalcost) + parseFloat(maintenance);
      $('.totalcost').text(totalcost);
      $('.rec').autoNumeric('init');
      recount = $('.rec').autoNumeric('set', count);
      reccount = recount.text();
      $('.rec').text(reccount);
      table += '  <div class="costsRow totals"> <div class="costCell costName">Agreement Amount</div> <div class="costCell discCol showDisc"><span id="agreement1" data-a-sign="Rs. " data-d-group="2">' + agreement1 + '</span></div> <div class="costCell"><span id="agreement" data-a-sign="Rs. " data-d-group="2">' + agreement + '</span></div> </div> <h5 class="headers"><span class="cost-library"></span> Government Charges</h5> <div class="costsRow"> <div class="costCell costName">Stamp Duty</div> <div class="costCell discCol showDisc stamp_duty1" data-a-sign="Rs. " data-d-group="2">' + stamp_duty1 + '</div> <div class="costCell stamp_duty" data-a-sign="Rs. " data-d-group="2">' + stamp_duty + '</div> </div> <div class="costsRow"> <div class="costCell costName">Registration Amount</div> <div class="costCell discCol showDisc reg_amt1" data-a-sign="Rs. " data-d-group="2">' + reg_amt1 + '</div> <div class="costCell reg_amt" data-a-sign="Rs. " data-d-group="2">' + reg_amt + '</div> </div> <div class="costsRow"> <div class="costCell costName">VAT</div> <div class="costCell discCol showDisc vat1" data-a-sign="Rs. " data-d-group="2">' + vat1 + '</div> <div class="costCell vat" data-a-sign="Rs. " data-d-group="2">' + vat + '</div> </div> <div class="costsRow"> <div class="costCell costName">Service Tax</div> <div class="costCell discCol showDisc sales_tax1" data-a-sign="Rs. " data-d-group="2">' + sales_tax1 + '</div> <div class="costCell sales_tax" data-a-sign="Rs. " data-d-group="2">' + sales_tax + '</div> </div> <div class="costsRow totals"> <div class="costCell costName">Total Cost</div> <div class="costCell discCol showDisc totalcost1" data-a-sign="Rs. " data-d-group="2">' + totalcost1 + '</div> <div class="costCell totalcost" data-a-sign="Rs. " data-d-group="2">' + totalcost + '</div> </div> <h5 class="headers"><span class="cost-paint-format"></span> Other Costs</h5> <div class="costsRow"> <div class="costCell costName">Maintenance Deposit</div> <div class="costCell discCol showDisc maintenance" data-a-sign="Rs. " data-d-group="2">' + maintenance + '</div> <div class="costCell maintenance" data-a-sign="Rs. " data-d-group="2">' + maintenance + '</div> </div> <div class="costsRow"> <div class="costCell costName">Club membership + Service Tax</div> <div class="costCell discCol showDisc membershipfees" data-a-sign="Rs. " data-d-group="2">' + membershipfees + '</div> <div class="costCell membershipfees" data-a-sign="Rs. " data-d-group="2">' + membershipfees + '</div> </div> <div class="costsRow totals"> <div class="costCell costName">Final Cost</div> <div class="costCell discCol showDisc"><span id="finalcost1" data-a-sign="Rs. " data-d-group="2">' + finalcost1 + '</span></div> <div class="costCell"><span id="finalcost" data-a-sign="Rs. " data-d-group="2">' + finalcost + '</span></div> </div>';
      $('#costSheetTable').append(table);
      $('#agreement1').autoNumeric('init');
      $('#agreement1').autoNumeric('set', agreement1);
      $('#agreement').autoNumeric('init');
      $('#agreement').autoNumeric('set', agreement);
      $('.stamp_duty1').autoNumeric('init');
      $('.stamp_duty1').autoNumeric('set', stamp_duty1);
      $('.stamp_duty').autoNumeric('init');
      $('.stamp_duty').autoNumeric('set', stamp_duty);
      $('.reg_amt').autoNumeric('init');
      $('.reg_amt').autoNumeric('set', reg_amt);
      $('.reg_amt1').autoNumeric('init');
      $('.reg_amt1').autoNumeric('set', reg_amt1);
      $('.vat').autoNumeric('init');
      $('.vat').autoNumeric('set', vat);
      $('.vat1').autoNumeric('init');
      $('.vat1').autoNumeric('set', vat1);
      $('.vat').autoNumeric('init');
      $('.vat').autoNumeric('set', vat);
      $('.sales_tax1').autoNumeric('init');
      $('.sales_tax1').autoNumeric('set', sales_tax1);
      $('.sales_tax').autoNumeric('init');
      $('.sales_tax').autoNumeric('set', sales_tax);
      $('.totalcost1').autoNumeric('init');
      $('.totalcost1').autoNumeric('set', totalcost1);
      $('.totalcost').autoNumeric('init');
      $('.totalcost').autoNumeric('set', totalcost);
      $('.maintenance').autoNumeric('init');
      $('.maintenance').autoNumeric('set', maintenance);
      $('.membershipfees').autoNumeric('init');
      $('.membershipfees').autoNumeric('set', membershipfees);
      $('#finalcost').autoNumeric('init');
      $('#finalcost').autoNumeric('set', finalcost);
      $('#finalcost1').autoNumeric('init');
      $('#finalcost1').autoNumeric('set', finalcost1);
      id = $('#paymentplans').val();
      object.generatePaymentSchedule(id);
      $('#infra').on('change', function() {
        infraid = $('#infra').val();
        return object.updated();
      });
      $('#infra1').on('change', function() {
        infraid = $('#infra').val();
        return object.updated();
      });
      $('#discountvalue').on('change', function() {
        perFlag = 1;
        return object.generateCostSheet();
      });
      $('#discountper').on('change', function() {
        perFlag = 2;
        return object.generateCostSheet();
      });
      $('#payment').on('change', function() {
        return object.generateCostSheet();
      });
      return $('#paymentplans').on('change', function() {
        id = $('#' + this.id).val();
        return object.generatePaymentSchedule(id);
      });
    };

    ScreenFourLayout.prototype.generatePaymentSchedule = function(id) {
      var addon, addonCount, addoncount, buildingModel, count, element, flag, index, milesotneVal, milestoneColl, milestoneCollection, milestoneModel, milestonecompletion, milestonemodel, milestonename, milestones, milestonesArray, milestonesArrayColl, milstoneModelName, paymentColl, percentageValue, percentageValue1, proposed_date, reccount, recount, table, trClass, unitModel, _i, _j, _len, _len1, _results;
      flag = 0;
      unitModel = App.master.unit.findWhere({
        id: parseInt(App.unit['name'])
      });
      buildingModel = App.master.building.findWhere({
        id: unitModel.get('building')
      });
      milestonecompletion = buildingModel.get('milestonecompletion');
      $('#paymentTable').text("");
      paymentColl = new Backbone.Collection(PAYMENTPLANS);
      milestones = paymentColl.get(parseInt(id));
      milestonesArray = milestones.get('milestones');
      milestonesArrayColl = new Backbone.Collection(milestonesArray);
      milestonemodel = milestonesArrayColl.findWhere({
        'milestone': parseInt(buildingModel.get('milestone'))
      });
      milestonesArray = milestonesArray.sort(function(a, b) {
        return parseInt(a.sort_index) - parseInt(b.sort_index);
      });
      milestoneCollection = new Backbone.Collection(MILESTONES);
      if (milestonemodel === void 0) {
        flag = 1;
        milesotneVal = _.first(milestonesArray);
        milestonemodel = milestonesArrayColl.findWhere({
          'milestone': parseInt(milesotneVal.milestone)
        });
        milestonename = milestoneCollection.get(parseInt(milestonemodel.get('milestone')));
        $('.currentmile').text(milestonename.get('name'));
      } else {
        milstoneModelName = milestoneCollection.get(milestonemodel.get('milestone'));
        $('.currentmile').text(milstoneModelName.get('name'));
      }
      table = "";
      count = 0;
      milestoneColl = new Backbone.Collection(MILESTONES);
      for (index = _i = 0, _len = milestonesArray.length; _i < _len; index = ++_i) {
        element = milestonesArray[index];
        percentageValue = agreementValue * ((parseFloat(element.payment_percentage)) / 100);
        percentageValue1 = agreementValue1 * ((parseFloat(element.payment_percentage)) / 100);
        proposed_date = $.map(milestonecompletion, function(index, value) {
          if (parseInt(element.milestone) === parseInt(value)) {
            return index;
          }
        });
        if (proposed_date.length === 0) {
          proposed_date = '';
        }
        if (element.sort_index <= milestonemodel.get('sort_index')) {
          trClass = "milestoneReached";
          percentageValue = agreementValue * ((parseFloat(element.payment_percentage)) / 100);
          count = count + percentageValue;
        } else {
          trClass = "";
        }
        if (flag === 1) {
          trClass = "";
        }
        $('.percentageValue1').autoNumeric('init');
        $('.percentageValue').autoNumeric('init');
        milestoneModel = milestoneColl.get(element.milestone);
        table += '  <span class="msPercent">' + element.payment_percentage + '%</span> <li class="milestoneList ' + trClass + '"> <div class="msName">' + milestoneModel.get('name') + ' <span class="completionDate">(Estimated date: ' + proposed_date + ')</span></div> <div class="msVal percentageValue' + index + '" data-a-sign="Rs. " data-d-group="2">' + percentageValue + '</div> <div class="msVal percentageValue' + index + '" data-a-sign="Rs. " data-d-group="2">' + percentageValue1 + '</div> <span class="barBg" style="width:' + element.payment_percentage + '%"></span> </li> <div class="clearfix"></div>';
      }
      $('.rec').autoNumeric('init');
      recount = $('.rec').autoNumeric('set', count);
      reccount = recount.text();
      $('#rec').text(reccount);
      $('.rec').text(reccount);
      if (parseInt($('#payment').val()) === 0) {
        addon = 0;
      } else {
        addon = $('#payment').val() - count;
      }
      $('.addonpay').autoNumeric('init');
      console.log(addoncount = $('.addonpay').autoNumeric('set', addon));
      console.log(addonCount = $('.addonpay').autoNumeric('set', addon).text());
      $('.addonpay').text(addonCount);
      $('#paymentTable').append(table);
      _results = [];
      for (index = _j = 0, _len1 = milestonesArray.length; _j < _len1; index = ++_j) {
        element = milestonesArray[index];
        percentageValue = agreementValue * ((parseFloat(element.payment_percentage)) / 100);
        percentageValue1 = agreementValue1 * ((parseFloat(element.payment_percentage)) / 100);
        $('.percentageValue' + index).autoNumeric('init');
        $('.percentageValue' + index).autoNumeric('set', percentageValue);
        $('.percentageValue1' + index).autoNumeric('init');
        _results.push($('.percentageValue1' + index).autoNumeric('set', percentageValue1));
      }
      return _results;
    };

    ScreenFourLayout.prototype.getMilestones = function(id) {
      var element, milesstones, milestoneColl, milestoneModel, milestones, milestonesArray, paymentColl, _i, _len;
      milesstones = '';
      $('#milestones option').remove();
      paymentColl = new Backbone.Collection(PAYMENTPLANS);
      milestones = paymentColl.get(parseInt(id));
      milestonesArray = milestones.get('milestones');
      milestonesArray = milestonesArray.sort(function(a, b) {
        return parseInt(a.sort_index) - parseInt(b.sort_index);
      });
      milestoneColl = new Backbone.Collection(MILESTONES);
      for (_i = 0, _len = milestonesArray.length; _i < _len; _i++) {
        element = milestonesArray[_i];
        milestoneModel = milestoneColl.get(element.milestone);
        milesstones += '<option value="' + element.milestone + '">' + milestoneModel.get('name') + '</option>';
      }
      return $('#milestones').append(milesstones);
    };

    ScreenFourLayout.prototype.updated = function() {
      var SettingModel, addon, agreement, agreement1, basicCost, basicCost1, buildingModel, costSheetArray, count, discount, element, finalcost, finalcost1, id1, infraArray, maintenance, membership_fees, membership_feesColl, membershipfees, milesotneVal, milestoneColl, milestonemodel, milestones, milestonesArray, milestonesArrayColl, milestoneselectedValue, paymentColl, percentageValue, pervalue, planselectedValue, reg_amt, reg_amt1, revisedrate, sales_tax, sales_tax1, stamp_duty, stamp_duty1, table, totalcost, totalcost1, uniVariantModel, unitModel, unitTypeMemeber, unitVariantMemeber, unitVariantMemeberColl, univariantmem, vat, vat1, _i, _len;
      costSheetArray = [];
      unitModel = App.master.unit.findWhere({
        id: parseInt(App.unit['name'])
      });
      uniVariantModel = App.master.unit_variant.findWhere({
        id: unitModel.get('unitVariant')
      });
      costSheetArray.push(uniVariantModel.get('sellablearea'));
      costSheetArray.push(unitModel.get('persqftprice'));
      discount = 0;
      if (perFlag === 1) {
        discount = ((parseFloat(uniVariantModel.get('sellablearea')) * parseFloat(unitModel.get('persqftprice'))) - parseFloat($('#discountvalue').val())) / parseFloat(uniVariantModel.get('sellablearea'));
      } else if (perFlag === 2) {
        pervalue = parseFloat($('#discountper').val()) / 100;
        discount = parseFloat(unitModel.get('persqftprice')) * parseFloat(pervalue);
      }
      discount = Math.ceil(discount.toFixed(2));
      revisedrate = parseFloat(unitModel.get('persqftprice')) - (parseFloat(discount));
      costSheetArray.push(revisedrate);
      basicCost = parseFloat(uniVariantModel.get('sellablearea')) * parseFloat(revisedrate);
      costSheetArray.push(basicCost);
      costSheetArray.push(discount);
      table = "";
      buildingModel = App.master.building.findWhere({
        id: unitModel.get('building')
      });
      planselectedValue = buildingModel.get('payment_plan');
      milestoneselectedValue = buildingModel.get('milestone');
      $("#paymentplans option[value=" + planselectedValue + "]").prop('selected', true);
      $("#milestones option[value=" + milestoneselectedValue + "]").prop('selected', true);
      id1 = $('#paymentplans').val();
      maintenance = parseFloat(uniVariantModel.get('sellablearea')) * 100;
      SettingModel = new Backbone.Model(SETTINGS);
      stamp_duty = (basicCost * (parseFloat(SettingModel.get('stamp_duty')) / 100)) + 110;
      reg_amt = parseFloat(SettingModel.get('registration_amount'));
      vat = basicCost * (parseFloat(SettingModel.get('vat')) / 100);
      sales_tax = basicCost * (parseFloat(SettingModel.get('sales_tax')) / 100);
      infraArray = SettingModel.get('infrastructure_charges');
      membership_fees = SettingModel.get('membership_fees');
      membership_feesColl = new Backbone.Collection(membership_fees);
      unitTypeMemeber = membership_feesColl.findWhere({
        unit_type: parseInt(unitModel.get('unitType'))
      });
      if (unitTypeMemeber.get('membership_fees') === 0) {
        unitVariantMemeber = unitTypeMemeber.get('unit_variant');
        unitVariantMemeberColl = new Backbone.Collection(unitVariantMemeber);
        univariantmem = unitVariantMemeberColl.findWhere({
          unit_variant: parseInt(unitModel.get('unitVariant'))
        });
        membershipfees = univariantmem.get('membership_fees');
      } else {
        membershipfees = unitTypeMemeber.get('membership_fees');
      }
      table = "";
      basicCost1 = costSheetArray[0] * costSheetArray[1];
      agreement1 = parseFloat(basicCost1) + parseFloat($('#infra').val());
      agreementValue1 = agreement1;
      agreement = parseFloat(basicCost) + parseFloat($('#infra').val());
      agreementValue = agreement;
      $('#agreement').autoNumeric('init');
      $('#agreement1').autoNumeric('init');
      $('#agreement').text($('#agreement').autoNumeric('set', agreement).text());
      $('#agreement1').text($('#agreement1').autoNumeric('set', agreement1).text());
      stamp_duty1 = (basicCost1 * (parseFloat(SettingModel.get('stamp_duty')) / 100)) + 110;
      reg_amt1 = parseFloat(SettingModel.get('registration_amount'));
      vat1 = basicCost1 * (parseFloat(SettingModel.get('vat')) / 100);
      sales_tax1 = basicCost1 * (parseFloat(SettingModel.get('sales_tax')) / 100);
      totalcost1 = parseFloat(agreement1) + parseFloat(stamp_duty1) + parseFloat(reg_amt1) + parseFloat(vat1) + parseFloat(sales_tax1);
      finalcost1 = parseFloat(totalcost1) + parseFloat(maintenance);
      $('#totalcost1').autoNumeric('init');
      $('#finalcost1').autoNumeric('init');
      $('#totalcost1').text($('#totalcost1').autoNumeric('set', totalcost1).text());
      $('#finalcost1').text($('#finalcost1').autoNumeric('set', finalcost1).text());
      paymentColl = new Backbone.Collection(PAYMENTPLANS);
      milestones = paymentColl.get(parseInt($('#paymentplans').val()));
      milestonesArray = milestones.get('milestones');
      milestonesArrayColl = new Backbone.Collection(milestonesArray);
      milestonemodel = milestonesArrayColl.findWhere({
        'milestone': parseInt(buildingModel.get('milestone'))
      });
      milestonesArray = milestonesArray.sort(function(a, b) {
        return parseInt(a.sort_index) - parseInt(b.sort_index);
      });
      if (milestonemodel === void 0) {
        milesotneVal = _.first(milestonesArray);
        milestonemodel = milestonesArrayColl.findWhere({
          'milestone': parseInt(milesotneVal.milestone)
        });
      }
      milestoneColl = new Backbone.Collection(MILESTONES);
      count = 0;
      for (_i = 0, _len = milestonesArray.length; _i < _len; _i++) {
        element = milestonesArray[_i];
        if (element.sort_index <= milestonemodel.get('sort_index')) {
          percentageValue = agreement * ((parseFloat(element.payment_percentage)) / 100);
          count = count + percentageValue;
        }
      }
      addon = parseFloat($('#payment').val()) - parseFloat(count);
      totalcost = parseFloat(agreement) + parseFloat(stamp_duty) + parseFloat(reg_amt) + parseFloat(vat) + parseFloat(sales_tax);
      finalcost = parseFloat(totalcost) + parseFloat(maintenance);
      $('#totalcost').autoNumeric('init');
      $('#finalcost').autoNumeric('init');
      $('#totalcost').text($('#totalcost').autoNumeric('set', totalcost).text());
      return $('#finalcost').text($('#finalcost').autoNumeric('set', finalcost).text());
    };

    return ScreenFourLayout;

  })(Marionette.LayoutView);
  UnitsView = (function(_super) {
    __extends(UnitsView, _super);

    function UnitsView() {
      return UnitsView.__super__.constructor.apply(this, arguments);
    }

    UnitsView.prototype.tagName = 'li';

    UnitsView.prototype.className = 'vs-nav-current';

    return UnitsView;

  })(Marionette.ItemView);
  UnitTypeChildView = (function(_super) {
    __extends(UnitTypeChildView, _super);

    function UnitTypeChildView() {
      return UnitTypeChildView.__super__.constructor.apply(this, arguments);
    }

    UnitTypeChildView.prototype.tagName = 'ul';

    UnitTypeChildView.prototype.className = 'vs-nav';

    UnitTypeChildView.prototype.childView = UnitsView;

    return UnitTypeChildView;

  })(Marionette.CompositeView);
  UnitMainView = (function(_super) {
    __extends(UnitMainView, _super);

    function UnitMainView() {
      return UnitMainView.__super__.constructor.apply(this, arguments);
    }

    UnitMainView.prototype.template = '<div class="row m-l-0 m-r-0 bgClass"> <div class="col-md-5 col-lg-4 p-b-10"> <div class="unitDetails"> <div class="row"> <div class="col-lg-6"> <div class="unitBox unitNmbr"> <h3>{{name}}</h3> <h4 class="titles"><span class="sky-flag"></span> Flat No.</h4> </div> </div> <div class="col-lg-6"> <div class="unitBox chargeArea"> <h3>{{sellablearea}} <span class="light">Sq.Ft.</span></h3> <h4 class="titles"><span class="sky-banknote"></span> Chargeable Area</h4> </div> </div> </div> <div class="row"> <div class="col-md-12"> <div class="unitBox"> {{#roomsizearray}} <div class="rooms">{{type}}<h4 class="size">{{size}} Sq.Ft.</h4></div> {{/roomsizearray}} <h4 class="titles"><span class="sky-maximize"></span> Room Sizes</h4> </div> </div> </div> <div class="row"> <div class="col-md-4"> <div class="unitBox facing"> <h4 class="view">{{terraceoptions}}</h4> <h4 class="titles"><span class="sky-content-left"></span> Terrace</h4> </div> </div> <div class="col-md-4"> <div class="unitBox facing"> <h4 class="view facingclass">{{facings_name}}</h4> <h4 class="titles"><span class="sky-map"></span> Views</h4> </div> </div> <div class="col-md-4"> <div class="unitBox facing"> <h4 class="view viewclass">{{views_name}}</h4> <h4 class="titles"><span class="sky-location"></span> Entrance</h4> </div> </div> </div> </div> </div> <!--<div class="col-sm-8"> <h4 class="bold">FLAT SUMMARY</h4> <div class="summary"> <div class="row"> <div class="col-xs-6">CARPET AREA</div> <div class="col-xs-6 text-right text-primary">{{carpetarea}} sqft</div> </div> <div class="row"> <div class="col-xs-6">TERRACE AREA</div> <div class="col-xs-6 text-right text-primary">{{terracearea}} sqft</div> </div> <div class="row"> <div class="col-xs-6">CHARGEABLE AREA</div> <div class="col-xs-6 text-right text-primary">{{sellablearea}} sqft</div> </div> <div class="row"> <div class="col-xs-6">PRICE per SQ.FT - starts from</div> <div class="col-xs-6 text-right text-primary">-</div> </div> </div> </div>--> <div class="col-md-7 col-lg-8 b-grey b-l"> <div class="liquid-slider center-block" id="slider-plans"> <div> <h2 class="title">2D Layout</h2> <img src="{{TwoDimage}}" class="img-responsive"> </div> <div> <h2 class="title">3D Layout</h2> <img src="{{ThreeDimage}}" class="img-responsive"> </div> <div> <h2 class="title">Floor Layout</h2> <img src="{{floorLayoutimage}}" class="img-responsive"> </div> <div> <h2 class="title">Building Position</h2> <img src="{{BuildingPositionimage}}" class="img-responsive"> </div> </div> </div> </div> <!--<div class="row m-l-0 m-r-0 m-t-20 p-t-20 b-grey b-t"> <div class="col-md-6 p-b-10"> <h4 class="bold">ROOM DIMENSIONS</h4> <div class="summary"> <div class="row p-b-10"> <div class="col-sm-6"> TERRACE <h3 class="text-primary"</h3> </div> <div class="col-sm-6"> TOILET {{#toiletArray}} <h3 class="text-primary">{{size}}</h3> {{/toiletArray}} </div> </div> <div class="row m-t-20"> <div class="col-sm-6"> LIVING ROOM <h3 class="text-primary"></h3> </div> <div class="col-sm-6"> KITCHEN <h3 class="text-primary"></h3> </div> </div> </div> </div> <div class="col-md-6"> <h4 class="bold">ROOM DIMENSIONS</h4> <div class="summary facilities"> <div class="row"> </div> <div class="row m-t-20"> </div> </div> </div> </div>--> <!--<a  class="btn btn-primary">Cost Sheet</a>-->';

    UnitMainView.prototype.tagName = "section";

    UnitMainView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    UnitMainView.prototype.onShow = function() {
      return $('#slider-plans').liquidSlider({
        slideEaseFunction: "easeInOutQuad",
        autoSlide: true,
        includeTitle: false,
        minHeight: 630,
        autoSlideInterval: 4000,
        mobileNavigation: false,
        hideArrowsWhenMobile: false,
        dynamicTabsAlign: "center",
        dynamicArrows: false
      });
    };

    return UnitMainView;

  })(Marionette.CompositeView);
  UnitTypeView = (function(_super) {
    __extends(UnitTypeView, _super);

    function UnitTypeView() {
      return UnitTypeView.__super__.constructor.apply(this, arguments);
    }

    UnitTypeView.prototype.className = "vs-wrapper";

    UnitTypeView.prototype.childView = UnitMainView;

    return UnitTypeView;

  })(Marionette.CompositeView);
  return {
    ScreenFourLayout: ScreenFourLayout,
    UnitTypeChildView: UnitTypeChildView,
    UnitTypeView: UnitTypeView
  };
});
