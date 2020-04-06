({
    getResponse : function(component) {
        var action = component.get("c.getForecastData");
        action.setParams({"opportunityRecordId" : component.get("v.recordId"), products : component.get("v.selectedItems")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.forecastData",result);
                console.log(" Chart: "+JSON.stringify(result,null,2));
                this.loadChart(component,result);
            } else if (state === "INCOMPLETE") {
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    getProductList : function(component) {
        var action = component.get("c.getProductData");
        action.setParams({"opportunityRecordId" : component.get("v.recordId")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.legends",result);
                
                var items = [];
                for(var idx = 0; idx < result.length; idx++) {
                    items.push(result[idx].label);
                }
                component.set("v.selectedItems", items);
                
                this.getResponse(component);
                
                console.log(" Products "+JSON.stringify(result,null,2));
            } else if (state === "INCOMPLETE") {
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    loadChart : function(component, dataSet){
        var items = component.get("v.selectedItems");
        console.log(" Loading Chart: "+JSON.stringify(items,null,2));
        var stackBar = {};
        if(items.includes('Total')) {
            stackBar = {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        format: '${point.y:,3f}',
                    }
                }
            }
        }
        var existingChart = component.get("v.chart");
        if(existingChart != undefined) {
            existingChart.destroy();
            component.set("v.chart",undefined);
        }
        
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        var hc = Highcharts.chart('container', {
            chart: {
                zoomType: 'xy',
            },
            title: {
                text: 'Forecast for each product on Twilio Opportunity',
                style: {
                    color: Highcharts.getOptions().colors[10]
                }
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: dataSet[0].category,
                crosshair: true,
                title: {text:'Month'}
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '${value}',
                    style: {
                        color: Highcharts.getOptions().colors[10]
                    }
                },
                title: {
                    text: 'Forecast Amount ($)',
                    style: {
                        color: Highcharts.getOptions().colors[10]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'MRR ($)',
                    style: {
                        color: Highcharts.getOptions().colors[10]
                    }
                },
                labels: {
                    format: '${value}',
                    style: {
                        color: Highcharts.getOptions().colors[10]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: false
            },
            plotOptions: stackBar,
            
            legend: {
                verticalAlign: 'top',
                floating: false,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false,
                maxHeight:90
            },
            series: dataSet
            
        });
        
        component.set("v.chart",hc);
    }
})