App.TaskController = Ember.ArrayController.extend({
   isEditing: false,
   hiddenBtn: true,

   completed: function() {
		return this.filterProperty("completed", false);
	}.property("@each.completed"),

   actions: {
      removeItem(task) {
         task.destroyRecord();
      },

      showRemoveBtn(task) {
         task.set('hiddenBtn', true);
      },

      hideRemoveBtn(task) {
         task.set('hiddenBtn', false);
      },

      editTask(task) {
         if (!task.get('completed')) {
            task.set('isEditing', true);
         }
      },

      edited(task) {
         task.set('isEditing', false);
      }
   }
});
