// src/app/pages/music-update.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { MusicService } from '../../services/music';
import { Music } from '../../models/music';

@Component({
  selector: 'app-music-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './music-update.html',
  styleUrls: ['./music-update.scss'],
})
export class MusicUpdate implements OnInit {
  private readonly _service = inject(MusicService);
  private readonly _fb = inject(FormBuilder);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  form!: FormGroup;
  music = signal<Music | null>(null);

  ngOnInit(): void {
    // Créer le formulaire vide d'abord
    this.form = this._fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
    });

    // S'abonner aux paramètres de la route et récupérer la musique
    this._route.params
      .pipe(
        switchMap(params => this._service.getById(Number(params['id'])))
      )
      .subscribe(data => {
        this.music.set(data);
        this.form.patchValue({
          title: data.title,
          artist: data.artist,
        });
      });
  }

  submit() {
    if (this.form.valid && this.music()) {
      const id = this.music()!.id;
      this._service.update(id, this.form.value).subscribe(() => this._router.navigate(['/musics']));
    }
  }
}
