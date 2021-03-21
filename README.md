# react router dom

HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고, 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있다.

## BrowerRouter

BrowserRouter는 react-router-dom에 내장되어 있는 컴포넌트로 프로젝트에 적용하기 위해서는 BrowserRouter로 `index.js`에서 App 컴포넌트를 감싸주는게 일반적이다.

### index.js

```javascript
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

## Route

Route도 내장된 컴포넌트로 Route를 사용하면 사용자의 현재 경로에 따라 다른 컴포넌트를 보여줄 수 있습니다. 일반적으로 `App.js`에서 사용합니다.

### App.js

- path property

  사용자의 현재 경로와 비교할 문자열 입니다.

- component property

  사용자의 현재 경로와 path를 비교하여 path가 현재 경로에 포함되면 보여질 component입니다.

- exact property

  exact property의 default값은 false입니다. exact property를 true로 전달하게 되면 사용자의 현재 경로와 path가 정확히 일치하는 경우에만 component를 보여줍니다.

```javascript
import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App = () => {
  retrun(
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};
```

## Link

Link component는 클릭시 다른 주소로 이동시켜 주는 컴포넌트입니다. HTML5 History API를 사용하여 페이지의 주소만 변경해 줍니다. 아래는 `App.js`에서 Link component를 사용하여 About page와 Home page를 이동할 수 있는 예시입니다.

### App.js

- to property

  Link component의 to property를 통해 클릭시 연결된 경로를 전달해줍니다.

```javascript
import React from "react";
import { Link, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```

## Route에 여러 개의 path 설정하기

여러 경로에서 보여지길 원하는 component가 있다면 Route에 여러 경로를 전달할 수도 있습니다. 문자열을 전달하는 대신 문자열을 담은 배열을 전달하면 됩니다.

### App.js

About이라는 component를 경로 '/about'과 '/info'에서 모두 보여주기 위한 코드 입니다.

```javascript
import React from "react";
import { Link, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <ul>
        (...)
      </ul>
      (...)
      <Route path={['/about', '/info']} component={About}>
    </div>
  );
};

export default App;
```

## 파라미터와 쿼리

react-router-dom에서 파라미터와 쿼리를 받는 방법을 알아봅니다.

### 파라미터를 받는 방법

Route로 연결된 component에 파라미터는 match라는 props로 전달됩니다.

#### App.js

```javascript
import React from "react";
import { Link, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div>
      <ul>
        (...)
        <li>
          <Link to="/profile/minseok">minseok 프로필</Link>
        </li>
        <li>
          <Link to="/profile/velopert">velopert 프로필</Link>
        </li>
      </ul>
      (...)
      <Route path="/profile/:username" component={Profile} />
    </div>
  );
};
```

#### Profile.js

```javascript
import React from "react";

const data = {
  minseok: {
    name: "minseok",
    age: 28,
  },
  velopert: {
    name: "velopert",
    age: 20,
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const user = data[username];

  if (!user) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <h3>{username}</h3>
      <h4>{user.age}</h4>
    </div>
  );
};

export default Profile;
```

### 쿼리를 받는 방법

쿼리는 Route를 통해 연결된 component에 location이라는 props의 search property에 담겨지게 됩니다. 아마 search에 담기는 이유는 query가 보통 검색 용도로 많이 사용되기 때문이라고 생각합니다. search에는 가공된 형태가 아니라 문자열 그대로 들어있습니다. 예를 들어 `?detail=true&q=hello` 같은 문자열입니다. 직접 가공해서 사용해도 되지만 qs라는 라이브러리를 사용해서 문자열을 객체로 변환할 수도 있습니다.

추가적으로 location에는 search외에도 pathname에 현재 경로가 담겨있기도 합니다.

#### About.js

아래와 같이 코드를 작성후 'https://localhost:3000/about?detail=true'에 접속하면 `<p>detail 값이 true로 설정되어 있습니다</p>`을 확인할 수 있습니다.

```javascript
import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const { search } = location;

  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  const showDetail = query.detail === "true";

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
      {showDetail && <p>detail 값이 true로 설정되어 있습니다</p>}
    </div>
  );
};

export default About;
```

## history

history는 match나 location처럼 route로 사용된 컴포토넌트에 전달되는 property로 뒤로 가거나 로그인 후 화면을 전환하거나 다른 페이지로 이탈하는 것을 방지할 때 사용합니다.

- `history.goBack()`

  직전 페이지로 이동합니다.

- `history.push('경로')`

  '경로'로 이동합니다.

## withRouter

withRouter 함수는 라우트로 사용된 컴포넌트가 아니어도 match, location, history객체를 접근할 수 있게 해 줍니다.
사용방법은 match, location, history 객체에 접근하고자 하는 component를 withRouter 함수로 감싸주면 됩니다.

### WithRouterSample.js

withRouter함수를 사용하면 현재 자신을 보여주고 있는 라우트 컴포넌트를 기준으로 match가 전달됩니다.

```javascript
import React from "react";
import { withRouter } from "react-router-dom";

const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea value={JSON.stringify(location, null, 2)} rows={7} readOnly />
      <h4>match</h4>
      <textarea value={JSON.stringify(match, null, 2)} rows={7} readOnly />
      <button onClick={() => history.push("/")}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
```

## Switch

Switch 컴포넌트는 여러 Route를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링시켜 줍니다. Switch안의 Route에 path를 지정하지 않으면 어떤 경로와도 일치하게 되는데요. 이를 이용하여 Not Found 페이지도 구현할 수 있습니다. `App.js`에서 Switch를 사용해보도록 하겠습니다.

### App.js

```javascript
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div>
      <ul>(...)</ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile/:username" component={Profile} />
        <Route
          render={({ location }) => (
            <div>{location.pathname}은 존재하지 않습니다</div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
```

## NavLink

NavLink는 Link component와 동일한 역할을 수행하지만 Link가 선택되었을 때(현재 경로와 Link에 연결된 경로가 동일할때) Link 자체를 스타일링 해줍니다. 스타일링을 위해서는 activeStyle이라는 직관적인 property를 이용해서 style을 전달해주면 됩니다.

### App.js

```javascript
import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Profile from "./components/Profile";
import WithRouterSample from "./components/WithRouterSample";

const App = () => {
  const activeStyle = {
    background: "black",
    color: "white",
  };
  return (
    <div>
      <ul>
        <li>
          <NavLink exact activeStyle={activeStyle} to="/">
            홈
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/about">
            소개
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profile/minseok">
            민석 프로필
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profile/velopert">
            velopert 프로필
          </NavLink>
        </li>
      </ul>
      (...)
    </div>
  );
};

export default App;
```
