App.Task = DS.Model.extend({
   description: DS.attr('string'),
   completed: DS.attr('boolean')
});

App.Task.FIXTURES = [
   {
      id: '1',
      description: 'Buy some milk',
      completed: false
   },
   {
      id: '2',
      description: 'Go to store',
      completed: false
   }
];
