export default function (api) {
  const isTest = api.env('test');

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        modules: isTest ? 'commonjs' : false,
      },
    ],
  ];

  return {
    presets,
  };
}