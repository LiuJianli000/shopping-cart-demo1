import * as apis from '../services/example'

export default {
  namespace: 'indexPage',
  state: {
    name: 'chen',
    products: [],  //页面渲染的数据
    staticSize: [],  //size 后的原始数据, default sort 用
    staticData: [],  //原始的数据
    cartData: [],  //购物车渲染的数据
    count: 0,
    sizeData: [],  //尺寸筛选出的数据(还未去重)
    newSizeData: [],   //去重的筛选数据
    subTotal: 0,   //总价,
  },
  effects: {
    *handleClose({payload}, {put}) {
      const {quantity, id} = payload
      yield put({
        type: 'closeBtn',
        payload: {
          quantity,
          id
        }
      })

      yield put({
        type: 'subTotal',
      })
    },
    *minusOne({ payload: {quantity, id} }, { put }) {
      yield put({
        type: 'countMinusOne',
        payload: {
          quantity,
          id
        }
      })

      yield put({
        type: 'subTotal',
      })
    },
    *plusOne({ payload: {quantity, id} }, { put }) {
      yield put({
        type: 'countPlusOne',
        payload: {
          quantity,
          id
        }
      })

      yield put({
        type: 'subTotal',
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
        type: 'selectSizeData',
        size: payload
      })
      yield put({
        type: 'selectSize',
        size: payload
      })

      yield put({
        type: 'selectSizeStatic',
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
    },
    *setStorage(payload, {put}) {
      yield put ({
        type: 'storageData',
        data: JSON.parse(window.localStorage.data)
      })
    }
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
      // console.log('setStaticData')
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
    selectSizeData(state, payload) {
      return {
        ...state,
        sizeData: state.sizeData.concat(payload.size)
      }
    },
    selectSize(state, payload) {
      // console.log('xxxxxxxxxx', payload)
      // state.sizeData = state.sizeData.concat(payload.size)
      const newSizeData = []
      for(let item1 of state.sizeData) {
        let flag = true
        for(let item2 of newSizeData) {
          if(item1.id === item2.id) {
            flag = false
          }
        }
        if(flag) {
          newSizeData.push(item1)
        }
      }
      return {
        ...state,
        products: newSizeData,
        newSizeData: newSizeData,
      }
    },
    selectSizeStatic(state, payload) {
      // console.log('xxxxxxxxxx', payload)
      return {
        ...state,
        staticSize: state.newSizeData
      }
    },
    cartData(state, { payload }) {
      console.log('cart2', payload.msg)
      console.log('cartData', state.cartData)
      const { cartData } = state
      const { msg } = payload

      let num = 0;
      let count = 0
      let subTotal = 0
      cartData.forEach(item => {
        if (item.id === msg.id) {
          item.quantity += 1;
        }
        else {
          num ++
        }
        count += item.quantity
        // subTotal = subTotal + item.price + (item.quantity - 1)
      })

      if (cartData.length === num) {
        cartData.push({
          ...msg,
          quantity: 1
        })
        count += 1
      }

      cartData.forEach(item => {
        subTotal  = subTotal + item.price * item.quantity
      })
      
      
      return {
        ...state,
        cartData,
        count,
        subTotal
      }
      
    },
    countPlusOne(state, {payload: {quantity, id}}) {
      const { cartData } = state

      let count = 0
      cartData.forEach( item => {
        if (item.id === id) {
          item.quantity = quantity
        }

        count += item.quantity
      })

      return {
        ...state,
        cartData,
        count
      }
    },
    countMinusOne(state, {payload: {quantity, id}}) {
      const { cartData } = state

      let count = 0
      cartData.forEach( item => {
        if (item.id === id) {
          item.quantity = quantity
        }
        count += item.quantity
      })
      return {
        ...state,
        cartData,
        count
      }
    },
    closeBtn(state, {payload: {id, quantity}}) {
      const {cartData} = state
      let count = 0
      cartData.forEach(item => {
        if(item.id === id) {
          item.quantity = quantity
          cartData.splice(cartData.findIndex(item => item.id === id), 1)
        }
      })
      cartData.forEach(item => {
        count += item.quantity
      })
      return {
        ...state,
        cartData,
        count
      }
    },
    subTotal(state, payload) {
      let subTotal = 0
      state.cartData.forEach(item => {
        subTotal = subTotal + item.price * item.quantity
      })
      return {
        ...state,
        subTotal
      }
    },
    storageData(state, {data}) {
      console.log('data........................', data)
      return {
        ...state,
        cartData: data
      }
    }
  },
  
}
