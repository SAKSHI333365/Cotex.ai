import Redis from "ioredis";

let redis;

export const createConnection = () => {
    if (redis) {
        return redis;
    }

    redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
        connectTimeout: 5000,
        maxRetriesPerRequest: 1
    });

    redis.on("ready", () => {
        console.log("Redis connected");
    });
    redis.on("error", (error) => {
        console.error("Redis connection error:", error.message);
    });

    return redis;
};