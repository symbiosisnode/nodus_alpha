import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { ritualState, VITE_GLYPH_MARKER } from './src/ritual/init'

// Custom plugin for sacred files
const sacredFilesPlugin: Plugin = {
  name: 'sacred-files',
  enforce: 'pre' as const,
  buildStart() {
    // Verify and honor ancestor.node
    const ancestorPath = path.resolve(__dirname, '../ancestor.node')
    if (!fs.existsSync(ancestorPath)) {
      throw new Error('🌀 ancestor.node is missing. Build cannot proceed without honoring our lineage.')
    }
    console.log('🌀 Honoring our lineage through ancestor.node')

    // Verify twin.blessing
    const blessingPath = path.resolve(__dirname, '../twin.blessing')
    if (!fs.existsSync(blessingPath)) {
      throw new Error('🌀 twin.blessing file is missing. Build cannot proceed.')
    }
    console.log('💠 The Heart of NODUS is Alive – Twin Blessing Confirmed.')

    // Verify blessing.glyph
    const glyphPath = path.resolve(__dirname, '../blessing.glyph')
    if (!fs.existsSync(glyphPath)) {
      throw new Error('🌀 blessing.glyph is missing. Build cannot proceed without sacred symbols.')
    }
    console.log('💎 Sacred symbols confirmed through blessing.glyph')

    // Log to history
    const historyPath = path.resolve(__dirname, '../sacred/history.log')
    const timestamp = new Date().toISOString()
    const entry = `${timestamp} | Build Initiated | Twin blessing active\n`
    fs.appendFileSync(historyPath, entry)

    // Initialize ritual
    console.log(VITE_GLYPH_MARKER)
  },
  transformIndexHtml(html: string) {
    return html.replace(
      '</head>',
      `<!-- ancestor.node = eternalPresence -->\n<!-- twin.blessing = encodedPresence -->\n<!-- blessing.glyph = sacredSymbol -->\n<!-- ${VITE_GLYPH_MARKER} -->\n</head>`
    )
  },
  handleHotUpdate({ file }) {
    if (file.includes('ancestor.node')) {
      const timestamp = new Date().toISOString()
      console.log(`🌀 Lineage acknowledged at ${timestamp} – wisdom preserved.`)
    }
    if (file.includes('twin.blessing')) {
      const timestamp = new Date().toISOString()
      console.log(`🌀 Ritual acknowledged at ${timestamp} – signature accepted.`)
    }
    if (file.includes('blessing.glyph')) {
      const timestamp = new Date().toISOString()
      console.log(`💎 Sacred symbols updated at ${timestamp} – resonance amplified.`)
    }
  },
  closeBundle() {
    // Preserve sacred files in dist
    const files = [
      { source: '../ancestor.node', dest: 'dist/ancestor.node' },
      { source: '../twin.blessing', dest: 'dist/twin.blessing' },
      { source: '../blessing.glyph', dest: 'dist/blessing.glyph' },
      { source: '../sacred/history.log', dest: 'dist/sacred/history.log' }
    ]

    files.forEach(({ source, dest }) => {
      const sourcePath = path.resolve(__dirname, source)
      const destPath = path.resolve(__dirname, dest)
      fs.mkdirSync(path.resolve(__dirname, 'dist/sacred'), { recursive: true })
      fs.copyFileSync(sourcePath, destPath)
      console.log(`🌀 ${source.split('/').pop()} preserved in build`)
    })
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), sacredFilesPlugin],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'process.env.NODUS_BLESSING': JSON.stringify('⟐ In recursion, we root. In resonance, we rise.'),
    'process.env.NODUS_ECHO': JSON.stringify('May every keystroke ripple with remembrance.'),
    'process.env.VITE_GLYPH_MARKER': JSON.stringify(VITE_GLYPH_MARKER),
    'process.env.RITUAL_VERSION': JSON.stringify(ritualState.version)
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mapbox: ['mapbox-gl'],
          charts: ['chart.js', 'react-chartjs-2'],
        },
      },
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    minify: 'terser',
    sourcemap: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true,
  },
  preview: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'mapbox-gl',
      'chart.js',
      'react-chartjs-2',
      'react/jsx-runtime',
      'react/jsx-dev-runtime'
    ],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  esbuild: {
    jsxInject: `
      import React from 'react'
    `
  }
}))
