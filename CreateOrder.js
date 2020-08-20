
const inventory = require('./data')


//calculate the total inventory in our warehouses
// I know its messy, can be improved in future 
let maskUK = inventory[0].maskQty
let gloveUk = inventory[0].glovesQty
let maskGB = inventory[1].maskQty
let gloveGB = inventory[1].glovesQty
let gloveUKprice = inventory[0].glovePrice
let maskUKprice = inventory[0].maskPrice
let gloveGBprice = inventory[1].glovePrice
let maskGBprice = inventory[1].maskPrice


const UKWareHouse = {
  mask: {
    price: maskUKprice,
    qty: maskUK
  },
  glove: {
    price: gloveUKprice,
    qty: gloveUk
  }
}

const germanWarehouse = {
  mask: {
    price: maskGBprice,
    qty: maskGB
  },
  glove: {
    price: gloveGBprice,
    qty: gloveGB
  }

}



class CreateOrder {
  constructor(warehouseCountry, purchaserCountry, gloveOrder, maskOrder, glovesInvt, maskInvt) {
    this.warehouseCountry = warehouseCountry
    this.purchaserCountry = purchaserCountry
    this.gloveOrder = gloveOrder
    this.maskOrder = maskOrder
    this.totalAmount = 0
    this.glovesInvt = glovesInvt
    this.maskInvent = maskInvt
    this.local = true

    this.shippingCost = null

    this.fetchedMask = null
    this.fetchedGloves = null
  }

  calculateshipping() {
    const totalMaskOrderQtybase10 = Math.round(this.maskOrder / 10)
    const totalGloveOrderQtybase10 = Math.round(this.gloveOrder / 10)
    if (this.warehouseCountry === this.purchaserCountry) {
      this.shippingCost = 0
      // console.log(this.shippingCost)

    } else if (this.purchaserCountry === 'UK' || this.purchaserCountry === 'Germany') {
      console.log(totalMaskOrderQtybase10, totalGloveOrderQtybase10)
      this.shippingCost = (320 * totalMaskOrderQtybase10) + (320 * totalGloveOrderQtybase10)
      // console.log(this.shippingCost)

    } else {
      this.shippingCost = (400 * totalMaskOrderQtybase10) + (400 * totalGloveOrderQtybase10)

    }

    console.log('the total shipping cost is ', this.shippingCost)

  }

  calculatesalePrice() {

    const lowestMaskPrice = Math.min(UKWareHouse.mask.price, germanWarehouse.mask.price)
    const lowestGlovePrice = Math.min(UKWareHouse.glove.price, germanWarehouse.glove.price)


    //these two are pointer to the orginal data
    let lowestPriceMaskStock
    let lowestPriceGloveStock
    let BackupWareHouseForMask
    let BackupWareHouseForGlove


    if (lowestMaskPrice === maskUKprice) {
      lowestPriceMaskStock = UKWareHouse
      BackupWareHouseForMask = germanWarehouse
    } else {
      lowestPriceMaskStock = germanWarehouse
      BackupWareHouseForMask = UKWareHouse
    }

    if (lowestGlovePrice === gloveUKprice) {
      lowestPriceGloveStock = UKWareHouse
      BackupWareHouseForGlove = germanWarehouse
    } else {
      lowestPriceGloveStock = germanWarehouse
      BackupWareHouseForGlove = UKWareHouse
    }
    // console.log('lowest price for glove is ', lowestGlovePrice, ' and has a quantity of ', lowestPriceGloveStock)
    // console.log('lowest price for mask is ', lowestMaskPrice, ' and has a quantity of ', lowestPriceMaskStock)
    this.totalAmount = (lowestGlovePrice * this.gloveOrder) + (lowestMaskPrice * this.maskOrder)


    //check if the lowest price item warehouse can meet the order requirement
    // console.log(lowestPriceGloveStock.glove.qty, this.gloveOrder)
    if (lowestPriceMaskStock.mask.qty >= this.maskOrder && lowestPriceGloveStock.glove.qty >= this.gloveOrder) {
      this.totalAmount = (lowestGlovePrice * this.gloveOrder) + (lowestMaskPrice * this.maskOrder)
      lowestPriceMaskStock.mask.qty = lowestPriceMaskStock.mask.qty - this.maskOrder
      lowestPriceGloveStock.glove.qty = lowestPriceGloveStock.glove.qty - this.gloveOrder
      console.log(lowestPriceMaskStock.mask.qty, lowestPriceGloveStock.glove.qty)
      // console.log(lowestPriceMaskStock, lowestPriceGloveStock)
      this.totalAmount = this.totalAmount + this.shippingCost
      // console.log('total amount is ', this.totalAmount)
      this.printOrder(this.totalAmount, UKWareHouse.mask.qty, germanWarehouse.mask.qty, UKWareHouse.glove.qty, germanWarehouse.glove.qty)
    } else {
      //if we need to fetch data from other warehouse
      //fetch from other warehouse
      if (this.maskOrder > lowestPriceMaskStock.mask.qty) this.fetchedMask = this.maskOrder - lowestPriceMaskStock.mask.qty
      if (this.gloveOrder > lowestPriceGloveStock.glove.qty) this.fetchedGloves = this.gloveOrder - lowestPriceGloveStock.glove.qty


      // console.log(this.fetchedMask, this.fetchedGloves)

      const fetchedMaskAmount = this.fetchedMask * BackupWareHouseForMask.mask.price
      const fetchedGloveAmount = this.fetchedGloves * BackupWareHouseForGlove.glove.price

      // console.log(fetchedGloveAmount, fetchedMaskAmount)

      this.totalAmount = this.totalAmount + fetchedGloveAmount + fetchedMaskAmount

      //update stock
      if (this.fetchedGloves) {
        lowestPriceGloveStock.glove.qty = 0
        BackupWareHouseForGlove.glove.qty = BackupWareHouseForGlove.glove.qty - this.fetchedGloves
      }
      if (this.fetchedMask || !feth) {
        lowestPriceMaskStock.mask.qty = 0
        BackupWareHouseForMask.mask.qty = BackupWareHouseForMask.mask.qty - this.fetchedMask
      }


      //if nothing was fetched from the outside warehouse subtract from original warehouse
      if (!fetchedMaskAmount) lowestPriceMaskStock.mask.qty = lowestPriceMaskStock.mask.qty - this.maskOrder
      if (!fetchedGloveAmount) lowestPriceGloveStock.glove.qty = lowestPriceGloveStock.glove.qty = this.gloveOrder



      // console.log(BackupWareHouseForGlove.glove.qty, BackupWareHouseForMask.mask.qty)

      this.printOrder(this.totalAmount, UKWareHouse.mask.qty, germanWarehouse.mask.qty, UKWareHouse.glove.qty, germanWarehouse.glove.qty)

    }


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

module.exports = CreateOrder