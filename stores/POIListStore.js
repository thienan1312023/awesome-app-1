import { observable, computed, action } from "mobx";
import POIItem from "./POIItem";

export class POIListStore {
  @observable POIItems = [];
  @observable count = 0;
  get poiItems() {
    return this.POIItems;
  }

  @computed
  get remainingCount() {
    return this.POIItems.filter(POIItem => !POIItem.isDone).length;
  }

  @action
  addPOIItem(Name, FormattedAddress, FormattedPhoneNumber, Rating) {
    console.log('addPOIItem', Name);
    if (Name && Name.trim().length > 0) {
      const item = new POIItem(Name, FormattedAddress, FormattedPhoneNumber, Rating);
      this.POIItems.push(item);
      this.count++;
    }
  }

  @action
  removeTodoItem(id) {
    this.POIItems = this.POIItems.filter(POIItem => POIItem.id !== id);
  }
}

export default POIListStore;
