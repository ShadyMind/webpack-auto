#  Webpack Auto: TypeScript feature

Handle typescript files (*.ts)

With features:
* Use aliases from `tsconfig.json` file;
* Main thread used only for compile;
* Fork process to check types. 

## Usage

```sh
$ npm install --save-dev ts-loader tsconfig-paths-webpack-plugin fork-ts-checker-webpack-plugin @webpack-auto/typescript
```

Result in `package.json`:

```jsonc
{
  "devDependencies": {
    "@webpack-auto/typescript": "..."
  }
}
```
