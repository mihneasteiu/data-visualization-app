import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("on page load, i dont see the input box initially", async ({ page }) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("dropdown", {exact: true})).not.toBeVisible();
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
  await expect(page.getByLabel("dropdown", {exact: true})).not.toBeVisible();
  await expect(page.getByLabel("retrieve")).not.toBeVisible();
});

test("on page load, if I log in with the right password, I will stop seeing the log in button and password box", async ({ page }) => {
  await page.getByLabel("Password").fill("cs32")
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Password")).not.toBeVisible();
  await expect(page.getByLabel("Login")).not.toBeVisible();
});

test("on page load, if I log in with the right password, I will see the signout button, retrieve table button, and dropdown", async ({ page }) => {
  await page.getByLabel("Password").fill("cs32")
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("dropdown", {exact: true})).toBeVisible();
  await expect(page.getByLabel("Sign out")).toBeVisible();
  await expect(page.getByLabel("retrieve")).toBeVisible();
});

test("after I click the retrieve table button, i see the selected table in the output area", async ({
  page,
}) => {
  await page.getByLabel("Password").fill("cs32")
  await page.getByLabel("Login").click();
  await expect(page.getByText("Please choose one of the tables in the dropdown menu to display it.")).toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Star Data");
  await page
      .getByLabel("dropdownVisOption", {exact: true})
      .selectOption("Table");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("Andreas")).toBeVisible();
  await expect(page.getByText("StarID")).toBeVisible();
  await expect(page.getByText("-169.738")).toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Student Records");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("Andreas")).not.toBeVisible();
  await expect(page.getByText("Name")).toBeVisible();
  await expect(page.getByText("Student_13")).toBeVisible();
  await expect(page.getByText("Computer Science")).toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Nonexistent table");
  await page.getByLabel("dropdownVisOption", {exact: true}).selectOption("Table");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("No data available for the selected table.")).toBeVisible();
  await expect(page.getByText("Name")).not.toBeVisible();
  await expect(page.getByText("Student_13")).not.toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Select a file");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("Please choose one of the tables in the dropdown menu to display it.")).toBeVisible();
});

test("if i click the retrieve button without choosing a display mode or dataset, i get prompted with an error message", async ({
  page,
}) => {
  await page.getByLabel("Password").fill("cs32")
  await page.getByLabel("Login").click();
  await expect(page.getByText("Please choose one of the tables in the dropdown menu to display it.")).toBeVisible();

  await page.getByLabel("retrieve").click();
  await expect(
    page.getByText(
      "Please choose one of the tables in the dropdown menu to display it."
    )
  ).toBeVisible();
  await page.getByLabel("dropdown", {exact: true}).selectOption("Star Data");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("Please choose a display mode.")).toBeVisible();
  await expect(page.getByText("StarID")).not.toBeVisible();
  await expect(page.getByText("-169.738")).not.toBeVisible();
});

test("if I select multiple datasets, the one I selected before pressing the button is displayed", async ({ page }) => {
  await page.getByLabel("Password").fill("cs32")
  await page.getByLabel("Login").click();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Star Data");
  await page.getByLabel("dropdown", {exact: true}).selectOption("Nonexistent table");
  await page.getByLabel("dropdown", {exact: true}).selectOption("Student Records");
  await page
    .getByLabel("dropdownVisOption", { exact: true })
    .selectOption("Table");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("Andreas")).not.toBeVisible();
  await expect(page.getByText("Name")).not.toBeVisible();
  await expect(page.getByText("Student_13")).toBeVisible();
  await expect(page.getByText("Computer Science")).toBeVisible();
});

test("after I choose vertical bar chart display mode, i see data displayed as a vertical bar chart", async ({
  page,
}) => {
  await page.getByLabel("Password").fill("cs32");
  await page.getByLabel("Login").click();
  await expect(
    page.getByText(
      "Please choose one of the tables in the dropdown menu to display it."
    )
  ).toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Star Data");
  await page.getByLabel("dropdownVisOption", {exact: true}).selectOption("Vertical Bar Chart");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("Andreas")).not.toBeVisible();
  await expect(page.getByText("StarID")).not.toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Student Records");
  await page.getByLabel("retrieve").click();
  await expect(page.getByText("Andreas")).not.toBeVisible();
  await expect(page.getByText("Name")).not.toBeVisible();
  await expect(page.getByText("Student_13")).toBeVisible();
  await expect(page.getByText("Computer Science")).toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Nonexistent table");
  await page.getByLabel("retrieve").click();
  await expect(
    page.getByText("No data available for the selected table.")
  ).toBeVisible();
  await expect(page.getByText("Name")).not.toBeVisible();
  await expect(page.getByText("Student_13")).not.toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Select a file");
  await page.getByLabel("retrieve").click();
  await expect(
    page.getByText(
      "Please choose one of the tables in the dropdown menu to display it."
    )
  ).toBeVisible();
});

