import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  @Output() onClose = new EventEmitter();
  @Input() data: any;
  @Input() colValues: any;
  a = '';
  gender = '';
  cpk = '';
  diab = '';
  hbp = '';
  smk = '';
  ef = '';
  pl = '';
  ss = '';
  sc = '';


  constructor() { }

  tests() {
    if(this.colValues.anaemia == '1') {
      this.a = "Being anemic can be a big red flag for serious health issues";
    } else {
      this.a = "Patient is not anaemic.";
    }

    if(Number(this.colValues.cpk) > 120) {
      this.cpk = "Patient's CPK mcg/L is high, it most often means there has been injury or stress to muscle tissue, the heart, or the brain.";
    } else if(Number(this.colValues.cpk) < 10){
      this.cpk = "Patient's CPK mcg/L is low.";
    } else {
      this.cpk = "Patient's CPK mcg/L is normal."
    }

    if(Number(this.colValues.ef) > 75) {
      this.ef = "Patient's ejection fraction is very high, it causes the walls of your heart to beat harder.";
    } else if(Number(this.colValues.ef) <= 45){
      this.ef = "Patient's ejection fraction is less and can be evidence of heart failure";
    } else {
      this.ef = "Patient's ejection fraction is normal.";
    }

    if(Number(this.colValues.sc) > 5) {
      this.sc = "Patient's serum creatinine is high that means your kidneys aren’t working well.";
    } else if(Number(this.colValues.sc) < 0.5) {
      this.sc = "Patient's serum creatinine is low that means lower muscle mass caused by a disease.";
    } else {
      this.sc = "Patient's serum creatinine is normal.";
    }

    if(Number(this.colValues.ss) > 145) {
      this.ss = "Patient's serum sodium is high.";
    } else if(Number(this.colValues.ss) < 135) {
      this.ss = "Patient's serum sodium is low.";
    } else {
      this.ss = "Patient's serum sodium is normal.";
    }

    if(Number(this.colValues.platelets) > 450000) {
      this.pl = "Patient's platelets are very high.";
    } else if(Number(this.colValues.platelets) < 150000) {
      this.pl = "Patient's platelets are very low.";
    } else {
      this.pl = "Patient's platelets are normal.";
    }

    if(this.colValues.diabetes == '1') {
      this.diab = "Patient is diabetic";
    } else {
      this.diab = "Patient is not diabetic.";
    }

    if(this.colValues.hbp == '1') {
      this.hbp = "Patient has high blood pressure.";
    } else {
      this.hbp = "Patient does not have high blood pressure.";
    }

    if(this.colValues.smoking == '1') {
      this.smk = "Patient is smoker.";
    } else {
      this.smk = "Patient is not smoker.";
    }

    if(this.colValues.gender == '1') {
      this.gender = "Female";
    } else {
      this.gender = "Male";
    }
  }

  ngOnInit(): void {
    console.log(this.colValues);
  }

  onDismissClick() {
    this.onClose.emit(null);
  }

  generatePDF() {  
    this.tests();
    let docDefinition = {  
      content:[ {
        text: 'REPORT',
        fontSize: 16,
        alignment: 'center',
        color: '#047886'
      }, 
      {  
        columns: [  
            [  
                {  
                    text: this.colValues.name, 
                    bold: true, 
                },  
                {text: 'Age: '+ this.colValues.age},
                {text: this.gender},
                { text: this.colValues.address },  
                { text: this.colValues.email },  
                { text: this.colValues.mobile }  
            ],  
            [  
                {  
                    text: `Date: ${new Date().toLocaleString()}`,  
                    alignment: 'right'  
                },  
                {  
                    text: `Report No : ${((Math.random() * 1000).toFixed(0))}`,  
                    alignment: 'right'  
                }  
            ]  
        ]  
    },  
    {
      text: 'Test Details',
      style: 'sectionHeader'
    },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto'],
          body: [
            ['Tests', 'Values', 'Outcome'],
            ['Anaemia', this.colValues.anaemia, this.a],
            ['Creatinine Phosphokinase', this.colValues.cpk, this.cpk],
            ['Diabetes', this.colValues.diabetes, this.diab],
            ['Ejection Fraction', this.colValues.ef, this.ef],
            ['High Blood Pressure', this.colValues.hbp, this.hbp],
            ['Platelets', this.colValues.platelets, this.pl],
            ['Serum Creatinine', this.colValues.sc, this.sc],
            ['Serum Sodium', this.colValues.ss, this.ss],
            ['Time', this.colValues.time, "Patient follow-up period is "+this.colValues.time + " days."],
            ['Smoking', this.colValues.smoking, this.smk]
          ]
        }
      },

      {
        text: 'Results',
        style: 'sectionHeader'
      },

      {
        text: this.data
      },

      {
        text: 'Additional Details',
        style: 'sectionHeader'
      },

      {  
        columns: [  
            [{ qr: `${this.colValues}`, fit: '50' }],  
            [{ text: 'Signature', alignment: 'right', italics: true }],  
        ]  
    },
    {
      text: 'Terms and Conditions',
      style: 'sectionHeader'
    },
    {
        ul: [
          'This prediction is based on historical data.',
          'For better prescription consult to Cardiologist.',
          'This is system generated report.',
        ],
    }
    ],
    styles: {
      sectionHeader: {
        bold: true,
        decoration: 'underline',
        fontSize: 14,
        margin: [0, 15,0, 15]          
      }
    }
  };
   
   
    pdfMake.createPdf(docDefinition).open();  
  }   
}
