// src/app/pages/music-list.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { MusicService } from '../../services/music';
import { Music } from '../../models/music';

@Component({
  selector: 'app-music-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './music-list.html',
  styleUrls: ['./music-list.scss']
})
export class MusicList implements OnInit {
  musics: Music[] = [];

  constructor(private service: MusicService, private router: Router) {}

  ngOnInit(): void {
    this.loadMusics();
  }

  loadMusics() {
    this.service.getAll().subscribe((data) => (this.musics = data));
  }

  deleteMusic(id: number) {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette musique ?');
    if (confirmed) {
      this.service.delete(id).subscribe(() => {
        this.musics = this.musics.filter(m => m.id !== id);
      });
    }
}

}