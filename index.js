const createOrder = require('./CreateOrder') //class we import

const inventory = require('./data')
let totalMasInventory = inventory[0].maskQty + inventory[1].maskQty
let totalGloveInventory = inventory[0].glovesQty + inventory[1].glovesQty


let shipping
let discount
let warehouseCountry
let passport
let GlovesQty
let maskQty



//the total input if user included passport is 6
//if user excluded passport the total input is 5


//fetch the user input from the terminal
const input = process.argv[2]
console.log(input)

//processing user input
const data = input.split(':')
warehouseCountry = data[0] //store country

//user has also entered passport details
if (data.length === 6) {
  if (data[1].startsWith('A')) {
    passport = 'Germany'
  } else if (data[1].startsWith('B')) {
    passport = 'UK'
  } else {
    passport = 'INTERNATIONAL'
  }
  GlovesQty = data[3]
  maskQty = data[5]
} else if (data.length === 5) {
  passport = 'INTERNATIONAL'
  GlovesQty = data[2]
  maskQty = data[4]
} else {
  return console.log('The entered format seems incorrect')
}


console.log('user entered details')
console.log(warehouseCountry, passport, GlovesQty, maskQty)

if (!warehouseCountry || !GlovesQty || !maskQty) {
  console.log('Sorry you entered in a wrong format. refer manual for instructrions')
  return
}





const order = new createOrder(warehouseCountry, passport, GlovesQty, maskQty, totalGloveInventory, totalMasInventory)
order.calculateshipping()

order.checkInventory()


