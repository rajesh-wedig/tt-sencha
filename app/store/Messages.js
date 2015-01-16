Ext.define('ttapp.util.FeedProxy', {
    singleton: true,
    // requires: ['Ext.data.JsonP'],

    process: function() {
        var messageStore = Ext.getStore('Messages'),
            messageModel,
           	to_user = Ext.getStore('profilestore').getPhoneNumber();
           	
        if(to_user){
			 Ext.Ajax.request({
                        url:  ttapp.config.Config.getBaseURL() + '/feed/' + to_user + '/',
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json'},
                        disableCaching: false,
                        
                        success: function(response) {
                            var messages = Ext.JSON.decode(response.responseText.trim());
                            Ext.Array.each( messages, function(message) {
                            	messageModel = Ext.create('ttapp.model.Message', message);
                            	messageStore.add(messageModel);
                            });
                        }
                    });
            }
    }
});

Ext.define('ttapp.store.Messages', {
    extend: 'Ext.data.Store',

    config: {
        model: 'ttapp.model.Message'
    },
    getLastRecord: function(){
        this.load();
        return this.last();
    }
});
