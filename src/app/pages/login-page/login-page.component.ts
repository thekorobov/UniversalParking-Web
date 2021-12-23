import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { HttpService } from 'src/app/api/http.service';
import { CommonValidators } from 'src/app/validators/validators';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    providers: [HttpService]
})
export class LoginPageComponent implements OnInit {

    //faTimes = faTimes;
    form: FormGroup;
    email: FormControl;
    password: FormControl;
    notification: string;

    constructor(private router: Router, private httpService: HttpService) { }

    ngOnInit(): void {
        this.email = new FormControl('', [Validators.required,
            CommonValidators.noWhiteSpace, CommonValidators.emailPattern]);
        this.password = new FormControl('', [Validators.required]);
        this.form = new FormGroup({
            Email: this.email,
            Password: this.password,
        });
    }

    onLoginClick() {
        this.validateForm();
        if (!this.form?.valid) { return; }
        
        this.httpService.loginUser(this.email.value, this.password.value)
            .subscribe(
                (data: any) => {
                    if (data['status'] == 200) {
                        var token = data['body']['token']
                        document.cookie = `JWT_token=${token}; Path=/; secure`
                       // this.router.navigateByUrl('/parking');
                    }
                },
                (error: any) => {
                    this.openNotificationModal('The email or password is incorrect.\n\n Please try again.')
                }
            );
    }

    onRegisterClick() {
        this.router.navigateByUrl('/register');
    }

    private validateForm(): void {
        const email = this.form.get('Email');
        const password = this.form.get('Password');

        if (email.errors?.required || email.errors?.whitespace) {
            email.setErrors({ ...email.errors, emailRequired: true });
        }

        if (email.errors?.emailPattern) {
            email.setErrors({ ...email.errors, emailValid: true });
        }

        if (password.errors?.required || password.errors?.whitespace) {
            password.setErrors({ ...password.errors, passwordRequired: true });
        }

        if (password.errors?.passwordPattern) {
            password.setErrors({ ...password.errors, passwordValid: true });
        }
    }

    private openNotificationModal(notification: string) {
        this.notification = notification
        var notificationModal = new bootstrap.Modal(document.getElementById("notificationModal"), {
            keyboard: false
        });
        notificationModal?.show();
    }
    
}
