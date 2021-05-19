import { Component, OnInit } from '@angular/core';
import { AuthToken } from '../../auth-token';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //credential: AuthToken;
  credential={
    userName:"",
    passWord:""
  }

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }


  onSubmit(){
      if((this.credential.passWord!='' && this.credential.passWord!='') 
            && (this.credential.passWord!=null && this.credential.passWord!=null)){
            console.log("Submit the form")      
            this.loginService.generateToken(this.credential).subscribe(
              (response:any)=>{
                console.log('Token:'+response.jwtToken)
                this.loginService.loginUser(response.jwtToken)
                window.location.href="/dashboard"
              },
              error=>{
                console.log(error)
              }
            )

      }else{
            console.log("Fields are empty")
      }
  }
}
