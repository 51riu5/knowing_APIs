import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import RepoSuggestions from './RepoSuggestions';
import MarketTrends from './MarketTrends';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [stack, setStack] = useState('');
  const [trendsData, setTrendsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(userResponse.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchRepoSuggestions = async () => {
    try {
      const repoResponse = await axios.get(`https://api.github.com/search/repositories?q=topic:${stack}+language:javascript&sort=stars&order=desc`);
      setRepos(repoResponse.data.items);
    } catch (error) {
      console.error('Error fetching repository suggestions:', error);
    }
  };

  const fetchTrendsData = async () => {
    try {
      const response = await axios.get('https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow');
      setTrendsData(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trends data:', error);
      setLoading(false);
    }
  };

  const handleFetchData = () => {
    fetchUserData();
    fetchRepoSuggestions();
    fetchTrendsData();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Learning Path Tracker</h1>
        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Stack (e.g., react, machine-learning)"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
        />
        <button onClick={handleFetchData}>Fetch Data</button>
        {userData && <UserProfile userData={userData} />}
        {repos.length > 0 && <RepoSuggestions repos={repos} />}
        {!loading && <MarketTrends trendsData={trendsData} />}
      </header>
    </div>
  );
}

export default App;
