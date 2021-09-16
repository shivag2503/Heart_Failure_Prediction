import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { APIServiceService } from '../api-service.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css'],
})
export class PredictionComponent implements OnInit {
  data: any;
  showModal = false;
  output = '';
  colValues: any;

  predictionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.max(150),
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    cpk: new FormControl('', [
      Validators.required,
      Validators.max(8000),
      Validators.min(10),
      Validators.pattern('^[0-9.]*$'),
    ]),
    anaemia: new FormControl('', [Validators.required]),
    diabetes: new FormControl('', [Validators.required]),
    ef: new FormControl('', [
      Validators.required,
      Validators.max(100),
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    hbp: new FormControl('', [Validators.required]),
    platelets: new FormControl('', [
      Validators.required,
      Validators.max(850000),
      Validators.min(100000),
      Validators.pattern('^[0-9.]*$'),
    ]),
    sc: new FormControl('', [
      Validators.required,
      Validators.max(10),
      Validators.min(0.5),
      Validators.pattern('^[0-9.]*$'),
    ]),
    ss: new FormControl('', [
      Validators.required,
      Validators.max(150),
      Validators.min(100),
      Validators.pattern('^[0-9]*$'),
    ]),
    time: new FormControl('', [
      Validators.required,
      Validators.max(365),
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    gender: new FormControl('', [Validators.required]),
    smoking: new FormControl('', [Validators.required]),
  });

  constructor(
    private api: APIServiceService,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {}

  predict() {
    this.spinner.requestStarted();
    this.api
      .getPrediction(
        this.predictionForm.value.age,
        this.predictionForm.value.cpk,
        this.predictionForm.value.ef,
        this.predictionForm.value.platelets,
        this.predictionForm.value.sc,
        this.predictionForm.value.ss,
        this.predictionForm.value.time,
        this.predictionForm.value.smoking,
        this.predictionForm.value.gender,
        this.predictionForm.value.diabetes,
        this.predictionForm.value.hbp,
        this.predictionForm.value.anaemia
      )
      .subscribe((data) => {
        this.data = data;
        this.colValues = this.predictionForm.value;
        this.output = 'Prediction made. See the report for details..';
        this.spinner.requestEnded();
      });
  }

  reset() {
    this.output = '';
    this.predictionForm.reset();
  }
}
