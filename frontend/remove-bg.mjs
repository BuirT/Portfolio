import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

async function processImage() {
  const inputPath = path.resolve('./public/avt.png');
  const outputPath = path.resolve('./public/avt_transparent.png');
  
  try {
    const inputUrl = pathToFileURL(inputPath).href;
    console.log('Removing background from', inputUrl, '...');
    
    // removeBackground also accepts a Blob or Buffer, but URL is safest
    const blob = await removeBackground(inputUrl);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    console.log('Background removed successfully! Saved to', outputPath);
    
    // Replace original avt.png with the transparent one
    fs.copyFileSync(outputPath, inputPath);
    console.log('Replaced avt.png with the transparent version.');
  } catch (err) {
    console.error('Failed to remove background:', err);
  }
}

processImage();
