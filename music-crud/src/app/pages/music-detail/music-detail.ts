// src/app/pages/music-detail.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MusicService } from '../../services/music';
import { Music } from '../../models/music';

@Component({
  selector: 'app-music-detail',
  standalone: true,
   imports: [RouterModule],
  templateUrl: './music-detail.html',
  styleUrls: ['./music-detail.scss'],
})
export class MusicDetail implements OnInit {
  music?: Music;

  constructor(private route: ActivatedRoute, private service: MusicService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe((data) => (this.music = data));
  }
}
