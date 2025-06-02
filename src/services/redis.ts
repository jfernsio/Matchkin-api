import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config()
const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 18131,
    }
});

client.on('error', err => console.log('Redis Client Error', err));
const connect = async () => {
    if (client.connected) {
         client.destroy();
        }
    try {
        await client.connect();
        console.log('Connected to Redis');
        await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar
 await client.destroy()
 console.log('client closed')
        
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
}

// connect();
client.destroy();