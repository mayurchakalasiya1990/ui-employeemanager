import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/login/service/login.service';
import { Employee } from '../../employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees:Employee[]=[];
  public editEmployee:Employee;
  public deleteEmployee:Employee;
  public loggedIn=false;
  constructor(private employeeService:EmployeeService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.getEmployees()
    this.loggedIn=this.loginService.isLoggedIn()
  }

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response:Employee[])=>{
        this.employees=response;
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onAddEmployee(addForm:NgForm):void{
    document.getElementById('add-employee-form')?.click();
      this.employeeService.addEmployees(addForm.value).subscribe(
        (response:Employee)=>{
          console.log(response);
          this.getEmployees();
          addForm.reset()
        },(error:HttpErrorResponse)=>{
            alert(error.message)
            addForm.reset()
        }
      )
  }

  public onUpdateEmployee(employee:Employee):void{
    //document.getElementById('add-employee-form')?.click();
      this.employeeService.updateEmployees(employee).subscribe(
        (response:Employee)=>{
          console.log(response);
          this.getEmployees();
        },(error:HttpErrorResponse)=>{
            alert(error.message)
        }
      )
  }

  public onDeleteEmloyee(employeeId: number): void {
    
    this.employeeService.deleteEmployees(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployee(key:String):void{
      const results: Employee[]=[];
      for (const emp of this.employees) {
        if(emp.name.toLowerCase().indexOf(key.toLowerCase())!==-1 ||
        emp.email.toLowerCase().indexOf(key.toLowerCase())!==-1 ||
        emp.jobTitle.toLowerCase().indexOf(key.toLowerCase())!==-1 ||
        emp.phone.toLowerCase().indexOf(key.toLowerCase())!==-1
        ){
          results.push(emp);
        }
      }
      this.employees=results;
      if(key.length===0 || !key){
        this.getEmployees();
      }
  }

  public onOpenModal(mode:string,employee:Employee):void{
    
    const button=document.createElement("button");
    const container=document.getElementById('main-container');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode=='add'){
      button.setAttribute('data-target','#addEmployeeModal')
    }
    if(mode=='delete'){
      this.deleteEmployee=employee;
      button.setAttribute('data-target','#deleteEmployeeModal')
    }
    if(mode=='edit'){
      this.editEmployee=employee;
      button.setAttribute('data-target','#updateEmployeeModal')
    }
    container?.appendChild(button);
    button.click();
    
  }

  logoutUser(){
    this.loginService.logout()
    location.reload()
  }

}
