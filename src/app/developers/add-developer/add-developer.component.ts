import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { developer } from '../../developers';
import { DevelopersService } from '../../developers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.css'],
})
export class AddDeveloperComponent implements OnInit {
  //new form developerForm
  developerForm: FormGroup;
  group = ['Admin', 'Developer'];
  message = false;
  submitted: boolean;

  developers: developer = { full_name: '', email: '', password: '', group: '' };

  constructor(
    private fb: FormBuilder,
    private developerService: DevelopersService,
    private router: Router
  ) {}
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  onSubmit(): void {
    console.log('Developer Details:', this.developers);

    this.developerService.addDevelopers(this.developers).subscribe(
      (data) => {
        console.log(data);
        this.message = true;
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }

  ngOnInit(): void {
    this.developerForm = this.fb.group({
      full_name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
        ],
      ],
      password: ['', [Validators.required]],
      group: ['', Validators.required],
    });
  }
}
