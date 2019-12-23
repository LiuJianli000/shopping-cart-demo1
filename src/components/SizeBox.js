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
    const {dispatch, staticData} = this.props
    // console.log(e.target.style)
    if(e.target.style.cssText) {
      e.target.style = ""

      console.log('reset')
      
    }else {
      e.target.style = "background: black; color: white"

      const newProducts2 = staticData.filter(function (item) {
        if (item.availableSizes.indexOf(e.target.innerText) > -1) {
          return item
        }
      })

      dispatch({
        type: 'indexPage/select',
        payload: newProducts2
      })
    }

    
    // console.log('newProducts2', newProducts2)
    
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