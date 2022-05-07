import { useCallback, useEffect, useState } from "react";
import github from "./db.js";
import query from "./Query";
import RepoInfo from "./RepoInfo";

function App() {
  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState("react");
  let [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>Repos
      </h1>
      <p>Hey there {userName}</p>
      <p>
        <b>Search for:</b> {queryString} | <b>Items per page:</b> {pageCount} |{" "}
        <b>Total results:</b> {totalCount} |
      </p>

      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <RepoInfo key={repo.id.toString()} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
