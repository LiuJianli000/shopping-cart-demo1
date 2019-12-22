import React from 'react'
import {connect} from 'dva'
import { Select } from 'antd';

const { Option } = Select;

@connect(({indexPage}) => ({
  products: indexPage.products,
  staticData: indexPage.staticData,
  staticSize: indexPage.staticSize
}))

class SelectBox extends React.Component {
  onChange = (value) => {
    // console.log(`selected ${value}`);

    const { products, dispatch, staticSize, staticData } = this.props
    
    if(value === 'all') {
      dispatch({
        type: 'indexPage/sort',
        payload: [...staticData]
      })
    }
    else if(value === 'ds') {
      if(staticSize.length === 0) {
        dispatch({
          type: 'indexPage/sort',
          payload: [...staticData]
        })
      }else {
        dispatch({
          type: 'indexPage/sort',
          payload: [...staticSize]
        })
      }
        
    }
    else if(value === 'lth') {
      const sortProducts = products.sort((a, b) => (a['price'] - b['price']))
      // console.log('1111111', [...sortProducts])
      dispatch({
        type: 'indexPage/sort',
        payload: [...sortProducts]
      })
    }
    else {
      const sortProducts = products.sort((a, b) => (b['price'] - a['price']))
      // console.log(sortProducts)
      dispatch({
        type: 'indexPage/sort',
        payload: [...sortProducts]
      })
    }
  }

 

  // onBlur = () => {
  //   console.log('blur');
  // }

  // onFocus = () => {
  //   console.log('focus');
  // }

  onSearch = (val) => {
    console.log('search:', val);
    
  }

  render() {
    return (
      <Select
        showSearch
        style={{ width: 185, marginLeft: '10px', borderRadius: 0, color: 'black', fontSize: '18px' }}
        placeholder="Select"
        optionFilterProp="children"
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onSearch={this.onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="all">All</Option>
        <Option value="ds">Default sort</Option>
        <Option value="lth">Lowest to Heigest</Option>
        <Option value="htl">Heigest to Lowest</Option>
      </Select>
    )
  }
}


export default SelectBox;



