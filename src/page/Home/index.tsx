import React from "react";
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import Header from "../../components/head";

interface IProps extends RouteConfigComponentProps {

}

const Home: React.FC<IProps> = props => {
  const { route } = props
  return (
    <div className="Home">
      <Header />
      <div className='content'>
        {renderRoutes(route?.routes)}
      </div>
    </div>
  );
}

export default Home;
