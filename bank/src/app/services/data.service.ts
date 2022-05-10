import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options ={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentAcno: any
  currentUname: any

  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 50000, transaction: [] },
    1001: { acno: 1001, uname: "ammu", password: 1001, balance: 55000, transaction: [] },
    1002: { acno: 1002, uname: "appu", password: 1002, balance: 60000, transaction: [] }
  }

  constructor(private http : HttpClient ) { 
    // this.getData()
  }

  // store in local storage
  storeData() {
    localStorage.setItem("database", JSON.stringify(this.database))
    if (this.currentAcno) {
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }
    if (this.currentAcno) {
      localStorage.setItem("currentUname", JSON.stringify(this.currentUname))
    }
  }

  // get data from local storage
  getData() {
    if (localStorage.getItem("database")) {
      this.database = JSON.parse(localStorage.getItem("database") || '')
    }
    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }
    if (localStorage.getItem("currentUname")) {
      this.currentUname = JSON.parse(localStorage.getItem("currentUname") || '')
    }

  }


  // regiser fnctn
  register(acno:any, password:any, uname:any) {
    //json data
    const data ={
      acno,password,uname
    }
    //register API
    return this.http.post('http://localhost:3000/register',data)

    // let database = this.database

    // if (acno in database) {
    //   return false
    // }
    // else {
    //   database[acno] = {
    //     acno,
    //     uname,
    //     password,
    //     balance: 0,
    //     transaction: []

    //   }
    //   console.log(database);
    //   this.storeData()
    //   return true
    // }
  }


  // login  function
  login(acno: any, password: any) {
    const data ={
      acno,password
    }

    return this.http.post('http://localhost:3000/login',data)


    // let database = this.database
    // if (acno in database) {
    //   if (password == database[acno]["password"]) {
    //     this.currentAcno = acno

    //     this.currentUname = database[acno]["uname"]
    //     this.storeData()
    //     return true
    //   }
    //   else {
    //     alert("incorect password")
    //     return false
    //   }
    // }
    // else {
    //   alert("invalid user")
    //   return false
    // }
  }



  // deposite function
  deposite(acno: any, password: any, amt: any) {

    const data = {
      acno,
      password,
      amt
    }

   
//api
    return this.http.post('http://localhost:3000/deposite',data,this.getOptions())


    // var amount = parseInt(amt)

    // let database = this.database
    // if (acno in database) {

    //   if (password == database[acno]["password"]) {

    //     database[acno]["balance"] += amount

    //     database[acno]["transaction"].push({
    //       amount: amount,
    //       type: "CREDIT"
    //     })
    //     // console.log(database);
    //     this.storeData()
    //     return database[acno]["balance"]

    //   }
    //   else {
    //     alert("incorect password")
    //     return false
    //   }

    // }
    // else {
    //   alert("invalid user")
    //   return false
    // }
  }

  getOptions(){
     // fetch token from local storage
const token =JSON.parse( localStorage.getItem('token')||'')
// create req headr
let headers = new HttpHeaders()
if(token){
  headers = headers.append('x-access-token',token)
  options.headers = headers
}
return options
  }




  // withdrow function
  withdrow(acno: any, password: any, amt: any) {
     const data = {
      acno,
      password,
      amt
    }

    //api

    return this.http.post('http://localhost:3000/withdrow',data,this.getOptions())

    // var amount = parseInt(amt)

    // let database = this.database
    // if (acno in database) {

    //   if (password == database[acno]["password"]) {

    //     if (database[acno]["balance"] > amount) {

    //       database[acno]["balance"] -= amount

    //       database[acno]["transaction"].push({
    //         amount: amount,
    //         type: "DEBIT"
    //       })
    //       // console.log(database);
    //       this.storeData()
    //       return database[acno]["balance"]
    //     }

    //     else {
    //       alert("insufficient balance")
    //     }

    //   }
    //   else {
    //     alert("incorect password")
    //     return false
    //   }

    // }
    // else {
    //   alert("invalid user")
    //   return false
    // }

  }


  // transaction history
  getTransaction(acno: any) {
    const data = {
      acno
    }

    //api

    return this.http.post('http://localhost:3000/transaction',data,this.getOptions())

    // return this.database[acno]["transaction"]

  }

  delete(acno:any){
//api
return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())

  }

}
