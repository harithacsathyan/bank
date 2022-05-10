import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  acno:any
  // pwd = ""
  // amount = ""

  // acno1 = ""
  // pwd1 = ""
  // amount1 = ""
  user:any
  ldate:any
  
  depositeForm=this.fb.group({
    //form array
    acno:[``,[Validators.required,Validators.pattern(`[0-9]*`)]],
    pwd:[``,[Validators.required,Validators.pattern(`[a-zA-Z0-9]*`)]],
    amount:[``,[Validators.required,Validators.pattern(`[0-9]*`)]]
  })
  withdrowForm=this.fb.group({
    //form array
    acno1:[``,[Validators.required,Validators.pattern(`[0-9]*`)]],
    pwd1:[``,[Validators.required,Validators.pattern(`[a-zA-Z0-9]*`)]],
    amount1:[``,[Validators.required,Validators.pattern(`[0-9]*`)]]
  })



  constructor(private ds: DataService,private fb:FormBuilder,private router:Router ) {
    // this.user=this.ds.currentUname
    if(localStorage.getItem('currentUname')){
      this.user = JSON.parse(localStorage.getItem('currentUname')||'')
    }
   
   
    this.ldate= new Date()
   }



  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please login")
      this.router.navigateByUrl("")
    }
  }

  deposite() {
    // alert("deposit clicked")
    var acno = this.depositeForm.value.acno
    var pwd = this.depositeForm.value.pwd
    var amount = this.depositeForm.value.amount

    if(this.depositeForm.valid){

    this.ds.deposite(acno, pwd, amount)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)


      }
    },
    (result)=>{
      alert(result.error.message)
    })

    // if (result) {
    //   alert(amount + ` succesfully deposited and new balance is ` + result)

    // }
  }
  else{
    alert("invalid form")
  }
  }



  withdrow() {
    // alert("withdow clicked")
    var acno = this.withdrowForm.value.acno1
    var pwd = this.withdrowForm.value.pwd1
    var amount = this.withdrowForm.value.amount1
  this.ds.withdrow(acno, pwd, amount)
if(this.withdrowForm.valid){

  this.ds.withdrow(acno, pwd, amount)
  .subscribe((result:any)=>{
    if(result){
      alert(result.message)


    }
  },
  (result)=>{
    alert(result.error.message)
  })

  // if (result) {
  //   alert(amount + ` succesfully deposited and new balance is ` + result)

  // }
}

  //   if (result) {
  //     alert(amount + ` succesfully debited... and new balance is ` + result)

  //   }

  // }
  else{
    alert("invalid form")
  }

  }


  

  logOut(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    localStorage.removeItem("token")

    this.router.navigateByUrl("")
  }

  deleteAcnt(){
    this.acno=JSON.parse(localStorage.getItem("currentAcno")||'')
  }
  cancel(){
    this.acno=""
  }
  delete(event:any){
    // alert("deteting acno")
    this.ds.delete(event)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        localStorage.removeItem("currentAcno")
        localStorage.removeItem("currentUname")
        localStorage.removeItem("token")
       this.router.navigateByUrl("")


      }
    },(result)=>{
      alert(result.error.message)
    }
    )
        this.router.navigateByUrl("")

  }



}
