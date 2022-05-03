const githubQuery = {
  query: `
  {
    viewer {
      name
    }
    search(query: "user:arnoldpaye sort:updated-desc", type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          name
          description
          id
          url
        }
      }
    }
  }
  `,
};

export default githubQuery;
