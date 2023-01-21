import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html',
  styleUrls: ['./edit-employees.component.css']
})
export class EditEmployeesComponent {

  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  }

  constructor(private route: ActivatedRoute, private employeesService: EmployeesService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')
        if (id) {
          this.getEmployee(id)
        }
      }
    })
  }

  getEmployee(id: string) {
    this.employeesService.getEmployee(id).subscribe({
      next: (response) => {
        this.employeeDetails = response
      }
    })
  }

  updateEmployee() {
    this.employeesService.updateEmployee(this.employeeDetails.id, this.employeeDetails).subscribe({
      next: (employee) => {
        alert("Employee updated succesfully.")
        this.router.navigate(['employees'])
      }
    })
  }

  deleteEmployee() {
    this.employeesService.deleteEmployee(this.employeeDetails.id).subscribe({
      next: (employee) => {
        alert("Employee deleted succesfully.")
        this.router.navigate(['employees'])
      }
    })
  }
}
