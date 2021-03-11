import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import PrivateRoute from "./routes/PrivateRoute";
import UnPrivateRoute from "./routes/UnPrivateRoute";
import AuthProvider from "./providers/Auth";
import Dashboard from "./layouts/DashboardLayout"
import Page from "./layouts/PageLayout"
import Main from "./layouts/MainLayout"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginView from 'src/views/auth';
import Courses from 'src/views/CoursesList/ListView';
import Books from 'src/views/BooksList/ListView';
import MembersList from 'src/views/MembersList/ListView';
import NewsList from 'src/views/NewsList/ListView';
import Openings from 'src/views/OpeningsList/ListView';
import Projects from 'src/views/ProjectsList/ListView';
import Publications from 'src/views/PublicationsList/ListView';
import TalksList from 'src/views/TalksList/ListView';
import Theses from 'src/views/ThesesList/ListView';
import UpcomingsList from 'src/views/UpcomingsList/ListView';
import Users from 'src/views/UsersList/ListView';
import Home from 'src/views/Home';
import News from 'src/views/News';
import Upcomings from 'src/views/Upcoming';
import Talks from 'src/views/Talk';
import Team from 'src/views/Team';

const App = () => {
 

  return (
    <Router>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>  
            <Switch>
            <Route
            exact 
            path="/" 
            component={() => <Page Children={Home} />} 
            />
            <Route
            exact 
            path="/news" 
            component={() => <Page Children={News} />} 
            />
            <Route
            exact 
            path="/upcomings" 
            component={() => <Page Children={Upcomings} />} 
            />
            <Route
            exact 
            path="/talks" 
            component={() => <Page Children={Talks} />} 
            />
            <Route
            exact 
            path="/team" 
            component={() => <Page Children={Team} />} 
            />
              
            
            <UnPrivateRoute
             exact 
             path="/admin" 
             component={() => <Main Children={LoginView} />} 
             />
          
            <PrivateRoute
              exact
              path="/admin/books"
              component={() => <Dashboard Children={Books} />}
            />

            <PrivateRoute
              exact
              path="/admin/courses"
              component={() => <Dashboard Children={Courses} />}
            />

            <PrivateRoute
              exact
              path="/admin/members"
              component={() => <Dashboard Children={MembersList} />}
            />

            <PrivateRoute
              exact
              path="/admin/news"
              component={() => <Dashboard Children={NewsList} />}
            />

            <PrivateRoute
              exact
              path="/admin/openings"
              component={() => <Dashboard Children={Openings} />}
            />

            <PrivateRoute
              exact
              path="/admin/projects"
              component={() => <Dashboard Children={Projects} />}
            />
            
            <PrivateRoute
              exact
              path="/admin/publications"
              component={() => <Dashboard Children={Publications} />}
            />

            <PrivateRoute
              exact
              path="/admin/talks"
              component={() => <Dashboard Children={TalksList} />}
            />

            <PrivateRoute
              exact
              path="/admin/theses"
              component={() => <Dashboard Children={Theses} />}
            />

            <PrivateRoute
              exact
              path="/admin/upcomings"
              component={() => <Dashboard Children={UpcomingsList} />}
            />

            <PrivateRoute
              exact
              path="/admin/users"
              component={() => <Dashboard Children={Users} />}
            />
          </Switch>
    </AuthProvider>
    </ThemeProvider>
    </Router>
  );
};

export default App;
