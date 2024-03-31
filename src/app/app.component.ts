import { Component, Directive, Input,  ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { SignaturePad , SignaturePadModule} from 'angular2-signaturepad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true 
})

export class AppComponent {
  @ViewChild(SignaturePad, { static: false }) signaturePad!: SignaturePad;
  addFieldsArr: any[] = []; 
  editingIndex: number = -1; 
  isEditFields: boolean = false;
  globalIndexVal: number = 0;
  linkPlaceholder: string = 'Link';
  anchorTextPlaceholder: string = 'Anchor text'; 
  title = 'my-app'; 
  ExistingArr = [
    {
      label: 'Name',
      field: 'Name',
      iconClass: 'ti ti-user',
      index: null,
      type: 'text',
      fieldsName: [
        {
          label: 'First Name',
          field: 'firstName',
          type: 'text',
          placeholder: 'First Name',
          helptext: '',
          isEdit: false,
          important: '',
          iTagClass: 'ti ti-cursor-text',
          originalValue: '',
          isNew: true,
        },
        {
          label: 'Last Name',
          field: 'lastName',
          type: 'text',
          placeholder: 'Last Name',
          isEdit: false,
          important: '',
          iTagClass: 'ti ti-cursor-text',
          originalValue: '',
          isNew: true,
        },
      ],
      isEdit: false,
      important: '',
      helptext: '',
      originalValue: 'Name',
    },
    {
      label: 'Email',
      field: 'Email',
      iconClass: 'ti ti-mail',
      type: 'text',
      placeholder: 'Email',
      isEdit: false,
      important: '',
      helptext: '',
      iTagClass: 'ti ti-cursor-text',
      originalValue: 'Email',
      isNew: true
    }, 
    {
      label: 'Password',
      field: 'Password',
      iconClass: 'ti ti-eye',
      type: 'text',
      placeholder: 'Password',
      helptext: '',
      isEdit: false,
      important: '',
      iTagClass: 'ti ti-cursor-text',
      originalValue: 'Password',
      isNew: true
    },
    {
      label: 'Spreadsheet input',
      field: 'spreadsheet_input',
      iconClass: 'ti ti-calendar-plus',
      type: 'text',
      placeholder: 'Spreadsheet Input',
      helptext: '',
      isEdit: false,
      important: '',
      iTagClass: 'ti ti-cursor-text',
      originalValue: 'Spreadsheet Input',
      isNew: true,
      placeholders: ['Link', 'Anchor text'],
    },   
    {
      label: 'Signature',
      field: 'signature',
      iconClass: 'ti ti-signature',
      type: 'text',
      placeholder: 'Please e-sign this agreement.',
      helptext: '',
      isEdit: false,
      important: '',
      iTagClass: 'ti ti-cursor-text',
      originalValue: 'Signature',
      isNew: true
    },
    {
      label: 'Service dropdown',
      field: 'Service-dropdown',
      iconClass: 'ti ti-sort-descending',
      type: 'dropdown',
      placeholder: 'Service dropdown',
      isEdit: false,
      important: '',
      dropdown: [
        {
          itemName: 'Website Audit',
          value: 'website audit'
        },
        {
          itemName: 'Website Audit',
          value: 'website audit'
        }
      ],
      iTagClass: 'ti ti-cursor-text',
      helptext: '',
      originalValue: 'Service dropdown',
      isNew: true
    },
  ];

  signaturePadOptions: Object = {
    // Signature pad options
    'minWidth': 2,
    'canvasWidth': 1300,
    'canvasHeight': 200,
    'penColor': 'black' 
};

  constructor() { }

  ngAfterViewInit() {
    // Set canvas width and height
    if (this.signaturePad) {
      this.signaturePad.set('canvasWidth', 40);
      this.signaturePad.set('canvasHeight', 20);
    }
  }


  drawBegin() {
    console.log('Draw start');
  }

  drawComplete() {
    console.log('Draw complete');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  addField(item: any, index: number): void {
    if (item.originalValue === 'Name') {
      const newIndex = this.addFieldsArr.length;
      const fieldsName = item.fieldsName || [];
      const newItem = {
        ...item,
        index: newIndex,
        fieldsName: [...(item.fieldsName as any[]).map((field: any) => ({ ...field }))]
      };
      this.addFieldsArr.push(newItem);
    } else if (item.originalValue === 'Spreadsheet Input') {
    const newIndex = this.addFieldsArr.length;
    const newPlaceholders = [...item.placeholders];
    const newItem = {
      ...item,
      index: newIndex,
      placeholders: newPlaceholders
    };
    this.addFieldsArr.push(newItem);
    } else if (item.originalValue === 'Email') {
      const emailFieldExists = this.addFieldsArr.some(field => field.originalValue === 'Email');
      if (!emailFieldExists) {
        this.addFieldsArr.push({ ...item });
      }
    }else {
      this.addFieldsArr.push({ ...item });
    }
  }
  
    
  getInputValue(indexOne: number, indexTwo: number, data: any): void {
    console.log(indexOne);
    console.log(indexTwo);
    console.log(data);
    console.log("Edit Index", this.editingIndex);
  
      // Check if the field to update exists
        if (this.addFieldsArr[indexOne].originalValue === 'Name') {
          // For Name field, update the placeholder of the corresponding subfield
          if (this.addFieldsArr[indexOne]?.fieldsName[indexTwo]) {
            this.addFieldsArr[indexOne].fieldsName[indexTwo].placeholder = data;
            console.log('Updated placeholders:', this.addFieldsArr[indexOne].fieldsName);
          }
        }
        if (this.addFieldsArr[indexOne] && this.addFieldsArr[indexOne].type === "text") {
          this.addFieldsArr[indexOne].placeholder = data;
        }
        if (this.addFieldsArr[indexOne] && this.addFieldsArr[indexOne].type === "label") {
          this.addFieldsArr[indexOne].label = data;
        }
        if (this.addFieldsArr[indexOne] && this.addFieldsArr[indexOne].originalValue === "Spreadsheet Input") {
          if(indexOne === this.editingIndex) {
          if (indexTwo === 0) {
            this.addFieldsArr[indexOne].placeholders[0] = data;
          } else if (indexTwo === 1) {
            this.addFieldsArr[indexOne].placeholders[1] = data;
          }
          console.log(this.addFieldsArr);
        }
      }     
  }
  
  
editFields(indexVal: any) {
  console.log(indexVal);
  this.globalIndexVal = indexVal;
  if (indexVal >= 0 && indexVal < this.addFieldsArr.length) {
    this.addFieldsArr[indexVal].isEdit = !this.addFieldsArr[indexVal].isEdit;
    
    if (this.addFieldsArr[indexVal].isEdit) {
      this.editingIndex = indexVal;
    } else {
      this.editingIndex = -1; 
    }
    
    this.isEditFields = this.addFieldsArr.some((field:any) => field.isEdit);
    
    console.log(this.addFieldsArr);
  }
}

}

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule,SignaturePadModule],
  bootstrap: [AppComponent]
})

export class AppModule {}
