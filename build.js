const esbuild = require( 'esbuild' );

esbuild.build( {
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  minify: true,
  sourcemap: true,
  loader: {
    '.js': 'js',
    '.glb': 'file',
  },
  publicPath: '/',
  platform: 'browser',
} ).catch( () => process.exit( 1 ) );
