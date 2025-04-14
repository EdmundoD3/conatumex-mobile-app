// import { UsersRepository } from "../repository/CuentaRepository"
// import { PagosRepository } from "../repository/PagosRepository"
// import { ProductoRepository } from "../repository/ProductoRepository"
// import { StatusReq } from "./statusSquema"

// class Product {
//   constructor({ quantity, product, productId,contado = 70000, credito =100000 }) {
//     this.quantity = quantity
//     this.producto = product
//     this.id = productId
//     this.contado = contado
//     this.credito = credito
//   }
//   save(){
//     const newProduct = new ProductoRepository(this)
//     return newProduct.getOrSave()
//   }
// }
// class Products {
//   constructor(products=[]){
//     this.products = products.map(product=>new Product(product))
//   }
//   save(){
//     return Promise.all(this.products.map(product=>product.save()))
//   }
// }

// class Payment {
//   constructor({
//     date,
//     amount,
//     cuentaId,
//   }) {
//     this.date = new Date(date)
//     this.pago = amount
//     this.cuenta_id = cuentaId
//   }
// }
// class Payments {
//   constructor(payments=[],cuentaId){
//     this.payments = payments.map(payment=> new Payment({...payment,cuentaId}))
//   }
//   async save(){
//     PagosRepository.saveAll(this.payments)
//   }
  
// }

// class Note {
//   constructor({ date,
//     user,
//     note }) {
//     this.date = date
//     this.user = user
//     this.note = note
//   }
// }

// class Notes {
//   constructor(notes=[]){
//     this.notes = notes.map(note=>new Note(note))
//   }
//   save(){
//     return
//   }
// }
// class CollectionFrequency {
//   constructor({ amount, frequency }) {
//     this.amount = amount
//     this.frequency = frequency
//   }
// }

// class UserRequest {
//   constructor({ id, name }) {
//     this.id = id
//     this.name = name
//   }
//   async save() {
//     const newUser = new UsersRepository({id:this.id,user:this.name})
//     console.log(newUser);
//     return await newUser.getOrSave()
//   }
// }

// class PurchaseRequestSquema {
//   constructor({
//     id,
//     customerId,
//     vendedor,
//     cobrador,
//     saleDate,
//     creditPrice,
//     cashPrice,
//     cashPriceEndDate,
//     collectionDate,
//     notes=[],
//     collectionFrequency,
//     sentToCobrador,
//     products,
//     totalPaid,
//     payments=[],
//     updatedAt,
//     status,
//     isActive,
//   }) {
//     this.id=id
//     this.vendedor = new UserRequest(vendedor);
//     this.cobrador = new UserRequest(cobrador);
//     this.saleDate = new Date(saleDate)
//     this.creditPrice = creditPrice
//     this.cashPrice = cashPrice
//     this.cashPriceEndDate = cashPriceEndDate || (() => {
//       const fecha = new Date(saleDate); 
//       fecha.setMonth(fecha.getMonth() + 1); 
//       fecha.setDate(fecha.getDate() + 10); 
//       return fecha;
//     })();
//     this.collectionDate = collectionDate
//     this.notes = new Notes(notes)
//     this.collectionFrequency = new CollectionFrequency(collectionFrequency)
//     this.sentToCobrador = sentToCobrador
//     this.products = new Products(products,customerId)
//     this.totalPaid = totalPaid
//     this.payments = new Payments(payments)
//     this.updatedAt = updatedAt
//     this.statusId = new StatusReq(status)
//     this.isActive = isActive
//   }
//   async save() {
//     try {
//       this.products.save()
//       this.cobrador.save()
//       this.vendedor.save()
//       console.log(this)
//     } catch (error) {
//       console.log("purchase error");
//       console.log(error);
//     }

//   }
// }

// export { PurchaseRequestSquema }