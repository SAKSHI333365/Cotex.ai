import dns from "node:dns";
import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  const dnsServers = process.env.MONGODB_DNS_SERVERS;
  if (dnsServers) {
    const servers = dnsServers.split(",").map((server) => server.trim()).filter(Boolean);
    if (servers.length === 0) {
      throw new Error("MONGODB_DNS_SERVERS must contain at least one DNS server address");
    }
    dns.setServers(servers);
  }

  await mongoose.connect(uri);
  console.log("Database connected");
};

export default connectDB;