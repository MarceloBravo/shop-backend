// babel.config.js
export default function (api) {
  // Cache según el entorno, obligatorio para babel-jest
  api.cache(true);

  return {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }]
    ]
  };
}