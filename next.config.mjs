/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [{ source: "/__health__", destination: "/health" }];
	}
};

export default nextConfig;
