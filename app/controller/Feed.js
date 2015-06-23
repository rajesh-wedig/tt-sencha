Ext.define('ttapp.controller.Feed', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            previousBtn: 'feed #previous',
            nextBtn: 'feed #next',
        },
        control: {
            'feed list': {
                itemtap: 'onShowTinkInFeed',
                activate: 'onFeedShow'
            },
            'previousBtn': {
                tap: 'onPrevious'
            },
            'nextBtn': {
                tap: 'onNext'
            }
        }
    },
    onFeedShow: function() {
        // var config = ttapp.config.Config;
        //
        // ttapp.util.FeedProxy.process(true, function() {
        //     this.getPreviousBtn().setDisabled(config.getCurrentFeedPageNumber() < 1);
        //     // this.getNextBtn().setDisabled(Ext.getStore('Messages').getCount() < config.getFeedPageSize());
        // }, this);
    },
    onPrevious: function() {
        var config = ttapp.config.Config,
            previous = config.getCurrentFeedPageNumber();

        this.getPreviousBtn().setHidden(true);

        if (previous == 0) {
            return;
        }

        this.getNextBtn().setHidden(true);

        config.setCurrentFeedPageNumber(previous - 1);
        ttapp.util.FeedProxy.process(true, function() {
            this.getPreviousBtn().setHidden(config.getCurrentFeedPageNumber() < 1);
            this.getNextBtn().setHidden(Ext.getStore('Messages').getCount() < config.getFeedPageSize());
        }, this);
    },
    onNext: function() {
        this.getPreviousBtn().setHidden(true);
        this.getNextBtn().setHidden(true);

        var config = ttapp.config.Config;
        config.setCurrentFeedPageNumber(config.getCurrentFeedPageNumber() + 1);
        ttapp.util.FeedProxy.process(true, function() {
            this.getPreviousBtn().setHidden(false);
            this.getNextBtn().setHidden(Ext.getStore('Messages').getCount() < config.getFeedPageSize());
        }, this);
    },
    onShowTinkInFeed: function(list, idx, target, record, evt) {
        var element = Ext.get(evt.target),
            me = this;

        Ext.getStore('profilestore').getPhoneNumber(function(from_user) {
            if ((from_user != record.data.from_user) && (record.data.unread)) {
                me.tinkRead(element, record);
            }

            me.getApplication().getController("ttapp.controller.ReplayTink").addReplay(record.data.seconds_sent, record.data.text, record.data.trinket_name);
        });
    },
    tinkRead: function(element, record) {
        //just mark it read locally, next refresh from server will get get correct values anyways
        element.parent('.read-or-not').removeCls('true').addCls('false');
        element.parent('.read-or-not').query('.img-bg')[0].style.background = 'url(' + record.data.original_trinket_file_path + ')';

        //mark the tink as read on the server
        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/message-read/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            jsonData: {
                "from_user": record.data.from_user,
                "to_user": record.data.to_user,
                "send_timestamp": record.data.send_timestamp,
                "trinket_name": record.data.trinket_name,
                "text": record.data.text,
                "seconds_sent": record.data.seconds_sent,
                "unread": false
            },

            success: function(response) {
                console.log(response.responseText);
            }
        });

        //change the red dot on email icon
        ttapp.util.Common.updateNotifySymbol(false);
    },
    returnFormattedDate: function(timestamp) {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date(timestamp);

        var date = d.getDate();
        var month = monthNames[d.getMonth()];
        var year = d.getFullYear();

        return month + ' ' + date + ', ' + year;
    }
});
