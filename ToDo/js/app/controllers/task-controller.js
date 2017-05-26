App.TaskController = Ember.ArrayController.extend({
   actions: {
      removeItem(task) {
         task.destroyRecord();
      }
   }
});
