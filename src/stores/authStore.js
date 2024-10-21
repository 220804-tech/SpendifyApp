// src/stores/authStore.js
import {create} from 'zustand';
import EncryptedStorage from 'react-native-encrypted-storage';

export const authStore = create(set => ({
  access_token: '',
  username: '',
  role: '', // Tambahkan role di sini
  isLoggedIn: false,

  setLogin: async (token, username, role) => {
    set({
      access_token: token,
      username: username,
      role: role,
      isLoggedIn: true,
    });

    try {
      await EncryptedStorage.setItem('access_token', token);
      await EncryptedStorage.setItem('username', username);
      await EncryptedStorage.setItem('role', role); // Simpan role ke EncryptedStorage
    } catch (e) {
      console.error(
        'Failed to save token, username, and role to EncryptedStorage:',
        e,
      );
    }
  },

  setLogout: async () => {
    set({access_token: '', username: '', role: '', isLoggedIn: false}); // Reset role juga

    try {
      await EncryptedStorage.removeItem('access_token');
      await EncryptedStorage.removeItem('username');
      await EncryptedStorage.removeItem('role'); // Hapus role dari EncryptedStorage
    } catch (e) {
      console.error(
        'Failed to remove token, username, and role from EncryptedStorage:',
        e,
      );
    }
  },

  loadUserData: async () => {
    try {
      const token = await EncryptedStorage.getItem('access_token');
      const username = await EncryptedStorage.getItem('username');
      const role = await EncryptedStorage.getItem('role'); // Muat role dari EncryptedStorage

      if (token && username && role) {
        set({
          access_token: token,
          username: username,
          role: role,
          isLoggedIn: true,
        });
      }
    } catch (e) {
      console.error(
        'Failed to load token, username, and role from EncryptedStorage:',
        e,
      );
    }
  },
}));
