import dotenv from 'dotenv';
import { connectDB, closeDB } from '../config/database.js';
import { Admin } from '../models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'chandan110906@gmail.com';
    const password = process.env.ADMIN_PASSWORD || 'AdminPassword123!';

    if (!email || !password) {
      console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file.');
      process.exit(1);
    }

    let admin = await Admin.findOne({ email: email.toLowerCase() });

    if (admin) {
      console.log(`ℹ️ Admin account for ${email} already exists. Updating password...`);
      admin.password = password;
      await admin.save();
      console.log(`✅ Administrator password successfully updated for: ${email}`);
    } else {
      admin = await Admin.create({
        email: email.toLowerCase(),
        password,
        role: 'admin',
      });
      console.log(`✅ Administrator account successfully created: ${email}`);
    }

    console.log('🔒 Security Notice: Keep your admin credentials safe and never commit them to GitHub.');
    await closeDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create administrator:', error.message);
    await closeDB();
    process.exit(1);
  }
};

createAdmin();

