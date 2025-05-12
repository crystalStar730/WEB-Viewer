import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TopNavMenuService {
  constructor() { }

  private activeFile: Subject<any> = new Subject<any>();
  public activeFile$: Observable<any> = this.activeFile.asObservable();
  setActiveFile(file: any) {
    this.activeFile.next(file);
  }

  public selectTab: Subject<any> = new Subject<any>();
  public selectTab$: Observable<any> = this.selectTab.asObservable();

  public closeTab: Subject<any> = new Subject<any>();
  public closeTab$: Observable<any> = this.closeTab.asObservable();

  public openModalPrint: Subject<void> = new Subject<void>();
  public openModalPrint$: Observable<void> = this.openModalPrint.asObservable();

  private _measurePanelState: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public measurePanelState$: Observable<any> = this._measurePanelState.asObservable();
  public setMeasurePanelState(any): void {
    this._measurePanelState.next(any);
  }

  private fileLength: Subject<number> = new Subject<number>();
  public fileLength$: Observable<number> = this.fileLength.asObservable();
  setFileLength(length: number) {
    this.fileLength.next(length);
  }


}
