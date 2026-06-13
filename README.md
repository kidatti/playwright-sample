# Playwright Login Sample

静的な `index.html` でログイン入力画面を表示し、Playwright でフォームの表示と入力バリデーションをテストします。

## ログイン情報

テスト用の入力例です。

| 項目 | 値 |
| --- | --- |
| ID / メールアドレス | `user@example.com` |
| Password | `password123` |

この画面は静的 HTML のため、実際の認証処理は行いません。メールアドレス形式が正しく、パスワードが 8 文字以上であればログイン成功メッセージを表示します。

## テスト実行

```bash
npm test
```

GitHub Actions では push と pull request のタイミングで Playwright テストが実行されます。
