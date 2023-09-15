import { Component } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  selectedFile: File | null = null;
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      // Perform the file upload action here, e.g., send it to a server
      // You can use services like HttpClient to make HTTP requests to your server.
      // Example:
      // const formData = new FormData();
      // formData.append('file', this.selectedFile);
      // this.http.post('/upload', formData).subscribe(response => {
      //   console.log('File uploaded successfully', response);
      // });
    }
     else {
      // Handle the case where no file is selected
      console.error('No file selected');
    }
  }

}
