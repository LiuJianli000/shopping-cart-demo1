import React from 'react'
import {connect} from 'dva'
import styles from './ContentList.css'
import SelectBox from '../components/SelectBox'
import ContentCard from '../components/ContentCard'

@connect(({indexPage}) => ({
  products: indexPage.products
}))

class ContentList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch({
      type: 'indexPage/fetch'
    })
  }
  
  render() {
    const { products } = this.props

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
          {products.map(item => (
            <ContentCard data={item} key={item.id}/>
          ))}
        </div>
      </div>
    )
  }
}
export default ContentList;
