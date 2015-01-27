Ext.define('ttapp.view.Landing', {
	extend: 'Ext.Container',
	xtype: 'landing',
	requires: ['Ext.Label'],
	config:{
		fullscreen: true,
		styleHtmlContent: true,		
		layout: 'vbox',
		cls: 'cls-tt-landing',
		items: 
		  [
		  { xtype: 'spacer', flex: 2 },
		  {
		  	xtype: 'container',
		  	layout: 'hbox',
		  	flex: 1,
		  	items:
		  	[
			  	{xtype: 'spacer', flex:1},
			  	{
			  		xtype: 'container',
		  			layout: 'vbox',
		  			flex: 1,
		  			items:
		  			[{
			  			xtype: 'label',
						html: '<h2>Tinktime</h2>',
						flex: 2,
						style: 'text-align:center;'
					},
					{
						xtype: 'button',
						text: "begin",
						cls: "clsBegin",
	                	ui: 'confirm-round',
	                	flex: 1
					}
		  			]
				  	
				},
				
				{xtype: 'spacer', flex:1}
		  	]
	       },	
	       { xtype: 'spacer', flex: 2 },
    	]

	}
 });