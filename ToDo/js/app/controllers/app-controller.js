App.ApplicationController = Ember.Controller.extend({
   actions: {
      createItem() {
         let item = this.store.createRecord('task', {
               description: this.get('inputName'),
               completed: false
         });
         this.set('inputName', '');
      }
   }
});
