import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user-service/user.service';
import {Router} from '@angular/router';
import {GenderService} from '../../services/gender-service/gender.service';
import {User} from '../../classes/user/user';
import {Gender} from '../../classes/gender/gender';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './new-user-module.component.html',
  styleUrl: './new-user-module.component.css'
})
export class NewUserModuleComponent {

  userForm: any;
  genders: Gender [] = [];

  constructor(
    private userService: UserService,
    private genderService: GenderService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.genderService.getGenders().subscribe(genders => {
      this.genders = genders;
    });

    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      age: [0, [Validators.required, Validators.min(1), Validators.max(99)]],
      gender: ['', [Validators.required]],
      comments: ['', Validators.maxLength(200)]
    });
  }


  onSubmit(): void {
    if (this.userForm?.valid) {
      this.userService.createUser(new User(this.userForm.value)).subscribe(user => {
        console.log('Created new user with id ' + user.id);
        this.goToUsersTable();
      });
    }
  }

  goToUsersTable(): void {
    this.router.navigate(['/users']).then(() => {
      window.location.reload();
      // Reload html element <table> is more optimal
    });
  }
}
