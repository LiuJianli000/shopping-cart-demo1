import React from 'react'
import styles from './SizeBox.css'
import { connect } from 'dva'

@connect(({ indexPage }) => ({
  products: indexPage.products,
  staticData: indexPage.staticData,
  newSizeData: indexPage.newSizeData
}))

class SizeBox extends React.Component {
  select = (e) => {

    // console.log(e.target.style)
    if(e.target.style.cssText) {
      e.target.style = ""

      // const _newSizeData = this.props.newSizeData
      // _newSizeData.map(item => {
      //   if(item.availableSizes.indexOf(e.target.innerText)>-1) {
      //     _newSizeData.splice(_newSizeData.indexOf(item), 1)
      //   }
      // })
      // console.log('newSizeData',_newSizeData)
      // this.props.dispatch({
      //   type: 'indexPage/select',
      //   payload: _newSizeData
      // })
    }else {
      e.target.style = "background: black; color: white"

      const newProducts2 = this.props.staticData.filter(function (item) {
        if (item.availableSizes.indexOf(e.target.innerText) > -1) {
          return item
        }
      })
      // console.log('newProducts2', newProducts2)
      this.props.dispatch({
        type: 'indexPage/select',
        payload: newProducts2
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