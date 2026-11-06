## Obsidian Vault
/Users/yums/Documents/Obsidian Vault/個人開発/chrome学習用拡張機能/

## 実装の教え方

ユーザーが「次に何をすべきか」「どう実装するか」を質問した場合、コードを書き出さずに**実装ロジックのステップ**を渡すこと。ユーザーは自分で実装したいので、コードを直接与えるとその学習機会を奪ってしまう。

**ロジックの渡し方の例**：

```
1. prisma.folder.findUnique で対象フォルダを取得
2. なければ throw new NotFound()
3. folder.userId !== userId なら throw new Forbidden()
4. prisma.folder.update で更新して返す
```

**やってはいけない例**：完成したコードをそのまま提示する。

明示的に「コードを書いて」と依頼された場合のみコードを提示する。

## コードへの参照リンク

**このプロジェクト内のあらゆるファイル**（バックエンド・フロントエンド・設定ファイル・スキーマ・ドキュメントを問わず）に言及する際は、必ず markdown のリンク形式で参照を付けること。ワークスペースルートからの相対パスを使う。

- ファイル：`[schema.prisma](backend/prisma/schema.prisma)`
- 特定の行：`[index.ts:42](backend/src/index.ts#L42)`
- 行の範囲：`[auth.ts:10-25](backend/src/middleware/auth.ts#L10-L25)`
- ディレクトリ：`[backend/src/routes/](backend/src/routes/)`

「53行目」「errors.ts に」「package.json の scripts」のようにファイル名や行番号を書くだけで済ませない。バッククォートや HTML タグではなくリンクにすること。