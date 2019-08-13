describe("PostList", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("render a tappable list of posts", async () => {
    await expect(element(by.id("post-list"))).toBeVisible();
    await waitFor(element(by.id("post-row-0")))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id("post-row-0")).tap();
    await expect(element(by.id("post-title"))).toBeVisible();
  });
});
