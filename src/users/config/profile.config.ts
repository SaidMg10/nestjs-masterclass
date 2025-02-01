import { registerAs } from '@nestjs/config';

export default registerAs('profileConfig', () => ({
  profileApiKey: process.env.PROFILE_API_KEY,
}));
