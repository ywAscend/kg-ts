
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import RouterConfig from './config'
const RouterCom = () => {
    return(
        <Router>
            {
                renderRoutes(RouterConfig)
            }
        </Router>
    )
}


export default RouterCom