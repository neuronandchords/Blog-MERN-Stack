import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { __RouterContext} from "react-router";
import { useTransition, animated } from "react-spring";
import Layout from "./components/layout/index";
import Home from "./routes/home/index";
import Login from "./routes/login/index";
import Signup from "./routes/signup/index";
import Article from "./routes/article/index";
import NewArticle from "./routes/NewArticle/index";

const App = () => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate(30%, 0)" },
    enter: { opacity: 1, transform: "translate(0%, 0)" },
    leave: {
      opacity: 0,
      transform: "translate(-70%, 0)",
      position: "absolute",
    },
  });

  return (
    <div id="App">
      <Layout>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route strict exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route path="/article/:postId" component={Article} />
              <Route path="/edit/:slug" component={NewArticle} />
              <Route path="/new/article" component={NewArticle} />
              <Route path="/publish" component={NewArticle} />
              <Redirect to="/" />
            </Switch>
          </animated.div>
        ))}
      </Layout>
    </div>
  );
};

export default App;
