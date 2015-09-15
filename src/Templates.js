angular.module("decorated-stock-chart").run(["$templateCache", function($templateCache) {$templateCache.put("DecoratedStockChart.html","<div class=\"root\" style=\"position: relative\">\r\n    <div class=\"control flex-main-container\"\r\n         ng-init=\"showSecurityControl = false; showIndicatorControl = false; showBenchmarkControl = false;\">\r\n        <span class=\"flex-sub-container-left\">\r\n            <!-- security & attributes selection -->\r\n            <span dsc-click-outside dsc-open-state=\"states.menuDisplays.securityControl\"\r\n                  dsc-close-callback=\"toggleSlide(!states.menuDisplays.securityControl, \'security-control\')\">\r\n                <span class=\"restrict-dropdown-menu\">\r\n                    <input type=\"text\" ng-model=\"defaultSecurityAttribute\" class=\"form-control\"\r\n                           style=\"width: 12em; display: inline; height:25px;\"\r\n                           typeahead=\"attr as attr.label for attr in availableSecurityAttributes | filter:$viewValue:$emptyOrMatch | orderBy:\'label.toString()\'\"\r\n                           typeahead-focus />\r\n                </span>\r\n                <a><i ng-click=\"toggleSlide(!states.menuDisplays.securityControl, \'security-control\')\"\r\n                      class=\"fa clickable\"\r\n                      ng-class=\"{\'fa-chevron-up\': states.menuDisplays.securityControl, \'fa-chevron-down\': !states.menuDisplays.securityControl}\"></i></a>\r\n                <span class=\"security-control floating-form\" style=\"display: none;top:35px;left:0;\">\r\n                    <div ng-show=\"states.securityAttrMap.length === 0\">\r\n                        <h5>No Security Selected</h5>\r\n                    </div>\r\n                    <div class=\"flex-container\">\r\n                        <span class=\"wrappable-flex-item\" ng-repeat=\"securityAttrPair in states.securityAttrMap\">\r\n                            <!-- selected attributes display -->\r\n                            <span class=\"label label-success\">{{securityAttrPair[0].label}} | <i class=\"fa fa-remove clickable\"\r\n                                                                                                 ng-click=\"apiHandle.api.removeSecurity(securityAttrPair[0].id)\"></i></span>\r\n                            <span class=\"label label-primary\" ng-repeat=\"attr in securityAttrPair[1]\">\r\n                                    {{attr.label}} | <i class=\"fa fa-remove clickable\"\r\n                                                        ng-click=\"removeAttr(attr, securityAttrPair)\"></i>\r\n                            </span>\r\n                            <!-- input to select more attributes-->\r\n                            &nbsp;\r\n                            <input type=\"text\"\r\n                                   placeholder=\"+ Attribute\"\r\n                                   ng-model=\"selected\"\r\n                                   typeahead=\"attr as attr.label for attr in availableSecurityAttributes | filter:$viewValue:$emptyOrMatch | orderBy:\'label.toString()\'\"\r\n                                   class=\"form-control\"\r\n                                   style=\"width: 8em; display: inline;\"\r\n                                   typeahead-on-select=\"addAttr($item, securityAttrPair); selected = \'\'\"\r\n                                   typeahead-focus>\r\n\r\n                        </span>\r\n                    </div>\r\n                </span>\r\n            </span>\r\n            <!-- TODO implement these date functionalities -->\r\n            <span style=\"padding-left:25px;\">\r\n                <span class=\"clickable dsc-padding-right\" ng-repeat=\"period in customDefaultTimePeriods\" ng-click=\"selectTimePeriod(period)\"\r\n                      style=\"padding-right:5px;color:#005da0;\">\r\n                    {{period}}\r\n                </span>\r\n                <span style=\"color:#005da0;\"\r\n                      dsc-click-outside\r\n                      dsc-open-state=\"states.menuDisplays.dateControl\"\r\n                      dsc-close-callback=\"toggleSlide(!states.menuDisplays.dateControl, \'date-control\')\">\r\n                    <i class=\"fa fa-calendar clickable\" ng-click=\"toggleSlide(!states.menuDisplays.dateControl, \'date-control\');\r\n                             start = states.dateRange.start;\r\n                             end = states.dateRange.end\"></i>\r\n                    <div class=\"date-control floating-form\" style=\"display: none;\" >\r\n                        <alert ng-show=\"alerts.dateChangeError.active\" close=\"alerts.dateChangeError.active = false\" type=\"danger\" style=\"font-size: 12px;\">\r\n                            {{alerts.dateChangeError.message}}\r\n                        </alert>\r\n                        <label>From&nbsp;</label>\r\n                        <p class=\"input-group limited-input\">\r\n                            <input type=\"text\" class=\"form-control\"\r\n                                   datepicker-popup\r\n                                   is-open=\"startDatePickerOpen\"\r\n                                   ng-model=\"start\"/>\r\n                            <span class=\"input-group-btn\">\r\n                                <button class=\"btn btn-default\" ng-click=\"startDatePickerOpen = !startDatePickerOpen\"><i class=\"fa fa-calendar\"></i></button>\r\n                            </span>\r\n                        </p>\r\n                        <label>To&nbsp;</label>\r\n                        <p class=\"input-group limited-input\">\r\n                            <input type=\"text\" class=\"form-control\"\r\n                                   datepicker-popup\r\n                                   is-open=\"endDatePickerOpen\"\r\n                                   ng-model=\"end\"/>\r\n                            <span class=\"input-group-btn\">\r\n                                <button class=\"btn btn-default\" ng-click=\"endDatePickerOpen = !endDatePickerOpen\"><i class=\"fa fa-calendar\"></i></button>\r\n                            </span>\r\n                        </p>\r\n                        <hr/>\r\n                        <button class=\"btn btn-success\"\r\n                                ng-click=\"alerts.dateChangeError.message = apiHandle.api.changeDateRange(start, end);\r\n                                          alerts.dateChangeError.message ? null : showDateControl = !showDateControl;\">\r\n                            <i class=\"fa fa-play\"></i>\r\n                        </button>\r\n                    </div>\r\n                </span>\r\n            </span>\r\n        </span>\r\n        <span class=\"flex-sub-container-right\">\r\n            <span class=\"flex-container\">\r\n                <span class=\"menu-container\" dsc-click-outside dsc-open-state=\"states.menuDisplays.indicatorControl\"\r\n                      dsc-close-callback=\"toggleSlide(!states.menuDisplays.indicatorControl,\'indicator-control\')\">\r\n                    <a class=\"clickable\" style=\"text-decoration:none\"\r\n                       ng-click=\"toggleSlide(!states.menuDisplays.indicatorControl,\'indicator-control\')\">\r\n                        <span class=\"fake-anchor-tag\">Market Indicators</span>\r\n                        <i class=\"fa\" ng-class=\"{\'fa-chevron-up\': states.menuDisplays.indicatorControl, \'fa-chevron-down\': !states.menuDisplays.indicatorControl}\"></i>\r\n                    </a>\r\n                    <div class=\"indicator-control floating-form\" style=\"display: none;width:250px;\">\r\n                        <label>\r\n                            Search&nbsp;\r\n                        </label>\r\n                        <span class=\"restrict-dropdown-menu\">\r\n                            <input type=\"text\" placeholder=\"ex: S&P 500, Energy CDS...\" class=\"form-control\"\r\n                                       ng-model=\"selected\"\r\n                                       typeahead=\"attr.label for attr in marketIndexTypeahead({userInput: $viewValue}) | filter:$viewValue:$emptyOrMatch | orderBy:\'label.toString()\'\"\r\n                                       typeahead-on-select=\"apiHandle.api.addMarketIndicator($item); selected = \'\';showIndicatorControl = false;\"\r\n                                       typeahead-focus/>\r\n                        </span>\r\n                        <a class=\"clickable\" ng-if=\"showMoreMarketInfo\" ng-click=\"moreMarketInfoCallback()\">Show All</a>\r\n                    </div>\r\n                </span>\r\n                <span class=\"menu-container\" dsc-click-outside dsc-open-state=\"states.menuDisplays.benchmarkControl\"\r\n                      dsc-close-callback=\"toggleSlide(!states.menuDisplays.benchmarkControl, \'benchmark-control\')\"\r\n                        style=\"padding-right:10px\">\r\n                    <a class=\"clickable\" style=\"padding-left:5px;text-decoration:none;\"\r\n                       ng-click=\"toggleSlide(!states.menuDisplays.benchmarkControl, \'benchmark-control\')\">\r\n                        <span class=\"fake-anchor-tag\">Benchmark</span>\r\n                        <i class=\"fa\" ng-class=\"{\'fa-chevron-up\': states.menuDisplays.benchmarkControl, \'fa-chevron-down\': !states.menuDisplays.benchmarkControl}\"></i>\r\n                    </a>\r\n                    <div class=\"benchmark-control floating-form\" style=\"display: none;\"\r\n                         ng-init=\"customBenchmark = {}\">\r\n                        <alert ng-show=\"alerts.customBenchmark.active\" close=\"alerts.customBenchmark.active = false\" type=\"danger\" style=\"font-size: 12px;\">\r\n                            There were problems with your input\r\n                            <br/><br/>\r\n                            <ul style=\"list-style:inside;padding-left:0;\">\r\n                                <li ng-repeat=\"message in alerts.customBenchmark.messages\">{{message}}</li>\r\n                            </ul>\r\n                        </alert>\r\n                        <label>\r\n                            Sector&nbsp;\r\n                            <span class=\"restrict-dropdown-menu-small\">\r\n                                <input type=\"text\" class=\"form-control length-md\"\r\n                                       ng-model=\"customBenchmark.sector\"\r\n                                       typeahead=\"sector for sector in customBenchmarkOptions.sectors | filter:$viewValue:$emptyOrMatch | orderBy:\'toString()\'\"\r\n                                       typeahead-focus/>\r\n                            </span>\r\n                        </label>\r\n                        <label>\r\n                            Rating&nbsp;\r\n                            <span class=\"restrict-dropdown-menu-small\">\r\n                                <input type=\"text\" class=\"form-control length-md\"\r\n                                       ng-model=\"customBenchmark.rating\"\r\n                                       typeahead=\"rating for rating in customBenchmarkOptions.ratings | filter:$viewValue:$emptyOrMatch | orderBy:\'toString()\'\"\r\n                                       typeahead-focus/>\r\n                            </span>\r\n                        </label>\r\n                        <label>\r\n                            WAL&nbsp;\r\n                            <span class=\"restrict-dropdown-menu-small\">\r\n                                <input type=\"text\" class=\"form-control length-md\"\r\n                                       ng-model=\"customBenchmark.wal\"\r\n                                       typeahead=\"wal for wal in customBenchmarkOptions.wal | filter:$viewValue:$emptyOrMatch | orderBy:\'parseInt()\'\"\r\n                                       typeahead-focus/>\r\n                            </span>\r\n                        </label>\r\n                        <label>\r\n                            Analytic&nbsp;\r\n                            <span class=\"restrict-dropdown-menu-small\">\r\n                                <input type=\"text\" class=\"form-control length-md\"\r\n                                       ng-model=\"customBenchmark.analytic\"\r\n                                       typeahead=\"attr as attr.label for attr in customBenchmarkOptions.analytics | filter:$viewValue:$emptyOrMatch | orderBy:\'label.toString()\'\"\r\n                                       typeahead-focus/>\r\n                            </span>\r\n                        </label>\r\n                        <button class=\"btn btn-success\" ng-click=\"apiHandle.api.addCustomBenchmark(customBenchmark)\"><i\r\n                                class=\"fa fa-play\"></i></button>\r\n                    </div>\r\n                </span>\r\n                <span>\r\n                    <span class=\"clickable\" style=\"padding-right:5px;color:#005da0;\" ng-click=\"exportXLS()\"><i class=\"fa fa-share-square-o\"></i></span>\r\n                    <span class=\"clickable\" style=\"padding-right:5px;color:#005da0;\" ng-repeat=\"customButton in customButtons\" ng-click=\"customButton.callback()\">\r\n                        <i class=\"fa\" ng-class=\"customButton.faClass\"></i>\r\n                    </span>\r\n                </span>\r\n            </span>\r\n        </span>\r\n    </div>\r\n    <hr/>\r\n    <div style=\"position:relative\">\r\n        <i ng-show=\"isProcessing\" class=\"fa fa-spinner fa-spin fa-3x spinner\" style=\"position:absolute;top:0;left:0\"></i>\r\n        <!-- this is where the stock chart goes -->\r\n        <div ng-attr-id=\"{{\'enriched-highstock-\'+id}}\" style=\"width:100%;height:100%;\"></div>\r\n        <alert ng-show=\"alerts.generalWarning.active\" style=\"position:absolute;bottom:0;right:0;\"\r\n               close=\"alerts.generalWarning.active = false\" type=\"danger\">\r\n            {{alerts.generalWarning.message}}\r\n        </alert>\r\n    </div>\r\n</div>\r\n");}]);