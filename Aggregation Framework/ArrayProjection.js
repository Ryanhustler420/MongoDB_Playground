db.friends
  .aggregate ([
    {$project: {_id: 0, examScore: {$slice: ['$examScores', 2, 1]}}},
  ])
  .pretty ();

db.friends.aggregate ([
    {
      $project: {
        _id: 0,
        examScore: {$slice: ['$examScores', 2, 1]},
      },
    },
    {$unwind: "$examScore"},
    {
      $project: {
        examScore: 1,
        isPass: {
          $cond: {if: {$gte: ['$examScore.score', 70]}, then: 'Pass', else: 'Fail'},
        },
      }
    }
  ]).pretty ();
