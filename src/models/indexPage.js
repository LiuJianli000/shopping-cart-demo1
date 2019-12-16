import * as apis from '../services/example'

export default {
  namespace: 'indexPage',
  state: {
    name: 'chen',
    products: [],
    staticSize: [],
    staticData: [],
    cartData: [],
    count: 0
  },
  reducers: {
    setProductData(state, payload) {
      //  console.log('ContentList挂载后', payload.data)
      return {
        ...state,
        products: payload.data
      }
    },
    setStaticData(state, payload) {
      console.log('setStaticData')
      return {
        ...state,
        staticData: payload.data
      }
    },
    sortProduct(state, payload) {
      return {
        ...state,
        products: payload.data
      }
    },
    selectSize(state, payload) {
      // console.log('xxxxxxxxxx', payload)
      return {
        ...state,
        products: payload.size
      }
    },
    selectSizeStatic(state, payload) {
      // console.log('xxxxxxxxxx', payload)
      return {
        ...state,
        staticSize: payload.size
      }
    },
    cartData(state, payload) {
      console.log('cart2', payload.payload.msg.id)
      return {
        ...state,
        cartData: [...state.cartData, payload.payload.msg],
        count: payload.payload.count
      }
    },
    countPlusOne(state, payload) {
      console.log(payload)
      return {
        ...state,
        count: payload.payload
      }
    },
    countMinusOne(state, payload) {
      console.log(payload)
      return {
        ...state,
        count: payload.payload
      }
    }
  },
  effects: {
    *minusOne({ payload }, { put }) {
      yield put({
        type: 'countMinusOne',
        payload: payload
      })
    },
    *plusOne({ payload }, { put }) {
      yield put({
        type: 'countPlusOne',
        payload: payload
      })
    },
    *addToCart({ payload }, { put }) {
      // console.log('cart1', payload)
      yield put({
        type: 'cartData',
        payload: payload
      })

      
    },
    *select({ payload }, { put }) {
      yield put({
        type: 'selectSize',
        size: payload
      })

      yield put({
        type: 'selectSizeStatic',
        size: payload
      })
    },
    *sort({ payload }, { put }) {
      yield put({
        type: 'sortProduct',
        data: payload
      })
    },
    
    *testMock({ payload }, { put, call }) {
      let rel = yield call(apis.mockdata)
      if (rel.data) {
        yield put({
          type: 'setProductData',
          data: rel.data.products
        })

        yield put({
          type: 'setStaticData',
          data: rel.data.products
        })
      }
    }
  }
}
