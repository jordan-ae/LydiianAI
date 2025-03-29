/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'localhost'],
  },
  // Ensure we properly transpile dependencies if needed
  transpilePackages: ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-placeholder'],
};

export default nextConfig;

