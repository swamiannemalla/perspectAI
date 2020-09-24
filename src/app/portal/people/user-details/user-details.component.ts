import { ChangeDetectionStrategy, Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute} from '@angular/router';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../data.service';
import { MatDialog } from '@angular/material/dialog';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { DialogsServiceService } from './user-details-dialog/dialogs-service.service';



@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class UserDetailsComponent implements OnInit {
  flip: string = 'inactive';

  arrs: any = [];
  getData = [];
  motivesData = [];
  EAData = [];
  CognitiveData = [];
  dataArr = {};
  datakeys = [];
  sub: any;
  playerObject: any;
  tempmotive: any;
  result: boolean;


  /* Motives Functionality */
  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }

  /* Interview functionality */
  items = Array.from({ length: 100000 }).map((_, i) => `${i}`);
  hrcomponent = Array({ length: 1 });
  VideoElement: Object[];
  public show: boolean = false;
  currentvideoindex: number = 0;
  buttonColor: string;
  display: boolean = true;
  constructor(public activeRouter: ActivatedRoute,private router: Router, private data: DataService,public dialog: MatDialog, public dss : DialogsServiceService ) {
    this.arrs = [
      {
        name: "RELATIONSHIP",
        url: "assets/a3.png",
        CandidateMotive: "POWER",
        content: "ukaweyvgfuawedvfhakgwedvl"

      },
      {
        name: "ENVIRONMENT",
        url: "assets/a3.png",
        CandidateMotive: "SECURITY",
        content: "ukaweyvgfuawedvfhakgwedvl"
      }

    ];
    console.log(this.VideoElement)
  }

  ngOnInit() {
    this.data.getSharedUserData().subscribe(dt => {
      console.log(dt);
      this.tempmotive=dt;
      this.dataArr = {};
      for(var i in dt ){
        if(i == "cognitive"){

          console.log("dt----",dt[i]);

          for(var j=0;j<=dt[i].length-1;j++){
            console.log("dt----",dt[i][j]);
            var obj = dt[i][j];
            var factor = obj.factor
            console.log("factor",factor);
             if (this.datakeys.indexOf(factor) == -1) {
              this.datakeys.push(factor);
          }
            if(this.dataArr.hasOwnProperty(factor)){
              this.dataArr[factor].push(obj)
            }else{
              this.dataArr[factor] = [];
              this.dataArr[factor].push(obj)
            }

          }   

          console.log("this.dataarr :::",this.dataArr);
          console.log("this.datakeys :::",this.datakeys);
        }
      }
      this.getData = dt;
      this.loadMotivesdata();
    })
    this.sub = this.activeRouter
      .queryParams
      .subscribe(params => {
        this.playerObject = params['name'];       
      });

  }
  loadMotivesdata() {
    const motives = (<any>this.getData).motives; 
    const cognitive = (<any>this.getData).cognitive;
    const EA = (<any>this.getData).EA;
    console.log(EA)
    if (motives) {
      this.motivesData.length = 0;
      const newMotive1 = {
        name:  motives.primary_motive_1,
        highlights: motives.primary_1_char.CHARACTERISTICS,
        watchouts: motives.primary_1_char['WATCH-OUTS']
      }
      this.motivesData.push(newMotive1);

      /* const newMotive3 = {
        name:  motives.primary_motive_1,
        highlights: motives.primary_2_char.CHARACTERISTICS,
        watchouts: motives.primary_2_char['WATCH-OUTS']
      }
      this.motivesData.push(newMotive3); */
      
      const newMotive2 = {
        name: motives.secondary_motive,
        highlights: motives.secondary_motive_char.CHARACTERISTICS,
        watchouts: motives.secondary_motive_char['WATCH-OUTS']
      }
      this.motivesData.push(newMotive2);
    }

    if (EA) {
      this.EAData = [];
      this.EAData = EA;
      console.log(this.EAData)
    }

    if (cognitive) {
      this.CognitiveData = [];
      this.CognitiveData = cognitive;
      console.log(this.CognitiveData);
    }
    this.data.commondata = this.motivesData;
    console.log("=========",this.motivesData,this.data);


  }
  toggle(index) {
    this.buttonColor = "#350f65"
    console.log(index);
    this.currentvideoindex = index;
    this.show = true;
  } 
  public openDialog() {
    this.dss.confirm('Confirm Dialog', 'Are you sure you want to do this?')
      .subscribe((res)=>{
        this.result = res;
        console.log("this ::::",this.motivesData);
        
      });
     /*  this.data.getSharedUserData().subscribe(dt => {
        
        console.log("dtttttt",dt);
  }); */
}
}

 /*  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  } */



