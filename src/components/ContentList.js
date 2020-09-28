import React from 'react'
import {connect} from 'dva'
import styles from './ContentList.css'
import SelectBox from '../components/SelectBox'
import ContentCard from '../components/ContentCard'
import axios from 'axios'
import { typeOf } from '../utils/utils'
import { Empty, message, Spin } from 'antd'

@connect(({indexPage}) => ({
  products: indexPage.products
}))

class ContentList extends React.Component {
  state = {
    loading: false
  }
  
  componentDidMount() {
    this.fetch()
  }
  
  fetch = () => {
    const { dispatch } = this.props

    this.setState({
      loading: true
    })
    
    axios
      .get('https://www.fastmock.site/mock/c930c4f4a766a5fc0b14264722e496f1/shopping/get-products')
      .then(res => {
        if (typeOf(res.data) === 'array') {
          dispatch({
            type: 'indexPage/fetch',
            payload: res.data
          })
        } else {
          console.log('err')
          message.error('接口请求错误！')
        }

        this.setState({
          loading: false
        })
      })
  }
  
  render() {
    const { products } = this.props
    const { loading } = this.state

    return (
      <div className={styles.content}>
        <div className={styles.content_head}>
          <p>{products.length} product(s) found.</p>
          <div className={styles.content_head_selectBar}>
            Order by 
            <SelectBox />
          </div>
        </div>
        <div className={styles.content_list}>
          {!products.length > 0 && !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ width: '100%' }} />}
          {loading && <Spin style={{ margin: '0 auto', marginTop: 40 }}/>}
          {products.map(item => (
            <ContentCard data={item} key={item.id}/>
          ))}
        </div>
      </div>
    )
  }
}
export default ContentList;
