db.friends
  .aggregate ([{$project: {_id: 0, numScores: {$size: '$examScores'}}}])
  .pretty ();

db.friends.aggregate ([
    {
      $project: {
        _id: 0,
        examScores: 1,
        examScore: {$slice: ['$examScores', 2, 1]},
      },
    },
    {
      $project: {
        size: {$size: '$examScores'}
      },
    },
    {
      $project: {
        examScore: 1,
        size: 1,
        isPass: {
          $cond: {
            if: {$gte: ['$size', 4]},
            then: 'Pass',
            else: 'Fail',
          },
        },
      },
    },
  ]).pretty (); //fail
