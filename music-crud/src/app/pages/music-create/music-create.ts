// src/app/pages/music-create.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MusicService } from '../../services/music';

@Component({
  selector: 'app-music-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './music-create.html',
  styleUrls: ['./music-create.scss'],
})
export class MusicCreate {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MusicService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required], // <-- manquait ici !
    });
  }

  submit() {
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(() => this.router.navigate(['/musics']));
    }
  }
}