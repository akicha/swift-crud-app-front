import {Component} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service/authentication.service';
import {LocalStorageService} from '../../services/local-storage-service/local-storage.service';
import {AppSettings} from '../../classes/app-settings/app-settings';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './authentication-module.component.html',
  styleUrl: './authentication-module.component.css'
})
export class AuthenticationModuleComponent {

  loginForm: any;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm?.valid) {
      this.authService.login(this.loginForm.value).subscribe(token => {
        this.localStorageService.set(AppSettings.TOKEN_KEY, token.token);

        this.router.navigate(['/users']).then(() => {
          window.location.reload();
          // Reload html element <table> is more optimal
        });
      });
    }
  }
}
