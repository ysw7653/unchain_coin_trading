import axios from "axios";

const fetchNews = async () => {
  const request = axios.create({
    baseURL: "https://api.cryptohub.or.kr/api/news/list?page=1",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data } = await request({
    method: "GET",
  });

  return data;
};

export default fetchNews;
