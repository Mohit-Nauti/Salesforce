({
	doInit : function(component, event, helper) {

        var url = window.location.pathname;
        var currentPage = url.split('/').slice(-1)[0];
        //console.log(currentPage);

        switch (currentPage) {
            case 'plan':
                component.set('v.back', 'partner-lifecycle');
                component.set('v.next', 'develop');
                break;

            case 'develop':
                component.set('v.back', 'plan');
                component.set('v.next', 'go-to-market');
                break;

            case 'go-to-market':
                component.set('v.back', 'develop');
                component.set('v.next', 'grow');
                break;

            case 'grow':
                component.set('v.back', 'go-to-market');
                break;

            default:
                break;
        }
	}
})