test("correct pasword, datasset chosen and vertical bar view mode, all headers valid", async ({
  page, 
}) => {
  await page.getByLabel("Password").fill("cs32");
  await page.getByLabel("Login").click();
  await page.getByLabel("dropdown", {exact: true}).selectOption("Student Records");
  await page.getByLabel("dropdownVisOption", {exact: true}).selectOption("Vertical Bar Chart");
  await page.getByLabel("retrieve").click();
  // Check that bars are side by side, not stacked
  const bars = await page.locator(
    ".chartjs-render-monitor rect[data-chart-item]"
  );
  const firstBarY = await bars.first().getAttribute("y");
  const secondBarY = await bars.nth(1).getAttribute("y");
  expect(firstBarY).not.toBe(secondBarY);
  await expect(page.getByText("Student_13")).toBeVisible();
  await expect(page.getByText("Gpa")).toBeVisible();
});

test("correct pasword, dataset chosen and vertical bar view mode, some headers valid", async ({
  page,
}) => {
  await page.getByLabel("Password").fill("cs32");
  await page.getByLabel("Login").click();
  await page.getByLabel("dropdown", {exact: true}).selectOption("Star Data");
  await page.getByLabel("dropdownVisOption", {exact: true}).selectOption("Vertical Bar Chart");
  await page.getByLabel("retrieve").click();

  // Check that bars are side by side, not stacked
  const bars = await page.locator(
    ".chartjs-render-monitor rect[data-chart-item]"
  );
  const firstBarY = await bars.first().getAttribute("y");
  const secondBarY = await bars.nth(1).getAttribute("y");
  expect(firstBarY).not.toBe(secondBarY);
  await expect(page.getByText("Student_13")).not.toBeVisible();
  await expect(
    page.getByText("Couldn't parse the following headers: ProperName")
  ).toBeVisible();
});

test("correct pasword, dataset chosen and vertical bar view mode, no valid headers", async ({
  page,
}) => {
  await page.getByLabel("Password").fill("cs32");
  await page.getByLabel("Login").click();
  await page.getByLabel("dropdown", {exact: true}).selectOption("Empty Table");
  await page.getByLabel("dropdownVisOption", {exact: true}).selectOption("Vertical Bar Chart");
  await page.getByLabel("retrieve").click();
  await expect(
    page.getByText("Selected dataset contains no numerical Y values.")
  ).toBeVisible();
});

test("multiple requests, correct password, dataset chosen and stacked bar view mode, all headers valid", async ({
  page,
}) => {
  await page.getByLabel("Password").fill("cs32");
  await page.getByLabel("Login").click();
  await page.getByLabel("dropdown", {exact: true}).selectOption("Student Records");
  await page.getByLabel("dropdownVisOption", {exact: true}).selectOption("Stacked Bar Chart");
  await page.getByLabel("retrieve").click();

  // Check that bars are stacked (same Y position)
  let bars = await page.locator(
    ".chartjs-render-monitor rect[data-chart-item]"
  );
  let firstBarY = await bars.first().getAttribute("y");
  let secondBarY = await bars.nth(1).getAttribute("y");
  expect(firstBarY).toBe(secondBarY);
  await expect(page.getByText("Student_13")).toBeVisible();
  await expect(page.getByText("Gpa")).toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Star Data");
  await page.getByLabel("dropdownVisOption", {exact: true}).selectOption("Stacked Bar Chart");
  await page.getByLabel("retrieve").click();

  // Check that bars are stacked (same Y position)
  bars = await page.locator(
    ".chartjs-render-monitor rect[data-chart-item]"
  );
  firstBarY = await bars.first().getAttribute("y");
  secondBarY = await bars.nth(1).getAttribute("y");
  expect(firstBarY).toBe(secondBarY);
  await expect(page.getByText("Student_13")).not.toBeVisible();
  await expect(
    page.getByText("Couldn't parse the following headers: ProperName")
  ).toBeVisible();

  await page.getByLabel("dropdown", {exact: true}).selectOption("Empty Table");
  await page.getByLabel("dropdownVisOption", {exact: true}).selectOption("Stacked Bar Chart");
  await page.getByLabel("retrieve").click();
  await expect(
    page.getByText("Selected dataset contains no numerical Y values.")
  ).toBeVisible();
});