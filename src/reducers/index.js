import { combineReducers } from 'redux'

import common from './common'
import paginatedPage from './paginatedPage'
import articlePage from './articlePage'
import specialsSlider from './specialsSlider'
import newsSlider from './newsSlider'
import changingReviews from './changingReviews'
import pricelist from './pricelist'

export default combineReducers({
  common,
  paginatedPage,
  articlePage,
  specialsSlider,
  newsSlider,
  changingReviews,
  pricelist
})
