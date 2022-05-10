import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
uname=""
acno=""
pwd=""

// register group model creatn
registerForm=this.fb.group({
  //form array
  acno:[``,[Validators.required,Validators.pattern(`[0-9]*`)]],
  pwd:[``,[Validators.required,Validators.pattern(`[a-zA-Z0-9]*`)]],
  uname:[``,[Validators.required,Validators.pattern(`[a-zA-Z ]*`)]]
})
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  
  register(){
    // alert("register clicked!!")

    var acno = this.registerForm.value.acno
    var pwd = this.registerForm.value.pwd
    var uname = this.registerForm.value.uname

    if(this.registerForm.valid){
      //asyncronous
    const result =this.ds.register(acno,pwd,uname)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        this.router.navigateByUrl("")
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
