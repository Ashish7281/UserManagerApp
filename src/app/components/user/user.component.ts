import { Component, OnInit } from '@angular/core';
import { IRegisteredUser, IUser } from 'src/app/contracts/UserInterface';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: IRegisteredUser[] = [];
  userForUpdate: IRegisteredUser = <IRegisteredUser>{};
  email: string = '';
  fname: string = '';
  lname: string = '';
  closeResult: string = '';
  page = 1;
  pageSize = 6;
  collectionSize = 0;

  constructor(public userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    
    if (this.loginService.isLoggedIn()) {
      this.getAllUsers(this.page);
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  // getUser(id:number){
  //   this.userService.getById(id).subscribe(data=>{
  //     console.log(data);
      
  //   })
  // }

  // Retrieve all user list for specified page no. 
  getAllUsers(page: number) {
    this.userService.getAllUsers(page).subscribe((data: {
      total: number; data: IRegisteredUser[];
    }) => {
      this.users = data.data;
      this.collectionSize = data.total;
      console.log(data);
    });
  }

  // Invokes this function when Admin click page no. 
  onPageChange(page: number) {
    this.getAllUsers(page);
    console.log("Page change", page);
  }

  // Add user or create user entry on server.
  addUser(data: any) {
    if (data != null) {
      let userData: IUser = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        avatar: ""
      };

      this.userService.addUser(userData);
    }
  }

  // Logout user on click Logout button
  onLogout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  // Update user details on server.
  updateUser(userData: IRegisteredUser) {
    console.log("form values", this.userForUpdate);

    let updatedData: IRegisteredUser = {
      id: this.userForUpdate.id,
      email: this.email,
      first_name: this.fname,
      last_name: this.lname,
      avatar: this.userForUpdate.avatar
    };
    console.log("Update form values", updatedData);
    //this.userService.updateUser(updatedData);
  }

  // Delete user on server
  deleteUser(user: IRegisteredUser) {
    if (user) {
      console.log("delete id", user.id);
      this.userService.deleteUser(user.id);
    }
  }

  // Open update form on clicking on update button.
  openUpdateForm(form: any, userData: IRegisteredUser) {
    this.modalService.open(form, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
    //Updated fields 
    this.userForUpdate = userData;
    this.email = userData.email;
    this.fname = userData.first_name;
    this.lname = userData.last_name;
  }

  // Open user registration form on click Add User button
  openUserForm(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  // Close modal form on press Esc button or clicking on background.
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
