var test = require('tape')
var fakeLocate = require('./fakeLocate')

test('returns three properties', function (t) {
  t.plan(3)
  var location = fakeLocate()
  t.equals(typeof location.postcode, 'string', 'returns a postcode')
  t.equals(typeof location.lat, 'number', 'returns a lat')
  t.equals(typeof location.lng, 'number', 'returns a lng')
  t.end()
})