export function getAuthQueryStringParams(): {
  apikey: string;
  ts: string;
  hash: string;
} {
  return {
    apikey: "da3dce8fa885f5501a0fa544558226e4",
    ts: "leo",
    hash: "36f480b7ff3d3ee33e463bdf692b2716",
  }
}

export function getPaginationQueryStringParams(maxResults: number, page: number): {
  limit: string; offset: string;
} {
  console.log("page", page)
  return {
    limit: maxResults.toString(),
    offset: page.toString(),
  }
}

