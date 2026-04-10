let mockCloudfrontUrl: string | undefined = undefined;

jest.mock("~/env", () => ({
  get env() {
    return { NEXT_PUBLIC_CLOUDFRONT_URL: mockCloudfrontUrl };
  },
}));

describe("portfolioObjectUrl", () => {
  beforeEach(() => {
    mockCloudfrontUrl = undefined;
  });

  function getUrl(key: string): string {
    const { portfolioObjectUrl } = require("../portfolio-public-url") as {
      portfolioObjectUrl: (key: string) => string;
    };
    return portfolioObjectUrl(key);
  }

  it("should return S3 URL when NEXT_PUBLIC_CLOUDFRONT_URL is unset", () => {
    expect(getUrl("portfolio/community/art/art-image-1.jpg")).toBe(
      "https://5-06-sei.s3.us-west-1.amazonaws.com/portfolio/community/art/art-image-1.jpg",
    );
  });

  it("should return CloudFront URL when NEXT_PUBLIC_CLOUDFRONT_URL is set", () => {
    mockCloudfrontUrl = "https://d2uth2nw0znbpc.cloudfront.net";
    expect(getUrl("portfolio/community/art/art-image-1.jpg")).toBe(
      "https://d2uth2nw0znbpc.cloudfront.net/portfolio/community/art/art-image-1.jpg",
    );
  });

  it("should strip trailing slash from CloudFront URL", () => {
    mockCloudfrontUrl = "https://d2uth2nw0znbpc.cloudfront.net/";
    expect(getUrl("some/key.jpg")).toBe(
      "https://d2uth2nw0znbpc.cloudfront.net/some/key.jpg",
    );
  });

  it("should handle empty string key with S3 fallback", () => {
    expect(getUrl("")).toBe("https://5-06-sei.s3.us-west-1.amazonaws.com/");
  });
});
