import { Route, Switch } from 'wouter';

function HomePage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '24px'
    }}>
      oi
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  );
}