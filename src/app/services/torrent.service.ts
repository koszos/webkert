import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  addDoc, 
  collection, 
  collectionData,
  query,
  where,
  orderBy
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface Comment {
  id?: number;
  author: string;
  text: string;
  createdAt: Date;
}

export interface Torrent {
  id?: string;
  title: string;
  size: number;
  category: string;
  seeders: number;
  leechers: number;
  uploadedAt: Date;
  uploader: string;
  comments?: Comment[];
}

@Injectable({ providedIn: 'root' })
export class TorrentService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private torrentsCollection = collection(this.firestore, 'torrents');

  async addTorrent(torrent: Omit<Torrent, 'id'>): Promise<string> {
    const docRef = await addDoc(this.torrentsCollection, {
      ...torrent,
      uploadedAt: new Date(torrent.uploadedAt)
    });
    return docRef.id;
  }

  getUserTorrents(uploaderName: string): Observable<Torrent[]> {
    const q = query(
      this.torrentsCollection,
      where('uploader', '==', uploaderName),
      orderBy('uploadedAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Torrent[]>;
  }

  getAllTorrents(): Observable<Torrent[]> {
    const q = query(
      this.torrentsCollection,
      orderBy('uploadedAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Torrent[]>;
  }
   getTorrentCommentCount(torrent: Torrent): number {
    return torrent.comments?.length || 0;
  }
}