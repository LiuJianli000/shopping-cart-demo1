import React from 'react'
import styles from './SizeBox.css'
import { connect } from 'dva'

@connect(({ indexPage }) => ({
  products: indexPage.products,
  originProducts: indexPage.originProducts
}))
class SizeBox extends React.Component {
  state = {
    sizeList: ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'],
    selectSize: [],
  }

  handleSelect = async size => {
    const { dispatch, products, originProducts } = this.props
    const { selectSize } = this.state
    const newSelectSize = [...selectSize]
    const sizeIndex = newSelectSize.indexOf(size)
    const newProducts = []

    if (sizeIndex > -1) {
      newSelectSize.splice(sizeIndex, 1)
      
      await this.setState({
        selectSize: newSelectSize,
      })
    } else {
      newSelectSize.push(size)

      await this.setState({
        selectSize: newSelectSize,
      })
    }

    originProducts.map(item => {
      let hasSize = false

      item.availableSizes.map(size => {
        if (this.state.selectSize.indexOf(size) > -1) {
          hasSize = true
        }
      })

      if (hasSize) {
        newProducts.push(item)
      }
    })

    dispatch({
      type: 'indexPage/selectSize',
      payload: this.state.selectSize.length > 0 ? newProducts : originProducts
    })
  }

  render() {
    const { sizeList, selectSize } = this.state

    return (
      <div className={styles.sizebox}>
        <h2>Sizes:</h2>
        <ul className={styles.filter}>
          {sizeList.map(item => 
            <li
              key={item}
              style={{ borderColor: selectSize.indexOf(item) > -1 && 'black' }} 
              onClick={() => this.handleSelect(item)}
            >{item}</li>)
          }
        </ul>
      </div>
    )
  }
}

export default SizeBox