/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "http",
            hostname: "localhost",
          },
          {
            protocol: "https",
            hostname: "images.unsplash.com",
          },
          {
            protocol: "https",
            hostname: "via.placeholder.com",
          },
          {
            protocol: "https",
            hostname: "placehold.co",
          },
          {
            protocol: "https",
            hostname : "ai-enhanced-food-catalog-ktth.onrender.com"
          }
          
        ],
      },
};

export default nextConfig;
