import React from 'react'
import styles from './SizeBox.css'
import { connect } from 'dva'

@connect(({ indexPage }) => ({
  products: indexPage.products,
  staticData: indexPage.staticData
}))

class SizeBox extends React.Component {
  select = (e) => {
    console.log(e.target.style)
    // if(e.target.style.cssText) {
    //   e.target.style = ""
    // }else {
    //   e.target.style = "background: black; color: white"
    // }

    console.log(e.target)
    
    const newProducts = this.props.staticData.filter(function (item) {
      if (item.availableSizes.indexOf(e.target.innerText) > -1) {
        return item
      }
    })
    this.props.dispatch({
      type: 'indexPage/select',
      payload: newProducts
    })

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