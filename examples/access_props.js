var R = require('ramda')
var _ = require('underscore')

var rfunc = {}
var ufunc = {}

// get 'games' key from player history
ufunc.getGames = _.property('games')

rfunc.getGames = R.prop('games')

// grab deeply nested keys using a composition
ufunc.getFirstGame = _.compose(
  _.property(0),
  ufunc.getGames
)

rfunc.getFirstGame = R.compose(
  R.prop(0),
  rfunc.getGames
)

// grab deeply nested keys using a curried function
rfunc.getFirstGameCurried = R.path(['games', 0]) //takes 2 arguments, but we only supplied one

// demonstration of why argument order is important
ufunc.curriedMap = R.curry(u.map) // underscore functions are not curried

rfunc.getOwnTeamIds = R.compose(
  R.map(R.prop('teamId')), //ramda takes data last in all its functions
  rfunc.getGames
)

ufunc.getOwnTeamIds = _.compose(
  ufunc.curriedMap(R._, _.property('teamId')), // no longer pointfree, we're now referencing data
  ufunc.getGames
)

ufunc.getOwnTeamIdsUncurried = _.compose(
  _.partial(_.map, _, _.property('teamId')), // have to use partial every time you want to only pass in some arguments
  ufunc.getGames
)

module.exports = {
  ufunc: ufunc,
  rfunc: rfunc
}
