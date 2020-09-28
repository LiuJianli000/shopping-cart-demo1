import React from 'react'
import {connect} from 'dva'
import { Select } from 'antd';

const { Option } = Select;

@connect(({ indexPage }) => ({
  products: indexPage.products,
  sizeProducts: indexPage.sizeProducts,
}))

class SelectBox extends React.Component {
  state = {
    value: 'ds'
  }

  handleChange = async value => {
    await this.setState({
      value,
    })

    this.handleSelect(value)
  }

  handleSelect = async value => {
    const { products, dispatch, sizeProducts } = this.props
    let newProducts = [...products]

    switch(value) {
      case 'lth':
        newProducts.sort((a, b) => (a['price'] - b['price']))
        break
      case 'htl':
        newProducts.sort((a, b) => (b['price'] - a['price']))
        break
      default: 
        newProducts = sizeProducts
        break
    }

    dispatch({
      type: 'indexPage/sortProducts',
      data: newProducts,
      sort: value
    })
  }

  render() {
    const { value } = this.state
    
    return (
      <Select
        style={{ width: 185, marginLeft: '10px', borderRadius: 0, color: 'black', fontSize: '18px' }}
        placeholder="Select"
        value={value}
        onChange={this.handleChange}
      >
        <Option value="ds">Default sort</Option>
        <Option value="lth">Lowest to Heigest</Option>
        <Option value="htl">Heigest to Lowest</Option>
      </Select>
    )
  }
}


export default SelectBox;



