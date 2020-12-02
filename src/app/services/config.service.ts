import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _baseConfig: any = {
    "baseUrl": "http://localhost:8000",
  }

  private _languages = [
    { 'key': 'en', 'value': 'EN' },
    { 'key': 'bn', 'value': 'BN' },
    { 'key': 'hi', 'value': 'HI' },
    { 'key': 'ta', 'value': 'TA' },
    { 'key': 'te', 'value': 'TE' },
    { 'key': 'gu', 'value': 'GU' },
  ]

  constructor() { }

  public get(key: any) {
    return this._baseConfig[key];
  }

  public getLanguages() {
    return this._languages;
  }

}
