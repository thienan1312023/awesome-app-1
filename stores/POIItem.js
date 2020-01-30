import { observable } from 'mobx';
import uuid from 'uuid';

export class POIItem {
  id = uuid();
  @observable Name;
  @observable FormattedAddress;
  @observable FormattedPhoneNumber;
  @observable Rating;

  constructor(Name = '', FormattedAddress = '', FormattedPhoneNumber = '', Rating = 1) {
    this.Name = Name;
    this.FormattedAddress = FormattedAddress;
    this.FormattedPhoneNumber = FormattedPhoneNumber;
    this.Rating = Rating;
  }
}

export default POIItem;