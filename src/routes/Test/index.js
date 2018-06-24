import { injectReducer } from 'store/reducers'

export default(store) => ({
  path: 'test',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Test = require('./containers/TestContainer').default
      const reducer = require('./containers/TestModule').default
      injectReducer(store, { key: 'test', reducer })
    //   cb(null, Authenticate(Todden,'ToddenModule','teacher') )
    cb(null, Test)
    }, 'test')
  },
  childRoutes: []
});

// import { injectReducer } from 'store/reducers'
// import NewsCreate from './containers/NewsCreateContainer'
// import reducer from './containers/NewsCreateModule'

// export default(store) => {
//     injectReducer(store, { key: 'newsCreate', reducer })
//     return {
//       path: 'create',
//       component: NewsCreate
//     }
//   };