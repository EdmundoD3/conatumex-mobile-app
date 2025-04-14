import { fakeListClient } from "./devConstants"

export class DemoRepository {
  constructor(){}
  getById(id:string){
    return fakeListClient.find((e)=>e.id==id)
  }
  getByNameOrDirection(value){
    return fakeListClient.filter(e=>e.name.includes(value)||e.direction.includes(value))
  }
}