db.friends
  .aggregate ([
    {$unwind: '$hobbies'},
    {
      $group: {
        _id: {age: '$age'},
        allHobbies: {$addToSet: '$hobbies'},
        nPerson: {$sum: 1},
      },
    },
  ])
  .pretty ();
