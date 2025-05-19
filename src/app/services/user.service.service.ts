import { Injectable } from '@angular/core';
import { Auth, deleteUser, updateProfile, User } from '@angular/fire/auth';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { TorrentService } from './torrent.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private torrentService: TorrentService
  ) {}

  async updateUserProfile(displayName: string, photoURL?: string): Promise<void> {
    const currentUser = this.auth.currentUser;
    
    if (!currentUser) {
      throw new Error('Nincs bejelentkezett felhasználó!!!44!!');
    }

    const updateData: { displayName: string; photoURL?: string } = { 
      displayName 
    };
    
    if (photoURL) {
      updateData.photoURL = photoURL;
    }
    
    return updateProfile(currentUser, updateData);
  }

  
  async deleteUserAccount(): Promise<void> {
    const currentUser = this.auth.currentUser;
    
    if (!currentUser) {
      throw new Error('Nincs bejelentkezett KALÓZ');
    }

    try {
      
      await deleteUser(currentUser);
      
      
      return Promise.resolve();
    } catch (error) {
      console.error('AWUDIHIAWGDIZAWG', error);
      return Promise.reject(error);
    }
  }
}