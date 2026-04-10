let mockCloudfrontUrl: string | undefined = undefined;

jest.mock("~/env", () => ({
  get env() {
    return { NEXT_PUBLIC_CLOUDFRONT_URL: mockCloudfrontUrl };
  },
}));

import { portfolioObjectUrl } from "../portfolio-public-url";

describe("portfolioObjectUrl", () => {
  beforeEach(() => {
    mockCloudfrontUrl = undefined;
  });

  it("should return S3 URL when NEXT_PUBLIC_CLOUDFRONT_URL is unset", () => {
    expect(portfolioObjectUrl("portfolio/community/art/art-image-1.jpg")).toBe(
      "https://5-06-sei.s3.us-west-1.amazonaws.com/portfolio/community/art/art-image-1.jpg",
    );
  });

  it("should return CloudFront URL when NEXT_PUBLIC_CLOUDFRONT_URL is set", () => {
    mockCloudfrontUrl = "https://d2uth2nw0znbpc.cloudfront.net";
    expect(portfolioObjectUrl("portfolio/community/art/art-image-1.jpg")).toBe(
      "https://d2uth2nw0znbpc.cloudfront.net/portfolio/community/art/art-image-1.jpg",
    );
  });

  it("should strip trailing slash from CloudFront URL", () => {
    mockCloudfrontUrl = "https://d2uth2nw0znbpc.cloudfront.net/";
    expect(portfolioObjectUrl("some/key.jpg")).toBe(
      "https://d2uth2nw0znbpc.cloudfront.net/some/key.jpg",
    );
  });

  it("should handle empty string key with S3 fallback", () => {
    expect(portfolioObjectUrl("")).toBe(
      "https://5-06-sei.s3.us-west-1.amazonaws.com/",
    );
  });
});
