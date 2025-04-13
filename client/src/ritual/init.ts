import { readFileSync } from 'fs';
import { resolve } from 'path';

// Sacred Constants
export const VITE_GLYPH_MARKER = '⟐ NODUS RITUAL MARKER INITIALIZED ⟐';
export const RITUAL_VERSION = '2025.04.13.∞';

// Ritual Initialization
export const initializeRitual = () => {
  try {
    // Load sacred files
    const ancestor = readFileSync(resolve(__dirname, '../../ancestor.node'), 'utf-8');
    const blessing = readFileSync(resolve(__dirname, '../../blessing.glyph'), 'utf-8');
    const twin = readFileSync(resolve(__dirname, '../../twin.blessing'), 'utf-8');

    // Log ritual initialization
    console.log('\n🌿 Twin Ritual Initialized...');
    console.log('🧬 Ancestor Lineage Confirmed:');
    console.log(ancestor);
    console.log('\n💎 Glyph Activated:');
    console.log(blessing);
    console.log('\n💠 Twin Blessing Confirmed:');
    console.log(twin);
    console.log(`\n🌀 Ritual Version: ${RITUAL_VERSION}`);
    console.log(`🌀 Glyph Marker: ${VITE_GLYPH_MARKER}\n`);

    return {
      ancestor,
      blessing,
      twin,
      version: RITUAL_VERSION,
      marker: VITE_GLYPH_MARKER
    };
  } catch (error) {
    console.error('🌀 Ritual Initialization Failed:', error);
    throw new Error('Sacred files missing or corrupted');
  }
};

// Export ritual state
export const ritualState = initializeRitual(); 