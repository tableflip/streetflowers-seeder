var Faker = require('faker')
var fakeLocate = require('./fakeLocate')
var mongod = require('mongodb-wrapper')
var shortid = require('shortid')
var stop = parseInt(process.argv[2]) || 250
var name = process.argv[3] || 'test'
var db = mongod.db('localhost', 27017, name)
db.collection('users')

addOne(0)

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
  var location = fakeLocate()
  var business_ = _getBusinessType()
  var username = Faker.internet.userName()

  return {
    puid: shortid(),
    name: Faker.name.findName(),
    email: Faker.internet.email(),
    password: Faker.internet.password(),
    profile: {
      puid: shortid(),
      business_name: Faker.company.companyName(),
      address: Faker.address.streetAddress(),
      postcode: location.postcode,
      business_type: business_.type,
      business_description: Faker.lorem.sentence(),
      mf_time: '09:30',
      mf_close_time: '15:55',
      sat_time: '10:00',
      sat_close_time: '17:00',
      sun_time: '12:00',
      sun_close_time: '16:00',
      website: Faker.internet.url(),
      phone_number: Faker.phone.phoneNumber(),
      twitter: 'http://twitter.com/' + username,
      facebook: 'http://facebook.com/' + username,
      location: {
        lat: location.lat,
        lng: location.lng 
      },
      icon: business_.icon,
      image: Faker.image.imageUrl()
    }
  }
}

var types = [ 'Food & Drink',
  'Clothes & Fashion',
  'Home & Office',
  'Service or Business',
  'Trade & Craft People',
  'Beauty & Styling',
  'Leisure & Activities',
  'Other']

var icons = ['arts-crafts-hobbies', 'beauty-grooming', 'bookshops', 'charity', 'commerce-finance', 'counter-services', 'electrical-hardware', 'entertainment', 'faith', 'fashion', 'food-drink', 'general-holding', 'health-and-fitness', 'home-and-garden', 'medical-dental-pharma', 'nightlife', 'popup-event', 'retail-shopping', 'sport-and-outdoors', 'store', 'trade-services', 'transport']

function _getBusinessType () {
  return {
    type: Faker.random.arrayElement(types),
    icon: Faker.random.arrayElement(icons)
  }
}
