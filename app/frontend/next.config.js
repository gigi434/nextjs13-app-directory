/** @type {import('next').NextConfig} */
const nextConfig = {
  // create-next-app --example with-tailwindcssは現在試験段階のため/appディレクトリを有効化するのに下記が必要になる
  experimental: {
    appDir: true,
  },
}
module.exports = nextConfig
