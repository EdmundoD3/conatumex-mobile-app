export class Payments {
  date:string | Date
  amount:number
  receiptId:string
  constructor({amount,date,receiptId}:{receiptId:string,date:string | Date,amount:number}){
    this.date = date
    this.amount = amount
    this.receiptId = receiptId
  }
}
export class ActualizeCobradorDataRequest {
  id:string
  payments:Payments[]
  constructor(PurchaseId:string,payments:Payments[]){
    this.id = PurchaseId
    this.payments=payments
  }
}