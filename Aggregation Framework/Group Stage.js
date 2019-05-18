db.persons
  .aggregate ([
    {$match: {gender: 'female', state: 'sivas'}},
    {$group: {_id: {state: '$location.state'}, totalPersons: {$sum: 1}}},
  ])
  .pretty ();

db.persons
  .aggregate ([
    {$match: {gender: 'female', state: 'sivas'}},
    {
      $group: {
        _id: {state: '$location.state'},
        totalPersons: {$sum: '$dob.age'},
      },
    },
  ])
  .pretty ();
