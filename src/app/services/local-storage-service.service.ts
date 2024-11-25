import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;
  constructor() { }
  public setItem(key: string, value: string) {
    this.localStorage?.setItem(key, value);
  }

  public getItem(key: string) {
    return this.localStorage?.getItem(key)
  }
  public removeData(key: string) {
    this.localStorage?.removeItem(key);
  }

  public clearData() {
    this.localStorage?.clear();
  }
}