function routeConf ($stateProvider){
	  // An array of state definitions
	  var states = [
	    { name: 'main', url: '/', template: '<main-component><main-component>' },
	    {
	    	name: 'productos',
	    	url: '/productos',
	    	views: {
		      'table': 
		      	{
		      		template: '<table-component><table-component>', // The component's name
					
		      	},
		     
		    }
	    }
	  ]
	  
	  // Loop over the state definitions and register them
	  states.forEach(function(state) {
	    $stateProvider.state(state);
	  });
}


angular
	.module('app')
	.config(routeConf);