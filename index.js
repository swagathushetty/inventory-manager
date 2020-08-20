//global variables 
let shipping
let discount
let warehouseCountry
let passport
let GlovesQty
let maskQty




//DATA
//Since data is small I chose to use a simple array
const inventory = [
  {
    country: "UK",
    glovesQty: 100,
    glovePrice: 100,
    maskQty: 100,
    maskPrice: 65,
    passportStart: "B"
  },
  {
    country: "germany",
    glovesQty: 50,
    glovePrice: 150,
    maskQty: 100,
    maskPrice: 100,
    passportStart: "A"
  }
]







//calculate the total inventory in our warehouses
// I know its messy, can be improved in future 
let totalMasInventory = inventory[0].maskQty + inventory[1].maskQty
let totalGloveInventory = inventory[0].glovesQty + inventory[1].glovesQty
let maskUK = inventory[0].maskQty
let gloveUk = inventory[0].glovesQty
let maskGB = inventory[1].maskQty
let gloveGB = inventory[1].glovesQty
let gloveUKprice = inventory[0].glovePrice
let maskUKprice = inventory[0].maskPrice
let gloveGBprice = inventory[1].glovePrice
let maskGBprice = inventory[1].maskPrice

console.log(totalMasInventory, totalGloveInventory)












//fetch the user input from the terminal
const input = process.argv[2]
console.log(input)

//processing user input
const data = input.split(':')
warehouseCountry = data[0]
if (data[1].startsWith('A') || data[1].startsWith('B')) {
  if (data[1].startsWith('A')) {
    passport = 'Germany'
  } else if (data[1].startsWith('B')) {
    passport = 'UK'
  } else {
    return console.log('sorry we only ship to UK and germany. your passport is nither of them')
  }

  GlovesQty = data[3]
  maskQty = data[5]
} else {
  GlovesQty = data[2]
  maskQty = data[4]
}

if (passport === undefined) {
  passport = warehouseCountry
}
console.log('user entered details')
console.log(warehouseCountry, passport, GlovesQty, maskQty)

if (!warehouseCountry || !passport || !GlovesQty || !maskQty) {
  console.log('Sorry you entered in a wrong format. refer manual for instructrions')
  return
}













//class to calulate everything
class createOrder {
  constructor(warehouseCountry, purchaserCountry, gloveOrder, maskOrder, glovesInvt, maskInvt) {
    this.warehouseCountry = warehouseCountry
    this.purchaserCountry = purchaserCountry
    this.gloveOrder = gloveOrder
    this.maskOrder = maskOrder
    this.totalAmount = 0
    this.glovesInvt = glovesInvt
    this.maskInvent = maskInvt
    this.local = true

    this.fetchedMask = null
    this.fetchedGloves = null
  }

  calculateshipping() {
    //first get the total no of orders in multiples of 10. roundofff the number
    //if the purchase is from outside UK /gemany then its 400 for every 10
    //if the order is from UK or germany then 20% discount

  }

  calculatesalePrice() {

    //order from UK warehouse from UK customer
    if (this.purchaserCountry == 'UK' && this.warehouseCountry == 'UK') {
      console.log(this.maskOrder, maskUK, this.gloveOrder, gloveUk)
      if (this.maskOrder <= maskUK && this.gloveOrder <= gloveUk) {
        this.totalAmount = (this.maskOrder * maskUKprice) + (this.gloveOrder * gloveUKprice)
        this.printOrder(this.totalAmount, maskUK - this.maskOrder, maskGB, gloveUk - this.gloveOrder, gloveGB)
      } else {
        //fetch from other warehouse
        if (this.maskOrder > maskUK) this.fetchedMask = this.maskOrder - maskUK
        if (this.gloveOrder > gloveUk) this.fetchedGloves = this.gloveOrder - gloveUk


        this.totalAmount = (maskUK * maskUKprice) + (this.fetchedMask * maskGBprice) + (gloveUk * gloveUKprice) + (this.fetchedGloves * gloveGBprice)
        console.log(this.totalAmount)

        //if we fetched from other warehouse it means we used up local inventory
        if (this.fetchedMask) {
          maskUK = 0
          this.maskOrder = 0
        }
        if (this.fetchedGloves) {
          gloveUk = 0
          this.gloveOrder = 0
        }

        this.printOrder(this.totalAmount, maskUK - this.maskOrder, maskGB - this.fetchedMask, gloveUk - this.gloveOrder, gloveGB - this.fetchedGloves)
      }
    }

    //order from german warhouse from german customer
    if (this.purchaserCountry == 'Germany' && this.warehouseCountry == 'Germany') {
      console.log(this.maskOrder, maskUK, this.gloveOrder, gloveUk)
      if (this.maskOrder <= maskGB && this.gloveOrder <= maskGB) {
        this.totalAmount = (this.maskOrder * maskGBprice) + (this.gloveOrder * gloveGBprice)
        console.log(this.totalAmount)
      } else {
        const fetchedMask = this.maskOrder - maskGB
        const fetchedGloves = this.gloveOrder - gloveGB

        this.totalAmount = (maskGB * maskGBprice) + (fetchedMask * maskUKprice) + (gloveGB * gloveGBprice) + (fetchedGloves * gloveUKprice)
        console.log(this.totalAmount)
        // this.printOrder(this.totalAmount,this.maskOrder-maskUK,)
      }
    }

    //check if local country has enough stock



  }


  //before anything we check if we do have the required nos
  checkInventory() {
    if (this.maskOrder > this.maskInvent || this.gloveOrder > this.glovesInvt) {
      return this.printOrder('OUT_OF_STOCK', maskUK, maskGB, gloveUk, gloveGB)
    }
    this.calculatesalePrice()

  }


  printOrder(salePrice, maskUKInvt, maskGBInt, gloveUKInt, gloveGBInvt) {
    console.log(`${salePrice}:${maskUKInvt}:${maskGBInt} ${gloveUKInt}:${gloveGBInvt}`)
  }
}












const order = new createOrder(warehouseCountry, passport, GlovesQty, maskQty, totalGloveInventory, totalMasInventory)
order.checkInventory()


// const order = new InventoryManager()

// console.log(data)
