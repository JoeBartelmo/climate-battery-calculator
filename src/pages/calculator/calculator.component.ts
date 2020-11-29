import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MathContent } from 'src/lib/mathjax/MathJaxWrapper';
import { GAHTCalculator } from 'src/lib/GAHTCalculator';

/**
 * Gaht Calculator Stepper
 */
@Component({
    selector: 'app-gaht-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
  })
export class GahtCalculatorComponent implements OnInit {
  // volume
  public volumeTypes = ['ft³', 'in³', 'cm³', 'm³'];
  // area
  public areaTypes = ['ft²', 'in²', 'cm²', 'm²'];

  public volumeFormGroup: FormGroup;
  public fanFormGroup: FormGroup;

  public gahtCalculator: GAHTCalculator = new GAHTCalculator();

  public latexCalculators = {
    cfm: {latex: ''} as MathContent
  }

  /**
   * Grabs the latex code for CFM calculation
   */
  public setCFMCalculator(): void {
    this.latexCalculators.cfm = this.gahtCalculator.latexCFMNotation(
      this.gahtCalculator.convert(this.volumeFormGroup.controls.volume.value, 'ft³'),
      this.fanFormGroup.controls.exchanges.value,
      this.fanFormGroup.controls.fans.value
    )
  }

  /**
   * Computes the minimum CFM needed for the system
   */
  public getCFMRequired(): number {
    return this.gahtCalculator.computeCFM(
      this.gahtCalculator.convert(this.volumeFormGroup.controls.volume.value, 'ft³'),
      this.fanFormGroup.controls.exchanges.value,
      this.fanFormGroup.controls.fans.value
    ) 
  }
  
  constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.volumeFormGroup = this._formBuilder.group({
      volume: ['', Validators.required],
      area: ['', Validators.required],
      areaType: ['', Validators.required],
      volumeType: ['', Validators.required],
    });
    this.fanFormGroup = this._formBuilder.group({
      exchanges: ['', Validators.required],
      fans: ['', Validators.required]
    });
    // default values according to http://www.ecosystems-design.com/climate-battery-calculator.html
    this.volumeFormGroup.controls.areaType.setValue(this.areaTypes[0]);
    this.volumeFormGroup.controls.volumeType.setValue(this.volumeTypes[0]);
    this.volumeFormGroup.controls.area.setValue(500);
    this.volumeFormGroup.controls.volume.setValue(1800);
    this.fanFormGroup.controls.exchanges.setValue(5);
    this.fanFormGroup.controls.fans.setValue(1);
    // trigger latex initial render
    this.setCFMCalculator();
    // subscriptions to triger latex rendering
    this.volumeFormGroup.controls.volume.valueChanges.subscribe(() => this.setCFMCalculator());
    this.fanFormGroup.controls.fans.valueChanges.subscribe(() => this.setCFMCalculator());
    this.fanFormGroup.controls.exchanges.valueChanges.subscribe(() => this.setCFMCalculator());
  }
}