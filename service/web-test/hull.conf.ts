import path from 'path';

export default {
  projectType: 'react',
  entry: path.resolve(__dirname, './src/index'),
  htmlPluginOpts: {
    template: path.resolve(__dirname, './public/index.html'),
    inject: {
      title: 'welcome-use-hulljs',
    },
  }
};
