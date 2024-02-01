import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './page/home/Home.page';
import HomeAddPage from './page/home/HomeAdd.page';
import HomeDetailPage from './page/home/HomeDetail.page';
import HomeEditPage from './page/home/HomeEdit.page';
import siswaPath from './path/siswa.path';

function App() {
  return (
    <Router>
      <Routes basename={siswaPath.main}>
        <Route index path="/" element={<HomePage />} />
        <Route index path={siswaPath.main} element={<HomePage />} />
        <Route path={siswaPath.add} element={<HomeAddPage />} />
        <Route path={siswaPath.detail()} element={<HomeDetailPage />} />
        <Route path={siswaPath.edit()} element={<HomeEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
