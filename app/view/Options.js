Ext.define('ttapp.view.Options', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'options',
    config: {
        itemId: 'options',
        fullscreen: true,
        activeItem: 2,
        defaults: {
            styleHtmlContent: true
        },
        items: [
            {
                xtype: 'trinket'
            },
            {
                xtype: 'tink'
            },
            {
                xtype: 'split'
            },
            {
                xtype: 'feed'
            }
        ]
    }
});