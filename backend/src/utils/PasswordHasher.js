import bcrypt from 'bcrypt';
import config from '../config/config.js';

class PasswordHasher {
    static async hash(password) {
        return await bcrypt.hash(password, config.BCRYPT_SALT);
    }
}

export default PasswordHasher;
