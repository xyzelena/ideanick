import { TrpcProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage/index';

const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  );
};

export default App;
