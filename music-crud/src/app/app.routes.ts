import { Routes } from '@angular/router';
import { MusicDetail } from './pages/music-detail/music-detail';
import { MusicCreate } from './pages/music-create/music-create';
import { MusicUpdate } from './pages/music-update/music-update';
import { MusicList } from './pages/music-list/music-list';

export const routes: Routes = [
  { path: '', component: MusicList },
  { path: 'musics', component: MusicList }, 
  { path: 'musics/create', component: MusicCreate },
  { path: 'musics/:id', component: MusicDetail },
  { path: 'musics/update/:id', component: MusicUpdate },
];