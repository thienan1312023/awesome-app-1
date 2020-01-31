import { observable, computed, action } from "mobx";
import POIItem from "./POIItem";

export class POIListStore {
  @observable POIItems = [];

  get poiItems() {
    return this.POIItems;
  }

  @computed
  get remainingCount() {
    return this.POIItems.filter(POIItem => !POIItem.isDone).length;
  }

  @action
  addPOIItem(Name, FormattedAddress, FormattedPhoneNumber, Rating) {
    if (Name && Name.trim().length > 0) {
      this.POIItems.push(
        new POIItem(Name, FormattedAddress, FormattedPhoneNumber, Rating)
      );
    }
  }

  @action
  removeTodoItem(id) {
    this.POIItems = this.POIItems.filter(POIItem => POIItem.id !== id);
  }
}

export default POIListStore;
