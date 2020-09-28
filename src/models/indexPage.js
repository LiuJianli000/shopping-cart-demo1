// import products from '../assets/products'

export default {
  namespace: 'indexPage',
  state: {
    products: [],  //页面渲染的数据
    originProducts: [],
    sort: 'ds',
    sizeProducts: [],
  },
  effects: {
    *fetch({ payload }, { put }) {
      const products = payload

      if (products) {
        yield put({
          type: 'save',
          data: products
        })

        yield put({
          type: 'saveOrigin',
          data: products
        })
      }
    },
    *selectSize({ payload }, { put }) {
      yield put({
        type: 'save',
        data: payload
      })

      yield put({
        type: 'saveSize',
        data: payload
      })
    },
  },
  
  reducers: {
    save(state, payload) {
      let newProducts = [...payload.data]

      switch(state.sort) {
        case 'lth':
          newProducts.sort((a, b) => (a['price'] - b['price']))
          break
        case 'htl':
          newProducts.sort((a, b) => (b['price'] - a['price']))
          break
        default: 
          break
      }

      return {
        ...state,
        products: newProducts,
      }
    },
    saveOrigin(state, payload) {
      return {
        ...state,
        originProducts: payload.data,
        sizeProducts: payload.data
      }
    },
    saveSize(state, payload) {
      return {
        ...state,
        sizeProducts: payload.data,
      }
    },
    sortProducts(state, payload) {
      return {
        ...state,
        products: payload.data,
        sort: payload.sort
      }
    },
  }
}
