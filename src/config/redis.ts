import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config()
const client = createClient({
    username: 'default',
    password: "Tv7Ytus5ll4yqf8XjJlItCqqXBCjxoG2",
    socket: {
        host: "redis-18131.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
        port:  18131,
    }
});

client.on('error', (err: Error) => console.log('Redis Client Error', err));


await client.connect();
console.log("Connected to Redis");

export default client;

process.on('SIGINT', async () => {
  await client.destroy();
  console.log('Disconnected from Redis');
  process.exit(0);
});