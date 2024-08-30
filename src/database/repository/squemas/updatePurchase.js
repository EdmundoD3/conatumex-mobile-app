class Note {
  constructor({ note, date }) {
    this.note = note
    this.date = date
  }
}
class CollectionFrequency {
  constructor({ frequency, amount }) {
    this.frequency = verify(frequency) ? frequency : null;
    this.amount = amount
  }
  get() {
    return this.frequency
  }
  verify(frequency) {
    const freq = ["sem", "qna", "mes"]
    const isValid = freq.some(frequency)
    return isValid
  }
}
class Payment {
  constructor({ date, amount, receiptId = "" }) {
    this.date = date
    this.amount = amount
    this.receiptId = receiptId
  }
}
class PurchaseUpdate {
  constructor({
    id,
    notes = [],
    collectionFrequency,
    payments = []
  }) {
    this.id = id
    this.notes = notes
    this.collectionFrequency =  collectionFrequency
    this.payments = payments
  }
}

export { PurchaseUpdate, CollectionFrequency, Note, Payment }