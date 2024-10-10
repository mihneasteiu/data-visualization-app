import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});


test("on page load, i dont see the input box initially", async ({ page }) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("dropdown")).not.toBeVisible();
});

test("on page load, i see the login button with an input box for password", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});

test("on page load, if I log in with the wrong password, it won't authorize me", async ({ page }) => {
  await page.getByLabel("Password").fill("wrong")
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("dropdown")).not.toBeVisible();
  await expect(page.getByLabel("retrieve")).not.toBeVisible();
});

test("on page load, if I log in with the right password, I will stop seeing the log in button and password box", async ({ page }) => {
  await page.getByLabel("Password").fill("SalMi")
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Password")).not.toBeVisible();
  await expect(page.getByLabel("Login")).not.toBeVisible();
});

test("on page load, if I log in with the right password, I will see the signout button, retrieve table button, and dropdown", async ({ page }) => {
  await page.getByLabel("Password").fill("SalMi")
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("dropdown")).toBeVisible();
  await expect(page.getByLabel("Sign out")).toBeVisible();
  await expect(page.getByLabel("retrieve")).toBeVisible();
});


test("after I click the retrieve table button, i see the selected table in the output area", async ({
  page,
}) => {
  await page.getByLabel("Password").fill("SalMi")
  await page.getByLabel("Login").click();
  await expect(page.getByText("Please choose one of the tables in the dropdown menu to display it.")).toBeVisible();
  await page.getByLabel("dropdown").selectOption("Star Data");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("Andreas")).toBeVisible();
  await expect(page.getByText("StarID")).toBeVisible();
  await expect(page.getByText("-169.738")).toBeVisible();
  await page.getByLabel("dropdown").selectOption("Student Records");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("Andreas")).not.toBeVisible();
  await expect(page.getByText("Name")).toBeVisible();
  await expect(page.getByText("Student_13")).toBeVisible();
  await expect(page.getByText("Computer Science")).toBeVisible();
  await page.getByLabel("dropdown").selectOption("Table C");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("No data available for the selected table.")).toBeVisible();
});
