import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim = "Your Perfect Banking Parner"//string interpolation
  accno = "account numbrr pleeasss" //property binding
  acno = ""
  pwd = ""

  // database: any = {
  //   1000: { acno: 1000, uname: "Neer", password: 1000, balance: 50000 },
  //   1001: { acno: 1001, uname: "ammu", password: 1001, balance: 55000 },
  //   1002: { acno: 1002, uname: "appu", password: 1002, balance: 60000 }
  // }
  loginForm=this.fb.group({
    acno:[``,[Validators.required,Validators.pattern(`[0-9]*`)]],
    pwd:[``,[Validators.required,Validators.pattern(`[a-zA-Z0-9]*`)]]
  })

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { } //***dependency injection

  ngOnInit(): void {
  }
  //event bindin by argument
  acnoachange(event: any) {
    this.acno = event.target.value
    console.log(this.acno)

  }
  pwdachange(event: any) {
    this.pwd = event.target.value
    console.log(this.pwd)

  }
  // login(a:any,p:any) {
  //   // alert("login clicked!!!!")
  //   var acno = a.value
  //   var pwd = p.value
  //   let database = this.database
  //   if (acno in this.database) {

  //     if (pwd == database[acno]["password"]) {
  //       alert("login success!!!")
  //     }
  //     else {
  //       alert("incorect passwd!!!")
  //     }
  //   }
    
  //   else {
  //     alert("invalid user!!!")
  //   }

  // }

  //event binding functn
  login() {
    // alert("login clicked!!!!")
    var acno = this.loginForm.value.acno
    var pwd = this.loginForm.value.pwd

    if(this.loginForm.valid){
    // const result=this.ds.login(acno,pwd)
    const result =this.ds.login(acno,pwd)
    .subscribe((result:any)=>{
       if(result){
      // alert("login success!!")
      // this.router.navigateByUrl("dashboard")

      localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
      localStorage.setItem('currentUname',JSON.stringify(result.currentUname))
      localStorage.setItem('token',JSON.stringify(result.token))
      alert(result.message)

      this.router.navigateByUrl("dashboard")


    }
  },

  (result)=>{
    alert(result.error.message)
  })


  }

  else{
    alert("invalid form")
  }
   
  }
  

}
