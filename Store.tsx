import {flow, Instance, types} from 'mobx-state-tree';
import _ from 'lodash';

const API_URL =
  'https://www.worldcoinindex.com/apiservice/v2getmarkets?key=uVT3LEnQMIVx3mlGFQGaKonKhaMjv7e6FRi&fiat=btc';
const {identifier, string, model, number, map, safeReference} = types;

export const CurrencyModel = model('Currency', {
  Label: identifier,
  Name: string,
  Price: number,
  Volume_24h: number,
  Timestamp: number,
  Followed: false,
});

// const getCoinData = async () => {
//   // const headers = new Headers({
//   //   "Accept": "application/json",
//   //   "Content-Type": "application/json",
//   // });
//   const data = await fetch(API_URL /*, { headers }*/);
//   const results = await data.json();
//   return results;
// };

// const getCurrencies = async () => {
//   const results = await fetch(API_URL).then((x) => x.json());
//   const coins = results.Markets[0].map(
//     ({ Label, Name, Price, Volume_24h, Timestamp }) => ({
//       Label: identifier,
//       Name: string,
//       Price: number,
//       Volume_24h: number,
//       Timestamp: number,
//     })
//   );
//   console.log(coins);
//   return coins;
// };

const CurrencyStore = model('Currencies', {
  allCurrencies: map(CurrencyModel),
  selectedCurrency: safeReference(CurrencyModel),
  snackbarVisible: false,
  dialogVisible: false,
  modalVisible: false,
  filterBarVisible: true,
  filterBar: '',
  mostExpensiveCoins: types.frozen(),
  mostTradedCoins: types.frozen(),
  filteredCurrencies: types.array(
    types.safeReference(CurrencyModel, {acceptsUndefined: false}),
  ),
  followedCurrencies: types.array(
    types.safeReference(CurrencyModel, {acceptsUndefined: false}),
  ),
  historyOfCurrencies: types.array(
    types.safeReference(CurrencyModel, {acceptsUndefined: false}),
  ),
}).actions(self => {
  return {
    setSelectedCurrency(currencyKey: any) {
      self.selectedCurrency = currencyKey;
      let index = 0;
      // puting currency into history
      self.historyOfCurrencies.forEach(historicalCurrency => {
        if (historicalCurrency.Label == currencyKey) {
          self.historyOfCurrencies.splice(index, 1);
          return;
        }
        index++;
      });
      self.historyOfCurrencies.unshift(self.selectedCurrency!);
    },
    // Adding and removing currency from followed
    addFollowedCurrency(currencyKey: any) {
      // neka mi bog oprosti...
      let doubles = 0;
      self.followedCurrencies.forEach(followedCurrency => {
        if (followedCurrency.Label == currencyKey) doubles++;
      });
      if (doubles == 0) {
        self.followedCurrencies.push(currencyKey);
        self.snackbarVisible = true;
        self.selectedCurrency = currencyKey;
        self.selectedCurrency!.Followed = true;
      }
    },
    removeFollowedCurrency(currencyKey: any) {
      // i opet, bog smenom...
      let index = 0;
      self.followedCurrencies.forEach(followedCurrency => {
        if (followedCurrency.Label == currencyKey) {
          self.followedCurrencies[index].Followed = false;
          self.followedCurrencies.splice(index, 1);
          return;
        }
        index++;
      });
    },
    removeLastFollowedCurrency() {
      if (self.followedCurrencies.length > 0)
        self.followedCurrencies[self.followedCurrencies.length - 1].Followed =
          false;
      self.followedCurrencies.pop();
    },
    dismissSnackbar() {
      self.snackbarVisible = false;
    },
    // Stop following everything Dialog
    toggleDialog() {
      self.dialogVisible = !self.dialogVisible;
    },
    acceptAndHideDialog(reason: string) {
      switch (reason) {
        case 'DeleteFollow':
          self.followedCurrencies.forEach(followedCurrency => {
            followedCurrency.Followed = false;
          });
          self.followedCurrencies.clear();
          break;
        case 'DeleteHistory':
          self.historyOfCurrencies.clear();
          break;
        default:
          console.error('Unknow reason!');
          break;
      }
      self.dialogVisible = false;
    },
    rejectAndHideDialog() {
      self.dialogVisible = false;
    },
    // FilterBar
    onChangeText(input: string) {
      self.filterBar = input;
    },
    resetTextInput() {
      self.filterBar = '';
    },
    // Details Modal
    toggleModal() {
      self.modalVisible = !self.modalVisible;
    },
    toggleFilterBar() {
      self.filterBarVisible = !self.filterBarVisible;
    },
    // API fetching
    process(data: Instance<typeof CurrencyModel>[]) {
      const dataList = Array.from(data);
      const mapped = dataList.map(e => {
        return self.allCurrencies.put(e);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
    // filtering data && removing duplicates
    filterFilteredData(data: Instance<typeof CurrencyModel>[]) {
      return _.uniqBy(
        [...data].filter(object => object.Name.includes(self.filterBar)),
        'Label',
      );
    },
    filterData(data: any[], typeOfSort: string) {
      // jesu li solucije u ovom kraju opasne? naročito mislim na let-ove
      let sortedCoins = [];
      if (typeOfSort == 'MostValuedCoins') {
        sortedCoins = [...data].sort((a, b) => (a.Price > b.Price ? 1 : -1));
      }
      if (typeOfSort == 'MostTradedCoins') {
        sortedCoins = [...data].sort((a, b) =>
          a.Volume_24h > b.Volume_24h ? 1 : -1,
        );
      }
      if (typeOfSort == 'LongestNameCoins') {
        sortedCoins = [...data].sort((a, b) =>
          a.Name.length > b.Name.length ? 1 : -1,
        );
      }
      const firstPlaceCoin = sortedCoins[sortedCoins.length - 1];
      const secondPlaceCoin = sortedCoins[sortedCoins.length - 2];
      const thirdPlaceCoin = sortedCoins[sortedCoins.length - 3];

      self.mostTradedCoins = [firstPlaceCoin, secondPlaceCoin, thirdPlaceCoin];
      return [firstPlaceCoin, secondPlaceCoin, thirdPlaceCoin];
    },
    fetchData: flow(function* fetchData() {
      const currenciesListData = yield fetch(API_URL);
      const newCurrenciesListData = yield currenciesListData.json();
      const processed = self.process(newCurrenciesListData.Markets[0]);
      processed.map((e: Instance<typeof CurrencyModel>) =>
        self.allCurrencies.put(e),
      );
      return processed;
    }),
  };
});

export const store = CurrencyStore.create({});
