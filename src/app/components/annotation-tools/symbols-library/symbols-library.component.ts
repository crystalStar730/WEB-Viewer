import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rx-symbols-library',
  templateUrl: './symbols-library.component.html',
  styleUrls: ['./symbols-library.component.scss']
})
export class SymbolsLibraryComponent implements OnInit {
  ngOnInit(): void {
    this.getSymbols();
  }
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  opened: boolean = false;
  symbols: any[] = [];
  onPanelClose(): void {
    this.onClose.emit();
  }
  private convertUrlToBase64Data(url: string, newWidth?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const canvas = document.createElement('canvas');
      img.crossOrigin = '*';
      img.onload = () => {
          const originalWidth = img.width, originalHeight = img.height;
          const aspectRatio = originalWidth / originalHeight;
          const width = newWidth || originalWidth, height = newWidth ? newWidth / aspectRatio : originalHeight;
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext('2d')!;
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL();
          const base64Index = base64.indexOf('base64,') + 'base64,'.length;
          const imageData = base64.substring(base64Index);
          resolve({imageData, width, height});
      };
      img.onerror = function () {
          reject(new Error('Error convert to base64'));
      };
      img.src = url;
    })
  }

  handleSymbolsUpload(event: any) {
    const files = event.target.files;
    const uploadPromises: Promise<any>[] = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      const uploadPromise = new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          const imageDataWithPrefix = e.target?.result as string;
  
          const {imageData, width, height} = await this.convertUrlToBase64Data(imageDataWithPrefix, 210);
  
          const imageName = file.name;
          //const imageType = file.type;
          const imageType = "image/png";
  
          // Convert base64 string to byte array
          const byteCharacters = window.atob(imageData);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
  
          // Create an object to store in local storage
          const imageObject = {
            imageData: Array.from(byteArray), // Convert to a regular array for JSON compatibility
            imageName: imageName,
            imageType: imageType,
            width, 
            height
          };
          const storedImages = JSON.parse(localStorage.getItem('UploadedSymbols') || '[]');
          storedImages.push(imageObject);
          localStorage.setItem('UploadedSymbols', JSON.stringify(storedImages));
          this.getSymbols();
        };
  
        reader.onerror = (error) => {
          reject(error);
        };
  
        reader.readAsDataURL(file);
      });
  
      uploadPromises.push(uploadPromise);
    }
  
    // Wait for all uploads to finish before refreshing the symbols list
    Promise.all(uploadPromises).then(() => {
      this.getSymbols();
    });
  }
  
  deleteSymbol(index: number): void {
    let symbols = JSON.parse(localStorage.getItem('UploadedSymbols') || '[]');
    
    if (index > -1 && index < symbols.length) {
      symbols.splice(index, 1);
      localStorage.setItem('UploadedSymbols', JSON.stringify(symbols));
      this.getSymbols();
    } else {
      console.error('Invalid index for deleting Symbol');
    }
  }
  getSymbols() {
    const storedImages = JSON.parse(localStorage.getItem('UploadedSymbols') || '[]');
    this.symbols = storedImages.map((imageObject, index) => {
      const byteArray = new Uint8Array(imageObject.imageData);

      // Create a Blob from the byte array
      const blob = new Blob([byteArray], { type: imageObject.imageType });

      // Create an object URL for the Blob
      const imageSrc = URL.createObjectURL(blob);

      // Create an image object with required properties
      return {
        id: index, // Or use a more sophisticated ID generation method if needed
        src: imageSrc,
        height: imageObject.height || 210,
        width: imageObject.width || 210
      };
    });
    if (storedImages.length > 0) {
      console.log('Images retrieved successfully:', this.symbols);
    } else {
      this.symbols = [];
      console.log('No images found in local storage.');
    }
  
    // Uncomment and modify the server code if needed in the future
    // this.imageUploadService.getAllImages().subscribe(
    //   async response => {
    //     const imagePromises = response.map(item =>
    //       this.convertBase64ToBlob(item.imageData).then(blob => ({
    //         id: item.id,
    //         src: URL.createObjectURL(blob),
    //         height: 150,
    //         width: 200
    //       }))
    //     );
  
    //     const resolvedImages = await Promise.all(imagePromises);
    //     this.images = resolvedImages;
    //     console.log('Images retrieved successfully:', this.images);
    //   },
    //   error => {
    //     console.error('Error retrieving images:', error);
    //   }
    // );
  }
  
}
 