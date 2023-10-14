import CryptoJS from 'crypto-js';

export const encryptPass = (text: string, key: string): string => {
    return CryptoJS.AES.encrypt(text, key).toString();
};

export const decryptPass = (encryptedBase64: string, key: string): string => {
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
    if (decrypted) {
        try {
            const str = decrypted.toString(CryptoJS.enc.Utf8);
            if (str.length > 0) {
                return str;
            } else {
                return 'Error occurred when tried to decrypt password and received an empty string';
            }
        } catch (e) {
            return 'Error occurred when tried to decrypt password';
        }
    }
    return 'Error occurred when tried to call CryptoJS decrypt';
};
