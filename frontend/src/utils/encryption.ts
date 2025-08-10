import CryptoJS from 'crypto-js';

export class EncryptionService {
  private static generateKey(password: string, salt: string): string {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 1000
    }).toString();
  }

  static encrypt(text: string, password: string): string {
    try {
      const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
      const key = this.generateKey(password, salt);
      const iv = CryptoJS.lib.WordArray.random(128 / 8).toString();
      
      const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      return `${salt}:${iv}:${encrypted.toString()}`;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  static decrypt(encryptedData: string, password: string): string {
    try {
      const [salt, iv, encrypted] = encryptedData.split(':');
      
      if (!salt || !iv || !encrypted) {
        throw new Error('Invalid encrypted data format');
      }

      const key = this.generateKey(password, salt);
      
      const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedText) {
        throw new Error('Failed to decrypt - invalid password or corrupted data');
      }

      return decryptedText;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }
}
