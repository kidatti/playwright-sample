import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'url';

const loginPage = pathToFileURL(`${process.cwd()}/index.html`).toString();

test.beforeEach(async ({ page }) => {
  await page.goto(loginPage);
});

test('ログイン画面の主要な入力項目が表示される', async ({ page }) => {
  await expect(page).toHaveTitle('Secure Login');
  await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
  await expect(page.getByLabel('メールアドレス')).toBeVisible();
  await expect(page.getByLabel('パスワード')).toBeVisible();
  await expect(page.getByLabel('ログイン状態を保持')).toBeVisible();
  await expect(page.getByRole('link', { name: 'パスワードを忘れた場合' })).toHaveAttribute(
    'href',
    '#forgot-password',
  );
  await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible();
});

test('不正なメールアドレスではエラーを表示する', async ({ page }) => {
  await page.getByLabel('メールアドレス').fill('invalid-email');
  await page.getByLabel('パスワード').fill('password123');
  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page.getByRole('status')).toHaveText('有効なメールアドレスを入力してください。');
});

test('短いパスワードではエラーを表示する', async ({ page }) => {
  await page.getByLabel('メールアドレス').fill('user@example.com');
  await page.getByLabel('パスワード').fill('short');
  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page.getByRole('status')).toHaveText('パスワードは8文字以上で入力してください。');
});

test('有効な入力では送信完了メッセージを表示する', async ({ page }) => {
  await page.getByLabel('メールアドレス').fill('user@example.com');
  await page.getByLabel('パスワード').fill('password123');
  await page.getByLabel('ログイン状態を保持').check();
  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page.getByRole('status')).toHaveText('ログイン情報を送信しました。');
});
