import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {
  text = '';
  isEditing = false;

  @Output() textChange = new EventEmitter<string>();

  enableEditing() {
    this.isEditing = !this.isEditing;
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    if (file.type === 'text/markdown') {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.text = e.target.result;
        this.textChange.emit(this.text);
      };
      reader.readAsText(file);
    } else if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const typedArray = new Uint8Array(e.target.result);
        pdfjsLib.getDocument({data: typedArray}).promise.then((pdf) => {
          pdf.getPage(1).then((page) => {
            page.getTextContent().then((textContent) => {
              this.text = textContent.items.map((item) => item.str).join(' ');
              this.textChange.emit(this.text);
            });
          });
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }

}
