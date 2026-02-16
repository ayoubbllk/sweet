/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === "true"
const isNetlify = process.env.NETLIFY === "true"
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "sweet"

const nextConfig = {
  output: isGitHubPages || isNetlify ? "export" : undefined,
  basePath: isGitHubPages ? `/${repoName}` : "",
  assetPrefix: isGitHubPages ? `/${repoName}/` : "",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
