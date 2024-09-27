// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '1337',  // Укажите порт, если он отличается от стандартного (80)
          pathname: '/uploads/**',  // Разрешаем доступ к изображениям из /uploads
        },
      ],
    },
  };
  
  export default nextConfig;
  
  