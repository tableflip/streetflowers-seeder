var Faker = require('Faker')
var fakeLocate = require('./fakeLocate')
var mongod = require('mongodb-wrapper')
var db = mongod.db('localhost', 27017, 'test')
db.collection('users')
var stop = parseInt(process.argv[2]) || 250

addOne(1)

function addOne (count) {
  if (count === stop) return process.exit()
  var business = new Business()
  db.users.save(business, function (err) {
    if (err) throw new Error(err)
    console.log(business.profile.business_name,'seeded successfully')
    count = count+1
    addOne(count)
  })
}

function Business () {

  var address = [
    Faker.Address.streetName(),
    Faker.Address.streetAddress(),
    Faker.Address.ukCounty()
  ].join(',')

  var location = fakeLocate()

  var business_ = _getBusinessType()

  return {
    name: Faker.Name.findName(),
    email: Faker.Internet.email(),
    password: Faker.Internet.domainWord(),
    image: Faker.Image.abstractImage(),
    profile: {
      business_name: Faker.Company.companyName(),
      address: address,
      postcode: location.postcode,
      business_type: business_.type,
      business_description: Faker.Lorem.sentences(),
      mf_time: '09:30',
      mf_close_time: '15:55',
      sat_time: '10:00',
      sat_close_time: '17:00',
      sun_time: '12:00',
      sun_close_time: '16:00',
      offer: 'none',
      website: Faker.Internet.domainName(),
      phone_number: Faker.PhoneNumber.phoneNumber(),
      color: business_.color,
      location: {
        lat: location.lat,
        lng: location.lng 
      }
    }
  }

}

function _getBusinessType () {
  var businesses = [
    ["food_drink", "purple"],
    ["clothes_fashion", "red"],
    ["home_office", "brown"],
    ["service_business", "beige"],
    ["trades_crafts_people", "light-purple"],
    ["beauty_styling", "light-blue"],
    ["leisure_activities", "blue"],
    ["other", "grey"]
  ]
  var index = Math.floor(Math.random() * businesses.length-1) + 1
  var selected = businesses[index]
  return {
    type: selected[0],
    color: selected[1]
  }
}
