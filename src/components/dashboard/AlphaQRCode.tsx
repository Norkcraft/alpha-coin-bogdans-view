
import { useEffect, useRef } from 'react';

interface AlphaQRCodeProps {
  value: string;
  size?: number;
}

// Simple QR code component
const AlphaQRCode = ({ value, size = 180 }: AlphaQRCodeProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This is a simplified version that just shows a "fake" QR code
    // In a real app, you would use a QR code library like qrcode.react
    if (qrRef.current) {
      const renderQR = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = size;
        canvas.height = size;
        
        // Draw black background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, size, size);
        
        // Draw white background with border
        ctx.fillStyle = '#fff';
        ctx.fillRect(5, 5, size - 10, size - 10);
        
        // Draw Alpha Coin logo in center
        ctx.fillStyle = '#8B5CF6';
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 7, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw "alpha" text in center
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${size / 10}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ALPHA', size / 2, size / 2);
        
        // Draw fake QR code bits
        const blockSize = size / 25;
        for (let i = 0; i < 25; i++) {
          for (let j = 0; j < 25; j++) {
            // Skip center area for logo
            const centerX = Math.abs(i - 12);
            const centerY = Math.abs(j - 12);
            if (centerX < 4 && centerY < 4) continue;
            
            // Draw fixed patterns at corners
            if ((i < 7 && j < 7) || (i < 7 && j > 17) || (i > 17 && j < 7)) {
              if ((i === 0 || i === 6 || j === 0 || j === 6) || 
                  (i > 1 && i < 5 && j > 1 && j < 5)) {
                ctx.fillStyle = '#000';
                ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
              }
              continue;
            }
            
            // Generate pseudo-random pattern based on value string
            const hash = (i * 25 + j) % value.length;
            const charCode = value.charCodeAt(hash);
            if (charCode % 3 === 0) {
              ctx.fillStyle = '#000';
              ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
            }
          }
        }
        
        // Clear qrRef
        while (qrRef.current.firstChild) {
          qrRef.current.removeChild(qrRef.current.firstChild);
        }
        
        qrRef.current.appendChild(canvas);
      };
      
      renderQR();
    }
  }, [value, size]);
  
  return (
    <div 
      ref={qrRef} 
      className="qr-code-container border-4 border-white rounded-lg overflow-hidden shadow-lg"
    ></div>
  );
};

export default AlphaQRCode;
