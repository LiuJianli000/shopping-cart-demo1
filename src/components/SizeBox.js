import React from 'react'
import styles from './SizeBox.css'
import { connect } from 'dva'

@connect(({ indexPage }) => ({
  products: indexPage.products,
  staticData: indexPage.staticData,
  newSizeData: indexPage.newSizeData,
  sizeData: indexPage.sizeData
}))

class SizeBox extends React.Component {
  select = async (e) => {
    const {dispatch, staticData, sizeData, products} = this.props
    // console.log(e.target.style)
    if(e.target.style.cssText) {
      e.target.style = ""

      let filterId = []
      sizeData.forEach(item => {
        if(item.availableSizes.indexOf(e.target.innerText) > -1) {
          filterId.push(item.id)
          return item.id
        } 
      })
      const _filterId = []
      for(let item1 of filterId) {
        let flag = true
        for(let item2 of _filterId) {
          if(item1 === item2) {
            flag = false
          }
        }
        if(flag) {
          _filterId.push(item1)
        }
      }
      console.log('_filterId', _filterId)
      console.log('sizeData', sizeData)
      let _sizeData = sizeData
      await _filterId.forEach(num => {
        // sizeData.forEach(item => {
        //   if(num === item.id) {
        //     _sizeData.splice(sizeData.findIndex(index => item.id === index), 1)
        //   }
        // })
        _sizeData.splice(_sizeData.findIndex(item => item.id === num), 1)
      })
      console.log('_sizeData', _sizeData)
      dispatch({
        type: 'indexPage/select',
        payload: _sizeData
      })

      

    }else {
      e.target.style = "background: black; color: white"

      const newProducts = staticData.filter(function (item) {
        if (item.availableSizes.indexOf(e.target.innerText) > -1) {
          return item
        }
      })
      // console.log(newProducts)
      dispatch({
        type: 'indexPage/select',
        payload: newProducts
      })

     
    }  
  }

  onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  render() {
    return (
      <div className={styles.sizebox}>
        <h2>Sizes:</h2>
        <ul className={styles.filter}>
          <li onClick={this.select}>XS</li>
          <li onClick={this.select}>S</li>
          <li onClick={this.select}>M</li>
          <li onClick={this.select}>ML</li>
          <li onClick={this.select}>L</li>
          <li onClick={this.select}>XL</li>
          <li onClick={this.select}>XXL</li>
        </ul>

      </div>
    )
  }
}

export default SizeBox