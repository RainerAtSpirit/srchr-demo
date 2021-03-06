define([
  'use!underscore',
  'views/base',
  'text!views/templates/recentSearches.html',
  'text!views/templates/recentSearch.html'
], function(_, View, tpl, itemTpl) {
  return View.extend({
    template : tpl,
    itemTpl : _.template(itemTpl),

    prepare : function() {
      if (!_.isFunction(this.currentSearch)) {
        throw new Error('Recent searches component needs a currentSearch function');
      }
      this.bindTo(this.searches, 'add remove change', this._update);
    },

    postRender : function() {
      this._update();
    },

    _update : function() {
      this.searches.sort();

      var tpl = this.itemTpl,
          currentSearch = this.currentSearch(),
          html = this.searches.map(function(item) {
            var data = item.toJSON();

            if (data.term) {
              data.current = data.term === currentSearch;
              return tpl(data);
            }

            return '';
          }).join('');

      this.$('.js-searches').html(html);
    }
  });
});
