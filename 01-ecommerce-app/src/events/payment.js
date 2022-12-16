export default class Payment {
  constructor(subject){
    this.paymentSubject = subject
  }

  creditCard({id, userName}){
    console.log(`\na payment occurred from ${userName}`);
    this.paymentSubject.notify({id, userName})
  }
}