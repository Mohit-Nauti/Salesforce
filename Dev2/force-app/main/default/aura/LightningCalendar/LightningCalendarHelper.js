({
    getResponse: function(component, initCalendar) {
        console.log('getResponse------>');
        var action = component.get("c.getEvents");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result.isEnrollRequested);
                console.log("Data: \n" + JSON.stringify(result));
                
                var eventArr = [];
                result.forEach(function(key) {
                    eventArr.push({
                        'id':key.id,
                        'start':moment(key.startDateTime).utcOffset('-0800').format("YYYY-MM-DDTHH:mm:ssZ"),
                        'end':moment(key.endDateTime).utcOffset('-0800').format("YYYY-MM-DDTHH:mm:ssZ") ,
                        'title':key.subject+' - '+key.eventType,
                        'color': key.isEnrollRequested ? '#5cdc5c' : (key.isClassFull ? '#b6abaa' : '#59d2f7'),
                        'description' : key.eventDescription,
                        'location' : key.eventLocation,
                        'isClassFull' : key.isClassFull,
                        'seats' : key.seats,
                        'enrolled' : key.isEnrollRequested,
                        'registration' : key.registrationLink,
                        'eventtype' : key.eventType,
                        'PendingApproval' :  key.isPendingApproval,
                        'isRejected' :  key.isRejected
                    });
                });
                if(initCalendar == true) {
                    this.loadCalendar(component,eventArr);
                } else {
                    var ele = component.find('calendar').getElement();
                    console.log(ele);
                    $(ele).fullCalendar("removeEvents");
                    $(ele).fullCalendar( "renderEvents", eventArr , false );
                }
                this.getMyEventResponse(component);
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
    
    loadCalendar :function(cmp, data){   
        var m = moment();
        var ele = cmp.find('calendar').getElement();
        $(ele).fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            defaultDate: m.format(),
            editable: true,
            navLinks: true, // can click day/week names to navigate views
            weekNumbers: true,
            weekNumbersWithinDays: true,
            weekNumberCalculation: 'ISO',
            editable: false,
            eventLimit: false,
            defaultView: 'month',
            events:data,
            weekends : false,
            eventClick: function(info) {
                console.log('--> '+info.enrolled);
                console.log('debug=>'+Object.entries(info));
                cmp.set("v.eventObject",info);
                if(info.enrolled == true) {
                    console.log('---> In Enroll ');
                    console.log(cmp.get("v.isWebinar"));
                    if(info.eventtype == 'Webinar') {
                        if(info.PendingApproval == true){
                            console.log('------'+info.eventtype);
                            cmp.set("v.showRegistrationDetail",false);
                            cmp.set("v.showMeetingDetail",true);
                            cmp.set("v.meetingTitle","Your event enrollment request is pending");                       
                        } 
                        else{
                            cmp.set("v.showRegistrationDetail",false);
                            cmp.set("v.showMeetingDetail",true);  
                            cmp.set("v.meetingTitle","You are already registered for this event");                             
                        }
                        
                    }else{
                        if(info.PendingApproval == true){
                            cmp.set("v.showRegistrationDetail",false);
                            cmp.set("v.showMeetingDetail",true); 
                            cmp.set("v.meetingTitle","Your class enrollment request is pending");
                            
                        }else if(info.isRejected == true) {
                            cmp.set("v.showRegistrationDetail",false);
                            cmp.set("v.showMeetingDetail",true); 
                            cmp.set("v.meetingTitle","Enrollment Unavailable at this Time");
                            
                        }else{
                            cmp.set("v.showRegistrationDetail",false);
                            cmp.set("v.showMeetingDetail",true);
                            cmp.set("v.meetingTitle","You are already registered for this "+info.eventtype);
                            
                        }
                    }
                    cmp.set("v.showOkButton",false);
                    cmp.set("v.showEnrollButton",false);
                    cmp.set("v.showCancelEnrollButton",false);
                    cmp.set("v.showModal",true);
                    cmp.set("v.eventId",info.id);
                    cmp.set("v.showOkButton",true);
                    console.log('--> '+info.enrolled);
                } else if(info.isClassFull == false) {
                    if(info.eventtype == 'Webinar') {
                        cmp.set("v.meetingTitle","Register for the "+info.eventtype);
                        cmp.set("v.showRegistrationDetail",true);
                        cmp.set("v.showMeetingDetail",false);
                        cmp.set("v.showEnrollButton",false);
                    } else {
                        cmp.set("v.showRegistrationDetail",false);
                        cmp.set("v.showMeetingDetail",true);
                        cmp.set("v.meetingTitle","Enroll for "+info.eventtype);
                        cmp.set("v.showOkButton",true);
                        cmp.set("v.showEnrollButton",true);
                    }
                    cmp.set("v.meetingName",info.title);
                    cmp.set("v.eventDetail",info.title);
                    cmp.set("v.showCancelEnrollButton",false);
                    
                    console.log('--> '+info.enrolled);
                    try {
                        cmp.set("v.eventObject",info);
                        cmp.set("v.eventId",info.id);
                        cmp.set("v.showModal",true);
                    } catch(e) {
                        console.log(' Error '+e);
                    }
                } else {
                    cmp.set("v.meetingTitle","This "+info.eventtype+" is already full");
                    cmp.set("v.showOkButton",false);
                    cmp.set("v.showModal",true);
                    cmp.set("v.showMeetingDetail",true);
                    cmp.set("v.showRegistrationDetail",false);
                    cmp.set("v.showCancelEnrollButton",false);
                    console.log('--> '+info.enrolled);
                }
            }
        });
    },
    
    getMyEventResponse: function(component) {
        console.log('inside getmyevent');
        var action = component.get("c.getMyEvents");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('result=>'+JSON.stringify(result));
                component.set("v.myEvents",result);
            } else {
                console.log(' '+state);
                
            }
        });
        $A.enqueueAction(action);
    }
    
})